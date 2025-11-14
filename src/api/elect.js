import request from '@/utils/request'

export function getCadreList(params) {//好像用不到参数啊
  return request({
    url: '/cadre/list',
    method: 'get',
    params
  })
}

export function getCadreInfo(cadreId) {
  return request({
    url: '/cadre/search',
    method: 'get',
    params: { cadreId }
  })
}

export function fetchCadre(cadreId) {
  return request({
    url: '/cadre/detail',
    method: 'get',
    params: { cadreId }
  })
}

export function addCadre(data) {
  return request({
    url: '/cadre/insert',
    method: 'post',
    data
  })
}

export function updateCadre(data) {
  return request({
    url: '/cadre/insert',
    method: 'post',
    data
  })
}
export function cadreDel(cadreId){
  return request({
      url:'/cadre/delete',
      method:'PUT',
      data:{
        cadreId
      }
  })
}
