var A = 0
var B = 0
function correlacao() {
    //exemplos
    //X -  12.38;14.56;14.67;15.98;17.65
    // Y - 2003;2004;2005;2006;2007

    // buscar valores do HTML
    var dependentes = document.getElementById("dependente").value
    var independentes = document.getElementById("independente").value

    // separar os caracteres em um array quando encontrar ";"
    var X = independentes.split(";")
    var Y = dependentes.split(";")

    // cabeçalho da tabela
    var tabela = "<table><tr><td>Dependente</td><td>Independente</td><td>Xi Yi</td><td> Xi <sup>2</sup></td><td>Yi <sup>2</sup></td></tr>"

    // somatoria do Y e X
    var somaY = 0
    var somaX = 0
    var somaXY = 0
    var somaX_quadrado = 0
    var somaY_quadrado = 0

    // Coeficiente de Correlação
    var R_numerador = 0
    var R_denominador = 0
    var R = 0

    // Regresão 
    var a_numerador = 0
    var a_denominador = 0

    // media das variaveis
    var mediaY = 0
    var mediaX = 0

    // projeção
    var projecao = 0

    for (let i = 0; i < Y.length; i++) {
        // somatoria das variaveis
        somaX += Number(X[i])
        somaY += Number(Y[i])

        // somatoria das multiplicações
        somaXY += Number(X[i]) * Number(Y[i])

        // somatoria do X ao quadrado
        somaX_quadrado += Number(X[i] * X[i])

        // somatoria do Y ao quadrado
        somaY_quadrado += Number(Y[i] * Y[i])

    }
    R_numerador = ((((Y.length) * somaXY) - ((somaX) * (somaY))))
    R_denominador = (((((Y.length) * somaX_quadrado) - (somaX ** 2)) * (((Y.length) * somaY_quadrado) - (somaY ** 2))) ** (1 / 2))
    R = (R_numerador / R_denominador).toFixed(2)
    mediaX = (somaX / (X.length)).toFixed(2)
    mediaY = (somaY / (Y.length)).toFixed(2)


    a_numerador = (((Y.length) * somaXY) - ((somaX) * (somaY)))
    a_denominador = (((Y.length) * somaX_quadrado) - ((somaX) ** 2))
    A = (a_numerador / a_denominador).toFixed(2)

    B = (mediaY - (A * mediaX)).toFixed(2)

    console.log("Valor dependente ", Y)
    console.log("Valor independente ", X)
    console.log("media Y: ", mediaY)
    console.log("media X: ", mediaX)
    console.log("R numerador: ", R_numerador)
    console.log("R denominador: ", R_denominador)
    console.log("R :", R)
    console.log("a numerador: ", a_numerador)
    console.log("a denominador: ", a_denominador)
    console.log("a :", A)
    console.log("b :", B)


    // criação da tabela
    for (let i = 0; i < X.length; i++) {
        tabela += `<tr><td>${Y[i]}</td><td>${X[i]}</td><td>${Number(X[i]) * Number(Y[i])} <td>${Number(X[i] * X[i])}</td><td>${Number(Y[i] * Y[i])}</tr>`
    }
    tabela += `<tr class = "final"><td>${somaY}</td><td>${(somaX).toFixed(2)}</td><td>${somaXY}</td><td>${somaX_quadrado}</td><td>${somaY_quadrado}</td></tr></table>`


    var tabela2 = `<table class= "tabela2"><tr><td rowspan = '2'>Media</td><td>Y: ${mediaY}</td></tr>`
    tabela2 += `<tr><td>X: ${mediaX}</td></tr>`
    tabela2 += `<tr><td>R:</td><td> ${R*100}%</td></tr>`
    tabela2 += `<tr><td> a: </td><td>${A}</tr>`
    tabela2 += `<tr><td> b: </td><td>${B}</tr>`
    tabela2 += `<tr><td> projeção </td><td> <input class = "tabela" type = "text" placeholder = "Y" id = "y"> = ${A}. <input class = "tabela" type = "text" id = "x"placeholder = "X"> + ${B}</tr></table>`

    // projecao = A * 
    
    document.getElementById("resultado").innerHTML = tabela + "<br>" + tabela2 + "<br>" + "<button onclick = 'projecao(A,B)'class='projecao'>Projetar</button>"
    
    return A, B

}
function projecao(A, B) {
    var projecaoY = document.getElementById("y").value
    var projecaoX = document.getElementById("x").value
    console.log("Projeção Y ", projecaoY)
    console.log("Projeção X ", projecaoX)
    console.log("A ", A)
    console.log("B ", B)

    if(projecaoY == ""){
        projecaoY = (((Number(projecaoX) * A)) + Number(B))
        console.log("So ele ", projecaoY)
        document.getElementById("y").value = projecaoY
    }
    else if (projecaoX == ""){
        projecaoX = ((projecaoY - B) / A)
        document.getElementById("x").value = projecaoX
    }
    console.log("projeção Y ", projecaoY)
    console.log("projeção X ", projecaoX)
}