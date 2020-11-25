// Slider

const elements = document.querySelectorAll(".slider__item")
const slider = new KeenSlider("#my-keen-slider", {
	loop: true,
	slides: elements.length,
	move: (s) => {
		elements.forEach((element, idx) => {
			moveElement(element, idx, s.details())
		})
	},
	initial: 2,
	created: function (instance) {
		const sliderBtnPrev = document.querySelector(".slider__btn--prev");

		sliderBtnPrev.addEventListener("click", () => {
			instance.prev();
		});

		sliderBtnPrev.setAttribute("aria-label", "Предыдущий слайд");

		const sliderBtnNext = document.querySelector(".slider__btn--next");

		sliderBtnNext.addEventListener("click", () => {
			instance.next();
		});

		sliderBtnNext.setAttribute("aria-label", "Следующий слайд");
	}
})

function moveElement(element, idx, details) {
	var position = details.positions[idx]
	var x = details.widthOrHeight * position.distance
	var scale_size = 0.7
	var scale = 1 - (scale_size - scale_size * position.portion)
	var style = `translate3d(${x}px, 0px, 0px) scale(${scale})`
	element.style.transform = style
	element.style["-webkit-transform"] = style
}

// Index reviews

const elementsReviews = document.querySelectorAll(".index-reviews__item")
const sliderReviews = new KeenSlider(".reviews__slider", {
	loop: true,
	slides: elementsReviews.length,
	move: (s) => {
		elementsReviews.forEach((element, idx) => {
			moveElement(element, idx, s.details())
		})
	},
	initial: 2,
	created: function (instance) {
		const sliderBtnPrev = document.querySelector(".index-reviews__btn--prev");

		sliderBtnPrev.addEventListener("click", () => {
			instance.prev();
		});

		sliderBtnPrev.setAttribute("aria-label", "Предыдущий слайд");

		const sliderBtnNext = document.querySelector(".index-reviews__btn--next");

		sliderBtnNext.addEventListener("click", () => {
			instance.next();
		});

		sliderBtnNext.setAttribute("aria-label", "Следующий слайд");
	}
})
