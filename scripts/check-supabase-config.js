/**
 * Script para verificar a configuração do Supabase
 * Execute este script antes de fazer deploy para garantir que as variáveis de ambiente estão configuradas
 */

console.log('\n=== VERIFICAÇÃO DE CONFIGURAÇÃO DO SUPABASE ===\n');

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Configurado' : '❌ Não configurado');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurado' : '❌ Não configurado');

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

// Instruções para configurar as variáveis de ambiente
if (!supabaseUrl || !supabaseKey) {
  console.log('\n=== COMO CONFIGURAR ===');
  console.log('1. Crie um arquivo .env.local na raiz do projeto');
  console.log('2. Adicione as seguintes variáveis:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui');
  console.log('3. Para ambiente de produção, configure estas variáveis na plataforma de hospedagem');
  console.log('\nOu use as contas especiais para acesso offline:');
  console.log('- Professor: profadrianadermato@dermato.com / professoraadriana123');
  console.log('- Admin: weelzinho@admin.com / weladmin12345');
}

console.log('\n=== FIM DA VERIFICAÇÃO ===\n');

// Retornar código de erro se as variáveis não estiverem configuradas
if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️  Você pode continuar sem as variáveis de ambiente, mas a autenticação online não funcionará.');
  console.log('   Apenas as contas especiais estarão disponíveis.');
} 