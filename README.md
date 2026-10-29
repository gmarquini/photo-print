# Very Smart Print

Aplicação web para receber fotos de clientes e organizar suas configurações de
impressão. Cada pedido é agrupado em uma sessão identificada por uma palavra-chave;
o cliente envia fotos, escolhe os detalhes de impressão e envia a sessão. A
interface também oferece uma tela administrativa para acompanhar as sessões.

## Como funciona

1. O cliente inicia uma sessão, criada com identificador e palavra-chave próprios.
2. Envia uma ou mais fotos para essa sessão.
3. Escolhe quais fotos deseja imprimir e configura tamanho, quantidade, tipo de
   papel (brilhante ou fosco) e inclusão de data.
4. Envia o pedido; a sessão passa ao status `sent`.
5. A tela administrativa lista as sessões registradas.

As imagens são gravadas localmente em `api/storage`, e os metadados das sessões,
fotos e itens de impressão são persistidos no PostgreSQL. A API já permite consultar
fotos e itens de impressão; o download dos arquivos para a loja ainda não está
implementado como fluxo próprio.

## Tecnologias

- **Frontend:** React, TypeScript, Vite e React Router.
- **API:** NestJS, TypeScript e Prisma.
- **Banco de dados:** PostgreSQL 16.
- **Arquivos:** armazenamento local no diretório `api/storage`.

## Requisitos

- Node.js 20 (recomendado: versão 20.19 ou superior) e npm.
- Docker com Docker Compose, para iniciar o PostgreSQL pelo projeto.

## Executar localmente

Na raiz do repositório, instale as dependências:

```bash
npm install
npm --prefix api install
npm --prefix web install
```

Inicie o banco:

```bash
npm run db:up
```

No mesmo terminal, configure a conexão, aplique as migrações e inicie a aplicação:

```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/photo_print?schema=public"
cd api
npx prisma migrate deploy
cd ..
npm run dev
```

O comando `npm run dev` inicia a API e o frontend em modo de desenvolvimento. A
interface fica disponível em <http://localhost:5173> e a API em
<http://localhost:3000>. A URL da API está configurada no frontend para
`http://localhost:3000`.

Para parar os serviços, interrompa `npm run dev` com `Ctrl+C`. O banco pode ser
parado separadamente:

```bash
npm run db:down
```

> O comando de desenvolvimento inicia o PostgreSQL, mas não aplica as migrações
> automaticamente. Execute `npx prisma migrate deploy` após iniciar o banco e
> antes da primeira execução da API.

## Executar os serviços separadamente

Com o PostgreSQL em execução e `DATABASE_URL` definido no ambiente:

```bash
cd api
npm run start:dev
```

Em outro terminal, na raiz do repositório:

```bash
npm --prefix web run dev
```

## Rotas principais da API

Todas as rotas abaixo usam a base `http://localhost:3000`.

| Método   | Rota                                      | Descrição                              |
| -------- | ----------------------------------------- | -------------------------------------- |
| `POST`   | `/sessions`                               | Cria uma sessão                        |
| `GET`    | `/sessions`                               | Lista sessões                          |
| `GET`    | `/sessions/:sessionId`                    | Consulta uma sessão                    |
| `PATCH`  | `/sessions/:sessionId/send`               | Marca uma sessão como enviada          |
| `PATCH`  | `/sessions/:sessionId/finish`             | Marca uma sessão como finalizada       |
| `PATCH`  | `/sessions/:sessionId/cancel`             | Cancela uma sessão                     |
| `POST`   | `/sessions/:sessionId/photos`             | Envia fotos no campo multipart `photo` |
| `GET`    | `/sessions/:sessionId/photos`             | Lista as fotos da sessão               |
| `GET`    | `/sessions/:sessionId/photos/:photoId`    | Obtém o arquivo da foto                |
| `DELETE` | `/sessions/:sessionId/photos/:photoId`    | Remove uma foto                        |
| `POST`   | `/sessions/photos/:photoId/printOrders`   | Cria um item de impressão              |
| `GET`    | `/sessions/:sessionId/printOrders`        | Lista itens de impressão da sessão     |
| `DELETE` | `/sessions/printOrders/:printOrderItemId` | Remove um item de impressão            |

O upload aceita imagens JPEG, PNG, HEIC, WebP, HEIF e TIFF, com limite de 10 MB por
arquivo e até 100 arquivos por requisição. Os tamanhos de impressão aceitos pela
API estão definidos no controlador de itens de impressão.

## Comandos úteis

Executados a partir da raiz:

```bash
npm run db:up                 # Inicia o PostgreSQL
npm run db:down               # Para o PostgreSQL
npm --prefix api test         # Testes unitários da API
npm --prefix api run test:e2e # Testes end-to-end da API
npm --prefix api run build    # Compila a API
npm --prefix web run build    # Verifica os tipos e compila o frontend
```
