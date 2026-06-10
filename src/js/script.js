

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

       if (message.includes('success')) {

        toast.classList.add('toast-success');

    } else if (message.includes('error')) {

        toast.classList.add('toast-error');

    } else if (message.includes('warning')) {

        toast.classList.add('toast-warn');

    } else if (message.includes('info')) {

        toast.classList.add('toast-info');

    }
toast.innerHTML = message 
    messageContainer.prepend(toast)


     
  let startTime = Date.now();
 let duration = 4000;
 let remaining =duration

let timer = setTimeout(() => {
        hideToast(toast);

    }, duration);
   
/**
 * Handles progress bar animation, timer on toast notification .
 */

    

    const progress = toast.querySelector('.progress-bar')
     progress.style.animation = `progressBar ${duration}ms linear forwards`;


      toast.addEventListener('mouseenter', ()=>{
 progress.style.animationPlayState = 'paused' ;
     clearTimeout(timer);
    remaining = remaining - (Date.now() - startTime);

      });


  toast.addEventListener('mouseleave', () => { 
     progress.style.animationPlayState  = 'running' ;
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

        if (actionButtons[i].classList.contains('b-success')){
             img = "./src/img/success.png";
        }
        else if (actionButtons[i].classList.contains('b-primary')) {
            img = "./src/img/info.png";
        }
        else if (actionButtons[i].classList.contains('b-warning')){
             img = "./src/img/warning.png";
        }
        else if (actionButtons[i].classList.contains('b-danger')) {
            img = "./src/img/error.png";
        }

        showToast(`
            <img class="toast-icon" src="${img}" alt="toast">
            <button class="close-btn">
                <img src="./src/img/Path.png" alt="close-icon">
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

