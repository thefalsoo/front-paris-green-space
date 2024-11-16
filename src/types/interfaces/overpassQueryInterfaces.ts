import type { LanduseType, LeisureType, NaturalType } from '../enums/overpassQueryEnums'

export interface QueryParams {
  leisureTypes: LeisureType[]
  landuseTypes: LanduseType[]
  naturalTypes: NaturalType[]
}
