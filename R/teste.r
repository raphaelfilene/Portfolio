n<-40
p<-0.99
result<-0
sum<-0
for(k in 0:n){
	if(k%%2==0){
		sum<-sum+choose(n-1,k)*(p^(n-1-k))*((1-p)^k)
	}
		
}
result<-sum*100
print(result)
