Program Exercicio2;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador
var
	matriz: array [0..4,0..4] of integer;
	i,j,qtd_mult_5,qtd_mult_11,qtd_mult_13,valor_inserido: integer;
	este_numero_ja_foi_usado_neste_looping: boolean;

Begin
	qtd_mult_5:=0;
	qtd_mult_11:=0;
	qtd_mult_13:=0;
	while((qtd_mult_5<5) or (qtd_mult_11<10) or (qtd_mult_13<10)) do
		begin //do while
		writeln;
		writeln;
		writeln('Digite um valor a ser inserido na matriz 5x5');
		readln(valor_inserido);
		if(valor_inserido mod 5 = 0) then
			begin //do primeiro if
			if(qtd_mult_5<5) then
				begin //do segundo if
				matriz[qtd_mult_5][qtd_mult_5]:=valor_inserido;
				qtd_mult_5:=qtd_mult_5+1;
				este_numero_ja_foi_usado_neste_looping:=true;
				end //do segundo if
			else
				begin;
				writeln;
				write('Diagonal totalmente preenchida');
				end;
			end; //do primeiro if
		if(not este_numero_ja_foi_usado_neste_looping) then
			begin //do terceiro if
			if(valor_inserido mod 11 = 0) then
				begin //do quarto if
				if(qtd_mult_11<10) then
					begin //do quinto if
					if(qtd_mult_11<4) then //preenchendo as 4 posições: (0,1) (0,2) (0,3) (0,4)
						matriz[0][1+qtd_mult_11]:=valor_inserido
					else if(qtd_mult_11<7) then //preenchendo as 3 posições: (1,2) (1,3) (1,4)
						matriz[1][2+(qtd_mult_11 mod 4)]:=valor_inserido
					else if(qtd_mult_11<9) then //preenchendo as 2 posições: (2,3) (2,4)
						matriz[2][3+(qtd_mult_11 mod 7)]:=valor_inserido
					else //preenchendo a posição: (3,4)
						matriz[3][4]:=valor_inserido;
					qtd_mult_11:=qtd_mult_11+1;
					este_numero_ja_foi_usado_neste_looping:=true;
					end //do quinto if
				else
					begin;
					writeln;
					write('Nao existe espaço acima da diagonal principal;');
					end;
				end; //do quarto if
			if((not este_numero_ja_foi_usado_neste_looping) and (valor_inserido mod 13 = 0)) then
				begin //do sexto if
				if(qtd_mult_13<10) then
					begin //do sétimo if
					if(qtd_mult_13<1) then //preenchendo a posição: (1,0)
						matriz[1][0]:=valor_inserido
					else if(qtd_mult_13<3) then //preenchendo as 2 posições: (2,0) (2,1)
						matriz[2][qtd_mult_13-1]:=valor_inserido
					else if(qtd_mult_13<6) then //preenchendo as 3 posições: (3,0) (3,1) (3,2)
						matriz[3][qtd_mult_13 mod 3]:=valor_inserido
					else //preenchendo as 4 posições: (4,0) (4,1) (4,2) (4,3)
						matriz[4][qtd_mult_13 mod 6]:=valor_inserido;
					qtd_mult_13:=qtd_mult_13+1;
					end //do sétimo if
				else
					begin;
					writeln;
					write('Nao existe espaço abaixo da diagonal principal;');
					end;
				end; //do sexto if
			end; //do terceiro if
		if(not este_numero_ja_foi_usado_neste_looping) then
			writeln('O valor inserido precisa ser múltiplo de 5 e/ou 11 e/ou 13!');
		este_numero_ja_foi_usado_neste_looping:=false;
		end; //do while
	for i:=0 to 4 do
		begin;
		writeln;
		for j:=0 to 4 do
			write(matriz[i][j]:5,' ');
		writeln;
		end;
	writeln;
End.