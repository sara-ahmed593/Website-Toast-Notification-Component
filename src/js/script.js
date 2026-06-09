const successButton = document.querySelector('.b-success');
const infoButton = document.querySelector('.b-primary');
const warningButton = document.querySelector('.b-warning');
const errorButton = document.querySelector('.b-danger');
const messageContainer = document.querySelector('.toastContainer');


const showToast = (message) => {

    const toast = document.createElement('div')
    toast.classList.add('toast', 'toast-in')


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

    setTimeout(() => {
        hideToast(toast);


    }, 4000);

    const closeBtn = toast.querySelector(".close-btn");

    closeBtn.addEventListener("click", (e) => {
        hideToast(toast)
    }
    );



}


function hideToast(toast) {
    toast.classList.remove("toast-in");
    toast.classList.add("toast-out");

    toast.addEventListener("animationend", () => {
        toast.remove();
    });
}

successButton.addEventListener('click', () => {
    showToast(` <img   class="toast-icon" src="./src/img/success.png" alt="success"> 
       <button class="close-btn">
      <img src="./src/img/Path.png" alt="close-icon">
    </button>`)
})

infoButton.addEventListener('click', () => {
    showToast(`   <img  class="toast-icon" src="./src/img/info.png" alt="info">
 
       <button class="close-btn">
      <img src="./src/img/Path.png" alt="close-icon">
    </button>`)
})

warningButton.addEventListener('click', () => {
    showToast(` <img  class="toast-icon" src="./src/img/warning.png" alt="warn">
 
       <button class="close-btn">
      <img src="./src/img/Path.png" alt="close-icon">
    </button>`)
})


errorButton.addEventListener('click', () => {
    showToast(`  <img  class="toast-icon" src="./src/img/error.png" alt="error">
 
       <button class="close-btn">
      <img src="./src/img/Path.png" alt="close-icon">
    </button>`)
})






