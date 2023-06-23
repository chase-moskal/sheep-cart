
import {Context} from "./context.js"
import {theme as defaultTheme} from "./theme.css.js"
import {theme_elements} from "../framework/utils/theme_elements.js"
import {pass_context_to_elements} from "../framework/utils/pass_context_to_elements.js"
import {update_elements_on_cue_changes} from "../framework/cues/lite/update_elements_on_cue_changes.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"

export const prepare_all_components = (context: Context, theme = defaultTheme) => (
	theme_elements(theme,
		update_elements_on_cue_changes(context.cues,
			pass_context_to_elements(context, {
				SheepTags,
				SheepSearch,
			})
		)
	)
)

