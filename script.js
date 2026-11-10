const button = document.getElementById("welcome-button");
const message = document.getElementById("welcome-message");

button.addEventListener("click", function () {
    message.textContent = "أنا لميس، وهذه أول تجربة تفاعلية لي! 🌸";
    message.style.color = "#b84482";
});