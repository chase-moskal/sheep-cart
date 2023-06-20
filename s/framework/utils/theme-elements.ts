
import {CSSResultGroup} from "lit"
import {mixinCss} from "../mixins/css.js"
import {obtool} from "@chasemoskal/magical"
import {LiteElementClass} from "./lite-element.js"

export const themeElements = <
		xElements extends {[key: string]: LiteElementClass}
	>(
		theme: CSSResultGroup,
		elements: xElements,
	) => {

	return obtool(elements).map(
		Element => mixinCss(theme)(Element)
	)
}

