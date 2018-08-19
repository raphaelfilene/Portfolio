Program matriz ;
uses CRT; //pra garantir um correto funcionamento de write e read em qualquer compilador
var matriz: array [0..40,0..40] of integer;
var i,j,x,indice_maximo,valor_max_a_ser_add_no_indice_i,valor_atual,i_max:integer;


Begin
	x:=-1;
	while ((x<0) or (x>20)) do
	begin
		writeln;
		writeln('Insira um valor entre 0 e 20:');
		readln(x);
	end; //do while
	
	indice_maximo:=2*(x-1);
	
	//colocando os valores dentro da matriz
	for i:=0 to x-1 do
	begin
		valor_atual:=i+1;
		valor_max_a_ser_add_no_indice_i:=indice_maximo-2*i;
		for j:=0 to valor_max_a_ser_add_no_indice_i do
		begin
			i_max:=i+valor_max_a_ser_add_no_indice_i;
			matriz[i][i+j]:=valor_atual;
			matriz[i+j][i]:=valor_atual;
			matriz[i_max,i_max-j]:=valor_atual;
			matriz[i_max-j,i_max]:=valor_atual;
		end; //do segundo for
	end; //do primeiro for
	
	//mostrando os valores que estão dentro da matriz
	for i:=0 to indice_maximo do
	begin
		writeln;
		for j:=0 to indice_maximo do
		begin
			write(matriz[i][j]:2);
			write(' ');
		end; //do segundo for
	end; //do primeiro for
End. //do Begin inicial
