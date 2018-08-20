/*Para compilar use: tsc -t es5 nome_arquivo.ts*/
window.onload=function(){
    
}

class Person{
    name:string;
    
    private sobrenome:string;
    protected ultimo_nome:string;
    public apelido:string;

    constructor(name:string){
        this.name=name;
    }
    print():void{
        console.log(`name: ${this.name}`);
    }
}

class Employee extends Person{
    salary: number;
    constructor(name:string,salary:number){ /*Caso eu queira sobrescrever este construtor*/
        super(name);
        this.salary=salary;
    }
    print():void{ /*Caso eu queira sobrescrever esta função*/
        super.print();
        console.log(`salary: ${this.name}`);
    }
}

let p1=new Person('Raphael');
let emp1=new Employee('Filene',5000);

p1.print();
emp1.print();