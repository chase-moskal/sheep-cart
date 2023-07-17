
import {TemplateResult, html} from "lit"
import {Op} from "../../context/utils/op.js"

export function render_op<X>(op: Op.Any<X>, on_ready: (value: X) => TemplateResult | void) {
	return Op.select(op, {
		loading: () => html`..loading..`,
		err: reason => html`error! ${reason}`,
		ready: on_ready,
	})
}

