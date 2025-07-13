"use client"

import { useState } from "react"
import Header from "@/shared/components/templates/Header"
import DashboardTabs from "@/shared/components/organisms/DashboardTabs"
import ChatSidebar from "../components/organisms/ChatSidebar"
import ChatWindow from "../components/organisms/ChatWindow"
import { useAuthStore } from "../../authentication/store/AuthStore"

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState(null);
  const [mostrarChat, setMostrarChat] = useState(false);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const userType = user.role === 'agricultor' ? 'farmer' : 'buyer';
  const pageTitle = user.role === 'agricultor' ? 'Panel de Agricultor' : 'Panel de Comprador';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAuthenticated={true}
        userName={user.name || 'Usuario'}
        pageTitle={pageTitle}
        pageDescription="Gestiona tus conversaciones y negocia con otros usuarios"
        showAuthButtons={false}
        userType={userType}
        notificationCount={3}
      />

      <div className="container mx-auto px-4 py-8">
        <DashboardTabs />
        


        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="flex h-[600px]">
            <ChatSidebar
              conversacionSeleccionada={conversacionSeleccionada}
              setConversacionSeleccionada={setConversacionSeleccionada}
              setMostrarChat={setMostrarChat}
              mostrarChat={mostrarChat}
            />
            
            <ChatWindow
              conversacionSeleccionada={conversacionSeleccionada}
              mostrarChat={mostrarChat}
              setMostrarChat={setMostrarChat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
