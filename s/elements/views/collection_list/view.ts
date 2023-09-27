
import {html} from "lit"
import {ShaleView} from "@benev/slate"

import {styles} from "./style.css.js"
import {view} from "../../frontend.js"
import {bg_img} from "./utils/bg_img.js"
import {Options} from "./utils/options.js"
import {sort_collections} from "./utils/sort_collections.js"

export const CollectionList = view(context => class extends ShaleView {
	static name = "collection-list"
	static styles = styles

	render({collections, prioritized, hidden}: Options) {
		const {router} = context
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
	}
})

