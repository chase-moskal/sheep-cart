
import {TemplateResult, html, render, svg} from "@benev/slate"

import icon_x_circle from "../../icons/feather/icon_x_circle.js"

import {carbon} from "../frontend.js"
import {styles} from "./styles.css.js"
import {ModalSpec} from "../../modaling/spec.js"

type ModalDetails = {
	content: TemplateResult
	on_backdrop_click: () => void
}

export const SheepModal = carbon({styles}, use => {
	const {modal} = use.context

	use.prepare(() => modal.on.open(o => open(o)))

	function modal_dressing(id: string, content: TemplateResult) {
		return html`
			<div class=actions>
				<button class=close @click=${() => close_dialog(id)}>
					${icon_x_circle(svg)}
				</button>
			</div>
			<div class=contents>
				${content}
			</div>
		`
	}

	function distinguish_modal_details(
			id: string,
			modal: ModalSpec.Whatever,
		): ModalDetails {

		switch (modal.kind) {

			case "image": {
				const {img: {src, alt}} = modal
				const close = () => close_dialog(id)
				return {
					on_backdrop_click: close,
					content: html`
						<img
							part=img
							src="${src}"
							alt="${alt}"
							@click=${close} />
					`,
				}
			}

			case "cart": {
				return {
					on_backdrop_click: () => close_dialog(id),
					content: html`
						<sheep-cart part=cart></sheep-cart>
					`,
				}
			}
		}
	}

	function open({id, modal}: {id: string, modal: ModalSpec.Whatever}) {
		const dialog = document.createElement("dialog")
		dialog.setAttribute("data-id", id)

		const {content, on_backdrop_click} = (
			distinguish_modal_details(id, modal)
		)

		dialog.onclick = event => {
			if (event.target === dialog)
				on_backdrop_click()
		}

		render(modal_dressing(id, content), dialog)

		use.shadow.appendChild(dialog)
		dialog.showModal()
	}

	function close_dialog (id: string) {
		const dialog = use
			.shadow
			.querySelector<HTMLDialogElement>(`[data-id="${id}"]`)

		if (dialog) {
			dialog.close()
			dialog.remove()
		}
	}
})

