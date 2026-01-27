/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }

    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
        });
        target.classList.add("qualification__active");

        tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal");
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, index) => {
    modalBtn.addEventListener("click", () => {
        modal(index);
    });
});

modalCloses.forEach((modalClose, index) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
// var swiperPortfolio = new Swiper(".portfolio__container", {
//     cssMode: true,
//     loop: true,

//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//     },
// });

/*==================== PORTFOLIO FILTER + SWIPER (Optimized) ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const containerSelector = '.portfolio__container';
    const wrapperSelector = '.swiper-wrapper';
    const filterSelector = '.filter-btn';
  
    const container = document.querySelector(containerSelector);
    if (!container) return;
  
    const wrapper = container.querySelector(wrapperSelector);
    const filterBtns = Array.from(document.querySelectorAll(filterSelector));
  
    // Cache original slides (keep outerHTML and category)
    const originalSlides = Array.from(wrapper.querySelectorAll('.swiper-slide')).map(slide => ({
      html: slide.outerHTML,
      category: (slide.dataset.category || '').trim()
    }));
  
    let swiper = initSwiper();
  
    // Initialize Swiper instance (factory so we can recreate after DOM changes)
    function initSwiper() {
      return new Swiper(containerSelector, {
        cssMode: true,
        loop: false,
        slidesPerView: 1,   // show only one full project
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // optional accessibility / keyboard
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });
    }
  
    // Render slides for a category and recreate swiper
    function showCategory(category = 'all') {
      const slides = (category === 'all')
        ? originalSlides
        : originalSlides.filter(s => s.category === category);
  
      // If no slides for the selected category, show a lightweight placeholder
      if (slides.length === 0) {
        wrapper.innerHTML = `<div class="swiper-slide no-project">No projects found.</div>`;
      } else {
        wrapper.innerHTML = slides.map(s => s.html).join('');
      }
  
      // Recreate Swiper to pick up new slides (destroy previous cleanly)
      if (swiper) {
        try { swiper.destroy(true, true); } catch(e) { /* ignore */ }
      }
      swiper = initSwiper();
    }
  
    // Wire up filter buttons (delegation-like but simple)
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // toggle active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const category = btn.dataset.filter || 'all';
        showCategory(category);
      });
    });
  
    // Initial render: use currently active button or 'all'
    const activeBtn = filterBtns.find(b => b.classList.contains('active')) || filterBtns[0];
    showCategory(activeBtn ? (activeBtn.dataset.filter || 'all') : 'all');
  });
  




