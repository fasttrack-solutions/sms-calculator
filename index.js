"use strict";
export const SMSCalculator = {
  // Encoding
  encoding: {
    UTF16: [70, 64, 67],
    GSM_7BIT: [160, 146, 153],
    GSM_7BIT_EX: [160, 146, 153],
  },

  // Charset
  charset: {
    gsmEscaped: "\\^{}\\\\\\[~\\]|€",
    gsm: "@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà",
    nonLatin: /[\u0100-\u1FFF\u2000-\u2BFF\u2C00-\uD7FF\uE000-\uFFFF]/, // non-latin characters except emojis
  },

  // Regular Expression
  regex: function () {
    return {
      gsm: RegExp(`^[${this.charset.gsm}]*$`),
      gsmEscaped: RegExp(`^[\\${this.charset.gsmEscaped}]*$`),
      gsmFull: RegExp(`^[${this.charset.gsm}${this.charset.gsmEscaped}]*$`),
      nonLatin: RegExp(this.charset.nonLatin),
    };
  },

  // Method
  detectEncoding: function (text) {
    if (text.match(this.regex().gsm)) {
      return this.encoding.GSM_7BIT;
    } else if (text.match(this.regex().gsmFull)) {
      return this.encoding.GSM_7BIT_EX;
    } else {
      return this.encoding.UTF16;
    }
  },
  getEscapedCharCount: function (text) {
    return [...text].reduce(
      (acc, char) => acc + (char.match(this.regex().gsmEscaped) ? 1 : 0),
      0
    );
  },
  getNonLatinCharCount: function (text) {
    return [...text].reduce(
      (acc, char) => acc + (char.match(this.regex().nonLatin) ? 1 : 0),
      0
    );
  },
  getPartData: function (totalLength, encoding) {
    let maxCharCount = encoding[2];
    let numberOfSMS = Math.ceil(totalLength / maxCharCount);
    let remaining =
      maxCharCount -
      (totalLength -
        (encoding[0] + encoding[1] + encoding[2] * (numberOfSMS - 3)));

    if (totalLength <= encoding[0]) {
      maxCharCount = encoding[0];
      numberOfSMS = 1;
      remaining = maxCharCount - totalLength;
    } else if (
      totalLength > encoding[0] &&
      totalLength <= encoding[0] + encoding[1]
    ) {
      maxCharCount = encoding[1];
      numberOfSMS = 2;
      remaining = maxCharCount - (totalLength - encoding[0]);
    }

    return {
      maxCharCount,
      numberOfSMS,
      remaining,
      totalLength,
    };
  },
  getCount: function (text, enc = "") {
    let length = text.length;
    const encoding = this.encodingLookup(text, enc);
    if (encoding === this.encoding.GSM_7BIT_EX) {
      length += this.getEscapedCharCount(text);
    } else if (encoding === this.encoding.UTF16) {
      length += this.getNonLatinCharCount(text);
    }
    return this.getPartData(length, encoding);
  },
  encodingLookup(text, enc) {
    if (enc === "UCS2") return this.encoding.UTF16;
    return this.detectEncoding(text);
  },
};
