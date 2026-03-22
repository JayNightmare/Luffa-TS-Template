import { logger } from '../utils/logger';

const SCOPE_USER_INFO = 'scope.userInfo';

type ProfileSuccess = {
    ok: true;
    userInfo: WechatMiniprogram.UserInfo;
};

type ProfileFailure = {
    ok: false;
    status: 'denied' | 'error';
    message: string;
};

export type ProfileResult = ProfileSuccess | ProfileFailure;

const getUserProfileIfAvailable = () => {
    const platformWx = wx as WechatMiniprogram.Wx & {
        getUserProfile?: (options: {
            desc: string;
            success: (res: { userInfo: WechatMiniprogram.UserInfo }) => void;
            fail: (err: unknown) => void;
        }) => void;
    };

    return platformWx.getUserProfile;
};

const parseErrorMessage = (err: unknown): string => {
    if (typeof err === 'string') {
        return err;
    }

    if (typeof err === 'object' && err !== null && 'errMsg' in err) {
        return String((err as { errMsg?: unknown }).errMsg || 'Unknown auth error');
    }

    return 'Unknown auth error';
};

const isDeniedError = (message: string): boolean => {
    const normalized = message.toLowerCase();
    return normalized.includes('deny') || normalized.includes('cancel') || normalized.includes('auth deny');
};

const getUserInfoLegacy = (): Promise<WechatMiniprogram.UserInfo> => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: (res) => resolve(res.userInfo),
            fail: reject
        });
    });
};

export const authService = {
    async bootstrapAuthorizedUser(): Promise<WechatMiniprogram.UserInfo | undefined> {
        const settings = await new Promise<WechatMiniprogram.GetSettingSuccessCallbackResult>((resolve) => {
            wx.getSetting({
                success: resolve,
                fail: () =>
                    resolve({
                        authSetting: {},
                        subscriptionsSetting: {
                            mainSwitch: false,
                            itemSettings: {}
                        },
                        errMsg: 'getSetting:fail'
                    })
            });
        });

        if (!settings.authSetting[SCOPE_USER_INFO]) {
            return undefined;
        }

        try {
            return await getUserInfoLegacy();
        } catch (err) {
            logger.warn('auth', 'Failed to restore authorized profile from scope', err);
            return undefined;
        }
    },

    async requestUserProfile(description: string): Promise<ProfileResult> {
        const getUserProfile = getUserProfileIfAvailable();

        try {
            const userInfo = await new Promise<WechatMiniprogram.UserInfo>((resolve, reject) => {
                if (getUserProfile) {
                    getUserProfile({
                        desc: description,
                        success: (res) => resolve(res.userInfo),
                        fail: reject
                    });
                    return;
                }

                wx.getUserInfo({
                    success: (res) => resolve(res.userInfo),
                    fail: reject
                });
            });

            return {
                ok: true,
                userInfo
            };
        } catch (err) {
            const message = parseErrorMessage(err);
            const status = isDeniedError(message) ? 'denied' : 'error';
            logger.warn('auth', 'Failed to get user profile', { status, message });

            return {
                ok: false,
                status,
                message
            };
        }
    }
};
