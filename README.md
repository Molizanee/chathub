# ChatHub

### Aplicativo de chat em tempo real desenvolvido com React Native e Firebase

## Recursos

- **Mensagens em Tempo Real:** Utilizando o Firestore Database.
- **Autenticação de Usuários:** Segurança garantida pelo Firebase Authentication.
- **Multiplataforma:** Disponível para Android, iOS e Web.

## Primeiros Passos

### Pré-requisitos

- **Node.js**
  - Versão 20.14.0 LTS
  - [Baixe aqui](https://nodejs.org/en)
- **npm ou Yarn**
  - npm - Versão 10.8.1 (Instalado junto com o Node.js)
  - Yarn - Versão 1.22.22
    - [Baixe aqui](https://classic.yarnpkg.com/en/)
- **CLI do React Native**
  - Versão 0.74.2
    - Instalado com o Expo Framework
      - [Saiba mais](https://expo.dev/)
- **Projeto Firebase**
  - Gratuito
  - [Comece aqui](https://firebase.google.com/?hl=pt-br)

### Configuração

1. **Clonar o Repositório**
   - Abra o terminal, navegue até uma pasta de projetos e execute:
     ```bash
     git clone https://github.com/Molizanee/chathub.git
     ```
2. **Instalar as Dependências**
   - Navegue até a pasta do projeto:
     ```bash
     cd chathub
     ```
   - Execute:
     ```bash
     npm install
     ```
3. **Configurar o Projeto Firebase**

   - Acesse o [Firebase](https://firebase.google.com/?hl=pt-br) e entre com sua conta Google.
   - Crie um projeto chamado chathub, aceite os termos e prossiga.
   - **Configuração do Google Analytics não é necessária.**
   - Adicione um **app Web** com o nome do projeto (chathub).
   - Instale o Firebase no código do seu projeto:
     ```bash
     npm install firebase
     ```
   - Copie as chaves de configuração do `firebaseConfig`:

4. **Configurar Variáveis de Ambiente**

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes linhas (Adicione os valores **sem as aspas**):
     ```plaintext
     EXPO_PUBLIC_API_KEY=Sua_Api_Key
     EXPO_PUBLIC_AUTH_DOMAIN=Seu_Auth_Domain
     EXPO_PUBLIC_PROJECT_ID=Seu_Project_ID
     EXPO_PUBLIC_STORAGE_BUCKET=Seu_Storage_Bucket
     EXPO_PUBLIC_MESSAGING_SENDER_ID=Seu_Messaging_Sender_Id
     EXPO_PUBLIC_APP_ID=Seu_App_Id
     EXPO_PUBLIC_MEASUREMENT_ID=Seu_Measurement_Id
     ```

5. **Executar o Projeto**
   - Inicie o projeto com:
     ```bash
     npx expo start
     ```
   - Abra o app em um emulador Android ou iOS. Também é possível testar o app em seu próprio celular baixando o aplicativo Expo Go e escaneando o código QR.

## Como Utilizar o ChatHub

- Para começar a conversar, é necessário que ambos os dispositivos estejam com o app aberto simultaneamente, seja em um emulador ou em um celular. Na tela de contatos, adicione um contato usando o e-mail registrado no ChatHub. Após o contato ser adicionado, você pode enviar mensagens que serão recebidas automaticamente pela outra conta.

  - **Observação:** Ao adicionar um contato, a outra conta não adicionará automaticamente o seu e-mail à lista de contatos dela, mas receberá suas mensagens quando enviadas.

## Estrutura do Projeto

O projeto ChatHub está organizado em três pastas principais, cada uma com um propósito específico dentro da arquitetura do aplicativo:

- **/app:** Esta pasta contém todas as telas do aplicativo, organizando a interface com a qual o usuário interage. Cada tela é implementada como um componente React Native, facilitando a navegação e a manutenção do código.

- **/components:** Contém os componentes reutilizáveis que compõem as interfaces das telas. Esses componentes incluem botões, campos de entrada, e outros elementos de UI que são utilizados em várias partes do aplicativo, promovendo a consistência e reduzindo a duplicidade de código.

- **/Firebase:** Armazena as funções responsáveis pela comunicação do aplicativo com o Firebase Firestore. Estas funções são usadas para manipular os dados dos contatos e dos chats, incluindo operações como adicionar, remover, e atualizar informações, além de escutar mudanças em tempo real para atualizar a interface do usuário conforme necessário.

## Informações Adicionais

ChatHub é um projeto desenvolvido com o intuito de proporcionar uma experiência prática no uso de tecnologias emergentes no desenvolvimento de apps. Utilizando React Native para a construção da interface do usuário e integrando com Firebase Authentication e Firestore para gerenciamento de autenticação e dados, este projeto serve como um excelente recurso de aprendizado para desenvolvedores que desejam aprofundar seus conhecimentos em:

- **React Native:** Explore como construir aplicativos multiplataforma eficientes e dinâmicos.
- **Firebase Authentication:** Aprenda a implementar sistemas de autenticação robustos e seguros.
- **Firebase Firestore:** Ganhe experiência com este serviço de banco de dados NoSQL para manipular e armazenar dados em tempo real.

ChatHub não apenas exemplifica a integração dessas tecnologias, mas também oferece um cenário real de aplicação, permitindo assim para fins de estudos o ganho de conhecimento em desenvolvimento mobile.
