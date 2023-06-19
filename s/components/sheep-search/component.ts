
import {LitElement, html} from "lit"
import {Context} from "../context.js"
import {mixinContextRequirement} from "@chasemoskal/magical"

export class SheepSearch extends mixinContextRequirement<Context>()(LitElement) {
	render() {
		return html`
			<p>hello hello</p>
		`
	}
}

