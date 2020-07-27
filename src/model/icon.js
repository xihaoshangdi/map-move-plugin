import L from 'leaflet'

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [20, 20],
    className: ''
  }
})

export const Icon = function (options) {
  return new LeafIcon({ iconUrl: `images/${options}.svg` })
}
