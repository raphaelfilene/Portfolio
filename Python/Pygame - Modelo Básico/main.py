# -*- coding: utf-8 -*-

from pygame import*
from pygame.locals import*
import os,sys

init() #este init é do pygame e serve para iniciar o display e suas fontes

#agora, vou colocar a função "time" da biblioteca pygame dentro da variável "pytime", pois chamarei um outro "time" porém agora da biblioteca padrão do python
pytime=time

from time import time

class Janela:
	u'''Esta classe trabalhará as propriedades básicas da janela do jogo'''
	#ícone do jogo que aparecerá no topo da janela
	icone=image.load('imagens/icone.png')
	
	#título da janela
	nome='Meu jogo'
	
	#tamanho da tela (largura x altura)
	dimensao=[600,400]
	
	#centro da tela
	centro=[i/2 for i in dimensao]
	
	#é tela fullscreen? True or False?
	fullscreen=False
	
	def __init__(self):
		#add nome à janela do jogo
		display.set_caption(self.nome)
		
		#add ícone à janela do jogo
		display.set_icon(self.icone)
		
		#criando o objeto 'tela' (é sobre tal objeto que colocarei todo o jogo)
		self.tela=display.set_mode((self.dimensao),[RESIZABLE,FULLSCREEN][self.fullscreen])
		
	def set_fullscreen(self):
		u'''Com esta função será possível trocar a tela de fullscreen pra modo janela e vice-versa'''
		if self.fullscreen:
			self.fullscreen=False
			self.tela=display.set_mode((self.dimensao),RESIZABLE)
		else:
			self.fullscreen=True
			self.tela=display.set_mode((self.dimensao),FULLSCREEN)
		

class Jogo:
	u'''Esta classe trabalhará nas propriedades gerais e básicas do jogo'''
	#é a variável que manterá o looping do jogo
	run=True
	
	#é o contador de tempo do jogo. Se o jogo tem, por exemplo, fps=60, então em cada segundo passarão 60 quadros e em cada quadro este "tempo" será acrescido em 60 e, em 3 segundos terei tempo=180 por exemplo.
	tempo=0
	
	#quantidade de quadros por segundo (tem um certo limite dado de pc para pc, de acordo tbm com os monitores...)
	fps=60
	
	def __init__(self,time_do_pygame):
		self.time=time_do_pygame
		
	def quit(self):
		u'''Sai do jogo'''
		self.run=False

class Teclas:
	u'''Nesta classe eu coloco as atividades básicas que os botões do teclado/mouse realizarão'''
	clicadas=[]
	pressionadas=[]
	
	def resetando_clicadas(self):
		u'''Limpa a lista de teclas clicadas'''
		self.clicadas=[]
	
	def situacao_teclas(self,evento):
		u'''Atualiza as variáveis "clicadas" e "pressionadas" com a lista de botões clicados/pressionados'''
		if evento.type==KEYDOWN:#se algum botao do teclado foi clicado
			self.clicadas.append(evento.key)
			self.pressionadas.append(evento.key)
		elif evento.type==KEYUP: #se soltei algum botao do teclado
			if evento.key in self.pressionadas:
				self.pressionadas.remove(evento.key)
		elif evento.type==MOUSEBUTTONDOWN: #se algum botao do mouse foi clicado
			self.clicadas.append(evento.button)
			self.pressionadas.append(evento.button)
		elif evento.type==MOUSEBUTTONUP: #se soltei algum botao do mouse
			if evento.button in self.pressionadas:
				self.pressionadas.remove(evento.button)

class Boneco:
	#posição inicial
	posicao=[100,100]
	
	#diâmetro da bolinha que o representa
	tamanho=15
	
	#cor da bolinha em rgb
	cor=(255,0,0)
	
	#criando a superfície retangular sobre a qual colocarei a imagem do boneco
	imagem=Surface((tamanho,tamanho))
	
	#criando uma bolinha vermelha sobre a superfície que criei. A bolinha terá raio igual a tamanho/2 e ficará no centro desta superfície que criei
	draw.circle(imagem,cor,[int(tamanho/2),int(tamanho/2)],int(tamanho/2))
	
	#tamanho do passo do boneco == quantidade de pixels que o boneco andará a cada "passo"
	passo=4

screen=Janela()
jogo=Jogo(pytime)
teclas=Teclas()
boneco=Boneco()

tamanho_fonte=16
legenda_exemplo=font.SysFont('arial',tamanho_fonte).render('legenda de exemplo',1,(255,0,0))

def rotinas():
	u'''Agrupei nesta função as atividades que precisam ser "rodadas" ao final de cada quadro'''
	#atualizando o tempo
	jogo.tempo+=1
	
	#atualizando a tela
	display.update()
	
	#"limpando"(na verdade eu estou pintando ela de rgb=(0,0,0)=preto) a tela --- essa limpeza só será visualizada na próxima vez que a tela for atualizada
	screen.tela.fill((0,0,0))
	
	#fazendo o jogo rodar com a qtd de quadros por segundos estabelecida
	jogo.time.Clock().tick(jogo.fps)

def mover_boneco():
	#caso seja pressionado o botão 'w' ou  a 'seta para cima'
	if K_w in teclas.pressionadas or K_UP in teclas.pressionadas:
		boneco.posicao[1]+=-boneco.passo;
	
	#caso seja pressionado o botão 's' ou  a 'seta para baixo'
	if K_s in teclas.pressionadas or K_DOWN in teclas.pressionadas:
		boneco.posicao[1]+=+boneco.passo;
	
	#caso seja pressionado o botão 'a' ou  a 'seta para a esquerda'
	if K_a in teclas.pressionadas or K_LEFT in teclas.pressionadas:
		boneco.posicao[0]+=-boneco.passo;
	
	#caso seja pressionado o botão 'd' ou  a 'seta para a direita'
	if K_d in teclas.pressionadas or K_RIGHT in teclas.pressionadas:
		boneco.posicao[0]+=boneco.passo;
		
	
def jogar():
	while jogo.run:
		#apagando o registro de teclas clicadas no quadro anterior
		teclas.resetando_clicadas()
		
		#analisando os eventos que ocorreram no quadro atual
		for evento in event.get():
			if evento.type==QUIT:
				jogo.quit()
			else:
				#atualizando a situação das teclas clicadas/pressionadas
				teclas.situacao_teclas(evento)
		
		#verificando possíveis movimentos do boneco
		mover_boneco()
		
		#colocando o boneco na tela principal e em uma determinada posição
		screen.tela.blit(boneco.imagem,boneco.posicao)

		#colocando a legenda de exemplo
		screen.tela.blit(legenda_exemplo,(0,0))
		
		#rotinas que preciso rodar toda vez que um quadro terminar
		rotinas()

jogar()

#fechar a janela do pygame
quit()

#fechar a aplicação python
sys.exit()