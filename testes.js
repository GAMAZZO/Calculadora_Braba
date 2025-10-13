let resultado = 12.57

const ehInteiro = Number.isInteger(resultado)
console.log(ehInteiro);

if (ehInteiro === true) {
    console.log();
    resultado.toFixed(0)
}else{
    console.log(resultado.toFixed(2));
    
}

