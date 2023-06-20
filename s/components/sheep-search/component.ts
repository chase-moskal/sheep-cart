
import {html} from "lit"
import {Context} from "../context.js"
import {QuickElement} from "../../framework/quick-element.js"

type State = {
	a: number
}

export const SheepSearch = (context: Context) => (
	class extends QuickElement<State> {
		render() {
			return html`
				<p>hello hello</p>
			`
		}
	}
)

