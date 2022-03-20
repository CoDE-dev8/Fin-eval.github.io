
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

    // ARR (TOP)
    document.getElementById("calculate_top").addEventListener("click", function () {
        var elements = document.getElementsByClassName('form-control text-center top');
        var top = 0;
        for (var i = 0; i <= (elements.length - 1); i++) {
            if (elements[i].value == ''){
                return alert("No empty fields allowed!");
            }
            top = (elements[0].value / elements[1].value);
        }
        // Minus initial investment
        var s = roundTo(top, 2);
        console.log(s);
        document.getElementById('printAnswersHereTOP').innerHTML = "Payback Period is: " + s + "%";
    });

    // ARR (BOTTOM)
    document.getElementById("calculate_btm").addEventListener("click", function () {
        var elements = document.getElementsByClassName('form-control text-center btm');
        var btm = 0;
        for (var i = 0; i <= (elements.length - 1); i++) {
            if (elements[i].value == ''){
                return alert("No empty fields allowed!");
            }
            btm = (elements[0].value / elements[1].value);
        }
        // Minus initial investment
        var ss = roundTo(btm, 2);
        document.getElementById('printAnswersHereBTM').innerHTML = "Payback Period is: " + ss + "%";
    });
});
