document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculateButton");
    const priceInput = document.getElementById("price");
    const priceDisplay = document.getElementById("priceDisplay");
    const userPriceValue = document.getElementById("userPriceValue");
    const resultValue = document.getElementById("resultValue");
    const resetButton = document.getElementById("resetButton");
    const sumButton = document.getElementById("sumButton");
    const historyButton = document.getElementById("historyButton");
    const alertOverlay = document.getElementById("alertOverlay");
    const alertPopup = document.getElementById("alertPopup");
    const validValueButton = document.getElementById("validValueButton");
    const historyOverlay = document.getElementById("historyOverlay");
    const historyPopup = document.getElementById("historyPopup");
    const closeHistoryButton = document.getElementById("closeHistoryButton");
    const historyTextContainer = document.getElementById("historyText");
    const tasaIVA = 0.21;
    let total = 0;
    const maxResults = 20;
    const resultsArray = [];

    calculateButton.addEventListener("click", function() {
        const precio = parseFloat(priceInput.value);

        if (isNaN(precio)) {
            showAlert("Ingrese un precio válido.");
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
            userPriceValue.textContent = `$${precio.toFixed(2)}`;

            showPopup(priceDisplay);

            total += precioTotal;
            priceInput.value = "";
        }
    });

    resetButton.addEventListener("click", function() {
        resultValue.textContent = '';
        total = 0;
    });

    sumButton.addEventListener("click", function() {
        showAlert(`Precio Total de Todos los Resultados: $${total.toFixed(2)}`);
    });

    historyButton.addEventListener("click", function() {
        showHistory();
    });

    validValueButton.addEventListener("click", function() {
        hideOverlay(alertOverlay);
    });

    closeHistoryButton.addEventListener("click", function() {
        hideOverlay(historyOverlay);
    });

    function showHistory() {
        if (resultsArray.length === 0) {
            showAlert("Historial de Resultados vacío.");
        } else {
            const historyText = resultsArray.map((resultado, index) => {
                return `Resultado ${index + 1}:\nPrecio: $${resultado.precio.toFixed(2)}\nIVA (21%): $${resultado.iva.toFixed(2)}\nPrecio Total: $${resultado.total.toFixed(2)}`;
            }).join('\n\n');
            historyTextContainer.innerHTML = historyText;
            showOverlay(historyOverlay, historyPopup);
        }
    }

    function showAlert(message) {
        document.getElementById("alertText").textContent = message;
        showOverlay(alertOverlay, alertPopup);

        setTimeout(() => {
            hideOverlay(alertOverlay);
        }, 3000);
    }

    function showPopup(popup) {
        popup.style.display = "block";
    }

    function showOverlay(overlay, popup) {
        overlay.style.display = "flex";
        if (popup) {
            popup.style.display = "block";
        }
    }

    function hideOverlay(overlay) {
        overlay.style.display = "none";
    }
});