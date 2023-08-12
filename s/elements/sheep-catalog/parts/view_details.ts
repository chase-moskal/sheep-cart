
import {card_parts} from "../../views/product_card/view.js"
import {copy_and_prefix_parts} from "../../../tools/prefix_parts.js"

export const list_details = {
	part: "list",
	exportparts: copy_and_prefix_parts("list", card_parts),
}

export const focus_details = {
	part: "focus",
	exportparts: copy_and_prefix_parts("focus", card_parts),
}

