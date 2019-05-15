import request from './request'

export function getTags() {
  return request({
    url: '/search/tags',
    method: 'get'
  })
}

export function searchArticles(data) {
  return request({
    url: '/search/lists',
    method: 'get',
    params: data
  })
}
