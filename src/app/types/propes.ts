import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface TabItem {
    key: number | string,
    label: string,
    icon: IconProp,
    children?: any
}
