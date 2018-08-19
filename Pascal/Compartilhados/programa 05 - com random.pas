Program questao3;
                 
var totalDeVotos: array [0..4] of integer; //cada indice representa um tipo de voto (0:nulo,1:10, 2:20, 3:30, 4:40) e, o valor em cada indice eh a quantidade de votos que aquele candidato recebeu
var i,voto: integer;
Begin
	for i:=0 to 4 do
		begin
			totalDeVotos[i]:=0; //garantindo que cada posicao do vetor terah valor inicial igual a zero (retirando possihveis 'lixos')
		end;
	write('Os votos das pessoas foram: [');
	for i:=0 to 39 do
		begin
			voto:=random(5); //gerara valores de 0 a 4, onde (0:nulo,1:10, 2:20, 3:30, 4:40)
			totalDeVotos[voto]:=totalDeVotos[voto]+1;
			if (voto<>0) then
				write(10*voto)
			else
				write('Nulo');
			if (i<>39) then
				write(', ')
			else
				write(']');
		end;
	writeln;
	writeln;
	writeln;	
	for i:=0 to 4 do
		begin
			writeln;
			if (i=0) then
				begin
					writeln;
					write('Votos Nulos:   ');
					write(totalDeVotos[i]:2); //o ':2' significa que quero um espaco de 2 casas decimais a esquerda da 'virgula'
					write('    -    ');
					write((100*totalDeVotos[i]/40):2:2); //o ':2:2' significa que quero um espaco de 2 casas decimais a esquerda da 'virgula' e 2 a direita
					write('%');
				end
			else
				begin
					writeln;
					write('Votos no ');
					write(10*i);
					write(':   ');
					write(totalDeVotos[i]:2);
					write('    -    ');
					write((100*totalDeVotos[i]/40):2:2);
					write('%');
				end;
		end;
End.
