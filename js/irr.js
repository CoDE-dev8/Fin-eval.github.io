
window.onload = (function () {

    // Rounding of results to 2 decimal places
    function roundTo(n, digits) {
        var negative = false;
        if (digits === undefined) {
            digits = 0;
        }
        if (n < 0) {
            negative = true;
            n = n * -1;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        n = (Math.round(n) / multiplicator).toFixed(2);
        if (negative) {
            n = (n * -1).toFixed(2);
        }
        return n;
    }

    // Removing of elements
    function removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        var lastEle = elements.length;
        for (var i = (elements.length - 1); i >= 5; i--) {
            elements[i].parentNode.removeChild(elements[i])
        }
    }

    document.getElementById("remove_year_irr").addEventListener("click", function () {
        // Removes an element from the document
        removeElementsByClass("form-group custom-input-year irr");
    });

    // Adding more years
    document.getElementById("add_year_irr").addEventListener("click", add_irr_year);
    
    function add_irr_year() {
        var elements_irr = document.getElementsByClassName("form-group custom-input-year irr");
        var count = elements_irr.length + 1;

        //first div
        var newDivCol = document.createElement("div");
        newDivCol.setAttribute("class", "form-group custom-input-year irr");
        newDivCol.setAttribute("id", "custom-input-year");
        //second div
        var newDivForm = document.createElement("div");
        newDivForm.setAttribute("class", "input-group row col-lg-8 mx-auto");
        newDivCol.appendChild(newDivForm);
        //third div
        var newDivForm1 = document.createElement("div");
        newDivForm1.setAttribute("class", "input-group-prepend");
        newDivForm.appendChild(newDivForm1);
        //fourth span
        var newDivSpan = document.createElement("span");
        newDivSpan.setAttribute("class", "input-group-text");
        newDivSpan.innerHTML = "Year " + count + ": $ "
        newDivForm.appendChild(newDivSpan);

        //input
        var newInput = document.createElement("input");
        newInput.setAttribute("type", "text");
        newInput.setAttribute("class", "form-control irr");
        newInput.setAttribute("onkeypress", "javascript:return isNumber(event)");
        newDivForm.append(newInput);

        //fifth div
        var newDivForm2 = document.createElement("div");
        newDivForm2.setAttribute("class", "input-group-append");
        newDivForm1.append(newDivForm2);

        var element = document.getElementById("addRowsHereIrr");
        element.appendChild(newDivCol);


    };

    function IRR(values, guess) {
        // Calculates the resulting amount
        var irrResult = function (values, dates, rate) {
            var r = rate + 1;
            var result = values[0];
            for (var i = 1; i < values.length; i++) {
                result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
            }
            return result;
        }

        // Calculates the first derivation
        var irrResultDeriv = function (values, dates, rate) {
            var r = rate + 1;
            var result = 0;
            for (var i = 1; i < values.length; i++) {
                var frac = (dates[i] - dates[0]) / 365;
                result -= frac * values[i] / Math.pow(r, frac + 1);
            }
            return result;
        }

        // Initialize dates and check that values contains at least one positive value and one negative value
        var dates = [];
        var positive = false;
        var negative = false;
        for (var i = 0; i < values.length; i++) {
            dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
            if (values[i] > 0) positive = true;
            if (values[i] < 0) negative = true;
        }

        // Return error if values does not contain at least one positive value and one negative value
        if (!positive || !negative) return '#NUM!';

        // Initialize guess and resultRate
        var guess = (typeof guess === 'undefined') ? 0.1 : guess;
        var resultRate = guess;

        // Set maximum epsilon for end of iteration
        var epsMax = 1e-10;

        // Set maximum number of iterations
        var iterMax = 50;

        // Implement Newton's method
        var newRate, epsRate, resultValue;
        var iteration = 0;
        var contLoop = true;
        do {
            resultValue = irrResult(values, dates, resultRate);
            newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
            epsRate = Math.abs(newRate - resultRate);
            resultRate = newRate;
            contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
        } while (contLoop && (++iteration < iterMax));

        if (contLoop) return '#NUM!';

        // Return internal rate of return
        return resultRate;
    }

    // Internal Rate of Return (IRR)
    document.getElementById("calculate_irr").addEventListener("click", function () {
        var elements_irr = document.getElementsByClassName('form-control irr');
        var guessValue = document.getElementById('guess-optional irr').value;
        var userInput = [];
        for (var i = 0; i <= (elements_irr.length - 1); i++) {
            if (elements_irr[i].value == ''){
                return alert("No empty fields allowed! Put 0 if you want the field to be blank.");
            }
            else {
                userInput.push(elements_irr[i].value);
            }
        }
        // Pop out optional Guess value
        userInput.pop();
        // Set value if no user input
        if (guessValue == "") {
            guessValue = 0;
        }
        // Parse array into int for calculation
        var numbers = userInput.map(function (x) {
            return parseInt(x, 10);
        });
        var userGuessValue = parseInt(guessValue, 10);

        var s = IRR(numbers, userGuessValue) * 100;
        var answer = roundTo(s, 2);
        document.getElementById('printAnswersHereIrr').innerHTML = "Internal Rate of Return is: " + answer + "%";

    });

});
