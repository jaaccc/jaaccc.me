const buttons = document.querySelector(".buttons-set");

const images = [...buttons.children];

images.sort(() => Math.random() - 0.5);

images.forEach((image) => {
    buttons.appendChild(image);
});
