
import {obtool} from "@chasemoskal/magical"
import {Snapstate} from "@chasemoskal/snapstate"

import {mixinSnap} from "../mixins/snap.js"
import {LiteElementClass} from "./lite_element.js"

type Elements = {[key: string]: LiteElementClass}

export function update_quick_elements_on_snap_changes<E extends Elements>(
		snaps: Snapstate<any>[],
		elements: E,
	) {

	return obtool(elements).map(
		(Element: any) => mixinSnap(...snaps)(Element)
	) as E
}

