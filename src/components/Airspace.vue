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
      const latlngList = [[39.967385, 119.722567], [37.755787, 112.632437]]
      // const pointList = unit.transLatLngToLayerPoint(latlngList)
      const polyline = L.polyline(latlngList, { color: 'red' }).addTo(map)
      L.marker([39.967385, 119.722567], { title: 'x125' }).addTo(map)
      unit.transition(d3.select(polyline._path))
    }
  }
}
</script>

<style lang="scss">
  #Map {
    height: 100vh;
  }
</style>
