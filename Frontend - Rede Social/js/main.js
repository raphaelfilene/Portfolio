opcoes_privacidade=['<i class="fa fa-eye"></i> todos','<i class="fa fa-users"></i> amigos','<i class="fa fa-lock"></i> você'];

opcoes_status_chat=[['<i class="fa fa-square text-danger chat-off"></i> ','invisível'],['<i class="fa fa-square text-success chat-on"></i> ','visível']];

lista_emoticons_bool=[
	['seu-dia','Você',['em em-grinning','em em-slightly_frowning_face'],'escolhido'],
	['sentimentos','Sentimentos',['em em-heart','em em-broken_heart'],''],
	['humor','Humor',['em em-relieved','em em-rage'],''],
	['exercitando','Disposição',['em em-weight_lifter','em em-sleeping_accommodation'],''],
	['saude','Saúde',['em em-hugging_face','em em-face_with_open_mouth_vomiting','']]
];

denuncias_postagens=[
    ['denuncia-preconceito','racismo, xenofobia ou outro tipo de preconceito'],
    ['denuncia-impropio','conteúdo impróprio ou abusivo'],
    ['denuncia-spam','spam'],
    ['denuncia-outro','outro motivo']
];

tipos_relacionamentos=[['Solteira','Solteiro'],['Namoranda','Namorando'],['Noiva','Noivo'],['Casada','Casado']];

denuncias_usuarios=[
    ['denuncia-perfil-fake','perfil falso'],
    ['denuncia-usuario-outro-motivo','outro motivo']
];

relacionamentos=[
    ['add-amigo','fa fa-user-plus','adicionar aos amigos','text-info'],
    ['desfazer-amizade','fa fa-user-times','desfazer amizade','text-info'],
    ['retirar-convite','fa fa-user-times','retirar convite','text-info'],
    ['seguir-usuario','fa fa-eye','seguir secretamente','text-success'],
    ['deixar-de-seguir','fa fa-eye-slash','deixar de seguir','text-success'],
    ['denunciar-usuario','fa fa-ban','denunciar','text-warning'],
    ['bloquear-usuario','fa fa-times','bloquear','text-danger'],
];

classes_cores=[
    'text-primary','text-success','text-danger','text-warning','fonte-branca',''
    //0=azul, 1=verde, 2=vermelho, 3=amarelo, 4=branco, 5=preto
];

maxlengths={
    postagens:1000,
    denuncias:4000,
    comentarios:2000, //se isto for pequeno, daí não precisarei ocultar parte dos comentários grandes e talz
    respostas:2000,
    chat: 2000,
    legenda_foto_flash: 35,
    cidade: 30,
    religiao: 30,
    citacao_perfil: 100,
};

tempo={
    foto_perfil:5,
    papeis_de_parede: 10,
    atualizar_data: 60,
    fotos_flashes: 5,
};

quantidades={
    fotos_flashes: 3,
    fotos_perfis_carrossel: 3,
    fotos_perfis_armazenadas: 8,
    papeis_de_paredes_carrossel: 3,
    papeis_de_paredes_armazenados: 8,
};

dias_e_meses=[['Janeiro',31],['Fevereiro',28],['Março',31],['Abril',30],['Maio',31],['Junho',30],['Julho',31],['Agosto',31],['Setembro',30],['Outubro',31],['Novembro',30],['Dezembro',31]];

(function($){
	$(document).ready(function(){
		funcoes_resizes();
        preparacoes_iniciais_na_pagina('Boolean');
        status_chat(voce.status_chat);
		lista_conversas();
        lista_amigos_paginas_e_pessoas_que_sigo();
		bloco_perfil();
        debug_img_centralizada();
        atualizador_de_datas(tempo.atualizar_data);
        fingindo_que_os_links_das_paginas_estao_ok();
        fingindo_ter_muitas_paginas('feed');
        notificacoes();
        publicidade();
	});
})(jQuery);

function ordenar_blocos(){
    /*Muda a ordem do bloco central com o bloco da direita quando a tela for pequena*/
    var meio=$('#bloco-central');
    var direita=$('#bloco-direita');
    if ($('#tam-md:visible').length==0){
        meio.removeClass('px-2');
        direita.addClass('px-2');
        meio.before(direita);
    }
    else {
        meio.addClass('px-2');
        direita.removeClass('px-2');
        meio.after(direita);
    }
}

function papeis_de_parede(){
    /*Botão com a funcionalidade para add/trocar papéis de parede*/
    var div=toHtml(
'<div id="papeis-de-parede" class="col-12">\
    <div id="quadro-papeis-de-parede"></div>\
    <div class="text-primary fonte-pequena i-b clicavel links-com-hover" id="input-papeis-de-parede">\
        <i class="fa fa-image fonte-media"></i>\
        <div class="i-b">papéis de parede</div>\
    </div>\
</div>'
    );
    $.each(voce.papeis_parede,function(i,v){
        var img=toHtml(
'<div class="my-2 papeis-de-parede x-centralizada">\
    <img class="debug-centralizacao expansiva clicavel" title="'+voce.nome+'" alt="'+voce.nome+'" src="'+v+'">\
</div>'
        );
        div.find('#quadro-papeis-de-parede').append(img);
    });
    carrossel_imgs(div.find('#quadro-papeis-de-parede'),tempo.papeis_de_parede);


    var modal=retornar_modal_de_imagens('Seus papéis de parede','fa fa-image',voce.papeis_parede,voce.papeis_parede_antigos,quantidades.papeis_de_paredes_armazenados,quantidades.papeis_de_paredes_carrossel);
    div.find('#input-papeis-de-parede').after(modal);
    div.find('#input-papeis-de-parede').click(function(){
        //retornando a janela default antes de abrí-la
        modal.find('.botao-cancelar').click();

        modal.modal();
    });

    //Ajustando os blocos
    var tamanho_papel_de_parede=250;
    var tamanho_foto=180;

    var local_foto=$('#local-foto-perfil');
    local_foto
        .removeClass('capa-bordada')
        .css('padding','3px');
    local_foto.parent().removeClass('sub-blocos');
    local_foto.siblings().addClass('sub-blocos');

    $('#bloco-direita').css('margin-top',tamanho_papel_de_parede-60);
    $('#bloco-central').css('margin-top',tamanho_papel_de_parede+5);
    $('#bloco-esquerda')
        .css('margin-top',tamanho_papel_de_parede-tamanho_foto+15)
        .before(div);
}

function fingindo_que_os_links_das_paginas_estao_ok(){
    /*Esta função é temporária e tem como objetivo fingir que eu criei as páginas html de cada um dos links e que ao clicar em tais links tais páginas são então abertas*/
    $.each($('#links-paginas > a,#pag-feed'),function(){
        $(this).click(function(){
            //add efeito no link da página que está aberta atualmente (exceto se for a página feed)
            $('#links-paginas > a.selecionado').removeClass('selecionado');
            $(this).addClass('selecionado');

            //removendo os resíduos da página anterior (isso pq isso tudo aqui é um fingimento, já que os links não estão de fato linkando a páginas html e aplicando funções e talz)
            $('#bloco-central').children().children().remove();

            //ex: id="pag-diario", daí nome_pagina="diario"
            var nome_pagina=$(this).attr('id').slice(4);

            fingindo_ter_muitas_paginas(nome_pagina);
        });
    });
}

function fingindo_ter_muitas_paginas(tipo){
    /*Esta função vai simular as demais páginas utilizando apenas um arquivo html. Ou seja, quando eu clicar no link da página 'diario', então esta função irá simular como se eu tivesse aberto a página 'diario' mas utilizando o mesmo arquivo html (index.html)*/
    if (tipo=='feed'){
        $.each(publicacoes,function(i,v){
            postagem(v);
        });
        flashes(4000); //4000=4 segundos
        notificacao_amizade();
    }
    else {
        perfil();
        relacionamento_usuario();
        papeis_de_parede();
        if (tipo=='perfil'){
            $.each(publicacoes,function(i,v){
                if (v.propria){
                    postagem(v);
                }
            });
        }
        else if (tipo=='diario'){
            input_postagem('diario');
            $.each(publicacoes,function(i,v){
                if (v.propria && v.tipo=='diario'){
                    postagem(v);
                }
            });
        }
        else if (tipo=='bool-album'){
            input_postagem('bool_fotos');
            $.each(publicacoes,function(i,v){
                if (v.propria && v.tipo=='bool_fotos'){
                    postagem(v);
                }
            });
        }
        else if (tipo=='memes'){
            input_postagem('meme');
            $.each(publicacoes,function(i,v){
                if (v.propria && v.tipo=='meme'){
                    postagem(v);
                }
            });
        }
        else if (tipo=='frases'){
            input_postagem('frase');
            $.each(publicacoes,function(i,v){
                if (v.propria && v.tipo=='frase'){
                    postagem(v);
                }
            });
        }
    }
    responder_comentarios();
    comentar();
}

function preparacoes_iniciais_na_pagina(titulo_aba){
	/*Add as coisas iniciais ao site como título da aba, ícone da aba e ícone no navbar do topo*/
    //Colocando um título na aba do navegador
    $('title').text(titulo_aba);

    //Add o slogan do site
    //obs: tive que fazer do jeito abaixo em vez de pôr no html, pois ficava 'feio' quando as palavras 'b'+'lean' carregam antes do ícone que faz a função do 'oo' em 'boolean'
    $('#navbar-principal').prepend(
        '<a class="navbar-brand pl-3 pr-5 text-primary"><b>b<i class="fa fa-toggle-on"></i>lean</b></a>'
    );
}

function centralizador_imgs(){
	/*Modifica os valores de margens para que, em conjunto com uma classe CSS já preparada, tornem as imagens em imagens centralizadas horizontalmente e/ou verticalmente*/
	$('.x-centralizada > img:visible').each(function(){
	    var esquerda=-$(this).width()/2;

		$(this).css({
			'margin-left': esquerda+'px',
		});
	});
    $('.y-centralizada > img:visible').each(function(){
        var cima=-$(this).height()/2;

        $(this).css({
            'margin-top': cima+'px',
        });
    });
}

function lista_conversas(){
    /*Trabalha com os dados relativos a listagem de conversas*/
    $.each(conversas,function(i,v){
    	//add as fotos dos amigos a um estilo em que fica a foto seguido do nome, para então eu add tudo isto no chat
    	var div=conjunto_foto_nome(v[0],v[3],v[2],false);
        div.css('margin','auto');

        //add uma id identificadora a div
        div.attr('id','usuario-chat-'+v[7]);

        //add uma classe que adicionará um efeito mouseover
        div
            .addClass('links-com-hover')
            .addClass('clicavel');

        if (v[6]==0 && v[5]==1){ //se a pessoa não estiver no modo anônima e tbm for uma 'amiga':
            div.append(opcoes_status_chat[0][0]+opcoes_status_chat[1][0]);
            div.find('.chat-off,.chat-on').addClass('icone-status-chat');
            if (v[1]==1){ //está online
                div.find('.chat-off').hide();
            }
            else { //está offline
                div.find('.chat-on').hide();

                //add a data em que a pessoa esteve visível pela última vez
                div.find('.nome-adj-a-foto').after(
'<div class="data-ultima-vez-visivel data-atualizavel i-b ml-2 fonte-pequena text-muted" name="'+new Date(v[4])+'">'+editar_data(v[4],false,false,true)+'</div>'
                );
            }
        }

        //add a janela de chat
        janela_chat(v[0],v[7],v[1],v[5],v[6],v[8],v[9]);
        div.click(function(){
            var chat=$('#chat-'+v[7]);

            //escondendo as demais janelas
            chat.parent().children().hide();

            //mostrando a janela de chat com o contato clicado
            chat.find('.comentario-postagem-flash').hide();
            chat.show();

            //descendo toda a barra de rolagem da janela de chat
            var corpo=chat.find('.chat-corpo');
            corpo.scrollTop(corpo.prop('scrollHeight'));
        });

        //add o conjunto acima criado (foto+nome) ao chat
        $('#lista-amigos-chat').append(div);
    });

    //agora quero criar a funcionalidade de busca de amigo através do nome ou parte do nome na barra de pesquisa do chat
    var local=$('#lista-amigos-chat');
    $('#pesquisar-usuario').keyup(function(){

    	//restaurando a visualização de todos os amigos no chat quando digitar algo na barra de busca (estou restaurando pra novamente filtrar abaixo)
    	local.find('.conjunto-foto-nome').show();

    	var texto_digitado=$(this).val().toLowerCase();
        if (texto_digitado.length>0){
			$.each(local.find('.nome-adj-a-foto').children(),function(){
            	if ($(this).text().toLowerCase().indexOf(texto_digitado)!=0){
                    $(this).parents('.conjunto-foto-nome').hide();
                }
            });
        }
    });
}

function lista_amigos_paginas_e_pessoas_que_sigo(){
    /*Cria uma div com a lista de amigos e outra com a lista de páginas*/
    var molde_item=function(nome,link_perfil,link_foto,classe_item){
        return toHtml(
'<a class="'+classe_item+' centro i-b" href="'+link_perfil+'">\
    <div class="quadro-imagens-menor img-inteira-e-centralizada">\
        <img src="'+link_foto+'" alt="'+nome+'" title="'+nome+'">\
    </div>\
    <div class="text-muted fonte-minuscula">'+nome+'</div>\
</a>'
        );
    };

    //trabalhando na div da lista de amigos
    $.each(listagem_amigos,function(i,v){
        $('#lista-amigos').append(molde_item(v[0],v[1],v[2],'item-amigo'));
    });
    $('#legenda-lista-amigos').text('amigos ('+listagem_amigos.length+')');

    //trabalhando na div da lista de pessoas que sigo secretamente
    $.each(listagem_pessoas_a_quem_sigo,function(i,v){
        $('#lista-pessoas-que-sigo').append(molde_item(v[0],v[1],v[2],'item-pessoas-que-sigo'));
    });
    $('#legenda-lista-pessoas-que-sigo').text('sigo secretamente ('+listagem_pessoas_a_quem_sigo.length+')');

    //trabalhando na div da lista de páginas
    $.each(listagem_paginas,function(i,v){
        $('#lista-paginas').append(molde_item(v[0],v[1],v[2],'item-pagina'));
    });
    $('#legenda-lista-paginas').text('paginas ('+listagem_paginas.length+')');
}

function bloco_perfil(){
	/*Add um carrossel de fotos ao perfil e add o nome do usuário e informações como 'quer add?' etc*/
	//add nome do usuário
    $('#nome-usuario').text(voce.nome);

	var local_fotos_perfil=$('#local-foto-perfil');
	$.each(voce.fotos,function(i,v){
		var div_foto=$('<div/>',{'class':'foto-perfil x-centralizada'});
		var foto=$('<img/>',{
            'src': v,
            'alt': voce.nome,
            'title': voce.nome,
            'class': 'debug-centralizacao expansiva clicavel'
        });
		div_foto.append(foto);
		local_fotos_perfil.append(div_foto);
	});

	//add o efeito de carrossel nas fotos do perfil
	carrossel_imgs(local_fotos_perfil,tempo.foto_perfil);

    //Add modal da troca/adição de imagens ao carrossel das fotos de perfil
    var modal=retornar_modal_de_imagens('Suas fotos','fa fa-image',voce.fotos,voce.fotos_antigas,quantidades.fotos_perfis_armazenadas,quantidades.fotos_perfis_carrossel);
    $('#alterar-foto-perfil').append(modal);

    //ativando funcionalidade ao botão de alteração do carrossel das fotos de perfil
    $('#alterar-foto-perfil > i').click(function(){
        //retornando a janela default antes de abrí-la
        modal.find('.botao-cancelar').click();

        modal.modal();
    });
}

function toHtml(texto){
	/*Pega um texto e transforma em html, tipo como se fosse um 'append' só que sem a necessidade de um local para aplicá-lo*/
	var elemento=$('<div/>').html(texto);

	//é necessário clonar pra funcionar
	return elemento.children().clone();
}

function retornar_modal(titulo,classe_icone,frase_principal,frase_cancelar,frase_confirmar,tamanho='sm'){
	/*Retorna um elemento modal com toda a sua estrutura esperando apenas ser configurada e aplicada*/
	if (tamanho!=''){
		tamanho=' modal-'+tamanho;
	}
	var div=toHtml(
'<div class="modal'+tamanho+' fade" tabindex="-1" role="dialog">\
	<div class="modal-dialog" role="document">\
		<div class="modal-content">\
		    <div class="modal-header">\
                <span class="modal-title fonte-pequena text-primary"><i class="'+classe_icone+'"></i> '+titulo+'</span>\
                <button type="button" class="close" data-dismiss="modal">\
                    <span>&times;</span>\
                </button>\
            </div>\
            <div class="modal-body"></div>\
        </div>\
    </div>\
</div>');
	if (frase_principal!=''){
		div.find('.modal-body').append(
'<div class="container-fluid">\
    <div class="row fonte-pequena">\
        <span class="text-primary">'+frase_principal+'</span>\
    </div>\
</div>'
		);
	}
	if (frase_confirmar!=''){
		div.find('.modal-content').append(
'<div class="modal-footer">\
	<button type="button" class="fonte-pequena btn btn-secondary" data-dismiss="modal">'+frase_cancelar+'</button>\
	<button type="button" class="fonte-pequena btn btn-primary" data-dismiss="modal">'+frase_confirmar+'</button>\
</div>'
		);
	}
	div.css('margin','auto');
	return div;
}

