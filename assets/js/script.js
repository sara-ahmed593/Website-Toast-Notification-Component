

const messageContainer = document.querySelector('.toastContainer');
const actionButtons = document.querySelectorAll('.btn');

/**
 * Creates and displays a toast notification with animation and hover pause/resume.
 *
 * @param {string} (message) HTML string that contains toast content 
 */

const showToast = (message) => {

    const toast = document.createElement('div')
    toast.classList.add('toast', 'toast-in')

    /**
     * Handles message on toast notification and generates correct toast type.
     */


    switch (true) {
        case message.includes('success'):
            toast.classList.add('toast-success');
            break;

        case message.includes('error'):
            toast.classList.add('toast-error');
            break;

        case message.includes('warning'):
            toast.classList.add('toast-warn');
            break;

        case message.includes('info'):
            toast.classList.add('toast-info');
            break;
    }
    toast.innerHTML = message
    messageContainer.prepend(toast)



    let startTime = Date.now();
    const duration = 4000;
    let remaining = duration

    let timer = setTimeout(() => {
        hideToast(toast);

    }, duration);

    /**
     * Handles progress bar animation, timer on toast notification .
     */



    const progress = toast.querySelector('.progress-bar')
    progress.style.animation = `progressBar ${duration}ms linear forwards`;


    toast.addEventListener('mouseenter', () => {
        progress.style.animationPlayState = 'paused';
        clearTimeout(timer);
        remaining = remaining - (Date.now() - startTime);

    });


    toast.addEventListener('mouseleave', () => {
        progress.style.animationPlayState = 'running';
        startTime = Date.now()
        timer = setTimeout(() => {
            hideToast(toast);
        }, remaining);


    });

    /**
     * close toast by button click.
     */

    const closeBtn = toast.querySelector(".close-btn");

    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearTimeout(timer);
        hideToast(toast)
    }
    );
}
/**
 * Handles click events on toast buttons and generates correct toast type.
 */

for (let i = 0; i < actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', () => {


        let img = "";

        switch (true) {
            case actionButtons[i].classList.contains('b-success'):
                img = "./assets/img/success.svg";
                break;

            case actionButtons[i].classList.contains('b-primary'):
                img = "./assets/img/info.svg";
                break;

            case actionButtons[i].classList.contains('b-warning'):
                img = "./assets/img/warning.svg";
                break;

            case actionButtons[i].classList.contains('b-danger'):
                img = "./assets/img/error.svg";
                break;
        }

        showToast(`
            <img class="toast-icon" src="${img}" alt="toast">
            <button class="close-btn">
                <img src="assets/img/Path.svg" alt="close-icon">
            </button>
                <div class="progress-bar"></div>

        `);
    });
}

/**
 * Removes toast from DOM with exit animation.
 *
  The toast element that will be removed
 */

function hideToast(toast) {
    toast.classList.remove("toast-in");
    toast.classList.add("toast-out");

    toast.addEventListener("animationend", () => {
        toast.remove();
    });
}

