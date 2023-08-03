
import {css} from "@chasemoskal/magical"

export const style = css`

:host > a {
	display: flex;
	width: 100%;
	height: 100%;
	text-decoration: none;
	color: inherit;

	> img {
		flex: 1;
		max-width: 4rem;
		object-fit: cover;
	}

	> [part="plate"] {
		display: grid;
		flex: 3;
		grid:
			"title title"
			"pills pills"
			"info options" 1fr
			"price button"
			/ 1fr  2fr;
		gap: 0.2rem;
		padding: 0.4rem;
	}
}

h1 {
	grid-area: title;
	font-size: 1.2em;
}

[data-view="pills"] {
	grid-area: pills;
	font-size: 0.8em;
	opacity: 0.7;
	margin-bottom: 0.5rem;
}

.info {
	grid-area: info;
	opacity: 0.8;
	align-self: end;
	justify-self: center;
}

.options {
	grid-area: options;
	opacity: 0.4;
	font-size: 0.9em;
	list-style: none;
	justify-self: center;
	align-self: end;
	font-style: italic;
}

[data-view="price"] {
	grid-area: price;
	font-size: 0.8em;
	justify-self: center;
	padding: 0 0.5em;
}

[data-view="coolbutton"] {
	grid-area: button;
	width: 100%;
	align-self: end;

	&::part(button) {
		min-height: 2.5em;
	}

	&.select::part(button) {
		background: #00bb98;
	}
}

`

