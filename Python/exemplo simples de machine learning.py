# -*- coding: utf-8 -*-
from textblob.classifiers import NaiveBayesClassifier
from textblob import TextBlob

lista_treinamento=[
	#animais
	(u'cachorro',	0),
	(u'gato',		0),
	(u'papagaio',	0),
	(u'macaco',		0),
	(u'elefante',	0),
	(u'leão',		0),
	
	#cores
	(u'azul',		1),
	(u'verde',		1),
	(u'vermelho',	1),
	(u'amarelo',	1),
	(u'branco',		1),
	(u'preto',		1),
	
	#lugares
	(u'praia',		2),
	(u'cinema',		2),
	(u'casa',		2),
	(u'fazenda',	2),
	(u'jardim',		2),
	(u'rua',		2),	
]

significado_dos_grupos=[
	u'Frase sobre animais',
	u'Frase sobre cores',
	u'Frase sobre lugares'
]

classificador=NaiveBayesClassifier(lista_treinamento)

frases_teste=[
	u'Hoje vi um cachorro correndo atrás de um gato na rua',
	u'O arco-írias é formado por muitas cores: verde, vermelho, amarelo e etc',
	u'Você prefere praia ou cinema?'
]

#Essa parte não é complicada, mas ficou um pouco grande porque quis deixar o texto bem formatado e explicado quando este for pra tela do pc. Mas aqui, basicamente, printa os resultados na tela....
for frase in frases_teste:
	resultado=classificador.classify(frase)
	resultado=significado_dos_grupos[resultado]
	chances_de_ser_do_grupo_0=classificador.prob_classify(frase).prob(0)
	chances_de_ser_do_grupo_1=classificador.prob_classify(frase).prob(1)
	chances_de_ser_do_grupo_2=classificador.prob_classify(frase).prob(2)
	print(u'\n\tFrase:\n%s\nResultado: %s\n\n'%(frase,resultado))
	print(u'Probabilidades:\n%s - %.2f%%\n%s - %.2f%%\n%s - %.2f%%'%(significado_dos_grupos[0],100*chances_de_ser_do_grupo_0,significado_dos_grupos[1],100*chances_de_ser_do_grupo_1,significado_dos_grupos[2],100*chances_de_ser_do_grupo_2))
	