import L from 'leaflet'

export class PromptRender {
  #AnimationTime=null// 动画时间
  #EndLatLng=null// 终点
  #prompt=null
  /**
   * @description 初始化Prompt
   * @param {Object} map 全局地图对象
   * @param {Array} trajectory 移动路径数组
   * @param {Number} duration 动画持续时间
   * @param {Object} options Prompt配置
   * @return
   * @author wujiaping
   * @date 2020/8/25
   * @example
   * trajectory: [[37.967385, 117.632437], [41.755787, 119.722567]]
   * duration:7 //单位为秒
   * options:{
   * draggable:true //是否可拖拽 boolean
   * className:'zzz' // 类名 String
   * }
   */
  constructor (map, trajectory, duration, options) {
    // options处理
    console.log('options', options)
    // 初始化数据
    const StartLatLng = trajectory[0]
    this.#EndLatLng = trajectory[1]
    this.#AnimationTime = duration
    const PromptDIV = L.divIcon({ className: 'zzz', iconSize: [60, 60] })
    this.#prompt = L.marker(StartLatLng, { icon: PromptDIV, draggable: 'true' }).addTo(map)
    // 动画相关处理
    const fx = new L.PosAnimation()
    // 动画停止计算对应剩余的动画时间
    fx.on('end', (e) => {
      this.#AnimationTime = this.#AnimationTime - (new Date().getTime() - e.target._startTime) / 1000
    })
    // 缩放事件处理
    // map.on('zoomstart', () => {
    //   fx.stop()
    //   const Point = L.DomUtil.getPosition(this.#prompt._icon)
    //   this.#prompt.setLatLng(map.layerPointToLatLng(Point))
    // })
    // map.on('zoomend', () => {
    //   fx.run(this.#prompt._icon, map.latLngToLayerPoint(this.#EndLatLng), Time)
    // })
  }
}
