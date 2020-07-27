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
import DrawFlight from '@/model/drawFlight'

export default {
  components: { LMap, LTileLayer },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 2,
      center: [51.5, -0.09],
      map: null
    }
  },
  methods: {
    setMapOnReady () {
      const map = this.$refs.Map.mapObject
      map.on('zoomanim', () => {
        console.log('---------')
      })
      console.log(map.getPanes())

      const drawFlight = new DrawFlight(map)
      drawFlight.draw()
    }
  }
}
</script>

<style lang="scss" scoped>
#Map {
  height: 100vh;
}
</style>
