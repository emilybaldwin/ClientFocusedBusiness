// animation for Hot Air Balloon
function balloonAnimation(e) {
    e.target.classList.add("moveBalloon");
    if (e.target.style.animationPlayState = "paused"){
        e.target.style.animationPlayState = "running";
    }  
};