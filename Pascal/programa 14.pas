Program Software;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador

type
	tipo_vetor=array [1..50] of integer;

var
	A,B,C,D:tipo_vetor;
	i,qtd_valores,valor_digitado:integer;

PROCEDURE mostrar_vetor(vetor:tipo_vetor);
	begin;
		write(': [',vetor[1]);
		for i:=2 to 50 do
			begin;
			write(',',vetor[i]);
			end;
		write(']');
	end;

Begin
	while(qtd_valores<100) do
		begin;
		writeln;
		if(qtd_valores<50) then
			begin;
			write('Digite um valor para o vetor A:');
			writeln;
			qtd_valores:=qtd_valores+1;
			readln(valor_digitado);
			A[qtd_valores]:=valor_digitado;
			end
		else if(qtd_valores<100) then
			begin;
			write('Digite um valor para o vetor B:');
			writeln;
			qtd_valores:=qtd_valores+1;
			readln(valor_digitado);
			B[qtd_valores-50]:=valor_digitado;
			end;
		end;
	writeln;
	for i:=1 to 50 do
		begin;
		if(i<=25) then
			begin;
			C[i]:=A[i];
			D[i]:=B[i]
			end
		else
			begin;
			C[i]:=B[i];
			D[i]:=A[i];
			end;
		end;
	writeln;
	write('A');
	mostrar_vetor(A);
	writeln;
	write('B');
	mostrar_vetor(B);
	writeln;
	write('C');
	mostrar_vetor(C);
	writeln;
	write('D');
	mostrar_vetor(D);
End.