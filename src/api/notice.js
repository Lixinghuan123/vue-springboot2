import request from '@/utils/request'

export function getNoticeList(params) {//好像用不到参数啊
  return request({
    url: '/notice/list',
    method: 'get',
    params
  })
}

export function getNoticeInfo(noticeId) {
  return request({
    url: '/notice/search',
    method: 'get',
    params: { noticeId }
  })
}
export function fetchNotice(id) {
  return request({
    url: '/notice/detail',
    method: 'get',
    params: { id }
  })
}

export function addNotice(data) {
  return request({
    url: '/notice/insert',
    method: 'post',
    data
  })
}

export function updateNotice(data) {
  return request({
    url: '/notice/insert',
    method: 'post',
    data
  })
}
export function noticeDel(data){
  return request({
      url:'/notice/delete',
      method:'post',
      // data:{
      //   noticeId,
        
      // }
      data
  })
}
export function getAllCates(params={}){
  return request({
      url:'/notice/cate',
      method:'get',
      params
  })
}