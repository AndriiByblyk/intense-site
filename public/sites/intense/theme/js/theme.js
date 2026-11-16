window.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    function resetElement(el) {
        const newEl = el.cloneNode(true);
        el.replaceWith(newEl);
        return newEl;
    }

    //region contact form 7 improvements
    function cf7ResetErrors(form){
        form.querySelectorAll('.row-data__error-line').forEach(el => {
            const wrap = el.closest('.row-data');
            wrap.classList.remove('row-data--error');
            el.remove();
        });
    }
    document.addEventListener('wpcf7submit', function (e) {
        const form = e.target;
        //console.log('wpcf7submit ', form);
        cf7ResetErrors(form);
    });

    document.addEventListener('wpcf7mailsent', function (e) {
        const form = e.target;
        //console.log('wpcf7mailsent', form);
        cf7ResetErrors(form);
        document.querySelector('#modal-close').click();
        body.style.overflow = 'hidden'
        document.querySelector('#modal-success').classList.add('active')
    });

    document.addEventListener('wpcf7invalid', function (e) {
        const form = e.target;
        //console.log('wpcf7invalid', form);
        const errors = e.detail.apiResponse.invalid_fields;
        for(const err of errors){
            const input = form.querySelector(`[name="${err.field}"]`);
            const inputWrap = input.closest('.row-data');
            input.addEventListener('input', () => {
                inputWrap.classList.remove('row-data--error');
                inputWrap.querySelector('.row-data__error-line').remove();
            });
            inputWrap.classList.add('row-data--error');
            const errorHtml = `<div class="row-data__error-line"><span>* </span> <span>${err.message}</span></div>`;
            inputWrap.insertAdjacentHTML('beforeend', `<div class="row-data__error-line"><span>* </span> <span>${err.message}</span></div>`);
        }
    });
    //endregion contact form 7 improvements

    // anchor scrolling is handled by Lenis (SmoothScroll.tsx) on the Intense site
})