import request from '@/utils/request'

// 查询传感器数据管理列表
export function listSensor_data(query) {
  return request({
    url: '/managedrone/sensor_data/list',
    method: 'get',
    params: query
  })
}

// 查询传感器数据管理详细
export function getSensor_data(dataId) {
  return request({
    url: '/managedrone/sensor_data/' + dataId,
    method: 'get'
  })
}

// 新增传感器数据管理
export function addSensor_data(data) {
  return request({
    url: '/managedrone/sensor_data',
    method: 'post',
    data: data
  })
}

// 修改传感器数据管理
export function updateSensor_data(data) {
  return request({
    url: '/managedrone/sensor_data',
    method: 'put',
    data: data
  })
}

// 删除传感器数据管理
export function delSensor_data(dataId) {
  return request({
    url: '/managedrone/sensor_data/' + dataId,
    method: 'delete'
  })
}
