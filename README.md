## Fluxo do sistema

Cliente inicia sessão
↓
Cliente seleciona foto(s)
↓
Sistema recebe o arquivo
↓
Cria a entidade Photo
↓
Cliente escolhe tamanho e quantidade
↓
Cria a entidade PrintOrderItem
↓
Envia pedido para impressão
↓
Loja faz download dos arquivos

## requisitos não funcionais

Os arquivos de imagem devem ser feito upload através de multipart/form-data

Requisitos funcionais

Sessões

[x] O sistema deve permitir que um cliente crie uma nova sessão de envio.  
[x] O sistema deve gerar um identificador único para cada sessão.  
[x] O sistema deve registrar a data e hora de criação da sessão.  
[x] O sistema deve permitir consultar uma sessão pelo seu identificador.  
[x] O sistema deve rejeitar operações realizadas com um identificador de sessão inexistente.  
[x] O sistema deve permitir encerrar uma sessão.  
[x] O sistema deve impedir o envio de novas fotos para uma sessão encerrada.  
[x] O sistema deve permitir que várias fotos sejam associadas à mesma sessão.

Fotos

[x] O sistema deve permitir o envio de uma ou várias fotos em uma requisição.  
[x] O sistema deve aceitar os principais formatos de imagem utilizados em celulares.  
[x] O sistema deve armazenar fisicamente os arquivos enviados.  
[x] O sistema deve gerar um nome único para cada arquivo armazenado.  
[x] O sistema deve preservar o nome original do arquivo.  
[x] O sistema deve armazenar o tipo MIME da foto.  
[x] O sistema deve armazenar o tamanho do arquivo.  
[x] O sistema deve gerar um identificador único para cada foto.  
[x] O sistema deve associar cada foto à sessão que realizou o upload.  
[x] O sistema deve permitir consultar uma foto pelo seu identificador.  
[x] O sistema deve permitir listar as fotos de uma sessão.  
[x] O sistema deve permitir remover uma ou mais fotos de uma sessão.  
[x] Ao remover uma foto, o sistema deve remover também seu arquivo físico.  
[ ] O sistema deve informar ao cliente quando o upload for concluído.  
[ ] O sistema deve informar quais arquivos falharam durante um upload múltiplo.

Armazenamento

[x] O sistema deve possuir uma abstração para armazenamento de arquivos.  
[x] O sistema deve possuir uma implementação de armazenamento local.  
[x] O sistema deve permitir substituir o armazenamento local por outro armazenamento sem alterar o domínio.  
[x] O sistema deve organizar os arquivos de forma que seja possível identificar a sessão à qual pertencem.  
[ ] O sistema deve impedir colisões de nomes entre arquivos.  
[ ] O sistema deve remover arquivos órfãos quando uma operação de criação de foto falhar.

Pedidos de impressão

[ ] O cliente deve poder selecionar uma foto para impressão.  
[ ] O cliente deve poder escolher o tamanho da impressão.  
[ ] O cliente deve poder escolher a quantidade de cópias.  
[ ] O cliente deve poder escolher o tipo de papel.  
[ ] O sistema deve permitir papel fosco (matte).  
[ ] O sistema deve permitir papel brilhante (glossy).  
[ ] O sistema deve criar um PrintOrderItem para cada configuração de impressão.  
[ ] O sistema deve permitir que uma mesma foto tenha configurações de impressão diferentes.  
[ ] O sistema deve permitir várias cópias de uma mesma foto.  
[ ] O sistema deve associar cada item de impressão à foto correspondente.  
[ ] O sistema deve permitir revisar o pedido antes de enviá-lo.  
[ ] O cliente deve poder enviar o pedido para impressão.  
[ ] O sistema deve gerar um identificador único para o pedido.  
[ ] O sistema deve registrar o status do pedido.  
[ ] O sistema deve permitir consultar o pedido.  
[ ] O sistema deve permitir listar os itens de um pedido.

Processamento do pedido

[ ] O pedido deve iniciar com status pending.  
[ ] A loja deve poder alterar o pedido para printing.  
[ ] A loja deve poder alterar o pedido para done.  
[ ] O sistema deve disponibilizar as fotos da sessão para a loja.  
[ ] A loja deve conseguir identificar quais fotos precisam ser impressas.  
[ ] A loja deve conseguir visualizar tamanho, quantidade e tipo de papel de cada item.  
[ ] A loja deve conseguir baixar os arquivos necessários para impressão.

