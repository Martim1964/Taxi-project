document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const resultadoDiv = document.getElementById('resultado');
    const pagarBtn = document.getElementById('pagar');

    let precofinal = 0; // Variável para armazenar o preço final global

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

        // Calculando o preço final global
        precofinal = precolitro + precotempo;

        // Calculando o preço para a empresa
        const precoempresa = precofinal * 0.25; // 25% para a empresa
        
        // Calculando o preço para o taxista
        const precofinaltaxista = precofinal - precoempresa;

        // Exibindo o resultado na página
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço para a empresa: € ${precoempresa.toFixed(2)}</p>
            <p>Preço para o taxista: € ${precofinaltaxista.toFixed(2)}</p>
        `;

        // Mostrar o formulário de pagamento
        pagamentoDiv.style.display = 'block';
    });

    pagarBtn.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;

        // Confirmação final do pagamento
        const confirmacao = confirm(`Tem certeza que deseja pagar € ${precofinal.toFixed(2)} ao taxista ${nome}?`);

        if (confirmacao) {
            // Simular pagamento (exibir mensagem)
            const mensagem = `O pagamento de € ${precofinal.toFixed(2)} foi feito para ${nome} através do número de telefone ${telefone}.`;
            alert(mensagem + '\n\nPagamento bem-sucedido!');

            // Reiniciar o formulário
            form.reset();
            resultadoDiv.innerHTML = '';
            pagamentoDiv.style.display = 'none';
        } else {
            alert('Pagamento não confirmado. Por favor, revise os dados e confirme novamente.');
        }
    });

    // Habilitar botão de pagamento quando ambos os campos estiverem preenchidos
    document.getElementById('nome').addEventListener('input', verificarFormulario);
    document.getElementById('telefone').addEventListener('input', verificarFormulario);

    function verificarFormulario() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;

        if (nome.trim() !== '' && telefone.trim() !== '') {
            pagarBtn.disabled = false;
        } else {
            pagarBtn.disabled = true;
        }
    }
});
