
import {css, html, svg} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"
import {shopping_cart_icon} from "../../icons/feather/shopping_cart_icon.js"

export const SheepCartButton = (context: Context) => class extends QuickElement {

	#toggle = () => {
		context.state.cart_open = !context.state.cart_open
	}

	render() {
		return html`
			<button
				part=button
				@click=${this.#toggle}>

				${shopping_cart_icon(svg)}
			</button>
		`
	}

	static styles = css`
		button {
			padding: 1em;
		}
	`
}

