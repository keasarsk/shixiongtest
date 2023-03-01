<template>
  <div id="bar" :style="size">
    <div class="dragRectTop"></div>

      摄像头展示
    <div class="earth">
       <e-charts :size="size" :options="options" />
    </div>
   
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
import ECharts from './ECharts'
import 'echarts-gl'

var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

export default {
  components: {
    ECharts
  },
  data: function () {
    return {
      options: {
        backgroundColor: '#000',
        globe: {
            baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
            heightTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
            displacementScale: 0.04,
            shading: 'realistic',
            environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
            realisticMaterial: {
                roughness: 0.9
            },
            postEffect: {
                enable: true
            },
            light: {
                main: {
                    intensity: 5,
                    shadow: true
                },
                ambientCubemap: {
                    texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                    diffuseIntensity: 0.2
                }
            }
        }
      },
      size: {
        width: '100%',
        height: '5rem'
      }
    }
  },
  mounted () {
    setInterval(() => {
    }, 2000)
  }
}
</script>

<style scoped>

#bar{
	/* background-image: url(../assets/line.png); */
  border: 0.5px solid rgba(255,255,255,0.2);
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
}

.dragRectTop{
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0
}

.dragRectTop::before{
    content: "";
    width: 10px;
    height: 10px;
    border-left: 2px solid skyblue;
    border-top: 2px solid skyblue;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
}

.dragRectTop::after{
    content: "";
    width: 10px;
    height: 10px;
    border-right: 2px solid skyblue;
    border-top: 2px solid skyblue;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
}

.dragRectBottom{
    width: 100%;
    height: 10px;
    position: absolute;
    bottom: 0;
    left: 0
}

.dragRectBottom::before{
    content: "";
    width: 10px;
    height: 10px;
    border-left: 2px solid skyblue;
    border-bottom: 2px solid skyblue;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
}

.dragRectBottom::after{
    content: "";
    width: 10px;
    height: 10px;
    border-right: 2px solid skyblue;
    border-bottom: 2px solid skyblue;
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
}

.earth {
  /* position: relative;
  top: -5%; */
/* padding: 5%; */
}
</style>