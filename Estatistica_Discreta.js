var teste = 0;
function carregar() {
    // medida separatriz de forma dinamica e em tempo real
    var range = document.querySelector('p.medidas_separatrizes input'),
        value = document.querySelector('span'),
        select_Medidas_separatrizes = document.getElementById("medidas_separatrizes")

    range.addEventListener('input', function () {
        value.textContent = this.value;
        if (select_Medidas_separatrizes.value == "Quantil") {
            range.step = 25
            range.min = 25
            range.max = 100
        }
        if (select_Medidas_separatrizes.value == "Quintil") {
            range.step = 20
            range.min = 20
            range.max = 100
        }
        if (select_Medidas_separatrizes.value == "Deal") {
            range.step = 10
            range.min = 10
            range.max = 100
        }
        if (select_Medidas_separatrizes.value == "Porcentil") {
            range.step = 1
            range.min = 1
            range.max = 100
        }

        teste = range.value

    });

}
function inicio() {
    var select = document.getElementById('tipo')
    document.getElementById('saida').innerHTML = " ";
    document.getElementById('saida2').innerHTML = " ";
    // elementos da variavel inseridos manualmente
    // [289, 308, 333, 309, 335, 309, 335, 310, 337, 311, 337, 230, 232, 244, 245, 248, 280, 281, 284, 292]
    // [3000, 3000, 3000, 3000, 4000, 4000, 4000, 4000, 4000, 4000, 5000, 5000, 2000, 2000,2000, 2000, 3000, 3000, 3000, 3000]
    // 6,7,9,10,12,14,15,15,16,16,17,18,18,18,19,19,20,20,20,20,21,21,21,22,22,23,24,25,25,26,26,28,28,30,32,32,35,39
    // [40; 64; 80; 90; 41; 65; 81; 91; 42; 65; 83; 93; 45; 66; 84; 97; 54; 67; 85; 98; 55; 68; 86; 98; 59; 69; 87; 99; 60; 70; 87; 100; 61; 71; 88; 101; 62; 71; 89; 105]

    var elemento = document.getElementById('numero').value;
    var variavel = document.getElementById('nome').value;



    // usuario vai selecionar qual tipo de filtro vai fazer - qualitativa ou quantitativa -
    if (select.value == "quantitativa") {
        quantitativa(elemento, variavel)
    }
    else {
        qualitativa(elemento, variavel)
    }

    return elemento, variavel
}

