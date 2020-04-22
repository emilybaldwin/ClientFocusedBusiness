var imageSources = [
    "./images/fish1.svg",
    "./images/fish2.svg",
    "./images/fish3.svg",
    "./images/fish4.svg",
]

function addFish() {
    let tank = document.getElementById("tank");
    let fishImage = document.createElement("img");
    let path = imageSources[Math.floor(Math.random() * imageSources.length)];
    let top = Math.floor(Math.random() * 80);
    let left = Math.floor(Math.random() * 60) + 20;
    fishImage.src = path;
    fishImage.classList.add("swimmingFish");
    fishImage.style.top = top + "%";
    fishImage.style.left = left + "%";
    tank.appendChild(fishImage);
}