Interface do cliente

[ ] O cliente deve conseguir acessar o sistema através da rede local.  
[ ] O cliente deve conseguir criar uma sessão sem criar uma conta.  
[ ] O cliente deve conseguir selecionar fotos diretamente do celular.  
[ ] O cliente deve visualizar as fotos que já foram enviadas.  
[ ] O cliente deve visualizar o progresso do upload.  
[ ] O cliente deve conseguir configurar cada impressão.  
[ ] O cliente deve visualizar um resumo do pedido.  
[ ] O cliente deve conseguir confirmar o pedido.

Interface da loja

[ ] A loja deve possuir uma interface para visualizar as sessões.  
[ ] A loja deve visualizar os pedidos pendentes.  
[ ] A loja deve visualizar os pedidos em impressão.  
[ ] A loja deve visualizar os pedidos concluídos.  
[ ] A loja deve conseguir acessar as fotos de um pedido.  
[ ] A loja deve conseguir baixar as fotos.  
[ ] A loja deve conseguir alterar o status do pedido.

## Requisitos não funcionais

Desempenho

[ ] O sistema deve suportar o upload simultâneo de múltiplas fotos.  
[ ] O sistema deve evitar carregar arquivos excessivamente grandes inteiramente na memória quando isso não for necessário.  
[ ] O sistema deve processar uploads sem bloquear o servidor.  
[ ] O sistema deve suportar vários clientes conectados simultaneamente.  
[ ] O sistema deve fornecer feedback de progresso durante uploads grandes.

Segurança

[ ] O sistema deve validar o tipo dos arquivos enviados.  
[ ] O sistema deve limitar o tamanho máximo de cada arquivo.  
[ ] O sistema deve limitar a quantidade de arquivos por requisição.  
[ ] O sistema deve validar os dados recebidos pelo cliente.  
[ ] O sistema não deve confiar exclusivamente na extensão do arquivo.  
[ ] O sistema deve impedir acesso arbitrário ao filesystem através de nomes de arquivos enviados pelo usuário.  
[ ] O sistema deve impedir que um cliente acesse arquivos pertencentes a outra sessão.  
[ ] O sistema deve evitar exposição direta da pasta de armazenamento.  
[ ] O sistema deve tratar erros de upload sem expor informações internas do servidor.  
[ ] O sistema deve possuir mecanismos para impedir abuso da rede local.

Confiabilidade

[ ] O sistema não deve criar registros de fotos quando o armazenamento físico falhar.  
[ ] O sistema deve evitar arquivos físicos órfãos.  
[ ] O sistema deve manter consistência entre arquivos e registros do banco.  
[ ] O sistema deve tratar falhas parciais em uploads múltiplos.  
[ ] O sistema deve tratar corretamente arquivos inexistentes.  
[ ] O sistema deve tratar sessões inexistentes.  
[ ] O sistema deve tratar pedidos inexistentes.

Manutenibilidade

[ ] O domínio não deve depender diretamente do Prisma.  
[ ] O domínio não deve depender diretamente do filesystem.  
[ ] O PhotoService deve depender de abstrações.  
[ ] O armazenamento de arquivos deve possuir uma abstração FileStorage.  
[ ] Os repositories devem possuir abstrações.  
[ ] As implementações dos repositories devem poder ser substituídas.  
[ ] O sistema deve possuir testes unitários para as regras de domínio.  
[ ] O sistema deve possuir testes para os services.  
[ ] O sistema deve possuir testes para os controllers.  
[ ] O sistema deve possuir testes para os repositories.  
[ ] O sistema deve possuir documentação da API.

Infraestrutura

[ ] O sistema deve funcionar em ambiente Linux.  
[ ] O sistema deve funcionar em ambiente Windows.  
[ ] O sistema deve poder ser executado através do Docker.  
[ ] O caminho do armazenamento deve ser configurável.  
[ ] As configurações do ambiente devem ser obtidas através de variáveis de ambiente.  
[ ] O banco de dados deve possuir mecanismo de persistência adequado.  
[ ] O sistema deve possuir estratégia de backup das fotos.  
[ ] O sistema deve possuir estratégia de backup do banco de dados.

