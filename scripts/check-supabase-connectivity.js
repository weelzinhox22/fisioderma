/**
 * Script para verificar a conectividade com o Supabase
 * Execute este script para diagnosticar problemas de conexão com o Supabase
 */

const https = require('https');

// Credenciais do Supabase
const SUPABASE_URL = "https://htmkhefvctwmbrgeejkh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bWtoZWZ2Y3R3bWJyZ2VlamtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTAzOTUsImV4cCI6MjA1NjI4NjM5NX0.4jJxHP980GW_Err3qBaHwa9eO4rqwA-LYo8c9kPBwnA";

console.log('\n=== VERIFICAÇÃO DE CONECTIVIDADE COM O SUPABASE ===\n');

// Função para fazer uma requisição HTTP
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Verificar conectividade com o Supabase
async function checkConnectivity() {
  console.log('Testando conectividade com o Supabase...');
  
  try {
    const start = Date.now();
    
    // Extrair o hostname do URL do Supabase
    const hostname = new URL(SUPABASE_URL).hostname;
    
    // Fazer uma requisição simples para o Supabase
    const response = await makeRequest(`https://${hostname}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    const elapsed = Date.now() - start;
    
    console.log(`Tempo de resposta: ${elapsed}ms`);
    console.log(`Código de status: ${response.statusCode}`);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('\n✅ Conectividade com o Supabase está OK!');
      console.log(`O servidor respondeu em ${elapsed}ms.`);
    } else {
      console.log('\n❌ Problema de conectividade com o Supabase!');
      console.log(`O servidor respondeu com o código ${response.statusCode}.`);
      console.log('Resposta:', response.data);
    }
  } catch (error) {
    console.log('\n❌ Erro ao conectar com o Supabase!');
    console.log('Erro:', error.message);
    
    // Verificar se é um erro de DNS
    if (error.code === 'ENOTFOUND') {
      console.log('\nParece ser um problema de DNS. Verifique sua conexão com a internet.');
    }
    
    // Verificar se é um erro de timeout
    if (error.code === 'ETIMEDOUT') {
      console.log('\nA conexão expirou. O servidor pode estar lento ou inacessível.');
    }
  }
}

// Executar a verificação
checkConnectivity().then(() => {
  console.log('\n=== FIM DA VERIFICAÇÃO ===\n');
}); 