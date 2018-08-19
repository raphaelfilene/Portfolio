Program questao1;

FUNCTION minimo(x,y:integer):integer;
	Begin
		if (x>y)
			then minimo:=y
			else minimo:=x;
	End;

FUNCTION maximo(x,y:integer):integer;
	Begin
		if (x>y)
			then maximo:=x
			else maximo:=y;
	End;

PROCEDURE  somaDeDividendos (a,b,c:integer);
	var i,menor,maior,resultado: integer;
	Begin
		resultado:=0; //inicialmente
		menor:=minimo(b,c);
		menor:=maximo(a,menor);
		maior:=maximo(b,c);
		if maior>a then
			for i:=menor to maior do
				if (i mod a = 0) then resultado:=resultado+i;
		Writeln(resultado);
	End;
var a,b,c:integer;
Begin
	
	while True do
		begin
		   Writeln('Escolha valores inteiros para "a"."b" e "c", respectivamente, sendo a>1');
		   Writeln;
		   Write('a=');
		   Readln(a);
		   while (a<=1) do
		   	begin
		   		Writeln('O valor digitado para "a" (primeiro parametro) precisa ser maior que 1');
		   		Write('a=');
				Readln(a);
		   	end;
		   Writeln;
		   Write('b=');
   		   Readln(b);
		   Writeln;
		   Write('c=');
		   Readln(c);
		   Writeln;
		   Write('Resultado=');
		   somaDeDividendos(a,b,c);
   		   Writeln; //pulando linha para a proxima interacao
		end;
End.
