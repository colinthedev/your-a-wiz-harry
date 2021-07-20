'use strict';
// Date
    let today = new Date();
    let month = today.toLocaleString('default', { month: 'short' }); // MONTH
    let date = month+' '+today.getDate()+', '+(today.getFullYear()); // Current date Mon, Day, Year
// Quiz vars
    let hidden = document.querySelectorAll('.hidden'); // Show hidden questions
    let introContainer = document.querySelectorAll('.intro');
    let resultsContainer = document.querySelectorAll('.results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        "What's your name ?", 
        "When's your birthday ?", 
        "I just have one last question before i can place you; <b>What animal do you gravitate towards ?</b>",
    ];

// Makes quiz
    function buildQuiz() {
        for (let i = 0; i < myQuestions.length; i++) {
            const questionContainer = document.querySelectorAll('.quiz');
                
            questionContainer[i].innerHTML = myQuestions[i];
        };
    };
    buildQuiz(); 

function getInput() {
    for (let j = 0; j < resultsContainer.length; j++) {
        const regExp = /[a-zA-Z]/g; // Regex to test if input contains letter or number but not empty
        let input = document.getElementById('input').value; // Response filed input
        let hideResponseWrap = document.querySelector('.responseWrapper'); // Hide after second question

        resultsContainer[j].innerHTML = input;

    // If input contains letter/num && != '' print input to DOM and show next Q from myQuestions array
        if(regExp.test(input)) {
            const calendarTitle = document.getElementById("birthday").firstElementChild;
            calendarTitle.innerHTML = "<b>When's your birthday ?</b>";

            resultsContainer[1].innerHTML = '';
            hidden[0].style.opacity = '1';
            hidden[1].style.opacity = '1';

        // Display question to DOM + hide input field 
            for (let k = 0; k < introContainer.length; k++) {
                // firstQuestion(); // Clear input func
                introContainer[2].innerHTML = `Hello <b>${input}</b> my name is Sorting-hat!<br>
                Since this is your first time meeting me, let's say my birthday is today, ${date}.<br>`;
                hideResponseWrap.style.opacity = '0';
            }
        }
        birthDate();
        return resultsContainer[2].innerHTML = '';
    }
};

// Set calendar max date to current date
    let calendarToday = new Date();
    let dd = calendarToday.getDate();
    let mm = calendarToday.getMonth()+1; 
    let yyyy = calendarToday.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        } 
        if (mm < 10) {
            mm = '0' + mm
        } 

    calendarToday = yyyy+'-'+mm+'-'+dd;
    document.getElementById("datefield").setAttribute("max", calendarToday);

// Get birthday
    function birthDate() {
        let submitBirthday = document.getElementById('birthdayBtn');
        
        submitBirthday.addEventListener('click', function() {
            let birthdayValue = document.querySelectorAll('.hydrated');
            let birth = birthdayValue[1];
            let value = birth.value;
 
            if (value === 'Enter your birthday') {
                return resultsContainer[2].innerHTML = `Select a birthday`;
            } else                 
                return resultsContainer[2].innerHTML = value, 
                hidden[2].style.opacity = '1', 
                submitBirthday.style.opacity = '0';
        });
    };
    birthDate();

// Get house 
    function selectedHouse() {
        const submitHouse = document.getElementById('houseBtn'); // Submit button
        let optionButtons = document.querySelectorAll('.houseOptions'); // House buttons
        let optionBtnArr = Array.from(optionButtons);

    // Add active class to selected button
        optionButtons.forEach(el => {
            el.addEventListener('click', function() {
                optionButtons.forEach(el => el.classList.remove('active'));
                el.classList.add('active');
            })
        })

        submitHouse.addEventListener('click', function() {
           for (let i = 0; i < optionBtnArr.length; i++) {
                return resultsContainer[3].innerHTML = `You've been placed in ${optionBtnArr[i].textContent}`, // Display result
                document.querySelector('.selectHouse').style.display = 'none'; // Hide container after submit
            }
        })
    };
    selectedHouse();

submitButton.addEventListener('click', getInput, false);