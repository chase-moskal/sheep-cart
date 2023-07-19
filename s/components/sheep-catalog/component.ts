
import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {render_op} from "../utils/render_op.js"
import {Context} from "../../context/context.js"

export const SheepCatalog = ({state}: Context) => class extends QuickElement {
	static styles = style

	render() {
		const {route, situation_op} = state
		return html`
			<p>route: zone ${route.zone}</p>
			${render_op(situation_op, situation => situation?.type === "ProductListing"
				? html`
					<ol>
						${situation.products.map(product => html`
							<li>${product.title}</li>
						`)}
					</ol>
					${render_op(situation.load_more_op, () => situation.load_more
						? html`<button @click=${situation.load_more}>load more</button>`
						: undefined)}
				`
				: undefined
			)}
		`
	}
}

