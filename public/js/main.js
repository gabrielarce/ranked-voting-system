var radios = document.forms["frm1"].elements["rank1"];
for (radio in radios) {
    radios[radio].onclick = function() {
        let inputs = document.querySelectorAll("input")
        let inputsArray = [...document.querySelectorAll("input")]
        inputsArray.forEach(input => {
            input.disabled = false
        })
        let type = event.target.value
        document.getElementById(type + "2").disabled = true
        document.getElementById(type + "3").disabled = true
    }
}

var radios2 = document.forms["frm1"].elements["rank2"];
for (radio in radios2) {
    radios2[radio].onclick = function() {
        let type = event.target.value
        document.getElementById(type + "3").disabled = true
    }
}

//Reset Form Button
function resetForm() {
    let inputs = document.querySelectorAll("input")
    let inputsArray = [...inputs]
    inputsArray.forEach(input => {
        input.disabled = false
    })
    document.getElementById("frm1").reset();
}