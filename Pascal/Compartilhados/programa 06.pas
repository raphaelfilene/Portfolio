Program questao4 ;
var N,i,idade,peso,maiorPeso,indiceMaiorPeso,menorPeso,indiceMenorPeso,maiorIdade,indiceMaiorIdade,menorIdade,indiceMenorIdade: integer;
var pessoas: array [0..99] of string; //nesta versao do pascal, nao existe selecao de tamanho pra array de forma dinamica, entao pus um valor alto (100) acreditando ser suficiente
begin
	writeln('Insira o n�mero de pessoas (N) que a lista ter�:');
	readln(N);
	maiorPeso:=0;
	menorPeso:=0;
	maiorIdade:=0;
	menorIdade:=0;
	for i:=0 to N-1 do
		begin
			writeln;
			write('Insira as informa��es da pessoa de n�mero ');
			write(i+1);
			write(' da lista:');
			writeln;
			write('Nome: ');
			readln(pessoas[i]);
			writeln;
			write('Idade: ');
			readln(idade);
			writeln;
			if (idade<menorIdade) or (menorIdade=0) then
				begin
					menorIdade:=idade;
					indiceMenorIdade:=i;
				end;
			if (idade>maiorIdade) or (maiorIdade=0) then
				begin
					maiorIdade:=idade;
					indiceMaiorIdade:=i;
				end;
			write('Peso: ');
			readln(peso);
			writeln;
			if (peso<menorPeso) or (menorPeso=0) then
				begin
					menorPeso:=peso;
					indiceMenorPeso:=i;
				end;
			if (peso>maiorPeso) or (maiorPeso=0) then
				begin
					maiorPeso:=peso;
					indiceMaiorPeso:=i;
				end;
		end;
	writeln;
	write(pessoas[indiceMenorIdade]);
	write(' � a pessoa mais nova, com ');
	write(menorIdade);
	writeln;
	write(pessoas[indiceMaiorIdade]);
	write(' � a pessoa mais velha, com ');
	write(maiorIdade);
	writeln;
	write(pessoas[indiceMenorPeso]);
	write(' � a pessoa mais leve, com ');
	write(menorPeso);
	writeln;
	write(pessoas[indiceMaiorPeso]);
	write(' � a pessoa mais pesada, com ');
	write(maiorPeso);
end.
