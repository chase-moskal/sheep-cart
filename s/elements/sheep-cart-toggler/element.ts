
import {css, html, svg} from "lit"
import {QuickElement} from "@benev/frog"

import {Context} from "../../context/context.js"
import {shopping_cart_icon} from "../../icons/feather/shopping_cart_icon.js"

export const SheepCartToggler = (context: Context) => class extends QuickElement {

	#state = context.flat.state({open: false})

	#toggle = () => {
		this.#state.open = !this.#state.open
	}

	render() {
		return html`

			<button
				part=button
				@click=${this.#toggle}>
				${shopping_cart_icon(svg)}
			</button>

			<sheep-cart
				part=cart
				?hidden=${!this.#state.open}>
			</sheep-cart>
		`
	}

	static styles = css`
		:host {
			position: relative;
		}

		sheep-cart {
			position: absolute;
			z-index: 1;
			right: 0;
			width: 40em;
			min-height: 20em;
			padding: 1em;

			color: #222c;
			background: #ccce;
			backdrop-filter: blur(10px);
			box-shadow: 0.1em 0.3em 1em #0008;
		}

		:host([sprawl="rightwards"]) sheep-cart {
			right: unset;
			left: 0;
		}
	`
}

