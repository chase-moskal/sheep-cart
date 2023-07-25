
import {css, html} from "lit"
import {flatview} from "@benev/frog"
import {GqlCollection} from "shopify-shepherd"

import {Context} from "../../../context/context.js"

type Options = {
	collections: GqlCollection[]
	make_link: (collection: GqlCollection) => string
}

export const CollectionList = (context: Context) => flatview(context.flat)
	.state()
	.actions()
	.setup()

	.render(() => ({collections, make_link}: Options) => {
		console.log(collections)
		return html`
			${collections.map(collection => html`
				<div data-id="${collection.id}">
					<a part="a" href="${make_link(collection)}">
						${collection.title}
					</a>
				</div>
			`)}
		`
	})

	.css(context.theme, css`
		:host {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));
			width: 100%;
		}
		:host > div {
			outline: 1px solid green;
		}
	`)

