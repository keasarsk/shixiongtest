// 导入leaflet
import "leaflet/dist/leaflet.css"
import L from "leaflet"
// 导入地图插件
import "leaflet-polylinedecorator"
import "leaflet.locatecontrol"
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"

// 导入地图图标
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36]
})

L.Marker.prototype.options.icon = DefaultIcon;

let CursotStyle = ""

const createMap = (id, options) => {
    let map = L.map(id, options)
    return map
}

const createTileLayer = async (map, url, options) => {
    let layer =await L.tileLayer(url, options)
    layer.addTo(map)
    return layer
}

// 创建icon
const createIcon = options => {
    return L.icon(options)
}

// 创建markerk
const createMarkerL = (map, latlng, options) => {
    let marker = L.marker(latlng, options)
    marker.addTo(map)
    return marker
}

// 创建marker
const createMarker = (latlngs, options) => {
    return L.marker(latlngs, options)
}

// 创建layergroup
const layerGroup = (options) => {
    return L.layerGroup(options)
}

// 创建线
const createPolyline = (map, latlngs, options) => {
    let polyline = L.polyline(latlngs, options)
    polyline.addTo(map)
    return polyline
}

// 创建面
const createPolygon = (map, latlngs, options) => {
    let polygon = L.polygon(latlngs, options)
    polygon.addTo(map)
    return polygon
}

// 获取点位
const getLatLng = (lat, lng) => {
    return L.latLng(lat, lng)
}

// zoom 控制
const zoomControl = (options) => {
    return L.control.zoom(options)
}

// control 控制
const zoomAttribution = (options) => {
    return L.control.attribution(options)
}

// control 控制
const locate = (opt) => {
    return L.control.locate(opt);
}

// 导出变量
export default {
    createMap,
    createTileLayer,
    createIcon,
    createMarker,
    createPolyline,
    createPolygon,
    getLatLng,
    CursotStyle,
    zoomControl,
    zoomAttribution,
    locate,
    layerGroup,
}