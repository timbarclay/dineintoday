(function() {
  setupPage();
})();

function setupPage(){
  // A base line date that I know the deal started on
  var seedDate = new Date(2016, 11, 23);
  // The number of days the deal runs for after it starts
  var closeDayNumber = 6;
  // The number of days before it repeats - e.g. it's fortnightly
  var cycleLength = 14;
  var day = daysFromSeed(new Date(), seedDate, cycleLength);
  var itsOn = day <= closeDayNumber;
  var remaining;

  document.getElementsByClassName("yes-no")[0].innerHTML = itsOn ? "Yes" : "No";
  document.getElementsByClassName("more-info")[0].innerHTML = itsOn ?
    "Look at the <a href='http://www.marksandspencer.com/s/food-and-wine/dine-in'>menu</a>" :
    "I'm so sorry";

  if(itsOn){
    remaining = day === closeDayNumber ? "Hurry up, it ends today!" :
      "It ends in " + (closeDayNumber - day) + " days";
  } else {
    remaining = "It's on again in " + (cycleLength - day) + " days";
  }
  document.getElementsByClassName("remaining")[0].innerHTML = remaining;

  createFavicon(itsOn);
}

/**
 * With many hat tips to https://remysharp.com/2010/08/24/dynamic-favicons
 */
function createFavicon(itsOn){
  var canvas = document.createElement("canvas");
  var favicon = document.getElementById("favicon");
  var text = itsOn ? "Yes" : "No";
  var context;
  var x;

  if(!canvas.getContext)
    return;

  canvas.height = canvas.width = 16;
  x = canvas.width / 2;

  context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect (0, 0, 16, 16);
  
  context.font = "10px 'Calibri', 'Arial', sans-serif";
  context.fillStyle = "#000";
  context.textAlign = "center";
  context.fillText(text, x, 11);

  favicon.href = canvas.toDataURL("image/png");
}

/**
 * Find out what day of the two week cycle we're on, where 0 is the start of a
 * deal
 */
function daysFromSeed(date, seed, cycleLength){
  var diffInDays = millisToDays(date.getTime() - seed.getTime());
  return Math.floor(diffInDays % cycleLength);
}

function millisToDays(millis){
  return millis/1000/60/60/24;
}
