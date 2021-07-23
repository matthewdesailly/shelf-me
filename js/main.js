const main = document.getElementsByTagName('MAIN')[0];
const expand = document.getElementById('expand');

expand.addEventListener('click', () => {
    main.classList.remove('hidden');
});