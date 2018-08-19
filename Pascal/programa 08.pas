Program Pzim ;
var i,j,N:integer;
Begin
	N:=0;
	while (N<1) or (N>9) do
		begin
			writeln('Insira um valor, entre 1 e 9, abaixo:');
			readln(N);
		end;
	writeln;
	writeln;
	for i:=1 to N do
		begin
			for j:=1 to i do
				begin
				     write(i*j:2); //esse ':2' eh pra dizer que o numero terah no maximo 2 casas decimais, e assim o espacamento ficar mais bonito
				     write('    ');
				end;
			writeln;
		end;
  
End.
