function calcularIVA() {
let precio;

while (true) {
  let input = prompt("Ingrese el precio:");
  if (input === null || input.trim() === "") {
    alert("No ingresó un precio válido.");
  } else {
    precio = parseFloat(input);
    if (!isNaN(precio)) {
      break;
    } else {
      alert("Ingrese un precio válido.");
    }
  }
}
const tasaIVA = 0.21;
const montoIVA = precio * tasaIVA;
const precioTotal = precio + montoIVA;
alert(
  `Precio ingresado: $${precio.toFixed(2)}\nIVA (21%): $${montoIVA.toFixed(
    2
  )}\nPrecio Total: $${precioTotal.toFixed(2)}`
);
}
document.addEventListener("DOMContentLoaded", calcularIVA);
