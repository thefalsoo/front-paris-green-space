import type { QueryParams } from '@/types/interfaces/overpassQueryInterfaces'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import { generateOverpassQuery } from '@/utils/generateOverpassQueryUtility'
import axios from 'axios'

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

export const getGreenSpaces = async (params: QueryParams): Promise<OverpassResponse> => {
  const query = generateOverpassQuery(params)

  try {
    const response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des espaces verts :', error)
    throw new Error('Erreur lors de la récupération des espaces verts')
  }
}

export const getTrees = async (): Promise<OverpassResponse> => {
  const query = `
    [out:json];
    area["wikidata"="Q90"]->.searchArea;
    (
      node["natural"="tree"](area.searchArea);
    );
    out geom;
  `

  try {
    const response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des arbres :', error)
    throw new Error('Erreur lors de la récupération des arbres')
  }
}
