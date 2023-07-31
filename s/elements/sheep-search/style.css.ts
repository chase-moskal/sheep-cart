
import {css} from "lit"

export const style = css`

:host {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

.searchbox {
	position: relative;

	> input {
		display: block;
		font-size: var(--large);
		background: transparent;
		border: 0.1em solid;
		border-radius: 0.5em;
		padding: 0.3em;
		padding-left: 2em;
		color: inherit;
	}

	> svg {
		position: absolute;
		left: 0.5em;
		top: 0;
		bottom: 0;
		margin: auto;
	}
}

.searchtags {
	display: flex;
	gap: 0.5em;

	margin-left: 0.5em;

	label {
		display: flex;
		align-items: center;
		border: 1px solid;
		border-radius: 1em;
		padding: 0 0.3em;

		&[data-active] {
			color: var(--active-tag-color, lime);
		}

		> span {
			font-size: var(--small);
			user-select: none;
			margin-left: 0.5em;
		}
	}
}

`

