function uniforme() {
    var elemento = document.getElementById("elemento_uniforme").value
    var ponto_minimo = Number(document.getElementById("ponto_minimo_uniforme").value)
    var ponto_maximo = Number(document.getElementById("ponto_maximo_uniforme").value)
    var selecao = document.getElementById("opcao_uniforme")
    var vetor = elemento.split(';')
    var media = Number(ponto_maximo + ponto_minimo) / 2
    var variancia = (((ponto_maximo - ponto_minimo) ** 2) / 12)
    var desvio_padrao = (variancia ** (1 / 2))
    var intervalo = 0

    console.log("maximo ", ponto_maximo)
    console.log("minimo ", ponto_minimo)
    console.log("subtração max - min ", (ponto_maximo - ponto_minimo))
    console.log("media: ", media)
    console.log("variancia: ", variancia)
    console.log("desvio padrao: ", desvio_padrao)

    if (selecao.value == "maior_uniforme") {
        intervalo = Number(ponto_maximo - elemento).toFixed(1)
    }
    if (selecao.value == "menor_uniforme") {
        intervalo = Number(elemento - ponto_minimo).toFixed(1)
    }
    if (selecao.value == "entre_uniforme") {
        intervalo = Number(vetor[1] - vetor[0]).toFixed(1)
    }
    var probabilidade_uniforme = (((1 / (ponto_maximo - ponto_minimo)) * intervalo) * 100).toFixed(2)

    console.log("Intervalo soma: ", elemento, " - ", ponto_minimo)
    console.log("Intervalo: ", intervalo)

    var result = `<table class ="gauss"><tr><td>Probabilidade:</td><td>${probabilidade_uniforme}%</td><tr>`
    result += `<tr><td>Variancia</td><td>${variancia.toFixed(2)}</td></tr>`
    result += `<tr><td>Desvio Padrão</td><td>${(desvio_padrao).toFixed(2)}</td></tr>`
    result += `<tr><td>Coeficiente de Variação</td><td>${((desvio_padrao / media) * 100).toFixed(0)}%</td></tr>`
    document.getElementById("saida_uniforme").innerHTML = result
}


function binominal() {
    var elemento = Number(document.querySelector('input#elemento_binominal').value)
    var sucesso = ((document.getElementById('sucesso').value) / 100)
    var fracasso = ((document.querySelector('input#fracasso').value) / 100)
    var evento = document.querySelector('input#evento').value
    var media = 0
    var vetor = evento.split(";")
    var desvio_padrao = 0
    var analise_combinatoria = 0
    var denominador = Number(elemento - vetor[0])
    var probabilidade_binominal = 0;
    var aux_elemento = Number(elemento)
    var n = 0;

    console.log("sucesso ", sucesso)
    console.log("elemento ", elemento)
    console.log("evento: ", vetor[0])

    if (vetor.length == 1) {
        if (elemento < 0) {
            alert("Valor invalido");
        }
        else if (elemento == 0) {
            alert("valor invalido");
        }
        n = 1
        if (elemento == vetor[0]) {
            n = 1
        }
        while (elemento > vetor[0]) {
            n *= elemento;
            elemento = elemento - 1
            console.log(`rodada ${elemento} `)
            console.log(`n na ${elemento}° posicao vale ${n}`)
        }
        var aux = 1;
        console.log("--------------------------")
        console.log("denominador ", denominador)
        while (denominador > 1) {
            aux *= denominador;
            denominador = denominador - 1
            console.log(`rodada ${denominador} `)
            console.log(`n na ${denominador}° posicao vale ${aux}`)
        }
        console.log("denominador final: ", aux)

        analise_combinatoria = Number(n / aux).toFixed(0)
        media = (aux_elemento * sucesso)
        desvio_padrao = ((aux_elemento * sucesso * fracasso) ** (1 / 2))

        probabilidade_binominal = analise_combinatoria * (sucesso ** (vetor[0])) * (fracasso ** (aux_elemento - vetor[0]))

        console.log("aux elemento ", aux_elemento)
        console.log("media ", media)
        console.log("desvio padrao ", `${aux_elemento} X ${sucesso} X ${fracasso} ^ ${1 / 2}`)
        console.log("Analise Combinatoria: ", analise_combinatoria)

    }
    console.log("vetor ", vetor)
    if (vetor.length > 1) {
        for (let i = 0; i < vetor.length; i++) {
            // caso o evento seja igual a zero
            if (vetor[i] == 0) {
                console.log("sucesso ", (sucesso ** vetor[i]))
                console.log("fracasso ", fracasso ** (aux_elemento - vetor[i]))
                probabilidade_binominal += (sucesso ** vetor[i]) * (fracasso ** (aux_elemento - vetor[i]))
                console.log(i + " parte da probabilidade = " + probabilidade_binominal)
            }
            // caso o evento seja igual a um
            else if (vetor[i] == 1) {
                probabilidade_binominal += aux_elemento * (sucesso ** vetor[i]) * (fracasso ** (aux_elemento - vetor[i]))
                console.log(i + " parte da probabilidade = " + probabilidade_binominal)
            }
            // caso o evento seja maior que 1
            else if (vetor[i] > 1) {
                // fazer a analise combinatoria
                n = 1
                elemento = aux_elemento
                // fatorial do elemento (valor do n) até econtrar o valor do evento
                while (elemento > vetor[0]) {
                    n *= elemento;
                    elemento = elemento - 1
                }
                denominador = (aux_elemento - vetor[i])
                aux = 1
                while (denominador > 1) {
                    aux *= denominador;
                    denominador = denominador - 1
                }
                analise_combinatoria = (n / aux) / vetor[i]
                probabilidade_binominal += analise_combinatoria * (sucesso ** vetor[i]) * (fracasso ** (aux_elemento - vetor[i]))

                console.log("sucesso ", (sucesso ** vetor[i]))
                console.log("fracasso ", (fracasso ** (aux_elemento - vetor[i])))
                console.log("analise ", analise_combinatoria)
                console.log(i + " parte da probabilidade = " + probabilidade_binominal)
            }

        }
    }

    console.log("Probabilidade: ", ((probabilidade_binominal) * 100).toFixed(2), "%")
    var result = `<table class = "gauss"><tr><td>Probabilidade:</td><td>${((probabilidade_binominal) * 100).toFixed(2)}%</td></tr>`
    result += `<tr><td>Media</td><td>${media}</td></tr>`
    result += `<tr><td>Desvio Padrão</td><td>${(desvio_padrao).toFixed(2)}</td></tr>`
    result += `<tr><td>Coeficiente de Variação</td><td>${((desvio_padrao / media) * 100).toFixed(0)}%</td></tr>`
    document.getElementById("saida_binominal").innerHTML = result
}

