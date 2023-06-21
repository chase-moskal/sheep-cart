
import {Context} from "./context.js"
import {theme as defaultTheme} from "./theme.css.js"
import {themeElements} from "../framework/utils/theme-elements.js"
import {passContextToElements} from "../framework/utils/pass-context-to-elements.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"

export const prepareAllComponents = (context: Context, theme = defaultTheme) => (
	themeElements(theme,
		passContextToElements(context, {
			SheepTags,
			SheepSearch,
		})
	)
)

