document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateButton");
    const priceInput = document.getElementById("price");
    const priceDisplay = document.getElementById("priceDisplay");
    const resultValue = document.getElementById("resultValue");
    const results = document.getElementById("results");
    const resetButton = document.getElementById("resetButton");
    const sumButton = document.getElementById("sumButton");
    const historyButton = document.getElementById("historyButton");
    const tasaIVA = 0.21;
    let total = 0;
    const maxResults = 20;
    const resultsArray = [];

    calculateButton.addEventListener("click", function() {
        const precio = parseFloat(priceInput.value);

        if (isNaN(precio)) {
            alert("Ingrese un precio válido.");
        } else {
            const montoIVA = precio * tasaIVA;
            const precioTotal = precio + montoIVA;

            
            const resultado = {
                precio: precio,
                iva: montoIVA,
                total: precioTotal
            };

            resultsArray.push(resultado);

            if (resultsArray.length > maxResults) {
                resultsArray.shift();
            }

            resultValue.textContent = `IVA (21%): $${montoIVA.toFixed(2)}\nPrecio Total: $${precioTotal.toFixed(2)}`;

            priceDisplay.style.display = "block";
            document.getElementById("userPriceValue").textContent = `$${precio.toFixed(2)}`;

            total += precioTotal;
            priceInput.value = "";
        }
    });

    resetButton.addEventListener("click", function() {
        resultValue.textContent = '';
        total = 0;
    });

    sumButton.addEventListener("click", function() {
        alert(`Precio Total de Todos los Resultados: $${total.toFixed(2)}`);
    });

    historyButton.addEventListener("click", function() {
        showHistory();
    });

    function showHistory() {
        if (resultsArray.length === 0) {
            alert("Historial de Resultados vacío.");
        } else {
            const historyText = resultsArray.map((resultado, index) => {
                return `Resultado ${index + 1}:\nPrecio: $${resultado.precio.toFixed(2)}\nIVA (21%): $${resultado.iva.toFixed(2)}\nPrecio Total: $${resultado.total.toFixed(2)}`;
            }).join('\n\n');
            alert(`Historial de Resultados:\n\n${historyText}`);
        }
    }
});
