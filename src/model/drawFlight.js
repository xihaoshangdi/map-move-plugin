import DrawSvgShape from '@/model/drawSvgShape'
class DrawFlight {
  #GlobalMap=null
  #RenderLayer=null
  constructor (map) {
    this.#GlobalMap = map
    this.drawSvgShape = new DrawSvgShape(map)
    console.log('this.#RenderLayer', this.#RenderLayer)
  }

  draw (data = [[51.5, -122.68], [55.5, -122.43], [57.5, -118.2]]) {
    // 画航线
    this.drawSvgShape.polyline(data, 'yyy')
    // 画飞机
    this.drawSvgShape.marker([51.5, -122.68], 'yyy')
    // 画拖拽框
  }
}

export default DrawFlight
