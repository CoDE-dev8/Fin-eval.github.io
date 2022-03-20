
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

    // Payback Period (Equal Cash Flow)
    document.getElementById("calculate_ecf").addEventListener("click", function () {
        var elements_ecf = document.getElementsByClassName('form-control text-center ecf');
        var ecf = 0;
        for (var i = 0; i <= (elements_ecf.length - 1); i++) {
			if (elements_ecf[i].value == ''){
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
			if (elements_necf[i].value == ''){
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
});
