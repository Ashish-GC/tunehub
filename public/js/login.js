const pages = document.querySelectorAll(".main");
const translateAmount = 100;
let translate = 0;
slide = (direction) => {
    direction === "next" ? translate -= translateAmount : translate += translateAmount;
    main.forEach(
        pages => (pages.style.transform = `translateX(${translate}%)`)
    );
}



// restrictions


const phoneNumberInput = document.getElementById('phone_number');
const ageInput = document.getElementById('age');


phoneNumberInput.addEventListener('blur', validatePhoneNumber);
ageInput.addEventListener('blur', validateAge);


function validatePhoneNumber() {
  const phoneNumber = phoneNumberInput.value;
  const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/ ; 
  if (!phoneNumberRegex.test(phoneNumber)) {
    alert('Please enter a valid indian mobile number.');
    phoneNumberInput.value = ''; 
  }
}

function validateAge() {
  const age = ageInput.value;
  if (isNaN(age) || age < 0 || age > 120) {
    alert('Please enter a valid age between 0 and 120.');
    ageInput.value = ''; 
  }
}

