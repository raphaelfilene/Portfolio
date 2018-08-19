#para rodar este arquivo faça: R < "linguagem R.r" --no-save

vetor=c()
soma<-0

for (j in 1:1000){
	caso=0
	tR<-runif(1000,0,30)
	tJ<-runif(1000,0,30)
	for (i in 1:1000){
		espera<-abs(tR[i]-tJ[i])
		if ((tR[i]>tJ[i] && espera<5) || (tR[i]<tJ[i] && espera<7))
			caso<-caso+1
	}
	vetor[j]<-c(caso)
	soma<-soma+caso
}
print(vetor)

print('A soma total é: ')
print(soma)
print('Então, a média dos resultados é: ')
print(soma/length(vetor))