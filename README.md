# Sistema de Gestão Escolar - Frontend

Este projeto é o frontend do Sistema de Gestão Escolar, desenvolvido com [Angular](https://angular.dev/) versão 19.2.9. O sistema permite o gerenciamento de escolas e alunos, oferecendo uma interface moderna e intuitiva para administradores escolares.

## Funcionalidades

- **Gestão de Escolas**: Cadastro, edição, visualização e exclusão de escolas
- **Gestão de Alunos**: Cadastro, edição, visualização e exclusão de alunos
- **Sistema de Autenticação**: Login seguro para acesso às funcionalidades
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

## Tecnologias Utilizadas

- **Angular 19**: Framework para desenvolvimento do frontend
- **Angular Material**: Biblioteca de componentes de UI
- **TailwindCSS**: Framework CSS para estilização
- **NgxMask**: Para formatação de campos como CPF e telefone
- **SweetAlert2**: Para exibição de alertas e confirmações
- **RxJS**: Para programação reativa

## Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Angular CLI (versão 19 ou superior)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seuUsuario/dexian-front.git
cd dexian-front
npm install
```

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento local, execute:

```bash
ng serve
```

Após iniciar o servidor, abra seu navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você fizer alterações nos arquivos fonte.

## Estrutura do Projeto

```
src/
├── app/
│   ├── modules/           # Módulos principais (escolas, alunos, login)
│   │   ├── login/         # Componentes de autenticação
│   │   ├── schools/       # Componentes de gestão de escolas
│   │   └── students/      # Componentes de gestão de alunos
│   ├── shared/            # Recursos compartilhados
│   │   ├── models/        # Interfaces e modelos de dados
│   │   ├── services/      # Serviços para comunicação com a API
│   │   └── menu/          # Componente de navegação
├── assets/                # Recursos estáticos (imagens, ícones)
└── environments/          # Configurações de ambiente
```


## Testes Unitários

Para executar os testes unitários com o [Karma](https://karma-runner.github.io), use o comando:

```bash
ng test
```
