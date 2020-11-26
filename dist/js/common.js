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

// Nav
let navLinks = document.querySelectorAll(".nav__link");

const addActiveClass = () => {
	let fromTop = window.scrollY + 80;

	navLinks.forEach(navLink => {
		let section = document.querySelector(navLink.hash);

		if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
			navLink.classList.add("nav__link--active");
			location.hash = navLink.hash;
		} else {
			navLink.classList.remove("nav__link--active");
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
		interval = setInterval(scrollStep, 15);

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

// Scroll
window.onscroll = () => {
	headerFixed();
	btnTopShow();
	addActiveClass();


	let fromTop = window.scrollY + 80;

	navLinks.forEach(navLink => {
		let section = document.querySelector(navLink.hash);

		if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
			navLink.classList.add("nav__link--active");
		} else {
			navLink.classList.remove("nav__link--active");
		}
	});
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
		header.classList.add("header-bg");
		bg.classList.add("bg--active");

		setTimeout(() => {
			btnOpenRequest.classList.remove("btn--active");
		}, 200);

		request.classList.add("modal--open");
		document.body.classList.add("scroll--hidden");

		// setTimeout(function () {
		// 	document.querySelector("#modal__name").focus();
		// }, 500);
	});
});

requestBtnClose.addEventListener("click", () => {
	request.classList.remove("modal--open");
	logo.classList.remove("logo--white");
	nav.classList.remove("nav--hide");
	header.classList.remove("header-bg");
	bg.classList.remove("bg--active");

	document.body.classList.remove("scroll--hidden");
});

request.addEventListener("mouseup", (e) => {
	if (e.target == request) {
		request.classList.remove("modal--open");
		logo.classList.remove("logo--white");
		nav.classList.remove("nav--hide");
		header.classList.remove("header-bg");
		bg.classList.remove("bg--active");
		document.body.classList.remove("scroll--hidden");
	}
});

request.addEventListener("keydown", (e) => {
	if (e.keyCode === 27) {
		request.classList.remove("request--open");
	}
});

// Tabs
const tabs = document.querySelector(".tabs");
const tabsList = document.querySelector(".tabs__list");
const tabsLink = tabsList.querySelectorAll("a");
const tabsContents = document.querySelectorAll(".tabs__section");

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

	let nextIndex = Array.prototype.indexOf.call(tabsLink, nextTab);
	tabsContents[nextIndex].hidden = false;
};

Array.prototype.forEach.call(tabsLink, (tabLink, i) => {
	tabLink.addEventListener("click", (e) => {
		e.preventDefault();

		location.hash = e.target.hash;

		let currentTab = tabsList.querySelector("[aria-selected]");

		if (e.currentTarget !== currentTab) {
			switchTab(currentTab, e.currentTarget);
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

document.querySelectorAll(".nav__link").forEach(link => {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		document.body.style.removeProperty("overflow-y");
		document.querySelector(this.hash).scrollIntoView({
			behavior: "smooth"
		});
	});
});