function normal() {
    var elemento = document.getElementById("elemento_normal").value
    var media = document.getElementById("media_normal").value
    var desvio = document.getElementById("desvio_normal").value
    var opcao = document.getElementById("opcao_Normal")
    var vetor = elemento.split(";")
    var eixo_x = ('Z,0,1,2,3,4,5,6,7,8,9,0.0,0.0000,0.0040,0.0080,0.0120,0.0160,0.0199,0.0239,0.0279,0.0319,0.0359,0.1,0.0398,0.0438,0.0478,0.0517,0.0557,0.0596,0.0636,0.0675,0.0714,0.0753,0.2,0.0793,0.0832,0.0871,0.0910,0.0948,0.0987,0.1026,0.1064,0.1103,0.1141,0.3,0.1179,0.1217,0.1255,0.1293,0.1331,0.1368,0.1406,0.1443,0.1480,0.1517,0.4,0.1554,0.1591,0.1628,0.1664,0.1700,0.1736,0.1772,0.1808,0.1844,0.1879,0.5,0.1915,0.1950,0.1985,0.2019,0.2054,0.2088,0.2123,0.2157,0.2190,0.2224,0.6,0.2257,0.2291,0.2324,0.2357,0.2389,0.2422,0.2454,0.2486,0.2517,0.2549,0.7,0.2580,0.2611,0.2642,0.2673,0.2704,0.2734,0.2764,0.2794,0.2823,0.2852,0.8,0.2881,0.2910,0.2939,0.2967,0.2995,0.3023,0.3051,0.3078,0.3106,0.3133,0.9,0.3159,0.3186,0.3212,0.3238,0.3264,0.3289,0.3315,0.3340,0.3365,0.3389,1.0,0.3413,0.3438,0.3461,0.3485,0.3508,0.3531,0.3554,0.3577,0.3599,0.3621,1.1,0.3643,0.3665,0.3686,0.3708,0.3729,0.3749,0.3770,0.3790,0.3810,0.3830,1.2,0.3849,0.3869,0.3888,0.3907,0.3925,0.3944,0.3962,0.3980,0.3997,0.4015,1.3,0.4032,0.4049,0.4066,0.4082,0.4099,0.4115,0.4131,0.4147,0.4162,0.4177,1.4,0.4192,0.4207,0.4222,0.4236,0.4251,0.4265,0.4279,0.4292,0.4306,0.4319,1.5,0.4332,0.4345,0.4357,0.4370,0.4382,0.4394,0.4406,0.4418,0.4429,0.4441,1.6,0.4452,0.4463,0.4474,0.4484,0.4495,0.4505,0.4515,0.4525,0.4535,0.4545,1.7,0.4554,0.4564,0.4573,0.4582,0.4591,0.4599,0.4608,0.4616,0.4625,0.4633,1.8,0.4641,0.4649,0.4656,0.4664,0.4671,0.4678,0.4686,0.4693,0.4699,0.4706,1.9,0.4713,0.4719,0.4726,0.4732,0.4738,0.4744,0.4750,0.4756,0.4761,0.4767,2.0,0.4772,0.4778,0.4783,0.4788,0.4793,0.4798,0.4803,0.4808,0.4812,0.4817,2.1,0.4821,0.4826,0.4830,0.4834,0.4838,0.4842,0.4846,0.4850,0.4854,0.4857,2.2,0.4861,0.4864,0.4868,0.4871,0.4875,0.4878,0.4881,0.4884,0.4887,0.4890,2.3,0.4893,0.4896,0.4898,0.4901,0.4904,0.4906,0.4909,0.4911,0.4913,0.4916,2.4,0.4918,0.4920,0.4922,0.4925,0.4927,0.4929,0.4931,0.4932,0.4934,0.4936,2.5,0.4938,0.4940,0.4941,0.4943,0.4945,0.4946,0.4948,0.4949,0.4951,0.4952,2.6,0.4953,0.4955,0.4956,0.4957,0.4959,0.4960,0.4961,0.4962,0.4963,0.4964,2.7,0.4965,0.4966,0.4967,0.4968,0.4969,0.4970,0.4971,0.4972,0.4973,0.4974,2.8,0.4974,0.4975,0.4976,0.4977,0.4977,0.4978,0.4979,0.4979,0.4980,0.4981,2.9,0.4981,0.4982,0.4982,0.4983,0.4984,0.4984,0.4985,0.4985,0.4986,0.4986,3.0,0.4987,0.4987,0.4987,0.4988,0.4988,0.4989,0.4989,0.4989,0.4990,0.4990,3.1,0.4990,0.4991,0.4991,0.4991,0.4992,0.4992,0.4992,0.4992,0.4993,0.4993,3.2,0.4993,0.4993,0.4994,0.4994,0.4994,0.4994,0.4994,0.4995,0.4995,0.4995,3.3,0.4995,0.4995,0.4995,0.4996,0.4996,0.4996,0.4996,0.4996,0.4996,0.4997,3.4,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4998,3.5,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,3.6,0.4998,0.4998,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,3.7,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,3.8,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,3.9,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000').split(',')
    var tabela_gaus = []
    var rodada = 0
    var result = " "
    var eixo_y = 0
    var eixo_y_2 = 0
    result += "<table class = 'gauss'>";
    // document.getElementById("saida_normal").innerHTML = "testando"

    for (let i = 0; i < 41; i++) {
        tabela_gaus[i] = []
        // eixo Y da tabela
        result += `<tr>`;
        for (let j = 0; j < 11; j++) {
            tabela_gaus[i][j] = (eixo_x[rodada])
            rodada++
            // eixo X da tabela
            result += `<td>${tabela_gaus[i][j]}</td>`;
        }
        result += "</tr>"
    }
    result += "</table>";
    console.log("tabela ", result)
    console.log("vetor ", vetor)
    console.log("Elemento", elemento.length)



    var Z_media = 0
    var Z1 = ((vetor[0] - media) / desvio).toFixed(2)
    var Z2 = ((vetor[1] - media) / desvio).toFixed(2)
    var checar_negativo = 0
    var checar_negativo_2 = 0

    // caso o valor seja menor que a média, o mesmo terá um simbolo negativo, portanto vou pegar a posição posterir
    if (Z1 < Z_media) {
        checar_negativo = 1
    }
    if (Z2 < Z_media) {
        checar_negativo_2 = 1
    }


    toString(Z1)
    toString(Z2)

    console.log("media: ", Z_media)
    console.log("Z1: ", Z1)
    console.log("Z2: ", Z2)
    console.log("tamanho Z1: ", Z1.length)
    // primeiro valor
    // pegar string por string
    var primeira_parte = Z1[0 + checar_negativo]
    primeira_parte += Z1[1 + checar_negativo]
    primeira_parte += Z1[2 + checar_negativo]
    let segunda_parte = Number(Z1[3 + checar_negativo])
    let valor = 0

    // segundo valor
    let valor2 = 0
    var primeira_parte_2 = Z2[0 + checar_negativo_2]
    primeira_parte_2 += Z2[1 + checar_negativo_2]
    primeira_parte_2 += Z2[2 + checar_negativo_2]
    let segunda_parte_2 = Number(Z2[3 + checar_negativo_2])

    toString(primeira_parte)
    toString(primeira_parte_2)
    console.log("primeira parte ", primeira_parte)
    console.log("segunda parte ", segunda_parte)
    console.log("primeira parte 2 ", primeira_parte_2)
    console.log("segunda parte 2", segunda_parte_2)
    console.log("primeira parte do vetor", tabela_gaus[0])
    // buscar o eixo Y do primeiro valor
    for (let i = 0; i < 41; i++) {
        for (j = 0; j < 11; j++) {
            if (tabela_gaus[i][j] === primeira_parte) {
                eixo_y = tabela_gaus[i]
            }
            break;

        }
    }

    // buscar o eixo Y do segundo valor
    for (let i = 0; i < 41; i++) {
        for (j = 0; j < 11; j++) {
            if (tabela_gaus[i][j] === primeira_parte_2) {
                eixo_y_2 = tabela_gaus[i]
            }
            break;
        }
    }
    valor = eixo_y[segunda_parte + 1]
    valor2 = eixo_y_2[segunda_parte_2 + 1]
    console.log("Auxiliar tabela ", eixo_y)
    console.log("Auxiliar tabela 2 ", eixo_y_2)
    console.log("Valor: ", valor)
    console.log("Valor2: ", valor2)
    var probabilidade_normal = 0



   

    if (vetor.length == 2) {
        probabilidade_normal = (Number(valor) + Number(valor2))
        if (vetor[0] < media && vetor[1] < media) {
            probabilidade_normal = (Number(valor) - Number(valor2))
        }
        else {
            probabilidade_normal = (Number(valor) + Number(valor2))

        }
        var resultado = `<table class = 'gauss'><tr><td> Valores:</td><td>${vetor[0]}</td><td>${vetor[1]}</td><tr>`
        console.log("Probabilidade: ", (probabilidade_normal * 100).toFixed(1), '%')
        resultado += `<tr><td> Media:</td><td style = 'text-align: center;' colspan = '2'>${media}</td><tr>`
        resultado += `<tr><td> Desvio Padrão:</td><td style = 'text-align: center;' colspan = '2'>${desvio}</td><tr>`
        resultado += `<tr><td> Valor Z:</td><td>${Z1}</td><td>${Z2}</td><tr>`
        resultado += `<tr><td> Valor Tabela Gauss:</td><td>${valor}</td><td>${valor2}</td><tr>`
        resultado += `<tr><td> Probabilidade:</td><td style = 'text-align: center;' colspan = '2'>${(probabilidade_normal * 100).toFixed(2)}%</td><tr>`
    }
    if (vetor.length == 1) {
         // usuario escolhe a opção maior que
    if (opcao.value == "maior_normal") {
        if (vetor[0] > media) {
            // caso o valor inserido seja maior que a media 
            probabilidade_normal = 0.5 - Number(valor)
        }
        else {
            probabilidade_normal = 0.5 + Number(valor)
        }
    } 
    
    // usuario escolhe a opção menor que
    else if (opcao.value == "menor_normal") {
        if (vetor[0] > media) {
            // caso o valor inserido seja maior que a media 
            probabilidade_normal = 0.5 + Number(valor)
        } else {
            probabilidade_normal = 0.5 - Number(valor)
        }
    }
        // var probabilidade_normal = (Number(valor))
        var resultado = `<table class = 'gauss'><tr><td> Valores:</td><td>${vetor[0]}</td><tr>`
        console.log("Probabilidade: ", (probabilidade_normal * 100).toFixed(1), '%')
        resultado += `<tr><td> Media:</td><td>${media}</td><tr>`
        resultado += `<tr><td> Desvio Padrão:</td><td>${desvio}</td><tr>`
        resultado += `<tr><td> Valor Z:</td><td>${Z1}</td><tr>`
        resultado += `<tr><td> Valor Tabela Gauss:</td><td>${valor}</td>><tr>`
        resultado += `<tr><td> Probabilidade:</td><td>${(probabilidade_normal * 100).toFixed(2)}%</td><tr>`
    }
    document.getElementById("saida_normal").innerHTML = resultado
}

