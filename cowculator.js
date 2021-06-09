//global variables


//Initialise
window.onload = function () {

    resizeTweak ();
    window.addEventListener("resize", resizeTweak);
    
    var tabs = document.querySelectorAll(".app-tab");
    tabs.forEach(element => {
        element.addEventListener("click",switchTab)
    });

    var inputs = document.querySelectorAll(".app-form-input");
    inputs.forEach(element => {
        element.setAttribute("step", "any");
        element.addEventListener("change", hideResults);
    });

    var pickers = document.querySelectorAll(".app-form-unit-selector");
    pickers.forEach(element => {
        element.addEventListener("change",hideResults);
    });

    var Cowculatorsubmit = document.getElementById("app-Cowculator-form");
    Cowculatorsubmit.addEventListener("submit", cowculate);

    var Cupsizesubmit = document.getElementById("app-Cupsize-form");
    Cupsizesubmit.addEventListener("submit", calculateCupsize);

    var Sprosizesubmit = document.getElementById("app-Sprosize-form");
    Sprosizesubmit.addEventListener("submit", calculateSprosize);

    
}

// Tab switchers

function switchTab (event) {
    if (!this.classList.contains("app-current-tab")) {
        var alltabs = document.querySelectorAll(".app-tab");
        alltabs.forEach(element => {
            element.classList.remove("app-current-tab");
            element.classList.add("app-alt-tab");
        })
 
        this.classList.add("app-current-tab");
        this.classList.remove("app-alt-tab");

        var tabs = document.querySelectorAll(".app-form");
        tabs.forEach(element => {
            element.classList.add("app-hidden-form");
        })

        let thisform;

        switch (this.id) {
            case "app-Cowculator-tab":
                thisform = document.getElementById("app-Cowculator-form");
                thisform.classList.remove("app-hidden-form");
                break;
            case "app-Cupsize-tab":
                thisform = document.getElementById("app-Cupsize-form");
                thisform.classList.remove("app-hidden-form");
                break;

                case "app-Sprosize-tab":
                    thisform = document.getElementById("app-Sprosize-form");
                    thisform.classList.remove("app-hidden-form");
                    break;

        }
        
      }

    

    
      event.preventDefault();
      hideResults();
}

function hideResults() {
    document.querySelectorAll(".Output").forEach(element => {
        element.classList.add("app-hidden-results");
    });
    checkError();

}

function showResults() {
    document.querySelectorAll(".Output").forEach(element => {
        element.classList.remove("app-hidden-results");
    });

}


function cowculate() {
    var coffeeweight = Number(document.getElementById("coffeeweight").value);
    var TDS = Number(document.getElementById("TDS").value);
    var milkweight = Number(document.getElementById("milkweight").value);
    var fat = Number(document.getElementById("fat").value);
    var lactose = Number(document.getElementById("lactose").value);
    var protein = Number(document.getElementById("protein").value);
    var condensation = Number(document.getElementById("condensation").value);
    var aeration = Number(document.getElementById("aeration").value);


    //calculations
    var totalweight = coffeeweight + milkweight * (1 + (condensation/100));
    var coffee_g = coffeeweight * TDS / 100;
    var coffee_strength = 100 * coffee_g / totalweight;
    var fat_g = (milkweight * fat / 100) + coffeeweight * 0.0018;
    var fat_strength = 100 * fat_g / totalweight;
    var lactose_g = (milkweight * lactose / 100);
    var lactose_strength = 100 * lactose_g / totalweight;
    var protein_g = (milkweight * protein / 100) + coffeeweight * 0.0012;
    var protein_strength = 100 * protein_g / totalweight;
    var totalvolume_ml = coffeeweight + (milkweight * (1 + aeration/100));
    var totalvolume_oz = totalvolume_ml / 28.41;
    

    // Display results
    document.getElementById("coffeeweightoutput").innerHTML = Math.round(coffee_g * 100) / 100;
    document.getElementById("coffeestrengthoutput").innerHTML = Math.round(coffee_strength * 100) / 100;
    document.getElementById("fatweightoutput").innerHTML = Math.round(fat_g * 100) / 100;
    document.getElementById("fatstrengthoutput").innerHTML = Math.round(fat_strength * 100) / 100;  
    document.getElementById("lactoseweightoutput").innerHTML = Math.round(lactose_g * 100) / 100;
    document.getElementById("lactosestrengthoutput").innerHTML = Math.round(lactose_strength * 100) / 100;
    document.getElementById("proteinweightoutput").innerHTML = Math.round(protein_g * 100) / 100;
    document.getElementById("proteinstrengthoutput").innerHTML = Math.round(protein_strength * 100) / 100;
    document.getElementById("totalweightoutput").innerHTML = Math.round(totalweight * 100) / 100;
    document.getElementById("totalvolumeoutput").innerHTML = Math.round(totalvolume_ml * 100) / 100;
    document.getElementById("totalvolumeoutput_oz").innerHTML = Math.round(totalvolume_oz * 100) / 100;
    
    

    showResults();

}

