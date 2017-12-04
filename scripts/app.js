let plants = [{
    name: "Democorngon",
    sunMin: 77,
    sunMax: 91,
    soilType: "Sandy",
    waterMax: 65,
    waterMin: 40,
    sick: false,
    img: "./assets/corn.svg"
}];

let current_plant;
let counter = 0;
let hint = "Click to get started!";

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
    winChecker();
}
document.getElementById("water-number").oninput = function () {
    $("#water-level").text(this.value);
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

const winChecker = () => {
    const current_sun_value = parseInt($current_sun.val());
    const current_water_value = parseInt($current_water.val());
    const current_soil_type = $('input[name=options]:checked', '#soil-type').val();

    $("#hit-counter").text(counter);
    // TODO: clean up conditionals below

    // If all conditions are met
    if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax) &&
        (current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax) &&
        (current_soil_type === current_plant.soilType)) {
        console.log("win") // test
        // resetGame();
        alert("You kept " + current_plant.name + " out of the Upside Down!");
        window.location.reload();
    }
    // Water is incorrect
    else if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax) &&
        (current_water_value < current_plant.waterMin || current_water_value > current_plant.waterMax) &&
        (current_soil_type === current_plant.soilType)) {
        console.log("Water levels are off")
        hint = "Water levels are off, everything else good."
        counter++;
        counterCheck();
    }
    // Sun levels are incorrect
    else if ((current_sun_value < current_plant.sunMin || current_sun_value > current_plant.sunMax) &&
        (current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax) &&
        (current_soil_type === current_plant.soilType)) {
        console.log("Sun levels are off, everything else good.")
        hint = "Sun levels are off, everything else good."
        counter++;
        counterCheck();
    }
    // Soil type is incorrect
    else if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax) &&
        (current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax) &&
        (current_soil_type !== current_plant.soilType)) {
        console.log("Try a different kind of soil...")
        hint = "Try a different kind of soil"
        counter++;
        counterCheck();
    }
    // Water is corrent only
    else if ((current_sun_value < current_plant.sunMin || current_sun_value > current_plant.sunMax) &&
        (current_water_value >= current_plant.waterMin && current_water_value <= current_plant.waterMax) &&
        (current_soil_type !== current_plant.soilType)) {
        console.log("You've got the right amount of water.")
        hint = "You've got the right amount of water, soil and sun levels are off."
        counter++;
        counterCheck();
    }
    // Soil is only correct
    else if ((current_sun_value < current_plant.sunMin || current_sun_value > current_plant.sunMax) &&
        (current_water_value < current_plant.waterMin || current_water_value > current_plant.waterMax) &&
        (current_soil_type === current_plant.soilType)) {
        console.log("You've got the right type of soil, water and sun levels are off.")
        hint = "You've got the right type of soil, water and sun levels are off."
        counter++;
        counterCheck();
    }
    // Sun is corrent only
    else if ((current_sun_value >= current_plant.sunMin && current_sun_value <= current_plant.sunMax) &&
        (current_water_value < current_plant.waterMin || current_water_value > current_plant.waterMax) &&
        (current_soil_type !== current_plant.soilType)) {
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