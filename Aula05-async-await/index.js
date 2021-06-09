const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){

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
main()
async function main() {
    try {
        const usuario = await obterUsuario()
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        
        console.log(`
            Nome: ${usuario.nome},
            Telefone:(${telefone.ddd}) ${telefone.telefone},
            Endereco:${endereco.rua}, ${endereco.numero}
        `)
    } catch(error) {
        console.error('DEU RUIM', error)
    }
}