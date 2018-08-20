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