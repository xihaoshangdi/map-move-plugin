import * as d3 from 'd3'

class Unit {
  #GlobalMap=null
  constructor (map) {
    this.#GlobalMap = map
  }

  /**
   * @description 转化经纬度坐标到像素坐标
   * @param {Array} LatLngList 经纬度坐标组
   * @return {Array} PointList 像素坐标组
   * @author wujiaping
   * @date 2020/8/18
   * @example
   *  [[39.967385, 119.722567],[37.755787, 112.632437]]
   *  [{x: 351, y: 289}, {x: 28, y: 418}]
   */
  transLatLngToLayerPoint (LatLngList) {
    return LatLngList.map(item => this.#GlobalMap.latLngToLayerPoint(item))
  }

  transition (path, area) {
    const linePath = path.node()
    console.log(area)
    path.transition()
      .duration(7500)
      .attrTween('fill', () => {
        return function (t) {
          const l = linePath.getTotalLength()
          const interpolate = d3.interpolateString('0,' + l, l + ',' + l)
          const marker = d3.select('#marker')
          // const p = linePath.getPointAtLength(t * l) //实时经纬度
          const Width = area[0] < 0 ? Math.abs(area[0]) * (1 - t) : area[0] * t
          const Height = area[1] < 0 ? Math.abs(area[1]) * (1 - t) : area[1] * t
          marker.attr('transform', 'translate(' + Width + ',' + Height + ')')
          return interpolate(t)
        }
      })
  }
}

export default Unit
