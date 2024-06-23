document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = form.carro.value;
        const minutos = parseFloat(form['tempo-minutos'].value);
        const segundos = parseFloat(form['tempo-segundos'].value);
        const km = parseFloat(form['distancia-km'].value);
        const metros = parseFloat(form['distancia-metros'].value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();

        // Converting the time to minutes
        const tempo = minutos + (segundos / 60);

        // Converting the distance to kilometers
        const distancia = km + (metros / 1000);

        let tarifaKm;
        let tarifaTempo;

        // Definindo as tarifas baseado no tipo de carro
        switch (carro) {
            case "1":
                tarifaKm = 1.50;
                break;
            case "2":
                tarifaKm = 2.00;
                break;
            case "3":
                tarifaKm = 2.50;
                break;
            default:
                alert("Tipo de carro inválido!");
                return;
        }

        let n = 0;

        // Definindo o valor de n baseado no dia da semana e se é feriado
        if (isferiado === "sim") {
            n = 1.00; // Aumento de 1000%
        } else {
            switch (diasemana) {
                case "domingo":
                case "sabado":
                    n = 0.80; // Aumento de 1000%
                    break;
                case "sexta":
                    n = 0.70; // Aumento de 1000%
                    break;
                case "segunda":
                case "terca":
                case "quarta":
                case "quinta":
                    n = 0.50; // Aumento de 1000%
                    break;
                default:
                    alert("Dia da semana inválido! Por favor, use um dos dias da semana.");
                    return;
            }
        }

        // Calculando o preço do tempo
        const precotempo = (tempo / 10) * n;

        // Calculando o preço do litro baseado na distância e na tarifa por km
        let precolitro = distancia * tarifaKm;

        // Aplicando desconto se a distância for maior que 1000 km
        if (distancia > 1000) {
            precolitro -= (distancia - 1000) * 0.10; // Aumento de 1000%
        }

        // Calculando o preço final
        const precofinal = precolitro + precotempo;

        // Calculando o valor para o taxista e para a empresa
        const precoempresa = precofinal * 0.25;
        const precotaxista = precofinal - precoempresa;

        // Exibindo o resultado na página
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço para a empresa: € ${precoempresa.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precotaxista.toFixed(2)}</p>
        `;
    });
});
