SMS Calculator
=============================
Simple library to help calculate the number of SMS corresponding to a certain text content.


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
