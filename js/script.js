function calcularCustoMegaSena() {
    const valorAposta = parseFloat(document.getElementById('valorAposta').value);
    const dezenas = parseInt(document.getElementById('dezenas').value, 10);
    const quantidadeJogosInput = parseInt(document.getElementById('quantidadeJogos').value, 10);
    const cotas = parseInt(document.getElementById('cotas').value, 10);
    const teimosinha = parseInt(document.getElementById('teimosinha').value, 10); // Novo campo

    // Limpar mensagens de erro anteriores
    document.getElementById('error-valorAposta').innerText = '';
    document.getElementById('error-dezenas').innerText = '';
    document.getElementById('error-quantidadeJogos').innerText = '';
    document.getElementById('error-cotas').innerText = '';
    document.getElementById('error-teimosinha').innerText = ''; // Novo campo

    let valid = true;

    // Validação dos campos
    if (valorAposta <= 0) {
        document.getElementById('error-valorAposta').innerText = 'O valor da aposta deve ser maior que 0.';
        valid = false;
    }

    if (![6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(dezenas)) {
        document.getElementById('error-dezenas').innerText = 'A quantidade de dezenas deve ser entre 6 e 20.';
        valid = false;
    }

    // Quantidade de jogos máxima permitida para cada quantidade de dezenas
    const quantidadeJogosMaxima = {
        6: 1,
        7: 7,
        8: 28,
        9: 84,
        10: 210,
        11: 462,
        12: 924,
        13: 1716,
        14: 3003,
        15: 5005,
        16: 8008,
        17: 12376,
        18: 18564,
        19: 27132,
        20: 38760
    };

    if (quantidadeJogosInput > quantidadeJogosMaxima[dezenas]) {
        document.getElementById('error-quantidadeJogos').innerText = `A quantidade de jogos não pode exceder ${quantidadeJogosMaxima[dezenas]} para ${dezenas} dezenas.`;
        valid = false;
    }

    if (cotas <= 0) {
        document.getElementById('error-cotas').innerText = 'O número de cotas deve ser maior que 0.';
        valid = false;
    }

    if (!valid) {
        return; // Interrompe a execução se houver erros
    }

    // Preços das apostas baseados no valor da aposta simples
    const precoBase = {
        6: valorAposta,
        7: valorAposta * 7,
        8: valorAposta * 28,
        9: valorAposta * 84,
        10: valorAposta * 210,
        11: valorAposta * 462,
        12: valorAposta * 924,
        13: valorAposta * 1716,
        14: valorAposta * 3003,
        15: valorAposta * 5005,
        16: valorAposta * 8008,
        17: valorAposta * 12376,
        18: valorAposta * 18564,
        19: valorAposta * 27132,
        20: valorAposta * 38760
    };

    // Cálculo do custo total
    const quantidadeJogos = quantidadeJogosInput;
    const precoPorJogo = precoBase[dezenas];
    const custoSemTeimosinha = precoPorJogo * quantidadeJogos;
    const custoTotal = custoSemTeimosinha * (teimosinha || 1); // Multiplica pelos concursos consecutivos
    const custoPorCota = custoTotal / cotas;

    // Exibição do resultado
    const resultado = `
        <div style="
            background-color: #f9f9f9; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            padding: 20px; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
            max-width: 500px; 
            margin: 0 auto; 
            text-align: center;">
            <div style="font-size: 1.5em; color: #333; margin-bottom: 15px;">Exibição do Resultado</div>
            <div style="font-size: 0.8em; color: #555; line-height: 1.5; margin-bottom: 10px; background-color: #e3efc2; border-radius: 8px;">
                <span style="color: rgb(38, 0, 254);">Quantidade de Jogos:</span> <strong>${quantidadeJogos}</strong><br>
                Custo Total: <strong>R$${custoTotal.toFixed(2)}</strong><br>
                Custo por Cota/Pessoa: <strong>R$${custoPorCota.toFixed(2)}</strong><br>
                Concursos consecutivos (Teimosinha): <strong>${teimosinha || "Nenhum"}</strong>
            </div>
        </div><br /> <hr />
    `;

    document.getElementById('resultado').innerHTML = resultado;
}
