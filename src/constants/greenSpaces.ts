import { GreenSpaceLabel, GreenSpaceColor } from '@/types/enums/greenSpacesEnums'
import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'

export const greenSpacesItems: GreenSpacesItem[] = [
  {
    labelKey: GreenSpaceLabel.PARK,
    value: LeisureType.PARK,
    color: GreenSpaceColor.PARK,
    icon: IconNamesMaterial.PARK,
  },
  {
    labelKey: GreenSpaceLabel.GARDEN,
    value: LeisureType.GARDEN,
    color: GreenSpaceColor.GARDEN,
    icon: IconNamesMaterial.GARDEN,
  },
  {
    labelKey: GreenSpaceLabel.PLAYGROUND,
    value: LeisureType.PLAYGROUND,
    color: GreenSpaceColor.PLAYGROUND,
    icon: IconNamesMaterial.PLAYGROUND,
  },
  {
    labelKey: GreenSpaceLabel.PITCH,
    value: LeisureType.PITCH,
    color: GreenSpaceColor.PITCH,
    icon: IconNamesMaterial.PITCH,
  },
  {
    labelKey: GreenSpaceLabel.FOREST,
    value: LanduseType.FOREST,
    color: GreenSpaceColor.FOREST,
    icon: IconNamesMaterial.FOREST,
  },
  {
    labelKey: GreenSpaceLabel.WOOD,
    value: NaturalType.WOOD,
    color: GreenSpaceColor.WOOD,
    icon: IconNamesMaterial.WOOD,
  },
  {
    labelKey: GreenSpaceLabel.NATURE_RESERVE,
    value: NaturalType.NATURE_RESERVE,
    color: GreenSpaceColor.NATURE_RESERVE,
    icon: IconNamesMaterial.NATURE_RESERVE,
  },
]
