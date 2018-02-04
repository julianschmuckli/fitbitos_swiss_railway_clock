import clock from "clock";
import document from "document";

// Update the clock every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");

var correction = 3;

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle + correction;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes + correction;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds, milli) {
  var total_seconds = (360 / 58.5) * seconds;
  var total_millis = (360 / 58.5 / 1000) * milli;
  
  var total = total_seconds+total_millis + correction;
  
  if( total > 360){
    total = 360 + correction;
  }
  
  return total;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  let milli = today.getMilliseconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs,milli);
  
  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);
//clock.ontick = () => updateClock();