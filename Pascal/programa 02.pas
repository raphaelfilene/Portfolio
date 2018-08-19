Program NumTermos;
var i,numeroDeTermos,a,b,c: integer;
Begin
	a:=2;
	b:=7;
	c:=3;
	Writeln('Digite o número de termos desejado:');
	Readln(numeroDeTermos);
	for i:=0 to numeroDeTermos-1 do
		Case i mod 3 of
			0: Begin
				Writeln(a);
				a:=a*2;
				End;
			1: Begin
				Writeln(b);
				b:=b*3;
				End;
			2: Begin
				Writeln(c);
				c:=c*4;
				End;
		End;
End.