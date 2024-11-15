import { OverpassFeatureType } from '@/types/enums/overpassQueryEnums'
import type { QueryParams } from '@/types/interfaces/overpassQueryInterfaces'

export function generateOverpassQuery(params: QueryParams): string {
  const { leisureTypes = [], landuseTypes = [], naturalTypes = [] } = params

  const leisureQuery = leisureTypes.length
    ? leisureTypes
        .map(
          (type) =>
            `way["${OverpassFeatureType.LEISURE}"~"${type}"](area.searchArea); relation["${OverpassFeatureType.LEISURE}"~"${type}"](area.searchArea);`,
        )
        .join(' ')
    : ''

  const landuseQuery = landuseTypes.length
    ? landuseTypes
        .map(
          (type) =>
            `way["${OverpassFeatureType.LANDUSE}"="${type}"](area.searchArea); relation["${OverpassFeatureType.LANDUSE}"="${type}"](area.searchArea);`,
        )
        .join(' ')
    : ''

  const naturalQuery = naturalTypes.length
    ? naturalTypes
        .map(
          (type) =>
            `way["${OverpassFeatureType.NATURAL}"="${type}"](area.searchArea); relation["${OverpassFeatureType.NATURAL}"="${type}"](area.searchArea);`,
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
