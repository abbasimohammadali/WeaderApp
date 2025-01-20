function setTime() {
    const showTime = document.querySelector('.time')

    showTime.innerHTML = `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`
}

setInterval(setTime , 1000)

const search_input = document.querySelector('#search')

let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '26c4d8ad14b57209671494df9bd9fcb9'
}

function fetchData() {
    let counteryValue = search_input.value

    fetch(`${apiData.url}${counteryValue}&&appid=${apiData.key}`).
        then(res => res.json())
        .then(data => {
            showData(data)
        })
}

function showData(data) {
    let cityElem = document.querySelector('.city')
    cityElem.innerHTML = `${data.name}, ${data.sys.country}`

    let dateElem = document.querySelector('.date')
    dateElem.innerHTML = showDate()

    let tempElem = document.querySelector('.temp')
    tempElem.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`

    let humidityElem = document.querySelector('.humidity')
    humidityElem.innerHTML = `${data.main.humidity}%`

    let visiblityElem = document.querySelector('.visiblity')
    visiblityElem.innerHTML = `${data.visibility / 1000} km`

    let pressureElem = document.querySelector('.pressure')
    pressureElem.innerHTML = `${data.main.pressure} hPa`

    let windElem = document.querySelector('.wind')
    windElem.innerHTML = `${data.wind.speed} mph`
}

function showDate() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date()

    let day = days[now.getDay()]
    let month = months[now.getMonth()]
    let year = now.getFullYear()
    let date = now.getDate()

    return `${day} ${date} ${month} ${year}`
}

search_input.addEventListener('keypress' , (event) => {
    let input = search_input

    if(event.keyCode === 13) {
        fetchData()

        input.value = ''
    }
})
