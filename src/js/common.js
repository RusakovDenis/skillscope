// Yandex
const targetYandex = () => {
	switch (location.hash) {
		case "#about-us":
			 ym(69781585, "reachGoal", "about");
			break;
		case "#how":
			 ym(69781585, "reachGoal", "how");
			break;
		case "#client":
			 ym(69781585, "reachGoal", "client");
			break;
		case "#registration":
			 ym(69781585, "reachGoal", "registration");
			break;
	}
}

// Tabs
const tabs = document.querySelector(".tabs");
const tabsList = document.querySelector(".tabs__list");
const tabsLink = tabsList.querySelectorAll(".tabs__link");
const tabsContents = document.querySelectorAll(".tabs__section");

const work = document.querySelector(".work");
const navLinkWork = document.querySelector(".nav__link-work");

const switchTab = (prevTab, nextTab) => {
	prevTab.classList.toggle("tabs__link--active");
	prevTab.removeAttribute("aria-selected");
	prevTab.setAttribute("tabindex", "-1");

	let prevIndex = Array.prototype.indexOf.call(tabsLink, prevTab);
	tabsContents[prevIndex].hidden = true;

	nextTab.focus();
	nextTab.removeAttribute("tabindex");
	nextTab.setAttribute("aria-selected", "true");
	nextTab.classList.toggle("tabs__link--active");

	work.id = nextTab.hash.replace(/#/, '');
	navLinkWork.hash = nextTab.hash.replace(/#/, '');

	let nextIndex = Array.prototype.indexOf.call(tabsLink, nextTab);
	tabsContents[nextIndex].hidden = false;
};

Array.prototype.forEach.call(tabsLink, (tabLink, i) => {
	tabLink.addEventListener("click", (e) => {
		e.preventDefault();

		let currentTab = tabsList.querySelector("[aria-selected]");

		if (e.currentTarget !== currentTab) {
			switchTab(currentTab, e.currentTarget);
		}

		if (history.replaceState) {
			history.replaceState(null, null, e.target.hash);
		} else {
			location.hash = e.target.hash;
		}
	});

	tabLink.addEventListener("keydown", (e) => {
		let indexLink = Array.prototype.indexOf.call(tabsLink, e.currentTarget);

		let tabsSection = e.which === 37 ? indexLink - 1 : e.which === 39 ? indexLink + 1 : e.which === 40 ? "down" : null;
		if (tabsSection !== null) {
			e.preventDefault();

			tabsSection === "down" ? tabsContents[i].focus() : tabsLink[tabsSection] ? switchTab(e.currentTarget, tabsLink[tabsSection]) : void 0;
		}
	});
});

// Header bottom fixed
const header = document.querySelector(".header");

const headerHeight = header.scrollHeight;

const headerFixed = () => {
	if (window.pageYOffset >= headerHeight - 70) {
		header.classList.add("header--fixed");
	} else {
		header.classList.remove("header--fixed");
	}
}

// Toggle menu
if (window.matchMedia("(max-width: 991px)").matches) {
	const toggleMenu = document.querySelector(".toggle-menu");
	const dropdownMenu = document.querySelector(".dropdown-menu");

	toggleMenu.addEventListener("click", () => {
		toggleMenu.classList.toggle("toggle-menu--active");
		toggleMenu.setAttribute("aria-expanded", true);

		if (dropdownMenu.classList.contains("toggle-menu--show")) {
			dropdownMenu.classList.remove("toggle-menu--show");
			dropdownMenu.style.height = "0";
		} else {
			dropdownMenu.classList.add("toggle-menu--show");
			dropdownMenu.style.height = dropdownMenu.scrollHeight + "px";
		}
	});

	document.addEventListener("mouseup", (e) => {
		if (e.target !== toggleMenu) {
			toggleMenu.classList.remove("toggle-menu--active");
			toggleMenu.setAttribute("aria-expanded", false);
			dropdownMenu.classList.remove("toggle-menu--show");
			dropdownMenu.style.height = "0";
		}
	});
}

// Btn top
const btnTop = document.querySelector(".btn-top");
let interval = 0;

const scrollStep = () => {
	if (window.pageYOffset === 0) {
		clearInterval(interval);
	}

	window.scroll(0, window.pageYOffset - 50);
}

if (btnTop) {
	btnTop.addEventListener("click", () => {
		interval = setInterval(scrollStep, 2);

		scrollStep();
	});
}

const btnTopShow = () => {
	if (window.pageYOffset > 100) {
		btnTop.classList.remove("btn--hide");
	} else {
		btnTop.classList.add("btn--hide");
	}
}

// Nav
let navLinks = document.querySelectorAll(".nav__link");

navLinks.forEach(link => {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		document.body.style.removeProperty("overflow-y");
		document.querySelector(this.hash).scrollIntoView({
			behavior: "smooth"
		});
	});
});

