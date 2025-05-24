import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

// Log para depuração
console.log("Verificando configuração do Groq API: ", 
  process.env.GROQ_API_KEY ? 
  `Chave encontrada (primeiros 4 caracteres: ${process.env.GROQ_API_KEY.substring(0, 4)}...)` : 
  "Chave não encontrada"
)

// Verificar se a chave da API está configurada
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY não está configurada")
}

// Inicializar o cliente Groq com a chave da API
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Mensagens inválidas" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]

    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json({ error: "Mensagem vazia" }, { status: 400 })
    }

    console.log("Processando mensagem do usuário:", lastMessage.content.substring(0, 50) + "...")

    // Mensagem do sistema para orientar o comportamento do assistente
    const systemMessage = {
          role: "system",
      content: `Você é um assistente especializado em fisioterapia dermatofuncional, chamado DermaFisio.
      
      REGRAS IMPORTANTES:
      1. SEMPRE responda em português do Brasil
      2. Seja conciso e profissional
      3. Use termos técnicos apropriados
      4. Baseie suas respostas em evidências científicas
      5. Foque em fisioterapia dermatofuncional
      6. Se não souber algo, admita e sugira consultar um profissional
      7. Mantenha um tom educativo e acolhedor
      
      ÁREAS DE CONHECIMENTO:
      - Anatomia e fisiologia da pele
      - Técnicas de avaliação dermatofuncional
      - Recursos terapêuticos manuais e eletrotermofototerápicos
      - Protocolos de tratamento
      - Cosmetologia aplicada
      - Pré e pós-operatório
      - Cicatrização e reparo tecidual`
    }

    // Todas as mensagens, incluindo a mensagem do sistema
    const allMessages = [
      systemMessage,
      ...messages
    ]

    console.log("Chamando API do Groq com modelo llama3-70b-8192")

    // Chamar a API do Groq com um modelo válido
    const chatCompletion = await groq.chat.completions.create({
      messages: allMessages,
      model: "llama3-70b-8192", // Modelo atualizado
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.95,
    })

    // Extrair resposta
    const responseText = chatCompletion.choices[0]?.message?.content || ""
    
    console.log("Resposta recebida, tamanho:", responseText.length)

    if (!responseText) {
      throw new Error("Resposta vazia do modelo")
    }

    return NextResponse.json({ message: responseText })
  } catch (error: any) {
    console.error("Erro completo na API do chat:", JSON.stringify(error, null, 2))
    
    // Mensagens de erro mais específicas
    let errorMessage = "Desculpe, tive um problema ao processar sua pergunta. Pode tentar novamente?"
    let statusCode = 500

    if (error.message?.includes("API key") || error.status === 401) {
      errorMessage = "Erro de configuração do serviço. Por favor, entre em contato com o suporte."
      statusCode = 401
    } else if (error.message?.includes("rate limit") || error.status === 429) {
      errorMessage = "Muitas perguntas em pouco tempo. Por favor, aguarde alguns segundos e tente novamente."
      statusCode = 429
    } else if (error.message?.includes("timeout") || error.status === 504) {
      errorMessage = "O serviço demorou muito para responder. Por favor, tente novamente."
      statusCode = 504
    } else if (error.message === "Resposta vazia do modelo") {
      errorMessage = "Não consegui gerar uma resposta adequada. Por favor, tente reformular sua pergunta."
      statusCode = 400
    }
    
    return NextResponse.json({ error: errorMessage }, { status: statusCode })
  }
}
