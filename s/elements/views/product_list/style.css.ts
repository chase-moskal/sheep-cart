
import {css} from "@chasemoskal/magical"

export const style = css`

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
	width: 100%;
	gap: 0.5rem;
}

[data-view="product-card"] {
	font-size: 0.8em;
	max-width: 100%;
}

footer {
	display: flex;
	padding: 1em;
	justify-content: center;
	align-items: center;

	> button {
		opacity: 0.7;
		font: inherit;
		text-transform: uppercase;
		font-size: 1em;
		padding: 1em 2em;
		background: #fffa;
		color: #000a;
		border: none;
		cursor: pointer;
		user-select: none;
		border-radius: 3em;
		&:is(:hover, :focus) { opacity: 0.8; }
		&:active { opacity: 1; }
	}
}

`

