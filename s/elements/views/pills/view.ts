
import {css, html} from "lit"
import {GqlCollection, GqlProduct} from "shopify-shepherd"

import {viewbase} from "../../viewbase.js"

export const Pills = viewbase(context => v => v
	.tag("div")
	.name("pills")
	.state()
	.actions()
	.setup()
	.render(() => (product: GqlProduct) => {

		const collections = product.collections.edges
			.map(e => e.node.id)
			.map(id => context.state.collections.find(c => c.id === id))
			.filter(collection => !!collection) as GqlCollection[]

		return html`
			<ol>
				${collections.map(collection => html`
					<li data-collection>${collection.title}</li>
				`)}
				${product.tags.map(tag => html`
					<li data-tag>${tag}</li>
				`)}
			</ol>
		`

	})
	.css(context.theme, css`

		ol {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			gap: 0.5em;
		}

		li {
			border: 1px solid white;
			background: #fff2;
			border-radius: 1em;
			padding: 0 0.5em;

			&[data-collection] {
				background: #8af2;
				border-color: cyan;
			}
		}

	`)
)

