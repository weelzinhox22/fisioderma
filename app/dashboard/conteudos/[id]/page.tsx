import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PdfViewer } from "@/components/pdf-viewer"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ContentDetails } from "@/components/dashboard/content-details"

export default async function ConteudoPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Verificar o papel do usuário
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  // Redirecionar usuários básicos
  if (profile?.role === "basic") {
    redirect("/dashboard/acesso-bloqueado?feature=conteudos")
  }

  return (
    <div className="md:ml-64">
      <DashboardHeader title="Visualizando Conteúdo" description="Detalhes do material selecionado" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ContentDetails id={params.id} />
        </div>
        <div className="lg:col-span-2">
          <PdfViewer id={params.id} />
        </div>
      </div>
    </div>
  )
}
