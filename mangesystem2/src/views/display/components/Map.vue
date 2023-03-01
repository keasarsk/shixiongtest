<template>

  <div id="mapsetting" :style="size">
  <!-- <div -->
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"/> -->

    <!-- <el-radio-group class="mapStyle" v-model="mapId" @change="changeStyle" size="mini">
      <el-radio-button label='mapbox/streets-v11' size="mini" >平面地图</el-radio-button>
      <el-radio-button label='mapbox/satellite-v9' size="mini" >卫星地图</el-radio-button>
      <el-radio-button label='mapbox/outdoors-v10' size="mini" >户外地图</el-radio-button>
    </el-radio-group> -->

    <!-- <div id="map"></div> -->
    <div class="map-container" id="map-container"> </div>
  </div>

  

</template>

<script>

let map=null
let layer = null
export default {
    components: { 
        //   datepicker 
    },
    data(){
        return{
            map: null,
            layers: null,
            mapId: 'mapbox/streets-v11',
            geoLocate:null,
            userLocation:[],
            canvasMarkers: [],
            size: {
              width: '100%',
              height: '8.2rem',
              background: 'whitesmoke',
            },
            
            depotIcon: null,
                userIcon: null,
                uavIcon: null,
        }
    }, 
    mounted() {
        // 创建地图层
        this.map = this.$leaflet.createMap("map-container", {
            minZoom: 1,
            maxZoom: 20,
            zoomControl: false,
            attributionControl: false,
            //坐标系选择
            crs: L.CRS.EPSG3857
        }).fitWorld()

        this.layers = this.$leaflet.createTileLayer(this.map, 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 20,
            id: this.mapId,
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
        })
        // this.map.setView([51.505, -0.09], 13);
        this.$leaflet.zoomControl({ position: 'topright' }).addTo(this.map)
        this.$leaflet.zoomAttribution(
            {
                position: 'bottomright',
                prefix: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }
        )
        // 定位
        this.$leaflet.locate({ position: 'bottomright', initialZoomLevel: 15, setView: "once", flyTo: true}).addTo(this.map);
        // this.map.on('click', e =>{
        //   console.log(e)
        // })
        // 初始化Icon
        this.iconInit()
        this.queryLatlng()
    },
    methods: {
        // icon init
        async iconInit() {
            this.userIcon = this.$leaflet.createIcon({
                iconUrl: require("@/assets/icons/flyIcon/mobile.png"),
                iconSize: [36, 36]
            })
            this.depotIcon = this.$leaflet.createIcon({
                iconUrl: require("@/assets/icons/flyIcon/depot.png"),
                iconSize: [36, 36]
            })
            this.uavIcon = this.$leaflet.createIcon({
                iconUrl: require("@/assets/icons/flyIcon/uav48.png"),
                iconSize: [36, 36]
            })
            
        },
        // 地图样式改变
        changeStyle() {
            this.map.removeLayer(this.layers)
            this.$leaflet.createTileLayer(this.map, 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; wa href="https://www.openstreetmap.org/copyright"wOpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 20,
                id: this.mapId,
                tileSize: 512,
                // zoomOffset 注释掉会出大问题
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'
            })
        },
        // 获取坐标
        queryLatlng(){
          let latlng = {
            lat: 39.08343208067558,
            lng: 121.81061116978528
          }
          // console.log(latlng)
          this.drawUav(latlng)
        },
        // 传入坐标,绘制无人机
        drawUav(latlng){
          
          this.$leaflet.createMarker(latlng, { icon: this.uavIcon, title: "无人机正在执行任务" }).addTo(this.map)
        }

    }
}
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: auto;
  background: bisque;
  /*background-color: #409EFF;*/
}
.mapStyle{
  position: absolute;
  z-index: 1;
  margin-top: 10px;
  margin-left: 10px;
}
.map-container {
  height: 100%;
  width: 100%;
  z-index: 10;
  background: bisque;
  z-index: 10;
}
</style>