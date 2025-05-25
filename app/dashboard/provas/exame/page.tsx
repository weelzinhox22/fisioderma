"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Link from 'next/link'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Info,
  Home,
  BookOpen,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ExamePage() {
  // Estado para controlar a questão atual
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  // Estado para armazenar as respostas do usuário
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(40).fill(null))
  
  // Estado para o tempo restante (em segundos)
  const [timeRemaining, setTimeRemaining] = useState(90 * 60) // 90 minutos
  
  // Estado para exibir a explicação da resposta
  const [showExplanation, setShowExplanation] = useState(false)
  
  // Estado para armazenar se a prova foi finalizada
  const [examCompleted, setExamCompleted] = useState(false)
  
  // Estado para controlar se a prova foi iniciada
  const [examStarted, setExamStarted] = useState(false)
  
  // Referência para o elemento da questão para animações
  const questionRef = useRef<HTMLDivElement>(null)
  
  // Referência para o elemento de explicação para rolagem
  const explanationRef = useRef<HTMLDivElement>(null)

  // Iniciar a prova
  const startExam = () => {
    setExamStarted(true)
    setCurrentQuestion(0)
    setUserAnswers(Array(40).fill(null))
    setTimeRemaining(90 * 60)
    setExamCompleted(false)
    window.scrollTo(0, 0)
  }

  // Formatar o tempo restante no formato mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Calcular o progresso da prova (porcentagem de questões respondidas)
  const calculateProgress = () => {
    const answeredQuestions = userAnswers.filter(answer => answer !== null).length
    return (answeredQuestions / userAnswers.length) * 100
  }

  // Navegar para a próxima questão
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1 && userAnswers[currentQuestion] !== null) {
      setShowExplanation(false)
      setCurrentQuestion(currentQuestion + 1)
      
      // Rolar para o topo da página suavemente
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        })
      }, 100)
    }
  }

  // Navegar para a questão anterior
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setShowExplanation(false)
      setCurrentQuestion(currentQuestion - 1)
      
      // Rolar para o topo da página suavemente
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        })
      }, 100)
    }
  }

  // Selecionar uma resposta
  const selectAnswer = (value: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = value
    setUserAnswers(newAnswers)
    setShowExplanation(true)
    
    // Rolar para a explicação após selecionar a resposta
    setTimeout(() => {
      if (explanationRef.current) {
        explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  // Verificar se a resposta atual está correta
  const isCurrentAnswerCorrect = () => {
    const currentAnswer = userAnswers[currentQuestion]
    if (!questions[currentQuestion]) return false
    return currentAnswer === questions[currentQuestion].correctAnswer
  }

  // Finalizar a prova
  const finishExam = () => {
    setExamCompleted(true)
    window.scrollTo(0, 0)
  }

  // Calcular a pontuação final
  const calculateScore = () => {
    // Verificar se há questões disponíveis
    if (!questions || questions.length === 0) return 0
    
    const correctAnswers = userAnswers.filter((answer, index) => 
      // Verificar se a questão existe antes de acessar correctAnswer
      answer !== null && 
      index < questions.length && 
      questions[index] && 
      answer === questions[index].correctAnswer
    ).length
    
    return Math.round((correctAnswers / questions.length) * 100)
  }

  // Verificar se pode avançar para a próxima questão
  const canGoToNextQuestion = () => {
    return userAnswers[currentQuestion] !== null
  }

  // Efeito para o temporizador
  useEffect(() => {
    if (!examStarted || examCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          finishExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examStarted, examCompleted])

  // Efeito para animações
  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.98
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5, 
          ease: "power3.out" 
        }
      )
    }
  }, [currentQuestion])
  
  // Incluir aqui as 40 questões da prova com as alternativas e explicações
  const questions = [
    {
      question: "Um paciente de 45 anos apresenta flacidez facial moderada e deseja realizar um tratamento não invasivo. Considerando os mecanismos de ação da radiofrequência, qual é o efeito físico primário que causa a contração imediata das fibras de colágeno?",
      options: [
        { value: "a", label: "a", text: "Vibração mecânica das células adiposas, causando sua ruptura" },
        { value: "b", label: "b", text: "Aceleração das moléculas de água e aquecimento controlado dos tecidos" },
        { value: "c", label: "c", text: "Resfriamento controlado das camadas profundas da derme" },
        { value: "d", label: "d", text: "Estimulação elétrica direta dos fibroblastos sem aquecimento tecidual" }
      ],
      correctAnswer: "b",
      explanation: "A radiofrequência atua através da emissão de ondas de energia de alta frequência que, ao entrarem em contato com as camadas mais profundas da pele, promovem a aceleração das moléculas de água e um aquecimento controlado. Este aquecimento (geralmente entre 40°C e 43°C) causa a contração imediata das fibras de colágeno existentes, resultando em um efeito tensor imediato, além de estimular os fibroblastos a produzirem novo colágeno a longo prazo.",
      difficulty: "Intermediária"
    },
    {
      question: "Durante um procedimento de criolipólise, uma paciente apresentou eritema intenso, edema e formação de bolhas na região tratada 24 horas após a sessão. Qual é a conduta mais adequada neste caso?",
      options: [
        { value: "a", label: "a", text: "Ignorar os sintomas, pois são reações normais esperadas após o procedimento" },
        { value: "b", label: "b", text: "Aplicar calor local para acelerar a reperfusão e reduzir o eritema" },
        { value: "c", label: "c", text: "Suspender o tratamento e encaminhar a paciente para avaliação médica imediata" },
        { value: "d", label: "d", text: "Realizar uma nova sessão de criolipólise com temperatura mais baixa para equilibrar os tecidos" }
      ],
      correctAnswer: "c",
      explanation: "A formação de bolhas após criolipólise não é uma reação normal esperada e pode indicar uma queimadura por frio mais grave ou uma reação adversa significativa. O eritema e edema intensos, especialmente quando acompanhados de bolhas, sugerem uma complicação que requer avaliação médica imediata. O tratamento deve ser suspenso, e a paciente deve ser encaminhada para um médico que possa avaliar a gravidade da lesão e prescrever o tratamento adequado, que pode incluir medicamentos tópicos, curativos especializados ou outros cuidados.",
      difficulty: "Avançada"
    },
    {
      question: "Em um caso de cicatriz hipertrófica pós-queimadura de 2º grau profundo, qual técnica de fisioterapia dermatofuncional está mais indicada para auxiliar na reorganização das fibras de colágeno e diminuir a fibrose?",
      options: [
        { value: "a", label: "a", text: "Aplicação de correntes de alta frequência sem contato com a pele" },
        { value: "b", label: "b", text: "Resfriamento controlado com temperatura entre -7°C e -10°C" },
        { value: "c", label: "c", text: "Ultrassom terapêutico em modo contínuo ou pulsado, dependendo da fase cicatricial" },
        { value: "d", label: "d", text: "Lipocavitação com frequência de 27 kHz aplicada diretamente sobre a cicatriz" }
      ],
      correctAnswer: "c",
      explanation: "O ultrassom terapêutico é uma das técnicas mais eficazes para o tratamento de cicatrizes hipertróficas pós-queimadura, pois favorece a reorganização do colágeno e diminui a fibrose. Em modo contínuo, o ultrassom promove efeitos térmicos que aumentam o metabolismo local e a extensibilidade do colágeno, enquanto em modo pulsado, predominam os efeitos mecânicos que auxiliam na fragmentação de aderências. O modo a ser utilizado depende da fase cicatricial: pulsado para fases mais inflamatórias e contínuo para cicatrizes mais antigas e com maior fibrose.",
      difficulty: "Intermediária"
    },
    {
      question: "Uma paciente de 35 anos apresenta adiposidade localizada no abdômen e deseja realizar lipocavitação. Durante a anamnese, ela relata diagnóstico recente de dislipidemia grave. Qual deve ser a conduta do fisioterapeuta?",
      options: [
        { value: "a", label: "a", text: "Realizar o procedimento normalmente, já que a lipocavitação ajudará a reduzir os níveis lipídicos" },
        { value: "b", label: "b", text: "Contraindicar o procedimento devido ao risco de sobrecarga metabólica e hepática" },
        { value: "c", label: "c", text: "Realizar o procedimento com intensidade reduzida e monitorar a paciente constantemente" },
        { value: "d", label: "d", text: "Substituir a lipocavitação por radiofrequência, que não tem contraindicações para pacientes com dislipidemia" }
      ],
      correctAnswer: "b",
      explanation: "A dislipidemia grave é uma contraindicação para a lipocavitação, pois esta técnica promove a liberação de ácidos graxos na corrente sanguínea, o que pode sobrecarregar o fígado e agravar o quadro metabólico da paciente. Quando as células de gordura são rompidas pela cavitação ultrassônica, o conteúdo lipídico é liberado e metabolizado pelo organismo, exigindo um sistema hepático saudável para processá-lo adequadamente. Em pacientes com dislipidemia grave, este processo pode representar um risco significativo à saúde, podendo piorar o perfil lipídico e sobrecarregar ainda mais o metabolismo já comprometido.",
      difficulty: "Difícil"
    },
    {
      question: "Durante um tratamento com radiofrequência monopolar, qual deve ser a temperatura ideal a ser atingida para estimular a síntese de colágeno em casos de flacidez cutânea?",
      options: [
        { value: "a", label: "a", text: "Entre 37°C e 38°C, mantendo a temperatura basal do corpo" },
        { value: "b", label: "b", text: "Entre 40°C e 42°C, promovendo aquecimento controlado sem danos teciduais" },
        { value: "c", label: "c", text: "Entre 45°C e 47°C, garantindo o máximo de estímulo térmico" },
        { value: "d", label: "d", text: "Entre 20°C e 25°C, provocando um choque térmico que ativa os fibroblastos" }
      ],
      correctAnswer: "b",
      explanation: "A temperatura ideal para estimular a síntese de colágeno durante um tratamento com radiofrequência em casos de flacidez cutânea é entre 40°C e 42°C. Este aquecimento controlado é suficiente para promover a desnaturação parcial das fibras de colágeno existentes, causando sua contração imediata, e para estimular os fibroblastos a aumentarem a produção de novo colágeno. Temperaturas mais baixas (37-38°C) não são suficientes para este efeito, enquanto temperaturas mais altas (acima de 43°C) podem causar danos teciduais como queimaduras ou necrose. É fundamental utilizar um termômetro durante todo o procedimento para garantir que a temperatura se mantenha nesta faixa ideal.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente de 28 anos sofreu uma queimadura de 3º grau que resultou em uma cicatriz com contratura cicatricial, limitando severamente o movimento articular do cotovelo. Qual é o principal objetivo da intervenção fisioterapêutica neste caso?",
      options: [
        { value: "a", label: "a", text: "Melhorar apenas a aparência estética da cicatriz através de cosmecêuticos" },
        { value: "b", label: "b", text: "Promover o clareamento da hiperpigmentação pós-inflamatória" },
        { value: "c", label: "c", text: "Diminuir a sensibilidade dolorosa na área queimada através de eletroestimulação" },
        { value: "d", label: "d", text: "Prevenir ou reduzir contraturas e restaurar a mobilidade articular e funcionalidade" }
      ],
      correctAnswer: "d",
      explanation: "O principal objetivo da intervenção fisioterapêutica em casos de queimadura de 3º grau com contratura cicatricial é prevenir ou reduzir as contraturas e restaurar a mobilidade articular e a funcionalidade. As queimaduras de 3º grau destroem toda a epiderme e derme, resultando em cicatrizes que frequentemente levam à formação de contraturas devido ao excesso de tecido cicatricial e sua tendência à retração. Estas contraturas limitam o movimento articular e comprometem significativamente a função, como no caso descrito do cotovelo. A intervenção deve incluir técnicas como massagem cicatricial, mobilização articular, órteses de posicionamento, exercícios de alongamento e fortalecimento, além de recursos físicos como ultrassom e laserterapia.",
      difficulty: "Intermediária"
    },
    {
      question: "Durante um procedimento de criolipólise, por que é fundamental realizar a massagem manual na área tratada imediatamente após a remoção do aplicador?",
      options: [
        { value: "a", label: "a", text: "Para aquecer a pele e evitar o desconforto térmico do paciente" },
        { value: "b", label: "b", text: "Para promover a reperfusão e prevenir danos teciduais graves como necrose" },
        { value: "c", label: "c", text: "Para aumentar a eficácia do procedimento, garantindo mais células de gordura destruídas" },
        { value: "d", label: "d", text: "Para melhorar o contorno corporal através da modelagem manual dos tecidos" }
      ],
      correctAnswer: "b",
      explanation: "A massagem manual após a criolipólise é fundamental para promover a reperfusão, ou seja, o retorno da circulação sanguínea adequada à área tratada. Durante o procedimento, a área é resfriada a temperaturas muito baixas (geralmente entre -7°C e -10°C), o que reduz significativamente o fluxo sanguíneo local. A massagem ajuda a restaurar a circulação, prevenindo danos teciduais graves como isquemia prolongada e necrose da pele e tecidos não adiposos. Além disso, a reperfusão também ativa o processo inflamatório que eliminará as células de gordura danificadas, envolvendo o recrutamento de macrófagos e iniciando a apoptose das células adiposas. A falta de reperfusão adequada pode levar a complicações graves, incluindo dor intensa e cicatrizes permanentes.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente apresenta uma cicatriz quelóide após uma queimadura, com crescimento do tecido cicatricial além dos limites da lesão original. Qual é a característica principal que diferencia o quelóide de uma cicatriz hipertrófica?",
      options: [
        { value: "a", label: "a", text: "O quelóide apresenta menor vascularização e coloração mais clara que a cicatriz hipertrófica" },
        { value: "b", label: "b", text: "A cicatriz hipertrófica causa mais dor e prurido que o quelóide" },
        { value: "c", label: "c", text: "O quelóide ultrapassa os limites da lesão original, enquanto a hipertrófica fica restrita à área inicial" },
        { value: "d", label: "d", text: "A cicatriz hipertrófica aparece imediatamente após a lesão, enquanto o quelóide leva meses para se formar" }
      ],
      correctAnswer: "c",
      explanation: "A principal característica que diferencia o quelóide de uma cicatriz hipertrófica é que o quelóide ultrapassa os limites da lesão original, crescendo de forma desorganizada e exagerada para além da área inicialmente afetada. Ambos são tipos de cicatrizes elevadas causadas por produção excessiva de colágeno durante o processo de cicatrização, mas enquanto a cicatriz hipertrófica permanece confinada aos limites da ferida original, o quelóide invade o tecido saudável adjacente. Além disso, os quelóides tendem a persistir e continuar crescendo indefinidamente, enquanto as cicatrizes hipertróficas geralmente param de crescer após alguns meses e podem até mesmo regredir parcialmente com o tempo. Os quelóides são mais comuns em pessoas com pele mais escura e tendem a aparecer em áreas de alta tensão da pele.",
      difficulty: "Intermediária"
    },
    {
      question: "Em um tratamento com radiofrequência bipolar para rugas faciais, qual a profundidade aproximada de penetração das ondas no tecido e como isso influencia na escolha desta modalidade?",
      options: [
        { value: "a", label: "a", text: "Até 6mm de profundidade, sendo ideal para tratar a camada muscular facial" },
        { value: "b", label: "b", text: "Até 2mm de profundidade, sendo mais indicada para tratamentos superficiais como rugas e flacidez leve" },
        { value: "c", label: "c", text: "Até 10mm de profundidade, atingindo inclusive o tecido adiposo profundo da face" },
        { value: "d", label: "d", text: "Entre 3-5mm de profundidade, sem diferença significativa em relação à radiofrequência monopolar" }
      ],
      correctAnswer: "b",
      explanation: "A radiofrequência bipolar penetra até aproximadamente 2mm de profundidade no tecido, o que a torna mais indicada para tratamentos superficiais como rugas finas e flacidez leve na face. Esta modalidade possui dois eletrodos (um de saída e outro de retorno) localizados no mesmo cabeçote, o que limita a profundidade de penetração da corrente, que flui apenas entre estes dois pontos. Esta característica é vantajosa para o tratamento facial, onde a pele é mais fina e delicada, permitindo um aquecimento mais controlado e seguro das camadas superficiais da derme, onde se encontram as fibras de colágeno responsáveis pelas rugas finas. Em contraste, a radiofrequência monopolar atinge profundidades de até 6mm, sendo mais indicada para flacidez moderada a severa ou áreas que requerem maior penetração da energia.",
      difficulty: "Difícil"
    },
    {
      question: "No tratamento de uma queimadura recente de 2º grau superficial, qual fase da cicatrização está ocorrendo nos primeiros dias após a lesão, e quais são os principais eventos biológicos deste período?",
      options: [
        { value: "a", label: "a", text: "Fase de remodelação, com reorganização das fibras de colágeno e aumento da resistência tecidual" },
        { value: "b", label: "b", text: "Fase proliferativa, com formação de tecido de granulação e neoangiogênese" },
        { value: "c", label: "c", text: "Fase inflamatória, com vasodilatação, migração de células de defesa e presença de sinais flogísticos" },
        { value: "d", label: "d", text: "Fase de hemostasia tardia, com formação de coágulos secundários e ativação plaquetária" }
      ],
      correctAnswer: "c",
      explanation: "Nos primeiros dias após uma queimadura de 2º grau superficial, o tecido encontra-se na fase inflamatória do processo de cicatrização. Esta fase é caracterizada por vasodilatação local (que causa vermelhidão e calor), aumento da permeabilidade vascular (que leva ao edema), e migração de células de defesa para a área lesionada, principalmente neutrófilos e macrófagos. Os sinais flogísticos clássicos desta fase são: rubor (vermelhidão), calor, edema (inchaço), dor e potencial comprometimento funcional. A resposta inflamatória é essencial para a limpeza da ferida, removendo microrganismos, células mortas e debris, preparando o ambiente para a fase proliferativa subsequente. Esta fase geralmente dura de 2 a 5 dias em feridas não complicadas, mas pode prolongar-se em queimaduras mais graves ou infectadas.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente realizou três sessões de criolipólise na região abdominal, mas após 8 semanas notou um aumento do volume na área tratada, em vez da redução esperada. Qual complicação este paciente provavelmente está apresentando?",
      options: [
        { value: "a", label: "a", text: "Hiperplasia adipocitária compensatória, uma resposta normal que precede a redução de volume" },
        { value: "b", label: "b", text: "Edema linfático persistente, que deve ser tratado com drenagem linfática manual" },
        { value: "c", label: "c", text: "Hiperplasia paradoxal, um efeito adverso raro da criolipólise" },
        { value: "d", label: "d", text: "Resposta inflamatória aguda tardia, que requer intervenção medicamentosa imediata" }
      ],
      correctAnswer: "c",
      explanation: "O caso descrito apresenta sinais típicos de hiperplasia paradoxal, uma complicação rara da criolipólise caracterizada pelo aumento do volume de gordura na área tratada, em vez da redução esperada. Este efeito adverso geralmente se manifesta entre 2 e 3 meses após o procedimento e acredita-se que ocorra devido a uma resposta estimulatória dos adipócitos ao resfriamento, em vez da apoptose esperada. A hiperplasia paradoxal ocorre em aproximadamente 0,0051% dos casos, sendo mais comum em homens e na região abdominal. O tratamento pode incluir lipoaspiração ou outras técnicas de remoção de gordura, já que a condição geralmente não responde a sessões adicionais de criolipólise. É importante o fisioterapeuta reconhecer esta complicação e encaminhar o paciente para avaliação médica.",
      difficulty: "Difícil"
    },
    {
      question: "Durante a avaliação de um paciente com queimadura extensa, o fisioterapeuta utiliza a 'regra dos nove' para estimar a porcentagem da área corporal queimada. De acordo com este método, qual é a porcentagem atribuída a cada membro superior inteiro (braço + antebraço + mão)?",
      options: [
        { value: "a", label: "a", text: "4,5% para cada membro superior" },
        { value: "b", label: "b", text: "9% para cada membro superior" },
        { value: "c", label: "c", text: "18% para ambos os membros superiores juntos" },
        { value: "d", label: "d", text: "27% para ambos os membros superiores e o tórax anterior juntos" }
      ],
      correctAnswer: "b",
      explanation: "De acordo com a 'regra dos nove', utilizada para estimar a porcentagem da área corporal total (ACT) afetada por queimaduras, cada membro superior inteiro (incluindo braço, antebraço e mão) corresponde a 9% da ACT. Este método divide o corpo em múltiplos de 9%: cabeça e pescoço (9%), cada membro superior (9%), face anterior do tórax (9%), face posterior do tórax (9%), face anterior do abdome (9%), face posterior do abdome e região lombar (9%), cada membro inferior (18%, sendo 9% anterior e 9% posterior) e genitália (1%). Esta avaliação é fundamental para determinar a gravidade da queimadura e planejar o tratamento adequado, incluindo a reposição volêmica necessária e a abordagem fisioterapêutica.",
      difficulty: "Intermediária"
    },
    {
      question: "Uma paciente de 52 anos com flacidez facial moderada deseja realizar radiofrequência. Durante a anamnese, ela relata ter um marcapasso cardíaco implantado há 3 anos. Qual é a conduta mais adequada para este caso?",
      options: [
        { value: "a", label: "a", text: "Realizar o procedimento normalmente, pois a radiofrequência facial não interfere no funcionamento do marcapasso" },
        { value: "b", label: "b", text: "Utilizar apenas radiofrequência bipolar, que tem menor penetração e não afeta dispositivos implantados" },
        { value: "c", label: "c", text: "Contraindicar absolutamente o procedimento devido ao risco de interferência eletromagnética no marcapasso" },
        { value: "d", label: "d", text: "Solicitar autorização escrita do cardiologista e realizar o procedimento com potência reduzida" }
      ],
      correctAnswer: "c",
      explanation: "A presença de marcapasso cardíaco é uma contraindicação absoluta para o tratamento com radiofrequência, independentemente do tipo (monopolar, bipolar ou tripolar). Isso ocorre porque a radiofrequência emite ondas eletromagnéticas que podem interferir no funcionamento do marcapasso, potencialmente causando falhas na programação, alterações no ritmo cardíaco ou até mesmo desligamento temporário do dispositivo. Mesmo que o procedimento seja realizado na face, distante do tórax onde o marcapasso está implantado, as ondas eletromagnéticas podem se propagar pelo corpo e afetar o dispositivo. A saúde e segurança do paciente devem ser sempre a prioridade, e neste caso, é necessário contraindicar o procedimento e sugerir alternativas terapêuticas que não envolvam emissão de ondas eletromagnéticas.",
      difficulty: "Intermediária"
    },
    {
      question: "Na lipocavitação, qual a frequência ultrassônica ideal para o tratamento da gordura localizada mais profunda, e por que esta frequência específica é mais eficaz para este propósito?",
      options: [
        { value: "a", label: "a", text: "Frequências mais altas (3 MHz), pois têm maior poder de penetração nos tecidos profundos" },
        { value: "b", label: "b", text: "Frequências mais baixas (0.8 MHz), pois penetram mais profundamente nos tecidos" },
        { value: "c", label: "c", text: "Frequências intermediárias (1.5 MHz), pois equilibram penetração e absorção seletiva pelos adipócitos" },
        { value: "d", label: "d", text: "Frequências variáveis (3-5 MHz), que podem ser moduladas durante o tratamento conforme a resposta tecidual" }
      ],
      correctAnswer: "b",
      explanation: "Para o tratamento da gordura localizada mais profunda, as frequências mais baixas de ultrassom (como 0.8 MHz) são mais eficazes porque têm maior poder de penetração nos tecidos. Existe uma relação inversa entre a frequência do ultrassom e sua capacidade de penetração: quanto menor a frequência, maior a penetração. Frequências mais baixas produzem ondas sonoras com comprimentos de onda maiores, que sofrem menos atenuação ao atravessar os tecidos, conseguindo atingir camadas mais profundas onde pode estar localizada a gordura subcutânea mais densa. Por outro lado, frequências mais altas (como 3 MHz) têm menor penetração e são mais indicadas para tratamentos superficiais. É importante ressaltar que, na lipocavitação, utilizam-se frequências ainda mais baixas (geralmente entre 27 kHz e 3 MHz) do que no ultrassom terapêutico convencional, justamente para maximizar o efeito nas camadas de gordura mais profundas.",
      difficulty: "Difícil"
    },
    {
      question: "Um paciente com queimadura de 3º grau foi submetido a um enxerto cutâneo autólogo. Considerando os diferentes tipos de enxertos utilizados em queimados, qual a principal vantagem do enxerto autólogo em comparação com os alogenóicos e xenogênicos?",
      options: [
        { value: "a", label: "a", text: "Menor tempo de recuperação pós-operatória e cicatrização mais rápida" },
        { value: "b", label: "b", text: "Maior disponibilidade de tecido para áreas extensas de queimadura" },
        { value: "c", label: "c", text: "Menor risco de rejeição imunológica por ser proveniente do próprio paciente" },
        { value: "d", label: "d", text: "Melhor resultado estético final, com coloração e textura idênticas à pele original" }
      ],
      correctAnswer: "c",
      explanation: "A principal vantagem do enxerto autólogo (também chamado de autoenxerto) em comparação com os enxertos alogenóicos (de outro ser humano) e xenogênicos (de animais) é o menor risco de rejeição imunológica, uma vez que o tecido é retirado do próprio paciente. O sistema imunológico não reconhece o tecido como estranho, eliminando a necessidade de imunossupressores e reduzindo significativamente as complicações relacionadas à rejeição. Os enxertos alogenóicos e xenogênicos, embora mais prontamente disponíveis para grandes áreas, frequentemente são utilizados como cobertura temporária até que seja possível realizar um autoenxerto, justamente devido ao alto risco de rejeição. Os enxertos autólogos também tendem a ter melhor integração aos tecidos receptores, com maior chance de sucesso a longo prazo, embora o resultado estético nem sempre seja ideal, especialmente em termos de pigmentação e textura quando comparado com a pele original não queimada.",
      difficulty: "Intermediária"
    },
    {
      question: "Durante um procedimento de radiofrequência facial, a profissional nota que a temperatura da pele da paciente está atingindo 45°C. Qual deve ser a conduta imediata nesta situação?",
      options: [
        { value: "a", label: "a", text: "Manter a temperatura por alguns minutos para maximizar o estímulo ao colágeno" },
        { value: "b", label: "b", text: "Aumentar a potência do aparelho para atingir o efeito terapêutico mais rapidamente" },
        { value: "c", label: "c", text: "Diminuir imediatamente a potência ou interromper a aplicação naquela área para evitar queimaduras" },
        { value: "d", label: "d", text: "Aplicar gel criogênico para balancear a temperatura e continuar o procedimento normalmente" }
      ],
      correctAnswer: "c",
      explanation: "Quando a temperatura da pele atinge 45°C durante um procedimento de radiofrequência facial, a conduta imediata deve ser diminuir a potência do aparelho ou interromper completamente a aplicação naquela área. Temperaturas acima de 43°C representam um risco significativo de lesões térmicas, incluindo queimaduras, necrose tecidual e danos permanentes à pele. A faixa de temperatura ideal para a radiofrequência facial é geralmente entre 40°C e 42°C, que é suficiente para promover a contração das fibras de colágeno existentes e estimular a neocolagênese sem causar danos teciduais. O monitoramento constante da temperatura durante todo o procedimento, preferencialmente com um termômetro infravermelho ou digital, é essencial para garantir a segurança e eficácia do tratamento. A segurança do paciente deve sempre ser priorizada sobre quaisquer potenciais benefícios estéticos.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente de 38 anos sofreu uma queimadura química por ácido sulfúrico no braço direito há 3 semanas. A lesão já passou pela fase aguda e apresenta uma cicatriz em formação com tendência a hipertrofia. Qual seria a sequência mais adequada de técnicas fisioterapêuticas para minimizar a formação de cicatriz hipertrófica neste caso?",
      options: [
        { value: "a", label: "a", text: "Drenagem linfática, ultrassom terapêutico pulsado, terapia manual cicatricial e compressão" },
        { value: "b", label: "b", text: "Compressão contínua, taping linfático, cinesioterapia precoce e eletroestimulação" },
        { value: "c", label: "c", text: "Laserterapia de baixa potência, crioterapia local, alongamento passivo e massagem transversa profunda" },
        { value: "d", label: "d", text: "Termoterapia superficial, ultrassom contínuo, mobilização neural e recursos cosméticos hidratantes" }
      ],
      correctAnswer: "a",
      explanation: "A sequência mais adequada para o caso descrito seria iniciar com drenagem linfática para reduzir o edema residual, seguida de ultrassom terapêutico pulsado (que tem efeito anti-inflamatório e estimula adequadamente a reorganização do colágeno sem aumentar excessivamente sua produção), terapia manual cicatricial (que auxilia no realinhamento das fibras de colágeno e na redução de aderências) e, por fim, compressão (que aplica pressão contínua sobre a cicatriz, organizando as fibras de colágeno e reduzindo a hiperplasia tecidual). Esta abordagem progressiva respeita o momento cicatricial do paciente (3 semanas pós-queimadura) e combina técnicas complementares que agem por mecanismos diferentes para controlar a formação excessiva de colágeno, característico das cicatrizes hipertróficas. A laserterapia também seria uma opção válida em fases mais avançadas do tratamento, mas no momento descrito, a sequência apresentada seria mais adequada para o controle precoce da hipertrofia cicatricial.",
      difficulty: "Difícil"
    },
    {
      question: "Durante o procedimento de criolipólise, qual é a temperatura ideal para induzir a apoptose dos adipócitos sem causar danos significativos aos tecidos adjacentes?",
      options: [
        { value: "a", label: "a", text: "Entre -1°C e -3°C, mantendo um resfriamento leve por período prolongado" },
        { value: "b", label: "b", text: "Entre -7°C e -10°C, atingindo o ponto ideal para cristalização da gordura" },
        { value: "c", label: "c", text: "Entre -15°C e -20°C, maximizando a destruição adipocitária" },
        { value: "d", label: "d", text: "Entre 0°C e 4°C, similar às técnicas de criopreservação celular" }
      ],
      correctAnswer: "b",
      explanation: "A temperatura ideal para o procedimento de criolipólise está entre -7°C e -10°C. Esta faixa de temperatura é suficiente para induzir a cristalização da gordura e promover a apoptose (morte celular programada) dos adipócitos, sem causar danos significativos aos tecidos adjacentes como pele, vasos sanguíneos, nervos e músculos, que são mais resistentes ao frio do que as células de gordura. Temperaturas mais altas (entre -1°C e -3°C) seriam insuficientes para desencadear a morte dos adipócitos, enquanto temperaturas muito mais baixas (como -15°C a -20°C) poderiam causar congelamento excessivo, levando a necrose tecidual, queimaduras por frio e danos permanentes às estruturas não-adiposas. A seletividade do método baseia-se justamente neste equilíbrio térmico que afeta preferencialmente as células de gordura, preservando os outros tecidos.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente com cicatrizes pós-operatórias está sendo tratado com ultrassom terapêutico. Considerando o mecanismo de ação do ultrassom no tratamento de cicatrizes, qual das seguintes afirmações é correta?",
      options: [
        { value: "a", label: "a", text: "O ultrassom pulsado é mais indicado para cicatrizes antigas e fibróticas devido ao seu efeito térmico intenso" },
        { value: "b", label: "b", text: "O ultrassom contínuo deve ser evitado em todas as fases do processo cicatricial por aumentar o risco de queimaduras" },
        { value: "c", label: "c", text: "O ultrassom terapêutico não tem efeito significativo sobre a organização e qualidade das fibras de colágeno" },
        { value: "d", label: "d", text: "O ultrassom contínuo promove aumento da extensibilidade do colágeno em cicatrizes maduras através de efeitos térmicos" }
      ],
      correctAnswer: "d",
      explanation: "O ultrassom terapêutico no modo contínuo promove aumento da extensibilidade do colágeno em cicatrizes maduras através de seus efeitos térmicos. Quando aplicado no modo contínuo, o ultrassom gera um aquecimento controlado no tecido, o que aumenta o metabolismo local, melhora a circulação sanguínea e, mais importante para cicatrizes, aumenta a extensibilidade das fibras de colágeno, tornando-as mais maleáveis e menos rígidas. Este efeito é particularmente benéfico para cicatrizes maduras e fibróticas, onde a reorganização do colágeno já está estabelecida, mas pode ser melhorada. Em contraste, o ultrassom pulsado produz predominantemente efeitos mecânicos (não térmicos) e é mais indicado para fases iniciais do processo cicatricial ou situações onde o aquecimento tecidual deve ser evitado. Ambos os modos têm efeitos significativos sobre a organização e qualidade das fibras de colágeno, contribuindo para uma melhor aparência e funcionalidade da cicatriz.",
      difficulty: "Difícil"
    },
    {
      question: "Em um caso de lipocavitação para redução de gordura localizada, qual dos seguintes cuidados pré-procedimento é essencial para garantir a eficácia e segurança do tratamento?",
      options: [
        { value: "a", label: "a", text: "Manter o paciente em jejum absoluto nas 8 horas anteriores ao procedimento" },
        { value: "b", label: "b", text: "Aplicar crioterapia local por 10 minutos para preparar o tecido adiposo" },
        { value: "c", label: "c", text: "Garantir a adequada hidratação do paciente antes e após o procedimento" },
        { value: "d", label: "d", text: "Administrar anti-inflamatórios profiláticos para reduzir a resposta inflamatória" }
      ],
      correctAnswer: "c",
      explanation: "Garantir a adequada hidratação do paciente antes e após o procedimento de lipocavitação é essencial para sua eficácia e segurança. A hidratação adequada facilita o processo de eliminação dos triglicerídeos liberados das células adiposas rompidas pela cavitação ultrassônica. Quando as células de gordura são afetadas pelo ultrassom, seu conteúdo é liberado para o espaço intersticial e precisa ser transportado pelo sistema linfático até o fígado, onde será metabolizado. Um paciente bem hidratado terá um fluxo sanguíneo e linfático mais eficiente, facilitando este processo de eliminação e reduzindo o risco de sobrecarga hepática. Além disso, a boa hidratação contribui para a condução adequada das ondas ultrassônicas através dos tecidos. Recomenda-se que o paciente beba pelo menos 2 litros de água por dia, com ênfase especial no dia anterior, no dia do procedimento e nos dias subsequentes.",
      difficulty: "Intermediária"
    },
    {
      question: "Uma paciente de 42 anos apresenta queimadura de 2º grau profundo na face anterior da coxa direita, com 6 semanas de evolução. A cicatriz está hipertrófica, com coloração avermelhada, pruriginosa e dolorosa ao toque. Qual das seguintes técnicas de fisioterapia dermatofuncional teria o efeito mais direcionado para reduzir a hipervascularização e a inflamação persistente nesta cicatriz?",
      options: [
        { value: "a", label: "a", text: "Termoterapia com compressas quentes para aumentar a elasticidade do colágeno" },
        { value: "b", label: "b", text: "Laserterapia de baixa potência com comprimentos de onda específicos para redução do eritema" },
        { value: "c", label: "c", text: "Eletroestimulação de alta frequência para dessensibilização das terminações nervosas" },
        { value: "d", label: "d", text: "Crioterapia alternada com alongamento passivo da cicatriz" }
      ],
      correctAnswer: "b",
      explanation: "A laserterapia de baixa potência com comprimentos de onda específicos é a técnica mais direcionada para reduzir a hipervascularização e a inflamação persistente em uma cicatriz hipertrófica avermelhada, pruriginosa e dolorosa. Os lasers de baixa potência, especialmente aqueles com comprimentos de onda entre 630-940 nm, têm efeitos fotobiomoduladores que atuam diretamente na redução da inflamação, modulação da produção de colágeno e remodelação tecidual. Especificamente, o laser pode reduzir a liberação de mediadores inflamatórios, diminuir a proliferação de fibroblastos e normalizar a microcirculação, contribuindo para a redução do eritema (vermelhidão) característico de cicatrizes hipertróficas. Além disso, possui efeito analgésico e anti-pruriginoso, aliviando os sintomas desconfortáveis relatados pela paciente. A laserterapia é uma opção não invasiva, indolor e sem efeitos colaterais significativos, sendo ideal para o tratamento de cicatrizes em fase de remodelação com sinais de hipertrofia e inflamação persistente.",
      difficulty: "Difícil"
    },
    {
      question: "Durante um procedimento de radiofrequência para tratamento de flacidez abdominal, qual a orientação correta sobre a aplicação do gel ou glicerina na área a ser tratada?",
      options: [
        { value: "a", label: "a", text: "Deve-se aplicar uma camada espessa de gel para isolar termicamente a pele e prevenir queimaduras" },
        { value: "b", label: "b", text: "O gel não é necessário na radiofrequência, sendo utilizado apenas em procedimentos de ultrassom" },
        { value: "c", label: "c", text: "Deve-se aplicar uma camada fina e uniforme para favorecer a condução das ondas eletromagnéticas" },
        { value: "d", label: "d", text: "O gel deve ser aplicado apenas nas áreas com maior concentração de gordura para potencializar o efeito lipolítico" }
      ],
      correctAnswer: "c",
      explanation: "A orientação correta é aplicar uma camada fina e uniforme de gel ou glicerina na área a ser tratada com radiofrequência. O gel atua como um meio condutor que facilita a transmissão das ondas eletromagnéticas da manopla para a pele, permitindo uma distribuição homogênea da energia e minimizando o atrito entre o eletrodo e a superfície cutânea. Uma camada muito espessa de gel poderia interferir na condução adequada da energia ou criar uma barreira que dificultaria o aquecimento controlado necessário para o efeito terapêutico. Por outro lado, a ausência de gel resultaria em desconforto, possível queimadura e ineficácia do tratamento. É importante que toda a área a ser tratada esteja coberta uniformemente com o gel, e não apenas regiões específicas, para garantir a segurança e eficácia do procedimento. A pele também deve estar limpa e desengordurada antes da aplicação do gel para maximizar a condutividade.",
      difficulty: "Intermediária"
    },
    {
      question: "Na avaliação de um paciente com sequela de queimadura, o fisioterapeuta identifica uma cicatriz hipotrófica. Quais são as características principais deste tipo de cicatriz?",
      options: [
        { value: "a", label: "a", text: "Elevação acima do nível da pele com coloração avermelhada e limitada ao local da lesão original" },
        { value: "b", label: "b", text: "Depressão ou afundamento da pele devido à falta de tecido, com superfície lisa ou irregular" },
        { value: "c", label: "c", text: "Crescimento exagerado de tecido que ultrapassa os limites da lesão original, com aspecto nodular" },
        { value: "d", label: "d", text: "Retração tecidual que limita o movimento articular, mas sem alteração significativa na altura da cicatriz" }
      ],
      correctAnswer: "b",
      explanation: "A cicatriz hipotrófica caracteriza-se por uma depressão ou afundamento da pele devido à falta de tecido, podendo apresentar superfície lisa ou irregular. Este tipo de cicatriz ocorre quando há perda substancial de tecido durante a lesão ou quando a produção de colágeno durante o processo de cicatrização é insuficiente para preencher completamente o defeito tecidual. Em casos de queimaduras, as cicatrizes hipotróficas podem resultar de lesões profundas que destruíram elementos da derme responsáveis pela regeneração adequada, ou quando houve perda significativa de tecido subcutâneo. Diferentemente das cicatrizes hipertróficas (elevadas e avermelhadas, mas limitadas à área da lesão) ou queloides (que ultrapassam os limites da lesão), as cicatrizes hipotróficas são deprimidas e geralmente têm coloração mais pálida que a pele circundante. A contratura cicatricial, por sua vez, refere-se à retração do tecido cicatricial que limita o movimento, podendo ocorrer em qualquer tipo de cicatriz, inclusive nas hipotróficas.",
      difficulty: "Intermediária"
    },
    {
      question: "Em um tratamento de radiofrequência para flacidez facial, qual frequência é mais indicada para estimular a produção de colágeno nas camadas mais superficiais da pele, visando melhorar rugas finas e flacidez leve?",
      options: [
        { value: "a", label: "a", text: "0.8 MHz, que penetra profundamente e estimula todas as camadas da pele" },
        { value: "b", label: "b", text: "1.2 MHz, ideal para atingir a camada intermediária da derme" },
        { value: "c", label: "c", text: "2.4 MHz, mais superficial e adequada para tratar flacidez e rugas finas" },
        { value: "d", label: "d", text: "5.0 MHz, que atua exclusivamente na epiderme sem afetar camadas mais profundas" }
      ],
      correctAnswer: "c",
      explanation: "A frequência de 2.4 MHz é a mais indicada para estimular a produção de colágeno nas camadas mais superficiais da pele, sendo adequada para tratar flacidez leve e rugas finas na face. Existe uma relação inversa entre a frequência da radiofrequência e sua profundidade de penetração: quanto maior a frequência, menor a profundidade. Por isso, a frequência de 2.4 MHz tem ação mais superficial, ideal para o tratamento facial onde a pele é naturalmente mais fina e delicada, e onde as rugas finas estão localizadas principalmente nas camadas superficiais da derme. Esta frequência promove um aquecimento controlado que estimula os fibroblastos a produzirem colágeno e elastina sem afetar significativamente os tecidos mais profundos. Em contraste, frequências mais baixas como 0.8 MHz penetram mais profundamente, sendo mais indicadas para tratamentos corporais ou casos de flacidez mais severa, enquanto frequências intermediárias como 1.2 MHz são adequadas para camadas intermediárias da derme.",
      difficulty: "Difícil"
    },
    {
      question: "Um paciente com queimadura de 3º grau em fase de remodelação cicatricial está desenvolvendo uma contratura cicatricial importante no pescoço, limitando a extensão cervical. Qual recurso fisioterapêutico deve ser prioritariamente incluído no tratamento para prevenir o agravamento desta contratura?",
      options: [
        { value: "a", label: "a", text: "Eletroestimulação de alta frequência para reduzir a sensibilidade e dor local" },
        { value: "b", label: "b", text: "Microcorrentes para estimular a regeneração celular local" },
        { value: "c", label: "c", text: "Técnicas de compressão com malhas ou órteses personalizadas para o pescoço" },
        { value: "d", label: "d", text: "Drenagem linfática manual para reduzir o edema residual na área" }
      ],
      correctAnswer: "c",
      explanation: "Em um caso de contratura cicatricial após queimadura de 3º grau no pescoço, o recurso fisioterapêutico prioritário deve ser a aplicação de técnicas de compressão, como malhas compressivas ou órteses personalizadas. A compressão é fundamental pois exerce pressão contínua sobre a cicatriz, contribuindo para a reorganização das fibras de colágeno de forma mais funcional e reduzindo a tendência à hipertrofia e retração cicatricial. Especificamente para o pescoço, a compressão pode ser associada ao posicionamento em extensão, utilizando órteses especialmente desenhadas para manter o tecido cicatricial alongado, contrapondo-se à tendência natural de retração. A compressão deve ser mantida por longos períodos (geralmente 23 horas por dia) durante meses, e sua eficácia é maior quando iniciada precocemente. Embora outros recursos como eletroestimulação, microcorrentes e drenagem linfática possam ser úteis como adjuvantes, a compressão apresenta as melhores evidências na prevenção e tratamento de contraturas cicatriciais em queimaduras.",
      difficulty: "Intermediária"
    },
    {
      question: "Durante um procedimento de criolipólise, após quanto tempo de aplicação do resfriamento controlado o paciente pode começar a apresentar dormência na área tratada, e qual a conduta adequada frente a este sintoma?",
      options: [
        { value: "a", label: "a", text: "5 a 10 minutos; interromper imediatamente o procedimento pois indica lesão nervosa grave" },
        { value: "b", label: "b", text: "3 a 5 minutos; reduzir a temperatura do aparelho para evitar lesão permanente" },
        { value: "c", label: "c", text: "5 a 10 minutos; manter o procedimento, pois é uma resposta esperada e geralmente temporária" },
        { value: "d", label: "d", text: "20 a 30 minutos; suspender o tratamento e aplicar compressas mornas para restaurar a sensibilidade" }
      ],
      correctAnswer: "c",
      explanation: "Durante o procedimento de criolipólise, é normal que o paciente comece a apresentar dormência na área tratada após aproximadamente 5 a 10 minutos do início da aplicação do resfriamento controlado. Esta dormência é uma resposta fisiológica esperada e geralmente temporária, resultante do efeito anestésico local causado pelo frio intenso. À medida que a temperatura da pele diminui, as terminações nervosas sensíveis ao frio são temporariamente dessensibilizadas, o que ajuda inclusive a tornar o procedimento mais confortável para o paciente. A conduta adequada é manter o procedimento normalmente, monitorando o paciente e garantindo que a sensação de dormência permaneça dentro do esperado, sem sinais de comprometimento vascular ou lesão tecidual. A sensibilidade normalmente retorna completamente dentro de alguns minutos a horas após o término da sessão. Em raros casos, pode haver redução da sensibilidade por períodos mais prolongados, mas a perda permanente é extremamente incomum.",
      difficulty: "Intermediária"
    },
    {
      question: "No tratamento de cicatrizes queloides e hipertróficas pós-queimadura, qual o principal mecanismo de ação da massagem cicatricial que contribui para a melhora da qualidade e funcionalidade da cicatriz?",
      options: [
        { value: "a", label: "a", text: "Estimulação da circulação superficial, aumentando a oxigenação local sem efeito direto na estrutura cicatricial" },
        { value: "b", label: "b", text: "Efeito antiinflamatório profundo pela liberação de prostaglandinas e citocinas antiinflamatórias" },
        { value: "c", label: "c", text: "Quebra de aderências e reorganização das fibras de colágeno, tornando a cicatriz mais maleável e funcional" },
        { value: "d", label: "d", text: "Aumento da temperatura local, promovendo vasodilatação e aceleração do processo de maturação cicatricial" }
      ],
      correctAnswer: "c",
      explanation: "O principal mecanismo de ação da massagem cicatricial no tratamento de cicatrizes queloides e hipertróficas pós-queimadura é a quebra de aderências e reorganização das fibras de colágeno, o que torna a cicatriz mais maleável e funcional. Durante a massagem, a pressão e os movimentos aplicados diretamente sobre a cicatriz promovem o realinhamento das fibras de colágeno, que tendem a ser depositadas de forma desorganizada em cicatrizes hipertróficas e queloides. Esta reorganização melhora a arquitetura do tecido cicatricial, reduzindo sua espessura e rigidez. Além disso, a massagem atua nas aderências entre a cicatriz e os tecidos adjacentes (como fáscias, músculos ou tendões), liberando-as e melhorando a mobilidade tecidual. Embora a massagem também possa melhorar a circulação local, ter algum efeito anti-inflamatório e aumentar levemente a temperatura tecidual, estes são efeitos secundários e não representam o principal mecanismo terapêutico para a melhora qualitativa da cicatriz.",
      difficulty: "Difícil"
    },
    {
      question: "Ao realizar um tratamento com radiofrequência tripolar para celulite grau II na região glútea, qual movimento da manopla é mais indicado e por quê?",
      options: [
        { value: "a", label: "a", text: "Movimentos lineares rápidos, para evitar superaquecimento pontual e estimular maior área" },
        { value: "b", label: "b", text: "Movimentos circulares lentos e constantes, favorecendo o aquecimento gradual e homogêneo do tecido" },
        { value: "c", label: "c", text: "Aplicação estática pontual sobre as depressões da celulite, concentrando o efeito térmico nas áreas mais afetadas" },
        { value: "d", label: "d", text: "Movimentos em ziguezague rápidos, que combinam o efeito do ultrassom com a radiofrequência para potencializar os resultados" }
      ],
      correctAnswer: "b",
      explanation: "Para o tratamento de celulite grau II na região glútea com radiofrequência tripolar, os movimentos circulares lentos e constantes são os mais indicados. Este tipo de movimento favorece o aquecimento gradual e homogêneo do tecido, permitindo que a temperatura aumente de forma controlada até atingir o nível terapêutico ideal (geralmente entre 40°C e 42°C). A radiofrequência tripolar utiliza três eletrodos no mesmo cabeçote, o que permite tratar uma área maior por vez, e os movimentos circulares garantem que a energia seja distribuída uniformemente, evitando pontos de superaquecimento que poderiam causar queimaduras. Além disso, a velocidade lenta é crucial para dar tempo suficiente ao tecido para aquecer adequadamente, especialmente em áreas como os glúteos, onde o tecido adiposo é mais espesso. Este padrão de movimento também facilita o monitoramento da temperatura e da sensação do paciente durante o procedimento, permitindo ajustes na intensidade conforme necessário para garantir eficácia e conforto.",
      difficulty: "Intermediária"
    },
    {
      question: "Em uma paciente com flacidez abdominal moderada pós-parto (6 meses), qual seria a abordagem mais completa e eficaz utilizando a radiofrequência?",
      options: [
        { value: "a", label: "a", text: "Aplicação única de radiofrequência monopolar com alta intensidade, atingindo o máximo de temperatura suportada" },
        { value: "b", label: "b", text: "Protocolo combinando radiofrequência monopolar para tecidos mais profundos e bipolar para efeito mais superficial" },
        { value: "c", label: "c", text: "Uso exclusivo de radiofrequência tripolar em baixa intensidade para evitar desconforto na região abdominal" },
        { value: "d", label: "d", text: "Substituição da radiofrequência por procedimentos de resfriamento, mais indicados para flacidez pós-parto" }
      ],
      correctAnswer: "b",
      explanation: "A abordagem mais completa e eficaz para tratar flacidez abdominal moderada pós-parto (6 meses) seria um protocolo que combina radiofrequência monopolar para atingir os tecidos mais profundos e bipolar para efeito mais superficial. A radiofrequência monopolar, com sua capacidade de penetração de até 6mm, é ideal para atuar nas camadas mais profundas da derme e no tecido subcutâneo, onde ocorreu o estiramento das fibras colágenas durante a gestação. Complementarmente, a radiofrequência bipolar, com penetração de até 2mm, é mais apropriada para tratar a flacidez mais superficial da pele, melhorando seu aspecto e tonicidade. Esta combinação proporciona um tratamento mais completo, atuando em diferentes profundidades teciduais e otimizando os resultados. O protocolo deve incluir várias sessões (geralmente entre 6 e 10), com intervalos de 7 a 15 dias, e deve ser ajustado conforme a resposta tecidual da paciente, com intensidades progressivas e monitoramento constante da temperatura.",
      difficulty: "Difícil"
    },
    {
      question: "Um paciente apresenta uma queimadura de 2º grau superficial recente no antebraço. Na fase inicial do tratamento, qual intervenção fisioterapêutica seria mais adequada?",
      options: [
        { value: "a", label: "a", text: "Massagem cicatricial profunda para prevenir aderências" },
        { value: "b", label: "b", text: "Mobilização precoce controlada e posicionamento para prevenir contraturas" },
        { value: "c", label: "c", text: "Aplicação de ultrassom contínuo para estimular a cicatrização" },
        { value: "d", label: "d", text: "Exercícios resistidos para manter a força muscular do membro" }
      ],
      correctAnswer: "b",
      explanation: "Na fase inicial do tratamento de uma queimadura de 2º grau superficial recente no antebraço, a intervenção fisioterapêutica mais adequada é a mobilização precoce controlada e o posicionamento adequado para prevenir contraturas. Nesta fase, ainda há processo inflamatório ativo e a pele está em processo de reepitelização, tornando contraindicadas intervenções mais agressivas como massagens profundas ou ultrassom contínuo, que poderiam prejudicar a cicatrização ou causar mais danos. A mobilização precoce, realizada de forma suave e controlada, mantém a amplitude de movimento articular, previne a formação de aderências entre os planos teciduais e reduz o risco de contraturas. O posicionamento adequado, geralmente mantendo o membro em posição funcional e ligeiramente elevado, ajuda a controlar o edema e previne posturas viciosas que poderiam levar a retrações cicatriciais. Esta abordagem conservadora inicial estabelece as bases para um processo de reabilitação mais eficaz nas fases subsequentes do tratamento.",
      difficulty: "Intermediária"
    },
    {
      question: "Após a realização de criolipólise na região abdominal, uma paciente apresenta equimose extensa e edema significativo na área tratada. Qual técnica fisioterapêutica seria mais indicada para acelerar a resolução destes efeitos colaterais?",
      options: [
        { value: "a", label: "a", text: "Laserterapia de alta potência para estimular a quebra da hemoglobina extravasada" },
        { value: "b", label: "b", text: "Drenagem linfática manual para reduzir o edema e auxiliar na reabsorção do sangue extravasado" },
        { value: "c", label: "c", text: "Ultrassom terapêutico de alta intensidade para dispersar o edema rapidamente" },
        { value: "d", label: "d", text: "Compressas quentes para aumentar o fluxo sanguíneo local e acelerar a reabsorção" }
      ],
      correctAnswer: "b",
      explanation: "A drenagem linfática manual (DLM) é a técnica fisioterapêutica mais indicada para acelerar a resolução de equimose extensa e edema significativo após criolipólise abdominal. A DLM utiliza manobras suaves, rítmicas e direcionadas que estimulam a contração dos vasos linfáticos, aumentando o transporte de líquido intersticial e macromoléculas, incluindo proteínas e células extravasadas para o espaço intersticial. No caso específico da equimose (hematoma), a DLM auxilia na reabsorção do sangue extravasado para os tecidos, enquanto no edema, facilita a drenagem do excesso de líquido acumulado. Estas manobras são particularmente benéficas pois não causam danos adicionais aos tecidos já traumatizados pelo procedimento de criolipólise. O ultrassom terapêutico seria contraindicado nesta fase inicial devido ao risco de aumentar o sangramento, enquanto compressas quentes poderiam piorar o edema. A laserterapia poderia ser considerada em fases posteriores, mas não como primeira abordagem para resolução destes efeitos colaterais imediatos.",
      difficulty: "Intermediária"
    },
    {
      question: "Na fase proliferativa da cicatrização de uma queimadura, qual dos seguintes eventos biológicos ocorre e é fundamental para o processo de reparo tecidual?",
      options: [
        { value: "a", label: "a", text: "Hemostasia com formação de tampão plaquetário e liberação de fatores de crescimento" },
        { value: "b", label: "b", text: "Reorganização final do colágeno e aumento da resistência à tração da cicatriz" },
        { value: "c", label: "c", text: "Neoangiogênese, formação de tecido de granulação e reepitelização" },
        { value: "d", label: "d", text: "Contração da ferida com redução permanente da área afetada" }
      ],
      correctAnswer: "c",
      explanation: "Na fase proliferativa da cicatrização de uma queimadura, ocorre a neoangiogênese (formação de novos vasos sanguíneos), a formação de tecido de granulação e a reepitelização, eventos fundamentais para o processo de reparo tecidual. Esta fase geralmente inicia-se alguns dias após a lesão e pode durar várias semanas. A neoangiogênese garante o suprimento adequado de oxigênio e nutrientes para as células envolvidas no reparo. O tecido de granulação, composto por novos capilares, fibroblastos e matriz extracelular provisória, preenche o defeito tecidual e serve como base para a reepitelização. A reepitelização envolve a migração e proliferação de queratinócitos para recobrir a superfície da ferida. A hemostasia e a liberação de fatores de crescimento ocorrem na fase inicial (inflamatória), enquanto a reorganização final do colágeno caracteriza a fase de remodelação. A contração da ferida, embora comece na fase proliferativa, continua durante a fase de remodelação e, em queimaduras, pode levar à formação de contraturas cicatriciais problemáticas se não for adequadamente gerenciada.",
      difficulty: "Intermediária"
    },
    {
      question: "Durante o procedimento de radiofrequência para flacidez facial, uma paciente relata sensação de queimação intensa. Ao verificar, o fisioterapeuta nota que a temperatura da pele está em 42°C. Qual deve ser a conduta imediata?",
      options: [
        { value: "a", label: "a", text: "Manter a temperatura e explicar que a sensação de queimação é normal e necessária para o efeito terapêutico" },
        { value: "b", label: "b", text: "Diminuir a intensidade do aparelho e verificar se a sensação de desconforto diminui, mantendo monitoramento constante" },
        { value: "c", label: "c", text: "Interromper imediatamente o procedimento, pois a temperatura indica risco de queimadura de segundo grau" },
        { value: "d", label: "d", text: "Aplicar uma camada mais espessa de gel condutor e continuar o procedimento na mesma intensidade" }
      ],
      correctAnswer: "b",
      explanation: "A conduta imediata mais adequada seria diminuir a intensidade do aparelho e verificar se a sensação de desconforto diminui, mantendo um monitoramento constante da temperatura e das reações da paciente. Embora a temperatura de 42°C esteja no limite superior do considerado terapêutico para radiofrequência facial (geralmente entre 40-42°C), a sensação de queimação intensa relatada pela paciente indica que o nível de desconforto está além do aceitável, o que pode ser um sinal precoce de potencial lesão térmica. Cada paciente tem uma sensibilidade individual ao calor, e a tolerância pode variar mesmo dentro dos parâmetros tecnicamente seguros. Diminuir a intensidade permite continuar o tratamento de forma mais confortável e segura, ainda mantendo a eficácia terapêutica. O monitoramento constante é essencial para garantir que a temperatura não volte a níveis desconfortáveis e que não surjam sinais de lesão cutânea. A segurança e o conforto do paciente devem sempre ser priorizados, mesmo que isso signifique ajustar os parâmetros ideais de tratamento.",
      difficulty: "Intermediária"
    },
    {
      question: "Um paciente de 55 anos, com histórico de diabetes tipo 2 controlada, deseja realizar criolipólise na região abdominal. Durante a avaliação, ele relata episódios ocasionais de parestesia nos membros inferiores. Qual é a conduta mais adequada neste caso?",
      options: [
        { value: "a", label: "a", text: "Realizar o procedimento normalmente, pois diabetes controlada não é contraindicação para criolipólise" },
        { value: "b", label: "b", text: "Realizar o procedimento com temperatura menos intensa (-5°C) e menor tempo de aplicação" },
        { value: "c", label: "c", text: "Solicitar avaliação médica prévia e liberação específica devido ao risco de complicações neuropáticas" },
        { value: "d", label: "d", text: "Contraindicar completamente o procedimento por ser incompatível com a condição diabética" }
      ],
      correctAnswer: "c",
      explanation: "A conduta mais adequada para este paciente diabético com sintomas de parestesia nos membros inferiores é solicitar uma avaliação médica prévia e liberação específica antes de realizar a criolipólise. Embora o diabetes controlado não seja uma contraindicação absoluta para a criolipólise, os relatos de parestesia sugerem a presença de neuropatia diabética incipiente, o que representa um risco aumentado para complicações relacionadas ao procedimento. A criolipólise, ao promover resfriamento intenso da pele, pode potencialmente agravar problemas neurossensoriais preexistentes ou aumentar o risco de lesões neurais em pacientes com comprometimento circulatório periférico, comum em diabéticos. A avaliação médica permitirá determinar o grau de comprometimento neurológico e vascular do paciente, além de oferecer orientações específicas sobre a segurança do procedimento neste caso particular. Apenas reduzir a temperatura ou o tempo de aplicação sem avaliação médica seria insuficiente para garantir a segurança do procedimento, enquanto contraindicar completamente seria excessivamente restritivo se o paciente estiver em boas condições clínicas.",
      difficulty: "Difícil"
    },
    {
      question: "Na reabilitação de queimaduras de 3º grau, qual das seguintes técnicas é mais eficaz para prevenir e tratar contraturas cicatriciais em articulações?",
      options: [
        { value: "a", label: "a", text: "Iontoforese com corticoides para reduzir a inflamação local" },
        { value: "b", label: "b", text: "Estimulação elétrica de alta voltagem para reduzir o edema residual" },
        { value: "c", label: "c", text: "Posicionamento, órteses e mobilização precoce para manter amplitude de movimento" },
        { value: "d", label: "d", text: "Crioterapia local para diminuir a atividade dos fibroblastos e reduzir a produção de colágeno" }
      ],
      correctAnswer: "c",
      explanation: "Na reabilitação de queimaduras de 3º grau, o posicionamento adequado, uso de órteses e mobilização precoce constituem a abordagem mais eficaz para prevenir e tratar contraturas cicatriciais em articulações. As queimaduras de 3º grau destroem completamente a epiderme e derme, frequentemente levando à formação de tecido cicatricial com forte tendência à retração. O posicionamento correto das articulações em posição funcional ou anti-deformidade, associado ao uso de órteses estáticas ou dinâmicas, contrapõe-se à força de contração da cicatriz, mantendo o tecido em alongamento. A mobilização precoce, por sua vez, previne a formação de aderências entre planos teciduais e mantém a amplitude de movimento articular. Esta combinação de técnicas deve ser iniciada o mais precocemente possível, idealmente na fase aguda do tratamento, e mantida durante todo o processo de maturação cicatricial, que pode durar até 18 meses. Embora outras modalidades como iontoforese, estimulação elétrica e crioterapia possam ter benefícios em aspectos específicos do tratamento, nenhuma delas é tão fundamental para a prevenção de contraturas quanto a tríade posicionamento-órteses-mobilização.",
      difficulty: "Intermediária"
    },
    {
      question: "Considerando o princípio físico da lipocavitação, qual fenômeno ocorre quando as ondas ultrassônicas de baixa frequência interagem com as células adiposas?",
      options: [
        { value: "a", label: "a", text: "Ionização térmica que desnatura as proteínas da membrana celular dos adipócitos" },
        { value: "b", label: "b", text: "Cavitação estável e instável, formando microbolhas que implodem e rompem as células adiposas" },
        { value: "c", label: "c", text: "Eletroporação das células adiposas, permitindo a entrada massiva de íons que causam lise celular" },
        { value: "d", label: "d", text: "Cristalização controlada do citoplasma adipocitário, induzindo apoptose celular programada" }
      ],
      correctAnswer: "b",
      explanation: "O princípio físico fundamental da lipocavitação envolve os fenômenos de cavitação estável e instável que ocorrem quando ondas ultrassônicas de baixa frequência (geralmente entre 27 kHz e 3 MHz) interagem com as células adiposas. Durante a cavitação estável, as ondas ultrassônicas causam a formação de microbolhas nos líquidos intercelulares, que oscilam de tamanho sem romper. Na cavitação instável, estas microbolhas crescem rapidamente até um ponto crítico onde implodem, gerando ondas de choque e microjatos de líquido que exercem forças mecânicas intensas sobre as membranas das células adiposas adjacentes. Estas forças são suficientes para romper a membrana celular dos adipócitos, liberando seu conteúdo lipídico para o espaço intersticial, de onde será transportado via sistema linfático para ser metabolizado pelo fígado. Este mecanismo difere significativamente da criolipólise (que utiliza cristalização por resfriamento), da radiofrequência (que utiliza aquecimento térmico) e da eletrolipolise (que utiliza correntes elétricas), representando uma abordagem puramente mecânica para a destruição seletiva de células adiposas.",
      difficulty: "Difícil"
    },
    {
      question: "Um paciente de 28 anos sofreu queimadura elétrica que resultou em amputação do 2º dedo da mão direita e cicatrizes extensas na palma. Após 3 meses, apresenta contratura em flexão dos dedos remanescentes e déficit funcional significativo. Qual seria a abordagem fisioterapêutica mais completa neste caso?",
      options: [
        { value: "a", label: "a", text: "Foco exclusivo em exercícios de fortalecimento muscular para compensar a perda do dedo amputado" },
        { value: "b", label: "b", text: "Hidroterapia isolada em água morna para melhorar a circulação local e reduzir a rigidez articular" },
        { value: "c", label: "c", text: "Abordagem multimodal com órteses, terapia manual cicatricial, cinesioterapia e treino funcional específico" },
        { value: "d", label: "d", text: "Eletroterapia de alta frequência para dessensibilização da área e redução da dor neuropática residual" }
      ],
      correctAnswer: "c",
      explanation: "A abordagem fisioterapêutica mais completa para este caso de queimadura elétrica com amputação e contraturas seria multimodal, incluindo órteses, terapia manual cicatricial, cinesioterapia e treino funcional específico. As queimaduras elétricas são particularmente complexas, pois frequentemente causam danos profundos aos tecidos, incluindo nervos, vasos sanguíneos, tendões e músculos, além das lesões cutâneas visíveis. A órtese personalizada ajudaria a posicionar os dedos remanescentes em posição funcional e a prevenir o agravamento das contraturas em flexão. A terapia manual cicatricial, incluindo técnicas de mobilização de cicatrizes e liberação miofascial, auxiliaria na quebra de aderências e na melhora da mobilidade tecidual. A cinesioterapia, com exercícios de alongamento, mobilização articular e fortalecimento progressivo, ajudaria a recuperar a amplitude de movimento e a força muscular. O treino funcional específico focaria na adaptação às atividades diárias considerando a amputação, maximizando a funcionalidade da mão lesionada. Esta abordagem integrada reconhece a complexidade das sequelas de queimaduras elétricas e aborda simultaneamente os aspectos cicatriciais, biomecânicos e funcionais do caso.",
      difficulty: "Difícil"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        {!examStarted ? (
          // Tela inicial com informações e botão para iniciar a prova
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <Card className="overflow-hidden border-[#D9C5B2] shadow-lg">
              <div className="bg-gradient-to-r from-[#B38E6A] to-[#C4A484] p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="h-12 w-12 mr-3" />
                  <h1 className="text-3xl font-bold">Exame de Fisioterapia Dermatofuncional</h1>
                </div>
                <p className="text-white/90 text-center">
                  Avalie seus conhecimentos em Fisioterapia Dermatofuncional
                </p>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#8A6D50] mb-2">Sobre o exame</h2>
                    <p className="text-gray-700">
                      Este exame contém 40 questões de múltipla escolha sobre Fisioterapia Dermatofuncional, 
                      abordando temas como radiofrequência, criolipólise, lipocavitação, tratamento de 
                      queimados e ultrassom terapêutico.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-[#8A6D50] mb-2">Instruções</h2>
                    <ul className="space-y-2 text-gray-700 list-disc pl-5">
                      <li>Você terá 90 minutos para completar o exame.</li>
                      <li>Cada questão possui uma única resposta correta.</li>
                      <li>Após selecionar uma resposta, você verá a explicação detalhada.</li>
                      <li>Você pode navegar entre as questões usando os botões de navegação.</li>
                      <li>Ao final, você receberá sua pontuação e um resumo do desempenho.</li>
                    </ul>
                  </div>
                  
                  <Alert className="bg-[#F7F2EB] border-[#D9C5B2]">
                    <Info className="h-5 w-5 text-[#B38E6A]" />
                    <AlertTitle className="text-base text-[#8A6D50]">
                      Fonte das questões
                    </AlertTitle>
                    <AlertDescription className="text-gray-700">
                      As questões deste exame foram elaboradas com base nas informações disponíveis nos 
                      slides da professora Adriana Dias, respeitando o conteúdo programático da disciplina 
                      de Fisioterapia Dermatofuncional.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={startExam}
                      className="flex items-center gap-2 bg-[#B38E6A] hover:bg-[#8A6D50] text-white px-8 py-6 text-lg rounded-full"
                    >
                      <span>Iniciar Exame</span>
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500 pt-2">
                    <p>Ao iniciar, o tempo começará a contar automaticamente.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#B38E6A] hover:text-[#8A6D50] hover:bg-[#F7F2EB]"
                asChild
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para o Dashboard
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : !examCompleted ? (
          <>
            {/* Cabeçalho da prova */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => window.history.back()}
                    className="mr-4 text-[#B38E6A] hover:text-[#8A6D50] hover:bg-[#F7F2EB] hidden sm:flex"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <span>Voltar</span>
                  </Button>
                  
                  <h1 className="text-xl sm:text-2xl font-bold text-[#8A6D50]">
                    Exame de Fisioterapia Dermatofuncional
                  </h1>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 text-[#B38E6A] bg-[#F7F2EB] px-2 py-1 rounded-full text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{formatTime(timeRemaining)}</span>
                  </div>
                  
                  <div className="hidden md:block w-48">
                    <div className="flex justify-between text-xs text-[#B38E6A] mb-1">
                      <span>Progresso</span>
                      <span>{Math.round(calculateProgress())}%</span>
                    </div>
                    <Progress value={calculateProgress()} className="h-2 bg-[#F7F2EB]" />
                  </div>
                  
                  <div className="text-sm font-medium text-[#B38E6A]">
                    {userAnswers.filter(a => a !== null).length}/{questions.length}
                  </div>
                </div>
                
                <Link href="/dashboard" className="hidden sm:flex">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-[#B38E6A] hover:text-[#8A6D50] hover:bg-[#F7F2EB]">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Indicador de progresso visual */}
            <div className="mb-4">
              <div className="w-full bg-[#F7F2EB] h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#B38E6A] h-full rounded-full"
                  initial={{ width: `${((currentQuestion - 1) / questions.length) * 100}%` }}
                  animate={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-[#B38E6A] mt-1 text-center">
                Questão {currentQuestion + 1} de {questions.length}
              </p>
            </div>

            {/* Container da questão */}
            <div ref={questionRef} className="max-w-4xl mx-auto">
              <Card className="mb-6 border-[#D9C5B2] shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#B38E6A] to-[#C4A484] py-3 px-5 text-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base sm:text-lg font-medium">Questão {currentQuestion + 1}</h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                      <span>Dificuldade:</span>
                      <span className="font-medium">
                        {questions[currentQuestion]?.difficulty || "Intermediária"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <div className="prose prose-stone max-w-none mb-6">
                    <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                      {questions[currentQuestion]?.question || "Carregando questão..."}
                    </p>
                  </div>
                  
                  <RadioGroup 
                    value={userAnswers[currentQuestion] || ""} 
                    onValueChange={selectAnswer}
                    className="space-y-3"
                  >
                    {questions[currentQuestion]?.options?.map((option, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-3 sm:p-4 transition-all duration-300 ${
                          showExplanation && questions[currentQuestion]
                            ? userAnswers[currentQuestion] === option.value
                              ? option.value === questions[currentQuestion].correctAnswer
                                ? "bg-green-50 border-green-200 shadow-md transform scale-[1.02]"
                                : "bg-red-50 border-red-200 shadow-md"
                              : option.value === questions[currentQuestion].correctAnswer
                                ? "bg-green-50 border-green-200 shadow-md transform scale-[1.02]"
                                : "bg-white border-[#D9C5B2] opacity-70"
                            : "hover:bg-[#F7F2EB] border-[#D9C5B2] hover:shadow-md hover:scale-[1.01]"
                        }`}
                      >
                        <RadioGroupItem 
                          value={option.value} 
                          id={`option-${currentQuestion}-${index}`} 
                          className="peer sr-only" 
                          disabled={showExplanation}
                        />
                        <Label 
                          htmlFor={`option-${currentQuestion}-${index}`} 
                          className="flex items-start cursor-pointer"
                        >
                          <div className="flex-shrink-0 mt-1 mr-3">
                            {showExplanation ? (
                              option.value === questions[currentQuestion].correctAnswer ? (
                                <motion.div
                                  initial={{ scale: 1 }}
                                  animate={{ scale: [1, 1.15, 1] }}
                                  transition={{ 
                                    duration: 0.6, 
                                    repeat: 1,
                                    repeatDelay: 1
                                  }}
                                >
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </motion.div>
                              ) : userAnswers[currentQuestion] === option.value ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-[#D9C5B2]"></div>
                              )
                            ) : (
                              <div className="h-5 w-5 rounded-full border border-[#D9C5B2] flex items-center justify-center group-hover:border-[#B38E6A]">
                                <div className="peer-checked:bg-[#B38E6A] peer-checked:border-0 h-3 w-3 rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="text-gray-700 text-sm sm:text-base">
                            <span className="font-medium">{option.label.toUpperCase()})</span> {option.text}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  {/* Explicação da resposta */}
                  <AnimatePresence>
                    {showExplanation && questions[currentQuestion] && (
                      <motion.div
                        ref={explanationRef}
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ 
                          duration: 0.4, 
                          scale: { type: "spring", stiffness: 300, damping: 30 } 
                        }}
                        className="mt-6"
                      >
                        <Alert className={isCurrentAnswerCorrect() ? "bg-green-50 border-green-200" : "bg-[#F7F2EB] border-[#D9C5B2]"}>
                          <Info className={`h-5 w-5 ${isCurrentAnswerCorrect() ? "text-green-500" : "text-[#B38E6A]"}`} />
                          <AlertTitle className={`text-base ${isCurrentAnswerCorrect() ? "text-green-700" : "text-[#8A6D50]"}`}>
                            {isCurrentAnswerCorrect() ? "Resposta correta!" : "Resposta incorreta"}
                          </AlertTitle>
                          <AlertDescription className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                            {questions[currentQuestion]?.explanation || "Explicação não disponível."}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
              
              {/* Navegação entre questões */}
              <div className="flex justify-between items-center mb-12">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousQuestion} 
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 border-[#D9C5B2] text-[#B38E6A] hover:bg-[#F7F2EB] hover:text-[#8A6D50]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </Button>
                
                {currentQuestion === questions.length - 1 ? (
                  <Button 
                    onClick={finishExam}
                    disabled={!canGoToNextQuestion()}
                    className="flex items-center gap-2 bg-[#B38E6A] hover:bg-[#8A6D50] text-white disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    <span>Finalizar Prova</span>
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={goToNextQuestion} 
                    disabled={!canGoToNextQuestion()}
                    className="flex items-center gap-2 bg-[#B38E6A] hover:bg-[#8A6D50] text-white disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    <span className="hidden sm:inline">Próxima</span>
                    <span className="sm:hidden">Próx.</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Mensagem para usuário quando não respondeu ainda */}
              {!canGoToNextQuestion() && (
                <div className="text-center mb-6 text-[#8A6D50] bg-[#F7F2EB] p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5 inline-block mr-2" />
                  <span>Selecione uma resposta para continuar para a próxima questão</span>
                </div>
              )}
            </div>
          </>
        ) : (
          // Tela de resultado final
          <div className="max-w-2xl mx-auto pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-[#D9C5B2] shadow-lg">
                <div className="bg-gradient-to-r from-[#B38E6A] to-[#C4A484] p-6 text-white text-center">
                  <div className="mb-3">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-white/90" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Prova Concluída!</h2>
                  <p className="text-white/90">Você completou a avaliação de Fisioterapia Dermatofuncional</p>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-[#F7F2EB] mb-4 relative">
                      <svg className="absolute inset-0" width="100" height="100" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#F5F5F5" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#B38E6A" 
                          strokeWidth="8"
                          strokeDasharray={`${calculateScore() * 2.83} 283`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <span className="text-3xl font-bold text-[#B38E6A] z-10">{calculateScore()}%</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Sua pontuação</h3>
                    <p className="text-gray-600 mt-1">
                      {userAnswers.filter((answer, index) => 
                        answer !== null && 
                        index < questions.length && 
                        questions[index] && 
                        answer === questions[index].correctAnswer
                      ).length} 
                      &nbsp;de {questions.length} questões corretas
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center bg-[#F7F2EB] p-3 rounded-lg">
                      <span className="text-gray-700">Tempo utilizado:</span>
                      <span className="font-medium text-[#B38E6A]">
                        {formatTime((90 * 60) - timeRemaining)} de 90:00
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                      <span className="text-gray-700">Respostas corretas:</span>
                      <span className="font-medium text-green-600">
                        {userAnswers.filter((answer, index) => 
                          answer !== null && 
                          index < questions.length && 
                          questions[index] && 
                          answer === questions[index].correctAnswer
                        ).length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
                      <span className="text-gray-700">Respostas incorretas:</span>
                      <span className="font-medium text-red-600">
                        {userAnswers.filter((answer, index) => 
                          answer !== null && 
                          index < questions.length && 
                          questions[index] && 
                          answer !== questions[index].correctAnswer
                        ).length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700">Sem resposta:</span>
                      <span className="font-medium text-gray-600">
                        {userAnswers.filter(answer => answer === null).length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#D9C5B2] text-[#B38E6A] hover:bg-[#F7F2EB]"
                      asChild
                    >
                      <Link href="/dashboard/provas">
                        Voltar para Provas
                      </Link>
                    </Button>
                    
                    <Button 
                      className="flex-1 bg-[#B38E6A] hover:bg-[#8A6D50] text-white"
                      asChild
                    >
                      <Link href="/dashboard">
                        Ir para Dashboard
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 