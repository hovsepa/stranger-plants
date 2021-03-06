let randomSunMin = Math.floor(Math.random() * 60) + 30;
let randomWaterMin = Math.floor(Math.random() * 50) + 20;

let plants = [{
    name: "Democorngon",
    sunMin: randomSunMin,
    sunMax: randomSunMin + Math.floor(Math.random() * 15) + 5,
    soilType: "Sandy",
    waterMax: randomWaterMin + Math.floor(Math.random() * 15) + 5,
    waterMin: randomWaterMin,
    sick: false,
    img: "./assets/corn.svg"
}];

let current_plant;
let counter = 0;
let hint = "Click to get started!";
let waterHint = "";
let sunHint = "";

let $current_sun = $("#sun-number");
let $current_water = $("#water-number");
let $current_soil = $('#soil-type input:radio:checked').val();

// Load data
$(document).ready(() => {
    resetGame();
});

// Click handlers
document.getElementById("sun-number").oninput = function () {
    $("#sun-level").text(this.value);
    hintFunction("sun");
    winChecker();
}
document.getElementById("water-number").oninput = function () {
    $("#water-level").text(this.value);
    hintFunction("water");
    winChecker();
}

$('#soil-type input').on('change', () => {
    winChecker();
});

$("#btn-hint").click(() => {
    alert("HINT: " + hint)
});

// Logic
const resetGame = () => {
    let randomIndex = Math.floor(Math.random() * plants.length) + 0;
    counter = 0;
    hint = "Click to get started!";
    $("#plant-name").text(plants[randomIndex].name);
    current_plant = plants[randomIndex];
    $("#sun-level").text($("#sun-number").val());
    $("#water-level").text($("#water-number").val());
    $("#plant-image").html("<img src='" + current_plant.img + "' alt='" + current_plant.name + "'>");
    $("#hit-counter").text(counter);
}

const counterCheck = () => {
    if (counter >= 100) {
        $("#instructions")
            .html(
                "<h3>We lost that one, let's try again.</h3>" +
                "<img src='./assets/upsidedown.svg'/>" +
                "<div><button type='button' class='btn btn-agrilyst' onClick='window.location.reload()'>Try Again</button></div>"
            );
        $(".main-content").hide();
    }
}

// hintFunction("sun")
const hintFunction = (hint) => {
    // if the hint a sun hint => sun stuff 
    let theHint = "";
    let location = "";
    console.log(hint);

    if (hint === "sun") {
        
        let current_sun_value = parseInt($current_sun.val());
        location = "#temp-indicator";
        
        if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax)){
            theHint = "right sun levels";
        }
        else if (current_sun_value < current_plant.sunMin) {
            theHint = "hotter";
            $('#temp-indicator').text(sunHint);
        } else if (current_sun_value > current_plant.sunMax) {
            theHint = "colder";
        }
    } else if (hint === "water") {
        
        let current_water_value = parseInt($current_water.val());
        location = "#water-indicator";
        
        if ((current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax)){
            theHint = "right water levels";
        }
        else if (current_water_value < current_plant.waterMin) {
            theHint = "more water";
            $('#water-indicator').text(waterHint);
        } else if (current_water_value > current_plant.waterMax) {
            theHint = "less water";
        }
    }
    $(location).text(theHint);
}

// check sun levels and update inline hint
// const checkSunVal = () => {
//     let current_sun_value = parseInt($current_sun.val());
    
//     if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax)){
//         sunHint = "right sun levels";
//         $('#temp-indicator').text(sunHint);
//     }
//     else if (current_sun_value < current_plant.sunMin) {
//         sunHint = "hotter";
//         $('#temp-indicator').text(sunHint);
//     } else if (current_sun_value > current_plant.sunMax) {
//         sunHint = "colder";
//         $('#temp-indicator').text(sunHint);
//     }
// }

// // generate sun or water hint
// // 

// const checkWaterVal = () => {
//     let current_water_value = parseInt($current_water.val());
    
//     if ((current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax)){
//         waterHint = "right water levels";
//         $('#water-indicator').text(waterHint);
//     }
//     else if (current_water_value < current_plant.waterMin) {
//         waterHint = "more water";
//         $('#water-indicator').text(waterHint);
//     } else if (current_water_value > current_plant.waterMax) {
//         waterHint = "less watter";
//         $('#water-indicator').text(waterHint);
//     }
// }

// const inlineHints = () => {
//     let current_sun_value = parseInt($current_sun.val());
//     let current_water_value = parseInt($current_water.val());
//     let current_soil_type = $('input[name=options]:checked', '#soil-type').val();
//     // debugger;
//     // sun hint
    

//     // water hint
//     if (current_water_value < current_plant.waterMin) {
//         waterHint = "more water";
//         $('#water-indicator').text(waterHint);
//     } else if (current_water_value > current_plant.waterMax) {
//         waterHint = "less water";
//         $('#water-indicator').text(waterHint);
//     }
// }

const winChecker = () => {
    let current_sun_value = parseInt($current_sun.val());
    let current_water_value = parseInt($current_water.val());
    let current_soil_type = $('input[name=options]:checked', '#soil-type').val();
    
    let sunTrue = current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax;
    let waterTrue = current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax;
    let soilTypeTrue = current_soil_type === current_plant.soilType;

    $("#hit-counter").text(counter);
    // TODO: clean up conditionals below

    // If all conditions are met
    if (sunTrue && waterTrue && soilTypeTrue) {
        console.log("win") // test
        // resetGame();
        alert("You kept " + current_plant.name + " out of the Upside Down!");
        window.location.reload();
    }
    // Water is incorrect
    else if (sunTrue && !waterTrue && soilTypeTrue) {
        console.log("Water levels are off")
        hint = "Water levels are off, everything else good."
        counter++;
        counterCheck();
    }
    // Sun levels are incorrect
    else if (!sunTrue && waterTrue && soilTypeTrue) {
        console.log("Sun levels are off, everything else good.")
        hint = "Sun levels are off, everything else good.";
        counter++;
        counterCheck();
    }
    // Soil type is incorrect
    else if (sunTrue && waterTrue && !soilTypeTrue) {
        console.log("Try a different kind of soil...")
        hint = "Try a different kind of soil"
        counter++;
        counterCheck();
    }
    // Water is corrent only
    else if ( !sunTrue && waterTrue && !soilTypeTrue ) {
        console.log("You've got the right amount of water.")
        hint = "You've got the right amount of water, soil and sun levels are off."
        counter++;
        counterCheck();
    }
    // Soil is only correct
    else if (!sunTrue && !waterTrue && soilTypeTrue) {
        console.log("You've got the right type of soil, water and sun levels are off.")
        hint = "You've got the right type of soil, water and sun levels are off."
        counter++;
        counterCheck();
    }
    // Sun is corrent only
    else if (sunTrue && !waterHint && !soilTypeTrue) {
        console.log("You've got the right amount of sun, soil type and water levels are off.")
        hint = "You've got the right amount of sun, soil type and water levels are off."
        counter++;
        counterCheck();
    }
    // Other incorrect guess, increment counter
    else {
        counter++;
        hint = "Currently, nothing seems to be going right."
        counterCheck();
    }
}