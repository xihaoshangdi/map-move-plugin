import L from 'leaflet'
import { Icon } from '@/model/icon'
import * as d3 from 'd3'
const SvgRenderer = L.svg({ padding: 0.5 })

class DrawSvgShape {
    #GlobalMap=null
    #RenderLayer=null
    constructor (map) {
      this.#GlobalMap = map
      this.#RenderLayer = d3.select(map.getPanes().overlayPane).append('svg')
    }

    /**
     * 绘制地图折线
     * @method polyline
     * @for DrawSvgShape
     * @param {Array} points [[lat,lng]]
     * @param {String} name 'className'
     * @return {Null}
     */
    polyline (points, name) {
      L.polyline(points, { renderer: SvgRenderer, className: name }).addTo(this.#GlobalMap)
    }

    /**
     * 绘制地图标记
     * @method marker
     * @for DrawSvgShape
     * @param {String} iconName 'plant'
     * @return {Null}
     */
    marker (iconName = 'plant', name) {
      L.marker([51.5, -122.68], { icon: Icon(iconName) }).addTo(this.#GlobalMap)
    }
}

export default DrawSvgShape
