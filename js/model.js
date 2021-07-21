let sceneBook, rendererBook, cameraBook;
let modelBook;
let controlsBook;

function loadBook() {
    const width = 400,
        height = 400;

    sceneBook = new THREE.Scene();

    const container = document.getElementById('book');

    rendererBook = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    rendererBook.gammaOutput = true;
    rendererBook.setClearColor(0xffffff, 0);

    container.appendChild(rendererBook.domElement);

    rendererBook.setSize(width, height);

    cameraBook = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    cameraBook.position.set(0, 0, 100);

    controlsBook = new THREE.TrackballControls(cameraBook, rendererBook.domElement);
    controlsBook.noZoom = true;

    // Create Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, .2);
    sceneBook.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
    sceneBook.add(directionalLight);

    // Load Book GLTF Model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/model/book.gltf', (gltf) => {
        modelBook = gltf.scene;
        modelBook.scale.set(54, 54, 54);
        modelBook.rotation.x = Math.PI / 6.5;

        sceneBook.add(modelBook);
    });
}

loadBook();

// Keep Track of Time
const clockBook = new THREE.Clock();

animate();

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Book Rotation
    if (modelBook) {
        modelBook.rotation.y += Math.PI * .0005;
    }

    controlsBook.update();
    rendererBook.render(sceneBook, cameraBook);
}