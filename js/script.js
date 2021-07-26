document.addEventListener("DOMContentLoaded", function () {

    const submitBookForm /* HTMLFormElement */ = document.getElementById("inputBook");

    submitBookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        containerModal.classList.remove('show-modal');
        body.classList.remove('disable-scroll');
        enableScroll();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const main = document.getElementsByTagName('MAIN')[0];
const expand = document.querySelector('#expand>a');

expand.addEventListener('click', (event) => {
    event.preventDefault();

    main.classList.remove('hidden');
    window.location.href = "#content";
});

const checkBox = document.getElementById('inputBookIsComplete');
const checkedText = document.getElementsByClassName('checkedText')[0];

checkBox.addEventListener('click', () => {

    if (checkBox.checked == true) {
        checkedText.innerHTML = 'Sudah Selesai Dibaca';
    } else {
        checkedText.innerHTML = 'Belum Selesai Dibaca';
    }
});

const search = document.getElementById('searchSubmit');

search.addEventListener('click', (event) => {
    event.preventDefault();

    const title = document.getElementById('searchBookTitle').value;
    const listData = document.querySelectorAll('article');

    for (data of listData) {
        const listTitle = data.querySelector('.title');
        if (title != '') {
            if (listTitle.innerText.toLowerCase().includes(title.toLowerCase())) {
                data.removeAttribute('style', 'display:none');
            } else {
                data.setAttribute('style', 'display:none');
            }
        } else {
            data.removeAttribute('style', 'display:none');
        }
    }
})