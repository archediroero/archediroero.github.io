const wishes = [
  "🌟Feliz Cumpleaños Mafe... 🌟",
  "En este día especial, quiero celebrar tu **increíble fuerza** ✨",
  "Has atravesado luchas y has salido **victoriosa**. Eso es **valentía**.",
  "Tu fortaleza es una **luz** que ilumina el camino de otros. ¡Nunca lo olvides! ",
  "Cada desafío que superaste te hizo más fuerte. Eres una persona **imparable**.",
  "Que este nuevo año te traiga **paz**, **alegría** y la certeza de tu **propio poder**.",
  "¡Feliz Cumpleaños! 🎂",
  "Pero antes de continuar, dos mensajes para ti elije uno... 🤔"
];
const sisterChat = [

  "Mafe, lo que has superado es la prueba de una **fuerza increíble**.",
  "Tu personalidad y tu manera de levantarte en cada batalla son un regalo para quienes te queremos**. 💫",
  "Has pasado momentos duros, eres alguien que **lucha y vence** cada día. ✨",
  "Por esa **valentía** y por ser una **inspiración**...",
  "Quiero que siempre te vaya bien en todo lo que te propones. ",
  "Nunca dejes de confiar en ti**¿ok? ¡Feliz cumpleaños! 🎉✨🌟"
];
const bestFriendMessages = [

  "¡Celebra tu fuerza, Mafe! Mira todo lo que has logrado. ✨",
  "**CONSEJO 1:** Nunca dejes que tu luz dependa de la aprobación externa. ¡Brilla por ti! 💡",
  "**CONSEJO 2:** No te castigues por lo que fue. Cada error es una lección y un nuevo comienzo. ",
  "**CONSEJO 3:** Rodéate de personas que no te resten, sino que te multipliquen. Somos un equipo. 💪",
  "**CONSEJO 4:** Tu mente es tu jardín, cuida lo que siembras. El poder está en lo que te dices a ti misma. 🌿",
  "**PROMESAS:** Recuerda esto: no estás sola en tu camino. Estas rodeada de persona que te aprecian. 🎉",
  "Tu eres **una chica fuerte** y gracias por tu amistad un feliz cumpleaños. 🎉",
  "🥊 ¡Acepta tu título de Campeona de la Vida! Has batallado con fuerza y corazón. 💪✨",
  "Ahora ve a celebrar con la certeza de que eres una vencedora. 🌸"
];

function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}

function createEmoji() {
  const emojis = ["", "⭐", "✨", "🎉", "🎂", "🎈"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = "-50px";
  document.body.appendChild(emoji);
  const animation = emoji.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)"
      },
      {
        transform: `translateY(${window.innerHeight + 50}px) rotate(${
          Math.random() * 360
        }deg)`
      }
    ],
    {
      duration: 3000,
      easing: "linear"
    }
  );
  animation.onfinish = () => emoji.remove();
}

// Actualizado: Detiene y resetea ambos audios (solo usado al inicio de 'sister')
function stopAllMusic() {
  const audios = ["bgMusic", "sisterMusic"]; 
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Audio play failed:", err));
  }
}
let emojiInterval;
async function typeWriter(text) {
  const wishesElement = document.getElementById("wishes");
  wishesElement.style.opacity = 1;
  wishesElement.innerHTML = "";
  wishesElement.className = "wishes neon-text";
  for (let char of text) {
    wishesElement.innerHTML += char;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

const muteButton = document.getElementById("muteButton");
let isMuted = false;

if (muteButton) {
  muteButton.addEventListener("click", () => {
    const audios = ["bgMusic", "sisterMusic"]; 
    isMuted = !isMuted;
    audios.forEach((id) => {
      const audio = document.getElementById(id);
      if (audio) {
        audio.muted = isMuted;
      }
    });
    // Update button text
    muteButton.textContent = isMuted ? "🔇" : "🔊";
  });
}

// ***************************************************************
// * FUNCIÓN makeChoice MODIFICADA PARA MÚSICA CONTINUA EN BGMusic *
// ***************************************************************
async function makeChoice(choice) {
  clearInterval(emojiInterval);
  const wishesElement = document.getElementById("wishes");
  document.getElementById("choices").style.display = "none";
  
  const bgAudio = document.getElementById("bgMusic");
  const sisterAudio = document.getElementById("sisterMusic");
  
  if (choice === "sister") {
    // MENSAJE CUMPLEAÑOS (cumpleaños feliz.mp3)
    
    // 1. Pausamos bgMusic (NO resetemos currentTime para poder reanudar)
    bgAudio.pause(); 
    
    document.body.classList.add("sad-theme");
    
    // 2. Detenemos y reseteamos sisterMusic por si acaso
    sisterAudio.pause();
    sisterAudio.currentTime = 0; 

    // 3. Reproducimos la música 'sister'
    sisterAudio.muted = isMuted;
    try {
      const playPromise = sisterAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed for sisterMusic:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed for sisterMusic:", err);
    }
    
    await sisterChat.reduce((promise, message) => {
      return promise.then(() => typeWriter(message));
    }, Promise.resolve());
    
    // Al finalizar, mostramos el botón para volver a Motivacion
    document.getElementById("choices").innerHTML = `
                    <button class="choice-btn" onclick="makeChoice('bestfriend')">Motivacion</button>
                `;
    document.getElementById("choices").style.display = "block";
    document.querySelector(".choice-btn").style.opacity = 1;
    
  } else {
    // MOTIVACION (Feliz Cumpleaños, Mafe.mp3)

    // 1. Detenemos la música 'sister' (si estaba sonando)
    sisterAudio.pause();
    sisterAudio.currentTime = 0;
    
    // 2. Reanudamos la música de fondo (Mafe) desde donde se quedó.
    bgAudio.muted = isMuted;
     try {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed for bgMusic (choice):", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed for bgMusic (choice):", err);
    }
    
    document.body.classList.remove("sad-theme");
    emojiInterval = setInterval(createEmoji, 300);
    
    await bestFriendMessages.reduce((promise, message) => {
        return promise.then(() => typeWriter(message));
    }, Promise.resolve());

    // Mostrar botones al final
    document.getElementById("choices").innerHTML = `
                    <button class="choice-btn" onclick="makeChoice('sister')">Mensaje cumpleaños</button>
                    
                `;
    document.getElementById("choices").style.display = "block";
    document.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.style.opacity = 1;
    });

    wishesElement.innerHTML = "“Mafe, que este cumpleaños te recuerde lo fuerte que eres y todo lo bueno que aún te espera.” 🎉✨";
  }
}
// ***************************************************************
// * FIN DE LA FUNCIÓN makeChoice MODIFICADA *
// ***************************************************************


async function initializeApp() {
    
    const bodyElement = document.getElementById("body");
    if (bodyElement.requestFullscreen) {
        bodyElement.requestFullscreen().catch(err => {
            console.log("Fullscreen request failed:", err);
        });
    }

    document.getElementById("startBtn").style.display = "none";
    document.getElementById("wishesContainer").classList.remove("hidden");
    
    // La música de fondo se inicia en el primer clic
    const bgAudio = document.getElementById("bgMusic");
    bgAudio.muted = isMuted;
    try {
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Audio play failed:", error);
            });
        }
    } catch (err) {
        console.log("Audio play failed:", err);
    }
    
    emojiInterval = setInterval(createEmoji, 300);
    for (let wish of wishes) {
        await typeWriter(wish);
    }
    document.getElementById("choices").classList.remove("hidden");
    document.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.style.opacity = 1;
    });
}

document.getElementById("startBtn").addEventListener("click", initializeApp);

createStars();