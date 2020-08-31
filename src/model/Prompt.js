import L from 'leaflet'

export default class Prompt {
  fx=null// 动画实例
  duration=null// 持续时间
  StartPoint=null// 开始像素位置
  EndPoint=null// 结束像素位置

  constructor (map, trajectory, duration) {
    // 初始化Prompt
    const PromptDIV = L.divIcon({ className: '', iconSize: [60, 60] })
    const Prompt = L.marker(trajectory[0], { icon: PromptDIV, draggable: true }).addTo(map)
    //
    const EndPoint = map.layerPointToLatLng(trajectory[1])
    // 动画相关处理
    const fx = new L.PosAnimation()
    // 动画中断|停止计算对应剩余的动画时间
    let fxStartTime = 0// 记录动画开始时间
    fx.on('start', (e) => {
      fxStartTime = e.target._startTime
    })
    // 注册Prompt的拖拽事件
    let DragStartPoint = null // 记录拖拽开始前的位置
    Prompt.on('dragstart', () => {
      fx.stop()
      DragStartPoint = L.DomUtil.getPosition(Prompt._icon)
    })
    Prompt.on('dragend', () => {
      const currentPoint = L.DomUtil.getPosition(Prompt._icon)
      const currentTime = new Date().getTime()
      EndPoint.x = EndPoint.x + currentPoint.x - DragStartPoint.x
      EndPoint.y = EndPoint.y + currentPoint.y - DragStartPoint.y
      duration = duration - (currentTime - fxStartTime) / 1000
      fx.run(Prompt._icon, EndPoint, duration)
    })
    // 注册Prompt的缩放事件
    map.on('zoomstart', () => {
      fx.stop()
      const Point = L.DomUtil.getPosition(Prompt._icon)
      Prompt.setLatLng(map.layerPointToLatLng(Point))
    })
    map.on('zoomend', () => {
      const currentTime = new Date().getTime()
      duration = duration - (currentTime - fxStartTime) / 1000
      fx.run(Prompt._icon, EndPoint, duration)
    })
    // 挂载
    this.fx = fx
  }

  CreateAnimation (trajectory, duration) {
  }

  start () {
  }

  stop () {

  }

  cancel () {

  }
}
