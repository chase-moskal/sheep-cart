
import {html} from "lit"

import {style} from "./style.css.js"
import {view} from "../../view-base.js"
import {Options} from "./utils/options.js"
import {bgstyle} from "./utils/bgstyle.js"

export const CollectionList = view("div", "collection-list", context => v => v
	.state()
	.actions()
	.setup()
	.render(() => ({collections}: Options) => html`
		${collections.map(collection => html`
			<a
				style="${bgstyle(collection)}"
				href="${context.router.routes.collection(collection).url}">
					${collection.title}
			</a>
		`)}
	`)
	.css(context.theme, style)
)