function qualitativa(elemento, variavel) {
    console.log("----------------- Qualitativa -----------------------------")
    // var vetor = [preto, preto, preto, amarelo, azul, preto, amarelo, roxo, rosa, cinza, azul, verde, preto, branco, branco, verde, amarelo]
    var frequencia = [];
    var vetor_ordenado = [];
    let aux;


    console.log("tipo assim: ", typeof (vetor))
    var vetor = elemento.split(";")
    vetor_ordenado = elemento.split(';')


    console.log("Vetor de inicio ", vetor)
    let i, j;

    // ordenar o vetor usando Inserção direta
    for (i = 0; i < vetor.length; i++) {
        aux = (vetor[i])
        j = i - 1;
        while ((j >= 0) && (aux < vetor[j])) {
            vetor[j + 1] = (vetor[j]);
            j--;
        }
        vetor[j + 1] = aux;
    }

    for (i = 0; i < vetor_ordenado.length; i++) {
        aux = (vetor_ordenado[i])
        j = i - 1;
        while ((j >= 0) && (aux < vetor_ordenado[j])) {
            vetor_ordenado[j + 1] = (vetor_ordenado[j]);
            j--;
        }
        vetor_ordenado[j + 1] = aux;
    }

    console.log("vetor ordenado: ", vetor)


    let total = 0;
    let cont = 0;

    console.log("Vetor Ordenado:" + vetor_ordenado);
    // Saber quantas vezes o numero se repete

    for (let i = 0; i < vetor.length; i++) {
        cont = 1
        for (let j = i; j < vetor.length; j++) {
            if (vetor[i] == vetor[j]) {
                while (vetor[j] == vetor[j + 1]) {
                    cont++
                    vetor.splice(j, 1);
                    console.log('Numero ', vetor[j], ' na posição ', i)
                }
            }

        }

        // cada posição possui um valor de vezes que se repete o numero
        frequencia[i] = cont
        total += frequencia[i]
    }


    console.log("A frequencia é: ", frequencia)
    console.log("O numero é: ", vetor_ordenado)
    console.log("O vetor é: ", vetor)



    total = 0
    let moda_qualitativa = frequencia[0];
    let posicao = 0;
    for (let i = 0; i < vetor.length; i++) {

        //acumular frequencia
        total += frequencia[i]

        // encontrar qual a maior frequencia e guardar sua posição
        if (frequencia[i] > moda_qualitativa) {
            moda_qualitativa = frequencia[i]
            posicao = i
        }
    }

    // Moda

    moda_qualitativa = vetor[posicao]



    console.log('Vetor Ordenado: ', vetor_ordenado)
    console.log('Moda: ', moda_qualitativa)

    let result = "<table><tr><td>" + variavel + "</td><td> (FI)</td><td> (FR%) </td><td> (FAC) </td> <td> (FAC%)</td> <tr>"
    cont = 0;


    // dentro deste loop é possivel calcular frequencia relativa porcentua(fr%)
    // frequencia acumulada(Fac)
    // frequencia acumulada porcentual(Fac%)
    // imprimir a tabela com seus respectivos valores
    console.log("-------------------------- Criação da tabela --------------------------------")


    // ------------------- medidas separatrizes ---------------------
    let medida_separatriz_qualitativa = (total * (teste / 100)).toFixed(0)
    let mediana_qualitativa = (total * 0.5).toFixed(0)
    let valor_medida_separatriz_qualitativa = 0
    for (let i = 0; i < vetor.length; i++) {
        let tr = "<tr>"
        cont += frequencia[i]
        if (mediana_qualitativa <= cont && mediana_qualitativa > (cont - frequencia[i])) {
            mediana_qualitativa = vetor[i]
        }

        if ((medida_separatriz_qualitativa <= cont) && (medida_separatriz_qualitativa > (cont - frequencia[i]))) {
            valor_medida_separatriz_qualitativa = vetor[i]

        }
        if (i == 0) {
            tr = "<tr style='background-color: rgba(97, 94, 94, 0.4);'>"
        }
        else if (i == 1) {
            tr = "<tr style='background-color: white;'>"
        }
        else if (i % 2 == 0) {
            tr = "<tr style='background-color: rgba(97, 94, 94, 0.4);'>"
        }
        else {
            tr = "<tr style='background-color: white;'>"
        }
        result += `${tr}<td>${vetor[i]}</td><td>${frequencia[i]}</td><td>${((frequencia[i] / total) * 100).toFixed(0)}%</td><td>${cont}</td><td>${((cont / total) * 100).toFixed(0)}%</td><tr>`;
    }

    for (let i = 0; i < frequencia.length; i++) {

        result += '</table>';
        document.getElementById('saida').innerHTML = "<h1>Variavel Qualitativa </h1>" +
            "</br>" + "valores: " + vetor_ordenado + "<br/>" + result + "<br>" +
            "</br>" + "Moda: " + moda_qualitativa + "<br> Mediana: " + mediana_qualitativa + "<br>" +
            `Medida Separatriz: ${teste}% das(os) ${variavel} têm ${valor_medida_separatriz_qualitativa} ou menos ` + "<br>" +
            `${(100 - teste)}% das(os) ${variavel} têm ${(valor_medida_separatriz_qualitativa)} ou mais `;

    }
}



