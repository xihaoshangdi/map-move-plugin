import L from 'leaflet'

export default class PromptRender {
  #GlobalMap=null // 全局Map对象
  #AnimationTime=null// 动画时间
  #StartLatLng=null// 终点
  #EndLatLng=null// 终点
  #prompt=null
  /**
   * @description 初始化Prompt
   * @param {Object} map 全局地图对象
   * @param {Array} trajectory 移动路径数组
   * @param {Number} duration 动画持续时间
   * @param {Object} options Prompt配置
   * @return
   * @author WuJiaPing
   * @date 2020/8/25
   * @example
   * trajectory: [[37.967385, 117.632437], [41.755787, 119.722567]]
   * duration:7 //单位为秒
   * options:{
   * draggable:true //是否可拖拽 boolean
   * className:'zzz' // 类名 String
   * }
   */
  constructor (map, trajectory, duration, options = {}) {
    // 挂在数据
    this.#GlobalMap = map
    this.#StartLatLng = trajectory[0]
    this.#EndLatLng = trajectory[1]
    this.#AnimationTime = duration
    // options处理
    console.log('options', options)
    //
    const DivClass = 'zzz'
    const drag = true
    // 初始化Prompt
    const PromptDIV = L.divIcon({ className: DivClass, iconSize: [60, 60] })
    const Prompt = L.marker(this.#StartLatLng, { icon: PromptDIV, draggable: `${drag}` }).addTo(map)
    this.#prompt = Prompt._icon
    // Prompt用于处理监听事件   this.#prompt 用于地图定位 fx用于动画操作
    // 动画相关处理
    const fx = new L.PosAnimation()
    // 动画中断|停止计算对应剩余的动画时间
    let fxStartTime = 0// 记录动画开始时间
    fx.on('start', (e) => {
      fxStartTime = e.target._startTime
    })
    // 注册Prompt的拖拽事件
    let DragStartLatLng = null // 记录拖拽开始前的位置
    Prompt.on('dragstart', () => {
      fx.stop()
      const currentPoint = L.DomUtil.getPosition(this.#prompt)
      console.log('drag', L.DomUtil.getPosition(this.#prompt))
      DragStartLatLng = map.layerPointToLatLng(currentPoint)
    })
    Prompt.on('dragend', () => {
      const currentPoint = L.DomUtil.getPosition(this.#prompt)
      const currentLatLng = map.layerPointToLatLng(currentPoint)
      const currentTime = new Date().getTime()
      this.#EndLatLng[0] = this.#EndLatLng[0] + currentLatLng.lat - DragStartLatLng.lat
      this.#EndLatLng[1] = this.#EndLatLng[1] + currentLatLng.lng - DragStartLatLng.lng
      this.#AnimationTime = this.#AnimationTime - (currentTime - fxStartTime) / 1000
      console.log('start', L.DomUtil.getPosition(this.#prompt))
      console.log('end', map.latLngToLayerPoint(this.#EndLatLng))
      fx.run(this.#prompt, map.latLngToLayerPoint(this.#EndLatLng), this.#AnimationTime)
    })
    // 注册Prompt的缩放事件
    map.on('zoomstart', () => {
      fx.stop()
      const Point = L.DomUtil.getPosition(this.#prompt)
      Prompt.setLatLng(map.layerPointToLatLng(Point))
    })
    map.on('zoomend', () => {
      const currentTime = new Date().getTime()
      this.#AnimationTime = this.#AnimationTime - (currentTime - fxStartTime) / 1000
      fx.run(this.#prompt, map.latLngToLayerPoint(this.#EndLatLng), this.#AnimationTime)
    })
    // 播放动画
    fx.run(this.#prompt, map.latLngToLayerPoint(this.#EndLatLng), this.#AnimationTime)
  }
}
