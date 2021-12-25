import dayjs from "@/lib/dayjs";

export const randomElement = <T>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
};

export const randomElements = <T>(array: T[], length: number): T[] => {
  const randomArr: T[] = [];

  for (let i = 0; i < length; i++) {
    randomArr.push(randomElement(array));
  }

  return randomArr;
};

//https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
export function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
export function contrast(rgb1: number[], rgb2: number[]) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

export const isColorVisible = (
  textColor: string,
  backgroundColor: string = "#000000",
  ratio: number = 3.2
) => {
  const textColorRgb = hexToRgb(textColor);
  const backgroundColorRgb = hexToRgb(backgroundColor);

  return contrast(textColorRgb, backgroundColorRgb) >= ratio;
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseTime(seconds: string | number) {
  seconds = seconds.toString();
  let minutes = Math.floor(Number(seconds) / 60).toString();
  let hours = "";

  if (Number(minutes) > 59) {
    let hours = Math.floor(Number(minutes) / 60).toString();
    hours = Number(hours) >= 10 ? hours : `0${hours}`;
    minutes = (Number(minutes) - Number(hours) * 60).toString();
    minutes = Number(minutes) >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(Number(seconds) % 60).toString();
  seconds = Number(seconds) >= 10 ? seconds : "0" + seconds;

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

export function serialize(obj: any) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  const array: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize)
    array.push(arr.slice(i, i + chunkSize));

  return array;
};

export const includesArr = (text: string, array: any[]) => {
  return array.some((element) => text.includes(element));
};

export const getPagination = (page?: number, limit: number = 15) => {
  const from = page - 1 > 0 ? limit * (page - 1) + 1 : 0;
  const to = page - 1 > 0 ? from + limit : limit;

  return {
    from,
    to: to - 1,
  };
};

export const getSeason = () => {
  const month = dayjs().month();
  const year = dayjs().year();
  let season = "WINTER";

  if (3 <= month && month <= 5) {
    season = "SPRING";
  }

  if (6 <= month && month <= 8) {
    season = "SUMMER";
  }

  if (9 <= month && month <= 11) {
    season = "FALL";
  }

  return {
    season,
    year,
  };
};

// https://stackoverflow.com/questions/5457416/how-to-validate-numeric-values-which-may-contain-dots-or-commas
export const parseNumbersFromString = (text: string, fallbackNumber = null) => {
  const matches = text.match(/\d+([\.,][\d{1,2}])?/g);

  if (!matches) return [fallbackNumber];

  return matches.map(Number);
};

export const parseBetween = (str, start, end) => {
  const startIndex = str.indexOf(start) + start.length;
  const endIndex = str.indexOf(end);

  return str.substring(startIndex, endIndex);
};
