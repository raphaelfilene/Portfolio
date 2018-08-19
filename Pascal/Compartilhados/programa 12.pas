Program Software;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador

var
	janela,corredor: array [0..23] of integer;
	i,opcao,posicao,numero_poltrona,qtd_passagens_vendidas:integer;

PROCEDURE venda;
	begin;
	posicao:=-1;
	numero_poltrona:=-1;
	writeln;
	while((posicao<>0) and (posicao<>1)) do
		begin;
		writeln;
		write('Em qual posição você deseja sentar:');
		writeln;
		write('0 - Corredor');
		writeln;
		write('1 - Janela');
		writeln;
		readln(posicao);
		if((posicao<>0) and (posicao<>1)) then
			begin;
			write('A opção digitada é inválida!');
			writeln;
			end;
		end;
	while((numero_poltrona<1) or (numero_poltrona>24)) do
		begin;
		writeln;
		write('Qual o número da poltrona no qual você deseja se sentar?');
		writeln;
		write('Resposta: ');
		readln(numero_poltrona);
		if((numero_poltrona<1) or (numero_poltrona>24)) then
			begin;
			writeln;
			write('O número da poltrona precisa ser um inteiro entre 1(inclusive) e 24(inclusive)!');
			writeln;
			end;
		end;
	if(posicao=0) then
		begin;
		if(corredor[numero_poltrona-1]=0) then
			begin;
			writeln;
			write('Venda efetivada!');
			writeln;
			corredor[numero_poltrona-1]:=1;
			qtd_passagens_vendidas:=qtd_passagens_vendidas+1;
			end
		else
			begin;
			writeln;
			write('Poltrona ocupada!');
			writeln;
			end;
		end
	else
		begin;
		if(janela[numero_poltrona-1]=0) then
			begin;
			writeln;
			write('Venda efetivada!');
			writeln;
			janela[numero_poltrona-1]:=1;
			qtd_passagens_vendidas:=qtd_passagens_vendidas+1;
			end
		else
			begin;
			writeln;
			write('Poltrona ocupada!');
			writeln;
			end;
		end;
	writeln;
	end;

PROCEDURE mostrar_ocupacao;
	begin;
	writeln;
	write('Corredor       Janela');
	writeln;
	for i:=0 to 23 do
		begin;
		writeln;
		write((i+1):2,':  ',corredor[i],'           ',janela[i]);
		end;
	writeln;
	end;

PROCEDURE menu;
	begin;
	writeln;
	write('Escolha uma das opções abaixo:');
	writeln;
	write('1-Vender passagem');
	writeln;
	write('2-Mostrar mapa de ocupação do ônibus');
	writeln;
	write('3-Encerrar');
	writeln;
	readln(opcao);
	end;
		
	
Begin
	qtd_passagens_vendidas:=0;
	while((opcao<>3) and (qtd_passagens_vendidas<>48)) do
		begin;
		menu;
		if(opcao=1) then
			venda
		else if(opcao=2) then
			begin;
			mostrar_ocupacao;
			end
		else if(opcao=3) then
			begin;
			clrscr;
			writeln;
			write('Programa encerrado!');
			writeln;
			end;
		if(qtd_passagens_vendidas=48) then
			begin;
			writeln;
			write('Agora o ônibus está lotado!');
			writeln;
			end;
		end;
	
End.