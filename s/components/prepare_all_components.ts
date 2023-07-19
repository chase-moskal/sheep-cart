
import {Pipe, pass_context_to_elements, theme_elements, update_elements_on_cue_changes} from "@benev/frog"

import {Context} from "../context/context.js"
import {theme as defaultTheme} from "./theme.css.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"
import {SheepCatalog} from "./sheep-catalog/component.js"
import {SheepCollections} from "./sheep-collections/component.js"

export const prepare_all_components = (context: Context, theme = defaultTheme) => (
	new Pipe({
			SheepTags,
			SheepSearch,
			SheepCollections,
			SheepCatalog,
		})
		.to(e => pass_context_to_elements(context, e))
		.to(e => update_elements_on_cue_changes(context.cues, e))
		.to(e => theme_elements(theme, e))
		.done()
)

