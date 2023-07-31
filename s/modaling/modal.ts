import {Flat} from "@benev/frog"
import {Img} from "../elements/views/product_focus/parts/types.js"

export class Modal {
	state: {img: Img | undefined}

	constructor(flat: Flat) {
		this.state = flat.state({
			img: undefined
		})
	}

	enlarge_image = (img: Img) => {
		this.state.img = img
	}

	close = () => {
		this.state.img = undefined
	}

	get modal_state() {
		return this.state
	}
}