function calculateCupsize() {
    var coffeeweight = Number(document.getElementById("cupsizecoffeeweight").value);
    var cupsizeTDS = Number(document.getElementById("cupsizeTDS").value);
    var aeration = Number(document.getElementById("cupsizeaeration").value);
    var desiredTDS = Number(document.getElementById("desiredTDS").value);
    var condensation = Number(document.getElementById("cupsizecondensation").value);


    //calculations
    
    var milkweight =  (coffeeweight * (cupsizeTDS / desiredTDS) - coffeeweight) / (1 + (condensation / 100));
    var cupvolume = (coffeeweight * (cupsizeTDS / desiredTDS) - coffeeweight) * (1 + (aeration/100)) + coffeeweight;
    var cupvolume_oz = cupvolume / 28.41;

    

    // Display results
    document.getElementById("milkweightoutput").innerHTML = Math.round(milkweight * 10) / 10;
    document.getElementById("cupvolumeoutput").innerHTML = Math.round(cupvolume * 10) / 10;
    document.getElementById("cupvolumeoutput_oz").innerHTML = Math.round(cupvolume_oz * 10) / 10;     

    showResults();

}

function calculateSprosize() {
    var sproTDS = Number(document.getElementById("sproTDS").value);
    var sprodesiredTDS = Number(document.getElementById("sprodesiredTDS").value);
    var sproaeration = 0.01 * Number(document.getElementById("sproaeration").value);
    var cupvolume = Number(document.getElementById("sprocupvolume").value);
    var sprocondensation = 0.01 * Number(document.getElementById("sprocondensation").value);


    //calculations
    
    var dilution = (sproTDS - sprodesiredTDS) / sproTDS;
    var volincrease = (sproaeration - sprocondensation) / (1 + sprocondensation);
    var aeffect = dilution * volincrease;
    var effectivevol = cupvolume / (1 + aeffect);
    var sprosize = (1 - dilution) * effectivevol;

    console.log ("dilution = " + dilution);
    console.log ("vol increase = " + volincrease);
    console.log ("aeration effect = " + aeffect);
    console.log ("effective vol = " + effectivevol);
    console.log ("final answer = " + sprosize);

    // Display results
    document.getElementById("sproweightoutput").innerHTML = Math.round(sprosize * 100) / 100;

    showResults();
}

// Error collection

function checkError() {
    var aeration = Number(document.getElementById("aeration").value);
    var condensation = Number(document.getElementById("condensation").value);

    var cupaeration = Number(document.getElementById("cupsizeaeration").value);
    var cupcondensation = Number(document.getElementById("cupsizecondensation").value);

    var sproaeration = Number(document.getElementById("sproaeration").value);
    var sprocondensation = Number(document.getElementById("sprocondensation").value);

    var cupsizeTDS = Number(document.getElementById("cupsizeTDS").value);
    var desiredTDS = Number(document.getElementById("desiredTDS").value);

    var sproTDS = Number(document.getElementById("sproTDS").value);
    var sprodesiredTDS = Number(document.getElementById("sprodesiredTDS").value);


    var cowsubmit = document.getElementById("cowculator-submit");
    var cupsubmit = document.getElementById("cupsize-cowculator-submit");
    var sprosubmit = document.getElementById("spro-cowculator-submit");

    if (aeration < condensation) {
        cowsubmit.value = "Aeration must be higher than condensation";
        cowsubmit.classList.add("app-input-error");
        return;
    } else {
        cowsubmit.value = "Calculate";
        cowsubmit.classList.remove("app-input-error");
    }

    if (cupaeration < cupcondensation) {
        cupsubmit.value = "Aeration must be higher than condensation";
        cupsubmit.classList.add("app-input-error");
    } else if (cupsizeTDS < desiredTDS) {
        cupsubmit.value = "Target strength must be lower than TDS";
        cupsubmit.classList.add("app-input-error");
    } else {
        cupsubmit.value = "Calculate";
        cupsubmit.classList.remove("app-input-error");
    }

    if (sproaeration < sprocondensation) {
        sprosubmit.value = "Aeration must be higher than condensation";
        sprosubmit.classList.add("app-input-error");
    } else if (sproTDS < sprodesiredTDS) {
        sprosubmit.value = "Target strength must be lower than TDS";
        sprosubmit.classList.add("app-input-error");
    } else {
        sprosubmit.value = "Calculate";
        sprosubmit.classList.remove("app-input-error");
    }



}

// Size tweak


function resizeTweak () {
    var container = document.getElementById("app-container")
    var cowculatorgrid = document.getElementById("cowculator-input-grid");
    var cupsizegrid = document.getElementById("cupsize-grid");
    var sprosizegrid = document.getElementById("sprosize-grid");
    
    if (container.clientWidth < 600) {

        container.classList.add("full-width");

     } else {

        container.classList.remove("full-width");


    }

    if (container.clientWidth < 400) {
        
        cowculatorgrid.classList.add("app-two-column-grid");
        cowculatorgrid.classList.remove("app-four-column-grid");

        cupsizegrid.classList.add("app-two-column-grid");
        cupsizegrid.classList.remove("app-four-column-grid");

        sprosizegrid.classList.add("app-two-column-grid");
        sprosizegrid.classList.remove("app-four-column-grid");

     } else {

        cowculatorgrid.classList.remove("app-two-column-grid");
        cowculatorgrid.classList.add("app-four-column-grid");

        cupsizegrid.classList.remove("app-two-column-grid");
        cupsizegrid.classList.add("app-four-column-grid");

        sprosizegrid.classList.remove("app-two-column-grid");
        sprosizegrid.classList.add("app-four-column-grid");


    }

}
