import request from '@/utils/request'

// 查询任务管理列表
export function listPlan(query) {
  return request({
    url: '/managedrone/plan/list',
    method: 'get',
    params: query
  })
}

// 查询任务管理详细
export function getPlan(id) {
  return request({
    url: '/managedrone/plan/' + id,
    method: 'get'
  })
}

// 新增任务管理
export function addPlan(data) {
  return request({
    url: '/managedrone/plan',
    method: 'post',
    data: data
  })
}

// 修改任务管理
export function updatePlan(data) {
  return request({
    url: '/managedrone/plan',
    method: 'put',
    data: data
  })
}

// 删除任务管理
export function delPlan(id) {
  return request({
    url: '/managedrone/plan/' + id,
    method: 'delete'
  })
}
