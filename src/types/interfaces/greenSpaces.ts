import type { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQuery'
import type { GreenSpaceColor, GreenSpaceLabel } from '../enums/greenSpaces'

export interface GreenSpacesItem {
  labelKey: GreenSpaceLabel
  value: LeisureType | LanduseType | NaturalType
  color: GreenSpaceColor
}
