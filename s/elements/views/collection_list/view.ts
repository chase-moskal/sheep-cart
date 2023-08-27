
import {html} from "lit"

import {styles} from "./style.css.js"
import {view} from "../../frontend.js"
import {bg_img} from "./utils/bg_img.js"
import {Options} from "./utils/options.js"
import {sort_collections} from "./utils/sort_collections.js"

export const CollectionList = view({
		name: "collection-list",
		styles,
		views: {},
	}).render(({router}) => _views => _use => ({collections, prioritized, hidden}: Options) => html`

	<div part=grid>
		${sort_collections(collections, prioritized, hidden)
			.map(collection => html`
				<a
					part=bar
					data-id="${collection.id}"
					style="${bg_img(collection)}"
					href="${router.routes.collection(collection).url}">
					${collection.title}
				</a>
			`)
		}
	</div>
`)

