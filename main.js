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
         hours = 0,
         minutes = 0,
         seconds = 0

    // Don't calculate the time left if it is Christmas day
    if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
        giorni = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
        hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24
        minutes = Math.floor(timeLeft / 1000 / 60) % 60
        seconds = Math.floor(timeLeft / 1000) % 60
    }

    // Show missing giorni
    numberData.innerHTML = giorni < 10 ? `0${giorni}` : giorni
    textData.innerHTML = 'Giorni'

    // Show missing hours
    if (currentDay == 24) {
        numberData.innerHTML = hours < 10 ? `0${hours}` : hours
        textData.innerHTML ='Hours'
    }

    // Show missing minutes. Countdown, 0 hours left, show minutes (00:59)
     if (currentDay == 24 && hours === 0) {
        numberData.innerHTML = minutes < 10 ? `0${minutes}` : minutes
        textData.innerHTML ='Minutes'
    }

    // Show missing seconds. Countdown, 0 hours & 0 minutes left, show seconds (00:00:59)
    if (currentDay == 24 && hours === 0 && minutes === 0) {
        numberData.innerHTML = seconds < 10 ? `0${seconds}` : seconds
        textData.innerHTML ='Seconds'
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
}


setInterval(christmasCountdown, 1000)
