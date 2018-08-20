function print1(val) {
    console.log(val);
}
function print2(flag) {
    if (flag === void 0) { flag = false; }
    var str = flag ? 'flag is true' : 'flag is false';
    console.log(str);
}
var print3 = function (frase) {
    console.log(frase);
};
var soma1 = function (n1, n2) { return n1 + n2; };
var soma2 = function (n1, n2) {
    return n1 + n2;
};
/*Funções dentro de objetos*/
var obj1 = {
    nome: 'Raphael',
    sobrenome: 'Filene',
    nome_completo: function () {
        return this.nome + ' ' + this.sobrenome;
    }
};
console.log(obj1.nome_completo());
