
import {CSSResultGroup} from "lit"
import {Flatview} from "@benev/frog"

export function setupView<V extends Flatview<any>>(fun: (theme: CSSResultGroup) => V) {
	return fun
}

