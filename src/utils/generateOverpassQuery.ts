import { OverpassElementType } from '@/types/enums/overpassQuery'
import type { QueryParams } from '@/types/interfaces/overpassQuery'

export function generateOverpassQuery(params: QueryParams): string {
  const { leisureTypes = [], landuseTypes = [], naturalTypes = [] } = params

  const leisureQuery = leisureTypes.length
    ? leisureTypes
        .map(
          (type) =>
            `way["${OverpassElementType.LEISURE}"~"${type}"](area.searchArea); relation["${OverpassElementType.LEISURE}"~"${type}"](area.searchArea);`,
        )
        .join(' ')
    : ''

  const landuseQuery = landuseTypes.length
    ? landuseTypes
        .map(
          (type) =>
            `way["${OverpassElementType.LANDUSE}"="${type}"](area.searchArea); relation["${OverpassElementType.LANDUSE}"="${type}"](area.searchArea);`,
        )
        .join(' ')
    : ''

  const naturalQuery = naturalTypes.length
    ? naturalTypes
        .map(
          (type) =>
            `way["${OverpassElementType.NATURAL}"="${type}"](area.searchArea); relation["${OverpassElementType.NATURAL}"="${type}"](area.searchArea);`,
        )
        .join(' ')
    : ''

  return `
    [out:json];
    area["wikidata"="Q90"]->.searchArea;
    (${leisureQuery} ${landuseQuery} ${naturalQuery});
    out geom;
  `
}
