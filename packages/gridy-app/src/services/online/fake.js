import { random as randomAvatar } from '@gridy/app-avatars'
import { randomName } from './name'

export function onlineUsersFnc () {
  return function () {
    return new Promise(resolve => resolve({
      data: {
        onlineUsersCount: 1022,
        onlineUsers: Array.from({ length: 100 }, () => ({
          name: randomName(),
          avatar: randomAvatar()
        }))
      }
    }))
  }
}
