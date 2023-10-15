document.addEventListener("DOMContentLoaded", function() {
  const calculateButton = document.getElementById("calculateButton");
  const priceInput = document.getElementById("price");
  const priceDisplay = document.getElementById("priceDisplay");
  const resultsContainer = document.getElementById("results");
  const resetButton = document.getElementById("resetButton");
  const sumButton = document.getElementById("sumButton");
  const tasaIVA = 0.21;
  let total = 0;
  const maxResults = 10;
  const results = [];

  calculateButton.addEventListener("click", function() {
      const precio = parseFloat(priceInput.value);

      if (isNaN(precio)) {
          alert("Ingrese un precio válido.");
      } else {
          const montoIVA = precio * tasaIVA;
          const precioTotal = precio + montoIVA;

          const resultText = `IVA (21%): $${montoIVA.toFixed(2)}\nPrecio Total: $${precioTotal.toFixed(2)}`;

          results.push(resultText);

          if (results.length > maxResults) {
              results.shift();
          }

          updateResults();

          priceDisplay.style.display = "block";
          document.getElementById("userPriceValue").textContent = `$${precio.toFixed(2)}`;

          total += precioTotal;
          priceInput.value = "";
      }
  });

  resetButton.addEventListener("click", function() {
      results.length = 0; // Elimina todos los resultados
      total = 0;
      updateResults();
      priceDisplay.style.display = "none";
  });

  sumButton.addEventListener("click", function() {
      alert(`Precio Total de Todos los Resultados: $${total.toFixed(2)}`);
  });

  function updateResults() {
      resultsContainer.innerHTML = results.map((result, index) => {
          return `<p>Resultado ${index + 1}:\n${result}</p>`;
      }).join('');
  }
});
