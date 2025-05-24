import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

// Remover a dependência do createServerComponentClient
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // No modo de demonstração, permitimos acesso ao dashboard sem autenticação
  // Em um ambiente real, você verificaria a autenticação aqui

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
