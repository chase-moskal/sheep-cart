
import {css} from "lit"

export const style = css`

:host {
	display: block;
	container-type: inline-size;
	--frame-color: var(--sheep-frame-color, #fff2);
}

.grid {
	display: grid;
	gap: 1em;
	grid:
		"feature feature feature .       .       .      " 1fr
		"feature feature feature heading heading heading"
		"feature feature feature pills   pills   pills  "
		"feature feature feature options options options"
		"feature feature feature buy     buy     buy    "
		"feature feature feature .       .       .      " 1fr
		"images  images  essay   essay   essay   essay  ";
	grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	align-items: start;
}

@container (width < 30em) {
	.grid {
		grid:
			"feature"
			"heading"
			"pills"
			"options"
			"buy"
			"essay"
			"images"
			/ 1fr;
		grid-template-columns: repeat(auto-fit, minmax(1em, 1fr));
	}
}

.grid {
	> figure { grid-area: feature; }
	> h1 { grid-area: heading; }
	> .pills { grid-area: pills; }
	> .options { grid-area: options; }
	> .buy { grid-area: buy; }
	> aside { grid-area: images; }
	> section { grid-area: essay; }

	> figure {
		background: var(--frame-color);
		padding: 1em;
		width: 100%;
		height: 100%;
		align-self: center;
		justify-self: end;

		> img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	> h1 {
		font-size: 2em;
	}

	> .pills {
		font-size: 0.8em;
	}

	> .options {
		justify-self: end;
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 1em;
		padding: 1em;
	}

	.buy {
		display: flex;
		justify-content: end;
		font-size: 1em;
		gap: 1rem;

		> .price {
			flex: 1;
			display: flex;
			justify-content: center;
		}

		> [data-view="coolbutton"] {
			flex: 2;
			&::part(button) {
				height: 100%;
			}
		}
	}

	> aside {
		display: flex;
		flex-wrap: wrap;
		container-type: inline-size;
		padding: 1em;
		background: var(--frame-color);

		> img {
			display: block;
			width: 50cqi;
			height: 50cqi;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}

	&[data-no-additional-images] {
		> aside {
			display: none;
		}
		> section {
			grid-area: images / images / essay / essay;
		}
	}

	&[data-no-options] {
		> .options {
			display: none;
		}
		> .pills {
			grid-row: span 2;
		}
	}

}

.recommendations {
	margin-top: 4em;

	> h2 {
		text-align: center;
		margin-bottom: 1em;
	}

	> [data-view="product-recommendation"] {
		justify-content: center;
	}
}


`

