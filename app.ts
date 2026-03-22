import { authService } from './src/services/auth';
import { logger } from './src/utils/logger';
import { userService } from './src/services/user';

App<IAppOption>({
  onLaunch() {
    const logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success(_res) {
        logger.info('app', 'wx.login completed')
      }
    })

    this.globalData.authStatus = 'idle'
    this.globalData.authErrorMessage = ''

    authService.bootstrapAuthorizedUser().then((userInfo) => {
      if (!userInfo) {
        return
      }

      userService.saveUser(this, userInfo)
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(userInfo)
      }
    })
  },
  globalData: {
    authStatus: 'idle',
    authErrorMessage: ''
  }
})