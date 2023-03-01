<template>
  <div id="bar" :style="size">
    <div class="dragRectTop"></div>
    
    <div>UAV控制设备列表</div>
    <!-- <el-row> -->

    <div class="two">
      <el-button type="primary" class="rectangle" @click="takeoffall(num)">起飞</el-button>
      <!-- <el-button type="primary" round>主要按钮</el-button> -->
      <el-button type="primary" class="rectangle">降落</el-button>
      <!-- <el-button type="primary">主要按钮</el-button> -->
    </div>
    <div class="two">
      <el-button type="primary" class="rectangle">悬停</el-button>
      <el-button type="primary" class="rectangle" @click="returnToLaunchall(num)">返航</el-button>
    </div>

    <div class="three"> 
      <el-button type="primary" class="rectanglelong" @click="setmission(num)">任务布置</el-button>

    </div>
    <div class="three">
      <el-button type="primary" class="rectanglelong">任务暂停</el-button>

    </div>
     <div class="three">

      <el-button type="primary" class="rectanglelong">任务中断并清除</el-button>
    </div>

    <!-- </el-row> -->

    <!-- <e-charts :size="size" :options="options" /> -->
    <!-- <div class="rectangle">
      
    </div> -->
    <div class="dragRectBottom"></div>
  </div>
</template>

<script>
// import ECharts from '@/page/uavinfodisplay/displaycontents/ECharts'
// import * as  echarts from 'echarts';
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  components: {
    // ECharts
  },
  data: function () {
    return {
      num: [1,2,3,4],
      size: {
        width: '100%',
        height: '5rem'
      }
    }
  },
  computed:{
    // 获取store/uavInfo中存储的state
    ...mapState('uavInfo',['number',
      'condition',
      'location',
      'height',
      'mission',
      'action',
      'camera'
    ])

  },
  methods:{
    // 获取store/uavInfo中存储的actions
    ...mapActions('uavInfo',[
      'followme',
    ]),
    // 获取store/uavInfo中存储的mutations
    ...mapMutations('uavInfo',[
      'armall',
      'arm',
      'setmission',
      'takeoffall',
      'landall',
      'returnToLaunchall',
      'keyboardControl',//
      'logFileall',//
      'camerapictures',//
      'holdall',
    ]),
  },
  mounted () {
    setInterval(() => {

      this.options = { ...this.options }
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
}
.two {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 18%;
  text-align: center;

}
.two .rectangle{
  /* display: flex; */
  /* flex-direction: column; */
  flex: 0.5;

  width: 50%;
  /* height: 12%; */
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-around; */
  background-color: rgb(63, 65, 179);
  /* position: relative;
  left: 2%; */
  /* border-radius: 6px; */
  /* padding-left: 5%; */
  /* margin-top: 4px; */
  text-align: center;
  /* width: 32%; */
  /* height: 13%; */
  /* .dv-dig-flop {
    width: 150px;
    height: 30px;
  } */
  
  
}
.three {
    /* display: flex; */
  /* flex-direction: column; */
  /* flex: 1; */
  height: 18%;
  /* text-align: center; */
}
.three .rectanglelong{
  /* display: flex; */
  /* flex-direction: column; */
  /* flex: 0.2; */
  height: 95%;
  width: 100%;
  /* height: 12%; */
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-around; */
  background-color: rgb(63, 65, 179);
  /* position: relative;
  left: 2%; */
  /* border-radius: 6px; */
  /* padding-left: 5%; */
  /* margin-top: 4px; */
  /* text-align: center; */
  
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
</style>