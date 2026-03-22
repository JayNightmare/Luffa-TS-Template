import { defaultIcon } from '../../utils/icon';
import { toDisplayUserProfile } from '../models/User';

export const userService = {
    getCachedUser(app: IAppOption): WechatMiniprogram.UserInfo | undefined {
        return app.globalData.userInfo;
    },

    saveUser(app: IAppOption, userInfo: WechatMiniprogram.UserInfo) {
        app.globalData.userInfo = userInfo;
        app.globalData.authStatus = 'authorized';
        app.globalData.authErrorMessage = '';
    },

    setAuthFailure(app: IAppOption, status: 'denied' | 'error', message: string) {
        app.globalData.authStatus = status;
        app.globalData.authErrorMessage = message;
    },

    toDisplayUser(userInfo?: Partial<WechatMiniprogram.UserInfo>) {
        return toDisplayUserProfile(userInfo, defaultIcon, 'Guest User');
    }
};
