//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    /**vai retorna objeto */
    //quando der algum problema ->reject(ERRO)
    //quando sucesso-> RESOLVE
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(function(){
            return resolve({
            id: 1,
            nome: "Aladim",
            dataNascimento: new Date()
            })
        }, 1000)
    })    
}

function obterTelefone(idUsuario){
    return new Promise (function resolverPromise(resolve, reject){
        setTimeout(() =>{
            return resolve ({
                telefone:'1199002',
                ddd: 11
            })
        },2000);
    })
}

function obterEndereco(idUsuario, callback){
   setTimeout(()=>{
       return callback(null,{
           rua: 'dos bobos',
           numero: 0
       })
   }, 2000);
}

const usuarioPromise = obterUsuario()
// para manipular com sucesso a função .then
//para manipular erros , usamos o .catch
//usuario ->telefone -> resolve telefone moontando obj e caso nao de erro passe para o proximo .then
usuarioPromise
.then(function(usuario){
    return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone:result
            }
        })
})
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log( `
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .then(function(resultado){
        console.log('resultado', resultado)
    })
    .catch(function(error){
        console.log('DEU RUIM', error)
    })





