const body = document.querySelector('body') 

function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight
}

function getBodyScrollTop() {
    return window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

function modalWindow() {

    body.dataset.scrollY = getBodyScrollTop() // сохраним значение скролла
    // console.log('asdas')
    
    if(existVerticalScroll()) {
       body.classList.add('body-lock')
       body.style.top = `-${body.dataset.scrollY}px`
     }
}
function closeWindow() {
    if(existVerticalScroll()) {
        body.classList.remove('body-lock')
        window.scrollTo(0,body.dataset.scrollY)    
     }
}
export {modalWindow, closeWindow}
// modalWindow()
