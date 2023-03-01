import request from '@/utils/request'

// 查询通知类型列表
export function listNotice_type(query) {
  return request({
    url: '/system/notice_type/list',
    method: 'get',
    params: query
  })
}

// 查询通知类型详细
export function getNotice_type(noticeType) {
  return request({
    url: '/system/notice_type/' + noticeType,
    method: 'get'
  })
}

// 新增通知类型
export function addNotice_type(data) {
  return request({
    url: '/system/notice_type',
    method: 'post',
    data: data
  })
}

// 修改通知类型
export function updateNotice_type(data) {
  return request({
    url: '/system/notice_type',
    method: 'put',
    data: data
  })
}

// 删除通知类型
export function delNotice_type(noticeType) {
  return request({
    url: '/system/notice_type/' + noticeType,
    method: 'delete'
  })
}
