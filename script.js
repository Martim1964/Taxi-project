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
            case "sábado":
            case "domingo":
                n = 0.08;
                break;
            case "sexta":
                n = 0.07;
                break;
            case "segunda":
            case "terça":
            case "quarta":
            case "quinta":
                n = 0.05;
                break;
            default:
                alert("Dia da semana inválido!");
                return;
        }

        const precotempo = (tempo / 10) * n;

        let precolitro;
        switch (carro) {
            case 1:
                precolitro = 0.02;
                break;
            case 2:
                precolitro = 0.03;
                break;
            case 3:
                precolitro = 0.04;
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

        const precoTotal = precotempo + precofinal;

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precofinal.toFixed(2)}</p>
            <p>Total: € ${precoTotal.toFixed(2)}</p>
        `;
    });
});
