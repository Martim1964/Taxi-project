document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = form.carro.value;
        const distancia = parseFloat(form.distancia.value);
        const tempo = parseFloat(form.tempo.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();

        let tarifaKm;
        let tarifaTempo;

        // Definindo as tarifas baseado no tipo de carro
        switch (carro) {
            case "1":
                tarifaKm = 1.00;
                tarifaTempo = 0.20;
                break;
            case "2":
                tarifaKm = 1.50;
                tarifaTempo = 0.25;
                break;
            case "3":
                tarifaKm = 2.00;
                tarifaTempo = 0.30;
                break;
            default:
                alert("Tipo de carro inválido!");
                return;
        }

        let descontoKm = 0;

        // Aplicando desconto na tarifa por km se a distância for maior que 50 km
        if (distancia > 50) {
            descontoKm = (distancia - 50) * 0.03;
        }

        // Calculando o preço final da viagem
        let precoFinal = (distancia * tarifaKm) + (tempo * tarifaTempo) - descontoKm;

        // Exibindo o resultado na página
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço estimado da corrida: € ${precoFinal.toFixed(2)}</p>
        `;
    });
});
