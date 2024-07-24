let displayAtual = document.getElementById('display-atual');
let displayAnterior = document.getElementById('display-anterior');
let operacaoAnteriorDisplay = document.getElementById('operacao-anterior');
let operandoAtual = '';
let operandoAnterior = '';
let operacao = undefined;

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        adicionarNumero(key);
    } else if (key === '.') {
        adicionarNumero(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        escolherOperacao(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcular();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        limparDisplay();
    }
});

function adicionarNumero(numero) {
    if (numero === '.' && operandoAtual.includes('.')) return;
    operandoAtual = operandoAtual.toString() + numero.toString();
    atualizarDisplay();
}

function atualizarDisplay() {
    displayAtual.textContent = operandoAtual;
    displayAnterior.textContent = operandoAnterior + ' ' + (operacao || '');
}

function escolherOperacao(op) {
    if (operandoAtual === '') return;
    if (operandoAnterior !== '') {
        calcular();
    }
    operacao = op;
    operandoAnterior = operandoAtual;
    operandoAtual = '';
    atualizarDisplay();
}

function calcular() {
    let computacao;
    const anterior = parseFloat(operandoAnterior);
    const atual = parseFloat(operandoAtual);
    if (isNaN(anterior) || isNaN(atual)) return;
    switch (operacao) {
        case '+':
            computacao = anterior + atual;
            break;
        case '-':
            computacao = anterior - atual;
            break;
        case '*':
            computacao = anterior * atual;
            break;
        case '/':
            computacao = anterior / atual;
            break;
        case '%':
            computacao = anterior % atual;
            break;
        default:
            return;
    }
    operandoAtual = computacao;
    operacao = undefined;
    operandoAnterior = '';
    atualizarDisplay();
}

function limparDisplay() {
    operandoAtual = '';
    operandoAnterior = '';
    operacao = undefined;
    atualizarDisplay();
}

function backspace() {
    operandoAtual = operandoAtual.toString().slice(0, -1);
    atualizarDisplay();
}

function calcularRaizQuadrada() {
    if (operandoAtual === '') return;
    operandoAtual = Math.sqrt(parseFloat(operandoAtual)).toString();
    atualizarDisplay();
}
