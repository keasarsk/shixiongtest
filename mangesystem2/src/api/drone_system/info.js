import request from '@/utils/request'

// 查询无人机管理列表
export function listInfo(query) {
  return request({
    url: '/managedrone/info/list',
    method: 'get',
    params: query
  })
}

// 查询无人机管理详细
export function getInfo(id) {
  return request({
    url: '/managedrone/info/' + id,
    method: 'get'
  })
}

// 新增无人机管理
export function addInfo(data) {
  return request({
    url: '/managedrone/info',
    method: 'post',
    data: data
  })
}

// 修改无人机管理
export function updateInfo(data) {
  return request({
    url: '/managedrone/info',
    method: 'put',
    data: data
  })
}

// 删除无人机管理
export function delInfo(id) {
  return request({
    url: '/managedrone/info/' + id,
    method: 'delete'
  })
}
