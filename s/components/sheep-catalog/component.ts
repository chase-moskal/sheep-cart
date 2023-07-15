
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {render_op} from "../utils/render_op.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = (context: Context) => class extends QuickElement {
	static styles = style

	render() {
		const route = context.route.value
		const situation_op = context.situation.value

		return html`
			<p>route: zone ${route.zone}</p>
			${render_op(situation_op, situation => situation?.type === "ProductListing"
				? html`
					<ol>
						${situation.products.map(product => html`
							<li>${product.title}</li>
						`)}
					</ol>
					${situation.load_more
						? html`<button @click=${situation.load_more}>load more</button>`
						: undefined}
				`
				: undefined
			)}
		`
	}
}

