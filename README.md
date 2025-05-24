# FisioDerma

Plataforma educacional para fisioterapia dermatofuncional.

## Configuração do Ambiente

### Variáveis de Ambiente Necessárias

Para executar este projeto corretamente, você precisa configurar as seguintes variáveis de ambiente:

1. **GROQ_API_KEY**: Chave de API para o assistente de IA
   - Obtenha sua chave
   - Configure esta chave no painel de controle da Vercel em Settings > Environment Variables

2. **NEXT_PUBLIC_SUPABASE_URL**: URL do seu projeto Supabase
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Chave anônima do Supabase

### Configuração no Vercel

Para configurar as variáveis de ambiente no Vercel:

1. Acesse o painel de controle do projeto no Vercel
2. Navegue até Settings > Environment Variables
3. Adicione cada variável com seu respectivo valor
4. Clique em "Save" e faça um novo deploy

### Desenvolvimento Local

Para desenvolvimento local, crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias:

```
GROQ_API_KEY=sua_chave_aqui
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

## Executando o Projeto

```bash
# Instalar dependências
pnpm install

# Executar em modo de desenvolvimento
pnpm dev

# Construir para produção
pnpm build

# Iniciar em modo de produção
pnpm start
``` 