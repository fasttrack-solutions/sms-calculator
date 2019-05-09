const SMSCalculator = {
  // Encoding
  encoding: {
    UTF16: [70, 64, 67],
    GSM_7BIT: [160, 146, 153],
    GSM_7BIT_EX: [160, 146, 153],
  },
  
  // Charset
  charset: {
    gsmEscaped: '\\^{}\\\\\\[~\\]|€',
    gsm: '@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà',
  },

  // Regular Expression
  regex: function() {
    return {
      gsm: RegExp(`^[${this.charset.gsm}]*$`),
      gsmEscaped: RegExp(`^[\\${this.charset.gsmEscaped}]*$`),
      gsmFull: RegExp(`^[${this.charset.gsm}${this.charset.gsmEscaped}]*$`),
    };
  },
  
  // Method
  detectEncoding: function(text) {
    if (text.match(this.regex().gsm)) {
      return this.encoding.GSM_7BIT;
    } else if (text.match(this.regex().gsmFull)) {
      return this.encoding.GSM_7BIT_EX;
    } else {
      return this.encoding.UTF16;
    }
  },
  getEscapedCharCount: function(text) {
    return [...text].reduce((acc, char) => acc + (char.match(this.regex().gsmEscaped) ? 1 : 0), 0);
  },
  getPartData: function(totalLength, encoding) {
    let maxCharCount = encoding[2];
    let numberOfSMS = Math.ceil(totalLength / maxCharCount);
    let remaining = maxCharCount - (totalLength - (encoding[0] + encoding[1] + (encoding[2] * (numberOfSMS - 3))));

    if (totalLength <= encoding[0]) {
      maxCharCount = encoding[0];
      numberOfSMS = 1;
      remaining = maxCharCount - totalLength;
    } else if (totalLength > encoding[0] && totalLength <= (encoding[0] + encoding[1])) {
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
  getCount: function(text) {
    let length = text.length;
    const encoding = this.detectEncoding(text);
    
    if (encoding === this.encoding.GSM_7BIT_EX) {
      length += this.getEscapedCharCount(text);
    }

    return this.getPartData(length, encoding);
  },
};
