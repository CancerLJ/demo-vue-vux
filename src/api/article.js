import request from './request'

export function getCategoryLists() {
  return request({
    url: '/category/lists',
    method: 'get'
  })
}

export function getArticlesByCateId(data) {
  return request({
    url: '/article/lists',
    method: 'get',
    params: data
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id
    }
  })
}
