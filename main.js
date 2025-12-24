/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== DAY COUNTER FOR CHRISTMAS ===============*/
const titleData = document.getElementById('title-data'),
        numberData = document.getElementById('number-data'),
        textData = document.getElementById('text-data'),
        msgChristmas = document.getElementById('msg-christmas')

const christmasCountdown = () => {
    let now = new Date(), // Get today's date
         currentMonth = now.getMonth() + 1, // Get the current month
         currentDay = now.getDate() // Get the current day of the month

    // Calculate the year the next Christmas will be
    let nextChristmasYear = now.getFullYear()
    if (currentMonth == 12 && currentDay > 25) {
        nextChristmasYear +=1
    }

    let nextChristmasDate = new Date(`${nextChristmasYear}-12-25T23:59:59`),
         christmasDay = new Date(nextChristmasDate),
         timeLeft = christmasDay - now

    let giorni = 0,
         ore = 0,
         minuti = 0,
         secondi = 0

    // Don't calculate the time left if it is Christmas day
    if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
        giorni = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
        ore = Math.floor(timeLeft / 1000 / 60 / 60) % 24
        minuti = Math.floor(timeLeft / 1000 / 60) % 60
        secondi = Math.floor(timeLeft / 1000) % 60
    }

    // Show missing giorni
    numberData.innerHTML = giorni < 10 ? `0${giorni}` : giorni
    textData.innerHTML = 'Giorni'

    // Show missing ore
    if (currentDay == 24) {
        numberData.innerHTML = ore < 10 ? `0${ore}` : ore
        textData.innerHTML ='Ore'
    }

    // Show missing minuti. Countdown, 0 ore left, show minuti (00:59)
     if (currentDay == 24 && ore === 0) {
        numberData.innerHTML = minuti < 10 ? `0${minuti}` : minuti
        textData.innerHTML ='Minuti'
    }

    // Show missing secondi. Countdown, 0 ore & 0 minuti left, show secondi (00:00:59)
    if (currentDay == 24 && ore === 0 && minuti === 0) {
        numberData.innerHTML = secondi < 10 ? `0${secondi}` : secondi
        textData.innerHTML ='secondi'
    }

    // Show message on Christmas Day
    if (currentMonth == 12 && currentDay == 25){
        titleData.style.display = 'none'
        msgChristmas.style.display = 'block'
        msgChristmas.innerHTML = 'Today is Dec 25, Merry Christams!'
    }

    // Show remaining giorni & remove Christmas message
    if (currentMonth == 12 && currentDay == 26){
        titleData.style.display = 'block'
        msgChristmas.style.display = 'none'
    }
      
    // Function to make singular or plural based on number
    function formatSingolarePlurale(valore, singolare, plurale) {
        return valore === 1 ? `${valore} ${singolare}` : `${valore} ${plurale}`;
  }

  // Update the contents of the element with the ID 'countdown'
  document.getElementById('countdown').innerHTML = 
    `${formatSingolarePlurale(giorni, 'giorno', 'giorni')}, ` +
    `${formatSingolarePlurale(ore, 'ora', 'ore')}, ` +
    `${formatSingolarePlurale(minuti, 'minuto', 'minuti')}, ` +
    `${formatSingolarePlurale(secondi, 'secondo', 'secondi')}`;
}

setInterval(christmasCountdown, 1000)

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const startScreen = document.getElementById("start-screen");
    const music = document.getElementById("bg-music");

    if (!startBtn) return; // sicurezza

    startBtn.addEventListener("click", () => {
        // Musica
        const wantMusic = confirm("Vuoi avviare la musica? 🎵");
        if (wantMusic) music.play().catch(err => console.log(err));

        // Fullscreen solo desktop
        const isDesktop = window.matchMedia("(pointer: fine)").matches;
        if (isDesktop) {
            const wantFullscreen = confirm("Vuoi lo schermo intero? 🖥️");
            if (wantFullscreen) document.documentElement.requestFullscreen().catch(err => console.log(err));
        }

        // Nascondi overlay
        startScreen.style.display = "none";
    });
});
