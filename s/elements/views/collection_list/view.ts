
import {html} from "lit"

import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {bgstyle} from "./utils/bgstyle.js"
import {viewbase} from "../../viewbase.js"
import {sort_collections} from "./utils/sort_collections.js"

export const CollectionList = viewbase(context => v => v
	.tag("div")
	.name("collection-list")
	.state()
	.actions()
	.setup()
	.render(() => ({collections, prioritized, hidden}: Options) => html`
		<div part=grid>
			${sort_collections(collections, prioritized, hidden)
				.map(collection => html`
					<a
						part=bar
						data-id="${collection.id}"
						style="${bgstyle(collection)}"
						href="${context.router.routes.collection(collection).url}">
							${collection.title}
					</a>
				`)
			}
		</div>
	`)
	.css(context.theme, style)
)

