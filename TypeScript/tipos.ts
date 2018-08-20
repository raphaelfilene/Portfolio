/*Para compilar use: tsc -t es5 nome_arquivo.ts*/
window.onload=function(){
    var p=document.createElement('p');
    var ola:string='Olá mundo!';
    p.textContent=ola;
    document.body.appendChild(p);


    var num:number=10;
    var bool:boolean=true;
    var str:string="duas aspas";
    var str2:string='uma aspa';

    if (bool){
        
        /*
        var i:number; Deveria funcionar como algo local e não global; porém infelizmente isso não acontece. Daí, para que eu tenha realmente uma variável LOCAL, devo fazer:
        let i:number;
        */
       let i:number;
        for (i=0;i<3;i++){
            console.log(i);
        }
    }
    
    function testando():void{
        if(bool!=null){
            alert('testando.');
        }
    }

    let lista1:number[]=[1,2,3];
    let lista2:Array<number>=[1,2,3]; /*o moço do vídeo ainda não sabia quais as diferenças entre esta lista2 e a lista1*/
    let tuple:[string,number];
    tuple=['william',22];
    console.log(tuple[0].toLowerCase());
    
    enum Day{MONDAY=2,TUESDAY};
    let day: Day=Day.MONDAY;

    console.log(`add ${add(1,2,3)}`); /*Entre crases*/

    
    let var1:any='sasss';
    let stringLength:number=(<string> var1).length;
    let stringUpperCase:string=(var1 as string).toUpperCase();

    console.log(stringLength);
    console.log(stringUpperCase);

    function add2(v1:string,v2:number[]):void{
        let sum:number=0;
        for (let i=0;i<v2.length;i++){
            sum+=v2[i];
        }
        console.log(v1+sum);
    }
    function add3(v1:string,...v2:number[]):void{
        let sum:number=0;
        for (let i=0;i<v2.length;i++){
            sum+=v2[i];
        }
        console.log(v1+sum);
    }
    add2('a soma é: ',[1,2,3]);
    add3('a soma é: ',1,2,3);

    let var2:void=null;

    /*Tipos genéricos*/
    function reverterLista<TipoQualquer>(list:Array<TipoQualquer>):Array<TipoQualquer>{
        let listaRevertida:TipoQualquer[]=[];
        for (let i=list.length-1;i>=0;i--){
            listaRevertida.push(list[i]);
        }
        return listaRevertida;
    }
    let nomes=['Raphael','Evangelista','Filene'];
    let numeros=[1,2,3,4,5];

    let nomesInvertidos=reverterLista<string>(nomes);
    let numerosInvertidos=reverterLista<number>(numeros);
    
    console.log(nomesInvertidos);
    console.log(numerosInvertidos);

    let reverterLista2=<TipoQualquer>(list:Array<TipoQualquer>):Array<TipoQualquer>=>{
        let listaRevertida:TipoQualquer[]=[];
        for (let i=list.length-1;i>=0;i--){
            listaRevertida.push(list[i]);
        }
        return listaRevertida;
    } /*Outra forma de criar a mesma função*/

    console.log(reverterLista2(nomes));
}

function add(v1:number, v2:number,v3?:number):number {
    if(v3!=undefined){
        return v1+v2+v3;
    }
    return v1+v2;
    
}