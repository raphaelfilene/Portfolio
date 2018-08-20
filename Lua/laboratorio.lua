-- se quiser algo diretamente no prompt basta fazer, por exemplo: lua -e "print 'hello'"
--pra rodar esse arquivo basta fazer: lua laboratorio.lua no prompt

--Meu MODO

nomeDoArquivo = "nomes.txt"

index=1
dados={}
for i in io.lines(nomeDoArquivo) do
	dados[index]=i
	index=index+1
end

resultado={}
for i,j in ipairs(dados) do
	if i%2==1 then
		resultado[dados[i]]=dados[i+1]
	end
end

for i,j in pairs(resultado) do
	print (i,j)
end

--Para ler linha por linha usando o modo do professor
print ("\n\nVeja o modo que o professor fez pra ler linha a linha:")
local contador=0
local arquivo=io.open(nomeDoArquivo,"r")
linha=arquivo:read("*l")
while(linha~=nil) do
	contador=contador+1
	print(contador,linha)
	linha=arquivo:read("*l")
end
arquivo:close()