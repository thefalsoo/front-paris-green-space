export interface Geometry {
  lat: number
  lon: number
}

export enum OverpassElementType {
  NODE = 'node',
  WAY = 'way',
  RELATION = 'relation',
}

export interface OverpassElement {
  type: OverpassElementType
  id: number
  lat?: number
  lon?: number
  tags: { [key: string]: string }
  geometry?: Geometry[]
}

export interface OverpassResponse {
  version: string
  generator: string
  osm3s: {
    timestamp_osm_base: string
    timestamp_areas_base: string
    copyright: string
  }
  elements: OverpassElement[]
}
