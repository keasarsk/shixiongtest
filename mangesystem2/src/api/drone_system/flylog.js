import request from '@/utils/request'

// 查询飞行日志列表
export function listFlylog(query) {
  return request({
    url: '/managedrone/flylog/list',
    method: 'get',
    params: query
  })
}

// 查询飞行日志详细
export function getFlylog(id) {
  return request({
    url: '/managedrone/flylog/' + id,
    method: 'get'
  })
}

// 新增飞行日志
export function addFlylog(data) {
  return request({
    url: '/managedrone/flylog',
    method: 'post',
    data: data
  })
}

// 修改飞行日志
export function updateFlylog(data) {
  return request({
    url: '/managedrone/flylog',
    method: 'put',
    data: data
  })
}

// 删除飞行日志
export function delFlylog(id) {
  return request({
    url: '/managedrone/flylog/' + id,
    method: 'delete'
  })
}
