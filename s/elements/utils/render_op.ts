
import {Op} from "@benev/frog"
import {TemplateResult, html} from "lit"

export function render_op<X>(op: Op.Any<X>, on_ready: (value: X) => TemplateResult | void) {
	return Op.select(op, {
		loading: () => html`..loading..`,
		err: reason => html`error! ${reason}`,
		ready: on_ready,
	})
}

