# Aplicação de Pesquisa de Perfil do GitHub

## Visão Geral

A aplicação **Pesquisa de Perfil do GitHub** é uma ferramenta web desenvolvida em React que permite aos usuários buscar e visualizar perfis de usuários do GitHub. Ela oferece uma interface responsiva e personalizável com recursos como modo escuro, suporte a múltiplos idiomas e busca dinâmica de dados de perfil diretamente da API do GitHub.

---

### 🖼️ Layout

**🔍 Versão Desktop:**

![Desktop](https://github.com/Vidigal-code/challenge-avanti-github-s/blob/version-project-by-vidigal/public/example/Desing-By-Vidigal-Desktop.gif?raw=true)
---

**📱 Versão Mobile:**

![Mobile](https://github.com/Vidigal-code/challenge-avanti-github-s/blob/version-project-by-vidigal/public/example/Desing-By-Vidigal-Mobile.gif?raw=true)
---

## Funcionalidades

### 1. **Pesquisa de Perfil do GitHub**
- Os usuários podem inserir um nome de usuário do GitHub na barra de pesquisa.
- A aplicação busca os dados do perfil do usuário através da API do GitHub (`https://api.github.com/users/`).
- Exibe informações detalhadas do perfil, incluindo:
    - Nome
    - Bio
    - Número de seguidores
    - Número de pessoas que o usuário está seguindo
    - Número de repositórios públicos
    - Link para o perfil no GitHub

### 2. **Modo Escuro e Modo Claro**
- A aplicação suporta dois temas: **modo escuro** e **modo claro**.
- O estado do tema é salvo no `localStorage`, permitindo que as preferências do usuário sejam mantidas entre sessões.

### 3. **Suporte a Múltiplos Idiomas**
- A aplicação oferece suporte a três idiomas: **Inglês (en)**, **Português (pt)** e **Espanhol (es)**.
- O idioma selecionado é salvo no `localStorage` para manter a preferência do usuário.
- As traduções são carregadas de um arquivo JSON (`translations.json`).

### 4. **Interface Responsiva**
- A interface foi projetada para ser totalmente responsiva, garantindo uma boa experiência de uso em dispositivos móveis e desktops.
- Componentes como botões, imagens e textos ajustam-se dinamicamente ao tamanho da tela.

### 5. **Mensagens de Erro e Carregamento**
- Se o usuário inserir um nome de usuário inválido ou não for encontrado, a aplicação exibirá uma mensagem de erro amigável.
- Durante o carregamento dos dados, um indicador de progresso animado (spinner) é exibido.

---

## Estrutura do Código

### 1. **Tipagem e Interfaces**
- A aplicação utiliza TypeScript para tipagem estática, garantindo maior segurança e previsibilidade no código.
- Interface `GitHubUserData` define a estrutura dos dados retornados pela API do GitHub:
  ```typescript
  export interface GitHubUserData {
      login: string;
      name: string | null;
      avatar_url: string;
      bio: string | null;
      followers: number;
      following: number;
      public_repos: number;
      html_url: string;
  }
  ```

### 2. **Estado e Funções Principais**
- **Estados principais**:
    - `githubUsername`: Armazena o nome de usuário do GitHub inserido pelo usuário.
    - `userData`: Armazena os dados do perfil do GitHub após a busca.
    - `loading`: Indica se a aplicação está buscando dados.
    - `error`: Armazena mensagens de erro, se houver.
    - `isDarkMode`: Controla o tema (claro ou escuro).
    - `language`: Controla o idioma selecionado.
- **Funções principais**:
    - `searchGithubProfile`: Busca os dados do perfil do GitHub usando a API.
    - `toggleDarkMode`: Alterna entre os modos escuro e claro.
    - `handleLanguageChange`: Altera o idioma da aplicação.

### 3. **Componentes Reutilizáveis**
- Ícones como `Search` e `Loader` são importados do pacote `lucide-react` para melhorar a experiência visual.
- Botões e menus são estilizados dinamicamente com base no tema selecionado.

### 4. **Traduções**
- As traduções para diferentes idiomas são armazenadas em um arquivo JSON (`translations.json`), facilitando a adição de novos idiomas no futuro.
- Exemplo de estrutura de tradução:
  ```json
  {
    "en": {
      "inputPlaceholder": "Enter a GitHub username",
      "loading": "Loading...",
      "notFound": "User not found"
    },
    "pt": {
      "inputPlaceholder": "Digite um nome de usuário do GitHub",
      "loading": "Carregando...",
      "notFound": "Usuário não encontrado"
    }
  }
  ```

---

## Fluxo de Funcionamento

1. **Entrada do Usuário**:
    - O usuário insere um nome de usuário do GitHub na barra de pesquisa.
    - Ao pressionar "Enter" ou clicar no botão de busca, a função `searchGithubProfile` é acionada.

2. **Busca de Dados**:
    - A aplicação faz uma requisição à API do GitHub (`https://api.github.com/users/{username}`).
    - Se o usuário for encontrado, os dados são exibidos na interface.
    - Se o usuário não for encontrado ou ocorrer um erro, uma mensagem de erro é exibida.

3. **Exibição dos Dados**:
    - Os dados do perfil são exibidos em um layout limpo e organizado, incluindo foto de perfil, nome, bio, número de seguidores, etc.
    - Um botão "Ver Perfil" redireciona o usuário para o perfil no GitHub.

4. **Personalização**:
    - O usuário pode alternar entre os modos claro e escuro.
    - O idioma pode ser alterado a qualquer momento através de um menu suspenso.

---

## Tecnologias Utilizadas

- **React**: Framework principal para construção da interface.
- **TypeScript**: Adiciona tipagem estática ao projeto, melhorando a qualidade do código.
- **API do GitHub**: Fonte de dados para buscar perfis de usuários.
- **Tailwind CSS**: Estilização responsiva e dinâmica.
- **Lucide React**: Ícones SVG reutilizáveis.
- **JSON**: Armazenamento de traduções para suporte a múltiplos idiomas.

---

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Vidigal-code/challenge-avanti-github-s
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

---

Este projeto é uma ferramenta prática para explorar perfis do GitHub de forma interativa e personalizável.
