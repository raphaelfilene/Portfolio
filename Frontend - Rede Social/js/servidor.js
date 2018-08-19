voce={
	fotos: ['imagens/eu 1.jpg','imagens/papel de parede 6.jpg'],
    fotos_antigas: ['imagens/papel de parede 4.jpg','imagens/papel de parede 5.jpg'],
	nome: 'Raphael Filene',
	link_perfil: '#',
	status_chat: 1, //1=disponível, 0=invisível
    qtd_seguidores: 13324,
    qtd_seguindo: 263453425,
    qtd_stalkers: 2,
    qtd_visitas: [231,34,5], //[0]total, [1] nos últimos 7 dias, [2] ontem
    privacidade: [ //0=todos, 1=amigos, 2=você
        0, //nível de privacidade da visualização da quantidade de pessoas que te visitaram a sua página
        1, //nível de privacidade da visualização das informações do seu perfil
    ],
    idade: 25,
    cidade: 'Rio de Janeiro',
    sexo: 1, //[1]=masculino, [0]=feminino
    data_nascimento: [30,12,1992],
    religiao: 'Cristão Protestante',
    relacionamento: 0, //0=solteiro, 1=namorando, 2=noivo, 3=casado
	papeis_parede: ['imagens/papel de parede 8.jpg','imagens/papel de parede 9.jpg'],
    papeis_parede_antigos: ['imagens/papel de parede 2.jpg','imagens/papel de parede 3.jpg'],
    citacao: 'A persistência é o caminho para o êxito...',
}

pagina={
	propria:1, //1=sim, 0=não
	nome:'Clarice Fagundes', //necessário apenas caso propria=0
	fotos:['imagens/keira.jpg','imagens/natalie.jpg','imagens/julia.jpg'], //necessário apenas caso propria=0
	amigo:1, //necessário apenas caso propria=0
    convite_amizade_enviado:0, //necessário apenas caso propria=0
	voce_segue:1, //necessário apenas caso propria=0
	link_perfil:'#', //necessário apenas caso propria=0
	papel_parede: '',
}

notificacoes_amizade=[
    ['imagens/matt.jpg','Matt Damon','#',1], //[[0]-endereço da foto, [1] - nome, [2]-sexo (1=masculino 0=feminino)]
    ['imagens/natalie.jpg','Natalie Portman','#',0],
];

notificacoes_gerais=[
    ['like-pub','imagens/natalie.jpg','Natalie Portman',1,'#'],
    ['like-pub','imagens/matt.jpg','Matt Damon',2,'#'],
    ['like-pub','imagens/megan.jpg','Megan Fox',10,'#'],
];

publicidades={
    lateral: [[['imagens/unicef 1.jpg','Unicef','#'],['imagens/unicef 2.jpg','Unicef','#'],['imagens/unicef 3.jpg','Unicef','#']],15], //[[0]-[imagem,título,link],[1]-tempo de mudança no carrossel]
    central:  [[['imagens/unicef 1.jpg','Unicef','#'],['imagens/unicef 2.jpg','Unicef','#'],['imagens/unicef 3.jpg','Unicef','#']],15], //[[0]-[imagem,título,link],[1]-tempo de mudança no

}

