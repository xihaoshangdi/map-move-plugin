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
import { Render } from '@/model/Render'
import * as d3 from 'd3'
export default {
  components: { LMap, LTileLayer },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 2,
      center: [51.5, -0.09],
      drawSvgShape: null
    }
  },
  methods: {
    setMapOnReady () {
      const map = this.$refs.Map.mapObject
      const render = Render(map, [[32, -130], [13, 30]])
      const start = map.latLngToLayerPoint([32, -130])
      const end = map.latLngToLayerPoint([13, 30])
      const context = d3.path()
      context.moveTo(start.x, start.y)
      context.lineTo(end.x, end.y)
      const TestPath = d3.select(render).append('path').attr('d', context.toString())
      d3.select(render)
        .append('image')
        .attr('xlink:href', 'images/planet.svg')
        .attr('width', '30')
        .attr('height', '30')
        .attr('x', start.x)
        .attr('y', start.y)
        .transition()
        .duration(6000)
        .attrTween('transform', () => {
          return (t) => {
            const l = TestPath.node().getTotalLength()// 获取总路径
            // let interpolate = d3.interpolateString('0,' + l, l + ',' + l)// 路径插值器
            const point = TestPath.node().getPointAtLength(t * l)// 根据路径插值动态计算时间位置
            const width = point.x - start.x
            const height = point.y - start.y
            console.log(width, height)
            return 'translate(' + width + ',' + height + ')'
          }
        })
    }
  }
}
</script>

<style lang="scss">
  #Map {
    height: 100vh;
  }
</style>
