// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", click, false);

//Message for browser console
console.log('Below you will find a history of the random quotes and their corresponding index number');

//Variables defined
var previousRandomNumber;
var loadingTime = 10000;

moveBar(); //inital loading bar function to run when page initially loads





window.setInterval(click, loadingTime); //interval timer that calls loading bar function.






function getRandomNumber(numberOfQuotes) { //Gets a random number between 0 and the parameter and returns the random number
  do {var newRandomNumber = Math.floor( Math.random() * numberOfQuotes);
  } while ( previousRandomNumber === newRandomNumber ); //ensures the random number is not a repeat
  previousRandomNumber = newRandomNumber;
  return newRandomNumber;
}

function getRandomQuote() { //Reterns a random object (quote) from array based off random number, argument is total objects (quotes) in array.
  return quotes[getRandomNumber(quotes.length)];
}

function printQuote() { //Prints random quote HTML.
  var randomQuote = getRandomQuote(); //stores random quote object in variable
  var catagoryHTML = ''; //Places catagory text at beginning of html string.
  var loadingBarHTML = '<div id="loading-bar" class="loading-bar"></div>';
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
        } else {
            barWidth += .1;
            barLocation.style.width = barWidth + '%';
        }
    }
}

function click () { //Function that prints the new quote and starts loading bar simultaneously
  printQuote();
  moveBar();
}
