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
        function getForecast() {
            let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ appID
            fetch(forecastURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                $('#weather-image-1').attr('src','http://openweathermap.org/img/w/' + data.list[5].weather[0].icon + '.png')
                $('#date-1').html(dayjs().add(1,'day').format('MM/DD/YYYY'))
                $('#temperature-1').html(data.list[5].main.temp_max)
                $('#wind-1').html(data.list[5].wind.speed)
                $('#humidity-1').html(data.list[5].main.humidity)

                $('#weather-image-2').attr('src','http://openweathermap.org/img/w/' + data.list[13].weather[0].icon + '.png')
                $('#date-2').html(dayjs().add(2,'day').format('MM/DD/YYYY'))
                $('#temperature-2').html(data.list[13].main.temp_max)
                $('#wind-2').html(data.list[13].wind.speed)
                $('#humidity-2').html(data.list[13].main.humidity)

                $('#weather-image-3').attr('src','http://openweathermap.org/img/w/' + data.list[21].weather[0].icon + '.png')
                $('#date-3').html(dayjs().add(3,'day').format('MM/DD/YYYY'))
                $('#temperature-3').html(data.list[21].main.temp_max)
                $('#wind-3').html(data.list[21].wind.speed)
                $('#humidity-3').html(data.list[21].main.humidity)

                $('#weather-image-4').attr('src','http://openweathermap.org/img/w/' + data.list[29].weather[0].icon + '.png')
                $('#date-4').html(dayjs().add(4,'day').format('MM/DD/YYYY'))
                $('#temperature-4').html(data.list[29].main.temp_max)
                $('#wind-4').html(data.list[29].wind.speed)
                $('#humidity-4').html(data.list[29].main.humidity)

                $('#weather-image-5').attr('src','http://openweathermap.org/img/w/' + data.list[37].weather[0].icon + '.png')
                $('#date-5').html(dayjs().add(5,'day').format('MM/DD/YYYY'))
                $('#temperature-5').html(data.list[37].main.temp_max)
                $('#wind-5').html(data.list[37].wind.speed)
                $('#humidity-5').html(data.list[37].main.humidity)
            })
        }
        getWeather()
        getForecast()
    })

}



var citySearches = []

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
showButtons()

function init() {
    let storedCities = JSON.parse(localStorage.getItem('searches'))
    if(storedCities !== null) {
        citySearches = storedCities
        showButtons()
    }
}

function clearSearch(){
    $('#search-bar').val('')
}

$('#search-btn').click(function () {
    let city = $('#search-bar').val().trim()
    citySearches.push(city)
    localStorage.setItem('searches', JSON.stringify(citySearches))
    showButtons()
    getCoordinates()
    clearSearch()
})

$(document).on('click', '.cities', function(){
    let selectedCity = $(this).attr('data-name')
    console.log(selectedCity)
    $('#search-bar').val(selectedCity)
    getCoordinates()
    clearSearch()
})

init()




