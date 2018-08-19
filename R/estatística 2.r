#para rodar este arquivo faça: R < "estatística 2.r" --no-save

total_interacoes<-1000
grau_precisao<-10000 #se aqui for igual a 1000, significa que terei uma resposta até a terceira(1/1000=0.001) casa decimal, ex: p=0.982

calcular_prob<-function(qtd_pessoas,prob_verdade){
	qtd_acertos<-0
	q<-(1-prob_verdade)*grau_precisao #explicação: supondo que grau_precisao=1000 e prob_verdade=0.99; então q=10. Daí, se eu calcular a chance de sair um valor menor ou igual a 10 num número randômico entre 1 e o grau_precisao(que é 1000), isso dará 10/1000=0.01 que é a probabilidade da pessoa estar mentindo.
	for (i in 1:total_interacoes){
		palavra<-1
		for (pessoa in 1:(qtd_pessoas-1)){
			if (q>=sample(1:grau_precisao,1,replace=T)){ #se estiver mentindo..
				palavra<-1-palavra
			}
		}
		if (palavra==1)
			qtd_acertos<-qtd_acertos+1
	}
	return(qtd_acertos/total_interacoes)
}


#caso n=41 e p=0.99
print(calcular_prob(41,0.99))

#caso n->infinito (colocarei n=200 por causa do meu pc que não aguenta mt)
print(calcular_prob(200,0.99))

#interpretação sobre a segunda pergunta (de n->infinito). A resposta é "p" tendendo a 0.5, ou seja, tendendo a 50%. A justificativa é simples: quando "n" cresce, a chance de ocorrerem mentiras aumentam, então, se 'n' tende a infinito, a quantidade de mentiras vai tender a infinito, de modo que o "sim" e o "não" vão se alternando enormemente, tendendo então a deixar de depender da palavra inicial e passando a ter 50% de chances de ser uma palavra ou outra.


# Modo teórico
# n<-40
# p<-0.99
# result<-0
# sum<-0
# for(k in 0:n){
# 	if(k%%2==0){
# 		sum<-sum+choose(n-1,k)*(p^(n-1-k))*((1-p)^k)
# 	}
		
# }
# result<-sum*100
# print(result)