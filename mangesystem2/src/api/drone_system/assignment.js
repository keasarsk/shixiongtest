import request from '@/utils/request'

// 查询任务分配列表
export function listAssignment(query) {
  return request({
    url: '/managedrone/assignment/list',
    method: 'get',
    params: query
  })
}

// 查询任务分配详细
export function getAssignment(id) {
  return request({
    url: '/managedrone/assignment/' + id,
    method: 'get'
  })
}

// 新增任务分配
export function addAssignment(data) {
  return request({
    url: '/managedrone/assignment',
    method: 'post',
    data: data
  })
}

// 修改任务分配
export function updateAssignment(data) {
  return request({
    url: '/managedrone/assignment',
    method: 'put',
    data: data
  })
}

// 删除任务分配
export function delAssignment(id) {
  return request({
    url: '/managedrone/assignment/' + id,
    method: 'delete'
  })
}
