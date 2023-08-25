
import {Context} from "../context/context.js"
import {Flipview, flipview_prepper} from "@benev/frog"

export const view = flipview_prepper<Context>({
	default_auto_exportparts: true,
})

export type View<P extends any[]> = (context: Context) => Flipview<P>

