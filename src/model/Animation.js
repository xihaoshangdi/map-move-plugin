import * as d3 from 'd3'

export default class Animation {
  /**
   * @description 初始化动画区域
   * @param {SVGElement} AnimateArea
   * @author WuJiaPing
   * @date 2020/10/8
   */
  constructor (AnimateArea) { // 初始化默认数据 设置动画区域宽高
    [this.AreaWidth, this.AreaHeight] = d3.select(AnimateArea).attr('viewBox').split(' ').map(item => item - 0).splice(2)
  }
  /**
   * @description 为传入的对象设置动画
   * @param {SVGPathElement} AnimatePath
   * @param {String} IconID
   * @param {Number} AnimationTime
   * @author WuJiaPing
   * @date 2020/10/8
   */
  setAnimate (AnimatePath, IconID, AnimationTime) {
    const lineLength = AnimatePath.getTotalLength()
    const interpolate = d3.interpolate(0, lineLength)
    const d3Path = d3.select(AnimatePath)
    const d3Icon = d3.select(IconID)
    const Time = d3Path.attr('T') - 0
    console.log('Time', Time)
    if (Time === 0) {
      // 处理Icon
      const [iconX, iconY] = d3Icon.attr('transform').match(/\d+/gi).map(item => item - 0)// 获取icon的坐标
      // 计算位移函数
      const posFn = (val) => {
        return val === 0
          ? (val, time) => val * time
          : (val, time) => val * (1 - time)
      }
      this.x = posFn(iconX)
      this.y = posFn(iconY)
    }
    // 处理Path
    d3Path.transition()
      .duration(AnimationTime)
      .attr('T', 1)
      .ease(d3.easeLinear)
      .attrTween('stroke-dasharray', () => {
        let d = AnimatePath.getPointAtLength(0)
        return (t) => {
          t = t + Time
          if (t > 1) t = 1
          // console.log(this.x(this.AreaWidth, t))
          const pixelPos = AnimatePath.getPointAtLength(t * lineLength) // 像素经纬度
          console.log(d.x - pixelPos.x)
          d = pixelPos
          d3Icon.attr('transform', `translate(${this.x(this.AreaWidth, t)},${pixelPos.y - 58})`)
          return interpolate(t)
        }
      })
  }
  /**
   * @description 中断对象身上的动画
   * @param {SVGPathElement} AnimatePath
   * @author WuJiaPing
   * @date 2020/10/8
   */
  interruptAnimate (AnimatePath) {
    d3.select(AnimatePath).interrupt()
  }
}
