import type { OverpassResponse } from '@/types/overpassResponse'
import axios from 'axios'

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

/**
 * Requête Overpass pour obtenir les espaces verts à Paris.
 */
export const getGreenSpaces = async (): Promise<OverpassResponse> => {
  const query = `
    [out:json];
    area["wikidata"="Q90"]->.searchArea;
    (
      way["leisure"~"park|garden|pitch|playground"](area.searchArea);
      relation["leisure"~"park|garden|pitch|playground"](area.searchArea);
      way["landuse"="forest"](area.searchArea);
      relation["landuse"="forest"](area.searchArea);
      way["natural"="wood"](area.searchArea);
      relation["natural"="wood"](area.searchArea);
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
    console.error('Erreur lors de la récupération des espaces verts :', error)
    throw new Error('Erreur lors de la récupération des espaces verts')
  }
}

/**
 * Requête Overpass pour obtenir les arbres à Paris.
 */
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