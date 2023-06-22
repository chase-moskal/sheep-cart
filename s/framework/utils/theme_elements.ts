
import {CSSResultGroup} from "lit"
import {mixinCss} from "../mixins/css.js"
import {obtool} from "@chasemoskal/magical"
import {LiteElementClass} from "./lite_element.js"

export const theme_elements = <
		xElements extends {[key: string]: LiteElementClass}
	>(
		theme: CSSResultGroup,
		elements: xElements,
	) => {

	return obtool(elements).map(
		Element => mixinCss(theme)(Element)
	)
}

