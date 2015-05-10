//prevents scrolling
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

var obj = document.getElementById('time');
var windowHeight = window.innerHeight;
var elementHeight = obj.offsetHeight;
var freedom = windowHeight - elementHeight;
var elementOffset,currentProgress,endTime;
var maxMinutes = 10;
var maxCountdownDuration = (60*1000) * maxMinutes;
var digits = new Array(0,0,0,0);


function countdown (startTime) {
  endTime = startTime + countdownDuration;

  runIt = window.setInterval(function(){
    currenTime = new Date().getTime();
    remainingTime = endTime - currenTime;
    if (0>=remainingTime){
      remainingTime = 0;
      window.clearInterval(runIt);
    }
    elementOffset = (windowHeight - elementHeight)/2;
    //elementOffset = freedom - ((remainingTime / countdownDuration)*freedom);
    updateElement(elementOffset,remainingTime);
  }, 10);
  
}


function updateElement (elementOffset,remainingTime) {
// Place element and label it properly

  digits[0] = Math.floor((remainingTime / (1000*60*60)) % 24); //hours
  digits[1] = Math.floor((remainingTime / (1000*60)) % 60); //minutes
  digits[2] = Math.floor((remainingTime / 1000) % 60); //seconds
  digits[3] = Math.floor(remainingTime / (10)); //hours

  // force numbers to appear as two digits
  for (var i = digits.length - 1; i >= 0; i--) {
    digits[i] = ('0' + digits[i]).slice(-2);
  };

  obj.style.top = (elementOffset + (elementHeight/2)) + 'px';
  obj.innerHTML = digits[1] + ':' + digits[2] + '.' + digits[3];
}

function makeReasonable () {
//checks element postion to ensure it's completely in the viewport
  if(0 > elementOffset){
      elementOffset = 0;  
    } else if ((elementOffset + elementHeight) > windowHeight){
      elementOffset = windowHeight - elementHeight;
    }
}

function setCountdownDuration () {
  countdownDuration = maxCountdownDuration * (1 - elementOffset / freedom);
}






obj.addEventListener('touchmove', function(event) {
// If there's exactly one finger inside this element, set timer length and update element
  if (event.targetTouches.length == 1) {
  
    elementOffset = (event.targetTouches[0].pageY - (elementHeight/2));
    makeReasonable();
    setCountdownDuration();
  }

  updateElement(elementOffset,countdownDuration);
}, false);


obj.addEventListener('touchend', function(event) {
  var startTime = new Date().getTime();
  countdown(startTime);
}, false);