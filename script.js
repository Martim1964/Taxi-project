document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const resultadoDiv = document.getElementById('resultado');
    const pagarBtn = document.getElementById('pagar');
    const historicoDiv = document.getElementById('historico');
    const historicoTransacoesDiv = document.getElementById('historico-transacoes');

    let precofinal = 0;

    // Base de dados simulada
    const database = {};
    for (let i = 1; i <= 100; i++) {
        database[i] = { transactions: [] };
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = form.carro.value;
        const distancia = parseFloat(form.distancia.value);
        const tempo = parseFloat(form.tempo.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();

        let tarifaKm;

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

        const precotempo = (tempo / 10) * n;
        let precolitro = distancia * tarifaKm;

        if (distancia > 1000) {
            precolitro -= (distancia - 1000) * 0.10 * tarifaKm; // Desconto de 10% para distâncias acima de 1000 km
        }

        precofinal = precolitro + precotempo;
        const empresaParte = precofinal * 0.25;
        const taxistaParte = precofinal - empresaParte;

        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
            <p>Preço do litro: € ${precolitro.toFixed(2)}</p>
            <p>Preço total que o taxista deve cobrar do cliente: € ${precofinal.toFixed(2)}</p>
            <p>Parte da Empresa: € ${empresaParte.toFixed(2)}</p>
            <p>Parte do Taxista após comissão: € ${taxistaParte.toFixed(2)}</p>
        `;

        pagamentoDiv.style.display = 'block';
    });

    pagarBtn.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const cartao = parseInt(document.getElementById('cartao').value);

        if (!database[cartao]) {
            alert('Número do cartão inválido!');
            return;
        }

        const confirmacao = confirm(`Tem certeza que deseja pagar a parte da empresa (€ ${(precofinal * 0.25).toFixed(2)})?`);

        if (confirmacao) {
            const transacao = {
                data: new Date().toLocaleString(),
                valor: precofinal,
                empresaParte: (precofinal * 0.25),
                taxistaParte: (precofinal * 0.75)
            };

            database[cartao].transactions.push(transacao);

            alert(`O pagamento de € ${(precofinal * 0.25).toFixed(2)} foi feito para ${nome} através do número de telefone ${telefone}.\n\nPagamento bem-sucedido!`);

            form.reset();
            resultadoDiv.innerHTML = '';
            pagamentoDiv.style.display = 'none';

            exibirHistorico(cartao);
        } else {
            alert('Pagamento não confirmado. Por favor, revise os dados e confirme novamente.');
        }
    });

    function exibirHistorico(cartao) {
        const transacoes = database[cartao].transactions;

        historicoTransacoesDiv.innerHTML = `
            <h3>Cartão Nº ${cartao}</h3>
            <ul>
                ${transacoes.map(transacao => `
                    <li>
                        <p>Data: ${transacao.data}</p>
                        <p>Valor total: € ${transacao.valor.toFixed(2)}</p>
                        <p>Parte da Empresa: € ${transacao.empresaParte.toFixed(2)}</p>
                        <p>Parte do Taxista: € ${transacao.taxistaParte.toFixed(2)}</p>
                    </li>
                `).join('')}
            </ul>
        `;

        historicoDiv.style.display = 'block';
    }

    document.getElementById('nome').addEventListener('input', verificarFormulario);
    document.getElementById('telefone').addEventListener('input', verificarFormulario);
    document.getElementById('cartao').addEventListener('input', verificarFormulario);

    function verificarFormulario() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const cartao = document.getElementById('cartao').value;

        if (nome.trim() !== '' && telefone.trim() !== '' && cartao.trim() !== '') {
            pagarBtn.disabled = false;
        } else {
            pagarBtn.disabled = true;
        }
    }
});
