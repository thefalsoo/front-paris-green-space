import type { IconNamesMaterial } from '../enums/iconNamesEnums'
import type { IndicatorTitle, IndicatorValue } from '../enums/indicatorsEnums'
import type { OverpassElementType } from '../enums/overpassResponseEnums'

export interface IndicatorsType {
  title: IndicatorTitle
  value: IndicatorValue
  overpassElementType?: OverpassElementType
  iconName: IconNamesMaterial
  disabledIndicator: boolean
  disabledImport: boolean
}
