<template>
  <div id="app">
    <Airspace />
  </div>
</template>

<script>
import Airspace from '@/components/Airspace'
export default {
  components: { Airspace }
}
</script>

<style lang="scss">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