diario1={
	data: '2017-03-22 3:40:10.121200',
	propria: true,
	tipo: 'diario',
	
	//necessários apenas se propria==false
	nome: '',
	foto_do_postador: '',
	link_perfil: '',
	
	valor_privacidade: 1,
    avaliacoes: [
        [524,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
    ],
    qtd_comentarios: 20,
    minha_avaliacao: 1, //-1 (nenhuma), 1 (like)
	emoticons_bool: [1,1,1,1,1], //-1(nenhum), 0(primeiro-algo positivo) e 1(segundo-algo negativo)
	descricao: 'Descrição pública qualquer...',
	foto_publicada: 'imagens/barca 3.jpg',
	video_publicado: '',
    comentarios: [],
    qtd_comentarios: 0,
}

diario2=$.extend(true,{},diario1);
diario2.video_publicado='https://www.youtube.com/watch?v=R5H3azWIoRo';
diario2.foto_publicada='';
diario2.valor_privacidade=2;

diario3=$.extend(true,{},diario1);
diario3.foto_publicada='imagens/barca 5.jpg';
diario3.propria=0;
diario3.nome='Clarice Lucas';
diario3.foto_do_postador='imagens/keira.jpg';
diario3.link_perfil='#';

album_bool1={
	data: '2018-02-22 3:40:10.121200',
	propria: true,
	tipo: 'bool_fotos',
	
	//necessários apenas se propria==false
	nome: '',
	foto_do_postador: '',
	link_perfil: '',
	
	valor_privacidade: 0,
	titulo: 'Hoje tive aula de Alg Lin Computacional',
	bool_fotos: ['imagens/real.jpg','imagens/barca 2.jpg'],
	votos: [1230,243,1],
	quem_votou: [
					[['Karina Alexandra','link.do.perfil','imagens/keira.jpg'],['Bárbara Silva','link.do.perfil','imagens/natalie.jpg']],
        			[['Maurício Almeida','link.do.perfil','imagens/matt.jpg']]
				],
    qtd_comentarios: 10,
    comentarios: [],
}

album_bool2=$.extend(true,{},album_bool1);
album_bool2.bool_fotos=['imagens/keira.jpg','imagens/natalie.jpg'];
album_bool2.votos=[23,12,0];

album_bool3=$.extend(true,{},album_bool1);
album_bool3.bool_fotos=['imagens/barca 5.jpg','imagens/barca 1.png'];
album_bool3.propria=0;
album_bool3.nome='Clarice Lucas';
album_bool3.foto_do_postador='imagens/keira.jpg';
album_bool3.link_perfil='#';

frase1={
    data: '2018-02-22 3:40:10.121200',
    propria: true,
    tipo: 'frase',

    //necessários apenas se propria==false
    nome: '',
    foto_do_postador: '',
    link_perfil: '',

    valor_privacidade: 0,
    titulo: 'Estou ansioso para concluir este projeto!',
    qtd_comentarios: 10,
    comentarios: [],
}

meme1={
    data: new Date(),
    propria: true,
    tipo: 'meme',

    //necessários apenas se propria==false
    nome: '',
    foto_do_postador: '',
    link_perfil: '',

    valor_privacidade: 1,
    titulo: 'Espero que o Brasil devolva os 7x1 algum dia...',
    foto_publicada: 'imagens/meme.jpg',
	avaliacoes: [
						[24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
						[12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
					],
    minha_avaliacao: 1, //-1 (nenhuma), 0 (unlike), 1 (like)
    video_publicado: '',
    comentarios: [
        [//comentário 1
            '', //nome indice=0 //necessário apenas se 'é você?'==0,
            '', //link do perfil indice=1 //necessário apenas se 'é você?'==0
            1, //é você? 0(não) 1(sim) indice=2
            '', //endereço da foto indice=3 //necessário apenas se 'é você?'==0
            'Comentário qualquer pra testar as "puladas de linhas":\n\nTestando...\n1\n2\n3..', //texto do comentário indice=4
            [
                [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
            ], //avaliacoes indice=5
            1, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
            '2018-03-26 19:23:01.446000', //horário do comentário indice=7
            [ //indice=8
                [ //resposta 1
                    'Clara Rodrigues', //nome //necessário apenas se 'é você?'==0
                    '#', //link do perfil indice=1 //necessário apenas se 'é você?'==0
                    0, //é você? 0(não) 1(sim)
                    'imagens/julia.jpg', //endereço da foto //necessário apenas se 'é você?'==0
                    'Durante a comemoração dos 65 anos da Volkswagen do Brasil, a reportagem de iG Carros apurou que a versão de produção do VW Tarek vai ser mostrada no Salão de Buenos Aires (Argentina), em meados de 2019, para começar a ser vendida no Brasil no início de 2020. Trata-se de um dos 5 SUVs que a fabricante já confirmou que vai lançar no País em dois anos. Pelo o que já se sabe, serão eles: Tigual AllSpace, T-Cross (que será feito em São José dos Pinhais, no Paraná, ainda este ano), Touareg, Tarek e o Atlas (deve chegar ao Brasil como Terramont, nome já usado na China).', //texto do comentário
                    [
                        [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                        [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
                    ], //avaliacoes indice=5
                    0, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
                    '2017-01-27 07:42:02.168000', //horário da resposta  indice=7
                    [ //edições anteriores indice=8
                        [
                            'Gianluca Vialli conhece o Chelsea desde antes da era endinheirada de Roman Abramovich. Experiente quando o assunto é o clube londrino, o ex-treinador italiano comentou sobre o conterrâneo Antonio Conte, atual comandante dos Blues...', //comentário anterior
                            '2018-03-24 12:03:44.446000', //horário do comentário
                        ],
                        [
                            '"Conte mal pode esperar para deixar o Chelsea. Ele não suporta o fato de que eles vendem e compram jogadores sem consultá-lo. A verdade é que o Chelsea quer um treinador que seja mais ligado ao clube", disse ao Sky Sport Italia....', //comentário anterior
                            '2018-03-25 09:20:05.446000', //horário do comentário
                        ],
                    ],
                ],
                [ //resposta 2
                    'Raphael Filene', //nome //necessário apenas se 'é você?'==0
                    '#', //link do perfil indice=1 //necessário apenas se 'é você?'==0
                    1, //é você? 0(não) 1(sim)
                    'imagens/eu 1.jpg', //endereço da foto //necessário apenas se 'é você?'==0
                    'Antes do Tarek, durante este ano de 2018, a Volkswagen vai trazer dois novos SUVs ao Brasil. O primeiro é a nova geração do Tiguan, que vem do México e que será mostrada para a imprensa no próximo dia 10 de abril. O carro será vendido com motor 1.4 ou 2.0, ambos turbinados e acomplados a caixas de câmbio automaticas. Terá versões de cinco e sete lugares e substitui a geração atual, que deixa de ser oferecida no Brasil, mas que continua sendo vendida em alguns países da Europa como opção de SUV mais em conta.', //texto do comentário
                    [
                        [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                        [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
                    ], //avaliacoes indice=5
                    0, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
                    '2017-03-22 3:40:10.121200', //horário da resposta indice=7
                    [], //edições anteriores indice=8
                ],
            ],
            2, //qtd de respostas indice=9
            [ //edições anteriores indice=10
                [
                    'Gianluca Vialli conhece o Chelsea desde antes da era endinheirada de Roman Abramovich. Experiente quando o assunto é o clube londrino, o ex-treinador italiano comentou sobre o conterrâneo Antonio Conte, atual comandante dos Blues...', //comentário anterior
                    '2018-03-24 12:03:44.446000', //horário do comentário
                ],
                [
                    '"Conte mal pode esperar para deixar o Chelsea. Ele não suporta o fato de que eles vendem e compram jogadores sem consultá-lo. A verdade é que o Chelsea quer um treinador que seja mais ligado ao clube", disse ao Sky Sport Italia....', //comentário anterior
                    '2018-03-25 09:20:05.446000', //horário do comentário
                ],
                [
                    'Os dois atuaram juntos na Juventus, de Turim. Vialli acha que o destino de Conte pode ser a seleção italiana ou um clube como o Paris Saint-Germain, mas também acredita que o ex-colega poderá escolher onde trabalhar...', //comentário anterior
                    '2018-03-26 10:03:34.446000', //horário do comentário
                ],
            ],
        ], //
        [//comentário 2
            'Clara Rodrigues', //nome indice=0 //necessário apenas se 'é você?'==0,
            '#', //link do perfil indice=1 //necessário apenas se 'é você?'==0
            0, //é você? 0(não) 1(sim) indice=2
            'imagens/keira.jpg', //endereço da foto indice=3 //necessário apenas se 'é você?'==0
            'Outro SUV que chega ao Brasil em 2018 é o T-Cross, que será o destaque da marca no Salão do Automóvel, em São Paulo, entre 8 e 18 de novembro. Será fabricado em São José dos Pinhais (PR), conforme apuramos. Trata-se da fábrica onde também é montado do Golf, a perua SpaceFox e dois modelos da Audi, o A3 Sedan e o SUV Q3. Feito sobre a mesma base do Polo, o T-Cross vai ser concorrente de SUVs compactos como Honda HR-V, Jeep Compass, Nissan Kicks, Ford EcoSport, Renault Duster, entre outros. Deverá ter motor 1.4 turbo flex e todos os recursos ofececidos na dupla Polo e Virtus, o que inclui o quadro de instrumentos digital e configurável.', //texto do comentário indice=4
            [
                [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
            ], //avaliacoes indice=5
            1, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
            '2017-12-27 04:25:01.446000', //horário do comentário indice=7
            [ //indice=8
                [ //resposta 1
                    'Clara Rodrigues', //nome //necessário apenas se 'é você?'==0
                    '#', //link do perfil indice=1 //necessário apenas se 'é você?'==0
                    0, //é você? 0(não) 1(sim)
                    'imagens/julia.jpg', //endereço da foto //necessário apenas se 'é você?'==0
                    'A Volkswagen é uma empresa alemã que pertence ao Grupo Volkswagen. É a maior fabricante de automóveis do mundo e tem a sua sede na cidade de Wolfsburg, na Baixa Saxônia.', //texto do comentário
                    [
                        [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                        [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
                    ], //avaliacoes indice=5
                    0, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
                    '2017-01-27 07:42:02.168000', //horário da resposta indice=7
                    [], //edições anteriores indice=8
                ],
                [ //resposta 2
                    'Raphael Filene', //nome //necessário apenas se 'é você?'==0
                    '#', //link do perfil indice=1 //necessário apenas se 'é você?'==0
                    1, //é você? 0(não) 1(sim)
                    'imagens/eu 1.jpg', //endereço da foto //necessário apenas se 'é você?'==0
                    'O Grupo Volkswagen, além da marca Volkswagen, é, também, proprietário das marcas Audi, Bentley, Bugatti, Ducati, Lamborghini, Seat, Porsche, Škoda Auto, MAN, Volkswagen Caminhões e Ônibus e Scania. Em março de 2011, a Volkswagen adquiriu o segmento comercial da Porsche[2] por 3,3 bilhões de euros, adquirindo, assim, o direito de negociar e operar a marca "Porsche", fazendo com que a Volkswagen fique mais próxima à fusão com a "PHS" (Porsche Holding Salzburg).', //texto do comentário
                    [
                        [24,[['Bruno Henrique','link da página do perfil','imagens/matt.jpg'],['Luis Gustavo','link da página do perfil','imagens/dicaprio.jpg']]], //qtd de curtis seguido das informações dos usuários que curtiram
                        [12,[]] //qtd de 'descurtis', mas guardando as informações dos usuários que descurtiram
                    ], //avaliacoes indice=5
                    0, //como você interagiu a esse comentário? -1(não fez nada) 1(curtiu)  0(descurtiu) indice=6
                    '2017-03-22 3:40:10.121200', //horário da resposta indice=7
                    [], //edições anteriores indice=8
                ],
            ],
            2, //qtd de respostas indice=9
            [], //edições anteriores indice=10
        ], //
    ],
    qtd_comentarios: 2,
}

meme1_copia=$.extend(true,{},meme1);
for (var i=0;i<10;i++){
    meme1.comentarios=meme1.comentarios.concat(meme1_copia.comentarios);
}
meme1.qtd_comentarios=meme1.comentarios.length;

publicacoes=[
    diario3,
    album_bool2,
    diario2,
    album_bool1,
    diario1,
    album_bool3,
    meme1,
    frase1,
];

conversas=[
    [
        'Natalie Portman', //nome-[0]
        0, //status chat-[1] --só importa se a "é amigo?" == sim
        'imagens/natalie.jpg', //foto-[2]
        '#', //link perfil-[3]
        '2018-02-24 3:40:10.121200', //[4] última vez em que foi visto online  --só importa se a "é amigo?" == sim e se tal usuário está visível para vc
        1, //é amigo?-[5]- 1(sim) 0(não);  SÓ FUNCIONA SE "É ANÔNIMO?==0"
        0, //é anônimo?[6] - 1(sim) -- 0(não)
        0, //"id de conversa" [7] (pois uma mesma pessoa poderá abrir uma conversa normal com um determinado id e diversas conversas anônimas com outros id's)
        0, //mensagens ânonimas bloqueadas para este usuário? - [8] 1(sim) 0(não);  SÓ FUNCIONA SE "É ANÔNIMO?==0"
        0, //sempre ficar invisível para este usuário? [9] 1(sim) --- 0(não);  SÓ FUNCIONA SE "É ANÔNIMO?==0"
    ],
    [
        'Keira Knightley',
        1,
        'imagens/keira.jpg',
        '#',
        '2018-03-12 13:14:10.121200',
        0, //não é amiga
        0, //não é anônima
        1, //id
        1,
        1,
    ],
    [
        'Matt Damon',
        0,
        'imagens/matt.jpg',
        '#',
        '2018-03-22 3:40:10.121200',
        0, //não é amigo
        1, //é anônima
        2,
        0,
        0,
    ],
    [
        'Leonardo Dicaprio',
        0,
        'imagens/dicaprio.jpg',
        '#',
        '2018-03-24 20:27:08.120200',
        1,
        1,
        3,
        1,
        0,
    ],
    [
        'Júlia Robert',
        0,
        'imagens/julia.jpg',
        '#',
        '2017-10-27 04:27:08.120200',
        1,
        0,
        4,
        0,
        0,
    ],
    [
        'Johnny Depp',
        0,
        'imagens/depp.jpg',
        '#',
        '2017-01-27 14:20:38.120200',
        1,
        0,
        5,
        0,
        0,
    ],
    [
        'Megan Fox',
        1,
        'imagens/megan.jpg',
        '#',
        '2016-07-07 04:06:29.120200',
        1,
        0,
        6,
        0,
        0,
    ],
    [
        'Mila Kunis',
        0,
        'imagens/mila.jpg',
        '#',
        '2018-01-12 5:23:53.110200',
        1,
        0,
        7,
        0,
        0,
    ],
    [
        'Emma Stone',
        1,
        'imagens/emma.jpg',
        '#',
        '2018-02-16 13:14:10.121200',
        1,
        0,
        8,
        0,
        0,
    ],
];

chat1=[
    0, //[0] id do chat
    2, //[1] número do pacote deste conjunto de mensagens (e tbm significa a quantidade de pacotes que ainda faltam receber; se aqui for 2 significa que existem ainda 2 pacotes de mensagens a serem recebidas)
    [ //[2] conversa
        [ //mensagem 1
            0, //[0]-de quem é a mensagem? 0-significa que é sua a mensagem e 1-significa que a mensagem é da outra pessoa na conversa
            'Olá!\nTudo bem?', //[1]-conteúdo da mensagem
            0, //[2]-id desta mensagem
            '2018-02-16 03:14:10.121200',//[3]-data da mensagem
            1, //[4]-a mensagem é resposta à alguma postagem-flash?
        ],
        [ //mensagem 2
            1,
            'Sim, e contigo?',
            1,
            '2018-02-16 13:14:10.121200',
            0,
        ],
        [ //mensagem 3
            0,
            'Mais ou menos...',
            2,
            '2018-02-17 23:14:10.121200',
            0,
        ],
        [ //mensagem 4
            1,
            'Não fique assim!',
            3,
            '2018-02-18 02:47:10.121200',
            0,
        ],
        [ //mensagem 5
            1,
            'Talvez um dia essa fase acabe...',
            4,
            '2018-04-20 12:50:10.121200',
            0,
        ],
        [ //mensagem 6
            0,
            'Mesmo que essa fase passe, eu tenho medo do que me aguarda no futuro...',
            5,
            '2018-04-22 15:00:10.121200',
            0,
        ],
        [ //mensagem 7
            0,
            'Mas, mudando de assunto, como você está?',
            6,
            '2018-04-23 00:00:10.121200',
            0,
        ],
    ]
];

listagem_amigos=[ //esta lista não é para minha página e sim para as páginas das outras pessoas, pois para a minha página a lista de amigos será o próprio chat
    [ //amigo 1
        'Natalie Portman', //[0] - nome
        '#', //[1] - link da página de perfil
        'imagens/natalie.jpg', //[2] - link da imagem
    ],
    [
        'Keira Knightley',
        '#',
        'imagens/keira.jpg',
    ],
    [
        'Matt Damon',
        '#',
        'imagens/matt.jpg',
    ],
    [
        'Leonardo Dicaprio',
        '#',
        'imagens/dicaprio.jpg',
    ],
    [
        'Júlia Robert',
        '#',
        'imagens/julia.jpg',
    ],
    [
        'Johnny Depp',
        '#',
        'imagens/depp.jpg',
    ],
    [
        'Megan Fox',
        '#',
        'imagens/megan.jpg',
    ],
    [
        'Mila Kunis',
        '#',
        'imagens/mila.jpg',
    ],
    [
        'Emma Stone',
        '#',
        'imagens/emma.jpg',
    ],
];

listagem_paginas=[
    [ //página 1
        'Página 1', //[0] - nome
        '#', //[1] - link da página de perfil
        'imagens/papel de parede 1.jpg', //[2] - link da imagem
    ],
    [
        'Página 2',
        '#',
        'imagens/papel de parede 2.jpg',
    ],
    [
        'Página 3',
        '#',
        'imagens/papel de parede 3.jpg',
    ],
    [
        'Página 4',
        '#',
        'imagens/papel de parede 4.jpg',
    ],
    [
        'Página 5',
        '#',
        'imagens/papel de parede 5.jpg',
    ],
    [
        'Página 6',
        '#',
        'imagens/papel de parede 6.jpg',
    ],
    [
        'Página 7',
        '#',
        'imagens/papel de parede 7.jpg',
    ],
];

listagem_pessoas_a_quem_sigo=[ //esta lista só deve aparecer para o próprio dono da página
    [ //amigo 1
        'Natalie Portman', //[0] - nome
        '#', //[1] - link da página de perfil
        'imagens/natalie.jpg', //[2] - link da imagem
    ],
    [
        'Keira Knightley',
        '#',
        'imagens/keira.jpg',
    ],
    [
        'Matt Damon',
        '#',
        'imagens/matt.jpg',
    ],
    [
        'Leonardo Dicaprio',
        '#',
        'imagens/dicaprio.jpg',
    ],
    [
        'Júlia Robert',
        '#',
        'imagens/julia.jpg',
    ],
    [
        'Johnny Depp',
        '#',
        'imagens/depp.jpg',
    ],
    [
        'Megan Fox',
        '#',
        'imagens/megan.jpg',
    ],
    [
        'Mila Kunis',
        '#',
        'imagens/mila.jpg',
    ],
    [
        'Emma Stone',
        '#',
        'imagens/emma.jpg',
    ],
];

lista_flashes=[
    [
        '', //nome-[0] -- necessário apenas se "esses flashes são seus?==false"
        '', //foto-[1] -- necessário apenas se "esses flashes são seus?==false"
        ((new Date()).getTime()-23*3600*1000-58*60*1000), //data da postagem [2]
        [['imagens/papel de parede 1.jpg','Top :)',0,25,25,60],['imagens/papel de parede 2.jpg','Mt top!!!',3,25,25,20],['imagens/papel de parede 3.jpg','Topíssimo :)',2,25,25,60]], //[3] [[0]-a imagem, [1]-a legenda curta para a imagem, [2]-a cor da legenda (0=azul, 1=verde, 2=vermelho, 3=amarelo, 4=branco, 5=preto), [3]-tamanho da fonte, [4]-posição horizontal, [5]-posição vertical]
        0, //[4] visualizado? 1(sim) 0(não) -- necessário apenas se "esses flashes são seus?==false"
        [2,3,4], //[5] id de conversas das pessoas que visualizaram -- só se usa se "esses flashes são seus?==false"
        1, //[6] minha avaliação; -1 (nenhuma), 0 (unlike), 1 (like)
        0, //[7] qtd de comentários
        true, //[8] esses flashes são seus?
        [], //[9] comentários
        3, //[10] quantidade de visualizacoes (preciso colocar separado em vez de fazer length...) -- aqui eu só coloco algum valor se esse flash for meu
        '', //[11] id de conversa -- necessário apenas se "esses flashes são seus?==false"
    ],
    [
        'Natalie Portman',
        'imagens/natalie.jpg',
        ((new Date()).getTime()-23*3600*1000-55*60*1000),
        [['imagens/natalie2.jpg','Meu final de semana :)',0,40,25,60],['imagens/natalie3.jpg','Meu final de semana :)',1,25,25,20],['imagens/natalie4.jpg','Meu final de semana :)',2,25,25,60]],
        0,
        [],
        1,
        0,
        false,
        [],
        '',
        0,
    ],
    [
        'Keira Knightley',
        'imagens/keira.jpg',
        ((new Date()).getTime()-23*3600*1000-8*60*1000),
        [['imagens/keira2.jpg','Meu final de semana :)',3,25,25,60],['imagens/keira3.jpg','Meu final de semana :)',4,25,25,60]],
        0,
        [
            ['Natalie Portaman','natalie.jpg','link-perfil'],
            ['Keira Knightley','keira.jpg','link-perfil'],
            ['Matt Damon','matt.jpg','link-perfil'],
        ],
        1,
        1,
        false,
        [],
        '',
        1,
    ],
    [
        'Matt Damon',
        'imagens/matt.jpg',
        ((new Date()).getTime()-21*3600*1000-58*60*1000),
        [['imagens/matt2.jpg','Meu final de semana :)',5,25,25,60],['imagens/matt3.jpg','Meu final de semana :)',0,25,25,60]],
        1,
        [],
        1,
        2,
        false,
        [],
        '',
        2,
    ],
    [
        'Leonardo Dicaprio',
        'imagens/dicaprio.jpg',
        ((new Date()).getTime()-21*3600*1000-58*60*1000),
        [['imagens/dicaprio2.jpg','Meu final de semana :)',1,25,25,60],['imagens/dicaprio3.jpg','Meu final de semana :)',2,25,25,60],['imagens/dicaprio4.jpg','Meu final de semana :)',3,25,25,60]],
        0,
        [],
        1,
        3,
        false,
        [],
        '',
        3,
    ],
    [
        'Júlia Robert',
        'imagens/julia.jpg',
        ((new Date()).getTime()-1*3600*1000-58*60*1000),
        [['imagens/julia2.jpg','Meu final de semana :)',4,25,25,60],['imagens/julia3.jpg','Meu final de semana :)',5,25,25,60]],
        1,
        [],
        1,
        4,
        false,
        [],
        '',
        4,
    ],
    [
        'Johnny Depp',
        'imagens/depp.jpg',
        ((new Date()).getTime()-1*3600*1000-58*60*1000),
        [['imagens/depp2.jpg','Meu final de semana :)',0,25,25,60],['imagens/depp3.jpg','Meu final de semana :)',1,25,25,60]],
        0,
        [],
        1,
        5,
        false,
        [],
        '',
        5,
    ],
    [
        'Megan Fox',
        'imagens/megan.jpg',
        ((new Date()).getTime()-2*60*1000),
        [['imagens/megan2.jpg','Meu final de semana :)',2,25,25,60],['imagens/megan3.jpg','Meu final de semana :)',3,25,25,60]],
        1,
        [],
        1,
        6,
        false,
        [],
        '',
        6,
    ],
    [
        'Mila Kunis',
        'imagens/mila.jpg',
        ((new Date()).getTime()-5*60*1000),
        [['imagens/mila2.jpg','Meu final de semana :)',4,25,25,60]],
        1,
        [],
        1,
        7,
        false,
        [],
        '',
        7,
    ],
    [
        'Emma Stone',
        'imagens/emma.jpg',
        ((new Date()).getTime()-10*60*1000),
        [['imagens/emma2.jpg','Meu final de semana :)',5,25,25,60]],
        0,
        [],
        1,
        8,
        false,
        [],
        '',
        8,
    ],
];