import type { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpaceColor, GreenSpaceLabel } from '../enums/greenSpacesEnums'

export interface GreenSpacesItem {
  labelKey: GreenSpaceLabel
  value: LeisureType | LanduseType | NaturalType
  color: GreenSpaceColor
}
