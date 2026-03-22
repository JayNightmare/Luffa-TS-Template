import { authService } from '../../src/services/auth'
import { userService } from '../../src/services/user'

const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: userService.toDisplayUser(),
    hasUserInfo: false,
    authStatus: 'idle',
    authErrorMessage: ''
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad() {
    const cachedUser = userService.getCachedUser(app)
    if (cachedUser) {
      this.setData!({
        userInfo: userService.toDisplayUser(cachedUser),
        hasUserInfo: true,
        authStatus: 'authorized',
        authErrorMessage: ''
      })
      return
    }

    this.setData!({
      authStatus: app.globalData.authStatus || 'idle',
      authErrorMessage: app.globalData.authErrorMessage || ''
    })
  },

  async handleGetUserProfile() {
    this.setData!({
      authStatus: 'loading',
      authErrorMessage: ''
    })

    const profileResult = await authService.requestUserProfile('Used to personalize your profile display')
    if (!profileResult.ok) {
      userService.setAuthFailure(app, profileResult.status, profileResult.message)
      this.setData!({
        authStatus: profileResult.status,
        authErrorMessage: profileResult.message
      })
      return
    }

    userService.saveUser(app, profileResult.userInfo)
    this.setData!({
      userInfo: userService.toDisplayUser(profileResult.userInfo),
      hasUserInfo: true,
      authStatus: 'authorized',
      authErrorMessage: ''
    })
  }
})
