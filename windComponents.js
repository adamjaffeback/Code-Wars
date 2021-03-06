function windComponents(rwy, windDirection, windSpeed) {
  var headOrTail = "Head";
  var htSpeed = 0;
  var cwSpeed = 0;
  var lrCW = 'right';
  var difference = 0;

  // remove ending letter from runway
  // idealy, rwy should always have two numbers, single digits like 02C
  rwy = rwy.match(/\d{1,2}/)[0];
  // convert runway to degrees
  rwy = +rwy * 10;

  difference = rwy - windDirection;

  // calculate head/tailwind
  htSpeed = Math.cos( Math.abs(difference) * (Math.PI / 180)  ) * windSpeed;
  htSpeed = Math.round( Math.abs(htSpeed) );

  // calculate crosswind
  cwSpeed = Math.sin( Math.abs(difference) * (Math.PI / 180)  ) * windSpeed;
  cwSpeed = Math.round( Math.abs(cwSpeed) );

  // place runway at 0 on compass
  if( (windDirection - rwy) < 0) {
    difference = 360 + (windDirection - rwy);
  } else {
    difference = windDirection - rwy;
  }

  // head or tail
  if( htSpeed === 0 ) {
    headOrTail = "Head";
  } else {
    if( difference > 270 || difference < 90 ) {
      headOrTail = "Head";
    } else {
      headOrTail = "Tail";
    }
  }
  // determine if left or right
  if( cwSpeed === 0 ) {
    lrCW = 'right';
  } else {
    if( difference < 180 ) {
      lrCW = 'right';
    } else {
      lrCW = 'left';
    }
  }

  // Format of output:
  // "(Head|Tail)wind N knots. Crosswind N knots from your (left|right)."

  return makeMessage(headOrTail, htSpeed, cwSpeed, lrCW);
};

function makeMessage(headOrTail, htSpeed, cwSpeed, lrCW) {
  var message = "";
  message += headOrTail + "wind " + htSpeed + " knots. Crosswind " + cwSpeed + " knots from your " + lrCW + "."
  return message;
};