document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const confirmarPagamentoButton = document.getElementById('confirmarPagamento');
    const resultadoDiv = document.getElementById('resultado');
    const nomeInput = document.getElementById('nome');
    const numeroTaxiInput = document.getElementById('numerotaxi');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = form.carro.value;
        const distancia = parseFloat(form.distancia.value);
        const tempo = parseFloat(form.tempo.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();

        let tarifaKm;

        // Definindo as tarifas baseado no tipo de carro
        switch (carro) {
            case "1":
                tarifaKm = 1.30;
                break;
            case "2":
                tarifaKm = 1.60;
                break;
            case "3":
                tarifaKm = 1.90;
                break;
            default:
                alert("Tipo de carro inválido!");
                return;
        }

        let n = 0;

        // Definindo o valor de n baseado no dia da semana e se é feriado
        if (isferiado === "sim") {
            n = 1.00; 
        } else {
            switch (diasemana) {
                case "domingo":
                case "sabado":
                    n = 0.80; 
                    break;
                case "sexta":
                    n = 0.70; 
                    break;
                case "segunda":
                case "terca":
                case "quarta":
                case "quinta":
                    n = 0.50; 
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
            precolitro -= (distancia - 1000) * 0.10 * tarifaKm; // Desconto de 10% para distâncias acima de 1000 km
        }

        // Calculando o preço final
        const precofinal = precolitro + precotempo;

        // Exibindo o resultado na página
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precofinal.toFixed(2)}</p>
        `;

        // Mostrar o formulário de pagamento apenas se o número de táxi for fornecido
        if (numeroTaxiInput.value.trim() !== '') {
            pagamentoDiv.style.display = 'block';
        }
    });

    // Confirmar pagamento
    confirmarPagamentoButton.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        const numeroTaxi = numeroTaxiInput.value.trim();

        if (nome !== '' && numeroTaxi !== '') {
            if (confirm(`Confirma o pagamento para o taxista ${nome} com número de táxi ${numeroTaxi}?`)) {
                alert(`Pagamento confirmado para o taxista ${nome} com número de táxi ${numeroTaxi}.`);
                // Aqui você pode adicionar lógica para realizar o pagamento real, se necessário

                // Exemplo: resetar formulário e esconder div de pagamento
                form.reset();
                pagamentoDiv.style.display = 'none';
            } else {
                alert('Por favor, verifique os dados e confirme novamente o pagamento.');
            }
        } else {
            alert('Por favor, preencha todos os campos para continuar.');
        }
    });
});
