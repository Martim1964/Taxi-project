document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const resultadoDiv = document.getElementById('resultado');
    const precoTotalP = document.getElementById('preco-total');
    const parteEmpresaP = document.getElementById('parte-empresa');
    const parteTaxistaP = document.getElementById('parte-taxista');
    const confirmarPagamentoBtn = document.getElementById('confirmar-pagamento');
    const pagarBtn = document.getElementById('pagar');
    const historicoTransacoesDiv = document.getElementById('historico-transacoes');
    const pagamentoDiv = document.getElementById('pagamento');
    const historicoDiv = document.getElementById('historico');
    
    let precofinal = 0;
    let clienteAtual = null;
    const clientes = {};
    const cartoes = {};

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const carro = parseInt(form.carro.value);
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

        clienteAtual = telefoneCliente; // Definir o cliente atual para o número de telefone atual

        const transacao = {
            data: new Date().toLocaleString(),
            valor: precofinal,
            empresaParte: empresaParte,
            taxistaParte: taxistaParte
        };

        clientes[telefoneCliente].transacoes.push(transacao);

        exibirResultado(precofinal, empresaParte, taxistaParte);
        resultadoDiv.style.display = 'block';
    });

    function exibirResultado(precofinal, empresaParte, taxistaParte) {
        precoTotalP.textContent = `Preço total: € ${precofinal.toFixed(2)}`;
        parteEmpresaP.textContent = `Parte da Empresa: € ${empresaParte.toFixed(2)}`;
        parteTaxistaP.textContent = `Parte do Taxista: € ${taxistaParte.toFixed(2)}`;
        confirmarPagamentoBtn.disabled = false; // Habilitar botão de confirmação de pagamento
    }

    confirmarPagamentoBtn.addEventListener('click', function() {
        if (clienteAtual) {
            pagamentoDiv.style.display = 'block'; // Exibir div de informações de pagamento
        } else {
            alert('Não há cliente selecionado para pagamento.');
        }
    });

    pagarBtn.addEventListener('click', function() {
        const nome = form.nome.value;
        const telefone = clienteAtual; // Usar o cliente atual
        const cartao = form.cartao.value;

        if (!clientes[telefone]) {
            alert('Número de telefone inválido!');
            return;
        }

        const transacoesCliente = clientes[telefone].transacoes;

        if (!cartoes[cartao]) {
            cartoes[cartao] = []; // Inicializar array de transações para o cartão
        }

        const confirmacao = confirm(`Tem certeza que deseja pagar a parte da empresa (€ ${(precofinal * 0.25).toFixed(2)})?`);

        if (confirmacao) {
            alert(`O pagamento de € ${(precofinal * 0.25).toFixed(2)} foi feito para ${nome} através do número de telefone ${telefone}.\n\nPagamento bem-sucedido!`);

            form.reset();
            resultadoDiv.style.display = 'none';
            pagamentoDiv.style.display = 'none';
            pagarBtn.disabled = true;

            cartoes[cartao].push(...transacoesCliente); // Adicionar transações ao cartão correspondente

            exibirHistorico(cartao); // Exibir histórico para o cartão atual
        } else {
            alert('Pagamento não confirmado. Por favor, revise os dados e confirme novamente.');
        }
    });

    function exibirHistorico(cartao) {
        historicoTransacoesDiv.innerHTML = `
            <h3>Histórico de Transações para o Cartão ${cartao}</h3>
            <ul>
                ${cartoes[cartao].map(transacao => `
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

    document.getElementById('nome').addEventListener('input', verificarFormulario);
    document.getElementById('telefone').addEventListener('input', verificarFormulario);

    function verificarFormulario() {
        const nome = form.nome.value;
        const telefone = form.telefone.value;

        if (nome.trim() !== '' && telefone.trim() !== '') {
            confirmarPagamentoBtn.disabled = false;
        } else {
            confirmarPagamentoBtn.disabled = true;
        }
    }
});
