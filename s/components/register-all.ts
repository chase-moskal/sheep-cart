
import {theme} from "./theme.css"
import {Context} from "./context.js"
import {SheepSearch} from "./sheep-search/component.js"
import {registerElements, themeElements} from "@chasemoskal/magical"
import {provideContextToElements} from "../framework/provide-context-to-elements.js"

export const registerAll = (context: Context) => (
	registerElements(
		themeElements(theme,
			provideContextToElements(context, {
				SheepSearch,
			})
		)
	)
)

