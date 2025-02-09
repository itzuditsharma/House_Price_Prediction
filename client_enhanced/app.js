function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i = 0; i < uiBathrooms.length; i++) {
        if(uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i = 0; i < uiBHK.length; i++) {
        if(uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "/api/predict_home_price"; 
    // var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = `<h2>Estimated Price: ${data.estimated_price} Lakh</h2>`;
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "/api/get_location_names"; 
    // var url = "http://127.0.0.1:5000/get_location_names";

    $.get(url, function(data, status) {
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
