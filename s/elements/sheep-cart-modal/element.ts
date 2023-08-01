
import {html} from "lit"
import {QuickElement, attributes} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepCartModal = (context: Context) => class extends QuickElement {
	static styles = style

	#attrs = attributes<{open: string}>(this)

	get #dialog() {
		return this.root.querySelector("dialog")!
	}

	init() {
		this.setup(() => context.flat.auto({
			debounce: false,
			discover: false,
			collector: () => ({cart_open: context.state.cart_open}),
			responder: ({cart_open}) => {
				this.#attrs.boolean.open = cart_open
				if (cart_open)
					this.#dialog.showModal()
				else
					this.#dialog.close()
			},
		}))
	}

	#close = () => context.toggle_cart_open(false)

	#backdrop_close = (event: MouseEvent) => {
		if (event.target === this.#dialog)
			this.#close()
	}

	render() {
		return html`
			<dialog @click=${this.#backdrop_close}>

				<sheep-cart part=cart>
					<slot></slot>
				</sheep-cart>

				<div class=actions>
					<button class=close @click=${this.#close}>
						close
					</button>
				</div>

			</dialog>
		`
	}
}

