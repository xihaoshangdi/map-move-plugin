<template>
  <l-map
    ref="Map"
    id="Map"
    :zoom="zoom"
    :center="center"
    @ready="setMapOnReady"
  >
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import { Render, transition } from '@/model/Render'
import { TipRender } from '@/model/Tip'
export default {
  components: { LMap, LTileLayer },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 6,
      center: [39.967385, 119.722567],
      drawSvgShape: null
    }
  },
  methods: {
    setMapOnReady () {
      const map = this.$refs.Map.mapObject

      // 0. 数据准备
      const latlngList = [[37.967385, 117.632437], [41.755787, 119.722567]]
      const StartPoint = map.latLngToLayerPoint(latlngList[0])
      const EndPoint = map.latLngToLayerPoint(latlngList[1])
      const StartWidth = StartPoint.x - EndPoint.x
      const StartHeight = StartPoint.y - EndPoint.y
      const EndWidth = -StartWidth
      const EndHeight = -StartHeight
      // 1. 渲染SVG 绘制SVG区域 Viewbox
      const Line = Render(map, latlngList, StartWidth, StartHeight)
      // 渲染Tip 动画
      TipRender(map, [[37.967385, 117.632437], [41.755787, 119.722567]])

      // 2. 绘制移动动画
      transition(Line, EndWidth, EndHeight)

      // // 3. 中断
      // setTimeout(()=>{
      //   console.log('中断')
      //   interrupt(Line)
      // },3000)
      // // 4. 继续
      // setTimeout(()=>{
      //   console.log('继续')
      //   transition(Line, EndWidth,EndHeight)
      // },5000)
    }
  }
}
</script>

<style lang="scss">
  #Map {
    height: 100vh;
  }
  .zzz{
    background: rgba(0,0,0,0.3);
  }
</style>
