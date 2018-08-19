#para rodar este arquivo faça: R < "estatística.r" --no-save

#A chegou no tempo T1=12h+t1.
#B chegou no tempo T2=12h+t2.
#Condição para encontro: s>|t2-t1|, s sendo um inteiro.
#entre 12 e 13 existem 60min=3600 segundos. Considerando t1,t2 em segundos, temos: 3600>=t1,t2>=0

calcular_prob<-function(s,qtd_loops=100000){
	t1<-runif(qtd_loops,0,3600)
	t2<-runif(qtd_loops,0,3600)
	encontros<-0
	for (i in 1:qtd_loops){
		if (s>abs(t1[i]-t2[i]))
			encontros<-encontros+1
	}
	return(c(s,100*encontros/qtd_loops))
}


lista_prob<-c()
lista_espera<-c()

for (i in 1:3600){
	resultado<-calcular_prob(i)
	lista_espera[i]<-resultado[1]
	lista_prob[i]<-resultado[2]
	if (resultado[2]>=5)
		break
}

if (resultado[2]==5){
	tempo_em_segundos<-resultado[1]
} else {
	tempo_em_segundos<-resultado[1]-0.5
}

cat(sprintf("'s' é igual a %s seg = %s min",tempo_em_segundos,tempo_em_segundos/60))

plot(lista_espera,lista_prob,
     main="Curva de probabilidade",
     ylab="probabilidade(%)",
     xlab="s(em seg)",
     type="p",
     col="blue",
     cex=0.5,#número que indica o valor pelo qual o texto e os símbolos de plotagem devem ser dimensionados em relação ao padrão. 1 = padrão, 1,5 é 50% maior, 0,5 é 50% menor, etc.
     pch='.', #para especificar símbolos a serem usados ​​ao traçar pontos. Ex: '.', '*', 0 (quadrado), etc
     lty=1, #tipo de linha. 1=normal, 2=tracejada, 3=pontilhada, etc...
     lwd=1, #largura da linha em relação ao padrão (padrão = 1). 2 é o dobro da largura.
     cex.lab=0.2,
     )

#reta de regressão linear
abline(lm(lista_prob~lista_espera),col='red')

#reta em y=5
abline(h=5,col='green')

#colocando as escalas
axis(side=1,at=seq(0,100,5))