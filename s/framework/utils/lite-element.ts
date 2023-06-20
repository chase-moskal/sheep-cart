
import {CSSResultGroup} from "lit"

export type LiteElement = HTMLElement

export type LiteElementClass = {
	new(...args: any[]): LiteElement
	styles?: CSSResultGroup
}