function modal_denuncia(tipo){
    var modal_denuncia=retornar_modal('Denunciar','fa fa-ban','','cancelar','confirmar','');

    //add uma classe para o botão 'confirmar'
    modal_denuncia.find('.modal-footer > button:eq(1)').addClass('confirmar-denuncia');

    //add as opções de denúncia
    var div_tipos_de_denuncias=toHtml(
'<div class="escolher-tipo-denuncia fonte-pequena px-2 text-primary"></div>'
    );
    if (tipo=='postagens'){
        var denuncias=denuncias_postagens;
    }
    else {
        var denuncias=denuncias_usuarios;
    }
    $.each(denuncias,function(i,v){
        div_tipos_de_denuncias.append(
'<div class="d-block mb-2">\
    <span class="tipo-de-denuncia clicavel '+v[0]+'">'+v[1]+'</span>\
</div>'
        );
    });

    //add caixa de texto para explicar mais detalhadamente a denúncia
    var caixa_texto=toHtml(
'<div class="caixa-texto-sem-pre-def mx-5">\
    <textarea class="form-control fonte-pequena" placeholder="detalhes da denúncia" maxlength="'+maxlengths.denuncias+'"></textarea>\
</div>'
    );

    botao_voltar=toHtml(
'<div class="fonte-pequena clicavel pl-4 pt-2 text-primary tipo-de-denuncia borda-arredondada"> voltar</div>'
    );
    var botao_confirmar=modal_denuncia.find('.confirmar-denuncia');
    botao_confirmar.hide();

    $.each(div_tipos_de_denuncias.children().children(),function(i,v){
        var i=i;
        $(this).click(function(){
            $(this).parent().parent()
                .attr('value',denuncias[i][0])
                .hide()
                .siblings().show();
            botao_confirmar.show();
        });
    });

    botao_voltar.click(function(){
        div_tipos_de_denuncias.show();
        caixa_texto.hide();
        $(this).hide();
        botao_confirmar.hide();
    });

    //escondendo a caixa de texto e o botão voltar inicialmente...
    botao_voltar.click();

    modal_denuncia.find('.modal-body')
        .append(div_tipos_de_denuncias)
        .append(caixa_texto)
        .append(botao_voltar);

    return modal_denuncia;
}

function add_expansividade_em_fotos(){
	/*Cria um ícone de expansividade e torna possível clicar nele para expandir o tamanho da foto*/
	$('.expansiva').each(function(){
		$(this).removeClass('expansiva');
        var modal_imagem=toHtml(
'<div class="modal-imagem pt-3">\
    <span class="fechar-modal-imagem">&times;</span>\
    <img class="modal-imagem-conteudo" src="'+$(this).attr('src')+'">\
</div>'
        );
        modal_imagem.hide();
		$(this).click(function(){
			modal_imagem.show();
		});
		modal_imagem.find('.fechar-modal-imagem').click(function(){
		    modal_imagem.hide();
        });
        $('body').append(modal_imagem);
	});
}

function carrossel_imgs(local,tempo_em_seg){
	/*Cria um carrossel de imagens num local onde existem uma lista de imagens ou divs com imagens*/
    //fazendo aparecer a capa
    local.show();

    //escondendo todos os filhos
    local.children().hide();

	if (local.hasClass('carrossel-ativo')){ //se este local já está com carrossel de imagens, então o que tenho que fazer é apenas reiniciar o looping
	    local.addClass('esperar-prox-clock');
        var primeiro_filho=local.find('.primeiro-filho-carrossel');
	    var i=primeiro_filho.index();
	    primeiro_filho.show();
	    if (i!=0){
            local.children(':eq(-1)').after(local.children(':lt('+i+')'));
        }
    }
    else {
        //fazendo aparecer apenas o primeiro filho e guardando a informação de que ele é o primeiro filho para caso eu precise recomeçar o looping
        local.children(':eq(0)')
            .addClass('primeiro-filho-carrossel')
            .show();

        //esperando o tempo de clock da primeira foto para ativar o efeito setInterval no conjunto
        setTimeout(
            function(){
                local.addClass('carrossel-ativo');
                if (local.children().length>1){
                    setInterval(function(){
                        //com a classe 'esperar-prox-clock' eu evito casos em que, após reiniciar o carrossel na imagem 1, o tempo que não foi alterado passe a ser menor do que o tempo mínimo que uma foto deveria ficar visível.
                        if (!local.hasClass('pause-carrossel')){
                            if (local.hasClass('esperar-prox-clock')){
                                local.removeClass('esperar-prox-clock');
                            }
                            else {
                                var primeiro_item=local.children(':eq(0)');
                                primeiro_item.hide();
                                local.children(':eq(-1)').after(primeiro_item);
                                local.children(':eq(0)').show();
                            }
                        }
                    },tempo_em_seg*1000);
                }
            }
            ,tempo_em_seg);
    }
}

function debug_img_centralizada(){
	/*Quando uma imagem é carregada, o valor de sua largura pode demorar um pouco para ser atualizado e assim, atrasar o efeito da função de centralizar imagens. Daí criei esta função para evitar isto*/
	setInterval(function(){
		$('.debug-centralizacao:visible').each(function(){
			if($(this).width()!=0){
				funcoes_imgs();
				$(this).removeClass('debug-centralizacao');
			}
		});
	},500);
}

function funcoes_imgs(){
	/*Aplica as funções relativas a tamanhos e imagens*/
    fotos_circulares(); //precisa vir antes do centralizador de imagens
	add_expansividade_em_fotos();

	//POR ÚLTIMO PROPOSITALMENTE:
    centralizador_imgs(); //precisa vir depois da função fotos_circulares()
}

function organizador_opcoes(opcoes,escolhida){
	/*Supondo que opcoes=[0,1,2,3,4] e escolhida=3, daí, esta função retornará [3,0,1,2,4]*/
	if (escolhida!=0){
		var valor_escolhido=opcoes[escolhida];
		opcoes=opcoes.slice(0,escolhida).concat(opcoes.slice(escolhida+1));
		opcoes.unshift(valor_escolhido);
	}
	return opcoes;
}

function modal_exclusao(tipo){
	/*Retorna o código para a criação de um modal que utilizarei para a exclusão de algo*/
	if(tipo=='publicacao'){
		var titulo='Excluir publicação';
		var frase_principal='Tem certeza que deseja que esta publicação seja excluída?';
	}
	else if(tipo=='comentario'){
		var titulo='Excluir comentário';
		var frase_principal='Tem certeza que deseja que este comentário seja excluído?';
	}
	else if(tipo=='resposta'){
		var titulo='Excluir resposta';
		var frase_principal='Tem certeza que deseja que esta resposta seja excluída?';
	}
    else if(tipo=='conversa'){
        var titulo='Excluir conversa';
        var frase_principal='Tem certeza que deseja que esta conversa seja excluída?';
    }
    else if(tipo=='imagem'){
        var titulo='Excluir imagem';
        var frase_principal='Tem certeza que deseja que esta imagem seja excluída?';
    }
	var modal_exclusao=retornar_modal(titulo,'fa fa-trash',frase_principal,'cancelar','confirmar','sm');
	modal_exclusao.find('.modal-footer > button:eq(1)').addClass('confirmar-exclusao');
	return modal_exclusao;
}

function botao_opcoes(tipo,sem_editar=false,sem_denunciar=false,sem_excluir=false){
	/*Add as opções de exclusão, edição, denuncia e talz, as publicações...*/
	var div=toHtml('\
<div class="dropdown text-primary">\
	<span class="dropdown-toggle clicavel fonte-media" data-toggle="dropdown"><i class="fa fa-cog"></i></span>\
	<div class="dropdown-menu fonte-pequena">\
		<span class="dropdown-item clicavel text-primary editar-item"><i class="fa fa-pencil-square-o"></i> editar</span>\
		<span class="dropdown-item clicavel text-primary denunciar-item"><i class="fa fa-ban"></i> denunciar</span>\
		<span class="dropdown-item clicavel text-primary excluir-item" data-toggle="modal"><i class="fa fa-trash"></i> excluir</span>\
	</div>\
</div>');

	if (sem_editar){
	    div.find('.editar-item').remove();
    }
    if (sem_denunciar){
        div.find('.denunciar-item').remove();
    }
    if (sem_excluir){
        div.find('.excluir-item').remove();
    }

	//modal pra exclusão
	var modal_pra_exclusao=modal_exclusao(tipo);
	div.append(modal_pra_exclusao);
    div.find('.dropdown-menu > .excluir-item').click(function(){
		modal_pra_exclusao.modal();
	});

    //modal pra denuncia
    var modal_pra_denuncia=modal_denuncia('postagens');
    div.append(modal_pra_denuncia);
    div.find('.dropdown-menu > .denunciar-item').click(function(){
        modal_pra_denuncia.modal();
    });

	return div;
}

function privacidade(valor=0,mutavel=1,legenda=''){
	/*Cria o dropdown com as opções de visibilidade da publicação, ex: 'você', 'todos', ...*/
    var ordem=organizador_opcoes([0,1,2],valor);
	if (mutavel==1){
        var div=toHtml('\
<div class="dropdown text-primary fonte-pequena privacidade" value="'+valor+'">\
	<span class="i-b">'+legenda+' </span>\
	<div class="dropdown-toggle i-b clicavel opcao-0" data-toggle="dropdown">'+opcoes_privacidade[ordem[0]]+'</div>\
	<div class="dropdown-menu">\
		<div class="dropdown-item clicavel text-primary fonte-pequena opcao-1">'+opcoes_privacidade[ordem[1]]+'</div>\
		<div class="dropdown-item clicavel text-primary fonte-pequena opcao-2">'+opcoes_privacidade[ordem[2]]+'</div>\
	</div>\
</div>');
        div.find('.opcao-1, .opcao-2').click(function(){
            //Preciso capturar a div com o dropdown novamente, pois estou dentro de uma outra função
            var div=$(this).parent().parent();

            //Capturando a ordem numérica atual dos elementos da privacidade
            var valor_atual=parseInt(div.attr('value'),10);
            var ordem_atual=organizador_opcoes([0,1,2],valor_atual);

            //Capturando a ordem numérica dos elementos que eu desejo ter após o click
            if ($(this).attr('class').indexOf('opcao-1')!=-1){
                var opcao_clicada=1;
            }
            else{
                var opcao_clicada=2;
            }
            var valor_escolhido=ordem_atual[opcao_clicada];
            var ordem_futura=organizador_opcoes([0,1,2],valor_escolhido);

            //Aplicando os dados obtidos anteriormente na div com o dropdown
            div.attr('value',valor_escolhido);
            div.children('.opcao-0').html(opcoes_privacidade[ordem_futura[0]]);
            div.find('.opcao-1').html(opcoes_privacidade[ordem_futura[1]]);
            div.find('.opcao-2').html(opcoes_privacidade[ordem_futura[2]]);
        });
    }
    else {
        var div=toHtml('\
<div class="text-primary fonte-pequena" value="'+valor+'">\
	<div class="i-b">'+opcoes_privacidade[ordem[0]]+'</div>\
</div>');
    }
	return div;
}

function status_chat(valor){
    /*Cria o dropdown com as opções de status do chat: 'visível' e 'invisível'*/
    var ordem=organizador_opcoes([0,1],valor);
	var div=toHtml('\
<div class="dropdown fonte-pequena" value="'+valor+'">\
	<span class="i-b text-muted">você está </span>\
	<div class="dropdown-toggle i-b clicavel opcao-0 text-primary" data-toggle="dropdown">'+opcoes_status_chat[ordem[0]][0]+' '+opcoes_status_chat[ordem[0]][1]+'</div>\
	<div class="dropdown-menu">\
		<div class="dropdown-item clicavel fonte-pequena opcao-1 text-primary">'+opcoes_status_chat[ordem[1]][0]+' '+opcoes_status_chat[ordem[1]][1]+'</div>\
	</div>\
</div>');
	div.find('.opcao-1').click(function(){
		//Preciso capturar a div com o dropdown novamente, pois estou dentro de uma outra função
		var div=$(this).parent().parent();

		//Capturando a ordem numérica atual dos elementos do status do chat
		var valor_atual=parseInt(div.attr('value'),10);
		var ordem_atual=organizador_opcoes([0,1],valor_atual);

		//Capturando a ordem numérica dos elementos que eu desejo ter após o click
		if ($(this).attr('class').indexOf('opcao-1')!=-1){
			var opcao_clicada=1;
		}
		else{
			var opcao_clicada=2;
		}
		var valor_escolhido=ordem_atual[opcao_clicada];
		var ordem_futura=organizador_opcoes([0,1],valor_escolhido);

		//Aplicando os dados obtidos anteriormente na div com o dropdown
		div.attr('value',valor_escolhido);
		div.children('.opcao-0').html(opcoes_status_chat[ordem_futura[0]]);
		div.find('.opcao-1').html(opcoes_status_chat[ordem_futura[1]]);
	});
    $('#status-chat').html(div);
}

function funcoes_resizes(){
	/*Coloco aqui aquelas funções que são ativadas toda vez que ocorrer um resize de tela*/
	$(window).resize(function(){
		margem_topo();
		funcoes_imgs();
        ordenar_blocos();
	});
	$(window).trigger('resize');
}

function margem_topo(){
	/*Ajusta a margem superior de acordo com o tamanho da barra de navegação superior.*/

	//.outerHeight(true) == altura+padding+borda+margem
	var altura=$('#navbar-principal').outerHeight(true);

	$('body').css({
		'padding-top':altura+'px',
		'background-position-y':altura+'px'
	});
}

function fotos_circulares(){
	/*Ajuda no posicionamento das imagens circulares*/
	$('.foto-circular img').each(function(){
		if ($(this).height()!=0 && !$(this).hasClass('h-100') && !$(this).hasClass('w-100')){
			if ($(this).height()>$(this).width()){
				$(this).addClass('w-100');
			}
			else {
				$(this).addClass('h-100');
			}
		}
	});
}

function editar_data(data,apenas_data=false,apenas_hora=false,tempo_decorrido=false){
	/*Edita uma data qualquer ou a data atual, para os formatos abaixo, para então eu utilizar em algum local...*/
	var x=new Date(data);
	if (!tempo_decorrido){
        var hora=String(x.getHours()+100).slice(1);
        var minuto=String(x.getMinutes()+100).slice(1);
        var dia=String(x.getDate()+100).slice(1);
        var mes=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][x.getMonth()]; //String(x.getMonth()+1+100).slice(1)
        var ano=x.getFullYear();

        if (apenas_data){ //DD MÊS AAAA
            return dia+' '+mes+' '+ano;
        }
        else if (apenas_hora){ //HH:MM
            return hora+':'+minuto;
        }
        else { // HH:MM  DD MÊS AAAA
            return hora+':'+minuto+'&nbsp;&nbsp;'+dia+' '+mes+' '+ano;
        }
    }
    else {
	    var decorrido=(new Date()-x)/1000;
        var mins=~~(decorrido/60);
        var horas=~~(mins/60);
        var dias=~~(horas/24);
        var semanas=~~(dias/7);
        if (semanas>4){
            return editar_data(x,apenas_data);
        }
        else if(semanas>1){
            return 'há '+semanas+' semanas';
        }
        else if(semanas==1){
            return 'há uma semana';
        }
        else if(dias>1){
            return 'há '+dias+' dias';
        }
        else if(dias==1){
            return 'ontem';
        }
        else if(horas>1){
            return 'há '+horas+' horas';
        }
        else if(horas==1){
            return 'há uma hora';
        }
        else if(mins>1){
            return 'há '+mins+' minutos';
        }
        else if(mins==1){
            return 'há um minuto';
        }
        else {
            return 'há alguns segundos';
        }
    }
}

function atualizador_de_datas(tempo){
    /*Atualiza as datas com os tempos restantes. Ex: 'há 3 minutos'*/
    setInterval(function(){
        $.each($('.data-postagem, .data-ultima-vez-visivel'),function(i,v){
            var possivel_data=$(this).attr('name');
            if (possivel_data!='' && $(this).hasClass('data-atualizavel')){
                $(this).html(editar_data(possivel_data,false,false,true));
            }
        });
    },tempo*1000);
}

