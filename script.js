<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaxiPay</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body>
    <h1 class="titulo">TaxiPay</h1>
    <form id="simulador-form">
        <label for="carro">Insira o carro usado para a viagem:</label>
        <select id="carro" name="carro">
            <option value="1">Peugeot 208</option>
            <option value="2">Mercedes GLA</option>
            <option value="3">Porsche Cayenne GTS</option>
        </select>

        <label for="tempo">Tempo percorrido (minutos):</label>
        <input type="number" id="tempo" name="tempo" step="0.01" placeholder="Minutos" required>

        <label for="distancia">Distância percorrida (km):</label>
        <input type="number" id="distancia" name="distancia" step="0.001" placeholder="Quilômetros" required>

        <label for="diasemana">Dia da semana:</label>
        <select id="diasemana" name="diasemana" required>
            <option value="segunda">segunda-feira</option>
            <option value="terca">terça-feira</option>
            <option value="quarta">quarta-feira</option>
            <option value="quinta">quinta-feira</option>
            <option value="sexta">sexta-feira</option>
            <option value="sabado">sábado</option>
            <option value="domingo">domingo</option>
        </select>

        <label for="isferiado">É feriado?:</label>
        <select id="isferiado" name="isferiado" required>
            <option value="nao">não</option>
            <option value="sim">sim</option>
        </select>

        <button type="submit">Calcular</button>
    </form>
    
    <div id="resultado"></div>

    <div id="pagamento" style="display: none;">
        <h2>Informações para Pagamento da Empresa</h2>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" placeholder="Seu nome" required>

        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" placeholder="Seu telefone" required pattern="[0-9]{9}">

        <label for="cartao">Número do Cartão:</label>
        <input type="number" id="cartao" name="cartao" placeholder="Número do cartão (1-100)" required min="1" max="100">

        <button id="pagar" disabled>Confirmar Pagamento</button>
    </div>

    <div id="historico" style="display: none;">
        <h2>Histórico de Transações</h2>
        <div id="historico-transacoes"></div>
    </div>
</body>
</html>
