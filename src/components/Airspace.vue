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
import Unit from '@/lib/Unit'
import * as d3 from 'd3'
import L from 'leaflet'
import { Render } from '@/model/Render'
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
      map.on('zoomanim', () => {
        console.log('-------------')
      })
      const unit = new Unit(map)
      const latlngList = [[37.967385, 117.632437], [41.755787, 119.722567]]
      Render(map, latlngList)
      const pointList = unit.transLatLngToLayerPoint(latlngList)
      const polyline = L.polyline(latlngList, { color: 'red' }).addTo(map)
      L.marker(latlngList[0], { color: 'green' })
        .addTo(map)
        .bindPopup('start').openPopup()
      L.marker(latlngList[1], { color: 'blue' })
        .addTo(map)
        .bindPopup('end').openPopup()
      unit.transition(d3.select(polyline._path), [pointList[1].x - pointList[0].x, pointList[1].y - pointList[0].y])
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
