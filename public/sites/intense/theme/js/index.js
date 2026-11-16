gsap.registerPlugin(ScrollTrigger);


window.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.refresh();
    const windowWidth = window.innerWidth;

    const totalSmileSlides = document.querySelectorAll('#swiper-smile .swiper-slide').length;

    let smileSwiper = null;
    let smileTier = null;
    let smileSlidesCloned = false;

    function cloneSmileSlides() {
        if (smileSlidesCloned) return;
        const wrapper = document.querySelector('#swiper-smile .swiper-wrapper');
        Array.from(wrapper.children).forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.setAttribute('data-smile-clone', '');
            wrapper.appendChild(clone);
        });
        smileSlidesCloned = true;
    }

    function removeSmileClones() {
        if (!smileSlidesCloned) return;
        document.querySelectorAll('#swiper-smile [data-smile-clone]').forEach(el => el.remove());
        smileSlidesCloned = false;
    }

    function getSmileTier(w) {
        if (w < 768) return 'mobile';
        if (w < 1024) return 'tablet';
        return 'desktop';
    }

    function initSmileSwiper() {
        const w = window.innerWidth;
        const tier = getSmileTier(w);
        if (tier === smileTier) return;
        smileTier = tier;

        if (smileSwiper) {
            smileSwiper.destroy(true, true);
            smileSwiper = null;
        }
        removeSmileClones();

        const commonConfig = {
            spaceBetween: 16,
            watchOverflow: true,
            pagination: { el: '.swiper-pagination-smile', clickable: true },
            navigation: { nextEl: '.smile-button-next', prevEl: '.smile-button-prev' },
        };

        if (tier === 'mobile') {
            smileSwiper = new Swiper('#swiper-smile', {
                ...commonConfig,
                direction: 'vertical',
                slidesPerView: 1,
                loop: totalSmileSlides > 1,
                loopAddBlankSlides: false,
                allowTouchMove: true,
                noSwiping: false,
                releaseOnEdges: true,
                centeredSlides: false,
                initialSlide: 0,
            });
        } else if (tier === 'tablet') {
            smileSwiper = new Swiper('#swiper-smile', {
                ...commonConfig,
                direction: 'horizontal',
                slidesPerView: 2,
                loop: totalSmileSlides > 2,
                loopAddBlankSlides: false,
                allowTouchMove: false,
                centeredSlides: false,
                initialSlide: 0,
            });
        } else {
            if (totalSmileSlides === 4) cloneSmileSlides();
            smileSwiper = new Swiper('#swiper-smile', {
                ...commonConfig,
                direction: 'horizontal',
                slidesPerView: 3,
                loop: totalSmileSlides > 3,
                loopAddBlankSlides: false,
                allowTouchMove: false,
                centeredSlides: true,
                initialSlide: 1,
            });
        }

        const sliderWrapper = document.querySelector('#swiper-smile').closest('.smile__slider-wrapper');
        const sliderBtns = sliderWrapper.querySelector('.slider-btns');
        const shouldHide =
            (tier === 'mobile' && totalSmileSlides <= 1) ||
            (tier === 'tablet' && totalSmileSlides <= 2) ||
            (tier === 'desktop' && totalSmileSlides <= 3);
        sliderBtns.style.display = shouldHide ? 'none' : '';
    }

    initSmileSwiper();

    let smileResizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(smileResizeTimer);
        smileResizeTimer = setTimeout(initSmileSwiper, 200);
    });

    const totalTeamSlides = document.querySelectorAll('#swiper-team .swiper-slide').length;

    const swiperTeam = new Swiper('#swiper-team', {
        centeredSlides: false,
        direction: 'horizontal',
        loop: totalTeamSlides > 1,
        initialSlide: 0,
        watchOverflow: true,
        slidesPerView: 1,
        loopAddBlankSlides: true,
        loopedSlides: 3,
        spaceBetween: 16,
        allowTouchMove: true,
        centeredSlides: true,

        pagination: {
            el: '.swiper-pagination-team',
            clickable: true,
        },

        navigation: {
            nextEl: '.team-button-next',
            prevEl: '.team-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                direction: 'horizontal',
                allowTouchMove: false,
                loop: totalTeamSlides > 2,
                initialSlide: 0,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                direction: 'horizontal',
                allowTouchMove: false,
                centeredSlides: true,
                loop: totalTeamSlides > 3,
                initialSlide: 1,
                centeredSlides: true,
            },
        }
    });


    if (totalTeamSlides <= 3 && windowWidth >= 1024 || totalTeamSlides <= 2 && windowWidth >= 768 || totalTeamSlides < 2) {
        const sliderWrapper = document.querySelector('#swiper-team').closest('.team__slider')
        sliderWrapper.querySelector('.slider-btns').style.display = 'none'
    }

    const totalMediaSlides = document.querySelectorAll('#swiper-media .swiper-slide').length;

    const swiperMedia = new Swiper('#swiper-media', {
        centeredSlides: false,
        direction: 'horizontal',
        loop: totalMediaSlides > 1,
        loopAddBlankSlides: true,
        initialSlide: 0,
        watchOverflow: true,
        slidesPerView: 1,
        loopedSlides: 3,
        spaceBetween: 16,
        allowTouchMove: true,

        pagination: {
            el: '.swiper-pagination-media',
            clickable: true,
        },

        navigation: {
            nextEl: '.media-button-next',
            prevEl: '.media-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                direction: 'horizontal',
                allowTouchMove: false,
                loop: totalMediaSlides > 2,
                initialSlide: 0,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                direction: 'horizontal',
                allowTouchMove: false,
                loop: totalMediaSlides > 3,
                initialSlide: 1,
                centeredSlides: true,
            },
        }
    });

    if (totalMediaSlides <= 3 && windowWidth >= 1024 || totalMediaSlides <= 2 && windowWidth >= 768 || totalMediaSlides < 2) {
        const sliderWrapper = document.querySelector('#swiper-media').closest('.media__slider')
        sliderWrapper.querySelector('.slider-btns').style.display = 'none'
    }

    // Services slider
    const servicesCardsEl = document.querySelector('.services__cards');
    if (servicesCardsEl) {
        servicesCardsEl.classList.add('swiper');

        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        Array.from(servicesCardsEl.children).forEach(card => {
            card.classList.add('swiper-slide');
            swiperWrapper.appendChild(card);
        });
        servicesCardsEl.appendChild(swiperWrapper);

        const prevSVG = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM25 1C38.2548 1 49 11.7452 49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25C1 11.7452 11.7452 1 25 1ZM18.793 25L24.1465 30.3535L24.8535 29.6465L20.707 25.5H30V24.5H20.707L24.8535 20.3535L24.1465 19.6465L18.793 25Z" fill="#F1F1F1" fill-opacity="0.4"/></svg>`;
        const nextSVG = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0ZM25 1C11.7452 1 1 11.7452 1 25C1 38.2548 11.7452 49 25 49C38.2548 49 49 38.2548 49 25C49 11.7452 38.2548 1 25 1ZM31.207 25L25.8535 30.3535L25.1465 29.6465L29.293 25.5H20V24.5H29.293L25.1465 20.3535L25.8535 19.6465L31.207 25Z" fill="#F1F1F1"/></svg>`;

        const sliderBtns = document.createElement('div');
        sliderBtns.classList.add('slider-btns', 'slider-btns--services');
        sliderBtns.innerHTML = `<div class="slider-btns__inner"><button class="slider-button services-button-prev">${prevSVG}</button><div class="swiper-pagination swiper-pagination-services"></div><button class="slider-button services-button-next">${nextSVG}</button></div>`;
        servicesCardsEl.insertAdjacentElement('afterend', sliderBtns);

        const realServicesSlides = swiperWrapper.querySelectorAll('.swiper-slide').length;

        const swiperServices = new Swiper('.services__cards', {
            direction: 'horizontal',
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 16,
            loop: realServicesSlides > 1,
            loopAddBlankSlides: false,
            allowTouchMove: true,
            pagination: { el: '.swiper-pagination-services', clickable: true },
            navigation: { nextEl: '.services-button-next', prevEl: '.services-button-prev' },
            breakpoints: {
                768: { slidesPerView: 2, allowTouchMove: false },
                1024: { slidesPerView: 3, allowTouchMove: false },
            }
        });

        const updateServicesNav = () => {
            const w = window.innerWidth;
            const hidden =
                (w < 768 && realServicesSlides <= 1) ||
                (w >= 768 && w < 1024 && realServicesSlides <= 2) ||
                (w >= 1024 && realServicesSlides <= 3);
            sliderBtns.style.display = hidden ? 'none' : '';
        };
        updateServicesNav();
        swiperServices.on('breakpoint', updateServicesNav);
    }

    let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    });

    const mainTitle = new SplitType(".main .left", {
        types: "word",
        tagName: "span"
    });
    // const firstLineWords = mainTitle.lines[0].querySelectorAll('.word');

    mainTitle.words.forEach((word, index) => {
        if (index > 3) {
            return
        }
        word.style.opacity = '0.4'
    });

    // const lineEnd = mainTitle.lines.length === 4 ? 1 : 2
    // mainTitle.lines.forEach((line, index) => {
    //     if (index === lineEnd) {
    //         line.style.textAlign = 'end'
    //     } else {
    //         line.style.textAlign = 'start'
    //     }
    // });

    const smileTitle = new SplitType(".smile__title", {
        types: "lines",
        tagName: "span"
    });

    smileTitle.lines.forEach((line, index) => {
        if (index % 2 === 0) {
            line.style.textAlign = 'start';
        } else {
            line.style.textAlign = 'end';
        }
    });

    function createScrollTrigger(triggerElement, timeline) {
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 80%",
            onEnter: () => timeline.play()
        });
    }

    const list1 = document.querySelectorAll("[each-word-about]")
    list1.forEach(function (index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: index,
                start: "top 80%",
                end: "bottom 40%",
                scrub: true,
            }
        });
        tl.from(index.querySelectorAll(".word"), { opacity: 0.2, duration: 2, ease: "bounce", stagger: { each: 0.4 } });
    });

    const list2 = document.querySelectorAll("[each-word-team]")
    list2.forEach(function (index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: index,
                start: "top 80%",
                end: "bottom 40%",
                scrub: true,
            }
        });
        tl.from(index.querySelectorAll(".word"), { opacity: 0.2, duration: 2, ease: "bounce", stagger: { each: 0.4 } });
    });

    gsap.set("[text-split]", { opacity: 1 });

    gsap.utils.toArray(".doctor__img").forEach((bg) => {
        const speed = bg.getAttribute("data-speed") || 0.5;

        gsap.fromTo(bg, {
            y: 0
        }, {
            y: () => (1 - speed) * +30 + "%", // Расчет движения
            ease: "none",
            scrollTrigger: {
                trigger: bg.closest(".doctor__photo"),
                start: "top bottom",
                end: "bottom top",
                scrub: true, // Привязка к скроллу
            }
        });
    });

    const body = document.body
    const modal = document.querySelector('#modal')
    const planVisitBtn = document.querySelector('#plan-visit')
    const planConsultationBtns = document.querySelectorAll('.js-plan-consultation')
    const createSmileBtns = document.querySelectorAll('.create-smile-btn')
    const closeBtn = document.querySelector('#modal-close')
    const successModal = document.querySelector('#modal-success')
    const sendFormBtns = document.querySelectorAll('.send-form-btn')
    const closeSuccessBtn = document.querySelector('#modal-success-close')
    const simileBtns = document.querySelectorAll('.smile-slide__btn')
    const simileTooltips = document.querySelectorAll('.smile-card__tooltip')
    const closeHistoryBtns = document.querySelectorAll('.modal-history-close');
    const mobileMenu = document.querySelector('.mobile-menu')
    const openMenuBtn = document.querySelector('.open-menu-btn')
    const closeMenuBtn = document.querySelector('.mobile-menu__close-btn')
    const teamBtns = document.querySelectorAll('.team .group-btns__text-btn')

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-bg')) {
            closeModal()
        }
    })
    successModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-bg')) {
            closeSuccessModal()
        }
    })

    openMenuBtn.addEventListener('click', (e) => {
        mobileMenu.classList.add('active')
    })
    closeMenuBtn.addEventListener('click', (e) => {
        mobileMenu.classList.remove('active')
    })

    document.querySelectorAll('.dropdown__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.services').scrollIntoView({ behavior: 'smooth' });
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active')
                body.style.overflow = 'scroll'
            }
        })
    })

    createSmileBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation()
            openModal()
        })
    })
    planVisitBtn.addEventListener('click', (e) => {
        openModal()
    })
    planConsultationBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

        if (btn.closest('.mobile-menu')) {
            mobileMenu.classList.remove('active')
        }

        openModal()
    })
})
    sendFormBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            const regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?$/
            const form = item.closest('.form')
            const nameInput = form.querySelector('#name-input')
            const phoneInput = form.querySelector('#phone-input')
            const doctorSelect = form.querySelector('#doctor-select')
            const typeSelect = form.querySelector('#type-select')
            nameInput.parentElement.classList.remove('row-data--error')
            phoneInput.parentElement.classList.remove('row-data--error')
            doctorSelect.parentElement.parentElement.classList.remove('row-data--error')
            typeSelect.parentElement.parentElement.classList.remove('row-data--error')

            let error = false
            if (!nameInput.value) {
                error = true
                nameInput.parentElement.classList.add('row-data--error')
            }
            if (!regex.test(phoneInput.value)) {
                error = true
                phoneInput.parentElement.classList.add('row-data--error')
            }
            if (!doctorSelect.value) {
                error = true
                doctorSelect.parentElement.parentElement.classList.add('row-data--error')
            }
            if (!typeSelect.value) {
                error = true
                typeSelect.parentElement.parentElement.classList.add('row-data--error')
            }

            if (!error) {
                nameInput.value = ''
                phoneInput.value = ''
                doctorSelect.value = ''
                typeSelect.value = ''
                closeModal()
                openSuccessModal()
            }
        })
    })
    simileBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            const btn = e.target.closest('.smile-slide__btn, .smile-card__tooltip');
            const modalId = btn.dataset.modal;
            openHistoryModal(document.getElementById(modalId))
        })
    })
    simileTooltips.forEach((item) => {
        item.addEventListener('click', (e) => {
            const btn = e.target.closest('.smile-slide__btn, .smile-card__tooltip');
            const modalId = btn.dataset.modal;
            openHistoryModal(document.getElementById(modalId))
        })
    })
    closeHistoryBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = e.target.closest('.modal-bg');
            closeHistoryModal(modal);
        })
    })
    closeBtn.addEventListener('click', (e) => {
        closeModal()
    })

    closeSuccessBtn.addEventListener('click', (e) => {
        closeSuccessModal()
    })

    teamBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation()
            openModal()
        })
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal()
            closeSuccessModal()
            const historyModal = document.querySelectorAll('.modal-history-close')[0].closest('.modal-bg.active')
            closeHistoryModal(historyModal)
        }
    })

    function openModal() {
        body.style.overflowY = "hidden"
        modal.classList.add('active')
    }
    function closeModal() {
        body.style.overflow = 'scroll'
        modal.classList.remove('active')
    }
    function openSuccessModal() {
        body.style.overflow = 'hidden'
        successModal.classList.add('active')
    }
    function closeSuccessModal() {
        body.style.overflow = 'scroll'
        successModal.classList.remove('active')
    }
    function openHistoryModal(historyModal) {
        if (!historyModal) return
        body.style.overflow = 'hidden'
        historyModal.classList.add('active')
        historyModal.addEventListener('click', closeHistoryByBg)
        const scrollContainer = historyModal.querySelector('.history-modal__scroll-wrapper')
        const scrollContent = historyModal.querySelector('.history-modal__text')
        const modalElem = historyModal.querySelector('.modal')
        if (scrollContainer.clientHeight < scrollContent.clientHeight) {
            modalElem.classList.add('modal--scroll')
            scrollContainer.addEventListener('scroll', scrolledHistoryModalContent)
        }
    }

    function closeHistoryModal(historyModal) {
        if (!historyModal) return
        body.style.overflow = 'scroll'
        historyModal.classList.remove('active')
        const scrollContainer = historyModal.querySelector('.history-modal__scroll-wrapper')
        scrollContainer.removeEventListener('scroll', scrolledHistoryModalContent)
        scrollContainer.removeEventListener('scroll', closeHistoryByBg)
    }

    function closeHistoryByBg(e) {
        if (e.target.classList.contains('modal-bg')) {
            const historyModal = document.querySelectorAll('.modal-history-close')[0].closest('.modal-bg.active')
            closeHistoryModal(historyModal)
        }
    }

    function scrolledHistoryModalContent() {
        const historyModal = document.querySelector('.modal-bg.active')
        if (!historyModal) return
        const scrollContainer = historyModal.querySelector('.history-modal__scroll-wrapper')
        const modalElem = historyModal.querySelector('.modal')
        if (scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 1) {
            modalElem.classList.remove('modal--scroll')
        } else {
            modalElem.classList.add('modal--scroll')
        }
    }

    const servicesCardTriggers = document.querySelectorAll('.services__card')
    servicesCardTriggers.forEach((item) => {
        item.addEventListener('click', (e) => {
            const card = item
            const title = card.querySelector('.services__card-title')
            const text = card.querySelector('.services__card-text')
            const list = card.querySelector('.services__card-list')
            card.classList.add('card-animate')
            setTimeout(() => card.classList.remove('card-animate'), 1000);
            setTimeout(() => {
                if (list.classList.contains('is-visible')) {
                    list.classList.remove('is-visible');
                    title.classList.remove('is-hidden');
                    text.classList.remove('is-hidden');
                } else {
                    list.classList.add('is-visible');
                    title.classList.add('is-hidden');
                    text.classList.add('is-hidden');
                }
            }, 500);
        })
    })

    const teamCardTriggers = document.querySelectorAll('.team-card')

    teamCardTriggers.forEach((item) => {
        item.addEventListener('click', (e) => {
            const card = item
            const front = card.querySelector('.team-card__front')
            const back = card.querySelector('.team-card__back')

            card.classList.add('card-animate')
            setTimeout(() => card.classList.remove('card-animate'), 1000);
            setTimeout(() => {
                if (front.classList.contains('is-hidden')) {
                    front.classList.remove('is-hidden');
                    back.classList.remove('is-visible');
                } else {
                    front.classList.add('is-hidden');
                    back.classList.add('is-visible');
                }
            }, 500);
        })
    })
});

document.addEventListener('wpcf7invalid', (e) => {
    const invalidFields = e.detail.apiResponse.invalid_fields

    document.querySelectorAll('.row-data--error').forEach(el => {
        el.classList.remove('row-data--error')
    })
    document.querySelectorAll('.field-error-tip').forEach(el => el.remove())

    invalidFields.forEach(({ field, message }) => {
        const input = document.querySelector(`[name="${field}"]`)
        if (!input) return

        if (input.tagName === 'SELECT') {
            input.parentElement.parentElement.classList.add('row-data--error')
        } else {
            input.parentElement.classList.add('row-data--error')
        }

        const tip = document.createElement('span')
        tip.classList.add('field-error-tip')
        tip.textContent = message
        input.insertAdjacentElement('afterend', tip)
    })
})

document.addEventListener('wpcf7mailsent', () => {
    document.querySelectorAll('.row-data--error').forEach(el => {
        el.classList.remove('row-data--error')
    })
    document.querySelectorAll('.field-error-tip').forEach(el => el.remove())
})


