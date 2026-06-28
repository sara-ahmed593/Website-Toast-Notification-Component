

const messageContainer = document.querySelector('.toastContainer');
const actionButtons = document.querySelectorAll('.btn');

/**
 * Creates and displays a toast notification with animation and hover pause/resume.
 *
 * @param {string} (message) HTML string that contains toast content 
 */

const showToast = (message, name) => {

    const toast = document.createElement('div')
    toast.classList.add('toast', 'toast-in', name)

    /**
     * Handles message on toast notification and generates correct toast type.
     */

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
        console.log(actionButtons[i].textContent);
        let toastData = buttonToastMap[actionButtons[i].textContent.toLowerCase()];

        let img = "";
        img = toastData.icon
        let classname
        classname = toastData.className

        showToast(`
            <img class="toast-icon" src="${img}" alt="toast">
            <button class="close-btn">
                <img src="./src/assets/img/Path.svg" alt="close-icon">
            </button>
                <div class="progress-bar"></div>

        `, classname);
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



const buttonToastMap = {
    "success": {
        className: "toast-success",
        icon: "./src/assets/img/success.svg"
    },
    "info": {
        className: "toast-info",
        icon: "./src/assets/img/info.svg"
    },
    "warning": {
        className: "toast-warn",
        icon: "./src/assets/img/warning.svg"
    },
    "error": {
        className: "toast-error",
        icon: "./src/assets/img/error.svg"
    }
};