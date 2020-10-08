<template>
  <l-map
    id="Map"
    ref="Map"
    :zoom="zoom"
    :center="center"
    @ready="setMapOnReady"
  >
    <l-tile-layer :url="url" />
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import RenderSVG from '@/model/RenderSVG'
import Animation from '@/model/Animation'
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
      // Test

      //
      const map = this.$refs.Map.mapObject
      // 0. 数据准备
      const latlngList = [[43.755787, 119.722567], [36.755787, 118.722567], [41.755787, 119.722567], [37.967385, 117.632437]]// 路径数组
      //
      const render = new RenderSVG(map, latlngList)
      const Area = render.RenderArea()
      const Line = render.RenderLine()
      // 绘制icon,tip
      render.RenderIcon()
      //
      // const prompt = new PromptRender(map, latlngList, 7)
      // console.log(prompt)
      // 渲染Tip 动画
      // TipRender(map, [[37.967385, 117.632437], [41.755787, 119.722567]])

      // 2. 绘制移动动画
      const fx = new Animation(Area)
      fx.setAnimate(Line, '#marker', 8000)
      // setTimeout(() => {
      //   console.log('---')
      //   fx.interruptAnimate(Line)
      // }, 2000)
      //
      // setTimeout(() => {
      //   fx.setAnimate(Line, '#marker', 8000)
      // }, 5000)
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
