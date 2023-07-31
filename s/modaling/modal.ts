import {Flat} from "@benev/frog"

export class Modal {
	
	state: {img: string} = {
		img: ""
	}
	constructor(flat: Flat) {
		this.state = flat.state({
			img: ""
		})
	}

	enlarge_image = (img: string) => {
		this.state.img = img
	}

	close = () => {
		this.state.img = ""
	}

	toggle_modal = (img: string) => {
		this.state.img ? "" : this.state.img = img
	}

	get modal_state() {
		return this.state
	}
}
