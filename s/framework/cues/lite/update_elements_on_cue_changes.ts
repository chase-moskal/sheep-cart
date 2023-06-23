
import {obtool} from "@chasemoskal/magical"

import {CueGroup} from "../group.js"
import {mixin_cues} from "./mixin_cues.js"
import {LiteElementClass} from "../../utils/lite_element.js"

type Elements = {[key: string]: LiteElementClass}

export function update_elements_on_cue_changes<E extends Elements>(
		cues: CueGroup,
		elements: E,
	) {

	return obtool(elements).map(
		(Element: any) => mixin_cues(cues)(Element)
	) as E
}

