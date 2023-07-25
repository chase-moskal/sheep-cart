
import {html} from "lit"
import {flatview} from "@benev/frog"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {bgstyle} from "./utils/bgstyle.js"
import {Context} from "../../../context/context.js"

export const CollectionList = (context: Context) => flatview(context.flat)
	.state()
	.actions()
	.setup()
	.render(() => ({collections, make_link}: Options) => html`
		${collections.map(collection => html`
			<a style="${bgstyle(collection)}" href="${make_link(collection)}">
				${collection.title}
			</a>
		`)}
	`)
	.css(context.theme, style)

