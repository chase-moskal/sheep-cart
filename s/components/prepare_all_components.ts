
import {Pipe, provide_context, flatstate_reactivity, apply_theme} from "@benev/frog"

import {Context} from "../context/context.js"
import {theme as defaultTheme} from "./theme.css.js"

import {SheepTags} from "./sheep-tags/component.js"
import {SheepSearch} from "./sheep-search/component.js"
import {SheepCatalog} from "./sheep-catalog/component.js"
import {SheepCollections} from "./sheep-collections/component.js"

export const prepare_all_components = (context: Context, theme = defaultTheme) => {
	return Pipe.with({
			SheepTags,
			SheepSearch,
			SheepCollections,
			SheepCatalog,
		})
		.to(provide_context(context))
		.to(flatstate_reactivity(context.flat))
		.to(apply_theme(theme))
		.done()
}