function postagem(e){
	/*Criador genérico de postagens*/
	if (e.propria==true){
		e.nome=voce.nome;
		e.foto_do_postador=$('<img/>',{
            'src': voce.fotos[0],
            'alt': voce.nome,
            'title': voce.nome,
            'class': 'debug-centralizacao'
        });
		e.link_perfil=voce.link_perfil;
	}
	else {
	    e.foto_do_postador=$('<img/>',{
	        'src': e.foto_do_postador,
	        'class': 'debug-centralizacao'
	    });
    }

	//ajustando a data:
    if (e.data==''){
        e.data=new Date();
    }

	var div=toHtml(
'<div class="sub-blocos mb-3 px-4 py-3">\
	<div class="cabecalho">\
		<div class="foto-circular i-b"></div>\
		<div class="topo i-b">\
			<div>\
				<a href="'+e.link_perfil+'" class="nome-postador fonte-preta negrito fonte-pequena"></a>\
				<a class="informacoes-cabecalho-descricao text-muted fonte-pequena">adicionou uma nova</a>\
				<a href="#" class="link-do-conteudo-da-postagem fonte-pequena text-primary">foto</a>\
			</div>\
			<div class="cabecalho-segunda-linha"></div>\
		</div>\
	</div>\
</div>'
	);
	//transformando a foto num link e add ela a div
	var link_foto=$('<a/>',{'href':e.link_perfil, 'class':'x-centralizada'});
    link_foto.append(e.foto_do_postador);
    link_foto.find('img').addClass('debug-centralizacao');
	div.find('.foto-circular').append(link_foto);

	//add o dropdown da privacidade
	div_privacidade=privacidade(e.valor_privacidade,e.propria);
	div_privacidade.addClass('i-b topo');
	div.find('.cabecalho-segunda-linha').append(div_privacidade);

	//add o nome do dono da postagem
	div.find('.nome-postador').text(e.nome);

	//add a data de acordo com estilo da postagem
	if (e.tipo=='diario'){
		div.find('.cabecalho').after(
'<div class="centro">\
	<div class="data-postagem topo i-b fonte-media negrito text-primary" title="'+editar_data(e.data)+'">'+editar_data(e.data,true)+'</div>\
</div>'
		);
	}
	else {
	    div.find('.cabecalho-segunda-linha').append(
'<div class="data-postagem data-atualizavel topo i-b pl-3 fonte-pequena text-muted" name="'+e.data+'" title="'+editar_data(e.data)+'">'+editar_data(e.data,false,false,true)+'</div>'
		);
	}

	//criando botão de opções
    var opcoes=botao_opcoes('publicacao',!e.propria,e.propria,!e.propria);

	//incrementando a possibilidade de excluir postagem na variável 'opcoes' antes de add tal variável a 'div'
	opcoes.find('.confirmar-exclusao').click(function(){
			div.hide(); //.remove() buga...
		});

	//incrementando a possibilidade de denunciar postagem na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.confirmar-denuncia').click(function(){
        var tipo_de_denuncia=$(this).parents('.modal-content').find('.escolher-tipo-denuncia').attr('value');
        var detalhes_denuncia=$(this).parents('.modal-content').find('textarea').val();
        alert(tipo_de_denuncia);
        alert(detalhes_denuncia);
        div.hide(); //.remove() buga...
    });

	//incrementando a possibilidade de editar a postagem na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.editar-item').click(function(){
        var local_edicao=$(this);
        if (!$(this).hasClass('ativo')){ //para evitar que eu use novamente o efeito do 'editar' em uma postagem que ainda não terminou de ser editada
            var caixa_texto=toHtml(
'<div class="i-b caixa-texto-larga">\
    <textarea class="form-control fonte-pequena" maxlength="'+maxlengths.postagens+'"></textarea>\
</div>'
            );
            var botoes=botoes_sim_nao();
            if (div.find('.descricao').length==1){
                var local=div.find('.descricao > span');
                var texto=substituindo_spans(local);
                caixa_texto.find('textarea').val(texto);
                hide_ate_d_block(local);
                local.last()
                    .after(botoes)
                    .after(caixa_texto);
            }
            else {
                var local=div.find('.titulo-postagem > span');
                var texto=substituindo_spans(local);
                caixa_texto.find('textarea').val(texto);
                hide_ate_d_block(local);
                local.last()
                    .after(botoes)
                    .after(caixa_texto);
            }
            caixa_texto.find('textarea').focus();
            botoes.find('.botao-confirmar').click(function(){
                if (caixa_texto.find('textarea').val()!=texto){
                    //atualizando o conteúdo
                    add_spans_de_quebra_de_linha(local.parent(),caixa_texto.find('textarea').val(),'');
                    local.remove();
                    caixa_texto.remove();
                    botoes.remove();
                    local_edicao.removeClass('ativo');
                    var data_atual=new Date();
                    div.find('.cabecalho-segunda-linha').find('.data-postagem.data-atualizavel')
                        .attr({
                            'name': data_atual,
                            'title': editar_data(data_atual)
                        })
                        .text(editar_data(data_atual,false,false,true));
                }
                else {
                    botoes.find('.botao-cancelar').click();
                }
            });
            botoes.find('.botao-cancelar').click(function(){
                show_e_retira_d_block_inativo(local);
                caixa_texto.remove();
                botoes.remove();
                local_edicao.removeClass('ativo');
            });
        }
        $(this).addClass('ativo');
    });

	//add opcoes
	opcoes.css('float','right');
	div.find('.cabecalho').append(opcoes);

	//add emoticons à publicação
    if (e.emoticons_bool!=null){
        var div_emot_bool=$('<div/>',{'class':'py-1 emoticons-bool fonte-grande centro'});
        $.each(e.emoticons_bool,function(i,v){
            if (v!=-1){
                div_emot_bool.append(
'<span class="px-1 '+lista_emoticons_bool[i][0]+'"><i class="'+lista_emoticons_bool[i][2][v]+'"></i></span>'
                );
            }
        });
        div.append(div_emot_bool);
    }

	//add título
	if (e.titulo!=null && e.titulo!=''){
		var div_titulo=$('<div/>',{'class':'py-1 px-1 titulo-postagem centro fonte-pequena'});
		add_spans_de_quebra_de_linha(div_titulo,e.titulo,'');
		div.append(div_titulo);
	}

	//add foto ou vídeo à publicação
    add_foto_ou_video(div,e.nome,e.foto_publicada,e.video_publicado);

	//add bool-fotos
	add_bool_fotos(div,e.bool_fotos,e.nome,e.quem_votou,e.votos);

	//add descrição
    if (e.descricao!=null){
        var div_descr=$('<div/>',{'class':'py-1 px-1 descricao centro fonte-pequena'});
        add_spans_de_quebra_de_linha(div_descr,e.descricao,'');
        div.append(div_descr);
    }

    //add a escolha de privacidade caso a publicação não seja tua e você queira interagir com ela
    if (e.propria==0){
		var div_privacidade_interacao=$('<div/>',{'class':'centro mb-1'});
		div_privacidade_interacao.append(privacidade(0,true,'visibilidade da sua interação: o autor e'));
		div.append(div_privacidade_interacao);
    }

    //add a barra de interações e a região onde colocarei os comentários e talz
    add_regiao_dos_comentarios_e_interacoes(div,e.avaliacoes,e.qtd_comentarios,e.minha_avaliacao,e.propria,e.comentarios);

	//add a div da postagem
	$('#postagens').prepend(div);
}

function add_regiao_dos_comentarios_e_interacoes(local,avaliacoes,qtd_comentarios,minha_avaliacao,postagem_propria,comentarios){
    /*Esta função add toda aquela região que vai desde a mostragem da quantidade de curtidas/comentários e talz e pega toda a parte de comentários e talz*/
    //add a barra de interações à publicação
    local.append(interacoes(avaliacoes,qtd_comentarios,minha_avaliacao));

    //mudando o 'ver comentários' para 'comentar' caso a publicação ainda não tenha comentários
    if (qtd_comentarios==0){
        local.find('.comentar div').text('comentar');
    }

    //add seção de comentários
    var div_secao_comentarios=toHtml(
'<div class="caixa-de-comentarios capa-bordada mt-4 px-3 py-3">\
    <div class="caixa-input-comentario">\
        <div class="foto-circular i-b x-centralizada">\
            <img src="'+voce.fotos[0]+'" alt="'+voce.nome+'" title="'+voce.nome+'" class="debug-centralizacao">\
        </div>\
        <div class="i-b topo pt-2 input-comentario caixa-texto-sem-pre-def">\
            <textarea class="form-control text-muted fonte-pequena" rows="1" placeholder="comentar" maxlength="'+maxlengths.comentarios+'"></textarea>\
        </div>\
        <div class="i-b topo pt-2">\
            <button type="button" class="btn btn-primary fonte-pequena"><i class="fa fa-share"></i></button>\
        </div>\
    </div>\
    <div class="comentarios"></div>\
</div>'
    );

    //add toggle a caixa de comentários
    div_secao_comentarios.hide();
    local.find('.comentar').bind('click',function() {
        div_secao_comentarios.show();
        div_secao_comentarios.find('.input-comentario > textarea').focus();
    });

    $.each(comentarios,function(i,v){
        add_comentarios(div_secao_comentarios.find('.comentarios'),v,postagem_propria);
    });

    visualizando_parte_dos_comentarios_e_respostas(div_secao_comentarios.find('.comentario'));
    local.append(div_secao_comentarios);
}

function botoes_sim_nao(){
    /*Cria os botões "cancelar" e "confirmar", um do lado do outro*/
    return toHtml(
'<div class="centro mt-1">\
    <button type="button" class="btn btn-secondary botao-cancelar fonte-pequena">cancelar</button>\
    <button type="button" class="btn btn-primary botao-confirmar fonte-pequena">confirmar</button>\
</div>'
    );
}

function interacoes(avaliacoes,qtd_comentarios,minha_avaliacao){
    /*add barra de interação com curtir/descurtir e comentários*/
    var div_barra_de_interacao=toHtml(
'<div class="barra-de-interacao centro">\
    <div class="resultado-avaliacoes">\
        <div class="text-success fonte-pequena i-b mr-2">\
            <i class="fa fa-thumbs-up pr-1 fonte-media"></i>\
            <div class="i-b qtd-likes"></div>\
        </div>\
        <div class="text-danger fonte-pequena i-b mr-2">\
            <i class="fa fa-thumbs-down pr-1 fonte-media"></i>\
            <div class="i-b qtd-unlikes"></div>\
        </div>\
        <div class="text-info fonte-pequena i-b">\
            <i class="fa fa-comment pr-1 fonte-media"></i>\
            <div class="i-b qtd-comentarios"></div>\
        </div>\
    </div>\
    <div>\
        <div class="text-primary fonte-pequena i-b clicavel gostei mr-3">\
            <i class="fa fa-thumbs-o-up pr-1 fonte-media"></i>\
            <div class="i-b">gostei</div>\
        </div>\
        <div class="text-primary fonte-pequena i-b clicavel nao-gostei mr-3">\
            <i class="fa fa-thumbs-o-down pr-1 fonte-media"></i>\
            <div class="i-b">não gostei</div>\
        </div>\
        <div class="text-primary fonte-pequena i-b clicavel comentar">\
            <i class="fa fa-comment-o pr-1 fonte-media"></i>\
            <div class="i-b">ver comentários</div>\
        </div>\
    </div>\
</div>'
    );

    var opcoes_de_interacoes=[
        ['.gostei','fa-thumbs-o-up','fa-thumbs-up'],
        ['.nao-gostei','fa-thumbs-o-down','fa-thumbs-down'],
        ['.comentar','fa-comment-o','fa-comment'],
    ];
    if (avaliacoes==null){ //se não for uma postagem que tenha como avaliar com like/unlike (ex: bool-fotos)
        div_barra_de_interacao.find('.qtd-likes').parent().remove();
        div_barra_de_interacao.find('.qtd-unlikes').parent().remove();
        div_barra_de_interacao.find('.gostei').remove();
        div_barra_de_interacao.find('.nao-gostei').remove();
        opcoes_de_interacoes=opcoes_de_interacoes.slice(2);
    }
    else if (avaliacoes.length==1){ //se for uma postagem que tem apenas como 'dar like' e não 'unlike'
        div_barra_de_interacao.find('.qtd-unlikes').parent().remove();
        div_barra_de_interacao.find('.nao-gostei').remove();
        opcoes_de_interacoes=opcoes_de_interacoes.slice(0,1).concat(opcoes_de_interacoes.slice(2));
    }

    //efeito de mouseover
    $.each(opcoes_de_interacoes,function(i,v){
        div_barra_de_interacao.find(v[0]).hover(
            function(){
                $(this).children('i').removeClass(v[1]);
                $(this).children('i').addClass(v[2]);
            },
            function(){
                if (!$(this).hasClass('selecionado')){
                    $(this).children('i').removeClass(v[2]);
                    $(this).children('i').addClass(v[1]);
                }
            }
        );
    });

    if (qtd_comentarios==-1){ //==-1 significa que é um local onde eu não quero o contador de comentários/respostas
        //o ícone abaixo, se tiver que ser retirado, precisa ser apenas depois de add o efeito mouseover
        div_barra_de_interacao.find('.qtd-comentarios').parent().remove();

        div_barra_de_interacao.find('.comentar > div').text('responder');
        opcoes_de_interacoes=opcoes_de_interacoes.slice(0,2);
    }

    //add função 'gostei'
    div_barra_de_interacao.find('.gostei').click(function(){
        var local=div_barra_de_interacao.find('.qtd-likes');
        var qtd_atual=parseInt(local.text(),10);
        if ($(this).hasClass('selecionado')){
            local.text(qtd_atual-1);
            $(this)
                .removeClass('selecionado')
                .trigger('mouseout');
        }
        else {
            local.text(qtd_atual+1);
            $(this)
                .addClass('selecionado')
                .trigger('mouseover');
            var nao_gostei=$(this).parent().find('.nao-gostei');
            if (nao_gostei.hasClass('selecionado')){
                nao_gostei.click();
            }
        }
    });

    //add função 'não gostei'
    div_barra_de_interacao.find('.nao-gostei').click(function(){
        var local=div_barra_de_interacao.find('.qtd-unlikes');
        var qtd_atual=parseInt(local.text(),10);
        if ($(this).hasClass('selecionado')){
            local.text(qtd_atual-1);
            $(this)
                .removeClass('selecionado')
                .trigger('mouseout');
        }
        else {
            local.text(qtd_atual+1);
            $(this)
                .addClass('selecionado')
                .trigger('mouseover');
            var gostei=$(this).parent().find('.gostei');
            if (gostei.hasClass('selecionado')){
                gostei.click();
            }
        }
    });

    //add a qtd de comentarios
    div_barra_de_interacao.find('.qtd-comentarios').text(qtd_comentarios);

    //caso eu tenha curtido ou descurtido algo então preciso preparar o efeito o visual de 'clicado' (não é necessário decrementar a quantidade total agora pra readd depois simplesmente pelo fato de que eu ainda não add nenhum valor a qtd de likes/unlikes ainda...
    if (minha_avaliacao!=-1){
        if (minha_avaliacao==0){
            div_barra_de_interacao.find('.nao-gostei').click();
        }
        else {
            div_barra_de_interacao.find('.gostei').click();
        }
    }

    if (avaliacoes!=null){
        //add as qtds de likes/unlikes
        div_barra_de_interacao.find('.qtd-likes').text(avaliacoes[0][0]);
        if (avaliacoes.length==2){
            div_barra_de_interacao.find('.qtd-unlikes').text(avaliacoes[1][0]);
        }

        //add a lista de pessoas que 'gostaram' e 'não gostaram'
        $.each(avaliacoes,function(i,v){
            var modal=retornar_modal('Pessoas que '+['gostaram','não gostaram'][i],'fa fa-users','','','','');
            var div_pessoa_que_avaliou=$('<div/>',{'class':'container-fluid'});
            $.each(v[1],function(i2,v2){
                div_pessoa_que_avaliou.append(conjunto_foto_nome(v2[0],v2[1],v2[2]));
            });
            modal.find('.modal-body').append(div_pessoa_que_avaliou);
            div_barra_de_interacao.find(['.qtd-likes','.qtd-unlikes'][i]).click(function(){
                modal.modal();
            });
        });
    }
    return div_barra_de_interacao;
}

function conjunto_foto_nome(nome,link_perfil,link_foto,eh_link=true){
    var div=toHtml(
'<div class="row fonte-pequena conjunto-foto-nome mb-1">\
	<div class="foto-circular i-b"></div>\
	<div>\
		<div class="nome-adj-a-foto"></div>\
	</div>\
</div>'
	);
    if (eh_link){
        div.find('.foto-circular').append(
'<a class="x-centralizada" href="'+link_perfil+'">\
    <img class="debug-centralizacao" src="'+link_foto+'" alt="'+nome+'">\
</a>'
        );
        div.find('.nome-adj-a-foto').append(
'<a href="'+link_perfil+'" class="fonte-preta fonte-pequena">'+nome+'</a>'
        );
    }
    else {
        div.find('.foto-circular').append(
'<span class="x-centralizada">\
    <img class="debug-centralizacao" src="'+link_foto+'" alt="'+nome+'">\
</span>'
        );
        div.find('.nome-adj-a-foto').append(
'<span class="fonte-preta fonte-pequena">'+nome+'</span>'
        );
    }
    return div;
}

