document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('convert').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=big-time&vs_currencies=usd')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Verificar si 'big-time' está definido en la respuesta
        if (!data['big-time'] || !data['big-time'].usd) {
          throw new Error('Exchange rate data not available');
        }

        const rate = data['big-time'].usd;
        let result;

        if (fromCurrency === 'BIGTIME' && toCurrency === 'USD') {
          result = (amount * rate).toString(); // Convertir a string para asegurar que se mantengan los decimales
        } else if (fromCurrency === 'USD' && toCurrency === 'BIGTIME') {
          result = (amount / rate).toString(); // Convertir a string para asegurar que se mantengan los decimales
        } else {
          result = amount.toString(); // Misma moneda, no se necesita conversión
        }

        document.getElementById('result').value = result;
      })
      .catch(error => {
        console.error('Error fetching exchange rate:', error);
        alert('Error fetching exchange rate. Please try again later.');
      });
  });
});
