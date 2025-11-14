import request from '@/utils/request'

export function getLandList(params) {//好像用不到参数啊
  return request({
    url: '/land/list',
    method: 'get',
    params
  })
}

export function getLandInfo(landId) {
  return request({
    url: '/land/search',
    method: 'get',
    params: { landId }
  })
}

export function fetchLand(landId) {
  return request({
    url: '/land/detail',
    method: 'get',
    params: { landId }
  })
}

export function addLand(data) {
  return request({
    url: '/land/insert',
    method: 'post',
    data
  })
}

export function updateLand(data) {
  return request({
    url: '/land/insert',
    method: 'post',
    data
  })
}
export function landDel(landId){
  return request({
      url:'/land/delete',
      method:'PUT',
      data:{
        landId
      }
  })
}
