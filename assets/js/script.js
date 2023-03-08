let appID = '40fc403148f0bd5f81ba1d88009de8c2'

function getCoordinates() {
    let cityInput = $('#search-bar').val()
    let geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput +'&limit=5&appid=' + appID
    fetch(geoURL)
    .then (function(response){
        return response.json()
    })
    .then (function(data){
        console.log(data)
        let lat = data[0].lat
        let lon = data[0].lon
        function getWeather(){
            let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ appID
            console.log(weatherURL)
            fetch(weatherURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                $('#city').html(data.name)
                $('#date').html(dayjs().format('MM/DD/YYYY'))
                $('#weather-image').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
                $('#temperature').html(data.main.temp)
                $('#wind').html(data.wind.speed)
                $('#humidity').html(data.main.humidity)
            })
        }
        getWeather()
        getForecast()
    })

}



let citySearches = []

function showButtons() {
    $('#recent-searches').empty()
    for (let i = 0; i < citySearches.length; i++) {
        let cityButton = $("<button>")
        cityButton.addClass('cities btn mb-2')
        cityButton.attr('data-name', citySearches[i])
        cityButton.text(citySearches[i])
        $('#recent-searches').append(cityButton)
    }
}

$('#search-btn').click(function (event) {
    // event.preventDefault()
    let city = $('#search-bar').val().trim()
    citySearches.push(city)
    showButtons()
    getCoordinates()
})

