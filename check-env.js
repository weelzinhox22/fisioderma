console.log('Verificando variáveis de ambiente:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não definido');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
  '[Definido]' : 
  'Não definido'
); 