const btn = document.getElementById('generateBtn');
const passwordLengthTextbox = document.getElementById('textboxLength');
const numberCheckBox = document.getElementById('checkboxNumbers');
const symbolCheckBox = document.getElementById('checkboxSymbols');
const lowecaseCheckBox = document.getElementById('checkboxLowercase');
const uppercaseCheckBox = document.getElementById('checkboxUppercase');
let password = '';
let numbers = ['1','2','3','4','5','6','7','8','9','0'];
let symbols = ['@', '#', '$', '%', '&', '*', '!', '?', '^'];
let alphabet = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
let alphabetLower = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

function generatePassword() {
    let length = parseInt(passwordLengthTextbox.value);
    password = ''; // Her yeni şifre oluşturulmadan önce eski şifreyi sıfırla
    if (checkCheckboxes()) {
        let totalChecked = 0;
        if (uppercaseCheckBox.checked) totalChecked++;
        if (lowecaseCheckBox.checked) totalChecked++;
        if (numberCheckBox.checked) totalChecked++;
        if (symbolCheckBox.checked) totalChecked++;

        let remainingLength = length - totalChecked; // Minimum birer karakter için yer ayırdık
        if (uppercaseCheckBox.checked) generateRandomUppercases(1);
        if (lowecaseCheckBox.checked) generateRandomLowercases(1);
        if (numberCheckBox.checked) generateRandomNumbers(1);
        if (symbolCheckBox.checked) generateRandomSymbols(1);

        // Kalan karakterleri rastgele seç
        let allPossibleChars = '';
        if (uppercaseCheckBox.checked) allPossibleChars += alphabet.join('');
        if (lowecaseCheckBox.checked) allPossibleChars += alphabetLower.join('');
        if (numberCheckBox.checked) allPossibleChars += numbers.join('');
        if (symbolCheckBox.checked) allPossibleChars += symbols.join('');

        // Kalan karakterleri ekle
        for (let i = 0; i < remainingLength; i++) {
            let randomChar = allPossibleChars[Math.floor(Math.random() * allPossibleChars.length)];
            password += randomChar;
        }

        // Şifreyi karıştır
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        // Şifreyi ekrana yazdır
        const passText = document.getElementById('output');
        passText.textContent = password;
    }
}

function checkCheckboxes() {
    if (numberCheckBox.checked || symbolCheckBox.checked || uppercaseCheckBox.checked || lowecaseCheckBox.checked) {
        return true;
    } else {
        alert('Please Select A Password Attribute');
        return false;
    }
}

function generateRandomLowercases(count) {
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * alphabetLower.length);
        let randomCharacter = alphabetLower[randomIndex];
        password += randomCharacter;
    }
}

function generateRandomUppercases(count) {
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * alphabet.length);
        let randomCharacter = alphabet[randomIndex];
        password += randomCharacter;
    }
}

function generateRandomNumbers(count) {
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        let randomCharacter = numbers[randomIndex];
        password += randomCharacter;
    }
}

function generateRandomSymbols(count) {
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        let randomCharacter = symbols[randomIndex];
        password += randomCharacter;
    }
}

if (btn) {
    btn.addEventListener('click', generatePassword);
}
