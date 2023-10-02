number = 5;
const timer = setInterval(() => {
  alert(number);
  number--;
  if (number == 0) {
    while (number == 0) {
      number = 5;
    }
    let precio = parseInt(prompt("Ingresar dinero"));
    const IVA = (precio * 21) / 100;
    let emergente = alert(precio + IVA);
    emergente;
    emergente = true;
  }
});
