import L from 'leaflet'
/**
 * @description 渲染浮动窗
 * @param map 地图对象
 * @param {Array} trajectory 路径数组
 * @return
 * @author wujiaping
 * @date 2020/8/24
 * @example
 *  [[37.967385, 117.632437], [41.755787, 119.722567]]
 */
export const TipRender = function (map, trajectory) {
  const StartLatLng = trajectory[0]
  const EndLatLng = trajectory[1]
  const TipIcon = L.divIcon({ className: 'zzz', iconSize: [60, 60] })
  const tip = L.marker(StartLatLng, { icon: TipIcon, draggable: 'true' }).addTo(map)
  // 初始化动画
  const fx = new L.PosAnimation()
  let Time = 7.5 // 剩余时间
  let start = null// 起始时间
  let occupy = null// 占用时间
  let oldLatLng = null // 旧点位
  // 动画事件处理
  fx.on('end', (e) => {
    Time = Time - (new Date().getTime() - e.target._startTime) / 1000
  })
  // 缩放事件处理
  map.on('zoomstart', () => {
    fx.stop()
    start = new Date().getTime()
    const Point = L.DomUtil.getPosition(tip._icon)
    tip.setLatLng(map.layerPointToLatLng(Point))
  })
  map.on('zoomend', () => {
    occupy = new Date().getTime() - start
    Time = Time - occupy / 1000
    fx.run(tip._icon, map.latLngToLayerPoint(EndLatLng), Time)
  })

  // 拖拽事件处理
  tip.on('dragstart', function () {
    fx.stop()
    start = new Date().getTime()
    const Point = L.DomUtil.getPosition(tip._icon)
    oldLatLng = map.layerPointToLatLng(Point)
  })
  tip.on('dragend', function () {
    const Point = L.DomUtil.getPosition(tip._icon)
    const CurrentLatLng = map.layerPointToLatLng(Point)
    EndLatLng[0] = EndLatLng[0] + CurrentLatLng.lat - oldLatLng.lat
    EndLatLng[1] = EndLatLng[1] + CurrentLatLng.lng - oldLatLng.lng
    // 设置位置
    occupy = new Date().getTime() - start
    console.log('occupy', occupy)
    Time = Time - occupy / 1000
    fx.run(tip._icon, map.latLngToLayerPoint(EndLatLng), Time)
  })
  // 播放动画
  fx.run(tip._icon, map.latLngToLayerPoint(EndLatLng), Time)
}
