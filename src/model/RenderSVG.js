import L from 'leaflet'
import * as d3 from 'd3'

export default class RenderSVG {
  constructor (Map, ActualPath) {
    this.Map = Map
    this.ActualPath = ActualPath
    const Path = JSON.parse(JSON.stringify(ActualPath))
    const Points = Path.map(item => Map.latLngToLayerPoint(item))
    this.AreaWidth = getDeviateOfArray(Points.map(item => item.x))
    this.AreaHeight = getDeviateOfArray(Points.map(item => item.y))
  }

  RenderArea () {
    this.renderLay = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.renderLay.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.renderLay.setAttribute('viewBox', `0 0 ${this.AreaWidth} ${this.AreaHeight}`)
    this.renderLay.setAttribute('style', 'border:1px solid red')
    L.svgOverlay(this.renderLay, this.ActualPath).addTo(this.Map)
    return this.renderLay
  }

  RenderLine () {
    const polyline = L.polyline(this.ActualPath, { color: 'red' }).addTo(this.Map)
    return polyline._path
  }

  RenderIcon () {
    const result = this.ActualPath.map(item => this.Map.latLngToLayerPoint(item))
    //
    const resultX = result.map(item => item.x)
    const minX = Math.min(...resultX)
    const iconX = resultX.shift() - minX
    //
    const resultY = result.map(item => item.y)
    const minY = Math.min(...resultY)
    const iconY = resultY.shift() - minY
    //
    d3.select(this.renderLay)
      .append('g')
      .append('circle')
      .attr('r', 10)
      .attr('id', 'marker')
      .attr('transform', `translate(${iconX || 0},${iconY})`)
  }
}

function getDeviateOfArray (arr) {
  return Math.max(...arr) - Math.min(...arr)
}
