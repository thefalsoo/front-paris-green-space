import type { IconNamesMaterial } from '../enums/iconNames'

export interface SelectItem {
  label: string
  value: string
  iconName?: IconNamesMaterial
  disabled?: boolean
}
