document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculateButton");
    const priceInput = document.getElementById("price");
    const priceDisplay = document.getElementById("priceDisplay");
    const userPriceValue = document.getElementById("userPriceValue");
    const resultValue = document.getElementById("resultValue");
    const resetButton = document.getElementById("resetButton");
    const sumButton = document.getElementById("sumButton");
    const historyButton = document.getElementById("historyButton");
    const customResultsButton = document.getElementById("customResultsButton");
    const alertOverlay = document.getElementById("alertOverlay");
    const alertPopup = document.getElementById("alertPopup");
    const validValueButton = document.getElementById("validValueButton");
    const historyOverlay = document.getElementById("historyOverlay");
    const historyPopup = document.getElementById("historyPopup");
    const closeHistoryButton = document.getElementById("closeHistoryButton");
    const historyTextContainer = document.getElementById("historyText");
    const customResultsOverlay = document.getElementById("customResultsOverlay");
    const customResultsPopup = document.getElementById("customResultsPopup");
    const customResultsText = document.getElementById("customResultsText");
    const closeCustomResultsButton = document.getElementById("closeCustomResultsButton");
    const tasaIVA = 0.21;
    let total = 0;
    const maxResults = 20;
    let resultsArray = loadResultsFromStorage();

    calculateButton.addEventListener("click", function () {
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

            saveResultsToStorage();

            resultValue.textContent = `IVA (21%): $${montoIVA.toFixed(2)}\nPrecio Total: $${precioTotal.toFixed(2)}`;
            userPriceValue.textContent = `$${precio.toFixed(2)}`;

            showPopup(priceDisplay);

            total += precioTotal;
            priceInput.value = "";
        }
    });

    resetButton.addEventListener("click", function () {
        resultValue.textContent = '';
        total = 0;
    });

    sumButton.addEventListener("click", function () {
        showAlert(`Precio Total de Todos los Resultados: $${total.toFixed(2)}`);
    });

    historyButton.addEventListener("click", function () {
        resultsArray = loadResultsFromStorage();
        showHistory();
    });

    customResultsButton.addEventListener("click", function () {
        showCustomResultsList();
    });

    validValueButton.addEventListener("click", function () {
        hideOverlay(alertOverlay);
    });

    closeHistoryButton.addEventListener("click", function () {
        hideOverlay(historyOverlay);
    });

    closeCustomResultsButton.addEventListener("click", function () {
        hideOverlay(customResultsOverlay);
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

    function showCustomResultsList() {
        if (resultsArray.length === 0) {
            showAlert("Historial de Resultados vacío.");
        } else {
            const select = document.createElement("select");
            select.setAttribute("id", "customResultsSelect");

            resultsArray.forEach((resultado, index) => {
                const option = document.createElement("option");
                option.text = `Resultado ${index + 1}`;
                select.add(option);
            });

            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirmar";
            confirmButton.addEventListener("click", function () {
                const selectedIndex = select.selectedIndex;
                const selectedResult = resultsArray[selectedIndex];
                const totalCustom = selectedResult.total;
                const totalAll = total + totalCustom;

                showAlert(`Precio Total de Todos los Resultados (incluido el personalizado): $${totalAll.toFixed(2)}`);
                hideOverlay(customResultsOverlay);
            });

            customResultsPopup.innerHTML = "";
            customResultsPopup.appendChild(select);
            customResultsPopup.appendChild(confirmButton);

            showOverlay(customResultsOverlay, customResultsPopup);
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

    function saveResultsToStorage() {
        const limitedResults = resultsArray.slice(-maxResults);
        localStorage.setItem('resultsArray', JSON.stringify(limitedResults));
    }

    function loadResultsFromStorage() {
        const storedResults = localStorage.getItem('resultsArray');
        if (storedResults) {
            return JSON.parse(storedResults);
        } else {
            return [];
        }
    }
});