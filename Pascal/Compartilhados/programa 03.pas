Program questao1;
var a,b,c,menor,maior,resultado,i:integer;
Begin
	while True do
		begin
			resultado:=0;
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
		     if (b>c) then
				begin
				maior:=b;
				menor:=c;
				end
			else
				begin
				maior:=c;
				menor:=b;
				end;
			if (menor<a) then
				menor:=a;
	          for i:=menor to maior do
	          	if (i mod a = 0) then resultado:=resultado+i;
			Write('Resultado=');
			Write(resultado);
	   		Writeln; //pulando linha para a proxima interacao
		end;
End.
