document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const verificarButton = document.getElementById('verificarTaxi');
    const confirmarPagamentoButton = document.getElementById('confirmarPagamento');
    const resultadoDiv = document.getElementById('resultado');
    const nomeInput = document.getElementById('nome');
    const numeroTaxiInput = document.getElementById('numerotaxi');
    let taxiConfirmado = false;

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

        // Calculando o valor para o taxista e para a empresa
        const precoempresa = precofinal * 0.30; // 30% para a empresa
        const precotaxista = precofinal - precoempresa; // 70% para o taxista

        // Exibindo o resultado na página
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço para a empresa: € ${precoempresa.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precotaxista.toFixed(2)}</p>
        `;

        // Mostrar o formulário de pagamento apenas se o número de táxi for fornecido
        if (numeroTaxiInput.value.trim() !== '') {
            pagamentoDiv.style.display = 'block';
        }
    });

    // Verificar o número de táxi
    verificarButton.addEventListener('click', function() {
        const numeroTaxi = numeroTaxiInput.value.trim();

        // Simular verificação (aqui apenas verifica se há um número de táxi fornecido)
        if (numeroTaxi !== '') {
            if (confirm(`Confirma o número de táxi ${numeroTaxi}?`)) {
                taxiConfirmado = true;
                confirmarPagamentoButton.style.display = 'block';
                verificarButton.style.display = 'none';
            } else {
                alert('Por favor, insira o número de táxi novamente.');
                taxiConfirmado = false;
            }
        } else {
            alert('Por favor, insira o número de táxi.');
        }
    });

    // Confirmar pagamento
    confirmarPagamentoButton.addEventListener('click', function() {
        if (taxiConfirmado) {
            const nome = nomeInput.value.trim();
            const numeroTaxi = numeroTaxiInput.value.trim();

            alert(`Pagamento de € ${precotaxista.toFixed(2)} feito para o taxista ${nome} com número de táxi ${numeroTaxi}.`);
            // Aqui você pode adicionar lógica para realizar o pagamento real, se necessário

            // Exemplo: resetar formulário
            form.reset();
            pagamentoDiv.style.display = 'none';
            confirmarPagamentoButton.style.display = 'none';
            verificarButton.style.display = 'block';
            taxiConfirmado = false;
        } else {
            alert('Por favor, verifique o número de táxi antes de confirmar o pagamento.');
        }
    });
});
