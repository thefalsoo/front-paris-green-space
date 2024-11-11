import type { IconNamesMaterial } from '../enums/iconNames'
import type { IndicatorTitles, IndicatorValue } from '../enums/indicators'
import type { OverpassElementType } from '../enums/overpassResponse'

export interface IndicatorsType {
  title: IndicatorTitles
  value: IndicatorValue
  overpassElementType: OverpassElementType
  iconName: IconNamesMaterial
}
