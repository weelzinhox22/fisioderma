"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Search, FileText, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Tipo para questão
interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: string
  createdAt: string
  createdBy: string
}

export default function BancoQuestoesPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [difficultyFilter, setDifficultyFilter] = useState("todos")
  const [examDifficultyFilter, setExamDifficultyFilter] = useState("todos")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [expandedExplanations, setExpandedExplanations] = useState<number[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const questionsContainerRef = useRef<HTMLDivElement>(null)

  // Função para alternar a visibilidade da explicação
  const toggleExplanation = (index: number) => {
    setExpandedExplanations(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  // Questões do exame de Fisioterapia Dermatofuncional
  const examQuestions = [
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

  // Verificar autenticação
  useEffect(() => {
    const storedUser = localStorage.getItem("specialUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.role === "admin" || user.role === "professor") {
        setCurrentUser(user)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  // Carregar questões (simulado)
  useEffect(() => {
    if (currentUser) {
      // Simulação de carregamento de dados
      setTimeout(() => {
        // Converter questões do exame para o formato do banco de questões
        const examQuestionsConverted: Question[] = examQuestions.map((q, index) => ({
          id: `exam-${index + 1}`,
          text: q.question,
          options: q.options.map(opt => opt.text),
          correctAnswer: q.options.findIndex(opt => opt.value === q.correctAnswer),
          category: "Fisioterapia Dermatofuncional",
          difficulty: q.difficulty === "Avançada" ? "Avançado" : 
                     q.difficulty === "Difícil" ? "Avançado" : 
                     q.difficulty === "Intermediária" ? "Intermediário" : "Básico",
          createdAt: new Date().toISOString().split("T")[0],
          createdBy: "Sistema - Exame",
        }));

        // Questões existentes
        const mockQuestions: Question[] = [
          {
            id: "1",
            text: "Qual das seguintes técnicas é mais indicada para tratamento de fibroses pós-operatórias em cirurgias estéticas?",
            options: ["Drenagem linfática manual", "Ultrassom terapêutico", "Radiofrequência", "Eletroestimulação"],
            correctAnswer: 1,
            category: "Técnicas",
            difficulty: "Intermediário",
            createdAt: "2023-05-15",
            createdBy: "Profa. Adriana",
          },
          {
            id: "2",
            text: "Quais são os principais benefícios da drenagem linfática no pós-operatório de lipoaspiração?",
            options: [
              "Aumento da circulação sanguínea e redução de edemas",
              "Fortalecimento muscular e aumento da amplitude de movimento",
              "Redução de cicatrizes e clareamento da pele",
              "Aumento da elasticidade da pele e redução de rugas",
            ],
            correctAnswer: 0,
            category: "Pós-operatório",
            difficulty: "Básico",
            createdAt: "2023-06-10",
            createdBy: "Profa. Adriana",
          },
          {
            id: "3",
            text: "Qual é o principal mecanismo de ação da radiofrequência no tratamento da flacidez cutânea?",
            options: [
              "Estimulação da produção de melanina",
              "Aumento da circulação linfática",
              "Estimulação da produção de colágeno através do aquecimento profundo",
              "Redução da camada de gordura subcutânea",
            ],
            correctAnswer: 2,
            category: "Equipamentos",
            difficulty: "Avançado",
            createdAt: "2023-07-05",
            createdBy: "Weelzinho Admin",
          },
          {
            id: "4",
            text: "Em qual fase do processo de cicatrização é mais indicado iniciar o tratamento com laser de baixa potência?",
            options: ["Fase inflamatória", "Fase proliferativa", "Fase de remodelação", "Fase hemostática"],
            correctAnswer: 0,
            category: "Cicatrização",
            difficulty: "Avançado",
            createdAt: "2023-08-20",
            createdBy: "Profa. Adriana",
          },
          {
            id: "5",
            text: "Qual das seguintes condições é uma contraindicação absoluta para a aplicação de ultrassom terapêutico?",
            options: [
              "Presença de implantes metálicos",
              "Áreas com sensibilidade alterada",
              "Sobre áreas de trombose ou tromboflebite",
              "Tecidos cicatriciais",
            ],
            correctAnswer: 2,
            category: "Contraindicações",
            difficulty: "Intermediário",
            createdAt: "2023-09-15",
            createdBy: "Weelzinho Admin",
          },
        ]

        // Combinar as questões
        setQuestions([...mockQuestions, ...examQuestionsConverted])
        setIsLoading(false)
      }, 1000)
    }
  }, [currentUser])

  // Filtrar questões
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "todos" || !categoryFilter ? true : question.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "todos" || !difficultyFilter ? true : question.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Filtrar questões do exame
  const filteredExamQuestions = examQuestions.filter((question) => {
    return examDifficultyFilter === "todos" || !examDifficultyFilter ? true : question.difficulty === examDifficultyFilter
  })

  // Categorias únicas para o filtro
  const categories = Array.from(new Set(questions.map((q) => q.category)))

  // Níveis de dificuldade únicos para o filtro
  const difficulties = Array.from(new Set(questions.map((q) => q.difficulty)))

  // Adicionar nova questão
  const handleAddQuestion = (newQuestion: Omit<Question, "id" | "createdAt" | "createdBy">) => {
    const question: Question = {
      ...newQuestion,
      id: (questions.length + 1).toString(),
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: currentUser.name || currentUser.email,
    }

    setQuestions([...questions, question])
    toast({
      title: "Questão adicionada",
      description: "A questão foi adicionada com sucesso ao banco de questões.",
    })
  }

  // Editar questão
  const handleEditQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q)))
    toast({
      title: "Questão atualizada",
      description: "A questão foi atualizada com sucesso.",
    })
  }

  // Excluir questão
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    toast({
      title: "Questão excluída",
      description: "A questão foi excluída permanentemente.",
    })
  }

  // Função para gerar o PDF
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    toast({
      title: "Gerando PDF",
      description: "Aguarde enquanto o PDF está sendo gerado...",
    });

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = 20;
      
      // Adicionar título principal
      pdf.setFontSize(18);
      pdf.setTextColor(138/255, 109/255, 80/255); // #8A6D50
      pdf.setFont("helvetica", "bold");
      const title = "Banco de Questões - Fisioterapia Dermatofuncional";
      pdf.text(title, pageWidth/2, yPosition, { align: 'center' });
      
      yPosition += 10;
      pdf.setDrawColor(179/255, 142/255, 106/255); // #B38E6A
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
      
      // Informações do documento
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "italic");
      const dateStr = new Date().toLocaleDateString('pt-BR');
      pdf.text(`Gerado em: ${dateStr}`, margin, yPosition);
      pdf.text(`Total de questões: ${filteredExamQuestions.length}`, pageWidth - margin, yPosition, { align: 'right' });
      yPosition += 15;
      
      // Para cada questão
      for (let i = 0; i < filteredExamQuestions.length; i++) {
        const question = filteredExamQuestions[i];
        
        // Verificar se precisa de nova página
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Número e dificuldade da questão
        pdf.setFontSize(12);
        pdf.setTextColor(179/255, 142/255, 106/255); // #B38E6A
        pdf.setFont("helvetica", "bold");
        pdf.text(`Questão ${i + 1} | ${question.difficulty}`, margin, yPosition);
        yPosition += 8;
        
        // Texto da questão
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.setFont("helvetica", "normal");
        
        const questionLines = pdf.splitTextToSize(question.question, contentWidth);
        pdf.text(questionLines, margin, yPosition);
        yPosition += (questionLines.length * 6) + 5;
        
        // Alternativas
        for (let j = 0; j < question.options.length; j++) {
          const option = question.options[j];
          const isCorrect = option.value === question.correctAnswer;
          
          // Verificar se precisa de nova página
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.setFont("helvetica", isCorrect ? "bold" : "normal");
          if (isCorrect) {
            pdf.setTextColor(0, 128, 0); // verde para respostas corretas
          } else {
            pdf.setTextColor(0, 0, 0); // preto para as outras
          }
          
          const prefix = `${option.label.toUpperCase()}) `;
          pdf.text(prefix, margin, yPosition);
          
          const optionText = option.text;
          const optionLines = pdf.splitTextToSize(optionText, contentWidth - 10);
          pdf.text(optionLines, margin + 10, yPosition);
          
          yPosition += (optionLines.length * 6) + 3;
        }
        
        // Explicação
        if (yPosition > 240) {
          pdf.addPage();
          yPosition = 20;
        }
        
        yPosition += 5;
        pdf.setFontSize(10);
        pdf.setTextColor(138/255, 109/255, 80/255); // #8A6D50
        pdf.setFont("helvetica", "bold");
        pdf.text("Explicação:", margin, yPosition);
        yPosition += 5;
        
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
        pdf.setFont("helvetica", "normal");
        const explanationLines = pdf.splitTextToSize(question.explanation, contentWidth);
        pdf.text(explanationLines, margin, yPosition);
        yPosition += (explanationLines.length * 5) + 15;
        
        // Adicionar separador entre questões
        if (i < filteredExamQuestions.length - 1) {
          pdf.setDrawColor(220, 220, 220);
          pdf.setLineWidth(0.3);
          pdf.line(margin, yPosition - 8, pageWidth - margin, yPosition - 8);
        }
      }
      
      // Adicionar rodapé com numeração de páginas
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth/2, 290, { align: 'center' });
      }
      
      pdf.save('questoes-fisioterapia-dermatofuncional.pdf');
      
      toast({
        title: "PDF Gerado",
        description: "O PDF foi gerado com sucesso!",
        variant: "default"
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!currentUser) {
    return null // Aguardando verificação de autenticação
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Banco de Questões</h1>
            <p className="text-gray-600">Questões do exame de Fisioterapia Dermatofuncional.</p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Questões do Exame</CardTitle>
                <div className="flex items-center gap-3">
                  <Select value={examDifficultyFilter} onValueChange={setExamDifficultyFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas dificuldades</SelectItem>
                      <SelectItem value="Básica">Básica</SelectItem>
                      <SelectItem value="Intermediária">Intermediária</SelectItem>
                      <SelectItem value="Avançada">Avançada</SelectItem>
                      <SelectItem value="Difícil">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-[#B38E6A] hover:text-[#8A6D50] hover:bg-[#F7F2EB]"
                    onClick={generatePDF}
                    disabled={isGeneratingPDF || filteredExamQuestions.length === 0}
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="h-4 w-4 border-2 border-t-transparent border-[#B38E6A] rounded-full animate-spin mr-2"></div>
                        <span>Gerando PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Baixar PDF</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={questionsContainerRef} className="space-y-6">
                {filteredExamQuestions.length > 0 ? (
                  <>
                    <div className="text-sm text-gray-500 mb-4">
                      Mostrando {filteredExamQuestions.length} de {examQuestions.length} questões
                    </div>
                    {filteredExamQuestions.map((question, index) => (
                      <div key={index} className="border rounded-lg p-5 shadow-sm">
                        <div className="flex justify-between">
                          <div className="inline-flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              Questão {index + 1}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                              {question.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleExplanation(index)}
                              className="text-xs"
                            >
                              {expandedExplanations.includes(index) ? "Ocultar Explicação" : "Ver Explicação"}
                            </Button>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-4">{question.question}</h3>
                        
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIdx) => (
                            <div 
                              key={optIdx} 
                              className={`p-3 border rounded-md flex items-start ${
                                option.value === question.correctAnswer 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-gray-50"
                              }`}
                            >
                              <div 
                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                  option.value === question.correctAnswer 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {option.label.toUpperCase()}
                              </div>
                              <div className="text-gray-700">{option.text}</div>
                            </div>
                          ))}
                        </div>
                        
                        {expandedExplanations.includes(index) && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
                            <h4 className="font-medium text-blue-800 mb-2">Explicação:</h4>
                            <p className="text-gray-700">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma questão encontrada</h3>
                    <p className="text-gray-500 mb-4">
                      Tente selecionar outro nível de dificuldade.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Componente de formulário para adicionar/editar questões
interface QuestionFormProps {
  initialData?: Question
  onSubmit: (data: any) => void
}

function QuestionForm({ initialData, onSubmit }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    text: initialData?.text || "",
    options: initialData?.options || ["", "", "", ""],
    correctAnswer: initialData?.correctAnswer || 0,
    category: initialData?.category || "all",
    difficulty: initialData?.difficulty || "all",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text">Texto da Questão</Label>
        <Textarea
          id="text"
          name="text"
          placeholder="Digite o enunciado da questão..."
          rows={3}
          value={formData.text}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Alternativas</Label>
        {formData.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <input
                type="radio"
                id={`correct-${index}`}
                name="correctAnswer"
                value={index}
                checked={formData.correctAnswer === index}
                onChange={() => setFormData({ ...formData, correctAnswer: index })}
                className="mr-2"
              />
              <Label htmlFor={`correct-${index}`} className="sr-only">
                Alternativa correta
              </Label>
            </div>
            <Input
              placeholder={`Alternativa ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas categorias</SelectItem>
              <SelectItem value="Técnicas">Técnicas</SelectItem>
              <SelectItem value="Equipamentos">Equipamentos</SelectItem>
              <SelectItem value="Anatomia">Anatomia</SelectItem>
              <SelectItem value="Pós-operatório">Pós-operatório</SelectItem>
              <SelectItem value="Cicatrização">Cicatrização</SelectItem>
              <SelectItem value="Contraindicações">Contraindicações</SelectItem>
              <SelectItem value="Avaliação">Avaliação</SelectItem>
              <SelectItem value="Fundamentos">Fundamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Nível de Dificuldade</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas dificuldades</SelectItem>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Intermediário">Intermediário</SelectItem>
              <SelectItem value="Avançado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
          {initialData ? "Salvar Alterações" : "Adicionar Questão"}
        </Button>
      </div>
    </form>
  )
}
