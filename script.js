document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = parseInt(form.carro.value);
        const tempo = parseFloat(form.tempo.value);
        const distancia = parseFloat(form.distancia.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();

        let n = 0;
        switch (diasemana) {
            case "domingo":
            case "segunda":
            case "terça":
            case "quarta":
            case "quinta":
                if (diasemana === "sábado" || diasemana === "domingo") {
                    n = 0.08;
                } else if (diasemana === "sexta") {
                    n = 0.07;
                } else {
                    n = 0.05;
                }
                break;
            default:
                alert("Dia da semana inválido! Por favor, use um dos dias da semana.");
                return;
        }

        const precotempo = (tempo / 10) * n;

        let precolitro;
        switch (carro) {
            case 1:
                precolitro = 0.05; // Preço do Peugeot 208 por km
                break;
            case 2:
                precolitro = 0.06; // Preço do Mercedes GLA por km
                break;
            case 3:
                precolitro = 0.07; // Preço do Porsche Cayenne GTS por km
                break;
            default:
                alert("Carro inválido!");
                return;
        }

        let precofinal;
        if (distancia > 1000) {
            const desconto = (distancia - 1000) * 0.01;
            precofinal = (distancia * precolitro) - desconto;
        } else {
            precofinal = distancia * precolitro;
        }

        const precoempresa = precofinal * 0.15; // 15% do preço final para a empresa

        const precotaxista = precofinal - precoempresa; // Valor para o taxista

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precofinal.toFixed(2)}</p>
            <p>Preço para a empresa: € ${precoempresa.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precotaxista.toFixed(2)}</p>
        `;
    });
});
