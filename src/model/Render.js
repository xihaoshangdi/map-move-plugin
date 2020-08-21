import L from 'leaflet'
import * as d3 from 'd3'
/**
 * @description 获取真实的地理路径绘制SVG区域 根据路径动态生成viewbox
 * @param {Object} Map 地图对象
 * @param {Array} ActualPath 真实路径
 * @param {Number} Width 起始点与原点偏移的宽度
 * @param {Number} Height 起始点与原点偏移的高度
 * @return {Object} RenderLay SVG区域对象
 * @author wujiaping
 * @date 2020/8/17
 * @example
 * ActualPath:[[32, -130], [13, 30]]
 */
export const Render = function (Map, ActualPath, Width, Height) {
  const RenderLay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  RenderLay.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  RenderLay.setAttribute('viewBox', `0 0 ${Math.abs(Width)} ${Math.abs(Height)}`)
  RenderLay.setAttribute('style', 'border:1px solid red')
  L.svgOverlay(RenderLay, ActualPath).addTo(Map)
  const Global = d3.select(RenderLay).append('g')
  // 绘制icon
  Global.append('circle')
    .attr('r', 10)
    .attr('id', 'marker')
    .attr('transform', `translate(${Width < 0 ? 0 : Width},${Height < 0 ? 0 : Height})`)
  // 绘制Tip

  // 绘制图线
  const polyline = L.polyline(ActualPath, { color: 'red' }).addTo(Map)
  return polyline._path
}
/**
 * @description 渲染移动动画
 * @param  {SVGPathElement} path 线段对象
 * @param {Number} Width 动画开始点与动画终点偏移的宽度
 * @param {Number} Height 动画开始点与动画终点偏移的宽度
 * @author wujiaping
 * @date 2020/8/21
 * @example
 *
 */
export const transition = function (path, Width, Height) {
  const d3Path = d3.select(path)
  const linePath = d3Path.node()
  const l = linePath.getTotalLength()
  const interpolate = d3.interpolateNumber(0, l)
  const cop = (val, time) => {
    if (time > 1) time = 1
    return val < 0 ? Math.abs(val) * (1 - time) : val * time
  }
  // 获取上次的过渡时间
  const Time = d3Path.attr('T') - 0
  d3Path.transition()
    .duration(7500)
    .attr('T', 1)
    .attrTween('fill', () => {
      return function (t) {
        t = t + Time
        const marker = d3.select('#marker')
        // Tip

        //
        // const p = linePath.getPointAtLength(t * l) //实时经纬度
        marker.attr('transform', `translate(${cop(Width, t)},${cop(Height, t)})`)
        return interpolate(t)
      }
    })
}
/**
 * @description 中断动画
 * @param {SVGPathElement} path 线段对象
 * @return
 * @author wujiaping
 * @date 2020/8/21
 * @example
 *
 */
export const interrupt = function (path) {
  return d3.select(path).interrupt()
}
