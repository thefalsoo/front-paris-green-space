import type { LanduseType, LeisureType, NaturalType } from '../enums/overpassQuery'

export interface QueryParams {
  leisureTypes: LeisureType[]
  landuseTypes: LanduseType[]
  naturalTypes: NaturalType[]
}
