
import {Context} from "./context.js"
import {theme as defaultTheme} from "./theme.css.js"
import {theme_elements} from "../framework/utils/theme_elements.js"
import {pass_context_to_elements} from "../framework/utils/pass_context_to_elements.js"
import {update_quick_elements_on_snap_changes} from "../framework/utils/update_quick_elements_on_snap_changes.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"

export const prepare_all_components = (context: Context, theme = defaultTheme) => (
	theme_elements(theme,
		update_quick_elements_on_snap_changes([context.snap],
			pass_context_to_elements(context, {
				SheepTags,
				SheepSearch,
			})
		)
	)
)

