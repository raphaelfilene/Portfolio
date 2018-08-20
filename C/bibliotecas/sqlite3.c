#include <stdio.h>
#include <stdlib.h>
#include <sqlite3.h>

unsigned int printar=1;

static int callback(void *NotUsed, int argc, char **argv, char **azColName) {
   for(int i=0; i<argc; i++) {
      printf("%s = %s\n", azColName[i], argv[i] ? argv[i] : "NULL");
   }
   printf("\n");
   return 0;
}

int open_db(sqlite3 **db, char *nome){
	int rc=sqlite3_open(nome,db);
	if(rc){
		fprintf(stderr,"Can't open database: %s\n", sqlite3_errmsg(*db));
		return 0;
	}
	return 1;
}

int execute_db(sqlite3 **db,char *comando){
	char *zErrMsg=NULL;
	int rc;
	if(printar){
		rc=sqlite3_exec(*db,comando,callback,0,&zErrMsg);
	}
	else{
		rc=sqlite3_exec(*db,comando,NULL,0,&zErrMsg);
	}
	
	if(rc!=SQLITE_OK){
		fprintf(stderr,"SQL error: %s\n",zErrMsg);
		sqlite3_free(zErrMsg);
		return 0;
	}
	return 1;
}