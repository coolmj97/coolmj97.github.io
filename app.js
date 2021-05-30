'use strict';

const navBtn = document.querySelector('.navbar__button');
const navBox = document.querySelector('.navbar__box');
const navMenu = document.querySelector('.navbar__menu');
const contactBtn = document.querySelector('.home__contact__button');
const scrollTop = document.querySelector('.scroll-top-button');

const Ids = ['#home', '#about', '#skill', '#project', '#contact'];
const sections = Ids.map((id) => document.querySelector(id));
const navItems = Ids.map((id) => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function toggleMenu() {
  navBtn.addEventListener('click', () => {
    navBox.classList.toggle('show');
  });
}

function handleBtns() {
  contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
  });

  scrollTop.addEventListener('click', () => {
    scrollIntoView('#home');
  });
}

function moveToSection() {
  navMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;

    if (link == null) {
      return;
    }

    scrollIntoView(link);
    target.classList.add('active');
    navBox.classList.remove('show');
  });
}

function scrollIntoView(selector) {
  const section = document.querySelector(selector);
  section.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[Ids.indexOf(selector)]);
}

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function observeSection() {
  const observerOption = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const index = Ids.indexOf(`#${entry.target.id}`);

        if (entry.boundingClientRect.y < 0) {
          selectedNavIndex = index + 1;
        } else {
          selectedNavIndex = index - 1;
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOption);
  sections.forEach((section) => {
    observer.observe(section);
  });

  window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
      selectedNavIndex = 0;
    } else if (
      Math.round(window.scrollY + window.innerHeight) >=
      document.body.clientHeight
    ) {
      selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
  });
}

function init() {
  toggleMenu();
  handleBtns();
  moveToSection();
  observeSection();
}

init();
