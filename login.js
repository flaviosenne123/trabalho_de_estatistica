var entrar = () => {
    let usuario = document.getElementById("usuario").value
    let senha = document.getElementById("senha").value


    if(usuario == ""){
        alert("Informe o usuario")
    }
    else if(senha == "") {
        alert('informe a senha')
    }else{
        if(usuario == 'usuario'  &&  senha == '1234'){
            window.location.href = "testeEstatistica.html"
        }else{
            alert('usuario ou senha incorreta')
        }
    }
    
}