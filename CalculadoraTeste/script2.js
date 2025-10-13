function somar(n1, n2) {
  return n1 + n2
}
function subtrair(n1, n2) {
  return n1 - n2
}
function multiplicar(n1, n2) {
  return n1 * n2
}
function dividir(n1, n2) {
  if(n2 === 0)
    return('Não é possivel dividir por zero')
  return n1 / n2
}

function calculadora() {
  let opcao
  let resultado = 0

  do{
    
    let linhaResultado = ''

    if(resultado !== 0){
      let valorExibido = (typeof resultado === 'number') ? resultado.toFixed(2) : resultado
      linhaResultado = `O resultado anterior é ${valorExibido}`
    }

      
      opcao = prompt(`
      --- Calculadora ---

      ${linhaResultado}

      Escolha uma opção
      1 - Somar
      2 - Subtrair
      3 - Multiplicar
      4 - Dividir
      0 - Sair
      `)
      

      if (opcao === '0'){
        alert('Saindo da Calculadora')
        break
      }

      let n1
      let n2

      if(resultado === 0){
        n1 = parseFloat(prompt('Digite o Primeiro número'))
        n2 = parseFloat(prompt('Digite o Segundo número'))
      }else{    
        n1 = resultado 
        n2 = parseFloat(prompt(`
          O primeiro numero é: ${n1} 
          Digite o Segundo número`))
      }

      if (isNaN(n1) || isNaN(n2)) {
        alert('Entrada inválida, or favor insira apenas números')
        continue
      }

      switch (opcao) {
        case '1':
          resultado = somar(n1,n2)
          break;
      
        case '2':
          resultado = subtrair(n1,n2)
          break;
      
        case '3':
          resultado = multiplicar(n1,n2)
          break;
      
        case '4':
          resultado = dividir(n1,n2)
          break;
      
        default:
          alert('Opção inválida')
          continue;
      }

      if(typeof resultado === 'number'){
        alert(`O resultado deu ${resultado.toFixed(2)}`)
      }else{
        alert(resultado)
      }  

  } while(true)
}

calculadora()

