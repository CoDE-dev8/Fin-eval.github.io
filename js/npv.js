
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

  document.getElementById("remove_year_npv").addEventListener("click", function () {
    // Removes an element from the document
    removeElementsByClass("form-group custom-input-year npv");
  });

  // Adding more years
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
        return alert("No empty fields allowed! Put 0 if you want it to be empty!");
      }
      npv += (elements_npv[i].value / Math.pow(discountRate / 100 + 1, y + 1));
    }

    // Minus initial investment
    npv -= initialInvestment;
    var s = roundTo(npv, 2);
    document.getElementById('printAnswersHereNpv').innerHTML = "Net Present Value is: " + s;

  });
});
