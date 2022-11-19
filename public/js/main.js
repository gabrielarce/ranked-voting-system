let radio1 = document.forms["frm1"].elements["rank1"];
let inputs = [...document.querySelectorAll('input[type="radio"]')]
let labels = [...document.querySelectorAll('input[name="rank1"] + label')]

function displayWinner() {
    let winner = document.querySelector(".winner");
    winner.style.display = "block";
    winner.scrollIntoView();
}

radio1.forEach(radio => {
    radio.addEventListener("click", function() {
        console.log(this.id, radio, inputs, labels)
        inputs.forEach(input => {
            input.disabled = false
        })

        let type = event.target.value
        document.getElementById(type + "2").disabled = true
        document.getElementById(type + "3").disabled = true
        document.querySelector(`#${this.id} + label`).classList.toggle("red")

    })
})

var radios2 = document.forms["frm1"].elements["rank2"];
for (radio in radios2) {
    radios2[radio].onclick = function() {
        let type = event.target.value
        document.getElementById(type + "3").disabled = true
    }
}

//Reset Form Button
function resetForm() {
    let inputs = document.querySelectorAll('input[type="radio"]')
    let inputsArray = [...inputs]
    inputsArray.forEach(input => {
        input.disabled = false
    })
    document.getElementById("frm1").reset()
}