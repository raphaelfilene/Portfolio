Program Software;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador

var
	matriz: array[1..5,1..4] of integer;
	valor_digitado,i,j,qtd_pares,qtd_impares:integer;

PROCEDURE mostrar_matriz;
	begin;
	for i:=1 to 5 do
		begin;
		writeln;
		writeln;
		for j:=1 to 4 do
			begin;
			write((matriz[i][j]):10,' ');
			end;
		end;
	end;

Begin
	qtd_impares:=0;
	qtd_pares:=0;
	while((qtd_pares<8) or (qtd_impares<12)) do
		begin;
		if((qtd_impares=0) and (qtd_pares=0)) then
			write('Digite um valor para a matriz:')
		else
			write('Digite o próximo valor:');
		writeln;
		readln(valor_digitado);
		if(valor_digitado mod 2 = 0) then
			begin;
			writeln;
			if(qtd_pares=8) then
				write('A matriz já está lotada de valores PARES!')
			else
				begin;
				if(qtd_pares<4) then
					matriz[2][qtd_pares+1]:=valor_digitado
				else
					matriz[4][qtd_pares-3]:=valor_digitado;
				qtd_pares:=qtd_pares+1;
				end;
			end
		else
			begin;
			writeln;
			if(qtd_impares=12) then
				write('A matriz já está lotada de valores ÍMPARES!')
			else
				begin;
				if(qtd_impares<4) then
					matriz[1][qtd_impares+1]:=valor_digitado
				else if(qtd_impares<8) then
					matriz[3][qtd_impares-3]:=valor_digitado
				else
					matriz[5][qtd_impares-7]:=valor_digitado;
				qtd_impares:=qtd_impares+1;
				end;
			end;
		end;
	writeln;
	write('A matriz já está lotada!');
	writeln;
	mostrar_matriz;	
	
End.