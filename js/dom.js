const main = document.getElementsByTagName('MAIN')[0];
const expand = document.getElementById('expand');

expand.addEventListener('click', () => {
    main.classList.remove('hidden');
});

const checkBox = document.getElementById('inputBookIsComplete');
let checkedText = document.getElementsByClassName('checkedText')[0];

checkBox.addEventListener('click', () => {
    if (checkBox.checked == true) {
        checkedText.innerHTML = 'Selesai Dibaca';
    } else {
        checkedText.innerHTML = 'Belum Selesai Dibaca';
    }
});