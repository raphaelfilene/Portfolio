Program questao2;
                 
var resposta: array [0..3] of integer;
var i,indice,unidade,dezena,centena: integer;
Begin
	indice:=0;
	for i:=100 to 999 do
		begin
			unidade:=i mod 10;
			dezena:=(i)DIV(10) mod 10;
			centena:=(i)DIV(100);
			if (i=centena*centena*centena+dezena*dezena*dezena+unidade*unidade*unidade) then
				begin
					resposta[indice]:=i;
					indice:=indice+1;
				end;
		end;
	for indice:=0 to 3 do
		writeln(resposta[indice]);
End.
