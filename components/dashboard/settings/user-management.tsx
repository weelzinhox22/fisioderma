"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Search, 
  PlusCircle, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield, 
  Mail,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Tipo para usuários
type User = {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "user"
  status: "active" | "inactive" | "pending"
  avatar?: string
  lastActive?: string
}

export function UserManagement() {
  // Estado para usuários
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@exemplo.com",
      role: "admin",
      status: "active",
      lastActive: "Agora"
    },
    {
      id: "2",
      name: "Carlos Mendes",
      email: "carlos.mendes@exemplo.com",
      role: "editor",
      status: "active",
      lastActive: "3 horas atrás"
    },
    {
      id: "3",
      name: "Juliana Costa",
      email: "juliana.costa@exemplo.com",
      role: "user",
      status: "active",
      lastActive: "1 dia atrás"
    },
    {
      id: "4",
      name: "Ricardo Santos",
      email: "ricardo.santos@exemplo.com",
      role: "user",
      status: "pending",
      lastActive: "Nunca"
    },
    {
      id: "5",
      name: "Mariana Oliveira",
      email: "mariana.oliveira@exemplo.com",
      role: "editor",
      status: "inactive",
      lastActive: "2 semanas atrás"
    }
  ])
  
  // Estado para verificação de permissões
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState("")
  
  // Estado para o modal de adicionar/editar usuário
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "editor" | "user",
    status: "active" as "active" | "inactive" | "pending"
  })
  
  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  // Verificar permissões do usuário
  useEffect(() => {
    const checkUserPermissions = () => {
      // Simula um atraso de carregamento
      setTimeout(() => {
        // Aqui você buscaria o usuário atual do seu sistema de autenticação
        const userEmail = "usuario@exemplo.com" // Substituir por lógica real de autenticação
        
        setCurrentUser(userEmail)
        setIsAuthorized(userEmail === "weelzinho@admin.com")
        setIsLoading(false)
      }, 500)
    }
    
    checkUserPermissions()
  }, [])
  
  // Filtrar usuários com base na busca
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Calcular páginas
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // Função para abrir o modal de adicionar usuário
  const handleAddUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "user",
      status: "active"
    })
    setCurrentEditUser(null)
    setIsEditing(false)
    setIsDialogOpen(true)
  }
  
  // Função para abrir o modal de editar usuário
  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    })
    setCurrentEditUser(user)
    setIsEditing(true)
    setIsDialogOpen(true)
  }
  
  // Função para atualizar os campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Função para salvar um novo usuário ou atualizar um existente
  const handleSaveUser = () => {
    if (isEditing && currentEditUser) {
      // Atualizando usuário existente
      setUsers(users.map(user => 
        user.id === currentEditUser.id 
          ? { ...user, ...formData } 
          : user
      ))
    } else {
      // Adicionando novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        ...formData
      }
      setUsers([...users, newUser])
    }
    
    setIsDialogOpen(false)
  }
  
  // Função para excluir um usuário
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }
  
  // Função para mudar o status de um usuário
  const handleChangeStatus = (userId: string, newStatus: "active" | "inactive" | "pending") => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus } 
        : user
    ))
  }
  
  // Função para mudar o papel de um usuário
  const handleChangeRole = (userId: string, newRole: "admin" | "editor" | "user") => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole } 
        : user
    ))
  }
  
  // Função para enviar convite
  const handleSendInvite = (userId: string) => {
    // Simulação de envio de convite
    console.log(`Enviando convite para o usuário ${userId}`)
    // Em um cenário real, você enviaria uma requisição para o backend
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

  // Função para obter a cor do badge de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }
  
  // Função para obter a cor do badge de papel
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "editor":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "user":
        return "bg-sky-100 text-sky-800 hover:bg-sky-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Mostrar indicador de carregamento
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-t-transparent border-[#B38E6A] rounded-full animate-spin"></div>
      </div>
    )
  }

  // Mostrar mensagem de acesso negado
  if (!isAuthorized) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="p-6">
          <motion.div variants={itemVariants} className="space-y-6">
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Acesso negado</AlertTitle>
              <AlertDescription>
                Você não tem permissão para acessar o gerenciamento de usuários.
                Esta funcionalidade está disponível apenas para o administrador weelzinho@admin.com.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Shield className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Acesso restrito</h3>
              <p className="text-gray-500 max-w-md">
                O gerenciamento de usuários é uma funcionalidade administrativa restrita.
                Entre em contato com o administrador do sistema se precisar de acesso.
              </p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-[#B38E6A]" />
                <h2 className="text-xl font-semibold text-gray-800">Gerenciamento de Usuários</h2>
              </div>
              
              <Button 
                onClick={handleAddUser}
                className="bg-[#B38E6A] hover:bg-[#A47D5D]"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar usuários por nome ou e-mail..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Usuário</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Papel</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Último acesso</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <motion.tr 
                        key={user.id} 
                        className="border-b last:border-0 hover:bg-gray-50"
                        variants={itemVariants}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              {user.avatar ? (
                                <AvatarImage src={user.avatar} alt={user.name} />
                              ) : (
                                <AvatarFallback className="bg-[#B38E6A] text-white">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-800">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(user.status)} font-normal`}>
                            {user.status === "active" && "Ativo"}
                            {user.status === "inactive" && "Inativo"}
                            {user.status === "pending" && "Pendente"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getRoleColor(user.role)} font-normal`}>
                            {user.role === "admin" && "Administrador"}
                            {user.role === "editor" && "Editor"}
                            {user.role === "user" && "Usuário"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {user.lastActive || "Nunca"}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4 mr-2" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem 
                                onClick={() => handleChangeStatus(user.id, "active")}
                                disabled={user.status === "active"}
                              >
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                <span>Marcar como ativo</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem 
                                onClick={() => handleChangeStatus(user.id, "inactive")}
                                disabled={user.status === "inactive"}
                              >
                                <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                                <span>Marcar como inativo</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "admin")}>
                                <Shield className="h-4 w-4 mr-2 text-purple-500" />
                                <span>Tornar administrador</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "editor")}>
                                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                <span>Tornar editor</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "user")}>
                                <Users className="h-4 w-4 mr-2 text-sky-500" />
                                <span>Tornar usuário</span>
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator />
                              
                              {user.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleSendInvite(user.id)}>
                                  <Mail className="h-4 w-4 mr-2 text-blue-500" />
                                  <span>Reenviar convite</span>
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 focus:text-red-700 focus:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuários
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className={currentPage === page ? "bg-[#B38E6A] hover:bg-[#A47D5D]" : ""}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
      
      {/* Modal de adicionar/editar usuário */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Usuário" : "Adicionar Novo Usuário"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Atualize os detalhes do usuário abaixo." 
                : "Preencha os detalhes para adicionar um novo usuário."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Papel
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "editor" | "user") => 
                  setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive" | "pending") => 
                  setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveUser}
              className="bg-[#B38E6A] hover:bg-[#A47D5D]"
            >
              {isEditing ? "Atualizar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
} 