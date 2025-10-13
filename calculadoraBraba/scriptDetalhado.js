// ====================================================================
// 1. VARIÁVEIS DE ESTADO (O Motor da Calculadora)
// Essas variáveis rastreiam o que aconteceu antes, o que deve acontecer agora, e o que virá depois.
// ====================================================================

let primeiroValor = null;        // Armazena o primeiro número do cálculo (Ex: o '5' em 5 + 3).
let operadorPendente = null;     // Armazena o operador que será usado (Ex: o '+' pendente).
let limpaDisplay = true;         // Flag (bandeira) que diz ao JS se a próxima digitação deve limpar o display.

// ====================================================================
// 2. FUNÇÕES MATEMÁTICAS (A Lógica Pura que você já dominou)
// ====================================================================

function somar(n1, n2) { return n1 + n2; }
function subtrair(n1, n2) { return n1 - n2; }
function multiplicar(n1, n2) { return n1 * n2; }
function dividir(n1, n2) {
    // Tratamento de erro: retorna uma String se a divisão por zero for tentada.
    if (n2 === 0) return 'Não é possível dividir por zero';
    return n1 / n2;
}

// ====================================================================
// 3. CAPTURA DE ELEMENTOS DO DOM
// Captura os elementos do HTML para que o JavaScript possa interagir com eles.
// ====================================================================

const display = document.getElementById('display');
const bntNumeros = document.querySelectorAll('.numero');
const btnOperadores = document.querySelectorAll('.operador');
const btnLimpar = document.querySelectorAll('.btn-limpar');

// ====================================================================
// 4. FUNÇÕES DE CONTROLE (Botões C e X)
// ====================================================================

// Zera completamente o estado da calculadora.
function limparTudo() {
    display.value = ''; 
    primeiroValor = null;
    operadorPendente = null;
    limpaDisplay = true; 
}

// Remove o último dígito do display.
function apagarUltimoDigito() {
    let valorAtual = display.value;
    
    // O método slice(0, -1) remove o último caractere da string.
    display.value = valorAtual.slice(0, -1);
    
    // Se o display ficar vazio (ou com um sinal negativo solto), reinicia o estado.
    if (display.value === '' || display.value === '-') {
        limparTudo();
    }
}

// ====================================================================
// 5. LÓGICA DE CÁLCULO (O Switch para escolher a operação)
// É chamada pelo botão de operador ou pelo botão de igual.
// ====================================================================

function executarCalculo(){
    // Condição de segurança: Se não há valor ou operador, não faz nada.
    if(primeiroValor === null || operadorPendente === null){
        return;
    }

    // Pega o valor atual do display como o segundo número do cálculo.
    const segundoValor = parseFloat(display.value);
    let resultado;

    // Usa o operador pendente para escolher a função matemática.
    switch(operadorPendente){
        case '+': resultado = somar(primeiroValor, segundoValor); break;
        case '-': resultado = subtrair(primeiroValor, segundoValor); break;
        case '*': resultado = multiplicar(primeiroValor, segundoValor); break;
        case '/': resultado = dividir(primeiroValor, segundoValor); break;
        default: return;
    }

    // --- Tratamento do Resultado ---
    
    if(typeof resultado === 'number'){
        // Exibe o resultado formatado no display.
        display.value = resultado.toFixed(2);
        
        // Armazena o resultado para o próximo cálculo contínuo (Ex: 5 + 3 = 8. O 8 é o próximo primeiroValor).
        primeiroValor = resultado;
    }else{
        // Se for a string de erro (divisão por zero), exibe a mensagem.
        display.value = resultado;
        primeiroValor = null; // Limpa o valor para não continuar calculando sobre o erro.
    }

    // Reseta o estado para aceitar a próxima operação.
    operadorPendente = null;
    limpaDisplay = true;
}

// ====================================================================
// 6. LISTENERS: A Resposta aos Cliques
// ====================================================================

// --- Listener para Botões Numéricos (0-9) ---

function adicionarAoDisplay(valor) {
    // Condição para SUBSTITUIR o valor atual (primeiro dígito, após um '=', ou se for o '0' inicial).
    if (limpaDisplay || display.value === '' || display.value === '0') {
        
        // Impedir que se digite '0000...' se o display já for '0'.
        if (display.value === '0' && valor === '0') {
            return;
        }
        
        display.value = valor;
        limpaDisplay = false; // Indica que já começamos a digitar.
    } else {
        // Condição para APENAS ADICIONAR o dígito ao final.
        display.value += valor;
    }
}

bntNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.getAttribute('data-valor');
        adicionarAoDisplay(valor);
    });
});

// --- Listener para Botões Operadores (+, -, *, /, =) ---

btnOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        const operador = botao.getAttribute('data-valor');
        
        // 1. AÇÃO DO BOTÃO IGUAL (=)
        if (operador === '=') {
            executarCalculo();
            return; // Interrompe para não executar a lógica de armazenamento abaixo.
        }

        // 2. AÇÃO DE CÁLCULO CONTÍNUO (Ex: 5 + 3, e clica em + novamente)
        // Se já temos um primeiroValor e um operador, executa a operação pendente.
        if (primeiroValor !== null && operadorPendente !== null) {
            executarCalculo();
        }

        // 3. ARMAZENAMENTO DO NOVO ESTADO
        primeiroValor = parseFloat(display.value); // Pega o número digitado.
        operadorPendente = operador;             // Salva o novo operador.
        limpaDisplay = true;                     // Define para limpar na próxima digitação.
    });
});

// --- Listener para Botões de Limpeza (C e X) ---

btnLimpar.forEach(botao => {
    botao.addEventListener('click', () => {
        const controle = botao.getAttribute('data-valor');

        if (controle === 'C') {
            limparTudo();
        } else if (controle === 'X') {
            apagarUltimoDigito();
        }
    });
});