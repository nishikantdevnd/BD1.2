const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
// return name
app.get('/shout', (req, res) => {
  let name = req.query.name;
  let upperCasename = name.toUpperCase();
  res.send(upperCasename);
});
// return full name
app.get('/fullname', (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let fullName = firstName +' '+ lastName
  res.send(fullName);
});

// concenate month and year

app.get('/date', (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let Date = month +', '+ year
  res.send(Date);
});

// greeting Message

app.get('/greet', (req, res) => {
  let name = req.query.name;
  let greetingMessage = "Namaste, "+ name + "!" ;// here single quotes will not work
  res.send(greetingMessage);
});
// formatted address --> /address?street=123+Main+St&city=Springfield&state=IL (here after 123 "+" will create space)

app.get('/address', (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let formattedAddress = street + ", " + city + ", " + state
  res.send(formattedAddress);
});
// return formatted email
app.get('/email', (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let formattedEmail = username +'@'+ domain
  res.send(formattedEmail);
});
// FUNCTION 
/* Return welocome message */
function getWelocmeMessage () {
  return "Welcome to our service!"
}
//const getWelcomeMessage = () => "Welcome to our service!"; (arrow function)

app.get('/welcome', (req,res)=>{
  res.send(getWelocmeMessage());
})
/* Return greeting message */
function greetingsMessage (username) {
  return "hello, " + username + "!"
}
app.get('/greets', (req, res) => {
let username = req.query.username;
res.send(greetingsMessage(username)); // pass the parameter then function will get
})

/* check password strength */
function  passwordStrength (password) {
  if (password.length>15) {
    return "password is strong"
  } else {
    return "password is weak"

  }
}
app.get('/password', (req, res) => {
let password = req.query.password;
res.send(passwordStrength(password)); // pass the parameter then function will get
})
/* return sumof two number */
function calculateSum(num1, num2) {

  let sum = num1 + num2; 
  return sum.toString(); // convert number into string
  }
  
  app.get("/sum", (req, res) => { 
    let num1 = parseFloat(req.query.num1); // convert string into number 
    let num2 = parseFloat(req.query.num2); 
    res.send(calculateSum(num1, num2)); 
  });
/* Check subscriptionStatus*/
function subscriptionStatus(Username, Status) {

 if (Status === "true") {
  return Username  + "  is suscribed";
 } else {
  return Username  + "  is not suscribed";

 } 
}

app.get("/subscription-status", (req, res) => { 
    let Username = req.query.Username; // convert string into number 
    let Status = req.query.Status; 
    res.send(subscriptionStatus(Username, Status)); 
  });
/* calcutate price after discount */

function calculateDiscountedPrice(price, discount) {
  let finalPrice = price - (price * discount) / 100;
  return finalPrice.toString();
}

app.get("/discounted-price", (req, res) => {  // <- Arrow function syntax
  let price = parseFloat(req.query.price); 
  let discount = parseFloat(req.query.discount);

  if (isNaN(price) || isNaN(discount)) {
    return res.status(400).send('Invalid price or discount.');
  }
  
  res.send(calculateDiscountedPrice(price, discount)); 
});

/* generate personalized greeting */


function getGreeting(age, gender, name) {
  return `Hello, ${name}! You are a ${age} year old ${gender}.`;
}

app.get("/personalized-greeting", (req, res) => {
  let age = req.query.age;
  let gender = req.query.gender;
  let name = req.query.name;

  if (!age || !gender || !name) {
    return res.status(400).send('Please provide age, gender, and name as query parameters.');
  }

  res.send(getGreeting(age, gender, name));
});
/* calcualte final price after applying discount and tax*/

function calculateFinalPrice(price, discount, tax) {
  // Fix: Add the missing closing parenthesis
  let discountedPrice = price - (price * (discount / 100));
  
  let finalPrice = discountedPrice + (discountedPrice * (tax / 100));
  
  return finalPrice.toString(); // Returning the final price as a string
  //return finalPrice.toFixed(2); This will return the price as a string with two digits after the decimal point.


}

app.get("/final-price", (req, res) => {
  // Parsing query parameters to numbers
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  
  // Error handling if any of the parameters are missing or invalid
  if (isNaN(price) || isNaN(discount) || isNaN(tax)) {
    return res.status(400).send('Please provide valid price, discount, and tax parameters.');
  }
  
  // Sending the calculated final price
  res.send(calculateFinalPrice(price, discount, tax)); // we can apply .toSring(0) here also
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
