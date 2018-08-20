/*Para compilar use: tsc -t es5 nome_arquivo.ts*/
window.onload=function(){
    printName(randomObj);
    printName(pe);
    printName(emp);
}

function printName(person:{name:string}):void{
    console.log(person.name);
}


let randomObj={name:"William",age:20};

interface Person {
    name:string;
    age?:number; /*o "?" significa que este atributo (age) não é obrigatório e sim opcional.*/
    readonly bonus:number; /*Significa que este atributo (bonus) será constante, ou seja, após sua criação não será mais possível modificar seu valor*/
}

interface Employee extends Person {
    salary:number;
}

let pe:Person={name:"William",bonus:20};
let emp:Employee={name:"Raphael",salary:2000,bonus:40};