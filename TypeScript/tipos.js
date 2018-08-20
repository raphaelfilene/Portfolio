/*Para compilar use: tsc -t es5 nome_arquivo.ts*/
window.onload = function () {
    var p = document.createElement('p');
    var ola = 'Olá mundo!';
    p.textContent = ola;
    document.body.appendChild(p);
    var num = 10;
    var bool = true;
    var str = "duas aspas";
    var str2 = 'uma aspa';
    if (bool) {
        /*
        var i:number; Deveria funcionar como algo local e não global; porém infelizmente isso não acontece. Daí, para que eu tenha realmente uma variável LOCAL, devo fazer:
        let i:number;
        */
        var i = void 0;
        for (i = 0; i < 3; i++) {
            console.log(i);
        }
    }
    function testando() {
        if (bool != null) {
            alert('testando.');
        }
    }
    var lista1 = [1, 2, 3];
    var lista2 = [1, 2, 3]; /*o moço do vídeo ainda não sabia quais as diferenças entre esta lista2 e a lista1*/
    var tuple;
    tuple = ['william', 22];
    console.log(tuple[0].toLowerCase());
    var Day;
    (function (Day) {
        Day[Day["MONDAY"] = 2] = "MONDAY";
        Day[Day["TUESDAY"] = 3] = "TUESDAY";
    })(Day || (Day = {}));
    ;
    var day = Day.MONDAY;
    console.log("add " + add(1, 2, 3)); /*Entre crases*/
    var var1 = 'sasss';
    var stringLength = var1.length;
    var stringUpperCase = var1.toUpperCase();
    console.log(stringLength);
    console.log(stringUpperCase);
    function add2(v1, v2) {
        var sum = 0;
        for (var i = 0; i < v2.length; i++) {
            sum += v2[i];
        }
        console.log(v1 + sum);
    }
    function add3(v1) {
        var v2 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            v2[_i - 1] = arguments[_i];
        }
        var sum = 0;
        for (var i = 0; i < v2.length; i++) {
            sum += v2[i];
        }
        console.log(v1 + sum);
    }
    add2('a soma é: ', [1, 2, 3]);
    add3('a soma é: ', 1, 2, 3);
    var var2 = null;
};
function add(v1, v2, v3) {
    if (v3 != undefined) {
        return v1 + v2 + v3;
    }
    return v1 + v2;
}
