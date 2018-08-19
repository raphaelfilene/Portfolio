Program Software;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador

type
	tipo_matriz=array [1..5,1..4] of integer;

var
	matriz:tipo_matriz;
	i,j,linha,coluna:integer;
	
PROCEDURE mostrar_matriz (matriz:tipo_matriz);
	begin;
		for i:=1 to 5 do
			begin;
			writeln;
			for j:=1 to 4 do
				begin;
				write(matriz[i][j]:10);
				end;
			end;
	end;
	
Begin
	Begin
		for i:=1 to 5 do
			begin;
			for j:=1 to 4 do
				begin;
				writeln;
				write('Coloque o valor da posição (',i,',',j,'): ');
				readln(matriz[i][j]);
				end;
			end;
		writeln;
		writeln;
		write('A matriz entrada é: ');
		writeln;
		writeln;
		mostrar_matriz(matriz);
		writeln;
		writeln;
		while((linha<1) or (linha>5)) do
			begin;
			write('Escolha uma LINHA (obs: inteiro entre 1(inclusive) e 5(inclusive)):');
			writeln;
			readln(linha);
			end;
		while((coluna<1) or (coluna>5)) do
			begin;
			write('Escolha uma COLUNA (obs: inteiro entre 1(inclusive) e 4(inclusive)):');
			writeln;
			readln(coluna);
			end;
		writeln;
		write('A matriz gerada é: ');
		writeln;
		writeln;
		for i:=1 to 5 do
			begin;
			if (i<>linha) then
				begin;
				writeln;
				for j:=1 to 4 do
					begin;
					if(j<>coluna) then
						begin;
						write(matriz[i][j]:10);
						end;
					end;
				end;
			end;
	End;
	
End.