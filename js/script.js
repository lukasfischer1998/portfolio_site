// DOM-Elemente abrufen
const modeSwitch = document.getElementById("mode-switch");
const modeIcon = document.getElementById("mode-icon");
const homeDynamik = document.getElementById("HomeDynamik");
const buttons = document.querySelectorAll(".btn");

// Vorabladen der Hintergrundbilder
const preloadImages = () => {
  const images = [
    "../img/moon.svg",
    "../img/sun.svg",
    "../img/Darkmodebg.svg",
    "../img/Whitemodebg.svg",
  ];
  images.forEach((image) => {
    new Image().src = image;
  });
};

// Funktion zum Umschalten des Dunkelmodus
const toggleDarkMode = () => {
  const isDarkMode = document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode", !isDarkMode);
  document.body.classList.toggle("light-mode", isDarkMode);
  modeIcon.src = isDarkMode ? "../img/sun.svg" : "../img/moon.svg";
};

// Ereignislistener für den Dunkelmodus-Schalter
modeSwitch.addEventListener("click", () => {
  toggleDarkMode();
});

// Funktion zur Auswahl eines Buttons
function selectButton(button) {
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  document.getElementById(`${button}Button`).classList.add("selected");

  homeDynamik.classList.remove("slide-in");
  homeDynamik.classList.add("slide-out");

  setTimeout(() => {
    const contentPath = `../html/${button}.html`;

    fetch(contentPath)
      .then((response) => response.text())
      .then((html) => {
        homeDynamik.innerHTML = html;
        homeDynamik.classList.remove("slide-out");
        homeDynamik.classList.add("slide-in");
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, 500);
}

// Vorabladen der Bilder beim Laden der Seite
preloadImages();
