import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import { IndicatorTitle, IndicatorValue } from '@/types/enums/indicatorsEnums'
import { OverpassElementType } from '@/types/enums/overpassResponseEnums'

export const indicators = {
  trees: {
    title: IndicatorTitle.TREES,
    value: IndicatorValue.TREES,
    overpassElementType: OverpassElementType.NODE,
    iconName: IconNamesMaterial.TREES,
  },
  parks: {
    title: IndicatorTitle.GREEN_SPACES,
    value: IndicatorValue.GREEN_SPACES,
    overpassElementType: OverpassElementType.WAY,
    iconName: IconNamesMaterial.PARK,
  },
}