function retornar_modal_de_imagens(titulo,classe_emoticon,lista_imagens_carrossel,lista_imagens_antigas,qtd_max_de_fotos,qtd_max_de_fotos_no_carrossel){
    /*Retorna uma estrutura modal com as fotos inputadas*/
    var modal=retornar_modal(titulo,classe_emoticon,'','','','lg');
    var div=$('<div/>',{'class':'container-fluid centro'});
    div.append(
'<div class="i-b clicavel">\
    <div class="botao-input-imagens-modais quadro-imagens i-b mx-1 my-1">\
        <i class="fa fa-camera"></i>\
    </div>\
    <div class="invisivel">\
        <input type="file">\
    </div>\
</div>'
    );

    var nova_imagem=function(endereco,nome,legenda=''){
        var foto=toHtml(
'<div class="item-modal-imagens i-b">\
    <div class="quadro-imagens img-inteira-e-centralizada mx-1 my-1">\
        <img src="'+endereco+'" alt="'+nome+'" title="'+nome+'">\
    </div>\
    <div class="fechar-quadro-imagens" title="deletar" alt="deletar">&times;</div>\
    <div class="legenda-quadro-imagens" title="índice no carrossel" alt="índice no carrossel">'+legenda+'</div>\
</di>'
        );

        //possibilitando a exclusão da foto
        foto.find('.fechar-quadro-imagens').click(function(){
            var modal=modal_exclusao('imagem');
            modal.find('.confirmar-exclusao').click(function(){
                foto.remove();
                div.find('.botao-input-imagens-modais').show();
            });
            modal.modal();
        });

        return foto;
    };

    //possibilitando o envio de mais imagens
    div.find('.botao-input-imagens-modais').click(function(){
        div.find('.invisivel > input').click();
    });
    div.find('.invisivel > input').change(function(){
        div.append(nova_imagem(window.URL.createObjectURL(this.files[0]),voce.nome));
        if (div.find('.quadro-imagens > img').length==qtd_max_de_fotos){
            div.find('.botao-input-imagens-modais').hide();
        }
    });

    //escondendo o input de imagens caso já se tenha a quantidade máxima permitida
    if (div.find('.quadro-imagens > img').length==qtd_max_de_fotos){
        div.find('.botao-input-imagens-modais').hide();
    }

    $.each(lista_imagens_carrossel,function(i,v){
        var imagem=nova_imagem(v,voce.nome,i+1);
        imagem.addClass('eh-do-carrossel');
        div.append(imagem);
    });
    $.each(lista_imagens_antigas,function(i,v){
        div.append(nova_imagem(v,voce.nome));
    });

    //botões para criar carrossel e tbm para aplicar atualizações como 'exclusão de fotos que estão presentes em algum carrossel atual'
    var botao_carrossel=toHtml(
'<div class="centro">\
    <button type="button" class="btn btn-primary fonte-pequena">criar carrossel</button>\
</div>'
    );

    //texto explicativo para o carrossel
    var texto_carrossel=toHtml(
'<div class="centro fonte-pequena text-primary">\
    Selecione as imagens para o seu carrossel\
</div>'
    );
    texto_carrossel.hide();

    //botões para confirmar/cancelar carrossel
    var botoes_carrossel_confirmacao=botoes_sim_nao();
    botoes_carrossel_confirmacao.hide();

    botao_carrossel.children('button').click(function(){
        $(this).parent().hide();
        div.find('.botao-input-imagens-modais').hide();
        botoes_carrossel_confirmacao.show();
        texto_carrossel.show();
        div.find('.quadro-imagens > img').parent()
            .attr('carrossel',-1)
            .addClass('selecionavel');
        div.attr('prox-carrossel-selecao',0);
        div.find('.eh-do-carrossel').find('.legenda-quadro-imagens').text('');
        div.find('.fechar-quadro-imagens').hide();

        //add a funcionalidade de escolha para pertencer ao novo carrossel
        div.find('.quadro-imagens > img').parent().click(function(){
            var total_de_carrosseis_escolhidos=parseInt(div.attr('prox-carrossel-selecao'),10);
            if ($(this).hasClass('selecionavel') && qtd_max_de_fotos_no_carrossel>total_de_carrosseis_escolhidos){
                if (parseInt($(this).attr('carrossel'),10)==-1){
                    var numero_atual=parseInt(div.attr('prox-carrossel-selecao'),10);
                    $(this).attr('carrossel',numero_atual);
                    $(this).parent().find('.legenda-quadro-imagens').text(numero_atual+1);
                    div.attr('prox-carrossel-selecao',numero_atual+1);
                }
            }
        });
    });

    botoes_carrossel_confirmacao.find('.botao-confirmar').click(function(){
        alert('atualize a página');
    });
    botoes_carrossel_confirmacao.find('.botao-cancelar').click(function(){
        botoes_carrossel_confirmacao.hide();
        botao_carrossel.show();
        div.find('.botao-input-imagens-modais').show();
        texto_carrossel.hide();
        div.find('.selecionavel').removeClass('selecionavel');
        div.find('.fechar-quadro-imagens').show();
        div.find('.legenda-quadro-imagens').text('');
        $.each(div.find('.eh-do-carrossel'),function(i,v){
            $(this).find('.legenda-quadro-imagens').text(i+1);
        });
    });

    modal.find('.modal-body')
        .append(texto_carrossel)
        .append(div)
        .append(botao_carrossel)
        .append(botoes_carrossel_confirmacao);
    return modal;
}

function add_bool_fotos(local,bool_fotos,nome,quem_votou,votos){
    /*Parte que fica responsável por add bool fotos a uma postagem...*/
    if (bool_fotos!=null){
        var conteiners_bool_fotos=function(i){
            return '\
<div class="capa-bool-fotos pt-2 i-b">\
	<div class="capa-selecionavel capa-bordada">\
		<div class="bool-fotos y-centralizada">\
			<img class="debug-centralizacao" title="'+nome+'" alt="'+nome+'" src="'+bool_fotos[i]+'">\
		</div>\
	</div>\
	<div class="qtd-votos-bool-fotos fonte-pequena text-primary pt-1">\
		<span class="qtd-votos pr-1"></span><span>votos</span>\
	</div>\
</div>';
        }
        var div_bool_fotos=toHtml(
'<div class="conjunto-bool-fotos">\
    '+conteiners_bool_fotos(0)+conteiners_bool_fotos(1)+'\
</div>'
        );

        $.each([0,1],function(i,v){
            var local=div_bool_fotos.find('.qtd-votos:eq('+i+')');

            //add a lista de pessoas que votaram
            if (quem_votou[i].length>0){
                var modal=retornar_modal('Algumas pessoas que votaram','fa fa-users','','','','');
                var div_pessoa_que_votou=$('<div/>',{'class':'container-fluid'});
                $.each(quem_votou[i],function(i,v){
                    div_pessoa_que_votou.append(conjunto_foto_nome(v[0],v[1],v[2]));
                });
                modal.find('.modal-body').append(div_pessoa_que_votou);
                local.parent().click(function(){
                    modal.modal();
                });
            }

            //subtraindo em 1 unidade a quantidade de votos no caso de eu já ter votado, para depois compensar utilizando da função click configurada abaixo
            if (votos[2]==i){
                votos[i]=votos[i]-1;
            }

            //add a quantidade de votos que cada foto recebeu
            local.text(votos[i]);

            //trabalhando o plural do 'votos' de acordo com a quantidade de votos
            if (votos[i]==1){
                local.siblings().text('voto');
            }

            //add funcionalidade de votação
            div_bool_fotos.find('.capa-selecionavel:eq('+i+')').click(function(){
                var valor_atual=parseInt(local.text(),10);
                var capa_atual=div_bool_fotos.find('.capa-selecionavel:eq('+i+')');
                var outra_capa=div_bool_fotos.find('.capa-selecionavel:eq('+(1-i)+')');
                if (capa_atual.hasClass('escolhido')){
                    capa_atual.removeClass('escolhido');
                    valor_atual=valor_atual-1;
                    local.text(valor_atual);
                    if (valor_atual==0){
                        local.siblings().text('votos');
                    }
                    else if (valor_atual==1){
                        local.siblings().text('voto');
                    }
                }
                else {
                    if (outra_capa.hasClass('escolhido')){
                        div_bool_fotos.find('.capa-selecionavel:eq('+(1-i)+')').click();
                    }
                    capa_atual.addClass('escolhido');
                    valor_atual=valor_atual+1;
                    local.text(valor_atual);
                    if (valor_atual==1){
                        local.siblings().text('voto');
                    }
                    else if (valor_atual==2){
                        local.siblings().text('votos');
                    }
                }
            });
        });

        //se já votei em alguma das duas alternativas, então preciso deixar a imagem marcada
        if (votos[2]!=-1){
            div_bool_fotos.find('.capa-selecionavel:eq('+votos[2]+')').click();
        }

        local.append(div_bool_fotos);
    }
}

function add_foto_ou_video(local,nome,foto_publicada,video_publicado){
    /*add foto única ou vídeo à publicação*/
    if (foto_publicada!=null){
        //add foto da publicação
        if (foto_publicada!=''){
            local.append(
'<div class="my-2 foto-publicacao capa-bordada img-inteira-e-centralizada">\
    <img class="expansiva clicavel" title="'+nome+'" alt="'+nome+'" src="'+foto_publicada+'">\
</div>'
            );
        }

        //add vídeo
        else if (video_publicado!=''){
            var pedaco='youtube.com/watch?v=';
            var indice=video_publicado.indexOf(pedaco)+pedaco.length;
            local.append(
'<div class="py-2">\
    <div class="video-publicacao embed-responsive embed-responsive-16by9">\
        <iframe src="https://www.youtube.com/embed/'+video_publicado.slice(indice)+'"></iframe>\
	</div>\
</div>'
            );
        }
    }
}

function add_comentarios(local,comentario,publicacao_propria){
    /*Add comentário no local indicado*/
    if (comentario[2]==1){ //comentário é seu
        var infos=[voce.nome,voce.link_perfil,voce.fotos[0]];
        var proprio=true;
    }
    else {
        var infos=[comentario[0],comentario[1],comentario[3]];
        var proprio=false
    }
    var div_comentario=toHtml(  //tabindex="-1" permite que eu use focus sobre tal div...
'<div class="comentario capa-bordada px-3 py-2 mt-3" tabindex="-1">\
    <div class="capa-foto-comentarista pr-2 pt-3">\
        <div class="foto-circular i-b">\
            <a class="x-centralizada" href="'+infos[1]+'">\
                <img class="debug-centralizacao" src="'+infos[2]+'" alt="'+infos[0]+'">\
            </a>\
        </div>\
    </div>\
   	<div class="fonte-pequena pt-4 nome-comentarista">\
   		<a href="'+infos[1]+'" class="fonte-preta negrito">'+infos[0]+':</a>\
   	</div>\
   	<div class="caixa-das-respostas"></div>\
</div>');

    add_spans_de_quebra_de_linha(div_comentario.find('.nome-comentarista'),comentario[4],'conteudo-comentario');

    //add a barra de interações ao comentário
    var interacao=interacoes(comentario[5],comentario[8].length,comentario[6]);
    div_comentario.find('.caixa-das-respostas').before(interacao);

    //add a data
    interacao.prepend(data_e_edicoes(comentario[7],comentario[10]));

    //criando botão de opções
    var opcoes=botao_opcoes('comentario',!proprio,proprio,!(proprio || publicacao_propria));

    //incrementando a possibilidade de excluir o comentário na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.confirmar-exclusao').click(function(){
        div_comentario.hide(); //.remove() buga...

        //decrementando a qtd de comentários
        var local_qtd=div_comentario.parents('.caixa-de-comentarios').siblings('.barra-de-interacao').find('.qtd-comentarios');
        local_qtd.text(parseInt(local_qtd.text(),10)-1);
    });

    //incrementando a possibilidade de denunciar comentário na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.confirmar-denuncia').click(function(){
        div_comentario.hide(); //.remove() buga...
    });

    //incrementando a possibilidade de editar o comentário
    opcoes.find('.editar-item').click(function(){
        var local_edicao=$(this);
        if (!$(this).hasClass('ativo')){ //para evitar que eu use novamente o efeito do 'editar' em um comentário que ainda não terminou de ser editado
            var caixa_texto=toHtml(
'<div class="caixa-texto-sem-pre-def textarea-alta mx-2">\
    <textarea class="form-control fonte-pequena" maxlength="'+maxlengths.comentarios+'"></textarea>\
</div>'
            );
            var botoes=botoes_sim_nao();
            var local=div_comentario.find('.conteudo-comentario');
            var texto=substituindo_spans(local);
            caixa_texto.find('textarea').val(texto);
            hide_ate_d_block(local);
            local.parent()
                .after(botoes)
                .after(caixa_texto);
            caixa_texto.find('textarea').focus();
            botoes.find('.botao-confirmar').click(function(){
                if (caixa_texto.find('textarea').val()!=texto){
                    //atualizando o conteúdo e add o emoticon que estava antes
                    add_spans_de_quebra_de_linha(local.parent(),caixa_texto.find('textarea').val(),'conteudo-comentario');
                    local.remove();
                    caixa_texto.remove();
                    botoes.remove();
                    local_edicao.removeClass('ativo');
                    var data_atual=new Date();
                    div_comentario.children().children('.caixa-data').find('.data-postagem.data-atualizavel') //aqui precisa ser .children().chidren(...) pois se eu usar .find() poderá achar mts e mts '.caixa-data' ou '.data...' das respostas
                        .attr({
                            'name': data_atual,
                            'title': editar_data(data_atual)
                        })
                        .text(editar_data(data_atual,false,false,true));
                }
                else {
                    botoes.find('.botao-cancelar').click();
                }
            });
            botoes.find('.botao-cancelar').click(function(){
                show_e_retira_d_block_inativo(local);
                caixa_texto.remove();
                botoes.remove();
                local_edicao.removeClass('ativo');
            });
        }
        $(this).addClass('ativo');
    });

    //add opcoes
    opcoes.css('float','right');
    div_comentario.prepend(opcoes);

    //mudando o 'ver comentários' para 'ver respostas' ou 'responder' e add respostas
    if (comentario[9]==0){
        div_comentario.find('.comentar div').text('responder');
    }
    else {
        div_comentario.find('.comentar div').text('ver respostas');

        //add respostas
        div_comentario.find('.caixa-das-respostas').hide();
        $.each(comentario[8],function(i,v){
            add_respostas(div_comentario.find('.caixa-das-respostas'),v,publicacao_propria);
        });
    }

    //add input de resposta aos comentários
    div_comentario.append(
'<div class="caixa-input-resposta mt-3">\
    <div class="foto-circular i-b x-centralizada">\
        <img src="'+voce.fotos[0]+'" alt="'+voce.nome+'" title="'+voce.nome+'" class="debug-centralizacao">\
    </div>\
    <div class="i-b topo pt-2 input-resposta caixa-texto-sem-pre-def">\
        <textarea rows="1" class="form-control text-muted fonte-pequena" placeholder="responder" maxlength="'+maxlengths.respostas+'"></textarea>\
    </div>\
    <div class="i-b topo pt-2">\
        <button type="button" class="btn btn-primary fonte-pequena"><i class="fa fa-share"></i></button>\
    </div>\
</div>'
    );

    //add toggle do 'ver respostas' e 'toggle' do input resposta
    div_comentario.find('.caixa-input-resposta').hide();
    div_comentario.find('.comentar').bind('click',function(){
        //add o efeito de focus seguido do nome da pessoa para que eu quero responder um comentário ou uma outra resposta
        var caixas_inputs=div_comentario.find('.caixa-das-respostas,.caixa-input-resposta');
        if (caixas_inputs.css('display')!='none'){ //com isso eu evito que esse efeito de focus seguido de nome apareça no primeiro clique (sim, pois eu quero que a pessoa possa ler os comentários antes pra depois ter esse efeito)
            var nome=$(this).parents('.barra-de-interacao').siblings('.nome-comentarista').find('a').text();
            nome=nome.slice(0,nome.length-1);
            $(this).parents('.comentario').find('.input-resposta > textarea')
                .focus()
                .val(nome+', ');
        }
        caixas_inputs.show();
        div_comentario.find('.comentar div').text('responder');
    });

    visualizando_parte_dos_comentarios_e_respostas(div_comentario.find('.resposta'),1);

    //add o comentário na seção de comentários
    local.append(div_comentario);
}

function add_respostas(local,resposta,publicacao_propria){
    /*Add resposta no local indicado*/
    if (resposta[2]==1){ //comentário é seu
        var infos=[voce.nome,voce.link_perfil,voce.fotos[0]];
        var proprio=true;
    }
    else {
        var infos=[resposta[0],resposta[1],resposta[3]];
        var proprio=false;
    }
    var div_resposta=toHtml(
'<div class="resposta capa-bordada px-3 py-2 mt-3">\
    <div class="capa-foto-comentarista pr-2 pt-3">\
        <div class="foto-circular i-b">\
            <a class="x-centralizada" href="'+infos[1]+'">\
                <img class="debug-centralizacao" src="'+infos[2]+'" alt="'+infos[0]+'">\
            </a>\
        </div>\
    </div>\
   	<div class="fonte-pequena nome-comentarista pt-4">\
   		<a href="'+infos[1]+'" class="fonte-preta negrito">'+infos[0]+':</a>\
   	</div>\
</div>');

    add_spans_de_quebra_de_linha(div_resposta.find('.nome-comentarista'),resposta[4],'conteudo-resposta');

    //add a barra de interações ao comentário
    var interacao=interacoes(resposta[5],-1,resposta[6]);
    div_resposta.append(interacao);

    //add a data
    interacao.prepend(data_e_edicoes(resposta[7],resposta[8]));

    //criando botão de opções
    var opcoes=botao_opcoes('comentario',!proprio,proprio,!(proprio || publicacao_propria));

    //incrementando a possibilidade de excluir o comentário na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.confirmar-exclusao').click(function(){
        div_resposta.hide(); //.remove() buga...

        //decrementando a qtd de respostas
        var local_qtd=div_resposta.parents('.comentario').children('.barra-de-interacao').find('.qtd-comentarios');
        local_qtd.text(parseInt(local_qtd.text(),10)-1);
    });

    //incrementando a possibilidade de denunciar resposta na variável 'opcoes' antes de add tal variável a 'div'
    opcoes.find('.confirmar-denuncia').click(function(){
        div_resposta.hide(); //.remove() buga...
    });

    //incrementando a possibilidade de editar a resposta
    opcoes.find('.editar-item').click(function(){
        var local_edicao=$(this);
        if (!$(this).hasClass('ativo')){ //para evitar que eu use novamente o efeito do 'editar' em uma resposta que ainda não terminou de ser editada
            var caixa_texto=toHtml(
'<div class="caixa-texto-sem-pre-def textarea-alta mx-2">\
    <textarea class="form-control fonte-pequena" maxlength="'+maxlengths.respostas+'"></textarea>\
</div>'
            );
            var botoes=botoes_sim_nao();
            var local=div_resposta.find('.conteudo-resposta');
            var texto=substituindo_spans(local);
            caixa_texto.find('textarea').val(texto);
            hide_ate_d_block(local);
            local.parent()
                .after(botoes)
                .after(caixa_texto);
            caixa_texto.find('textarea').focus();
            botoes.find('.botao-confirmar').click(function(){
                if (caixa_texto.find('textarea').val()!=texto){
                    //atualizando o conteúdo e add o emoticon que estava antes
                    add_spans_de_quebra_de_linha(local.parent(),caixa_texto.find('textarea').val(),'conteudo-resposta');
                    local.remove();
                    caixa_texto.remove();
                    botoes.remove();
                    local_edicao.removeClass('ativo');
                    var data_atual=new Date();
                    div_resposta.children().children('.caixa-data').find('.data-postagem.data-atualizavel') //aqui precisa ser .children().chidren(...) pois se eu usar .find() poderá achar outros 'caixa-data' e talz...
                        .attr({
                            'name': data_atual,
                            'title': editar_data(data_atual)
                        })
                        .text(editar_data(data_atual,false,false,true));
                }
                else {
                    botoes.find('.botao-cancelar').click();
                }
            });
            botoes.find('.botao-cancelar').click(function(){
                show_e_retira_d_block_inativo(local);
                caixa_texto.remove();
                botoes.remove();
                local_edicao.removeClass('ativo');
            });
        }
        $(this).addClass('ativo');
    });

    //add opcoes
    opcoes.css('float','right');
    div_resposta.prepend(opcoes);

    //add o comentário na seção de comentários
    local.append(div_resposta);
}

