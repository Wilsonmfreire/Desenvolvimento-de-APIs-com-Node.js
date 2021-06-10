const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
//simular que o usuario esta clicando
const nomeEvento = 'usuario:click'
//olheiro, vai estar vendo
meuEmissor.on(nomeEvento, function(click){
    console.log('um usuario clicou', click)
})
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

//para simular, teste.
let count = 0
setInterval(function (){
    meuEmissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)