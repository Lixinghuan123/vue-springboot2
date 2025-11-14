import request from '@/utils/request'

export function getAccountList(params) {//好像用不到参数啊
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function getAccountInfo(id) {
  return request({
    url: '/user/search1',
    method: 'get',
    params: { id }
  })
}

export function fetchAccount(id) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { id }
  })
}

export function addAccount(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}
export function AccountDel(inId){
  return request({
      url:'/user/delete',
      method:'PUT',
      data:{
        inId
      }
  })
}
