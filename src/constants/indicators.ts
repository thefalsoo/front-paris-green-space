import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import { IndicatorTitle, IndicatorValue } from '@/types/enums/indicatorsEnums'
import { OverpassElementType } from '@/types/enums/overpassResponseEnums'

export const indicators = {
  trees: {
    title: IndicatorTitle.TREES,
    value: IndicatorValue.TREES,
    overpassElementType: OverpassElementType.NODE,
    iconName: IconNamesMaterial.TREES,
    disabledIndicator: false,
    disabledImport: true,
  },
  parks: {
    title: IndicatorTitle.GREEN_SPACES,
    value: IndicatorValue.GREEN_SPACES,
    overpassElementType: OverpassElementType.WAY,
    iconName: IconNamesMaterial.PARK,
    disabledIndicator: false,
    disabledImport: true,
  },
  heatIsland: {
    title: IndicatorTitle.HEAT_ISLANDS,
    value: IndicatorValue.TREES,
    iconName: IconNamesMaterial.HOT,
    disabledIndicator: true,
    disabledImport: false,
  },
}
