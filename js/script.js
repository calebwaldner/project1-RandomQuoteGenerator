// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//Message for browser console
console.log('Below you will find a history of the random quotes and their corresponding index number');

//Variables defined
var randomQuote;
var previousRandomNumber = '';


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

  //Places catagory text at beginning of html string.
  var catagoryHTML = '';
  if (randomQuote.hasOwnProperty('category')) {
    catagoryHTML = '<p class="category">' + randomQuote.category + '</p>';
  }

  //Constructs html string with catagory, quote, and source, all with proper html tags.
  var html = catagoryHTML + '<p class="quote">' + randomQuote.quote + '</p>';
  html += '<p class="source">' + randomQuote.source;

  //Test to see if citation and year are present
  if (randomQuote.hasOwnProperty('citation')) {
    html += '<span class="citation">' + randomQuote.citation + '</span>';
  }
  if (randomQuote.hasOwnProperty('year')) {
    html += '<span class="year">' + randomQuote.year + '</span>';
  }
  html += '</p>';

  document.getElementById('quote-box').innerHTML = html;

  console.log(html); //Shows history of quotes in console.
}
