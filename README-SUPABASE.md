# Configuração do Supabase e Solução de Problemas

Este documento fornece instruções sobre como configurar o Supabase para autenticação no projeto e como resolver problemas comuns de conexão.

## Configuração do Supabase

### 1. Crie um projeto no Supabase

1. Acesse [supabase.com](https://supabase.com/) e faça login
2. Crie um novo projeto
3. Anote a URL do projeto e a chave anônima (anon key)

### 2. Configure as variáveis de ambiente

#### Desenvolvimento local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

#### Ambiente de produção

Configure as mesmas variáveis de ambiente na sua plataforma de hospedagem (Vercel, Netlify, etc.):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

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

## Verificação de Configuração

Para verificar se o Supabase está configurado corretamente, execute:

```bash
npm run check-supabase
```

Este comando verificará se as variáveis de ambiente necessárias estão definidas e fornecerá instruções adicionais se necessário.

## Suporte

Se você continuar enfrentando problemas com a autenticação:

1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Use as contas especiais para acessar o sistema temporariamente
3. Entre em contato com o suporte técnico fornecendo os logs de erro do console do navegador 