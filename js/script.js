// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", click, false);

//Message for browser console
console.log('Below you will find a history of the random quotes and their corresponding index number');

//Variables defined
var randomNumber = [0, 0];
var loadingTime = 10000;
var intervalID;
var colorPalette = [ '#ff004f', '#0085b9', '#00b9c4', '#00df9f', '#ffe400'];

moveBar(); //inital loading bar function to run when page initially loads
intervalID = window.setInterval(click, loadingTime); //Initial interval timer that calls click function, continues to run until user clicks button

function getRandomNumber(maxNumber, dontRepeat) { //Gets a random number between 0 and the parameter and returns the random number
  do {var newRandomNumber = Math.floor( Math.random() * maxNumber);
  } while ( dontRepeat === newRandomNumber ); //ensures the random number is not a repeat
  dontRepeat = newRandomNumber;
  return newRandomNumber;
}



function getRandomQuote() { //Reterns a random object (quote) from array.
  randomNumber[0] = getRandomNumber(quotes.length, randomNumber[0]);//gets random number based off lenght of quote array and previous random number (so it doesnt repeat)
  return quotes[randomNumber[0]];
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
  if (randomQuote.hasOwnProperty('citation')) { //Test to see if citation is present
    html += '<span class="citation">' + randomQuote.citation + '</span>';
  }
  if (randomQuote.hasOwnProperty('year')) { //Test to see if year is present
    html += '<span class="year">' + randomQuote.year + '</span>';
  }
  html += '</p>';
  document.getElementById('quote-box').innerHTML = html; //Writes new html to the page
  console.log(html); //Shows history of quotes in console.
}

function moveBar() { //Creates the moving loading bar effect
    var barLocation = document.getElementById('loading-bar'); //Locates loading bar, stores in variable
    var id = setInterval(expand, (loadingTime/1000)); //Sets interval timer, stores interval ID in variable. Calls expand function 1000x during the course of the loadTime interval.
    var barWidth = 0; //Resets bar width size to zero each time function is called
    function expand() { //Adds to bar width until bar 100%
        if (barWidth >= 100) { //Test to see if bar is equal or greater than 100%.
            clearInterval(id); //If true, clears interval timer which stops running the expand function
        } else { //If bar less than 100%, this code runs
            barWidth += .1; //Bar width expand rate, stored in variable. expand function is called 1000x during the loadingTime and expands .1% each time. This creates a smoother bar.
            barLocation.style.width = barWidth + '%'; //Edits the width styling of the varible barLocation
        }
    }
}

function newInterval() { //ends previous interval timer and begins a new one
  clearInterval(intervalID); //ends previous interval
  intervalID = window.setInterval(click, loadingTime);
}

function changeColor () {
  var color = getColor();
  document.body.style.backgroundColor = color;
}

function getColor() { //returns an object from the colorPalette varible
  randomNumber[1] = getRandomNumber(colorPalette.length, randomNumber[1]);//gets random number based off lenght of the color palette and previous random number (so it doesnt repeat)
  console.log('color index number: ' + randomNumber[1]);
  return colorPalette[randomNumber[1]];
}

function click () { //Function that prints the new quote and starts loading bar simultaneously
  newInterval();
  printQuote();
  moveBar();
  changeColor();
}
