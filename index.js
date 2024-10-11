"use strict";
export const SMSCalculator = {
  // GSM 7-bit character set
  charset: {
    gsm: "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà",
    gsmEscaped: "\\^{}\\\\\\[~\\]|€",
  },

  // Regular Expression
  regex: function () {
    return {
      gsm: RegExp(`^[${this.charset.gsm}]*$`), // Only GSM-7 characters
      gsmEscaped: RegExp(`[${this.charset.gsmEscaped}]`), // GSM-7 extended characters
    };
  },

  // Method to check if a message contains any non-GSM characters or special symbols
  getEncodingType: function (text) {
    for (let char of text) {
      // Check if any character is non-GSM (extended characters handled as GSM-7)
      if (
        !char.match(this.regex().gsm) &&
        !char.match(this.regex().gsmEscaped)
      ) {
        return "UCS-2"; // Switch to UCS-2 only if there are non-GSM characters
      }
    }
    return "GSM-7"; // All characters fit in GSM 7-bit (even extended ones)
  },

  // Method to calculate how many SMS messages are needed for the message
  getCount: function (text) {
    const encoding = this.getEncodingType(text);
    let totalLength = text.length;
    if (encoding === "UCS-2") {
      const maxCharCountSingle = 70; // 70 characters for a single UCS-2 SMS
      const maxCharCountMulti = 67; // 67 characters per SMS when split into multiple parts
      return this.calculateParts(
        totalLength,
        maxCharCountSingle,
        maxCharCountMulti,
        "UCS-2"
      );
    } else {
      // If GSM-7, calculate with escaped characters and 1 slot per character (except escaped ones)
      const escapedCharsCount = this.getEscapedCharCount(text);
      totalLength += escapedCharsCount;
      const maxCharCountSingle = 160; // 160 characters for a single GSM-7 SMS
      const maxCharCountMulti = 153; // 153 characters per SMS when split into multiple parts
      return this.calculateParts(
        totalLength,
        maxCharCountSingle,
        maxCharCountMulti,
        "GSM-7"
      );
    }
  },

  // Calculate the number of parts based on message length and encoding limits
  calculateParts: function (
    totalLength,
    maxCharCountSingle,
    maxCharCountMulti,
    encoding
  ) {
    if (totalLength <= maxCharCountSingle) {
      // Fits in a single SMS
      return {
        encoding,
        numberOfSMS: 1,
        totalLength,
        maxCharCount: maxCharCountSingle,
      };
    } else {
      // Needs to be split into multiple SMS parts
      const numberOfSMS = Math.ceil(totalLength / maxCharCountMulti);
      return {
        encoding,
        numberOfSMS,
        totalLength,
        maxCharCount: maxCharCountMulti,
      };
    }
  },

  // Calculate number of GSM 7-bit escaped characters (like € which uses 2 slots)
  getEscapedCharCount: function (text) {
    return [...text].reduce((acc, char) => {
      return acc + (char.match(this.regex().gsmEscaped) ? 1 : 0);
    }, 0);
  },
};