function responder_comentarios(){
    /*Cria uma resposta com o que foi digitado pelo usuário no input de resposta*/
    $('.input-resposta').siblings().children('button')
        .unbind('click')
        .bind('click',function(evento){
            var caixa_texto=$(this).parent().siblings().children('textarea');
            if (caixa_texto.val().length>0){
                //utilizando a função de adição de resposta para criar uma resposta
                add_respostas(caixa_texto.parents('.caixa-input-resposta').siblings('.caixa-das-respostas'),['','',1,'',caixa_texto.val(),[[0,[]],[0,[]]],-1,new Date(),[]]);

                //limpando a barra input usada na criação do comentário
                caixa_texto.val('');

                //incrementando a qtd de respostas
                var local_qtd=caixa_texto.parents('.comentario').children('.barra-de-interacao').find('.qtd-comentarios');
                local_qtd.text(parseInt(local_qtd.text(),10)+1);
            }
    });
}

function comentar(){
    /*Cria um comentário com o que foi digitado pelo usuário no input de comentários*/
    $('.input-comentario').siblings().children('button')
        .unbind('click')
        .bind('click',function(){
            var caixa_texto=$(this).parent().siblings().children('textarea');
            if (caixa_texto.val().length>0){
                //utilizando a função de adição de resposta para criar uma resposta
                var local=caixa_texto.parents('.caixa-de-comentarios').find('.comentarios');
                add_comentarios(local,['','',1,'',caixa_texto.val(),[[0,[]],[0,[]]],-1,new Date(),[],0,[]]);

                //limpando a barra input usada na criação do comentário
                caixa_texto.val('');

                responder_comentarios();

                //focando no novo comentário
                local.children(':eq(-1)').focus();

                //incrementando a qtd de comentários
                var local_qtd=caixa_texto.parents('.caixa-de-comentarios').siblings('.barra-de-interacao').find('.qtd-comentarios');
                local_qtd.text(parseInt(local_qtd.text(),10)+1);
            }
    });
}

function visualizando_parte_dos_comentarios_e_respostas(respostas_comentarios,eh_resposta=0){
    /*Serve para esconder excesso de comentários/respostas e colocar um link para ir abrindo tais comentários/respostas pouco a pouco*/
    var ver_mais_comentarios=toHtml(
'<div class="ver-mais-comentarios capa-bordada centro py-1 mt-3">\
    <span class="fonte-pequena text-primary clicavel">ver mais '+['comentários','respostas'][eh_resposta]+'</span>\
</div>'
    );
    var qtd_comentarios=respostas_comentarios.length;
    if (qtd_comentarios>10){
        ver_mais_comentarios.children('span').click(function(){
            var qtd_a_ser_visualizada_por_click=10;
            var indice_max=respostas_comentarios.length-1;
            var qtd_visivel=respostas_comentarios.filter(':visible').length;

            //mostrando mais um pouco de comentários
            respostas_comentarios.filter(':gt('+(indice_max-qtd_visivel-qtd_a_ser_visualizada_por_click)+')').show();

            //removendo o link de 'ver mais comentários' quando todos os comentários estiverem visíveis
            if (indice_max-qtd_visivel-qtd_a_ser_visualizada_por_click<=0){
                $(this).parent().remove();
            }
        });

        //deixando à mostra apenas os 10 últimos comentários (inicialmente)
        respostas_comentarios.filter(':lt('+(qtd_comentarios-10)+')').hide();

        respostas_comentarios.filter(':first').before(ver_mais_comentarios);
    }
}

function data_e_edicoes(data,edicoes_anteriores){
    /*Retorna aquela div com, por exemplo: "há uma semana - ver edições" e tbm prepara um modal com as edições anteriores*/
    var div=toHtml(
'<div class="caixa-data direita fonte-pequena text-muted pt-1">\
    <span class="data-postagem data-atualizavel" name="'+data+'" title="'+editar_data(data)+'">'+editar_data(data,false,false,true)+'</span>\
    <span class="pl-2 ver-edicoes clicavel links-com-hover text-primary">ver edições</span>\
</div>'
    );
    if (edicoes_anteriores.length>0){
        div.find('.ver-edicoes').click(function(){
            var modal=retornar_modal('Edições anteriores','fa fa-pencil','','','','');
            var div_edicoes=$('<div/>',{'class':'container-fluid'});
            $.each(edicoes_anteriores,function(i,v){
                div_edicoes.append(
'<div class="fonte-pequena py-1 mb-2 px-2 conteudo-editado">\
    <span>'+v[0]+'</span>\
    <span class="data-postagem text-muted d-block direita">'+editar_data(v[1])+'</span>\
</div>'
                );
            });
            modal.find('.modal-body').append(div_edicoes);
            modal.modal();
        });
    }
    else {
        div.children().filter(':not(.data-postagem)').remove();
    }
    return div;
}

function input_postagem(tipo){
    /*Aqui coloco os inputs de postagens (diário, bool_fotos, etc)*/
    var personalizacao= { //título do input, classe do emoticon e placeholder da caixa de texto
        diario: ['como foi o seu dia?', 'fa fa-book','meu dia foi...'],
        bool_fotos: ['qual foto ficou melhor?', 'fa fa-camera','legenda'],
        meme: ['desejas compartilhar algum meme novo com seus amigos?', 'fa fa-smile-o','legenda'],
        frase: ['há algum pensamento que desejas compartilhar?', 'fa fa-pencil','pensamento do dia'],
    };

    //div dos inputs
    var div=toHtml(
'<div class="sub-blocos mt-2 mb-3 py-2 centro">\
    <span class="text-muted fonte-pequena"><i class="'+personalizacao[tipo][1]+' pr-1 fonte-media"></i>'+personalizacao[tipo][0]+'</span>\
    <div class="mt-3">\
        <div class="foto-circular i-b x-centralizada topo">\
            <img class="debug-centralizacao" src="'+voce.fotos[0]+'" alt="'+voce.nome+'">\
        </div>\
        <div class="i-b caixa-texto">\
            <textarea class="form-control fonte-pequena" placeholder="'+personalizacao[tipo][2]+'" maxlength="'+maxlengths.postagens+'"></textarea>\
        </div>\
    </div>\
    <div class="invisivel">\
        <input type="file" id="input-1">\
        <input type="file" id="input-2">\
    </div>\
    <div class="mt-3 mb-2" id="botao-publicar">\
        <button class="form-control btn btn-primary fonte-pequena" id="botao-publicar-postagem">publicar</button>\
    </div>\
</div>'
    );

    if (tipo=='diario'){
        //add botões de adição de imagem/vídeo do dia
        div.find('#botao-publicar').before(
'<div>\
    <span class="text-primary fonte-pequena mr-1 text-success links-com-hover clicavel" id="input-img"><i class="fonte-media fa fa-image pr-1"></i>imagem do dia</span>\
    <span class="text-primary fonte-pequena ml-1 text-danger links-com-hover clicavel" id="input-video"><i class="fonte-media fa fa-youtube-play pr-1"></i>vídeo do dia</span>\
</div>\
<div class="mt-2" id="emoticons-bool"></div>'
        );

        //add emoticons booleanos
        $.each(lista_emoticons_bool,function(i,v){
            div.find('#emoticons-bool').append(
'<div id="'+v[0]+'" class="i-b capa-bordada borda-arredondada px-1 py-1 mx-3 my-1">\
    <span class="fonte-pequena text-muted">'+v[1]+'</spa>\
    <div class="fonte-grande px-1 py-1">\
        <div class="px-2 py-2 i-b borda-arredondada clicavel '+v[3]+'">\
            <i class="'+v[2][0]+'"></i>\
        </div>\
        <div class="px-2 py-2 i-b borda-arredondada clicavel">\
            <i class="'+v[2][1]+'"></i>\
        </div>\
    </div>\
</div>'
            );
        });

        //add as funcionalidades de clique para seleção/deseleção de emoticons booleanos
        div.find('#emoticons-bool').find('.clicavel').click(function(){
            if ($(this).hasClass('escolhido')){
                $(this).removeClass('escolhido');
            }
            else {
                if ($(this).siblings().hasClass('escolhido')){
                    $(this).siblings().removeClass('escolhido');
                }
                $(this).addClass('escolhido');
            }
        });
    }

    else if (tipo=='bool_fotos'){
        //add botões para upload das fotos 1 e 2
        div.find('#botao-publicar').before(
'<div>\
    <span class="text-primary fonte-pequena mr-1 text-success links-com-hover clicavel" id="bool-foto-1"><i class="fonte-media fa fa-image pr-1"></i>foto 1</span>\
    <span class="text-primary fonte-pequena ml-1 text-danger links-com-hover clicavel" id="bool-foto-2"><i class="fonte-media fa fa-image pr-1"></i>foto 2</span>\
    <div class="conjunto-bool-fotos"></div>\
</div>'
        );
    }

    else if (tipo=='meme'){
    //add botão para upload do meme
    div.find('#botao-publicar').before(
'<span class="text-primary fonte-pequena mr-1 text-success links-com-hover clicavel" id="input-img"><i class="fonte-media fa fa-image pr-1"></i>meme</span>'
        );
    }

    //ativando os inputs de imagens
    div.find('#input-img, #bool-foto-1').click(function(){
        div.find('#input-1').click();
    });
    div.find('#bool-foto-2').click(function(){
        div.find('#input-2').click();
    });

    //add a visualização prévea das imagens e vídeos
    if (tipo=='diario' || tipo=='meme'){
        //visualização prévea da imagem
        div.find('#input-1').change(function(){
            div.find('.foto-publicacao');
            div.find('#input-img').after(
'<div class="foto-publicacao my-2 mx-3 capa-bordada img-inteira-e-centralizada">\
    <img class="expansiva clicavel" title="'+voce.nome+'" alt="'+voce.nome+'" src="'+window.URL.createObjectURL(this.files[0])+'">\
</div>'
            );

            //escondendo input de vídeo
            div.find('#input-video').hide();
        });

        //add input de youtube-link
        div.find('#input-video').click(function(){
            //escondendo os botões pra input de imagens e vídeos
            div.find('#input-img, #input-video').hide();

            //input do youtube-link
            var input_link=toHtml(
'<div class="mt-1 mb-2 mx-5">\
    <i class="fa fa-link fonte-media text-primary mr-1"></i>\
    <div class="i-b" id="input-link-video-diario">\
        <input class="form-control fonte-pequena" type="text" placeholder="youtube-link"></input>\
    </div>\
</div>'
            );
            input_link.find('input').change(function(){
                var youtube='youtube.com/watch?v';
                var indice=$(this).val().indexOf(youtube);
                if (indice!=-1){
                    div.find('.video-publicacao').remove();
                    input_link.after(
'<div class="video-publicacao embed-responsive embed-responsive-16by9 my-1">\
    <iframe src="https://www.youtube.com/embed/'+$(this).val().slice(indice+youtube.length+1)+'"></iframe>\
</div>'
                    );
                }
            });
            $(this).after(input_link);
        });
    }
    else if (tipo=='bool_fotos') {
        var container_bool_fotos=function(foto,i){
            return toHtml(
'<div class="capa-bool-fotos pt-2 i-b" id="input-bool-foto-'+i+'">\
    <div class="capa-selecionavel capa-bordada">\
        <div class="bool-fotos y-centralizada">\
            <img class="debug-centralizacao" title="'+voce.nome+'" alt="'+voce.nome+'" src="'+foto+'">\
        </div>\
    </div>\
</div>'
            );
        }
        div.find('#input-1').change(function(){
            div.find('#input-bool-foto-1').remove();
            div.find('.conjunto-bool-fotos').prepend(container_bool_fotos(window.URL.createObjectURL(this.files[0]),1));
        });
        div.find('#input-2').change(function(){
            div.find('#input-bool-foto-2').remove();
            div.find('.conjunto-bool-fotos').append(container_bool_fotos(window.URL.createObjectURL(this.files[0]),2));
        });
    }

    //add a escolha da privacidade
    var div_privacidade=privacidade(0,true,'visível para');
    div_privacidade.addClass('mt-3');
    div.find('#botao-publicar').before(div_privacidade);

    //add funcionalidade ao botão 'publicar' para quando for uma bool-foto
    div.find('#botao-publicar > button').click(function(){
        var post={
            data: new Date(),
            propria: true,
            tipo: tipo,

            //necessários apenas se propria==false
            nome: '',
            foto_do_postador: '',
            link_perfil: '',

            valor_privacidade: parseInt(div.find('.privacidade').attr('value'),10),
            titulo: null,
            avaliacoes: null,
            minha_avaliacao: null,
            emoticons_bool: null,
            descricao: null,
            foto_publicada: null,
            video_publicado: null,
            bool_fotos: null,
            votos: null,
            quem_votou: null,
            qtd_comentarios: 0,
            comentarios: [],
        }

        if (tipo=='bool_fotos') {
            post.quem_votou=[[],[]];
            post.bool_fotos=[div.find('#input-bool-foto-1').find('img').attr('src'),div.find('#input-bool-foto-2').find('img').attr('src')];
            post.votos=[0,0,-1];
            post.titulo=div.find('.caixa-texto > textarea').val();
        }
        else if (tipo=='diario') {
            post.avaliacoes=[[0]];
            post.minha_avaliacao=-1;
            post.emoticons_bool=[-1,-1,-1,-1,-1];
            $.each(div.find('#emoticons-bool').children(),function(i,v){
                if ($(this).find('i:eq(0)').parent().hasClass('escolhido')){
                    post.emoticons_bool[i]=0;
                }
                else if ($(this).find('i:eq(1)').parent().hasClass('escolhido')){
                    post.emoticons_bool[i]=1;
                }
            });
            post.descricao=div.find('.caixa-texto > textarea').val();
            post.foto_publicada='';
            post.video_publicado='';
            if (div.find('.foto-publicacao').find('img').length==1){
                post.foto_publicada=div.find('.foto-publicacao').find('img').attr('src');
            }
            else if (div.find('iframe').length==1) {
                var pedaco='youtube.com/embed/';
                var i=div.find('iframe').attr('src').indexOf(pedaco)+pedaco.length;
                post.video_publicado='youtube.com/watch?v='+div.find('iframe').attr('src').slice(i);
            }
        }
        else if (tipo=='meme') {
            post.titulo=div.find('.caixa-texto > textarea').val();
            post.foto_publicada=div.find('.foto-publicacao').find('img').attr('src');
            post.avaliacoes=[[0],[0]];
            post.minha_avaliacao=-1;
        }
        else if (tipo=='frase') {
            post.titulo=div.find('.caixa-texto > textarea').val();
        }

        //add postagem
        postagem(post);

        //removendo caixa input atual e readd em seguida
        div.remove();
        input_postagem(tipo);

        //habilitando a opção comentar (e, dentro dela, a opção responder comentários) à nova postagem
        comentar();
    });

    //add a div do input
    $('#input-postagens').html(div);
}

function relacionamento_usuario(){
    /*Cuida do bloco superior com as opções: add usuário, seguir, enviar mensagem, etc*/
    var div=toHtml(
'<div class="sub-blocos mt-2 mb-3 py-1 px-1 centro" id="input-relacionamentos">\
    <div id="convite-enviado" class="pt-1 fonte-pequena invisivel centro text-danger">convite enviado</div>\
    <div id="relacionamentos" class="py-1"></div>\
    <div id="mensagens" class="py-1"></div>\
</div>'
        );

    //função criadora de botões
    criar_botao=function(classe_cor,classe_icone,legenda,id){
        return toHtml(
'<div class="links-com-hover borda-arredondada '+classe_cor+' fonte-pequena clicavel i-b mx-1" id="'+id+'">\
    <i class="'+classe_icone+' fonte-media"></i>\
    <span>'+legenda+'</span>\
</div>'
        );
    }

    //criando todos os botões de relacionamentos
    $.each(relacionamentos,function(i,v){
        div.find('#relacionamentos').append(criar_botao(v[3],v[1],v[2],v[0]));
    });

    //criando todos os botões de envio de mensagem
    div.find('#mensagens')
        .append(criar_botao('text-primary','fa fa-envelope','enviar mensagem','enviar-msg'))
        .append(criar_botao('text-muted','fa fa-user-secret','enviar mensagem anônima','enviar-msg-oculta'));

    //função para criar/desfazer 'relacionamentos'
    var relacionar=function(eh_amigo,convite_foi_enviado,voce_segue){
        div.find('#relacionamentos').children().show();
        if (eh_amigo==1){
            div.find('#add-amigo,#retirar-convite').hide();
        }
        else {
            if (convite_foi_enviado==1){
                div.find('#desfazer-amizade,#add-amigo').hide();
            }
            else {
                div.find('#desfazer-amizade,#retirar-convite').hide();
            }
        }

        if (voce_segue==1){
            div.find('#seguir-usuario').hide();
        }
        else {
            div.find('#deixar-de-seguir').hide();
        }
    }

    //criando um sistema para desfazer a amizade
    div.find('#desfazer-amizade').click(function(){
        var modal=retornar_modal('Desfazer amizade','fa fa-user-times','Tem certeza que desesjas desfazer a amizade?','não','sim');
        modal.find('.modal-footer > button:eq(1)').click(function(){
            pagina.amigo=0;
            relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);
        });
        modal.modal();
    });
    div.find('#retirar-convite').click(function(){
        pagina.convite_amizade_enviado=0;
        relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);
    });
    div.find('#add-amigo').click(function(){
        pagina.convite_amizade_enviado=1;
        div.find('#convite-enviado').show();
        setTimeout(function(){
            div.find('#convite-enviado').hide();
        },3000);
        relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);
    });
    div.find('#deixar-de-seguir').click(function(){
        pagina.voce_segue=0;
        relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);
    });
    div.find('#seguir-usuario').click(function(){
        pagina.voce_segue=1;
        relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);
    });
    div.find('#bloquear-usuario').click(function(){
        var modal=retornar_modal('Bloquear usuário','fa fa-ban','Tem certeza que desesjas bloquear este usuário?','não','sim');
        modal.find('.modal-footer > button:eq(1)').click(function(){
            alert('Você bloqueou este usuário');
        });
        modal.modal();
    });
    div.find('#denunciar-usuario').click(function(){
        var modal=modal_denuncia('usuarios');
        modal.find('.modal-footer > button:eq(1)').click(function(){
            var tipo_de_denuncia=$(this).parents('.modal-content').find('.escolher-tipo-denuncia').attr('value');
            var detalhes_denuncia=$(this).parents('.modal-content').find('textarea').val();
            alert(tipo_de_denuncia);
            alert(detalhes_denuncia);
        });
        modal.modal();
    });

    //ativando a configuração atual
    relacionar(pagina.amigo,pagina.convite_amizade_enviado,pagina.voce_segue);

    $('#bloco-central').prepend(div);
}

