let produtos = [];
let dataHoje = new Date();

onload = () => {
    const p = JSON.parse(localStorage.getItem('produtos'));

    if(p) {
        produtos = p;
    }

    listaAlimentos();
    mostraAlimentosVencendo();

    // verifica se o usuario digitou algo
    document.querySelector('#inputNovoProduto').oninput = monitoraCampoAdic;
    document.querySelector('#inputDataVencimento').oninput = monitoraCampoAdic;

    // ----------------------------------------------- BOTOES

    // cadastrar novo alimento
    document.querySelector('#btnCadastrar').onclick = () => {
        document.querySelector('#btnInc').disabled = true;
        ativa('cadastrar');
        document.querySelector('#inputNovoProduto').focus();
    };

    // listar produtos
    document.querySelector('#btnListar').onclick = () => {
        ativa('lista');
    };

    // ---------- botoes incluir ----------

    document.querySelector('#btnInc').onclick = () => {
        cadastraAlimento();
        mostraAlimentosVencendo();
    };

    // ---------- botoes retirar ----------

    document.querySelector('#btnRetirar').onclick = () => {
        apagaProduto();
    };

    // ---------- botoes cancelar/voltar ----------

    document.querySelector('#btnVoltarLista').onclick = () => {
        ativa('lista');
    };

    document.querySelector('#btnVoltarHome').onclick = () => {
        ativa('home');
    };

    document.querySelector('.headerBar').onclick = () => {
        let campo1 = document.querySelector('#inputNovoProduto');
        let campo2 = document.querySelector('#inputDataVencimento');

        campo1.value = '';
        campo2.value = '';
        campo1.removeAttribute('data-id');
        campo2.removeAttribute('data-id');

        ativa('home');
    };

    document.querySelector('#btnCanc1').onclick = () => {
        let campo1 = document.querySelector('#inputNovoProduto');
        let campo2 = document.querySelector('#inputDataVencimento');

        campo1.value = '';
        campo2.value = '';
        campo1.removeAttribute('data-id');
        campo2.removeAttribute('data-id');

        ativa('home');
    };

    // ----------------------------------------------- FIM BOTOES
}

const mostraAlimentosVencendo = () => {
  const notificacao = document.querySelector('#notificacao > .card-container');

  let seteDias = new Date();

  seteDias.setDate(dataHoje.getDate() + 7);

  produtos.forEach((p) => {
      let numeros = p.data.match(/\d+/g);
      let dataProduto = new Date(numeros[0], numeros[1]-1, numeros[2]);

      if(dataProduto <= seteDias) {
          addNotificacao(p, notificacao);
      }

      notificacao.onclick = () => {
          let campoNome = document.querySelector('#nomeProduto');
          let campoData = document.querySelector('#dataValidade');
          ativa('mostraProduto');

          let data = new Data(p.data);

          campoNome.innerHTML = p.nome;
          campoData.innerHTML = data.toLocaleDateString('en-GB');
          campoNome.setAttribute('data-id', p.id);
          campoData.setAttribute('data-id', p.id);
      };
  });
};

const addNotificacao = (produto, notificacao) => {
    notificacao.classList.remove('hidden');
    document.querySelector('.blank').classList.add('hidden');

    // criando elementos
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    let cardImg = document.createElement('div');
    cardImg.setAttribute('class', 'card-img');

    let cardLink = document.createElement('a');
    cardLink.setAttribute('class', 'card-link');

    let cardImgHovered = document.createElement('div');
    cardImgHovered.setAttribute('class', 'card-img-hovered');

    let cardInfo = document.createElement('div');
    cardInfo.setAttribute('class', 'card-info');

    let cardAbout = document.createElement('div');
    cardAbout.setAttribute('class', 'card-about');

    let cardTag = document.createElement('a');
    cardTag.setAttribute('class', 'card-tag tag-produto');
    cardTag.innerHTML = 'Vencendo';

    let cardTitle = document.createElement('h1');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.innerHTML = produto.nome;

    let data = new Date(produto.data);
    let cardVencimento = document.createElement('div');
    cardVencimento.setAttribute('class', 'card-vencimento');
    cardVencimento.innerHTML = 'Vencimento ' + data.toLocaleDateString('en-GB');

    // adiciona o filho de cardAbout
    cardAbout.appendChild(cardTag);

    // adiciona o filho de cardlink
    cardLink.appendChild(cardImgHovered);

    // adiciona o filho de cardInfo
    cardInfo.appendChild(cardAbout);
    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(cardVencimento);

    // add os filhos de card
    card.appendChild(cardImg);
    card.appendChild(cardLink);
    card.appendChild(cardInfo);

    notificacao.appendChild(card);
};

const ativa = (comp) => {
    let listaDeTelas = document.querySelectorAll('body > .component');

    listaDeTelas.forEach((c) => c.classList.add('hidden'));
    document.querySelector('#' + comp).classList.remove('hidden');
};

const cadastraAlimento = () => {
    let campoNome = document.querySelector('#inputNovoProduto');
    let campoData = document.querySelector('#inputDataVencimento');

    let nome = campoNome.value;
    let data = campoData.value;

    if(nome !== '' && data !== '') {
        produtos.push({
            id: Math.random().toString().replace('0.', 'id'),
            nome: nome,
            data: data
        });

        campoNome.value = '';
        campoData.value = '';

        ativa('home');
        salvaProduto();
        listaAlimentos();
    }
};

const listaAlimentos = () => {
    const listaDeProdutos = document.querySelector('#listaDeProdutos');
    listaDeProdutos.innerHTML = '';

    produtos.forEach((p) => {
        let elemProduto = document.createElement('li');
        elemProduto.innerHTML = p.nome;
        elemProduto.setAttribute('data-id', p.id);

        elemProduto.onclick = () => {
            let campoNome = document.querySelector('#nomeProduto');
            let campoData = document.querySelector('#dataValidade');
            ativa('mostraProduto');

            let data = new Date(p.data);

            campoNome.innerHTML = p.nome;
            campoData.innerHTML = data.toLocaleDateString('en-GB');
            campoNome.setAttribute('data-id', p.id);
            campoData.setAttribute('data-id', p.id);
        };

        listaDeProdutos.appendChild(elemProduto);
    });

    if(produtos.length > 0) {
        listaDeProdutos.classList.remove('hidden');
        document.querySelector('#blankLista').classList.add('hidden');
    } else {
        listaDeProdutos.classList.add('hidden');
        document.querySelector('#blankLista').classList.remove('hidden');
    }
};

const monitoraCampoAdic = (e) => {
    let botao = document.querySelector('#btnInc');

    if(e.target.value.length > 0) {
        botao.disabled = false;
    } else {
        botao.disabled = true;
    }
};

const apagaProduto = () => {
    let campoNome = document.querySelector('#nomeProduto');
    let campoValidade = document.querySelector('#dataValidade');
    let idProduto = campoNome.getAttribute('data-id');

    produtos = produtos.filter((p) => p.id !== idProduto);

    campoNome.value = '';
    campoNome.removeAttribute('data-id');

    campoValidade.value = '';
    campoValidade.removeAttribute('data-id');

    ativa('lista');
    salvaProduto();
    listaAlimentos();
};

const salvaProduto = () => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
};

navigator.serviceWorker.register("smartfridge-sw.js");