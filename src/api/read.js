import request from '@/utils/request'
export function addRead(data) {
    return request({
      url: '/read/insert',
      method: 'post',
      data
    })
  }