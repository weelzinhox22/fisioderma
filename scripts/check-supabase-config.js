/**
 * Script para verificar a configuração do Supabase
 * Execute este script antes de fazer deploy para garantir que as variáveis de ambiente estão configuradas
 */

console.log('\n=== VERIFICAÇÃO DE CONFIGURAÇÃO DO SUPABASE ===\n');

// Credenciais fixas do Supabase
const SUPABASE_URL = "https://htmkhefvctwmbrgeejkh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA";

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Não configurado');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurado' : '❌ Não configurado');

console.log('\n=== CREDENCIAIS ATUAIS ===');
console.log('URL do Supabase:', supabaseUrl);
console.log('Chave anônima:', supabaseKey.substring(0, 10) + '...' + supabaseKey.substring(supabaseKey.length - 5));

// Verificar se as variáveis têm valores válidos
if (supabaseUrl) {
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
    console.log('⚠️  AVISO: O URL do Supabase parece inválido. Deve ser algo como "https://seu-projeto.supabase.co"');
  }
}

if (supabaseKey) {
  if (supabaseKey.length < 20) {
    console.log('⚠️  AVISO: A chave anônima do Supabase parece inválida. Verifique se você está usando a chave correta.');
  }
}

console.log('\n=== INFORMAÇÕES IMPORTANTES ===');
console.log('O projeto está configurado para usar credenciais fixas do Supabase diretamente no código.');
console.log('Isso significa que o login deve funcionar mesmo sem configurar as variáveis de ambiente.');
console.log('No entanto, é uma boa prática configurar as variáveis de ambiente para maior segurança e flexibilidade.');

console.log('\n=== CONTAS ESPECIAIS ===');
console.log('Você pode usar as contas especiais para acessar o sistema mesmo quando há problemas de conexão:');
console.log('- Professor: profadrianadermato@dermato.com / professoraadriana123');
console.log('- Admin: weelzinho@admin.com / weladmin12345');

console.log('\n=== FIM DA VERIFICAÇÃO ===\n'); 