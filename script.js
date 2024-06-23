document.getElementById('simulador-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let carro = document.getElementById('carro').value;
    let tempo = parseFloat(document.getElementById('tempo').value);
    let distancia = parseFloat(document.getElementById('distancia').value);
    let diasemana = document.getElementById('diasemana').value.toLowerCase();
    let isferiado = document.getElementById('isferiado').value.toLowerCase();

    let n = 0;
    if (isferiado === "sim") {
        n = 0.10;
    } else if (diasemana === "sabado" || diasemana === "domingo") {
        n = 0.08;
    } else if (diasemana === "sexta") {
        n = 0.07;
    } else if (diasemana === "segunda" || diasemana === "terca" || diasemana === "quarta" || diasemana === "quinta") {
        n = 0.05;
    } else {
        alert("Dia da semana inválido");
        return;
    }

    let precotempo = (tempo / 10) * n;
    let precolitro = 0;

    if (carro === "1") {
        precolitro = distancia * 0.02;
    } else if (carro === "2") {
        precolitro = distancia * 0.03;
    } else if (carro === "3") {
        precolitro = distancia * 0.04;
    }

    const limiteDistancia = 1000;
    if (distancia > limiteDistancia) {
        let desconto = (distancia - limiteDistancia) * 0.01;
        precolitro = (distancia * precolitro) - desconto;
    } else {
        precolitro = distancia * precolitro;
    }

    let precofinal = precolitro + precotempo;
    let precotaxista = precofinal;
    let precoempresa = precofinal * 0.25;
    let precofinaltaxista = precotaxista - precoempresa;

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Preço taxista sem taxas: €${precotaxista.toFixed(2)}</p>
        <p>Preço para a empresa: €${precoempresa.toFixed(2)}</p>
        <p>Preço total ganho pelo taxista: €${precofinaltaxista.toFixed(2)}</p>
    `;
});
