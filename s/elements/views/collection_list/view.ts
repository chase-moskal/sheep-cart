
import {html} from "@benev/slate"

import {styles} from "./style.css.js"
import {bg_img} from "./utils/bg_img.js"
import {obsidian} from "../../frontend.js"
import {Options} from "./utils/options.js"
import {sort_collections} from "./utils/sort_collections.js"

export const CollectionList = obsidian({styles, name: "collection-list"}, use => (props: Options) => {
	const {router} = use.context
	const {collections, prioritized, hidden} = props

	return html`
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
	`
})
