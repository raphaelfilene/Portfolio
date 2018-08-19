/*
#### Pra rodar este programa em particular:
MODO 1-
gcc main.c -l sqlite3
./a.out (se for em linux, pois se for em windows basta clicar no executável)

MODO 2- (obs: está bugando com o sqlite3) se eu tiver precisando do código objeto (o arquivo.o):
gcc -c bibliotecas/vector.c
gcc -c main.c
gcc -o executavel main.o
./executavel (se for em linux, pois se for em windows basta clicar no executável)

*/

//Número de argumentos que esta função terá na hora de digitar no terminal, descontando o "./nome_arquivo"
#define NUMERO_ARGUMENTOS 0

//códigos dos erros e sucesso
#define SUCESSO 0
#define ERRO_BD 1 //não foi possível criar o arquivo.db
#define ERRO_ARGUMENTOS_INVALIDOS 1

#include <stdio.h>
#include <stdlib.h>

#include "bibliotecas/vector.c"
#include "bibliotecas/sqlite3.c"

/*Revisão sobre ponteiros
MÉTODO DA TABELA (var & val)
variável						|	endereço					|	valor
	int a						|	&a							|	5
	char *a(string disfarçada)	|	a							|	"oi, tudo bem?"
	*p							|	p							|	&p=? (sim, necessário)
	**pp						|	*pp							|	pp=?
	argumento de f(arg)			|	argumento de f(*arg)		|	?



EXEMPLO 1:
int x, y, *p;y = 0;
p = &y;
x = *p;
x = 4;
(*p)++;
--x;
(*p) += x;

var		|	&		|	val	
x		|	&x		|	?
y		|	&y		|	?
*p		|	p		|   &p=?

y		|	&y		|	0
*p		|	p=&y	|   &p=?
*p		|	p=&y	|   &p=0

cuidado em "x=*p;" x só copia o valor. Continuando:

x		|	&x		|	0
x		|	&x		|	4
*p		|	p=&y	|   &p=1
y		|	&y		|	1
x		|	&x		|	3
*p		|	p=&y	|   &p=4
y		|	&y		|	4




EXEMPLO 2:
ERRO GRAVE:
int *p;
p=5;

MOTIVO:
var		|	&		|	val	
*p		|	p		|   &p=?
*p		|	p=5		|   &p=?

perceba que eu não sei o que está na posição 5 da minha memória. Inclusive, é bem provável que tenha alguma outra coisa que esteja rodando que nem seja meu software...

EXEMPLO 3:
int x=100,*p,**pp;
p=&x;
pp=&p;

var		|	&		|	val	
x		|	&x		|	100
*p		|	p		|	&p=?
**pp	|	*pp		|	pp=?
*p		|	p=&x	|	&p=?
*p		|	p=&x	|	&p=100
**pp	|	*pp		|	pp=&p=100

EXEMPLO 4:
void funcao(vector *arg){
    arg ...
}
vector w;
funcao(&w);

o fato de ter *arg ali é apenas pra eu dizer pra função que lhe enviarei um ENDEREÇO. Então, eu tenho que trabalhar da seguinte forma:

var		|	&			|	val	
w		|	&w			|	?
arg		|	*arg		|   ?

daí, para chamar funcao(*arg) faço: funcao(&w), pois estão na mesma coluna.

*/

int main(int argc,char *argv[]){
	/*
	Se rodo no terminal: ./executavel 12 abc, então:
		argv=["./nome_arquivo","12","abc"]
		argc=len(argv)=3 #é a quantidade de argumentos que é passado
	*/
  
  	//Análise de erros de argumentos
  	if(argc!=NUMERO_ARGUMENTOS+1){
	    //Este bloco serve para mandar uma mensagem corretiva para quando eu tentar rodar este código digitando uma quantidade de argumentos diferente da que eu deveria.
	    int i=0;
	    printf("Erro! Digite: ");

	    for(i=0;i<NUMERO_ARGUMENTOS+1;i++){
	    	if(i>=argc){
	    		printf("argumento-%d",i);
	    	}
	    	else{
	    		printf("%s ",argv[i]);
	    	}
	    }
		printf("\n");
		exit (ERRO_ARGUMENTOS_INVALIDOS); 
	}

  	//Vector - tutorial
	int j;
	vector v; //declaro a variável vetor
	vector_init(&v); //inicio o vetor

	//add elementos ao vetor
	vector_add(&v,"cachorro");
	vector_add(&v,"gato");
	vector_add(&v,"papagaio");
	vector_add(&v,"peixe");

	//printando os elementos
	for(j=0;j< vector_total(&v);j++)
	    printf("%s ",(char*)vector_get(&v,j));
	printf("\n");

	//deletando elementos do vetor
	vector_delete(&v,3);
	vector_delete(&v,2);
	vector_delete(&v,1);

	//alterando valor de um elemento de determinado index
	vector_set(&v,0,"passarinho");

	for(j=0;j<vector_total(&v);j++)
	    printf("%s ",(char*)vector_get(&v,j));
	printf("\n");

	vector_free(&v); //desalocando o espaço na memória que o vetor havia ocupado

	//agora farei testes com vetores de números
	vector w;
	int valores[4]={23,45,100,8};
	vector_init(&w);
	vector_add(&w,&valores[0]);
	vector_add(&w,&valores[1]);
	vector_add(&w,&valores[2]);
	vector_add(&w,&valores[3]);

	for(j=0;j< vector_total(&w);j++)
	    printf("%d ",*(int*)vector_get(&w,j));
	printf("\n");

	vector_free(&w); //desalocando o espaço na memória que o vetor havia ocupado

	//SQLITE3
	sqlite3 **db;
	sqlite3 *db1=NULL; db=&db1;//para evitar erros de segmentação de memória
  	printar=0; //esta variável está declarada no módulo sqlite3, e serve para eu printar ou não as tabelas...
  	int retorno=open_db(db,"teste.db");
  	
  	if(retorno)
  	{
	printf("BD aberto com sucesso!\n");

	retorno=execute_db(db,\
	"CREATE TABLE COMPANY("  \
     "ID INT PRIMARY KEY     NOT NULL," \
     "NAME           TEXT    NOT NULL," \
     "AGE            INT     NOT NULL," \
     "ADDRESS        CHAR(50)," \
     "SALARY         REAL );");
	
	if(retorno)
	{
	printf("Tabela criada com sucesso!\n");

	retorno=execute_db(db,\
	"INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) "  \
     "VALUES (1, 'Paul', 32, 'California', 20000.00 ); " \
     "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) "  \
     "VALUES (2, 'Allen', 25, 'Texas', 15000.00 ); "     \
     "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
     "VALUES (3, 'Teddy', 23, 'Norway', 20000.00 );" \
     "INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)" \
     "VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 );");
	
	if(retorno)
	{
	printf("Valores inseridos com sucesso!\n");
	
	retorno=execute_db(db,\
	"SELECT * from COMPANY");
	
	if(retorno)
	{
	printf("Valores selecionados com sucesso!\n");
	
	retorno=execute_db(db,\
	"UPDATE COMPANY set SALARY = 25000.00 where ID=1; " \
	"SELECT * from COMPANY");
	
	if(retorno)
	{
	printf("Valor atualizado com sucesso!\n");
	retorno=execute_db(db,\
	"DELETE from COMPANY where ID=2; " \
    "SELECT * from COMPANY");
    if(retorno)
    {
    printf("Valor deletado com sucesso!\n");
    }}}}}}


  	sqlite3_close(*db);



  	return SUCESSO;
}