function quantitativa(elemento, variavel) {

    // var vetor = [40, 64, 80, 90, 41, 65, 81, 91, 42, 65, 83, 93, 45, 66, 84, 97, 54, 67, 85, 98, 55, 68, 86, 98, 59, 69, 87, 99, 60, 70, 87, 100, 61, 71, 88, 101, 62, 71, 89, 105]
    var frequencia = [];
    var vetor_ordenado = [];
    var vetor = []
    let aux;


    console.log("tipo assim: ", typeof (vetor))
    vetor = elemento.split(';')
    vetor_ordenado = elemento.split(';')

    Number.parseFloat(vetor)
    Number.parseFloat(vetor_ordenado)

    console.log("Vetor de inicio ", vetor)
    let i, j;
    // ordenar o vetor usando Inserção direta
    for (i = 0; i < vetor.length; i++) {
        aux = Number(vetor[i])
        j = i - 1;
        while ((j >= 0) && (aux < vetor[j])) {
            vetor[j + 1] = Number(vetor[j]);
            j--;
        }
        vetor[j + 1] = aux;
    }

    for (i = 0; i < vetor_ordenado.length; i++) {
        aux = Number(vetor_ordenado[i])
        j = i - 1;
        while ((j >= 0) && (aux < vetor_ordenado[j])) {
            vetor_ordenado[j + 1] = Number(vetor_ordenado[j]);
            j--;
        }
        vetor_ordenado[j + 1] = aux;
    }

    console.log("vetor ordenado: ", vetor)

    let total = 0;
    let cont = 0;

    console.log("Vetor Ordenado:" + vetor_ordenado);
    // Saber quantas vezes o numero se repete

    for (let i = 0; i < vetor.length; i++) {
        cont = 1
        for (let j = i; j < vetor.length; j++) {
            if (vetor[i] == vetor[j]) {
                while (vetor[j] == vetor[j + 1]) {
                    cont++
                    vetor.splice(j, 1);
                    console.log('Numero ', vetor[j], ' na posição ', i)
                }
            }

        }

        // cada posição possui um valor de vezes que se repete o numero
        frequencia[i] = cont
        total += frequencia[i]
    }


    console.log("A frequencia é: ", frequencia)
    console.log("O numero é: ", vetor_ordenado)
    console.log("O vetor é: ", vetor)

    if (vetor.length <= 6) {

        console.log("--------------------- Quantitativa Discreta-------------------------")
        // Media Ponderada simples 

        var media_quantitativa = 0;
        total = 0
        var moda_quantitativa = frequencia[0];
        var posicao = 0;
        for (let i = 0; i < vetor.length; i++) {

            //acumular todos elementos e multiplicar pela frequencia
            media_quantitativa += (vetor[i] * frequencia[i])
            total += frequencia[i]

            // encontrar qual a maior frequencia e guardar sua posição
            if (frequencia[i] > moda_quantitativa) {
                moda_quantitativa = frequencia[i]
                posicao = i
            }
        }

        console.log("total: ", total)


        moda_quantitativa = vetor[posicao]
        media_quantitativa = (media_quantitativa / total).toFixed(2)

        // --------------------------------------------




        // ------------- medidas de dispersão --------------

        var variavel_menos_media = 0;

        for (let i = 0; i < vetor.length; i++) {
            // somatoria de todos indices da tabela menos a media vezes a frequencia do seu indice correspondente
            variavel_menos_media += (((vetor[i] - media_quantitativa) ** 2) * frequencia[i])
            console.log(vetor[i], ' - ', media_quantitativa, ' ^2 X ', frequencia[i])
            console.log('medidas de dispersão: ', variavel_menos_media)
        }

        var V = ((variavel_menos_media / (total - 1)) ** (1 / 2)).toFixed(2)

        var Coeficiente_Variacao_Quantitativa = ((V / media_quantitativa) * 100).toFixed(0)

        // ------------------------------------------------

        console.log("coeficiente de variação: ", Coeficiente_Variacao_Quantitativa)
        console.log("V(x): ", V)
        console.log('medidas de dispersão: ', variavel_menos_media)
        console.log('Moda: ', moda_quantitativa)
        console.log('Media: ', media_quantitativa)


        var result = "<table><tr><td>" + variavel + "</td><td> (FI)</td><td> (FR%) </td><td> (FAC) </td> <td> (FAC%)</td> <tr>"
        cont = 0;


        // dentro deste loop é possivel calcular frequencia relativa porcentua(fr%)
        // frequencia acumulada(Fac)
        // frequencia acumulada porcentual(Fac%)
        // imprimir a tabela com seus respectivos valores


        let mediana_quantitativa = (teste * 0.5).toFixed(0);
        let medida_separatriz_quantitativa = (total * (teste / 100)).toFixed(0)
        let valor_medida_separatriz_quantitativa = 0
        for (let i = 0; i < vetor.length; i++) {
            let tr = "<tr>"
            cont += frequencia[i]


            // Medida Separatriz Quantitativa 
            if (medida_separatriz_quantitativa <= cont && medida_separatriz_quantitativa > (cont - frequencia[i])) {
                valor_medida_separatriz_quantitativa = vetor[i]
            }
            // ------------------------------------

            if (mediana_quantitativa < cont && mediana_quantitativa >= (cont - frequencia[i])) {
                mediana_quantitativa = vetor[i]
            }
            if (i == 0) {
                tr = "<tr style='background-color: rgba(97, 94, 94, 0.4);'>"
            }
            else if (i == 1) {
                tr = "<tr style='background-color: white;'>"
            }
            else if (i % 2 == 0) {
                tr = "<tr style='background-color: rgba(97, 94, 94, 0.4);'>"
            }
            else {
                tr = "<tr style='background-color: white;'>"
            }
            result += `${tr}<td>${vetor[i]}</td><td>${frequencia[i]}</td><td>${((frequencia[i] / total) * 100).toFixed(0)}%</td><td>${cont}</td><td>${((cont / total) * 100).toFixed(0)}%</td><tr>`;
        }
        result += '</table>';
        document.getElementById('saida').innerHTML = "<h1>Variavel Quantitativa Discreta </h1>" +
            "</br>" + "valores: " + vetor_ordenado + "<br/>" + result + "<br>" + " Media: " + media_quantitativa +
            "</br>" + "Moda: " + moda_quantitativa + "<br> Mediana: " + mediana_quantitativa + "<br>" +
            `Medida Separatriz: ${teste}% das(os) ${variavel} têm ${valor_medida_separatriz_quantitativa} ou menos ` + "<br>" +
            `${(100 - teste)}% das(os) ${variavel} têm ${(valor_medida_separatriz_quantitativa)} ou mais ` +
            "<br> V(x): " + V + "<br> Coeficiente de Variação: " + Coeficiente_Variacao_Quantitativa + "%";


    } else {
        //-------------------- amostra quantitativa continua ---------------------//

        console.log('-------------------------- Quantitativa Contínua ----------------------------')
        // valores que não da certo 
        // 6;5;3;4;5;9;4;8;7;1;2;4;8;5;2;7;4;4;3;3;0;4;4;3;3;8;2;4;1;0;2;5;7;3;5;5;6;7;8;6;4;3;6;0;6;2;7;5;6;3			


        // complitude 
        var at = Number(vetor[vetor.length - 1] - vetor[0]) + 1;
        console.log('AT: ', at)

        // classes/ linhas
        var k = Math.round((vetor_ordenado.length) ** (1 / 2))
        var kanterior = k - 1
        var kposterior = k + 1

        var ic = 0;
        var linha = 0;
        var intervalo = 0;

        // Intervalo de classes
        while (at % kanterior != 0 || at % k != 0 || at % kposterior != 0) {
            if (at % kanterior == 0) {
                ic = Number(at / kanterior)
                linha = kanterior
                intervalo = ic
                break;
            }
            else if (at % k == 0) {
                ic = Number(at / k)
                linha = k
                intervalo = ic
                break;
            }
            else if (at % kposterior == 0) {
                ic = Number(at / kposterior)
                linha = kposterior
                intervalo = ic
                break;
            }
            at++
        }


        console.log("k anterior " + kanterior);
        console.log("k " + k);
        console.log("k posterior " + kposterior);
        console.log("at: " + at);
        console.log('intervalo: ', intervalo)
        console.log('IC: ', ic)
        console.log("a tabela terá: " + linha + " linhas com intervalo de " + intervalo);

        // tabela quantitativa continua
        var tabela_continua = "<table><tr><td>" + variavel + "</td><td> (FI)</td> <td> (FR%) </td> <td> (FAC) </td> <td> (FAC%) </td><td style = 'color: green;'> Indice Central </td><tr>"

        var media_continua = 0;
        var indice = 0;
        var frequencia2 = []
        var moda = 0

        // valor do meio da tabela de cada linha
        var indice_central = []
        var valor_meio_tabela = []
        var moda_continua = 0;
        var indice0 = Number(vetor[0]);
        cont = 0;
        for (let i = 0; i < linha; i++) {
            let indice2 = Number(indice0 + ic)
            contar = 0
            for (let j = indice; vetor[j] < indice2; j++) {
                contar += frequencia[j]
                cont += frequencia[j]
                indice = j + 1
                console.log('j: ', j)
            }
            frequencia2[i] = contar
            console.log("frequencia 2:", frequencia2[i])

            // media recebe a metade da soma dos indices vezes a frequencia
            indice_central[i] = ((indice0 + indice2) / 2) * frequencia2[i]

            // armazena todas somas do primeiro indice e o segundo 
            valor_meio_tabela[i] = ((indice0 + indice2) / 2)

            media_continua += ((indice0 + indice2) / 2) * frequencia2[i]
            console.log("media continua: ", indice0, ' + ', indice2, ' / 2 = ', ((indice0 + indice2) / 2), ' X ', frequencia2[i], ' = ', indice_central)



            // achar quem é a maior frequencia
            if (frequencia2[i] > moda) {
                moda = frequencia2[i]
                //  indice central sem multiplicar pela frequencia
                moda_continua = (indice0 + indice2) / 2
                console.log("indice do meio: ", moda_continua)
            }

            // mediana ---------------------------

            // achar o indice do meio
            var mediana_continua = (total / 2)
            var medida_separatriz_continua = (total * (teste / 100)).toFixed(0)
            var valor_medida_separatriz_continua = 0;
            var limite_inferior;
            var facant;
            var fiClasseMediana
            var M = 0;
            if (medida_separatriz_continua <= cont && medida_separatriz_continua > (cont - frequencia2[i])) {
                M = indice0 + (((medida_separatriz_continua - (cont - frequencia2[i])) / frequencia2[i]) * intervalo)

            }

            // comparo se meu meio é menor ou igual minha frequencia acumulativa e se é maior que a frequencia anterior 
            if ((mediana_continua <= cont) && (mediana_continua > (cont - frequencia2[i]))) {
                // guardar o primeiro indice da tabela
                limite_inferior = indice0
                // guardar a frequencia acumulada anterior a que encontrei
                facant = (cont - frequencia2[i])
                // guardar a frequencia que corresponde aquela linha
                fiClasseMediana = frequencia2[i]
            }



            console.log("Limite inferior I: ", limite_inferior)
            console.log('posição : ', mediana_continua)
            console.log('frequencia acumulada anterior: ', facant)
            console.log('frequencia da classe da mediana: ', fiClasseMediana)
            console.log("Total: ", total)

            tabela_continua += `<tr><td>${indice0}  |----- ${indice2}</td><td>${frequencia2[i]}</td><td>${((frequencia2[i] / total) * 100).toFixed(0)}%</td><td>${cont}</td><td>${((cont / total) * 100).toFixed(0)}%</td> <td style = "color: green;"> ${valor_meio_tabela[i]}</td><tr>`
            indice0 = indice2
        }

        // calculo final da mediana continua 
        var final_mediana_continua = (limite_inferior + (((mediana_continua - facant) / fiClasseMediana) * intervalo))

        console.log('Mediana continua: ', final_mediana_continua)
        // console.log("Mostrar limite: ", limite_inferior)

        media_continua = (media_continua / total).toFixed(2)

        // Medidas de dispersão ------------------------
        var variavel_menos_media = 0;
        for (let i = 0; i < valor_meio_tabela.length; i++) {
            variavel_menos_media += ((valor_meio_tabela[i] - media_continua) ** 2) * frequencia2[i];
            console.log(valor_meio_tabela[i], ' - ', media_continua, ' ^2  X ', frequencia2[i])
        }

        var V = ((variavel_menos_media / (total - 1)) ** (1 / 2)).toFixed(2)

        var Coeficiente_Variacao_Continua = (V / media_continua) * 100

        console.log("coeficiente de variação: ", Coeficiente_Variacao_Continua)
        console.log('Primeira parte: ', variavel_menos_media)
        console.log("V(x): ", V)
        console.log("Valor o meio da tabela: ", valor_meio_tabela)
        console.log("Limite inferior disponivel ", limite_inferior)
        console.log('Media continua: ', media_continua, ' / ', total, ' = ', media_continua / total)

        tabela_continua += "</table>"
        document.getElementById('saida2').innerHTML = "<h1> Tabela Quantitativa Contínua </h1> " +
            "</br>" + "valores: " + vetor_ordenado + "<br>" + tabela_continua + " </br> Media Ponderada: " + media_continua + "<br>" +
            `Medida Separatriz: ${teste}% das(os) ${variavel} têm ${V} ou menos ` + "<br>" +
            `${(100 - teste)}% das(os) ${variavel} têm ${(V)} ou mais ` + "<br>" +
            "<br> Moda: " + moda_continua + "<br> Mediana: " + final_mediana_continua + "<p style = 'margin-top: 10px; margin-bottom: 0px;'><b>Medidas de Dispersão </b></p>" +
            " V(x): " + V + "<br> Coeficiente de Variação: " + (Coeficiente_Variacao_Continua).toFixed(2) + "%";


    }
}

