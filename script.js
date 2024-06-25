document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const resultadoDiv = document.getElementById('resultado');
    const precoTotalP = document.getElementById('preco-total');
    const parteEmpresaP = document.getElementById('parte-empresa');
    const parteTaxistaP = document.getElementById('parte-taxista');
    const confirmarPagamentoBtn = document.getElementById('confirmar-pagamento');
    const historicoTransacoesDiv = document.getElementById('historico-transacoes');
    const pagamentoDiv = document.getElementById('pagamento');
    const historicoDiv = document.getElementById('historico');
    const cartaoInput = document.getElementById('cartao');
    const pagarBtn = document.getElementById('pagar');

    let precofinal = 0;
    const transacoesPorCartao = {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = parseInt(form.carro.value);
        const distancia = parseFloat(form.distancia.value);
        const tempo = parseFloat(form.tempo.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();
        const nomeCliente = form.nome.value;
        const numeroCartao = parseInt(cartaoInput.value);

        let tarifaKm;

        switch (carro) {
            case 1:
                tarifaKm = 1.30;
                break;
            case 2:
                tarifaKm = 1.60;
                break;
            case 3:
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
            precolitro -= (distancia - 1000) * 0.10 * tarifaKm;
        }

        precofinal = precolitro + precotempo;
        const empresaParte = precofinal * 0.25;
        const taxistaParte = precofinal - empresaParte;

        if (!transacoesPorCartao[numeroCartao]) {
            transacoesPorCartao[numeroCartao] = {
                transacoes: []
            };
        }

        const transacao = {
            data: new Date().toLocaleString(),
            valor: precofinal,
            empresaParte: empresaParte,
            taxistaParte: taxistaParte,
            cartao: numeroCartao
        };

        transacoesPorCartao[numeroCartao].transacoes.push(transacao);

        exibirResultado(precofinal, empresaParte, taxistaParte);
        resultadoDiv.style.display = 'block';
    });

    function exibirResultado(precofinal, empresaParte, taxistaParte) {
        precoTotalP.textContent = `Preço total: € ${precofinal.toFixed(2)}`;
        parteEmpresaP.textContent = `Parte da Empresa: € ${empresaParte.toFixed(2)}`;
        parteTaxistaP.textContent = `Parte do Taxista: € ${taxistaParte.toFixed(2)}`;
    }

    confirmarPagamentoBtn.addEventListener('click', function() {
        pagamentoDiv.style.display = 'block';
    });

    

        const transacoesCartao = transacoesPorCartao[numeroCartao].transacoes;

        const confirmacao = confirm(`Tem certeza que deseja pagar a parte da empresa (€ ${(precofinal * 0.25).toFixed(2)})?`);

        if (confirmacao) {
            alert(`O pagamento de € ${(precofinal * 0.25).toFixed(2)} foi feito através do número do cartão ${numeroCartao}.\n\nPagamento bem-sucedido!`);

            form.reset();
            resultadoDiv.style.display = 'none';
            pagamentoDiv.style.display = 'none';
            exibirHistorico(numeroCartao);
        } else {
            alert('Pagamento não confirmado. Por favor, revise os dados e confirme novamente.');
        }
    }

    pagarBtn.addEventListener('click', realizarPagamento);

    function exibirHistorico(numeroCartao) {
        const transacoes = transacoesPorCartao[numeroCartao].transacoes;

        historicoTransacoesDiv.innerHTML = `
            <h3>Histórico de Transações para o Cartão ${numeroCartao}</h3>
            <ul>
                ${transacoes.map(transacao => `
                    <li>
                        <strong>Data:</strong> ${transacao.data}<br>
                        <strong>Valor:</strong> € ${transacao.valor.toFixed(2)}<br>
                        <strong>Parte da Empresa:</strong> € ${transacao.empresaParte.toFixed(2)}<br>
                        <strong>Parte do Taxista:</strong> € ${transacao.taxistaParte.toFixed(2)}
                    </li>
                `).join('')}
            </ul>
        `;
        historicoDiv.style.display = 'block';
    }
});
