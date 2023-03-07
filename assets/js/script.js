// add text input to search area
function addSearch() {
let searchAreaEl = $('.search-area')
// create an input element undear search area
let inputEl = $('<input>')
inputEl.attr('type','text')
inputEl.attr('placeholder', 'Select a City')
inputEl.attr('class','row text-area')
// create a search button
let searchBtnEl = $('<button>')
searchBtnEl.attr('type','button')
searchBtnEl.attr('class', 'btn btn-lg row search-btn')
searchBtnEl.text('Search')
// append input element to search area
searchAreaEl.append(inputEl)
searchAreaEl.append(searchBtnEl)
}

addSearch()
