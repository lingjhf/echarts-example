import type { Geometry } from 'geojson'

export function polylineStringToArray(value: string) {
  return value.split('|').map((line: string) => {
    return line.split(';').map((item: string) => {
      const i = item.split(',')
      return [Number(i[0]), Number(i[1])]
    })
  })
}

export function polylineStringToGeometry(value: string): Geometry {
  const coordinates = value.split('|').map((line: string) => {
    return line.split(';').map((item: string) => {
      const i = item.split(',')
      return [Number(i[0]), Number(i[1])]
    })
  })
  return { type: 'MultiLineString', coordinates }
}