// Selecionando o formulário pelo ID
const form = document.getElementById('simulador-form');

// Adicionando um event listener para capturar o evento de submit do formulário
form.addEventListener('submit', function(event) {
    // Prevenindo o comportamento padrão do formulário de ser enviado
    event.preventDefault();

    // Obtendo os valores dos campos do formulário
    const carro = document.getElementById('carro').value;
    const tempo = parseFloat(document.getElementById('tempo').value); // Convertendo para número
    const distancia = parseFloat(document.getElementById('distancia').value); // Convertendo para número
    const diasemana = document.getElementById('diasemana').value.toLowerCase(); // Convertendo para minúsculas
    const isferiado = document.getElementById('isferiado').value.toLowerCase(); // Convertendo para minúsculas

    // Verificando o desconto com base no dia da semana e se é feriado
    let n = 0;
    if (isferiado === "sim") {
        n = 0.10;
    } else if (diasemana === "sábado" || diasemana === "domingo") {
        n = 0.08;
    } else if (diasemana === "sexta-feira") {
        n = 0.07;
    } else if (diasemana === "segunda-feira" || diasemana === "terça-feira" || diasemana === "quarta-feira" || diasemana === "quinta-feira") {
        n = 0.05;
    } else {
        // Caso o dia da semana não seja reconhecido, pode tratar como desejar
        alert("Dia da semana inválido!");
        return; // Sair da função se o dia da semana for inválido
    }

    // Calculando o preço do tempo
    const precotempo = (tempo / 10) * n;

    // Definindo o preço do litro com base no carro escolhido
    let precolitro;
    switch (carro) {
        case '1':
            precolitro = 0.02;
            break;
        case '2':
            precolitro = 0.03;
            break;
        case '3':
            precolitro = 0.04;
            break;
        default:
            // Caso o carro não seja reconhecido, pode tratar como desejar
            alert("Carro inválido!");
            return; // Sair da função se o carro for inválido
    }

    // Calculando o preço do litro
    let precofinal;
    if (distancia > 1000) {
        const desconto = (distancia - 1000) * 0.01;
        precofinal = (distancia * precolitro) - desconto;
    } else {
        precofinal = distancia * precolitro;
    }

    // Exibindo o resultado na div resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Resultado do Cálculo</h2>
        <p>Preço do tempo: € ${precotempo.toFixed(2)}</p>
        <p>Preço do litro: € ${precofinal.toFixed(2)}</p>
        <p>Total: € ${(precotempo + precofinal).toFixed(2)}</p>
    `;
});
