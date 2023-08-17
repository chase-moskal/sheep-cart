
import {Context} from "../context/context.js"
import {Flipview, flipview_context_prepper} from "@benev/frog"

export const view = flipview_context_prepper<Context>()

export type View<P extends any[]> = (context: Context) => Flipview<P>

