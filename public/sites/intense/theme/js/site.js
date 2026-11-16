// Intense site script — forked from the source theme's index.js.
// Changes: no sliders (React Carousel), no GSAP, services cards reveal on hover/tap,
// old mobile menu removed (React Header owns it), null-guards, window.intenseOpenModal.
// No GSAP / SplitType any more: scroll-lit titles are CSS (ScrollWords),
// the doctor block with its parallax is gone, the smile title is static markup.

window.addEventListener("DOMContentLoaded", () => {
    // Sliders are React components now (Carousel.tsx, native scroll-snap).

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
                const teamBtns = document.querySelectorAll('.team .group-btns__text-btn')

    if (modal) modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-bg')) {
            closeModal()
        }
    })
    if (successModal) successModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-bg')) {
            closeSuccessModal()
        }
    })

    createSmileBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation()
            openModal()
        })
    })
    if (planVisitBtn) planVisitBtn.addEventListener('click', () => openModal())
    planConsultationBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

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
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal())
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => closeSuccessModal())

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
            const activeHistory = document.querySelector('.modal-bg.active .history-modal')
            closeHistoryModal(activeHistory ? activeHistory.closest('.modal-bg') : null)
        }
    })

    window.intenseOpenModal = () => openModal()
    function openModal() {
        body.style.overflowY = "hidden"
        modal.classList.add('active')
    }
    function closeModal() {
        body.style.overflow = ''
        modal.classList.remove('active')
    }
    function openSuccessModal() {
        body.style.overflow = 'hidden'
        successModal.classList.add('active')
    }
    function closeSuccessModal() {
        body.style.overflow = ''
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
        body.style.overflow = ''
        historyModal.classList.remove('active')
        const scrollContainer = historyModal.querySelector('.history-modal__scroll-wrapper')
        scrollContainer.removeEventListener('scroll', scrolledHistoryModalContent)
        scrollContainer.removeEventListener('scroll', closeHistoryByBg)
    }

    function closeHistoryByBg(e) {
        if (e.target.classList.contains('modal-bg')) {
            closeHistoryModal(e.target.closest('.modal-bg'))
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

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    document.querySelectorAll('.services__card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (canHover.matches || e.target.closest('.group-btns, .svc__all, .svc__prices')) return
            const wasOpen = card.classList.contains('is-open')
            document.querySelectorAll('.services__card.is-open').forEach((c) => c.classList.remove('is-open'))
            if (!wasOpen) card.classList.add('is-open')
        })
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target === card) card.classList.toggle('is-open')
        })
    })

    // Doctor cards: tap/click toggles the description and swaps the photo.
    // Delegated on the slider (Swiper moves slides around in loop mode).
    const teamSlider = document.querySelector('#section-team')
    const toggleDoc = (card) => {
        const open = !card.classList.contains('is-open')
        teamSlider.querySelectorAll('.dcard.is-open').forEach((c) => {
            c.classList.remove('is-open'); c.setAttribute('aria-expanded', 'false')
        })
        if (open) { card.classList.add('is-open'); card.setAttribute('aria-expanded', 'true') }
    }
    if (teamSlider) {
        teamSlider.addEventListener('click', (e) => {
            const card = e.target.closest('.dcard')
            if (!card) return
            if (e.target.closest('.dcard__book')) {
                e.stopPropagation()
                openModal()
                return
            }
            toggleDoc(card)
        })
        teamSlider.addEventListener('keydown', (e) => {
            const card = e.target.closest && e.target.closest('.dcard')
            if (!card || e.target !== card || (e.key !== 'Enter' && e.key !== ' ')) return
            e.preventDefault()
            toggleDoc(card)
        })
        // close an open card when the carousel moves to another doctor
        teamSlider.addEventListener('carousel:change', () =>
            teamSlider.querySelectorAll('.dcard.is-open').forEach((c) => { c.classList.remove('is-open'); c.setAttribute('aria-expanded', 'false') }))
    }
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


