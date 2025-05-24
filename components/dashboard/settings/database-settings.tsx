"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Database, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Settings,
  HardDrive,
  Server,
  Shield,
  Info
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select"

// Tipo para backups
type Backup = {
  id: string
  name: string
  size: string
  date: string
  status: "completed" | "failed" | "in-progress"
}

export function DatabaseSettings() {
  // Estados para as configurações do banco de dados
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [saving, setSaving] = useState(false)
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [retentionPeriod, setRetentionPeriod] = useState("30")
  const [compressionLevel, setCompressionLevel] = useState("medium")
  const [encryptBackups, setEncryptBackups] = useState(true)
  
  // Dados de exemplo para estatísticas
  const dbStats = {
    size: "1.2 GB",
    tables: 24,
    records: "1.2M",
    lastOptimized: "2 dias atrás",
    uptime: "99.98%",
    connections: 42,
    avgQueryTime: "45ms"
  }
  
  // Dados de exemplo para backups
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: "1",
      name: "Backup completo",
      size: "1.1 GB",
      date: "Hoje, 03:00",
      status: "completed"
    },
    {
      id: "2",
      name: "Backup automático",
      size: "1.1 GB",
      date: "Ontem, 03:00",
      status: "completed"
    },
    {
      id: "3",
      name: "Backup manual",
      size: "1.0 GB",
      date: "12/05/2023, 15:32",
      status: "completed"
    },
    {
      id: "4",
      name: "Backup automático",
      size: "980 MB",
      date: "11/05/2023, 03:00",
      status: "failed"
    }
  ])
  
  // Simulação de backup
  const handleBackup = () => {
    setIsBackingUp(true)
    setBackupProgress(0)
    
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackingUp(false)
          
          // Adicionar novo backup à lista
          const newBackup: Backup = {
            id: Date.now().toString(),
            name: "Backup manual",
            size: "1.2 GB",
            date: "Agora",
            status: "completed"
          }
          
          setBackups([newBackup, ...backups])
          return 100
        }
        return prev + 5
      })
    }, 200)
  }
  
  // Simulação de restauração
  const handleRestore = (backupId: string) => {
    setIsRestoring(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setIsRestoring(false)
      // Aqui iria a integração com o backend
    }, 3000)
  }
  
  // Simulação de exclusão de backup
  const handleDeleteBackup = (backupId: string) => {
    setBackups(backups.filter(backup => backup.id !== backupId))
  }
  
  // Simulação de download de backup
  const handleDownloadBackup = (backupId: string) => {
    // Simulando download
    console.log(`Baixando backup ${backupId}`)
    // Em um cenário real, você iniciaria um download
  }
  
  // Simulação de otimização do banco
  const handleOptimizeDatabase = () => {
    setSaving(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setSaving(false)
      // Aqui iria a integração com o backend
    }, 2500)
  }
  
  // Função para salvar configurações
  const handleSaveSettings = () => {
    setSaving(true)
    
    // Simulando uma requisição
    setTimeout(() => {
      setSaving(false)
      // Aqui iria a integração com o backend
    }, 2000)
  }
  
  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  }
  
  // Função para obter a cor do status de backup
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "failed":
        return "text-red-500"
      case "in-progress":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }
  
  // Função para obter o ícone do status de backup
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 border-b">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-[#B38E6A] rounded-none">
            <Database className="h-4 w-4 mr-2" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="backups" className="data-[state=active]:border-b-2 data-[state=active]:border-[#B38E6A] rounded-none">
            <HardDrive className="h-4 w-4 mr-2" />
            Backups
          </TabsTrigger>
          <TabsTrigger value="config" className="data-[state=active]:border-b-2 data-[state=active]:border-[#B38E6A] rounded-none">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>
        
        {/* Visão Geral */}
        <TabsContent value="overview" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Server className="h-6 w-6 mr-2 text-[#B38E6A]" />
                    <h2 className="text-xl font-semibold text-gray-800">Status do Banco de Dados</h2>
                  </div>
                  
                  <Button 
                    onClick={handleOptimizeDatabase}
                    disabled={saving}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {saving ? (
                      <>
                        <div className="w-3 h-3 border-2 border-t-transparent border-current rounded-full animate-spin mr-1"></div>
                        <span>Otimizando...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw size={14} className="mr-1" />
                        <span>Otimizar Banco</span>
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Tamanho Total</span>
                      <HardDrive size={16} className="text-[#B38E6A]" />
                    </div>
                    <div className="text-2xl font-semibold">{dbStats.size}</div>
                    <div className="text-xs text-gray-500 mt-1">24 tabelas</div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Registros</span>
                      <Database size={16} className="text-[#B38E6A]" />
                    </div>
                    <div className="text-2xl font-semibold">{dbStats.records}</div>
                    <div className="text-xs text-gray-500 mt-1">Em todas as tabelas</div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Tempo de Atividade</span>
                      <Clock size={16} className="text-[#B38E6A]" />
                    </div>
                    <div className="text-2xl font-semibold">{dbStats.uptime}</div>
                    <div className="text-xs text-gray-500 mt-1">Último mês</div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">Tempo de Resposta</span>
                      <RefreshCw size={16} className="text-[#B38E6A]" />
                    </div>
                    <div className="text-2xl font-semibold">{dbStats.avgQueryTime}</div>
                    <div className="text-xs text-gray-500 mt-1">Média de consulta</div>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <h3 className="text-base font-medium mb-3">Uso do Armazenamento</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Tabelas de Usuários</span>
                        <span className="text-sm font-medium">450 MB</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Tabelas de Conteúdo</span>
                        <span className="text-sm font-medium">620 MB</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Tabelas de Configuração</span>
                        <span className="text-sm font-medium">130 MB</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Dica de otimização</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Recomendamos otimizar seu banco de dados regularmente para melhorar o desempenho. 
                      A última otimização foi realizada há {dbStats.lastOptimized}.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Backups */}
        <TabsContent value="backups" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HardDrive className="h-6 w-6 mr-2 text-[#B38E6A]" />
                    <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Backups</h2>
                  </div>
                  
                  <Button 
                    onClick={handleBackup}
                    disabled={isBackingUp}
                    className="bg-[#B38E6A] hover:bg-[#A47D5D]"
                  >
                    {isBackingUp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        <span>Realizando backup...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        <span>Criar Backup</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {isBackingUp && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progresso do backup</span>
                      <span className="text-sm">{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="h-2" />
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Tamanho</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backups.map((backup) => (
                        <tr key={backup.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-800">{backup.name}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{backup.size}</td>
                          <td className="py-3 px-4 text-gray-600">{backup.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getStatusIcon(backup.status)}
                              <span className={`ml-1.5 ${getStatusColor(backup.status)}`}>
                                {backup.status === "completed" && "Concluído"}
                                {backup.status === "failed" && "Falhou"}
                                {backup.status === "in-progress" && "Em progresso"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleDownloadBackup(backup.id)}
                                disabled={backup.status !== "completed"}
                              >
                                <Download className="h-3.5 w-3.5 mr-1" />
                                <span className="hidden sm:inline">Baixar</span>
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleRestore(backup.id)}
                                disabled={isRestoring || backup.status !== "completed"}
                              >
                                {isRestoring ? (
                                  <div className="w-3.5 h-3.5 border-2 border-t-transparent border-current rounded-full animate-spin mr-1"></div>
                                ) : (
                                  <Upload className="h-3.5 w-3.5 mr-1" />
                                )}
                                <span className="hidden sm:inline">Restaurar</span>
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteBackup(backup.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {backups.length === 0 && (
                  <div className="text-center py-8">
                    <HardDrive className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Nenhum backup encontrado</h3>
                    <p className="text-gray-500">Clique no botão "Criar Backup" para fazer seu primeiro backup.</p>
                  </div>
                )}
                
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-amber-800">Importante</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Recomendamos manter backups regulares do seu banco de dados. 
                      A restauração de um backup substituirá todos os dados atuais.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
        
        {/* Configurações */}
        <TabsContent value="config" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-[#B38E6A]" />
                  <h2 className="text-xl font-semibold text-gray-800">Configurações de Backup</h2>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-backup" className="text-base">Backup automático</Label>
                      <p className="text-sm text-gray-500">Realizar backups automáticos do banco de dados</p>
                    </div>
                    <Switch 
                      id="auto-backup" 
                      checked={autoBackupEnabled}
                      onCheckedChange={setAutoBackupEnabled}
                    />
                  </div>
                  
                  {autoBackupEnabled && (
                    <div className="space-y-4 pl-6 border-l-2 border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="backup-frequency" className="text-base">Frequência</Label>
                          <p className="text-sm text-gray-500">Com que frequência realizar backups automáticos</p>
                        </div>
                        <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">A cada hora</SelectItem>
                            <SelectItem value="daily">Diariamente</SelectItem>
                            <SelectItem value="weekly">Semanalmente</SelectItem>
                            <SelectItem value="monthly">Mensalmente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="retention-period" className="text-base">Período de retenção</Label>
                          <p className="text-sm text-gray-500">Por quanto tempo manter os backups</p>
                        </div>
                        <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione o período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 dias</SelectItem>
                            <SelectItem value="30">30 dias</SelectItem>
                            <SelectItem value="90">90 dias</SelectItem>
                            <SelectItem value="365">1 ano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compression-level" className="text-base">Nível de compressão</Label>
                      <p className="text-sm text-gray-500">Nível de compressão para os arquivos de backup</p>
                    </div>
                    <Select value={compressionLevel} onValueChange={setCompressionLevel}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="low">Baixo</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="high">Alto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="encrypt-backups" className="text-base">Criptografar backups</Label>
                      <p className="text-sm text-gray-500">Proteger os backups com criptografia</p>
                    </div>
                    <Switch 
                      id="encrypt-backups" 
                      checked={encryptBackups}
                      onCheckedChange={setEncryptBackups}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-[#B38E6A]" />
                  <h2 className="text-xl font-semibold text-gray-800">Segurança do Banco de Dados</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-username">Nome de usuário</Label>
                      <Input 
                        id="db-username" 
                        value="db_admin" 
                        disabled 
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Senha</Label>
                      <Input 
                        id="db-password" 
                        type="password" 
                        value="••••••••••••" 
                        disabled 
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Host</Label>
                      <Input 
                        id="db-host" 
                        value="localhost" 
                        disabled 
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Porta</Label>
                      <Input 
                        id="db-port" 
                        value="5432" 
                        disabled 
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">Informação de segurança</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Para alterar as credenciais do banco de dados, entre em contato com o administrador do sistema.
                        Alterações nas configurações de conexão podem afetar o funcionamento do aplicativo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-8">
                <Button variant="outline">Restaurar padrões</Button>
                <Button 
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#B38E6A] hover:bg-[#A47D5D]"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Salvando...
                    </>
                  ) : "Salvar configurações"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
} 