function janela_chat(nome,id,status,eh_amigo,eh_anonimo,bloqueado,visibilidade_bloqueada){
    var div=toHtml(
'<div class="chat" id="chat-'+id+'">\
    <div class="chat-titulo fonte-pequena negrito fonte-branca py-1 px-2">\
        '+opcoes_status_chat[0][0]+'\
        '+opcoes_status_chat[1][0]+'\
        <span class="chat-nome"></span>\
    </div>\
    <div class="chat-aviso fonte-pequena py-1 px-2 text-danger">\
        <span>você bloqueou o recebimento de mensagens anônimas deste usuário</span>\
    </div>\
    <div class="chat-opcoes fonte-media px-2 fonte-branca">\
        <i class="chat-bloquear fa fa-ban mx-1" title="clique para bloquear as mensagens anônimas deste usuário"></i>\
        <i class="chat-desbloquear fa fa-check mx-1" title="clique para desbloquear as mensagens anônimas deste usuário"></i>\
        <i class="chat-bloquear-visibilidade fa fa-eye-slash mx-1" title="clique para ficar invisível para este usuário"></i>\
        <i class="chat-desbloquear-visibilidade fa fa-eye mx-1" title="clique para desbloquear este usuário"></i>\
        <i class="chat-apagar fa fa-trash mx-1" title="apagar conversa"></i>\
        <i class="chat-fechar fa fa-times mx-1" title="fechar janela"></i>\
    </div>\
    <div class="chat-corpo fonte-pequena px-2"></div>\
    <div class="chat-caixa-texto caixa-texto py-1 px-2">\
        <div class="comentario-postagem-flash fonte-pequena text-danger centro py-1 px-1 borda-arredondada"><i class="fa fa-image fonte-media mr-1"></i>comentário sobre a postagem-flash</div>\
        <textarea rows="1" class="i-b form-control fonte-pequena" placeholder="escreva uma mensagem" maxlength="'+maxlengths.chat+'"></textarea>\
        <div class="i-b topo">\
            <button type="button" class="btn btn-primary fonte-pequena"><i class="fa fa-share"></i></button>\
        </div>\
        <div class="fonte-minuscula d-none d-md-block centro text-muted">\
            <span>pressione shift+Enter para enviar</span>\
        <div>\
    </div>\
</div>'
    );
    div.find('.chat-nome').text(nome);
    div.find('.comentario-postagem-flash').hide();
    div.hide();

    //add a funcionalidade 'minimizar'
    div.find('.chat-titulo').click(function(){
        var locais=div.find('.chat-corpo,.chat-caixa-texto');
        if (locais.hasClass('minimizado')){
            locais.removeClass('minimizado');
        }
        else {
            locais.addClass('minimizado');
            div.find('.comentario-postagem-flash').hide();
        }
    });
    div.find('.chat-fechar').click(function(){
        div.hide();
        div.find('.comentario-postagem-flash').hide();
    });

    //add a funcionalidade 'apagar conversa'
    div.find('.chat-apagar').click(function(){
        var modal=modal_exclusao('conversa');
        modal.find('.confirmar-exclusao').click(function(){
            var corpo=div.find('.chat-corpo');
            corpo.attr('pacote',0);
            corpo.children().remove();
        });
        modal.modal();
    });

    //add as funcionalidades de bloqueio de mensagens e de visibilidade para os usuários de acordo com a existência ou não de amizade e talz
    if (eh_anonimo==0){ //se o usuário NÃO for anônimo
        div.find('.chat-aviso').remove();
        if (eh_amigo==1){ //e se for amigo
            //add funcionalidades de bloqueio/desbloqueio de visibilidade de usuários
            div.find('.chat-bloquear-visibilidade').click(function(){
                $(this).hide();
                $(this).siblings('.chat-desbloquear-visibilidade').show();
            });
            div.find('.chat-desbloquear-visibilidade').click(function(){
                $(this).hide();
                $(this).siblings('.chat-bloquear-visibilidade').show();
            });
            if (visibilidade_bloqueada==1){
                div.find('.chat-bloquear-visibilidade').click();
            }
            else {
                div.find('.chat-desbloquear-visibilidade').click();
            }
            if (status==1){
                div.find('.chat-off').hide();
            }
            else {
                div.find('.chat-on').hide();
            }
        }
        else { //NÃO é anônimo e NÃO é amigo
            //excluindo a opção de ocultação de visibilidade
            div.find('.chat-bloquear-visibilidade,.chat-desbloquear-visibilidade,.chat-on,.chat-off').remove();
        }

        //pra conversas não anônimas eu não devo ter a opção de bloquear as msgs anônimas
        div.find('.chat-bloquear,.chat-desbloquear').remove();
    }
    else { //o usuário é anônimo
        //add funcionalidades de bloqueio/desbloqueio de mensagens de usuários
        div.find('.chat-bloquear').click(function(){
            $(this).hide();
            $(this).siblings('.chat-desbloquear').show();
            var local=$(this).parent();
            local.siblings('.chat-caixa-texto').hide();
            local.siblings('.chat-aviso').show();
        });
        div.find('.chat-desbloquear').click(function(){
            $(this).hide();
            $(this).siblings('.chat-bloquear').show();
            var local=$(this).parent();
            local.siblings('.chat-caixa-texto').show();
            local.siblings('.chat-aviso').hide();
        });
        if (bloqueado==1){
            div.find('.chat-bloquear').click();
        }
        else {
            div.find('.chat-desbloquear').click();
        }

        //excluindo a opção de ocultação de visibilidade
        div.find('.chat-bloquear-visibilidade,.chat-desbloquear-visibilidade,.chat-on,.chat-off').remove();
    }

    //criando a funcionalidade que permite o envio de novas mensagens pelo chat
    var enviar_msg=function(){
        var local_mensagem=div.find('textarea');
        var chat=div.find('.chat-corpo');

        //capturando o id que devo dar para esta mensagem
        var id_mensagem=chat.attr('id-prox-msg');

        //capturando o número do pacote atual (caso esteja definido)
        if (chat.parent().find('[pacote]').length>0){
            var pacote=chat.attr('pacote');
        }
        else {
            var pacote=0;
            chat.attr('pacote',pacote);
        }

        //add a mensagem nova à janela de chat
        enviar_ou_receber_mensagem(id,0,local_mensagem.val(),id_mensagem,new Date(),pacote,div.find('.comentario-postagem-flash:visible').length);

        //apagando o conteúdo atual da caixa de texto
        local_mensagem.val('');

        //retirando o identificador que classifica a mensagem como uma resposta a uma postagem flash
        div.find('.comentario-postagem-flash').hide();
    };

    //interligando o click no botão de envio com a função de envio de mensagem
    div.find('.chat-caixa-texto').find('button').click(enviar_msg);

    //criando uma outra forma ativar o envio de mensagens
    div.find('textarea').bind('keypress',function(evento){
        if (evento.which==13 && evento.shiftKey){
            div.find('.chat-caixa-texto').find('button').click();

            //apagando a caixa de texto
            $(this).val('');

            //criando um delay necessário para poder retornar o focus para o textarea
            setTimeout(function(){div.find('textarea').focus()},300);
        }
    });

    //add funcionalidade para mostrar mensagens mais antigas
    div.find('.chat-corpo').on('scroll',function(){
        if ($(this).scrollTop()==0 && $(this).children().length>0){
            var pacote_mais_antigo=parseInt($(this).find('[pacote]').first().attr('pacote'),10);
            if (pacote_mais_antigo>0){
                $.each(chat1[2],function(i,v){
                    enviar_ou_receber_mensagem(id,v[0],v[1],v[2],v[3],pacote_mais_antigo-1,v[4]);
                });
            }
        }
    });
    $('#conversas').append(div);

    //está aqui temporariamente.. e precisa (temporariamente) estar depois do '...append(div)', pois a função abaixo vai procurar o '#chat-'+id no documento e pra isso tal item já precisa ter sido add à div...
    div.find('.chat-corpo').attr('pacote',chat1[1]);
    $.each(chat1[2],function(i,v){
        enviar_ou_receber_mensagem(id,v[0],v[1],v[2],v[3],chat1[1],v[4]);
    });
}

function enviar_ou_receber_mensagem(id_do_chat,remetente,mensagem,id_mensagem,data,pacote,eh_resposta_a_algum_flash){
    var chat=$('#chat-'+id_do_chat).find('.chat-corpo');
    pacote=parseInt(pacote,10);

    //verificando se existe mensagens de um pacote mais atual na janela de chat (se existir então significa que esta mensagem que vou add é uma mensagem antiga e por isso deve ser add com um 'before' e não com um 'append'
    var verificando_local=chat.find('[pacote='+(pacote+1)+']');
    if (verificando_local.length>0){
        var msg_antiga=true;
        var local_delimitado=verificando_local.first();
    }
    else {
        var msg_antiga=false;
    }

    if (remetente==0){
        var msg=$('<div/>',{
            'class':'msg-enviada px-2 py-1 my-1 mr-5 borda-arredondada',              'id':'msg-'+id_mensagem,
            'tabindex':'-1',
            'pacote':pacote,
        });
    }
    else {
        var msg=$('<div/>',{
            'class':'msg-recebida px-2 py-1 my-1 ml-5 borda-arredondada',             'id':'msg-'+id_mensagem,
            'tabindex':'-1',
            'pacote':pacote,
        });
    }
    chat.attr('id-prox-msg',id_mensagem+1);
    add_spans_de_quebra_de_linha(msg,mensagem,'');

    //add data da mensagem
    msg.append('<span class="text-muted data-msg">'+editar_data(data,false,true)+'</span>');

    //separando as mensagens por dias
    ultimo_dia_registrado=chat.find('.dia-msgs:eq(-1)').attr('name');
    data_desta_msg=editar_data(data,true);
    if (ultimo_dia_registrado!=data_desta_msg){
        var info_data=toHtml(
'<div name="'+data_desta_msg+'" class="dia-msgs fonte-pequena centro text-muted negrito pt-3">'+data_desta_msg+'</div>'
        );
        if (msg_antiga){
            local_delimitado.before(info_data);
        }
        else {
            chat.append(info_data);
        }
    }
    if (msg_antiga){
        local_delimitado.before(msg);
    }
    else {
        chat.append(msg);
    }

    if (eh_resposta_a_algum_flash==1){
        if (remetente==0){
            msg.before(
'<div class="msg-postagem-flash fonte-pequena centro text-danger pt-2"><i class="fa fa-image fonte-media mr-1"></i>seu comentário sobre a postagem-flash</div>'
            );
        }
        else {
            msg.before(
'<div class="msg-postagem-flash fonte-pequena centro text-danger pt-2"><i class="fa fa-image fonte-media mr-1"></i>comentário sobre a sua postagem-flash</div>'
            );
        }
    }

    //colocando o focus sobre a posição em que tal msg foi adicionada
    msg.focus();
}

function add_spans_de_quebra_de_linha(local,texto,classe_do_span){
    /*Numa única tag span não é possíel add quebra de linha sem utilizar o <br> (eu acho). E o problema de utilizar o <br> é que: ou vc utiliza e usa a função .html() deixando aberto pro usuário utilizar outras tags, ou vc utiliza o .text() e inutiliza o <br>. Então, pra contornar o problema eu criei várias tags spans, uma pra cada parágrafo. E é isto que esta função aqui faz.*/
    $.each(texto.split('\n'),function(i,v){
        var conteudo=$('<span/>',{'class':classe_do_span});
        if (i>0){
            conteudo.addClass('d-block');
        }
        conteudo.text(v);
        local.append(conteudo);
    });
}

function substituindo_spans(spans){
    /*Pega um parágrafo feito com vários spans e reune num único texto com '\n' (isso é essencial para aplicar em caixas textareas e talz)*/
    var texto='';
    $.each(spans,function(i){
        texto+=$(this).text();
        if (i!=spans.length-1){
            texto+='\n';
        }
    });
    return texto;
}

function hide_ate_d_block(local){
    /*Se eu tenho um local cheio de spans que quero 'esconder' (hide), mas alguns ou todos deles possuem a classe d-block, então esta função faz tal efeito e substitui a classe 'd-block' por 'd-block-inativo'*/
    $.each(local,function(){
        if ($(this).hasClass('d-block')){
            $(this)
                .removeClass('d-block')
                .addClass('d-block-inativo');
        }
        $(this).hide();
    });
}

function show_e_retira_d_block_inativo(local){
    /*Pega um local com tags que quero mostrar (show) e, caso elas possuam a classe d-block-inativo, é retirado tal classe e substituido pela classe d-block*/
    $.each(local,function(){
        if ($(this).hasClass('d-block-inativo')){
            $(this)
                .removeClass('d-block-inativo')
                .addClass('d-block');
        }
        $(this).show();
    });
}

function atualizar_status_chat(id_do_usuario,status_atual){
    /*Atualiza o status do chat de algum usuário, tanto na janela de chat quanto na div onde tem a lista com os demais usuários*/
    var locais=$('#usuario-chat-'+id_do_usuario+',#chat-'+id_do_usuario);
    if (status_atual==1){
        locais.find('.chat-off').hide();
        locais.find('.chat-on').show();
    }
    else {
        locais.find('.chat-on').hide();
        locais.find('.chat-off').show();
    }
}

