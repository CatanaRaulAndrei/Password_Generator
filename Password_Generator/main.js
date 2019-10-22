// DOM elem
const resultEl = document.getElementById('result');
const clipboardBtn = document.getElementById('clipboard');
const uppercaseEl = document.getElementById('uppercase');
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');

// Obj
const randomFunc = {
	upper : getRandomUpper,
	lower : getRandomLower,
	number : getRandomNumber,
	symbol : getRandomSymbol
};

// Random Functions
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,?.:-;";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Button Generate Password
generateBtn.addEventListener('click', () =>{
	const length = +lengthEl.value;
	const hasUpper = uppercaseEl.checked;
	const hasLower = lowercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePasswordFunc(hasUpper , hasLower, hasNumber, hasSymbol, length);
});

// generatePasswordFunc
function generatePasswordFunc(upper , lower, number, symbol, length){
	let genPassword = "";
	const typesCount = upper + lower + number + symbol;
	const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// length interval is [4,..,12]
    if (length < 4) {
	  alert("Your Password length must be between 4 and 12");
	  length = 0;
      window.location.reload();
    } else if (length > 12) {
	  alert("Your Password length must be between 4 and 12");
	  length = 0;
	  window.location.reload();
	}

	
	// if all boxes are unchecked	
	if(typesCount === 0){
		return "";
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type =>{
			const funcName = Object.keys(type)[0];
			genPassword += randomFunc[funcName]();
		});
	}
	return genPassword.slice(0, length);
}

// Button Clipboard
clipboardBtn.addEventListener('click', ()=>{
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	if(!password){
		return;
	}
		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		alert('Password copied to clipboard');
	
});


