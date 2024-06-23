document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxi-form');
    const pagamentoDiv = document.getElementById('pagamento');
    const resultadoDiv = document.getElementById('resultado');
    const pagarBtn = document.getElementById('pagar');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const total = parseFloat(form.total.value);
        const empresaParte = total * 0.25;
        const taxistaParte = total - empresaParte;

        // Exibindo o resultado na página
        resultadoDiv.innerHTML = `
            <h2>Resultado do Cálculo</h2>
            <p>Total: € ${total.toFixed(2)}</p>
            <p>Parte da Empresa: € ${empresaParte.toFixed(2)}</p>
            <p>Parte do Taxista: € ${taxistaParte.toFixed(2)}</p>
        `;

        // Mostrar o formulário de pagamento
        pagamentoDiv.style.display = 'block';
    });

    pagarBtn.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;

        // Confirmação final do pagamento
        const confirmacao = confirm(`Tem certeza que deseja pagar a parte da empresa (€ ${total.toFixed(2) * 0.25})?`);

        if (confirmacao) {
            // Simular pagamento (exibir mensagem)
            const mensagem = `O pagamento de € ${total.toFixed(2) * 0.25} foi feito para ${nome} através do número de telefone ${telefone}.`;
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
