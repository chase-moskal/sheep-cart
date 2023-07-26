
import {html} from "lit"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {bgstyle} from "./utils/bgstyle.js"
import {viewbase} from "../../viewbase.js"

export const CollectionList = viewbase(context => v => v
	.tag("div")
	.name("collection-list")
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

