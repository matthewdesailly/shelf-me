const openModal = document.getElementById('open-modal');
const containerModal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

const body = document.getElementsByTagName('BODY')[0];

// left: 37, up: 38, right: 39, down: 40,
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

openModal.addEventListener('click', () => {
    containerModal.classList.add('show-modal');
    body.classList.add('disable-scroll');
    disableScroll();
});

closeModal.addEventListener('click', () => {
    containerModal.classList.remove('show-modal');
    body.classList.remove('disable-scroll');
    enableScroll();
});