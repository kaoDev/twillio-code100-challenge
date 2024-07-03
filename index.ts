const gsm7Charset = new Set([
  "@",
  "£",
  "$",
  "¥",
  "è",
  "é",
  "ù",
  "ì",
  "ò",
  "Ç",
  "\n",
  "Ø",
  "ø",
  "\r",
  "Å",
  "å",
  "\u0394",
  "_",
  "\u03a6",
  "\u0393",
  "\u039b",
  "\u03a9",
  "\u03a0",
  "\u03a8",
  "\u03a3",
  "\u0398",
  "\u039e",
  "Æ",
  "æ",
  "ß",
  "É",
  " ",
  "!",
  '"',
  "#",
  "¤",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "¡",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ä",
  "Ö",
  "Ñ",
  "Ü",
  "§",
  "¿",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ä",
  "ö",
  "ñ",
  "ü",
  "à",
]);

const extendedGsm7Charset = new Set([
  "\n",
  "^",
  "{",
  "}",
  "\\",
  "[",
  "~",
  "]",
  "|",
  "€",
]);

const possibleGsm7Chars = new Set([...gsm7Charset, ...extendedGsm7Charset]);

function analyzeMessage(message: string) {
  let isGsm7 = true;
  let gsm7CharCount = 0;

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (!possibleGsm7Chars.has(char)) {
      isGsm7 = false;
      break;
    } else {
      gsm7CharCount++;
      if (extendedGsm7Charset.has(char)) {
        gsm7CharCount++;
      }
    }
  }

  if (isGsm7) {
    return {
      text: message,
      encoding: "GSM-7",
      length: gsm7CharCount * 7,
    };
  }

  return {
    text: message,
    encoding: "UCS-2",
    length: Buffer.byteLength(message, "ucs-2") * 8,
  };
}

import dataset from "./dataset.json";

for (const entry of dataset.messages) {
  const result = analyzeMessage(entry.text);
  console.log(result);
}
