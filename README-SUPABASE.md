# Configuração do Supabase e Solução de Problemas

Este documento fornece instruções sobre como configurar o Supabase para autenticação no projeto e como resolver problemas comuns de conexão.

## Configuração do Supabase

### 1. Credenciais do Supabase

As credenciais do Supabase para este projeto são:

- **URL do Projeto**: `https://htmkhefvctwmbrgeejkh.supabase.co`
- **Chave Anônima**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA`

### 2. Configure as variáveis de ambiente

#### Desenvolvimento local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://htmkhefvctwmbrgeejkh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA
```

#### Ambiente de produção

Configure as mesmas variáveis de ambiente na sua plataforma de hospedagem (Vercel, Netlify, etc.):

- `NEXT_PUBLIC_SUPABASE_URL`: `https://htmkhefvctwmbrgeejkh.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA`

### 3. Verifique a configuração

Execute o comando para verificar se as variáveis de ambiente estão configuradas corretamente:

```bash
npm run check-supabase
```

## Solução de Problemas

### Erro de conexão durante o login

Se você encontrar o erro "Erro de conexão. Verifique sua internet e tente novamente", isso pode ser causado por:

1. **Problemas de conectividade**: Verifique sua conexão com a internet
2. **Variáveis de ambiente não configuradas**: Certifique-se de que as variáveis de ambiente do Supabase estão configuradas corretamente
3. **Problemas com o serviço Supabase**: Verifique o status do Supabase em [status.supabase.com](https://status.supabase.com/)

### Acessando o sistema sem conexão

Você pode usar as contas especiais para acessar o sistema mesmo quando há problemas de conexão:

- **Professor**: 
  - Email: profadrianadermato@dermato.com
  - Senha: professoraadriana123

- **Admin**: 
  - Email: weelzinho@admin.com
  - Senha: weladmin12345

Estas contas funcionam mesmo quando o Supabase não está disponível ou não está configurado corretamente.

## Configuração Atual

O projeto foi configurado para usar as credenciais do Supabase diretamente no código, o que significa que o login deve funcionar mesmo sem configurar as variáveis de ambiente. No entanto, é uma boa prática configurar as variáveis de ambiente para maior segurança e flexibilidade.

## Suporte

Se você continuar enfrentando problemas com a autenticação:

1. Verifique se as credenciais do Supabase estão corretas
2. Use as contas especiais para acessar o sistema temporariamente
3. Entre em contato com o suporte técnico fornecendo os logs de erro do console do navegador 