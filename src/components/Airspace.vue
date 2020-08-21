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
import L from 'leaflet'
import { Render, transition } from '@/model/Render'
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
      // --- 图标 ---
      L.marker(latlngList[1], { color: 'blue' })
        .addTo(map)
        .bindPopup('end').openPopup()
      // const myIcon = L.divIcon({className: 'my-div-icon'});
      // const xx=L.marker(latlngList[0], {icon: myIcon}).addTo(map);
      const xx = L.marker(latlngList[0], { color: 'blue' }).addTo(map)
      var fx = new L.PosAnimation()
      let si = null
      fx.on('end', (e) => {
        si = 10 - (new Date().getTime() - e.target._startTime) / 1000
        console.log(si)
      })

      map.on('zoomstart', () => {
        fx.stop()
        const Point = L.DomUtil.getPosition(xx._icon)
        xx.setLatLng(map.layerPointToLatLng(Point))
      })
      map.on('zoomend', () => {
        fx.run(xx._icon, map.latLngToLayerPoint(latlngList[1]), si)
      })

      fx.run(xx._icon, map.latLngToLayerPoint(latlngList[1]), 7.5)
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
  .green{
    background-color: green;
  }
  .blue{
    background-color: blue;
  }
</style>
