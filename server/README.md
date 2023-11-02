# Requisitos

## Usuarios
[x] Login
  [x] Ver se o usuário é liberado para aquela empresa
[x] Cadastrar
  [x] Somente admins da respectiva empresa
  [x] Informar o nome, email, id da organizacao e o tipo de permissao do usuario naquela organizacao
  [x] Se o usuário existir, ele deve apenas ser inserido na empresa com sua respectiva permissao
  [x] Se o usuário não existir, cria-lo com uma senha padrão e inseri-lo na empresa com sua respectiva permissao
[x] Atualizar perfil
  [x] nome e avatar
[x] Buscar dados do perfil
[x] Redefinir senha
  [x] Enviar email
[x] Remover usuário da empresa (Somente admins da respectiva empresa)
[x] Listar usuários vinculados a uma empresa (Somente admins da respectiva empresa)
[x] Listar empresas em que o usuário está associado

## Empresas
[x] Cadastrar empresa (somente usuário super (Carlos))
[x] Inativar empresa (somente usuário super (Carlos))
[x] Listar todas as empresas (somente usuário super (Carlos))

## Arquivos
[x] Upload de arquivos

## Grupos de conversa
[x] Criar grupos (Somente admins da respectiva empresa)
[x] Listar grupos de conversa da empresa
[x] Remover grupos (Somente admins da respectiva empresa)
    [x] Não listar grupos excluidos
    [] Não permitir enviar mensagem em um grupo excluido

## Configuração do websocket (Canal de comunicação utilizado para trocar mensagens)
[x] Configuração do websocket
[x] Configuração de canais de comunicação por empresa
[x] Autenticação do usuário que solicitar conexão com um canal de comunicação

## Mensagens
[] Enviar mensagem nos grupos
  [] Upload de arquivo
  [] Criar/atualizar ConversionParticipante
[] Listar mensagens do grupo
[] Pesquisar mensagens do grupo
[] Pesquisar midias dos grupos

## Items favoritos (mensagens)
[] Salvar item
[] Remover item salvo
[] Listar itens salvos