export const getMilliseconds = (h, min) => {
  return parseInt(h) * 60 * 60 * 1000 + parseInt(min) * 60 * 1000;
};

// Ako broj ima manje od 2 cifre, dodaj nulu
export const formatTime = (h, min) => {
  let hourStr = String(h).padStart(2, "0");
  let minStr = String(min).padStart(2, "0");
  return ` ${hourStr}:${minStr}`;
};

export const extractDigits = (timeString) => {
  const regex = /(\d+)h:(\d+)min/i; // case insensitive
  const match = timeString.match(regex); // niz match-eva
  if (match) {
    let hourLen = parseInt(match[1]);
    let minuteLen = parseInt(match[2]);
    return { hourLen, minuteLen };
  } else {
    return null;
  }
};
