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
        
    });
}