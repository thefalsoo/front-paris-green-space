import { GreenSpaceLabel, GreenSpaceColor } from '@/types/enums/greenSpacesEnums'
import { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'

export const greenSpacesItems: GreenSpacesItem[] = [
  { labelKey: GreenSpaceLabel.PARK, value: LeisureType.PARK, color: GreenSpaceColor.PARK },
  { labelKey: GreenSpaceLabel.GARDEN, value: LeisureType.GARDEN, color: GreenSpaceColor.GARDEN },
  {
    labelKey: GreenSpaceLabel.PLAYGROUND,
    value: LeisureType.PLAYGROUND,
    color: GreenSpaceColor.PLAYGROUND,
  },
  { labelKey: GreenSpaceLabel.PITCH, value: LeisureType.PITCH, color: GreenSpaceColor.PITCH },
  { labelKey: GreenSpaceLabel.FOREST, value: LanduseType.FOREST, color: GreenSpaceColor.FOREST },
  { labelKey: GreenSpaceLabel.WOOD, value: NaturalType.WOOD, color: GreenSpaceColor.WOOD },
  {
    labelKey: GreenSpaceLabel.NATURE_RESERVE,
    value: NaturalType.NATURE_RESERVE,
    color: GreenSpaceColor.NATURE_RESERVE,
  },
]
