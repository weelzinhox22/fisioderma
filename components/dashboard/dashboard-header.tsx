"use client"

import { motion } from "framer-motion"
import { useSupabase } from "@/lib/supabase/provider"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { user } = useSupabase()

  return (
    <div className="mb-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 mt-2"
        >
          {description}
          {user?.user_metadata?.name && <span className="font-medium text-teal-600"> {user.user_metadata.name}</span>}
        </motion.p>
      )}
    </div>
  )
}
