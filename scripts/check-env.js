const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

// Conteúdo do arquivo .env.local
const envContent = `# Supabase Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://aqfqvhxmxwqjmxpawqhj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZnF2aHhteHdxam14cGF3cWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3OTU2ODAsImV4cCI6MjAyNjM3MTY4MH0.Ry_gMh4ZJxGpVHZQPvLgVXUTyZRDyQQGmGOKnYCYOtE
`;

// Verificar se o arquivo .env.local existe
if (!fs.existsSync(envPath)) {
  console.log('Arquivo .env.local não encontrado. Criando...');
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('Arquivo .env.local criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar arquivo .env.local:', error);
  }
} else {
  console.log('Arquivo .env.local já existe.');
  
  // Ler o conteúdo atual
  const currentContent = fs.readFileSync(envPath, 'utf8');
  
  // Verificar se as variáveis necessárias estão presentes
  const hasSupabaseUrl = currentContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
  const hasSupabaseKey = currentContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
  
  if (!hasSupabaseUrl || !hasSupabaseKey) {
    console.log('Variáveis do Supabase ausentes. Atualizando arquivo...');
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('Arquivo .env.local atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar arquivo .env.local:', error);
    }
  } else {
    console.log('Variáveis do Supabase encontradas no arquivo .env.local');
  }
} 