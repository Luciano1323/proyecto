function calcularPlazoFijo() {

    var monto = parseFloat(document.getElementById("monto").value);
    var plazo = parseInt(document.getElementById("plazo").value);

    var tasaInteresAnual = 0.02; 
    var tasaInteresMensual = tasaInteresAnual / 12;

    var montoFinal = monto * Math.pow(1 + tasaInteresMensual, plazo);
    var interesesGanados = montoFinal - monto;

    var resultado = "Después de " + plazo + " meses, tu inversión de $" + monto.toFixed(2) + " habrá crecido a $" + montoFinal.toFixed(2) + ".<br>Intereses ganados: $" + interesesGanados.toFixed(2);
    document.getElementById("resultado").innerHTML = resultado;
}
