import {html} from "lit"
import {QuickElement} from "@benev/frog"

import {style} from "./style.css.js"
import {Context} from "../../context/context.js"

export const SheepModal = (context: Context) => class extends QuickElement {
	static styles = style
	
	render() {
		return html`
			<dialog
				part="dialog"
				@click=${context.modal.close}
				?open=${!!context.modal.modal_state.img}>
				<img
					@click=${context.modal.close}
					alt=${context.modal.modal_state.img?.alt!}
					src=${context.modal.modal_state.img?.src!}>
			</dialog>`
	}
}
