// VARIÁVEIS DE ESTADO
let primeiroValor = null;
let operadorPendente = null;
let limpaDisplay = true;

// FUNÇÕES MATEMÁTICAS (Sua Lógica Pura)
function somar(n1, n2) { return n1 + n2; }
function subtrair(n1, n2) { return n1 - n2; }
function multiplicar(n1, n2) { return n1 * n2; }
function dividir(n1, n2) {
    if (n2 === 0) return 'Não é possível dividir por zero';
    return n1 / n2;
}

// CAPTURA DE ELEMENTOS
const display = document.getElementById('display'); // document Representa todo o arquivo HTML
const bntNumeros = document.querySelectorAll('.numero');
const btnOperadores = document.querySelectorAll('.operador');
const btnLimpar = document.querySelectorAll('.btn-limpar'); 

// --- FUNÇÕES DE CONTROLE ---

function limparTudo() {
    display.value = ''; 
    primeiroValor = null;
    operadorPendente = null;
    limpaDisplay = true; 
}

function apagarUltimoDigito() {
    let valorAtual = display.value;
    display.value = valorAtual.slice(0, -1);
    
    if (display.value === '' || display.value === '-') {
        limparTudo();
    }
}

// LÓGICA DE CÁLCULO (O MOTOR)
function executarCalculo(){
    if(primeiroValor === null || operadorPendente === null){
        return;
    }

    const segundoValor = parseFloat(display.value);
    let resultado;

    switch(operadorPendente){
        case '+': resultado = somar(primeiroValor, segundoValor); break;
        case '-': resultado = subtrair(primeiroValor, segundoValor); break;
        case '*': resultado = multiplicar(primeiroValor, segundoValor); break;
        case '/': resultado = dividir(primeiroValor, segundoValor); break;
        default: return;
    }


    if (typeof resultado === 'number' && Number.isInteger(resultado)) {
        display.value = resultado;
        primeiroValor = resultado;
    } else if (typeof resultado === 'number' && !Number.isInteger(resultado)) {
        const resultadoString = String(resultado);
        const indiceDoPonto = resultadoString.indexOf('.');

        if (indiceDoPonto !== -1) {
            const casasDecimais = resultadoString.length - indiceDoPonto - 1;

            if (casasDecimais > 2) {
                display.value = resultado;
            } else {
                display.value = resultado.toFixed(2);
            }
        } else {
            display.value = resultado;
        }

        primeiroValor = resultado;
    } else {
        display.value = resultado;
        primeiroValor = null;
    }

    operadorPendente = null;
    limpaDisplay = true;
}
// --- LISTENERS ---

// Listener para Botões Numéricos
function adicionarAoDisplay(valor) {
    if (valor === '.' && display.value.includes('.')){
        return
    }

    if (limpaDisplay || display.value === '' || display.value === '0') {
        if (display.value === '0' && valor === '0') {  
            return;
        }
        
        if (valor === '.') {
            display.value = '0.' // Se a tela está vazia/limpa ou apenas com '0', garante que comece com '0.'
        }else{
            display.value = valor;
        }
        
        limpaDisplay = false; // >>> Ponto Chave: Diz ao JS: "Parar de limpar! Comece a concatenar."
    } else {
        // Esta parte executa APENAS quando limpaDisplay é false
        display.value += valor; // Concatenar o dígito
    }
}


// Listener para Botões dos Números
bntNumeros.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.getAttribute('data-valor');
        adicionarAoDisplay(valor);
    });
});


// Listener para Botões Operadores (+, -, *, /, =)
btnOperadores.forEach(botao => {
    botao.addEventListener('click', () => {
        const operador = botao.getAttribute('data-valor');
        // adicionarAoDisplay(operador) // Adiciona o operado no display
        
        if (operador === '=') {
            executarCalculo();
            return;
        }
        
        if (primeiroValor !== null && operadorPendente !== null) {
            executarCalculo();
        }
        
    
        primeiroValor = parseFloat(display.value);
        operadorPendente = operador;
        limpaDisplay = true;
    });
});

// Listener para Botões de Limpeza (C e X)
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