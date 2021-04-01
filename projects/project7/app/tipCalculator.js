let txtBill = document.getElementById("txtBill");
let content = document.getElementById("content");

function calculateTip() {
    let billValue = Number(txtBill.value);

    let tipValue = billValue * .2;
    let totalValue = billValue + tipValue;

    tipValue = tipValue.toFixed(2);
    totalValue = totalValue.toFixed(2);

    console.log("Tip: $" + tipValue + ". Total: $" + totalValue);
    content.innerHTML = "Tip: $" + tipValue + ". Total: $" + totalValue;

    txtBill.value = "";
}