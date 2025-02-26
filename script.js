const screenContainer = document.querySelector(".sketch-screen-container");
const rainbowToggle = document.querySelector("#rainbow-toggle");
const pixelSlider = document.querySelector(".pixel-slider");
const clearButton = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const eraserButton = document.querySelector("#eraser-button");

makePixel(16);
console.log(Number(pixelSlider.value));

clearButton.addEventListener("click", () => {
	clearScreen();
	makePixel(Number(pixelSlider.value) || 16);
});

pixelSlider.addEventListener("input", () => {
	clearScreen();
	makePixel(Number(pixelSlider.value));
	console.log(Number(pixelSlider.value));
});

function makePixel(pixelCount) {
	const gridSize = pixelCount * pixelCount;
	for (let i = 0; i < gridSize; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.style.width = `calc(100% / ${pixelCount})`;
		pixel.style.height = `calc(100% / ${pixelCount})`;
		screenContainer.appendChild(pixel);

		pixel.addEventListener("mouseover", () => {
			pixel.style.backgroundColor = colorPicker.value;
			pixel.style.width = `calc(100% / ${pixelCount})`;
			pixel.style.height = `calc(100% / ${pixelCount})`;
		});
	}
}

function clearScreen() {
	while (screenContainer.firstChild) {
		screenContainer.removeChild(screenContainer.firstChild);
	}
}
