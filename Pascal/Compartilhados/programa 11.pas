Program Moda_e_Mediana;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador

//EXEMPLO
//vetor=[1,1,1,2,3,4,3,2,3,1,4,3]
//vetor_sem_repeticoes=[1,2,3,4]
//vetor_qtd_repeticoes=[4,2,4,2]

type
	tipo_vetor=array [1..20] of integer;

var
	vetor,vetor_sem_repeticoes,vetor_qtd_repeticoes:tipo_vetor;
	i,j,tam_vetor_sem_rep,maior_frequencia,auxiliar:integer;
	ja_possui_igual:boolean;

PROCEDURE criar_vetor;
	begin;
	writeln;
	write('Adicione 20 valores: ');
	writeln;
	for i:=1 to 20 do
		begin;
			write(i,'º: ');
			read(vetor[i]);
			writeln;
		end;
	end;
	
PROCEDURE criar_vetor_sem_repeticoes;
	begin;
	vetor_sem_repeticoes[1]:=vetor[1];
	tam_vetor_sem_rep:=1;
	for i:=2 to 20 do
		begin;
		ja_possui_igual:=false;
		for j:=1 to i-1 do
			begin;
			if (vetor[i]=vetor_sem_repeticoes[j]) then
				begin;
				ja_possui_igual:=true;
				end;
			end;
		if (not ja_possui_igual) then
			begin;
			tam_vetor_sem_rep:=tam_vetor_sem_rep+1;
			vetor_sem_repeticoes[tam_vetor_sem_rep]:=vetor[i];
			end;
		end;
	end;

PROCEDURE criar_vetor_qtd_repeticoes;
	begin;
	for i:=1 to tam_vetor_sem_rep do
		begin;
		vetor_qtd_repeticoes[i]:=0;
		for j:=1 to 20 do
			begin;
			if (vetor_sem_repeticoes[i]=vetor[j]) then
				begin;
				vetor_qtd_repeticoes[i]:=vetor_qtd_repeticoes[i]+1;
				end;
			end;
		end;
	end;

PROCEDURE achando_a_maior_frequencia;
	begin;
	maior_frequencia:=1;
	for i:=1 to tam_vetor_sem_rep do
		begin;
		if (vetor_qtd_repeticoes[i]>maior_frequencia) then
			begin;
			maior_frequencia:=vetor_qtd_repeticoes[i];
			end;
		end;
	end;

PROCEDURE moda;
	begin;
	criar_vetor;
	criar_vetor_sem_repeticoes;
	criar_vetor_qtd_repeticoes;
	achando_a_maior_frequencia;
	writeln;
	if (maior_frequencia<>1) then
		begin;
		write('A MODA é: ');
		for i:=1 to tam_vetor_sem_rep do
			begin;			
			if (vetor_qtd_repeticoes[i]=maior_frequencia) then
				begin;
				write(vetor_sem_repeticoes[i],'  ');
				end;
			end;
		end
	else
		write('A sequência dada não possui Moda!');
	end;

PROCEDURE ordenar_vetor;
	begin;
	for i:=1 to 20 do
		begin;
		for j:=i+1 to 20 do
			begin;
			if(vetor[i]>vetor[j]) then
				begin;
				auxiliar:=vetor[i];
				vetor[i]:=vetor[j];
				vetor[j]:=auxiliar;
				end;
			end;
		end;
	end;

PROCEDURE mediana;
	begin;
	writeln;
	ordenar_vetor;
	write('A Mediana é: ',(vetor[10]+vetor[11])/2);
	end;
	
Begin
	moda;
	mediana;
	
End.