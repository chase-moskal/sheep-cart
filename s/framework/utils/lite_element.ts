
import {CSSResultGroup, TemplateResult} from "lit"

export type LiteElement = HTMLElement & {
	connectedCallback(): void
	disconnectedCallback(): void
	render(): TemplateResult | void
	requestUpdate(): Promise<void>
}

export type LiteElementClass = {
	new(...args: any[]): LiteElement
	styles?: CSSResultGroup
}

