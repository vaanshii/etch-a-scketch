const screenContainer = document.querySelector(".sketch-screen-container");
const rainbowToggle = document.querySelector("#rainbow-toggle");
const pixelSlider = document.querySelector(".pixel-slider");
const clearButton = document.querySelector("#clear-button");
const colorPicker = document.querySelector("#color-picker");
const eraserButton = document.querySelector("#eraser-button");

let colorPickerLastValue = "#000000";
let isEraserButtonOn = true;

makePixel(16);

colorPicker.addEventListener("input", () => {
	colorPickerLastValue = colorPicker.value;
});

eraserButton.addEventListener("click", () => {
	if (isEraserButtonOn) {
		colorPicker.value = "#ffffff";
		rainbowToggle.checked = false;
	} else {
		colorPicker.value = colorPickerLastValue;
	}
	isEraserButtonOn = !isEraserButtonOn;
});

clearButton.addEventListener("click", () => {
	clearScreen();
	makePixel(Number(pixelSlider.value) || 16);
});

pixelSlider.addEventListener("input", () => {
	clearScreen();
	makePixel(Number(pixelSlider.value));
});

function paintPixel(pixel) {
	pixel.style.backgroundColor = rainbowToggle.checked
		? getRainbowColors()
		: colorPicker.value;
}

function makePixel(pixelCount) {
	const gridSize = pixelCount * pixelCount;
	const fragment = document.createDocumentFragment();
	let isDrawing = false;
	for (let i = 0; i < gridSize; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.style.width = `calc(100% / ${pixelCount})`;
		pixel.style.height = `calc(100% / ${pixelCount})`;
		fragment.appendChild(pixel);
	}
	screenContainer.appendChild(fragment);

	screenContainer.addEventListener("mousedown", (e) => {
		if (e.target.classList.contains("pixel")) {
			isDrawing = true;
			paintPixel(e.target);
		}
	});

	screenContainer.addEventListener("mouseover", (e) => {
		if (isDrawing && e.target.classList.contains("pixel")) {
			paintPixel(e.target);
		}
	});

	document.addEventListener("mouseup", () => {
		isDrawing = false;
	});
}

function clearScreen() {
	while (screenContainer.firstChild) {
		screenContainer.removeChild(screenContainer.firstChild);
	}
}

function getRandomNumber(number) {
	return Math.floor(Math.random() * (number + 1));
}

function getRainbowColors() {
	return `rgb(${getRandomNumber(255)} ${getRandomNumber(255)} ${getRandomNumber(
		255
	)} )`;
}
