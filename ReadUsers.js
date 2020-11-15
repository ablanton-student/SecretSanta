"use strict";

window.onload = init;

function init() {
    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById("fileContents").innerHTML = "";
    });
    document.getElementById("submit").addEventListener("click", function () {
        var file = document.getElementById("partyPeopleFile").files[0];
        var textArrayPeople1 = [];
        var textArrayPeople2 = [];
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                var peopleJSON = JSON.parse(evt.target.result);
                var peopleArray = peopleJSON.people;
                //console.log(peopleJSON);
                console.log(peopleJSON.people);

                for (var i = 0; i < peopleArray.length; i++) {
                    var obj = peopleArray[i];
                    textArrayPeople1.push(obj.name);
                }
                console.log(textArrayPeople1);
                textArrayPeople2 = textArrayPeople1.map((x) => x);
                assignSecret(textArrayPeople1, textArrayPeople2);
            }
            reader.onerror = function (evt) {
                document.getElementById("fileContents").innerHTML = "error reading file";
            }
        }
    });
}

function assignSecret(arr1, arr2) {
    var randomInt1;
    var randomInt2;
    var arrayLength = arr1.length;
    var filteredArray;
    var comboArray = [];
    for (var i = 0; i < arrayLength; i++) {
        randomInt1 = Math.floor(Math.random() * arr1.length);
        filteredArray = arr2.filter(x => x != arr1[randomInt1]);
        randomInt2 = Math.floor(Math.random() * filteredArray.length);
        comboArray.push(arr1[randomInt1] + " is getting a gift for " + filteredArray[randomInt2]);
        arr1.splice(randomInt1, 1);

        for(var x in arr2){
            if(arr2[x]==filteredArray[randomInt2]){
                arr2.splice(x, 1);
                break;
            }
        }
    }
    console.log(arr1);
    console.log(arr2);
    console.log(comboArray);

    for (var i = 0; i < comboArray.length; i++) {
        document.getElementById("fileContents").innerHTML += comboArray[i] + "<br>";
    }
}
