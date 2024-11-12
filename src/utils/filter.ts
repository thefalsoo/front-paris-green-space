import type { SwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'
import { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQuery'
import type { QueryParams } from '@/types/interfaces/overpassQuery'

export function generateQueryParamsFromFilters(item: SwitchItems[]): QueryParams {
  const queryParams: QueryParams = {
    leisureTypes: [],
    landuseTypes: [],
    naturalTypes: [],
  }

  item.forEach((switchItem) => {
    if (switchItem.checked) {
      if (
        [LeisureType.PARK, LeisureType.GARDEN, LeisureType.PLAYGROUND, LeisureType.PITCH].includes(
          switchItem.value as LeisureType,
        )
      ) {
        queryParams.leisureTypes.push(switchItem.value as LeisureType)
      } else if (
        [LanduseType.FOREST, NaturalType.NATURE_RESERVE].includes(switchItem.value as LanduseType)
      ) {
        queryParams.landuseTypes.push(switchItem.value as LanduseType)
      } else if ([NaturalType.WOOD].includes(switchItem.value as NaturalType)) {
        queryParams.naturalTypes.push(switchItem.value as NaturalType)
      }
    }
  })

  return queryParams
}
