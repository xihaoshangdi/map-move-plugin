import L from 'leaflet'
import * as d3 from 'd3'
/**
 * @description 获取真实的地理路径绘制SVG区域 根据路径动态生成viewbox
 * @param {Object} Map 地图对象
 * @param {Array} ActualPath 真实路径
 * @return {Object} RenderLay SVG区域对象
 * @author wujiaping
 * @date 2020/8/17
 * @example
 * ActualPath:[[32, -130], [13, 30]]
 */
export const Render = function (Map, ActualPath) {
  const StartPoint = Map.latLngToLayerPoint(...ActualPath.slice(0, 1))
  const EndPoint = Map.latLngToLayerPoint(...ActualPath.slice(-1))
  const Width = StartPoint.x - EndPoint.x
  const Height = StartPoint.y - EndPoint.y
  const RenderLay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  RenderLay.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  RenderLay.setAttribute('viewBox', `0 0 ${Math.abs(Width)} ${Math.abs(Height)}`)
  RenderLay.setAttribute('style', 'border:1px solid red')
  L.svgOverlay(RenderLay, ActualPath).addTo(Map)
  d3.select(RenderLay)
    .append('g')
    .append('circle')
    .attr('r', 10)
    .attr('id', 'marker')
    .attr('transform', `translate(${Width < 0 ? 0 : Width},${Height < 0 ? 0 : Height})`)
  return RenderLay
}
