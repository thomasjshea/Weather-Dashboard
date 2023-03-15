let appID = '40fc403148f0bd5f81ba1d88009de8c2'

// Everything is included under the getCoordinates function
function getCoordinates() {
    let cityInput = $('#search-bar').val()
    // the geocoding URL to obtain latitude and longitude 
    let geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput +'&limit=5&appid=' + appID
    fetch(geoURL)
    .then (function(response){
        return response.json()
    })
    .then (function(data){
        console.log(data)
        // gets the lat/lon data from the API
        let lat = data[0].lat
        let lon = data[0].lon
        // getWeather function gets the current conditions from the API
        function getWeather(){
            let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ appID
            console.log(weatherURL)
            fetch(weatherURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                // Sets the inner HTML of each selection using jQuery
                $('#city').html(data.name)
                $('#date').html(dayjs().format('MM/DD/YYYY'))
                $('#weather-image').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
                $('#temperature').html(data.main.temp)
                $('#wind').html(data.wind.speed)
                $('#humidity').html(data.main.humidity)
            })
        }
        // fetches the 5-day forecast from the API
        function getForecast() {
            let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ appID
            fetch(forecastURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                // Sets day 1 of the forecast
                $('#weather-image-1').attr('src','http://openweathermap.org/img/w/' + data.list[5].weather[0].icon + '.png')
                $('#date-1').html(dayjs().add(1,'day').format('MM/DD/YYYY'))
                $('#temperature-1').html(data.list[5].main.temp_max)
                $('#wind-1').html(data.list[5].wind.speed)
                $('#humidity-1').html(data.list[5].main.humidity)
                
                // Sets day 2 of the forecast
                $('#weather-image-2').attr('src','http://openweathermap.org/img/w/' + data.list[13].weather[0].icon + '.png')
                $('#date-2').html(dayjs().add(2,'day').format('MM/DD/YYYY'))
                $('#temperature-2').html(data.list[13].main.temp_max)
                $('#wind-2').html(data.list[13].wind.speed)
                $('#humidity-2').html(data.list[13].main.humidity)

                // Sets day 3 of the forecast
                $('#weather-image-3').attr('src','http://openweathermap.org/img/w/' + data.list[21].weather[0].icon + '.png')
                $('#date-3').html(dayjs().add(3,'day').format('MM/DD/YYYY'))
                $('#temperature-3').html(data.list[21].main.temp_max)
                $('#wind-3').html(data.list[21].wind.speed)
                $('#humidity-3').html(data.list[21].main.humidity)

                // Sets day 4 of the forecast
                $('#weather-image-4').attr('src','http://openweathermap.org/img/w/' + data.list[29].weather[0].icon + '.png')
                $('#date-4').html(dayjs().add(4,'day').format('MM/DD/YYYY'))
                $('#temperature-4').html(data.list[29].main.temp_max)
                $('#wind-4').html(data.list[29].wind.speed)
                $('#humidity-4').html(data.list[29].main.humidity)

                // Sets day 5 of the forecast
                $('#weather-image-5').attr('src','http://openweathermap.org/img/w/' + data.list[37].weather[0].icon + '.png')
                $('#date-5').html(dayjs().add(5,'day').format('MM/DD/YYYY'))
                $('#temperature-5').html(data.list[37].main.temp_max)
                $('#wind-5').html(data.list[37].wind.speed)
                $('#humidity-5').html(data.list[37].main.humidity)
            })
        }
        // calls the getWeather and getForecast function after the coordinates are fetched from the Geocoding API
        getWeather()
        getForecast()
    })

}


// sets an empty array to save past searches to
var citySearches = []
// Shows the city buttons and sets their attributes
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

// initializes the page
function init() {
    let storedCities = JSON.parse(localStorage.getItem('searches'))
    if(storedCities !== null) {
        citySearches = storedCities
        showButtons()
    }
}

// clears the search input area
function clearSearch(){
    $('#search-bar').val('')
}

// adds event listener to the search button
// this function saves the city name to local storage, adds the city button, starts the getCoordinates function and clears the search bar
$('#search-btn').click(function () {
    let city = $('#search-bar').val().trim()
    citySearches.push(city)
    localStorage.setItem('searches', JSON.stringify(citySearches))
    showButtons()
    getCoordinates()
    clearSearch()
})

// adds event listener to the cities buttons
// sets the search bar value to the selected city, calls the getCoordinates function for that city and clears the search bar
$(document).on('click', '.cities', function(){
    let selectedCity = $(this).attr('data-name')
    console.log(selectedCity)
    $('#search-bar').val(selectedCity)
    getCoordinates()
    clearSearch()
})

// calls the init function
init()




