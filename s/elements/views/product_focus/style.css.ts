
import {css} from "lit"

export const style = css`

:host {
	display: block;
	container-type: inline-size;
}

.grid {
	display: grid;
	gap: 1em;
	grid-template:
		"feature feature .       .      " 1fr
		"feature feature heading heading"
		"feature feature tags    tags   "
		"feature feature options options"
		"feature feature price   button "
		"feature feature .       .      " 1fr
		"side    side    essay   essay  "
		/ 25%    25%     1fr     1fr;
	align-items: start;
}

@container (width < 30em) {
	.grid {
		grid-template:
			"feature feature"
			"heading heading"
			"tags    tags   "
			"options options"
			"price   button "
			"essay   essay  "
			"side    side   "
			/ 1fr 1fr;
	}
}

.grid {
	> figure { grid-area: feature; }
	> h1 { grid-area: heading; }
	> ul { grid-area: tags; }
	> .options { grid-area: options; }
	> .price { grid-area: price; }
	> button { grid-area: button; }
	> aside { grid-area: side; }
	> section { grid-area: essay; }

	> figure {
		background: #fff2;
		width: 100%;
		height: 100%;
		> img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	> ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;

		> li {
			border: 1px solid white;
			background: #fff2;
			border-radius: 1em;
			padding: 0 0.5em;

			&[data-collection] {
				background: #8af2;
				border-color: cyan;
			}
		}
	}

	> aside {
		display: flex;
		flex-wrap: wrap;
		container-type: inline-size;

		> img {
			display: block;
			width: 50cqi;
			height: 50cqi;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

}

`

