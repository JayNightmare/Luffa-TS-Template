export type AuthStatus = 'idle' | 'loading' | 'authorized' | 'denied' | 'error';

export interface DisplayUserProfile {
    nickName: string;
    avatarUrl: string;
}

export const toDisplayUserProfile = (
    userInfo: Partial<WechatMiniprogram.UserInfo> | undefined,
    fallbackAvatarUrl: string,
    fallbackNickName = 'Guest User'
): DisplayUserProfile => {
    return {
        nickName: userInfo?.nickName || fallbackNickName,
        avatarUrl: userInfo?.avatarUrl || fallbackAvatarUrl
    };
};