window.oldHash = window.location.hash;

const addActiveClass = () => {
	let fromTop = window.scrollY;

	navLinks.forEach(navLink => {
		let section = document.querySelector(navLink.hash);
		let position = section.offsetTop - fromTop;

		if (position <= 1 && position + section.offsetHeight > 1) {
			navLink.classList.add("nav__link--active");

			if (history.replaceState) {
				history.replaceState(null, null, navLink.hash);
			} else {
				location.hash = navLink.hash;
			}
		} else {
			navLink.classList.remove("nav__link--active");
		}
	});
}

// Active link menu
const menuLeftLinkAll = document.querySelectorAll(".dropdown-menu__link");

const addActiveClassMenuLeft = () => {
	let fromTop = window.scrollY;
	let position = section.offsetTop - fromTop;

	menuLeftLinkAll.forEach(menuLeftLink => {
		let section = document.querySelector(menuLeftLink.hash);

		if (position <= 1 && position + section.offsetHeight > 1) {
			menuLeftLink.classList.add("dropdown-menu__link--active");

			if (history.replaceState) {
				history.replaceState(null, null, navLink.hash);
			} else {
				location.hash = navLink.hash;
			}
		} else {
			menuLeftLink.classList.remove("dropdown-menu__link--active");
		}
	});
}

// Scroll
window.onscroll = () => {
	headerFixed();
	btnTopShow();

	if (window.oldHash != window.location.hash) {
		targetYandex();
		window.oldHash = window.location.hash;
	}

	if (window.matchMedia("(min-width: 991px)").matches) {
		addActiveClass();
	}

	if (window.matchMedia("(max-width: 991px)").matches) {
		addActiveClassMenuLeft();
	}
}

// Request
const request = document.querySelector(".modal");
const requestBtnClose = document.querySelector(".modal__btn--close");

const btnOpenRequestAll = document.querySelectorAll(".btn--open-modal");
const logo = document.querySelector(".logo");
const nav = document.querySelector(".nav");
const bg = document.querySelector(".bg");

btnOpenRequestAll.forEach((btnOpenRequest) => {
	btnOpenRequest.addEventListener("click", () => {
		btnOpenRequest.classList.add("btn--active");
		logo.classList.add("logo--white");
		nav.classList.add("nav--hide");
		bg.classList.add("bg--active");
		btnTop.classList.add("btn--hide");

		setTimeout(() => {
			btnOpenRequest.classList.remove("btn--active");
		}, 200);

		request.classList.add("modal--open");
		document.body.classList.add("scroll--hidden");
	});
});

requestBtnClose.addEventListener("click", () => {
	request.classList.remove("modal--open");
	logo.classList.remove("logo--white");
	nav.classList.remove("nav--hide");
	bg.classList.remove("bg--active");
	btnTop.classList.remove("btn--hide");

	document.body.classList.remove("scroll--hidden");
});

request.addEventListener("mouseup", (e) => {
	if (e.target == request) {
		request.classList.remove("modal--open");
		logo.classList.remove("logo--white");
		nav.classList.remove("nav--hide");
		bg.classList.remove("bg--active");
		document.body.classList.remove("scroll--hidden");
	}
});

request.addEventListener("keydown", (e) => {
	if (e.keyCode === 27) {
		request.classList.remove("request--open");
	}
});