function flashes(tempo){
    /*Esta função mostrará os "flashes" dos seus amigos no topo da página feed, que é algo mt semelhante ao "stories" do insta, do face e do snap*/
    var div=toHtml(
'<div class="sub-blocos mt-2 mb-3 px-4 py-3 centro">\
    <span class="text-muted fonte-pequena d-block"><i class="fa fa-bolt pr-1 fonte-media"></i>veja os flashes dos seus amigos</span>\
    <div class="text-primary mt-2 mb-1" id="capa-da-lista-de-flashes">\
        <div class="py-2 px-1 clicavel capa-arredondada" id="add-flashes">\
            <i class="fonte-media text-primary fa fa-plus-circle"></i>\
            <div class="foto-circular x-centralizada">\
                <img class="debug-centralizacao" src="'+voce.fotos[0]+'" alt="'+voce.nome+'">\
            </div>\
        </div>\
        <i class="botao-flash fa fa-arrow-left" id="flash-anterior"></i>\
        <i class="botao-flash fa fa-arrow-right" id="flash-prox"></i>\
        <div id="lista-usuarios-flashes"></div>\
    </div>\
    <div id="lista-flashes"></div>\
    <div class="my-1 text-primary" id="botoes-fotos-flashes">\
        <i class="botao-flash fa fa-pause" id="flash-pause"></i>\
        <i class="botao-flash fa fa-play" id="flash-play"></i>\
    </div>\
    <div class="my-1" id="lista-interacoes-flashes"></div>\
    <div class="mb-1 mt-3" id="regiao-input-flashes">\
        <div id="input-flashes">\
            <div class="quadro-imagens i-b mx-1 my-1" id="botao-input-foto-flash">\
                <i class="fa fa-camera"></i>\
            </div>\
            <div class="invisivel">\
                <input type="file">\
            </div>\
        </div>\
        <div id="futura-postagem-flash">\</div>\
    </div>\
</div>'
    );

    //tirar o botão de input flashes caso você já possuam um flash em aparição (e ele sempre deverá ser o primeiro da lista)
    if (lista_flashes.length>0 && lista_flashes[0][8]==true){
        div.find('#add-flashes').hide();
        lista_flashes[0][4]=1;
        //por mais bizarro que pareça, esse "+''" foi necessário...
        lista_flashes[0][0]=voce.nome+'';
        lista_flashes[0][1]=voce.fotos[0]+'';
    }

    //ajustando a largura da lista de flashes pra casos em que se tem poucos usuários
    var larguras_minimas_lista_flashes={
        0: '100px',
        1: '130px',
        2: '170px',
        3: '200px',
        4: '250px'
    };

    //ajustando a mensagem e removendo os botões de 'avançar' e 'retroceder' para casos em que se tem poucos usuários
    if (lista_flashes.length<5){
        div.find('#capa-da-lista-de-flashes').css('width',larguras_minimas_lista_flashes[lista_flashes.length]);
        if (lista_flashes.length<3){
            var local_texto=div.children('span:eq(0)');
            var icone=local_texto.children('i').clone();
            local_texto.text('compartilhe flashes do seu dia com os seus amigos');
            local_texto.prepend(icone);
        }
        div.find('#flash-anterior,#flash-prox').remove();
    }

    $.each(lista_flashes,function(i,v) {
        //criando os ícones redondos dos usuários que postaram algum flash
        var usuario_flash=toHtml(
'<div class="usuario-flash i-b mr-1 px-1 py-2 borda-arredondada clicavel">\
    <div class="foto-circular x-centralizada borda-foto-flash">\
        <img class="debug-centralizacao" src="'+v[1]+'" alt="'+v[0]+'">\
    </div>\
</div>'
        );
        div.find('#lista-usuarios-flashes').append(usuario_flash);

        //add uma capa bordada com uma cor diferente para o usuário com flash ainda não visualizado
        if (v[4]==0){
            usuario_flash.children().addClass('nao-visualizado');
        }

        //add o conjunto foto-flash/legenda de cada usuário
        var lista_fotos_flashes=$('<div/>',{'class':'item-flash'});
        $.each(v[3],function(i2,v2){
            var foto=toHtml(
'<div class="my-2 foto-flash capa-bordada img-inteira-e-centralizada">\
    <img class="expansiva clicavel" title="'+v[0]+'" alt="'+v[0]+'" src="'+v2[0]+'">\
    <div class="legenda-foto-flash"></div>\
</div>'
            );

            //ajustando a legenda de acordo com as configurações escolhidas pelo usuário
            foto.find('.legenda-foto-flash')
                .addClass(classes_cores[v2[2]])
                .text(v2[1])
                .css({
                    'font-size':v2[3]+'px',
                    'left':v2[4]+'%',
                    'top':v2[5]+'%'
                });
            lista_fotos_flashes.append(foto);
        });
        div.find('#lista-flashes').append(lista_fotos_flashes);

        //add uma região onde colocarei os links de 'qtd de visualizações' e 'comentar'
        var interacoes_flashes=$('<div/>',{'class':'interacoes-flashes'});
        var interacao=toHtml(
'<div class="centro fonte-pequena text-primary">\
    <div class="i-b px-2 clicavel visualizacoes-flashes">\
        <i class="fa fa-eye fonte-media"></i>\
        <div class="i-b qtd-visualizacoes pl-1"></div>\
        <div class="i-b link-visualizacoes"> visualizações</div>\
    </div>\
    <div class="i-b px-2 clicavel comentar-flashes">\
        <i class="fa fa-comment-o pr-1 fonte-media"></i>\
        <i class="fa fa-comment pr-1 fonte-media"></i>\
        <div class="i-b">comentar</div>\
    </div>\
</div>'
        );
        //add o efeito sobre o botão 'comentar'
        interacao.find('.comentar-flashes').hover(
            function(){
                $(this).children('i').toggle();
            }
        );
        interacao.find('.comentar-flashes > i:eq(1)').hide();

        if (v[8]==true){
            //add a lista de pessoas que visualizaram
            var modal=retornar_modal('Pessoas que visualizaram','fa fa-users','','','','');
            var div_pessoa_que_visualizou=$('<div/>',{'class':'container-fluid'});
            $.each(v[5],function(i2,id_de_conversa){
                div_pessoa_que_visualizou.append(conjunto_foto_nome(conversas[id_de_conversa][0],conversas[id_de_conversa][3],conversas[id_de_conversa][2]));
            });
            modal.find('.modal-body').append(div_pessoa_que_visualizou);
            interacao.find('.visualizacoes-flashes').click(function(){
                modal.modal();
            });

            //colocando a quantidade de visualizações e ajustando o plural/singular
            interacao.find('.qtd-visualizacoes').text(v[10]);
            if (v[10]==1){
                interacao.find('.link-visualizacoes').text(' visualização');
            }

            interacao.find('.comentar-flashes').remove();
        }
        else{
            interacao.find('.visualizacoes-flashes').remove();
            interacao.find('.comentar-flashes').click(function(){
                var chat=$('#chat-'+v[11]);

                //escondendo as demais janelas
                chat.parent().children().hide();

                //mostrando a janela de chat com o contato clicado e mostrando uma barra que diz que esse comentário foi feito a partir de uma postagem-flash
                chat.find('.comentario-postagem-flash').show();
                chat.show();

                //descendo toda a barra de rolagem da janela de chat
                var corpo=chat.find('.chat-corpo');
                corpo.scrollTop(corpo.prop('scrollHeight'));
            });
        }

        interacoes_flashes.append(interacao);
        div.find('#lista-interacoes-flashes').append(interacoes_flashes)

        //criando um marcador de tempo restante
        var div_tempo=toHtml(
'<div class="tempo-flash centro fonte-pequena text-danger my-2 pl-4">\
    <i class="fa fa-clock-o i-b"></i>\
    <span class="i-b" name="'+v[2]+'"></span>\
</div>'
        );
        var tempo_restante=function(){
            var local=div_tempo.children('span');
            var decorrido=(new Date()-new Date(v[2]))/1000;
            restante=24*60*60-decorrido;
            var mins=~~(restante/60);
            var horas=~~(mins/60);
            mins=mins%(60);
            if (horas>0){
                local.text('restando '+horas+'h'+' '+mins+'min');
            }
            else if(mins>=0){
                local.text('restando '+mins+'min');
            }
            else {
                local.text('finalizado');
            }
        };
        tempo_restante();
        setInterval(tempo_restante,60000);
        interacoes_flashes.prepend(div_tempo);

        //criando botão de opções
        var opcoes=botao_opcoes('publicacao',true,v[8],!v[8]);

        //criando a função que utilizarei para excluir uma postagem flash
        var ocultar=function(){
            usuario_flash.hide(); //.remove() buga...
            interacoes_flashes.hide(); //.remove() buga...
            lista_fotos_flashes.hide(); //.remove() buga...
            div.find('#botoes-fotos-flashes').hide();
        };

        //incrementando a possibilidade de excluir postagem na variável 'opcoes' antes de add tal variável a 'div'
        opcoes.find('.confirmar-exclusao').click(function(){
            ocultar();
            div.find('#add-flashes').show();
        });

        //incrementando a possibilidade de denunciar postagem na variável 'opcoes' antes de add tal variável a 'div'
        opcoes.find('.confirmar-denuncia').click(function(){
            var tipo_de_denuncia=$(this).parents('.modal-content').find('.escolher-tipo-denuncia').attr('value');
            var detalhes_denuncia=$(this).parents('.modal-content').find('textarea').val();
            alert(tipo_de_denuncia);
            alert(detalhes_denuncia);
            ocultar();
        });

        //add opcoes
        opcoes.css('float','right');
        interacoes_flashes.prepend(opcoes);
    });

    $.each(div.find('.usuario-flash'),function(i,v){
        $(this).click(function(){
            //colocando todos os itens na forma "play" (isso é importante para o caso de algum deles ter sido pausado e talz)
            div.find('#botoes-fotos-flashes').show();
            div.find('#flash-play').click();

            //escondendo a parte de input flashes (caso esteja visível)
            div.find('#regiao-input-flashes').hide();

            //capturando o index do usuário atual
            var indice_usuario_atual=div.find('.usuario-flash.selecionada').index();

            //removendo a classe "selecionada" do usuário que estava tendo seus "flashes" visualizados
            var usuario_atual=div.find('.usuario-flash:eq('+indice_usuario_atual+')');
            usuario_atual.removeClass('selecionada');

            //escondendo o conjunto de flashes do usuário cujos flashes estavam sendo visualizados
            var item_atual=div.find('.item-flash:eq('+indice_usuario_atual+')');
            item_atual.hide();

            //escondendo o conjunto de interações (incluindo os comentários) com os flashes do usuário cujos flashes estavam sendo visualizados
            var interacoes_atuais=div.find('.interacoes-flashes:eq('+indice_usuario_atual+')');
            interacoes_atuais.hide();

            //guardando o index do usuário que cliquei para visualizar seus flashes
            var indice_usuario_selecionado=$(this).index();

            //add a classe "selecionada" ao usuário escolhido pra ter seus "flashes" visualizados e removendo a classe "nao-visualizado" caso o usuário ainda possua
            var usuario_selecionado=div.find('.usuario-flash:eq('+indice_usuario_selecionado+')');
            usuario_selecionado.addClass('selecionada');
            if (usuario_selecionado.children().hasClass('nao-visualizado')){
                usuario_selecionado.children().removeClass('nao-visualizado');
            }

            //fazendo aparecer o conjunto de "flashes" do usuário que cliquei para visualizar
            var item_selecionado=div.find('.item-flash:eq('+indice_usuario_selecionado+')');
            item_selecionado.show();

            //fazendo aparecer o conjunto de interações (incluindo os comentários) dos flashes do usuário selecionado
            var interacoes_usuario_selecionado=div.find('.interacoes-flashes:eq('+indice_usuario_selecionado+')');
            interacoes_usuario_selecionado.show();

            carrossel_imgs(item_selecionado,window.tempo.fotos_flashes);
        });
    });

    //funções dos botões dos flashes
    div.find('#flash-prox').click(function(){
        div.find('.usuario-flash:eq(-1)').after(div.find('.usuario-flash:eq(0)'));
        div.find('.item-flash:eq(-1)').after(div.find('.item-flash:eq(0)'));
        div.find('.interacoes-flashes:eq(-1)').after(div.find('.interacoes-flashes:eq(0)'));
    });
    div.find('#flash-anterior').click(function(){
        div.find('.usuario-flash:eq(0)').before(div.find('.usuario-flash:eq(-1)'));
        div.find('.item-flash:eq(0)').before(div.find('.item-flash:eq(-1)'));
        div.find('.interacoes-flashes:eq(0)').before(div.find('.interacoes-flashes:eq(-1)'));
    });
    div.find('#flash-pause').click(function(){
        //capturando o index do usuário atual
        var indice_usuario_atual=div.find('.usuario-flash.selecionada').index();

        //add classe para pausar carrossel ao conjunto de fotos-flashes que estava ativo atualmente
        var item_atual=div.find('.item-flash:eq('+indice_usuario_atual+')');
        item_atual.addClass('pause-carrossel');

        $(this).hide();
        div.find('#flash-play').show();
    });
    div.find('#flash-play').click(function(){
        //retirando a classe de 'pause-carrossel' do conjunto de flashes que estava pausado
        var item_pausado=div.find('.item-flash.pause-carrossel');
        item_pausado.removeClass('pause-carrossel');

        $(this).hide();
        div.find('#flash-pause').show();
    });

    //add o a região do input de flashes
    div.find('#add-flashes').click(function(){
        div.find('.item-flash,.interacoes-flashes,#botoes-fotos-flashes').hide();
        div.find('.usuario-flash.selecionada').removeClass('selecionada');
        div.find('#regiao-input-flashes').show();
    });

    //add a funcionalidade de input de flashes
    div.find('#botao-input-foto-flash').click(function(){
        div.find('#input-flashes > .invisivel > input').click();
    });

    div.find('#input-flashes > .invisivel > input').change(function(){
        var mini_imagem=toHtml(
'<div class="quadro-imagem-flash i-b">\
    <div class="quadro-imagens img-inteira-e-centralizada mx-1 my-1">\
        <img src="'+window.URL.createObjectURL(this.files[0])+'" alt="'+voce.nome+'" title="'+voce.nome+'">\
    </div>\
    <div class="fechar-quadro-imagens" title="deletar" alt="deletar">&times;</div>\
</di>'
        );
        var div_imagem=toHtml(
'<div class="futura-foto-flash">\
    <div class="my-2 foto-flash capa-bordada img-inteira-e-centralizada">\
        <img class="expansiva clicavel" title="'+voce.nome+'" alt="'+voce.nome+'" src="'+window.URL.createObjectURL(this.files[0])+'">\
        <div class="legenda-foto-flash"></div>\
    </div>\
    <div>\
        <input type="text" placeholder="legenda" maxlength="'+maxlengths.legenda_foto_flash+'" class="fonte-pequena mt-2 mb-3 form-control input-legenda-foto-flash">\
    </div>\
    <div class="fonte-pequena my-1 text-muted centro">\
        <div class="mb-1">tamanho da fonte</div>\
        <input type="range" class="tamanho" min="20" value="25" max="45" step="1">\
    </div>\
    <div class="fonte-pequena mt-2 mb-3 text-muted i-b centro">\
        <div class="mb-1">horizontal</div>\
        <input type="range" class="horizontal" min="0" value="40" max="100" step="1">\
    </div>\
    <div class="fonte-pequena mb-1 text-muted i-b centro">\
        <div class="mb-1">vertical</div>\
        <input type="range" class="vertical" min="0" value="60" max="100" step="1">\
    </div>\
</div>'
        );
        var local_quadros=div.find('#input-flashes');
        local_quadros.append(mini_imagem);

        var local_previews=div.find('#futura-postagem-flash');
        local_previews.append(div_imagem);

        //fazendo aparecer os botões 'postar' e 'cancelar'
        div.find('.botoes-confirmacao-flashes').show();

        //add a funcionalidade de ver uma prévia da postagem flash de uma determinada foto após dar upload nela e clicar na sua miniatura
        mini_imagem.find('.quadro-imagens').click(function(){
            local_quadros.find('.selecionada').removeClass('selecionada');
            $(this).addClass('selecionada');
            local_previews.children().hide();
            div_imagem.show();
        });

        //add a possibilidade de cancelar a postagem de uma determinada foto-flash ao clicar no 'x' de sua miniatura
        mini_imagem.find('.fechar-quadro-imagens').click(function(){
            $(this).parent().remove();
            div_imagem.remove();

            //sumindo com os botões 'postar' e 'cancelar' caso não hajam mais fotos flashes para serem 'postadas'
            if (local_quadros.find('.quadro-imagem-flash').length==0){
                div.find('.botoes-confirmacao-flashes').hide();
            }

            //caso o botão de input de fotos-flashes esteja oculto (por ter chegado ao limite de imagens pra upload), então agora que eu exclui uma imagem eu coloco ele para reaparecer
            div.find('#botao-input-foto-flash').show();
        });

        //add a possibilidade de mudança de cor da legenda
        var quadro_cores=quadro_de_opcoes_de_cores();
        var div_com_display_block=$('<div/>');
        quadro_cores.children().click(function(){
            var antiga_selecionada=quadro_cores.find('.selecionada');
            var i0=antiga_selecionada.index();
            antiga_selecionada.removeClass('selecionada');
            $(this).addClass('selecionada');
            var i1=$(this).index();
            div_imagem.find('.legenda-foto-flash')
                .removeClass(classes_cores[i0])
                .addClass(classes_cores[i1])
                .attr('name',i1); //por fim eu add o index da cor no atributo 'name' para depois ficar mais fácil de recuperar tal informação
        });
        quadro_cores.find(':eq(0)').click();
        div_com_display_block.append(quadro_cores);
        div_imagem.find('.horizontal').parent().before(div_com_display_block);

        //add a funcionalidade de adição de legendas ao flash
        div_imagem.find('.input-legenda-foto-flash').bind('keyup',function(){
            div_imagem.find('.legenda-foto-flash').text($(this).val());
        });

        //add a funcionalidade de poder mudar o tamanho da fonte da legenda
        div_imagem.find('.tamanho').change(function(){
            var valor=$(this).val();
            div_imagem.find('.legenda-foto-flash').css('font-size',valor+'px');
        });

        //add a funcionalidade de poder mudar a posição da legenda
        div_imagem.find('.horizontal').change(function(){
            var valor=$(this).val();
            div_imagem.find('.legenda-foto-flash').css('left',valor+'%');
        });
        div_imagem.find('.vertical').change(function(){
            var valor=$(this).val();
            div_imagem.find('.legenda-foto-flash').css('top',valor+'%');
        });

        //ativando os valores iniciais de posição e tamanho de fonte para a legenda
        div_imagem.find('.vertical,.horizontal,.tamanho').trigger('change');

        mini_imagem.find('.quadro-imagens').click();

        //escondendo o botão de input de fotos flashes quando a quantidade de fotos flashes add chegarem a quantidade máxima permitida
        if(local_quadros.find('.quadro-imagem-flash').length==quantidades.fotos_flashes){
            div.find('#botao-input-foto-flash').hide();
        }
    });

    //escondendo todos os conjuntos de fotos "flashes"
    div.find('.item-flash').hide();

    //escondendo todos os conjuntos de interações com os flashes
    div.find('.interacoes-flashes').hide();

    //escondendo o conjunto com os botões de play/pause inicialmente
    div.find('#botoes-fotos-flashes').hide();

    //botões 'postar' e 'cancelar'
    var botoes=botoes_sim_nao();
    botoes
        .addClass('botoes-confirmacao-flashes')
        .find('.botao-confirmar').text('postar');

    //add a funcionalidade 'postar'
    botoes.find('.botao-confirmar').click(function(){
        var postagem=[];
        $.each(div.find('.futura-foto-flash'),function(i,v){
            var item=[
                $(this).find('.foto-flash').children('img').attr('src'), //endereço da imagem imagem
                $(this).find('.legenda-foto-flash').text(), //legenda
                $(this).find('.legenda-foto-flash').attr('name'), //index da cor da legenda
                $(this).find('.tamanho').val(), //tamanho da fonte da legenda
                $(this).find('.horizontal').val(), //posição horizontal da legenda
                $(this).find('.vertical').val(), //posição vertical da legenda
            ];
            postagem.push(item);
        });
        alert(postagem);
        alert('recarregue a página automaticamente...')
    });

    //escondendo os botões 'postar' e 'cancelar' inicialmente (até que se tenha alguma foto add para postar/cancelar
    botoes.hide();

    //escondendo a parte do input de flashes inicialmente
    div.find('#regiao-input-flashes')
        .append(botoes)
        .hide();

    $('#flashes').append(div);
}

