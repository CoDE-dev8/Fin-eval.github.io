
window.onload = (function () {

    // -------------------------- Start of Common Functions ---------------------------

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

    function showElement(elementID) {
        x = document.getElementById(elementID);
        if (x.style.display === "none") {
            x.style.display = "block";
        }
    }

    function hideElement(elementID) {
        x = document.getElementById(elementID);
        if (x.style.display === "block") {
            x.style.display = "none";
        }
    }

    function showOrHideElement(elementID) {
        x = document.getElementById(elementID);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    function reduceOpacityElement(elementID) {
        x = document.getElementById(elementID);
        x.style.opacity = "0.4";
    }

    function removeOpacityElement(elementID) {
        x = document.getElementById(elementID);
        x.style.opacity = "1";
    }

    // Removing of elements
    function removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        var lastEle = elements.length;
        for (var i = (elements.length - 1); i >= 5; i--) {
            elements[i].parentNode.removeChild(elements[i])
        }
    }

    // ----------------------------- End of Common Functions -------------------------------


    // ------------------------------- Start of NPV Function ----------------------------------
    // Net Present Value (NPV)
    document.getElementById("remove_year_npv").addEventListener("click", function () {
        // Removes an element from the document
        removeElementsByClass("form-group custom-input-year npv");
    });

    // NPV Adding more years
    document.getElementById("add_year_npv").addEventListener("click", add_npv_year);

    function add_npv_year() {
        var elements_npv = document.getElementsByClassName("form-group custom-input-year npv");
        var count = elements_npv.length + 1;

        //first div
        var BnewDivCol = document.createElement("div");
        BnewDivCol.setAttribute("class", "form-group custom-input-year npv");
        BnewDivCol.setAttribute("id", "custom-input-year");
        //second div
        var BnewDivForm = document.createElement("div");
        BnewDivForm.setAttribute("class", "input-group row col-lg-8 mx-auto");
        BnewDivCol.appendChild(BnewDivForm);
        //third div
        var BnewDivForm1 = document.createElement("div");
        BnewDivForm1.setAttribute("class", "input-group-prepend");
        BnewDivForm.appendChild(BnewDivForm1);
        //fourth span
        var BnewDivSpan = document.createElement("span");
        BnewDivSpan.setAttribute("class", "input-group-text");
        BnewDivSpan.innerHTML = "Year " + count + ": $ "
        BnewDivForm.appendChild(BnewDivSpan);

        //input
        var BnewInput = document.createElement("input");
        BnewInput.setAttribute("type", "text");
        BnewInput.setAttribute("class", "form-control");
        BnewInput.setAttribute("onkeypress", "javascript:return isNumber(event)");
        BnewDivForm.append(BnewInput);

        //fifth div
        var BnewDivForm2 = document.createElement("div");
        BnewDivForm2.setAttribute("class", "input-group-append");
        BnewDivForm1.append(BnewDivForm2);

        var Belement = document.getElementById("addRowsHereNpv");
        Belement.appendChild(BnewDivCol);

    };

    // Net Present Value (NPV)
    document.getElementById("calculate_npv").addEventListener("click", function () {
        var elements_npv = document.getElementsByClassName('form-control npv');
        var npv = 0;
        var initialInvestment = elements_npv[0].value;
        var discountRate = elements_npv[1].value;

        for (var i = 2, y = 0; i <= (elements_npv.length - 1); i++ , y++) {
            if (elements_npv[i].value == '') {
                return alert("No empty fields allowed! Put 0 if you want the field to be blank.");
            }
            npv += (elements_npv[i].value / Math.pow(discountRate / 100 + 1, y + 1));
        }

        // Minus initial investment
        npv -= initialInvestment;
        var s = roundTo(npv, 2);
        document.getElementById('printAnswersHereNpv').innerHTML = "Net Present Value is: " + s;

    });

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
    // ----------------------------------- End of NPV Function --------------------------------


    // ----------------------------------- Start of IRR Function --------------------------------
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
            if (elements_irr[i].value == "") {
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
    // ----------------------------------- End of IRR Function --------------------------------

    // ----------------------------------- Start of BCR Function -------------------------------
    // Benefit-Cost Ratio (Profitability Index)
    document.getElementById("calculate_bcr").addEventListener("click", function () {
        var elements_bcr = document.getElementsByClassName('form-control text-center bcr');
        var bcr = 0;
        for (var i = 0; i <= (elements_bcr.length - 1); i++) {
            if (elements_bcr[i].value == '') {
                return alert("No empty fields allowed!");
            }
            bcr = (elements_bcr[0].value / elements_bcr[1].value);
        }
        // Minus initial investment
        var s = roundTo(bcr, 2);
        document.getElementById('printAnswersHere').innerHTML = "Profitability Index is: " + s;
    });
    // ----------------------------------- End of BCR Function ---------------------------------


    // ----------------------------------- Start of PBP Function --------------------------------
    // Payback Period (Equal Cash Flow)
    document.getElementById("calculate_ecf").addEventListener("click", function () {
        var elements_ecf = document.getElementsByClassName('form-control text-center ecf');
        var ecf = 0;
        for (var i = 0; i <= (elements_ecf.length - 1); i++) {
            if (elements_ecf[i].value == '') {
                return alert("No empty fields allowed!");
            }
            ecf = (elements_ecf[0].value / elements_ecf[1].value);
        }
        // Minus initial investment
        var s = roundTo(ecf, 2);
        document.getElementById('printAnswersHereECF').innerHTML = "Payback Period is: " + s;
    });

    // Payback Period (Non-Equal Cash Flow)
    document.getElementById("calculate_necf").addEventListener("click", function () {
        var elements_necf = document.getElementsByClassName('form-control text-center necf');
        var necf = 0;
        for (var i = 0; i <= (elements_necf.length - 1); i++) {
            if (elements_necf[i].value == '') {
                return alert("No empty fields allowed!");
            }
            var temp = elements_necf[0].value / elements_necf[2].value;
            var temp2 = parseInt(elements_necf[1].value, 10);
            necf = (temp2 + temp);
        }
        // Minus initial investment
        var ss = roundTo(necf, 2);
        document.getElementById('printAnswersHereNECF').innerHTML = "Payback Period is: " + ss;
    });
    // ----------------------------------- End of PBP Function ----------------------------------


    // ----------------------------------- Start of ARR Function --------------------------------
    // ARR (TOP)
    document.getElementById("calculate_top").addEventListener("click", function () {
        var elements_arr_top = document.getElementsByClassName('form-control text-center top');
        var top = 0;
        for (var i = 0; i <= (elements_arr_top.length - 1); i++) {
            if (elements_arr_top[i].value == '') {
                console.log(elements_arr_top[i].value);
                return alert("No empty fields allowed!");
            }
            top = (elements_arr_top[0].value / elements_arr_top[1].value);
        }
        // Minus initial investment
        var s = roundTo(top, 2);
        document.getElementById('printAnswersHereTOP').innerHTML = "Payback Period is: " + s + "%";
    });

    // ARR (BOTTOM)
    document.getElementById("calculate_btm").addEventListener("click", function () {
        var elements_arr_btm = document.getElementsByClassName('form-control text-center btm');
        var btm = 0;
        for (var i = 0; i <= (elements_arr_btm.length - 1); i++) {
            if (elements_arr_btm[i].value == '') {
                return alert("No empty fields allowed!");
            }
            btm = (elements_arr_btm[0].value / elements_arr_btm[1].value);
        }
        // Minus initial investment
        var ss = roundTo(btm, 2);
        document.getElementById('printAnswersHereBTM').innerHTML = "Payback Period is: " + ss + "%";
    });
    // // ----------------------------------- End of ARR Function ----------------------------------

    // // ----------------------------------- Show/Hide Functions ----------------------------------

    $('#show-dtcs-solution-partA').on('click', function () {
        showElement("dtcs_solution_partA");
    });

    $('#hide-dtcs-solution-partA').on('click', function () {
        hideElement("dtcs_solution_partA");
    });

    $('#show-lmcs-overall-solution').on('click', function () {
        showElement("lmcs_overall_solution");
    });

    $('#hide-lmcs-overall-solution').on('click', function () {
        hideElement("lmcs_overall_solution");
    });

    $('#show_solution_dtcs_partB_EasyTech').on('click', function () {
        showOrHideElement("solution_dtcs_partB_EasyTech");
    });

    $('#show_solution_dtcs_partB_EasyTechX').on('click', function () {
        showOrHideElement("solution_dtcs_partB_EasyTechX");
    });

    $('#show_solution_npv').on('click', function () {
        showElement("solution_dtcs_npv");
    });

    $('#hide_solution_npv').on('click', function () {
        hideElement("solution_dtcs_npv");
    });

    $('#show_solution_irr').on('click', function () {
        showElement("solution_dtcs_irr");
    });

    $('#hide_solution_irr').on('click', function () {
        hideElement("solution_dtcs_irr");
    });

    $('#show_solution_pi').on('click', function () {
        showElement("solution_dtcs_pi");
    });

    $('#hide_solution_pi').on('click', function () {
        hideElement("solution_dtcs_pi");
    });

    $('#show_solution_pp').on('click', function () {
        showElement("solution_dtcs_pp");
    });

    $('#hide_solution_pp').on('click', function () {
        hideElement("solution_dtcs_pp");
    });

    $('#show_solution_arr').on('click', function () {
        showElement("solution_dtcs_arr");
    });

    $('#hide_solution_arr').on('click', function () {
        hideElement("solution_dtcs_arr");
    });

    // ----------------------------- End of Show/Hide Functions ----------------------------------

    $('#nav-icon-npv').on('click', function () {
        removeOpacityElement('nav-icon-npv');
        removeOpacityElement('nav-icon-irr');
        removeOpacityElement('nav-icon-pi');
        removeOpacityElement('nav-icon-arr');
        removeOpacityElement('nav-icon-pp');


        reduceOpacityElement('nav-icon-irr');
        reduceOpacityElement('nav-icon-pi');
        reduceOpacityElement('nav-icon-arr');
        reduceOpacityElement('nav-icon-pp');

    });
    $('#nav-icon-irr').on('click', function () {
        removeOpacityElement('nav-icon-npv');
        removeOpacityElement('nav-icon-irr');
        removeOpacityElement('nav-icon-pi');
        removeOpacityElement('nav-icon-arr');
        removeOpacityElement('nav-icon-pp');

        reduceOpacityElement('nav-icon-npv');
        reduceOpacityElement('nav-icon-pi');
        reduceOpacityElement('nav-icon-arr');
        reduceOpacityElement('nav-icon-pp');

    });
    $('#nav-icon-pi').on('click', function () {
        removeOpacityElement('nav-icon-npv');
        removeOpacityElement('nav-icon-irr');
        removeOpacityElement('nav-icon-pi');
        removeOpacityElement('nav-icon-arr');
        removeOpacityElement('nav-icon-pp');

        reduceOpacityElement('nav-icon-irr');
        reduceOpacityElement('nav-icon-npv');
        reduceOpacityElement('nav-icon-arr');
        reduceOpacityElement('nav-icon-pp');

    });
    $('#nav-icon-arr').on('click', function () {
        removeOpacityElement('nav-icon-npv');
        removeOpacityElement('nav-icon-irr');
        removeOpacityElement('nav-icon-pi');
        removeOpacityElement('nav-icon-arr');
        removeOpacityElement('nav-icon-pp');

        reduceOpacityElement('nav-icon-irr');
        reduceOpacityElement('nav-icon-pi');
        reduceOpacityElement('nav-icon-npv');
        reduceOpacityElement('nav-icon-pp');

    });
    $('#nav-icon-pp').on('click', function () {
        removeOpacityElement('nav-icon-npv');
        removeOpacityElement('nav-icon-irr');
        removeOpacityElement('nav-icon-pi');
        removeOpacityElement('nav-icon-arr');
        removeOpacityElement('nav-icon-pp');

        reduceOpacityElement('nav-icon-irr');
        reduceOpacityElement('nav-icon-pi');
        reduceOpacityElement('nav-icon-arr');
        reduceOpacityElement('nav-icon-npv');

    });
});