## Regras de negócio

Estas são particularmente importantes, porque representam regras do seu domínio, e não apenas detalhes técnicos.

Sessão

[ ] Uma sessão deve possuir um identificador único.  
[ ] Uma sessão deve possuir uma data de criação.  
[ ] Uma sessão deve começar ativa.  
[ ] Uma sessão encerrada não pode receber novas fotos.  
[ ] Uma foto deve pertencer a exatamente uma sessão.  
[ ] Uma sessão pode possuir zero ou várias fotos.  
[ ] Uma sessão não precisa de cadastro de cliente.

Foto

[ ] Uma foto deve possuir um identificador único.  
[ ] Uma foto deve possuir uma referência ao arquivo físico.  
[ ] Uma foto deve possuir o tipo MIME.  
[ ] Uma foto deve possuir o tamanho do arquivo.  
[ ] Uma foto deve possuir a data de criação.  
[ ] Uma foto não pode existir sem uma sessão válida.  
[ ] Uma foto não pode apontar para um arquivo que não exista.  
[ ] O nome físico do arquivo não deve depender do nome enviado pelo cliente.

Impressão

[ ] Uma impressão deve estar associada a uma foto.  
[ ] Uma impressão deve possuir um tamanho válido.  
[ ] Uma impressão deve possuir uma quantidade inteira e positiva.  
[ ] Uma impressão deve possuir um tipo de papel válido.  
[ ] A quantidade mínima de impressões deve ser 1.  
[ ] O tamanho da impressão deve pertencer à lista de formatos disponíveis.  
[ ] O tipo de papel deve pertencer aos tipos oferecidos pela loja.  
[ ] Uma mesma foto pode possuir mais de um item de impressão.  
[ ] Um PrintOrderItem não pode existir para uma foto inexistente.

Pedido

[ ] Um pedido deve possuir pelo menos um item de impressão.  
[ ] Um pedido deve possuir um identificador único.  
[ ] Um pedido deve começar com status pending.  
[ ] Um pedido pending pode passar para printing.  
[ ] Um pedido printing pode passar para done.  
[ ] Um pedido done não pode voltar para pending.  
[ ] Um pedido concluído não pode receber novos itens.  
[ ] As fotos utilizadas no pedido devem pertencer à sessão correspondente.

Arquivos

[x] O arquivo físico deve ser salvo antes de a foto ser considerada persistida.  
[x] Se o registro da foto falhar depois que o arquivo foi salvo, o arquivo deve ser removido.  
[x] Se o arquivo não puder ser salvo, a Photo não deve ser criada.  
[ ] A exclusão de uma Photo deve remover seu arquivo associado.  
[x] O sistema não deve permitir que o cliente escolha livremente o caminho físico onde o arquivo será salvo.

[ ] QR Code para acessar automaticamente a página da loja.  
[ ] PWA para instalação no celular.  
[ ] Pré-visualização das fotos antes do upload.  
[ ] Rotação/orientação automática das fotos usando EXIF.  
[ ] Detecção automática da orientação da imagem.  
[ ] Cálculo do preço total do pedido.  
[ ] Configuração dos preços pela loja.  
[ ] Impressão de fotos com diferentes acabamentos.  
[ ] Painel administrativo.  
[ ] Autenticação para funcionários.  
[ ] Histórico de pedidos.  
[ ] Exclusão automática de sessões antigas.  
[ ] Barra de progresso individual para cada foto.  
[ ] Upload paralelo com limite de concorrência.  
[ ] Retomada de uploads interrompidos.  
[ ] Geração de miniaturas.  
[ ] Visualização das fotos no painel da loja sem precisar baixá-las.  
[ ] Download de todas as fotos de um pedido em .zip.  
[ ] Exportação do pedido para uma impressora/fila de impressão.  
[ ] Configuração da rede Wi-Fi pelo próprio sistema.  
[ ] Descoberta automática do servidor na rede local.  
[ ] Suporte a múltiplas lojas.  
[ ] Funcionamento totalmente offline.
