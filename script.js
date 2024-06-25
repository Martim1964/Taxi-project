document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const resultadoDiv = document.getElementById('resultado');
    const pagarBtn = document.getElementById('pagar');
    const historicoTransacoesDiv = document.getElementById('historico-transacoes');

    let precofinal = 0;
    const clientes = {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = parseInt(form.carro.value); // Convertendo para número inteiro
        const distancia = parseFloat(form.distancia.value);
        const tempo = parseFloat(form.tempo.value);
        const diasemana = form.diasemana.value.toLowerCase();
        const isferiado = form.isferiado.value.toLowerCase();
        const nomeCliente = form.nome.value;
        const telefoneCliente = form.telefone.value;

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

        if (!clientes[telefoneCliente]) {
            clientes[telefoneCliente] = {
                nome: nomeCliente,
                transacoes: []
            };
        }

        const transacao = {
            data: new Date().toLocaleString(),
            valor: precofinal,
            empresaParte: empresaParte,
            taxistaParte: taxistaParte
        };

        clientes[telefoneCliente].transacoes.push(transacao);

        exibirResultado(precofinal, empresaParte, taxistaParte);
        pagarBtn.disabled = false;
    });

    function exibirResultado(precofinal, empresaParte, taxistaParte) {
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Preço total: € ${precofinal.toFixed(2)}</p>
            <p>Parte da Empresa: € ${empresaParte.toFixed(2)}</p>
            <p>Parte do Taxista: € ${taxistaParte.toFixed(2)}</p>
        `;
    }

    pagarBtn.addEventListener('click', function() {
        const nome = form.nome.value;
        const telefone = form.telefone.value;

        if (!clientes[telefone]) {
            alert('Número de telefone inválido!');
            return;
        }

        const transacoesCliente = clientes[telefone].transacoes;

        const confirmacao = confirm(`Tem certeza que deseja pagar a parte da empresa (€ ${(precofinal * 0.25).toFixed(2)})?`);

        if (confirmacao) {
            alert(`O pagamento de € ${(precofinal * 0.25).toFixed(2)} foi feito para ${nome} através do número de telefone ${telefone}.\n\nPagamento bem-sucedido!`);

            form.reset();
            resultadoDiv.innerHTML = '';
            pagarBtn.disabled = true;
            exibirHistorico(transacoesCliente);
        } else {
            alert('Pagamento não confirmado. Por favor, revise os dados e confirme novamente.');
        }
    });

    function exibirHistorico(transacoes) {
        historicoTransacoesDiv.innerHTML = `
            <h3>Histórico de Transações para ${clientes[form.telefone.value].nome}</h3>
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
    }

    document.getElementById('nome').addEventListener('input', verificarFormulario);
    document.getElementById('telefone').addEventListener('input', verificarFormulario);

    function verificarFormulario() {
        const nome = form.nome.value;
        const telefone = form.telefone.value;

        if (nome.trim() !== '' && telefone.trim() !== '') {
            pagarBtn.disabled = false;
        } else {
            pagarBtn.disabled = true;
        }
    }
});
