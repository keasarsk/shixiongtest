import request from '@/utils/request'

// 查询任务执行列表列表
export function listList(query) {
  return request({
    url: '/managedrone/list/list',
    method: 'get',
    params: query
  })
}

// 查询任务执行列表详细
export function getList(id) {
  return request({
    url: '/managedrone/list/' + id,
    method: 'get'
  })
}

// 新增任务执行列表
export function addList(data) {
  return request({
    url: '/managedrone/list',
    method: 'post',
    data: data
  })
}

// 修改任务执行列表
export function updateList(data) {
  return request({
    url: '/managedrone/list',
    method: 'put',
    data: data
  })
}

// 删除任务执行列表
export function delList(id) {
  return request({
    url: '/managedrone/list/' + id,
    method: 'delete'
  })
}
