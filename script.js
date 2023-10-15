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
    const maxResults = 10;
    const resultsArray = [];

    calculateButton.addEventListener("click", function() {
        const precio = parseFloat(priceInput.value);

        if (isNaN(precio)) {
            alert("Ingrese un precio válido.");
        } else {
            const montoIVA = precio * tasaIVA;
            const precioTotal = precio + montoIVA;

            const resultText = `IVA (21%): $${montoIVA.toFixed(2)}\nPrecio Total: $${precioTotal.toFixed(2)}`;

            resultsArray.push(resultText);

            if (resultsArray.length > maxResults) {
                resultsArray.shift();
            }

            resultValue.textContent = resultText;

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
        const historyText = resultsArray.join('\n\n');
        if (historyText.trim() === "") {
            alert("Historial de Resultados vacío.");
        } else {
            alert(`Historial de Resultados:\n\n${historyText}`);
        }
    }
});

