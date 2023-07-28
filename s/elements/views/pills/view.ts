
import {css, html} from "lit"
import {GqlCollection, GqlProduct} from "shopify-shepherd"

import {flappy} from "../../flappy.js"

export const Pills = flappy("div", "pills")
	.render(context => _ => (product: GqlProduct) => {

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
	.styles(css`

		ol {
			display: flex;
			flex-wrap: wrap;
			list-style: none;
			gap: 0.1em;
		}

		li {
			border: 1px solid currentColor;
			padding: 0 0.3em;

			&[data-collection] {
				border-radius: 0.3em;
			}

			&[data-tag] {
				opacity: 0.7;
				border-radius: 1em;
			}
		}
	`)

