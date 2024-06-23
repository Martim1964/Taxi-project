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
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço para a empresa: € ${precoempresa.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precotaxista.toFixed(2)}</p>
        `;

        // Exibindo o formulário de pagamento ao taxista
        resultadoDiv.innerHTML += `
            <div id="form-pagamento">
                <h2>Pagamento ao Taxista</h2>
                <label for="nome-taxista">Nome do Taxista:</label>
                <input type="text" id="nome-taxista" name="nome-taxista" required>

                <label for="telefone-taxista">Telefone do Taxista:</label>
                <input type="tel" id="telefone-taxista" name="telefone-taxista" required>

                <button id="confirmar-pagamento">Pagar por MBWay</button>
            </div>
        `;

        // Capturando evento de clique no botão de confirmar pagamento
        const btnConfirmarPagamento = document.getElementById('confirmar-pagamento');
        btnConfirmarPagamento.addEventListener('click', function() {
            const nomeTaxista = document.getElementById('nome-taxista').value;
            const telefoneTaxista = document.getElementById('telefone-taxista').value;

            if (!nomeTaxista || !telefoneTaxista) {
                alert("Por favor, preencha todos os campos corretamente.");
                return;
            }

            // Simulando pagamento por MBWay (substitua esta lógica com uma integração real)
            const pagamentoRealizado = realizarPagamentoMBWay(nomeTaxista, telefoneTaxista, precotaxista);

            if (pagamentoRealizado) {
                alert(`Pagamento de € ${precotaxista.toFixed(2)} realizado para ${nomeTaxista} com sucesso!`);

                // Limpando o formulário de pagamento
                document.getElementById('nome-taxista').value = '';
                document.getElementById('telefone-taxista').value = '';

                // Limpando o resultado do cálculo na tela
                resultadoDiv.innerHTML = '';
            } else {
                alert("Falha ao processar o pagamento. Por favor, tente novamente mais tarde.");
            }
        });
    });
});

// Função simulada para realizar o pagamento por MBWay
function realizarPagamentoMBWay(nomeTaxista, telefoneTaxista, valor) {
    // Aqui você substituiria com a lógica real de integração com MBWay
    // Esta função simula um pagamento bem-sucedido para o exemplo
    console.log(`Pagamento de € ${valor.toFixed(2)} para ${nomeTaxista} (${telefoneTaxista}) via MBWay.`);
    return true; // Simulando sucesso
}
