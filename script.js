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
    const clientes = {};

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

    function exibirResultado(precofinal, empresaParte, taxist
