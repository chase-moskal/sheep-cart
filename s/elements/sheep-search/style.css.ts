
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
		font-size: 1.5em;
		width: 100%;
		min-width: 4em;
		max-width: 20em;
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
	flex-wrap: wrap;
	gap: 0.1em;
	min-width: 0;

	> label {
		display: flex;
		align-items: center;
		border: 1px solid;
		border-radius: 1em;
		padding: 0 0.3em;
		min-width: 0;

		& input { display: none; }
		& input { opacity: 0.5; }

		&[data-active] {
			color: var(--active-tag-color, lime);
			& input { opacity: 1; }
		}

		> span {
			font-size: 0.8em;
			user-select: none;
			margin-left: 0.5em;
		}
	}
}

`

