document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const pagarButton = document.getElementById('pagar');
    
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
                tarifaKm = 1.15;
                break;
            case "2":
                tarifaKm = 1.35;
                break;
            case "3":
                tarifaKm = 1.75;
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

        // Habilitar o formulário de pagamento
        pagamentoDiv.style.display = 'block';
    });

    // Verificar se os campos de nome e telefone foram preenchidos para habilitar o botão de pagar
    const nomeInput = document.getElementById('nome');
    const telefoneInput = document.getElementById('telefone');

    nomeInput.addEventListener('input', verificarCampos);
    telefoneInput.addEventListener('input', verificarCampos);

    function verificarCampos() {
        if (nomeInput.value.trim() !== '' && telefoneInput.value.trim() !== '') {
            pagarButton.disabled = false;
        } else {
            pagarButton.disabled = true;
        }
    }

    // Ação ao clicar no botão de pagar
    pagarButton.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        const telefone = telefoneInput.value.trim();

        if (nome === '' || telefone === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simulação de pagamento
        alert(`Pagamento de € ${precotaxista.toFixed(2)} para ${nome} no número ${telefone} foi efetuado com sucesso!`);
    });
});
