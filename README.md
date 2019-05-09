SMS Calculator
=============================
[![npm](https://img.shields.io/npm/v/@fasttrack-solutions/sms-calculator.svg)](https://www.npmjs.com/package/@fasttrack-solutions/sms-calculator)  
Simple library to help calculate the number of SMS corresponding to a certain text content.


Install
----------

```shell
npm i --save @fasttrack-solutions/sms-calculator
```


Usage
----------

```javascript
SMSCalculator.getCount('📱Some really cool SMS content 🔥')
```

This will return the following object:

```javascript
{
  maxCharCount: 70,
  numberOfSMS: 1,
  remaining: 34,
  totalLength: 36
}
```


Demo
----------
Check the live demo on [codepen.io](https://codepen.io/thedoctor46super/full/qGOYLg)
