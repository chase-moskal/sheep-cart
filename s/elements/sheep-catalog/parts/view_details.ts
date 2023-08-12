
import {prefix_parts} from "../../../tools/prefix_parts.js"
import {addbutton_states} from "../../views/coolbutton/helpers/add_button.js"

export const card_parts_2 = (subject: string) => `
	card,
	a,
	price,
	sale,
	pill-collection,
	pill-tag,
	addbutton,
	${addbutton_states}
	${prefix_parts(`${subject}-card`, `
		price,
		sale,
		pill-collection,
		pill-tag,
		addbutton,
		img,
		plate,
		title,
	`)}
`

export const list_details = {
	part: "list",
	exportparts: card_parts_2("list"),
}

export const focus_details = {
	part: "focus",
	exportparts: card_parts_2("focus"),
}

