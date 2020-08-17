import L from 'leaflet'
/**
 * @description 获取真实的地理路径绘制SVG区域
 * @param {Object} Map 地图对象
 * @param {Array} ActualPath 真实路径
 * @return {Object} RenderLay SVG区域对象
 * @author wujiaping
 * @date 2020/8/17
 * @example
 * ActualPath:[[32, -130], [13, 30]]
 */
export const Render = function (Map, ActualPath) {
  const RenderLay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  RenderLay.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  RenderLay.setAttribute('viewBox', '0 0 1200 1200')
  L.svgOverlay(RenderLay, ActualPath).addTo(Map)
  return RenderLay
}
