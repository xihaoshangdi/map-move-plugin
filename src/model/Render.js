import L from 'leaflet'
import * as d3 from 'd3'
/**
 * @description 获取真实的地理路径绘制SVG区域 根据路径动态生成viewbox
 * @param {Object} Map 地图对象
 * @param {Array} ActualPath 真实路径
 * @return {Object} RenderLay SVG区域的线段对象
 * @author wujiaping
 * @date 2020/8/17
 * @example
 * ActualPath:[[32, -130], [13, 30]]
 */
export const RenderArea = function (Map, ActualPath) {
  // 初始化计算viewBox宽高
  const Path = JSON.parse(JSON.stringify(ActualPath))
  const StartPoint = Map.latLngToLayerPoint(Path.shift())
  const EndPoint = Map.latLngToLayerPoint(Path.pop())
  const Width = StartPoint.x - EndPoint.x
  const Height = StartPoint.y - EndPoint.y
  // 生成SVG区域
  const renderLay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  renderLay.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  renderLay.setAttribute('viewBox', `0 0 ${Math.abs(Width)} ${Math.abs(Height)}`)
  renderLay.setAttribute('style', 'border:1px solid red')
  L.svgOverlay(renderLay, ActualPath).addTo(Map)
  return renderLay
}

export const RenderLine = function (Map, ActualPath) {

}

export const RenderIcon = function (Map, Area, ActualPath) {
  const Path = JSON.parse(JSON.stringify(ActualPath))
  const StartPoint = Map.latLngToLayerPoint(Path.shift())
  const EndPoint = Map.latLngToLayerPoint(Path.pop())
  console.log('StartPoint', StartPoint)
  console.log('EndPoint', EndPoint)
  const Width = StartPoint.x - EndPoint.x
  const Height = StartPoint.y - EndPoint.y
  const Global = d3.select(Area).append('g')
  Global.append('circle')
    .attr('r', 10)
    .attr('id', 'marker')
    .attr('transform', `translate(${Width < 0 ? 0 : Width},${Height < 0 ? 0 : Height})`)
}

