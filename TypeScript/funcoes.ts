function print1(val?:string):void { /*argumento opcional*/
    console.log(val);
}

function print2(flag:boolean=false):void {
    let str=flag?'flag is true':'flag is false';
    console.log(str);
}

let print3=function(frase:string):void{
    console.log(frase);
}

let soma1=(n1:number,n2:number)=>n1+n2;
let soma2=(n1:number,n2:number)=>{
    return n1+n2;
}

/*Funções dentro de objetos*/
let obj1={
    nome:'Raphael',
    sobrenome:'Filene',
    nome_completo:function(){
        return this.nome+' '+this.sobrenome;
    }
}
console.log(obj1.nome_completo());