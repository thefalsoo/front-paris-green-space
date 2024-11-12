import type { SwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'
import type { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQuery'
import type { QueryParams } from '@/types/interfaces/overpassQuery'

export function generateQueryParamsFromFilters(item: SwitchItems[]): QueryParams {
  const queryParams: QueryParams = {
    leisureTypes: [],
    landuseTypes: [],
    naturalTypes: [],
  }

  item.forEach((switchItem) => {
    if (switchItem.checked) {
      if (['park', 'garden', 'playground', 'pitch'].includes(switchItem.value)) {
        queryParams.leisureTypes.push(switchItem.value as LeisureType)
      } else if (['forest', 'nature_reserve'].includes(switchItem.value)) {
        queryParams.landuseTypes.push(switchItem.value as LanduseType)
      } else if (['wood', 'botanical_garden'].includes(switchItem.value)) {
        queryParams.naturalTypes.push(switchItem.value as NaturalType)
      }
    }
  })

  return queryParams
}
