// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//Message for browser console
console.log('Below you will find a history of the random quotes and their corresponding index number');

//Variables defined
var randomQuote;
var previousRandomNumber = '';
var loadingTime = 5000;
var barWidth;
var loadingBarHTML = '<div id="loading-bar" class="loading-bar"></div>';

moveBar(); //inital loading bar function to run when page initially loads

window.setInterval(moveBar, loadingTime); //interval timer that calls loading bar function.

/*Gets a random number between 0 and the parameter and returns the random number*/
function getRandomNumber(numberOfQuotes) {
  do {var newRandomNumber = Math.floor( Math.random() * numberOfQuotes);
  } while ( previousRandomNumber === newRandomNumber ); //ensures the random number is not a repeat
  previousRandomNumber = newRandomNumber;
  return newRandomNumber;
}

/*Gets a random quote by calling the getRandomNumber function with the argument being the max possible quotes from the array (quotes.length),
selects the quote (or object) from the array based off the random number and returns it*/
function getRandomQuote() {
  return quotes[getRandomNumber(quotes.length)];
}

//Calls the getRandomQuote function and stores in variable.
function printQuote() {
  randomQuote = getRandomQuote(); //stores random quote object in variable
  var catagoryHTML = ''; //Places catagory text at beginning of html string.
  if (randomQuote.hasOwnProperty('category')) {
    catagoryHTML = '<p class="category">' + randomQuote.category + '</p>';
  }
  var html = catagoryHTML + loadingBarHTML + '<p class="quote">' + randomQuote.quote + '</p>'; //Constructs html string with catagory, quote, and source, all with proper html tags.
  html += '<p class="source">' + randomQuote.source;
  if (randomQuote.hasOwnProperty('citation')) { //Test to see if citation and year are present
    html += '<span class="citation">' + randomQuote.citation + '</span>';
  }
  if (randomQuote.hasOwnProperty('year')) {
    html += '<span class="year">' + randomQuote.year + '</span>';
  }
  html += '</p>';
  document.getElementById('quote-box').innerHTML = html; //Writes new html to the page
  console.log(html); //Shows history of quotes in console.
}
  
function moveBar() { //Creates the moving loading bar effect
    var barLocation = document.getElementById('loading-bar');
    var id = setInterval(frame, (loadingTime/1000));
    var barWidth = 1;
    function frame() {
        if (barWidth >= 100) {
            clearInterval(id);
            printQuote();
        } else {
            barWidth += .1;
            barLocation.style.width = barWidth + '%';
        }
    }
}
