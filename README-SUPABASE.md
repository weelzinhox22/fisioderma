# Configuração do Supabase e Solução de Problemas

Este documento fornece instruções sobre como configurar o Supabase para autenticação no projeto e como resolver problemas comuns de conexão.

## Configuração do Supabase

### 1. Credenciais do Supabase

As credenciais do Supabase para este projeto são:

- **URL do Projeto**: `https://htmkhefvctwmbrgeejkh.supabase.co`
- **Chave Anônima**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA`

### 2. Configuração Atual

O projeto foi configurado para usar credenciais fixas do Supabase diretamente no código através do arquivo `lib/supabase/client.ts`. Isso garante que o login funcione corretamente tanto no ambiente local quanto no deploy, mesmo sem configurar variáveis de ambiente.

Você ainda pode configurar as variáveis de ambiente para maior segurança e flexibilidade:

#### Desenvolvimento local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://htmkhefvctwmbrgeejkh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA
```

#### Configuração no Vercel

Para configurar as variáveis de ambiente no Vercel:

1. Acesse o dashboard do Vercel e selecione seu projeto
2. Vá para "Settings" > "Environment Variables"
3. Adicione as seguintes variáveis:
   - Nome: `NEXT_PUBLIC_SUPABASE_URL`
   - Valor: `https://htmkhefvctwmbrgeejkh.supabase.co`
   - Ambientes: Production, Preview, Development

   - Nome: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Valor: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA`
   - Ambientes: Production, Preview, Development

4. Clique em "Save" e faça o redeploy do seu projeto

### 3. Verifique a configuração

Execute os comandos para verificar se as variáveis de ambiente estão configuradas corretamente e se há conectividade com o Supabase:

```bash
npm run check-supabase
npm run check-connectivity
```

## Correções Implementadas

### 1. Credenciais Fixas

As credenciais do Supabase agora são definidas diretamente no código através do arquivo `lib/supabase/client.ts`. Isso garante que o login funcione mesmo sem configurar variáveis de ambiente.

### 2. Remoção de Verificações de Conectividade Desnecessárias

Removemos verificações de conectividade desnecessárias que estavam causando falsos positivos de erro de conexão.

### 3. Correção do Erro de Build

O erro `useSearchParams() should be wrapped in a suspense boundary at page "/login"` foi corrigido envolvendo o componente que usa `useSearchParams()` em um componente Suspense.

### 4. Endpoint de Health Check

Adicionamos um endpoint `/api/health-check` para verificar a conectividade com o servidor antes de mostrar mensagens de erro de conexão.

### 5. Otimizações de Performance no Login

Para resolver o problema de lentidão no login e múltiplas alterações de estado de autenticação, implementamos as seguintes otimizações:

- **Redirecionamento direto**: Substituímos o uso do router do Next.js por `window.location.href` para garantir um redirecionamento mais rápido após o login.
- **Cache de dados do usuário**: Armazenamos os dados do usuário no localStorage para evitar múltiplas verificações.
- **Debounce de eventos de autenticação**: Implementamos um mecanismo de debounce para ignorar eventos de autenticação muito frequentes.
- **Prevenção de processamento simultâneo**: Adicionamos controles para evitar o processamento simultâneo de múltiplos eventos de autenticação.
- **Otimização do middleware**: Melhoramos o middleware para evitar redirecionamentos desnecessários.

## Solução de Problemas

### Erro de conexão durante o login

Se você encontrar o erro "Erro de conexão. Verifique sua internet e tente novamente", isso pode ser causado por:

1. **Problemas de conectividade**: Verifique sua conexão com a internet
2. **Problemas com o serviço Supabase**: Verifique o status do Supabase em [status.supabase.com](https://status.supabase.com/)

### Acessando o sistema sem conexão

Você pode usar as contas especiais para acessar o sistema mesmo quando há problemas de conexão:

- **Professor**: 
  - Email: profadrianadermato@dermato.com
  - Senha: professoraadriana123

- **Admin**: 
  - Email: weelzinho@admin.com
  - Senha: weladmin12345

Estas contas funcionam mesmo quando o Supabase não está disponível ou não está configurado corretamente.

## Suporte

Se você continuar enfrentando problemas com a autenticação:

1. Execute o script de verificação de conectividade: `npm run check-connectivity`
2. Use as contas especiais para acessar o sistema temporariamente
3. Entre em contato com o suporte técnico fornecendo os logs de erro do console do navegador 