// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", click, false);

//Message for browser console
console.log('Below you will find a history of the random quotes');
// TODO: Move this to a side popup window

const randomNumber = {quoteNum: 0, colorNum: 0}; //used to store the random numbers. First random number used to generate quote, second for color.
const loadingTime = 10000;
const colorPalette = [ '#b55475', '#953735', '#dd7e0e', '#34ac8b', '#7153a1'];
let intervalID = window.setInterval(click, loadingTime); //Initial interval timer that calls click function, continues to run until user clicks button

const getRandomNumber = (maxNumber, dontRepeat) => { //Gets a random number between 0 and the parameter and returns the random number
  let newRandomNumber;
  do {
    newRandomNumber = Math.floor( Math.random() * maxNumber);
  } while ( dontRepeat === newRandomNumber ); //ensures the random number is not a repeat
  return newRandomNumber;
}

const getRandomQuote = () => quotes[randomNumber.quoteNum = getRandomNumber(quotes.length, randomNumber.quoteNum)];//gets and stores a quote from array based off the random number function, which gets random number based off length of quote array and previous random number (so it doesn’t repeat)

function printQuote() { //Prints random quote HTML.
  const randomQuote = getRandomQuote(); //stores random quote object in variable
  let categoryHTML = ''; //Places category text at beginning of html string.
  const loadingBarHTML = `<div id="loading-bar" class="loading-bar"></div>`;
  if (randomQuote.hasOwnProperty('category')) {
    categoryHTML = `<p class="category">${randomQuote.category}</p>`;
  }
  let html = `${categoryHTML}${loadingBarHTML}<p class="quote">${randomQuote.quote}</p>`; //Constructs html string with category, quote, and source, all with proper html tags.
  html += `<p class="source">${randomQuote.source}`;
  if (randomQuote.hasOwnProperty('citation')) { //Test to see if citation is present
    html += `<span class="citation">${randomQuote.citation}</span>`;
  }


  ////////////////////////////////////////////////////////////////////////////////


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
            barLocation.style.width = barWidth + '%'; //Edits the width styling of the variable barLocation
        }
    }
}

function newInterval() { //ends previous interval timer and begins a new one
  clearInterval(intervalID); //ends previous interval
  intervalID = window.setInterval(click, loadingTime);
}

function changeColor () { //Changes color of body background
  document.body.style.backgroundColor = getColor();
}

function getColor() { //returns an object from the colorPalette variable
  randomNumber.colorNum = getRandomNumber(colorPalette.length, randomNumber.colorNum);//gets random number based off length of the color palette and previous random number (so it doesn’t repeat)
  console.log('color index number: ' + randomNumber.colorNum);
  return colorPalette[randomNumber.colorNum];
}

function click () { //restarts interval timer, displays new quote, begins loading bar animation, and changes screen color, all simultaneously
  newInterval();
  printQuote();
  moveBar();
  changeColor();
}

moveBar(); //initial loading bar function to run when page initially loads


// TODO: Add random quotes from thrid party. One site, could research more: https://www.juniordevelopercentral.com/6-random-quote-apis/
