Quiz App Assignment
James Scherer / David Bolin

Correct answers: 3, 1, 2, 4, 2


Q1. What is the effect of this if statement:
    if ((x % 3 === 0) !== (x % 5 === 0)) {
      doSomething();
    }

A1.1. The statement causes an error
A1.2. doSomething runs if x is divisible by 3 or 5
A1.3. doSomething runs if x is divisible by 3 or 5, but not both 
A1.4. doSomething runs if x is divisible by both 3 and 5 


Q2. What is the effect of this function:
  function magic(x) {
    if (x === 1) {
      return 1;
    }
    return x * magic(x - 1);
  }

A2.1 This returns x!, namely 1 * 2 * 3... * x
A2.2 This causes a reference error since magic is originally undefined
A2.3 This returns either 1 or undefined
A2.4 This returns NaN


Q3. What does this function return? 
  function makeSomething() {
    let a = 0;
    return function () {
      a+= 1;
      return a;
    }
  }

A3.1. Undefined
A3.2. A new function that counts the number of times it has been called
A3.3. This causes an error
A3.4. 1

Q4. How does this expression evaluate:
  2 + 5 * 5 - 2 / 2

A4.1. 16.5
A4.2. 34
A4.3. 4.666...
A4.4. 26

Q5. What does this function do:
  function zzz(x) {
    return x.split('e').join('i');
  }
A5.1. This takes a string x and adds the letter 'i' after each occurrence of 'e'
A5.2. This takes a string x and replaces each letter 'e' with 'i'
A5.3. This takes a number x, divides by e and multiplies by i
A5.4. This causes a syntax error