# Varejim

Aplicação de varejo para pequenas empresas.

## Estrutura do projeto
`src/`
- `api/` - Arquivos que consomem o backend;
- `assets/` - Arquivos estáticos do projeto, tais como imagens, arquivos scss, etc;
- `components` - Blocos de componentes reutilizáveis na aplicação;
- `mixins` - Contém os mixins do Vue;
- `router` - Arquivos de configuração de rotas;
- `store` - Estado global da aplicação com Vuex;
- `views` - Contém as páginas do projeto.

## Dependências
É necessária a instalação do `docker-compose`.

## Iniciando o projeto
Para rodar o projeto:
```sh
git clone https://github.com/brpontes/desafio-frontend-cm.git
cd desafio-frontend-cm
docker-compose up --build
```
Após clonar o repositório e entrar na pasta do projeto, ao rodar o comando do docker-compose você:
- Vai buildar o projeto e carregar todas as dependências;
- Levantará o serviço de **back** na porta `3000` e o **front** na porta `8080`;
- Carregará as variáves de ambiente necessárias para o projeto.

Abra o projeto no seu navegador na URL `http://localhost:8080`.

## Testes de desenvolvimento
O ambiente utilizado para desenvolvimento foi o `Ubuntu 20.04` mas também testado no `Windows 10`. A aplicação rodou em ambos os ambientes devido o uso do **Docker**. Ambos rodaram sem nenhum erro.

## Extras
- A aplicação é responsiva;
- Além do filtro por código/descrição, também adicionei filtro por seção, que está logo acima do input de filtragem.