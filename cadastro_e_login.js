
var dados = []
function cadastro() {

    var cont = 0;
    var contador = 0
    var obj = new Object()
    obj.name = document.getElementById('nome').value
    obj.email = document.getElementById('email').value
    obj.user = document.getElementById('user').value
    obj.password = document.getElementById('senha_cadastro').value
    obj.password2 = document.getElementById('senha2').value

    // alert("tamanho: "+obj.email.length)
    for(let i = 0; i < obj.email.length; i++){
        if(obj.email[i] == "@"){
            // alert("entrou no @ na posiçao "+ (i+1))
            for(let j = i; j< obj.email.length; j++){
                if(obj.email[j] == "."){
                    // alert("entrou no . na posição " + (j+1))
                    if((j+1)  == obj.email.length){
                        // alert("email invalido!!")
                        break;
                    }else{
                        // alert("email correto!!")
                        contador++
                        break;
                    }
                }
            }
        }        
    }
    
    if(obj.name == ""){
        alert("Informe seu nome")
    }else if(contador == 0){
        alert("email invalido")
    }
    else if(obj.user == ""){
        alert("Informe seu usuario")
    }
    else if(obj.password == ""){
        alert("Informe a senha")
    }else if(obj.password2 == ""  ||  obj.password2 != obj.password){
        alert("Confirme sua senha")
    }else{
        if(dados.length != 0) {
            for(let i =0; i< dados.length; i++){
                if(dados[i].name == obj.name){
                    cont++
                    break;
                }                
            }
            if(cont == 0){
                dados.push(obj)
                alert(obj.name +" cadastrado com sucesso!!")
            }else{
                alert(obj.name + " Já cadastrado")
            }
        }
        else{
            dados.push(obj)
            alert(obj.name +" cadastrado com sucesso!!")
        }

    }

}
// Loguin 
var entrar = () => {
    let usuario = document.getElementById("usuario").value
    let senha = document.getElementById("senha").value
    var cont = 0;

    
    if(usuario == ""){
        alert("Informe o usuario")
    }
    else if(senha == "") {
        alert('informe a senha')
    }else if(usuario == "usuario"  &&  senha == "12345"){
        alert("Seja bem vindo")
        window.location.href = "tela_principal.html"
    }
    else{
        for(let i =0; i<dados.length; i++){
            if(usuario == dados[i].user &&  dados[i].password == senha){
                alert("Bem vindo "+ dados[i].user)
                window.location.href = "tela_principal.html"
                cont++
                break;
            }
        }
        if(cont == 0){
            alert("Usuario ou senha incorreta")
        }
        
    }
}