/*==================== TESTIMONIAL ====================*/
var swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById("header");
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== CHANGE THE URL ====================*/
document.addEventListener('DOMContentLoaded', () => { 


   /* Portfolio hash routing script
   - Hash format: #portfolio/{category}/{projectSlug}
   - Example: #portfolio/generative/qonkar-web-chatbot
    */

    /* ---- Helpers ---- */
    function slugify(text) {
    return String(text || '')
        .trim()
        .toLowerCase()
        .replace(/&/g, '-and-')
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    function setPortfolioHash(category, projectSlug) {
    const c = category ? slugify(category) : 'all';
    let newHash = `portfolio/${c}`;
    if (projectSlug) newHash += `/${slugify(projectSlug)}`;
    // write to location.hash (this triggers hashchange)
    location.hash = newHash;
    }

    function parseHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    const parts = raw.split('/').map(p => p && decodeURIComponent(p));
    return {
        section: parts[0] || null,
        category: parts[1] || null,
        project: parts[2] || null
    };
    }

    /* ---- UI actions ---- */
    function activateCategoryButtonBySlug(catSlug) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnFilter = (btn.getAttribute('data-filter') || '').toString();
        btn.classList.toggle('active', slugify(btnFilter || 'all') === (catSlug || 'all'));
    });
    }

    function filterProjectsByCatSlug(catSlug) {
    const allCards = Array.from(document.querySelectorAll('.portfolio__content'));
    const showAll = !catSlug || catSlug === 'all';

    allCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        const visible = showAll || (slugify(cardCat) === catSlug);
        // With Swiper we keep slides present, but hide with inline style to keep Swiper layout stable
        card.style.display = visible ? '' : 'none';
    });
    }

    function findProjectCardBySlug(slug) {
    if (!slug) return null;
    return Array.from(document.querySelectorAll('.portfolio__content')).find(c => {
        return (c.getAttribute('data-slug') || '') === slug;
    }) || null;
    }

    function openProject(cardEl) {
    if (!cardEl) return;
    // remove any previous 'open' state
    document.querySelectorAll('.portfolio__content.open').forEach(e => e.classList.remove('open'));
    cardEl.classList.add('open');

    // If Swiper instance exists, try to slide to the slide index
    const swiperInstance = window.swiperPortfolio || window.swiper || null;
    if (swiperInstance && typeof swiperInstance.slideTo === 'function') {
        // find index among swiper slides
        const slides = Array.from(cardEl.closest('.swiper-wrapper').children);
        const index = slides.indexOf(cardEl);
        if (index >= 0) {
        swiperInstance.slideTo(index);
        return;
        }
    }

    // fallback: scroll into view
    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /* ---- Main: apply hash state to UI ---- */
    function applyHashToUI() {
    const parsed = parseHash();
    if (parsed.section !== 'portfolio') {
        // if no portfolio fragment, keep default UI (do not forcibly reset)
        return;
    }

    const catSlug = parsed.category || 'all';
    activateCategoryButtonBySlug(catSlug);
    filterProjectsByCatSlug(catSlug);

    if (parsed.project) {
        const target = findProjectCardBySlug(parsed.project);
        if (target) {
        // If project is filtered-out, ensure it's visible by removing display:none
        if (target.style.display === 'none') {
            // reveal target and also reveal other cards of same category
            const cardCat = target.getAttribute('data-category') || '';
            filterProjectsByCatSlug(slugify(cardCat));
            activateCategoryButtonBySlug(slugify(cardCat));
        }
        openProject(target);
        } else {
        console.warn('Portfolio project slug not found in DOM:', parsed.project);
        }
    }
    }

    /* ---- Wire UI events ---- */
    function initPortfolioRouting() {
    // Category buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
        const cat = btn.getAttribute('data-filter') || 'all';
        setPortfolioHash(cat, null);
        // applyHashToUI will be invoked by hashchange; also apply immediately
        applyHashToUI();
        });
    });

    // Project Demo buttons (and clicking the card)
    document.querySelectorAll('.portfolio__content').forEach(card => {
        // find the demo link inside the card
        const demoLink = card.querySelector('.portfolio__button');
        const cardSlug = card.getAttribute('data-slug');

        // clicking anywhere on the card (optional) - comment this out if you don't want whole card clickable
        card.addEventListener('click', (ev) => {
        // if the click was on a link, skip (we handle link click separately)
        if (ev.target.closest('a')) return;
        // set hash to this card (but don't navigate away)
        const cardCat = card.getAttribute('data-category') || 'all';
        setPortfolioHash(cardCat, cardSlug);
        // openProject will be triggered by hashchange; call now for faster UX
        openProject(card);
        });

        if (demoLink) {
        demoLink.addEventListener('click', (ev) => {
            const href = demoLink.getAttribute('href') || '#';
            const cardCat = card.getAttribute('data-category') || 'all';
            // set hash so shared URL lands on this project
            setPortfolioHash(cardCat, cardSlug);

            // if href is an external/absolute link, open in new tab/window after setting hash
            // prevent default navigation so we don't lose single-page state
            if (href && href !== '#' && !href.startsWith('#')) {
            ev.preventDefault();
            // small timeout to allow hash to update (hashchange event)
            setTimeout(() => {
                window.open(href, '_blank');
            }, 50);
            }
            // if href is an internal anchor (starts with '#') we let browser handle default
        });
        }
    });

    // React to back/forward
    window.addEventListener('hashchange', applyHashToUI);

    // initial load
    applyHashToUI();
    }

    /* Initialize when DOM is ready */
    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioRouting);
    } else {
    initPortfolioRouting();
    }
})
