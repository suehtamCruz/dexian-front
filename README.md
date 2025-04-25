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

## Construção para Produção

Para compilar o projeto para ambiente de produção, execute:

```bash
ng build --prod
```

Isso irá gerar os arquivos de distribuição na pasta `dist/`, otimizados para melhor desempenho.

## Testes Unitários

Para executar os testes unitários com o [Karma](https://karma-runner.github.io), use o comando:

```bash
ng test
```

## Testes End-to-End

Para testes end-to-end, execute:

```bash
ng e2e
```

O Angular CLI não vem com um framework de testes end-to-end por padrão. Você pode escolher um que atenda às suas necessidades.

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para o branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Recursos Adicionais

Para mais informações sobre o uso do Angular CLI, incluindo referências detalhadas de comandos, visite a [Documentação Oficial do Angular](https://angular.dev/tools/cli).