function quadro_de_opcoes_de_cores(){
    /*Retorna uma div com um quadro de cores*/
    var div=$('<div/>',{'class':'py-2 quadro-cores borda-arredondada i-b'});
    $.each(classes_cores,function(i,v){
        var cor=$('<i/>',{'class':v+' fa fa-square mx-2 i-b clicavel'});
        div.append(cor);
    });
    return div;
}

function perfil(){
    /*Prepara um quadro com detalhes sobre o perfil do usuário*/
    var div1=toHtml(
'<div class="sub-blocos mt-2 mb-3 centro text-muted">\
    <div class="my-2">\
        <div class="fonte-pequena i-b px-1" id="qtd-seguidores">\
            <b>seguidores: </b><span></span>\
        </div>\
        <div class="fonte-pequena i-b px-1" id="qtd-seguindo">\
            <b>seguindo: </b><span></span>\
        </div>\
        <div class="fonte-pequena i-b px-1" id="qtd-stalkers">\
            <b>stalkeado por: </b><span></span>\
        </div>\
    </div>\
    <div class="py-1" id="local-privacidade-qtd-visitas"></div>\
    <div class="my-2 px-2 fonte-pequena" id="qtd-visitas">\
        <b>visitaram a sua página:</b>\
        <div>\
            <div class="i-b px-2">\
                total: <span></span>\
            </div>\
            <div class="i-b px-2">\
                últimos sete dias: <span></span>\
            </div>\
            <div class="i-b px-2">\
                ontem: <span></span>\
            </div>\
        </div>\
    </div>\
</div>'
    );
    //add opção de escolha de privacidade
    var privacidade_qtd_visitas=privacidade(voce.privacidade[0]);
    privacidade_qtd_visitas.addClass('privacidade_divs_perfil mt-1');
    div1.find('#local-privacidade-qtd-visitas').prepend(privacidade_qtd_visitas);

    //add as quantidades de seguidores/'seguindo'/stalkers
    div1.find('#qtd-seguidores > span').text(voce.qtd_seguidores);
    div1.find('#qtd-seguindo > span').text(voce.qtd_seguindo);
    div1.find('#qtd-stalkers > span').text(voce.qtd_stalkers);

    //add as quantidades de visitas
    var qtd_visitas=div1.find('#qtd-visitas > div > div >  span');
    qtd_visitas.filter(':eq(0)').text(voce.qtd_visitas[0]);
    qtd_visitas.filter(':eq(1)').text(voce.qtd_visitas[1]);
    qtd_visitas.filter(':eq(2)').text(voce.qtd_visitas[2]);

    var div2=toHtml(
'<div class="sub-blocos mt-2 mb-3 centro text-muted">\
    <div class="clicavel text-primary fonte-pequena mx-2 mt-1 pb-1" id="editar-perfil"><i class="pr-1 fa fa-pencil"></i>editar</div>\
    <div class="mt-4 mb-2 fonte-pequena" id="perfil-dados">\
        <div class="i-b"><i class="fa fa-birthday-cake pr-1 fonte-media"></i><span id="perfil-idade"></span> anos</div>\
        <div class="i-b"><i class="fa fa-heart px-1 fonte-media"></i><span id="perfil-relacionamento"></span></div>\
        <div class="i-b"><i class="fa fa-home px-1 fonte-media"></i><span id="perfil-cidade"></span></div>\
        <div class="i-b"><i class="fa fa-refresh px-1 fonte-media"></i><span id="perfil-religiao"></span></div>\
        <div class="mt-2"><i class="fa fa-quote-left px-1 fonte-media"></i><span id="perfil-citacao"></span></div>\
    </div>\
    <div class="mt-4 mb-2 mx-3" id="local-edicao-perfil">\
        <div class="my-2 i-b" id="editar-perfil-relacionamento">\
            <i class="fa fa-heart fonte-media px-1"></i>\
            <div class="i-b">\
                <select class="form-control form-control-sm fonte-pequena"></select>\
            </div>\
        </div>\
        <div class="my-2 i-b" id="editar-perfil-cidade">\
            <i class="fa fa-home fonte-media px-1"></i>\
            <div class="i-b">\
                <input type="text" placeholder="onde você mora?" maxlength="'+maxlengths.cidade+'" class="form-control fonte-pequena i-b">\
            </div>\
        </div>\
        <div class="my-2 i-b" id="editar-perfil-religiao">\
            <i class="fa fa-refresh fonte-media px-1"></i>\
            <div class="i-b">\
                <input type="text" placeholder="qual é a sua religião?" maxlength="'+maxlengths.religiao+'" class="form-control fonte-pequena i-b">\
            </div>\
        </div>\
        <div class="my-2" id="editar-perfil-citacao">\
            <i class="fa fa-quote-left fonte-media px-1"></i>\
            <div class="i-b">\
                <input type="text" placeholder="um pensamento" maxlength="'+maxlengths.citacao_perfil+'" class="form-control fonte-pequena i-b">\
            </div>\
        </div>\
        <div class="mt-4 mb-2 fonte-pequena" id="editar-perfil-idade">\
            <div>\
                <i class="fa fa-calendar fonte-media px-1"></i>\
                <span>data de nascimento</span>\
            </div>\
            <div class="i-b mt-1">\
                <select class="form-control form-control-sm fonte-pequena"></select>\
            </div>\
            <div class="i-b">\
                <select class="form-control form-control-sm fonte-pequena"></select>\
            </div>\
            <div class="i-b">\
                <select class="form-control form-control-sm fonte-pequena"></select>\
            </div>\
        </div>\
    </div>\
</div>'
    );
    //add opção de escolha de privacidade
    var privacidade_perfil=privacidade(voce.privacidade[1]);
    privacidade_perfil.addClass('privacidade_divs_perfil mt-1');
    div2.prepend(privacidade_perfil);

    //add dados do perfil
    div2.find('#perfil-idade').text(voce.idade);
    div2.find('#perfil-cidade').text(voce.cidade);
    div2.find('#perfil-relacionamento').text(tipos_relacionamentos[voce.relacionamento][voce.sexo]);
    div2.find('#perfil-religiao').text(voce.religiao);
    div2.find('#perfil-citacao').text(voce.citacao);

    //preparando o 'select' das opções de estado civil
    $.each(tipos_relacionamentos,function(i,v){
        div2.find('#editar-perfil-relacionamento').find('select').append(
            $('<option/>')
                .text(v[voce.sexo])
                .val(i)
        );
    });
    div2.find('#editar-perfil-relacionamento').find('option:eq('+voce.relacionamento+')').prop('selected',true);

    //add as datas para a edição da data de nascimento
    for (var i=1;i<=31;i++){
        div2.find('#editar-perfil-idade').find('select:eq(0)').append(
            $('<option/>')
                .text(i)
                .val(i)
        );
    };
    $.each(dias_e_meses,function(i,v){
        div2.find('#editar-perfil-idade').find('select:eq(1)').append(
            $('<option/>')
                .text(v[0])
                .val(i+1)
        );
    });
    var ano_atual=(new Date()).getFullYear();
    for (var i=ano_atual-160;i<=ano_atual;i++){
        div2.find('#editar-perfil-idade').find('select:eq(2)').append(
            $('<option/>')
                .text(i)
                .val(i)
        );
    };

    //atualizando oo input da data de nascimento com os valores da data de nascimento
    div2.find('#editar-perfil-idade').find('select:eq(0) > option:eq('+(voce.data_nascimento[0]-1)+')').prop('selected',true);
    div2.find('#editar-perfil-idade').find('select:eq(1) > option:eq('+(voce.data_nascimento[1]-1)+')').prop('selected',true);
    div2.find('#editar-perfil-idade').find('select:eq(2) > [value='+voce.data_nascimento[2]+']').prop('selected',true);

    //função para auxiliar na edição
    var terminou_edicao=function(){
        div2.find('#local-edicao-perfil').hide();
        div2.find('#perfil-dados').show();
        div2.find('#editar-perfil').show();
    };

    //escondendo a div de edição inicialmente
    terminou_edicao();

    //add os botões 'sim' e 'não' à edição
    var botoes=botoes_sim_nao();
    botoes.addClass('mt-4 mb-2');
    div2.find('#local-edicao-perfil').append(botoes);

    //funcionalidades dos botões confirmar/cancelar
    botoes.find('.botao-cancelar').click(function(){
        terminou_edicao();
    });
    botoes.find('.botao-confirmar').click(function(){
        terminou_edicao();
        div2.find('#perfil-cidade').text(div2.find('#editar-perfil-cidade').find('input').val());
        div2.find('#perfil-religiao').text(div2.find('#editar-perfil-religiao').find('input').val());
        voce.relacionamento=div2.find('#editar-perfil-relacionamento').find(':selected').val();
        div2.find('#perfil-relacionamento').text(tipos_relacionamentos[voce.relacionamento][voce.sexo]);
        div2.find('#perfil-citacao').text(div2.find('#editar-perfil-citacao').find('input').val());
        var dia=div2.find('#editar-perfil-idade').find('select:eq(0) > :selected').val();
        var mes=div2.find('#editar-perfil-idade').find('select:eq(1) > :selected').val();
        var ano=div2.find('#editar-perfil-idade').find('select:eq(2) > :selected').val();
        voce.data_nascimento=[dia,mes,ano];
        voce.idade=calcular_idade(new Date(ano+'-'+mes+'-'+dia));
        div2.find('#perfil-idade').text(voce.idade);

    });

    //add a possibilidade de edição de perfil
    div2.find('#editar-perfil').click(function(){
        div2.find('#perfil-dados').hide();
        $(this).hide();
        div2.find('#local-edicao-perfil').show();

        //add os atuais valores nos locais de edição
        div2.find('#editar-perfil-cidade').find('input').val(div2.find('#perfil-cidade').text());
        div2.find('#editar-perfil-religiao').find('input').val(div2.find('#perfil-religiao').text());
        div2.find('#editar-perfil-citacao').find('input').val(div2.find('#perfil-citacao').text());
        div2.find('#editar-perfil-relacionamento').find('option:eq('+voce.relacionamento+')').prop('selected',true);
        div2.find('#editar-perfil-idade').find('select:eq(0) > option:eq('+(voce.data_nascimento[0]-1)+')').prop('selected',true);
        div2.find('#editar-perfil-idade').find('select:eq(1) > option:eq('+(voce.data_nascimento[1]-1)+')').prop('selected',true);
        div2.find('#editar-perfil-idade').find('select:eq(2) > [value='+voce.data_nascimento[2]+']').prop('selected',true);

    });

    var div3=toHtml(
'<div class="centro fonte-media text-muted negrito my-2">\
    Interações\
</div>'
    );

    $('#bloco-central')
        .prepend(div3)
        .prepend(div2)
        .prepend(div1);
}

function calcular_idade(data){
    /*Retorna a idade atual*/
    var atual=new Date();
    var delta_ano=atual.getFullYear()-data.getFullYear();
    var delta_mes=atual.getMonth()-data.getMonth();
    var delta_dia=atual.getDate()-data.getDate();
    if (delta_mes<0 || (delta_mes==0 && delta_dia<0)){
        return delta_ano-1;
    }
    else {
        return delta_ano;
    }
}

function publicidade(){
    /*Cria uma divs com propagandas*/
    var div_lateral=toHtml(
'<div class="sub-blocos my-3 pt-2 pb-4">\
    <div class="centro my-2 text-muted fonte-pequena">\
        <i class="fonte-media pr-1 fa fa-bullhorn"></i>\
        <span>publicidade</span>\
    </div>\
    <div id="publicidade-lateral"></div>\
</div>'
    );

    var div_central=toHtml(
'<div class="sub-blocos my-3 pt-2 pb-4">\
    <div class="centro my-2 text-muted fonte-pequena">\
        <i class="fonte-media pr-1 fa fa-bullhorn"></i>\
        <span>publicidade</span>\
    </div>\
    <div id="publicidade-central"></div>\
</div>'
    );

    $.each(publicidades.lateral[0],function(i,v){
        var imagem=toHtml(
'<div class=" mx-2 publicidade-lateral">\
    <a href="'+v[2]+'" class="x-centralizada">\
        <img src="'+v[0]+'" title="'+v[1]+'" alt="'+v[1]+'" class="debug-centralizacao">\
    </a>\
</div>'
        );
        div_lateral.find('#publicidade-lateral').append(imagem);
    });

    $.each(publicidades.central[0],function(i,v){
        var imagem=toHtml(
'<div class=" mx-2 publicidade-central">\
    <a href="'+v[2]+'" class="x-centralizada">\
        <img src="'+v[0]+'" title="'+v[1]+'" alt="'+v[1]+'" class="debug-centralizacao">\
    </a>\
</div>'
        );
        div_central.find('#publicidade-central').append(imagem);
    });

    //add efeito carrossel para as propagandas
    carrossel_imgs(div_lateral.find('#publicidade-lateral'),publicidades.lateral[1]);
    carrossel_imgs(div_central.find('#publicidade-central'),publicidades.central[1]);

    $('#bloco-direita').append(div_lateral);
    $('#bloco-central').find('.sub-blocos > .titulo-postagem:eq(1)').parent().after(div_central);
}

function notificacao_amizade(){
    /*Cria divs com notificações de amizade*/
    var div=toHtml(
'<div class="sub-blocos my-3 pt-2 pb-4">\
    <div class="centro my-2 text-muted fonte-pequena">\
        <i class="fa fa-user-plus fonte-media pr-1"></i>\
        <span id="titulo-notificacao-amizade">solicitação de amizade</span>\
    </div>\
    <div id="notificacoes-amizades" class="mx-3 py-1 px-3"></div>\
</div>'
    );

    var criar_notificao=function(foto,nome,link_perfil,sexo){
        var notificacao=toHtml(
'<div class="item-notificacao-amizade capa-bordada px-1 py-1 my-1 mx-1">\
    <div class="capa-foto-notificao-amizade capa-bordada px-1 py-1 mx-1 my-1 i-b">\
        <div class="foto-notificao-amizade">\
            <a href="'+link_perfil+'" class="x-centralizada">\
                <img src="'+foto+'" title="'+nome+'" alt="'+nome+'" class="debug-centralizacao">\
            </a>\
        </div>\
    </div>\
    <div class="texto-notificacao-amizade i-b mt-3">\
        <div class="fonte-pequena text-muted legenda-notificacao-amizade py-1">\
            <b>'+nome+'</b>\
            <span></span>\
        </div>\
    </div>\
</div>'
        );
        notificacao.find('.legenda-notificacao-amizade > span').text([' é sua amiga?',' é seu amigo?'][sexo]);

        //add botão de confirmação/cancelamento para os convites
        botao_decisao=botoes_sim_nao();
        botao_decisao.removeClass('centro');
        botao_decisao.find('.botao-confirmar').text('sim');
        botao_decisao.find('.botao-cancelar').text('não');
        notificacao.find('.texto-notificacao-amizade').append(botao_decisao);

        //funções de aceitação/negação de amizade
        notificacao.find('.botao-confirmar').click(function(){
            notificacao.remove();
            alert('Você aceitou!');
            if (div.find('#notificacoes-amizades > .item-notificacao-amizade').length==0){
                div.remove();
            }
        });
        notificacao.find('.botao-cancelar').click(function(){
            notificacao.remove();
            alert('Você negou!');
            if (div.find('#notificacoes-amizades > .item-notificacao-amizade').length==0){
                div.remove();
            }
        });

        div.find('#notificacoes-amizades').append(notificacao);
    };

    $.each(notificacoes_amizade,function(i,v){
        criar_notificao(v[0],v[1],v[2],v[3]);
    });
    if (notificacoes_amizade.length>1){
        div.find('#titulo-notificacao-amizade').text('solicitações de amizades');
    }

    $('#notificacoes').append(div);
}

function notificacoes(){
    /*Cria as notificações que aparecem quando se clica no 'sino' das notificações*/
    var criar_notificacao=function(tipo,foto,nome_pessoa,qtd_pessoas,link_notificacao){
        if (link_notificacao==''){
            var notificacao=$('<div/>');
        }
        else {
            var notificacao=$('<a/>');
            notificacao.attr('href',link_notificacao);
        }

        var texto_notificacao=function(tipo,qtd_pessoas){
            if (tipo=='like-pub'){
                if (qtd_pessoas==1){
                    return 'curtiu <br>a sua publicação.';
                }
                else if(qtd_pessoas==2){
                    return 'e outra pessoa <br>curtiram a sua publicação';
                }
                else {
                    return 'e outras '+(qtd_pessoas-1)+' pessoas <br>curtiram a sua publicação';
                }
            }
        };

        notificacao.addClass('dropdown-item');
        notificacao.append(
'<div class="capa-foto-notificao capa-bordada i-b">\
    <div class="foto-notificacao x-centralizada">\
        <img src="'+foto+'" class="debug-centralizacao">\
    </div>\
</div>\
<div class="texto-notificacao i-b mx-2">\
    <div class="fonte-pequena text-muted legenda-notificacao py-1">\
        <span><b class="pr-1">'+nome_pessoa+'</b>'+texto_notificacao(tipo,qtd_pessoas)+'</span>\
    </div>\
</div>'
        );
        if (nome_pessoa==''){
            notificacao.find('.legenda-notificacao > b').remove();
        }
        return notificacao;
    };
    $.each(notificacoes_gerais,function(i,v){
        $('#menu-notificacoes').append(criar_notificacao(v[0],v[1],v[2],v[3],v[4]));
    });
}
