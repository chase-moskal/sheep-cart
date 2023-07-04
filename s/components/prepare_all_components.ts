
import {pass_context_to_elements, theme_elements, update_elements_on_cue_changes} from "@benev/frog"

import {Context} from "./context.js"
import {theme as defaultTheme} from "./theme.css.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"
import {SheepCollections} from "./sheep-collections/component.js"

export const prepare_all_components = (context: Context, theme = defaultTheme) => (
	theme_elements(theme,
		update_elements_on_cue_changes(context.cues,
			pass_context_to_elements(context, {
				SheepTags,
				SheepSearch,
				SheepCollections,
			})
		)
	)
)

