import type { GeoJSON } from 'geojson'

export function polylineStringToArray(value: string) {
  return value.split('|').map((line: string) => {
    return line.split(';').map((item: string) => {
      const i = item.split(',')
      return [Number(i[0]), Number(i[1])]
    })
  })
}

export function polylineStringToGeoJSON(value: string): GeoJSON {
  const coordinates = value.split('|').map((line: string) => {
    return line.split(';').map((item: string) => {
      const i = item.split(',')
      return [Number(i[0]), Number(i[1])]
    })
  })
  return {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: [], geometry: { type: 'MultiLineString', coordinates } }]
  }
}