
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
}

export default Unit
