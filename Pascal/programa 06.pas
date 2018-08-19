Program questao4 ;
var N,i,idade,peso,maiorPeso,indiceMaiorPeso,menorPeso,indiceMenorPeso,maiorIdade,indiceMaiorIdade,menorIdade,indiceMenorIdade: integer;
var pessoas: array [0..99] of string; //nesta versao do pascal, nao existe selecao de tamanho pra array de forma dinamica, entao pus um valor alto (100) acreditando ser suficiente
begin
	writeln('Insira o número de pessoas (N) que a lista terá:');
	readln(N);
	maiorPeso:=0;
	menorPeso:=0;
	maiorIdade:=0;
	menorIdade:=0;
	for i:=0 to N-1 do
		begin
			writeln;
			write('Insira as informações da pessoa de número ');
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
	write(' é a pessoa mais nova, com ');
	write(menorIdade);
	writeln;
	write(pessoas[indiceMaiorIdade]);
	write(' é a pessoa mais velha, com ');
	write(maiorIdade);
	writeln;
	write(pessoas[indiceMenorPeso]);
	write(' é a pessoa mais leve, com ');
	write(menorPeso);
	writeln;
	write(pessoas[indiceMaiorPeso]);
	write(' é a pessoa mais pesada, com ');
	write(maiorPeso);
end.
