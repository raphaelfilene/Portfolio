Program questao5 ;
var pares,impares,primos: array [0..14] of integer;
var i,j,indicePares,indiceImpares,indicePrimos,numeroDigitado,somaImpares,quantidadeDePares,somaDosPrimos:integer;
Begin
	somaImpares:=0;
	quantidadeDePares:=0;
	somaDosPrimos:=0;
	indicePares:=0;
	indiceImpares:=0;
	indicePrimos:=0;
	writeln('Coloque, a seguir, o número que desejas encaixar em cada uma das 15 posições do vetor.');
	for i:=0 to 14 do
		begin
		write('Posição ');
		write(i+1);
		write(': ');
		readln(numeroDigitado);
		writeln;
		if (numeroDigitado = 2) then //par e primo
			begin
			quantidadeDePares:=quantidadeDePares+1;
			somaDosPrimos:=somaDosPrimos+numeroDigitado;
			pares[indicePares]:=numeroDigitado;
			indicePares:=indicePares+1;
			primos[indicePrimos]:=numeroDigitado;
			indicePrimos:=indicePrimos+1;
			end
		else //se for diferente de '2'...
			begin
			if (numeroDigitado mod 2 = 0) then //se entrou aqui entao eh um par nao primo (pois o unico par primo eh o '2')
				begin
				quantidadeDePares:=quantidadeDePares+1;
				pares[indicePares]:=numeroDigitado;
				indicePares:=indicePares+1;
				end
			else //se chegou aqui entao eh porque eh um numero impar
				begin
				somaImpares:=somaImpares+numeroDigitado;
				impares[indiceImpares]:=numeroDigitado;
				indiceImpares:=indiceImpares+1;
				//Agora preciso verificar se ele eh um numero primo:
				if (numeroDigitado>2) then
					begin
					j:=2;
					while (numeroDigitado mod j <> 0) do //isso aqui soh vai parar quando achar o menor j que seja maior ou igual a 2 e que seja divisor do numeroDigitado
						j:=j+1;
					if (j=numeroDigitado) then //pra ser primo, um numero soh precisa ser divisivel apenas por 1 e por ele mesmo;
						//como comecei com j=2, se 'j' chegou aqui com um valor diferente de numeroDigitado, entao significa que apareceu algum divisor de 'numeroDigitado' diferente de j e, entao ele nao eh primo
						//porehm, se j=numeroDigitado, entao significa que o nuhmero eh primo, haja visto que ele nao foi divisivel por nenhum valor entre 2 e ele mesmo, exceto por ele mesmo
						begin
						somaDosPrimos:=somaDosPrimos+j;
						primos[indicePrimos]:=numeroDigitado;
						indicePrimos:=indicePrimos+1;
						end; //end do if mais interno
					end; //end do outro if
				end; //end do else mais interno
		end; //end do outro else
	end; //do for
	writeln;
	write('Os números pares digitados foram: [');
	for i:=0 to indicePares-1 do
		begin
		write(pares[i]);
		if (i<indicePares-1) then
			write(', ')
		else
			write(']');
		end;
	writeln;
	write('Os números impares digitados foram: [');
	for i:=0 to indiceImpares-1 do
		begin
		write(impares[i]);
		if (i<indiceImpares-1) then
			write(', ')
		else
			write(']');
		end;
	writeln;
	write('Os números primos digitados foram: [');
	for i:=0 to indicePrimos-1 do
		begin
		write(primos[i]);
		if (i<indicePrimos-1) then
			write(', ')
		else
			write(']');
		end;
	writeln;
	write('A soma dos ímpares é: ');
	write(somaImpares);
	writeln;
	write('A quantidade de pares é: ');
	write(quantidadeDePares);
	writeln;
	write('E, a soma dos primos é: ');
	write(somaDosPrimos);
	writeln;
				
End.
