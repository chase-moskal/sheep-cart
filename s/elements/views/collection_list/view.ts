
import {html} from "lit"

import {view} from "../../view.js"
import {style} from "./style.css.js"
import {Options} from "./utils/options.js"
import {bgstyle} from "./utils/bgstyle.js"
import {sort_collections} from "./utils/sort_collections.js"

export const CollectionList = view("collection-list")
	.render(({router}) => _ => ({collections, prioritized, hidden}: Options) => html`
		<div part=grid>
			${sort_collections(collections, prioritized, hidden)
				.map(collection => html`
					<a
						part=bar
						data-id="${collection.id}"
						style="${bgstyle(collection)}"
						href="${router.routes.collection(collection).url}">
							${collection.title}
					</a>
				`)
			}
		</div>
	`)
	.styles(style)

