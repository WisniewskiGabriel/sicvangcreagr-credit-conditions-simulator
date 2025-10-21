"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";
import { AppLayout } from "../components";
import { useAuth } from "../context/AuthContext";
import withAuth from "../hoc/withAuth";
import Link from "next/link";

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardStats] = useState({
    activeLoans: 12,
    pendingApprovals: 5,
    totalAmount: 2850000,
    monthlyInterest: 45600
  });

  const quickActions = [
    {
      label: "Nova Simulação",
      icon: "pi pi-calculator",
      color: "bg-blue-500",
      href: "/agricultural-credit",
      description: "Criar nova simulação de crédito agrícola"
    },
    {
      label: "Perfil",
      icon: "pi pi-user",
      color: "bg-green-500", 
      href: "/profile",
      description: "Gerenciar informações pessoais"
    },
    {
      label: "Relatórios",
      icon: "pi pi-chart-bar",
      color: "bg-purple-500",
      href: "#",
      description: "Visualizar relatórios financeiros"
    },
    {
      label: "Suporte",
      icon: "pi pi-question-circle",
      color: "bg-orange-500",
      href: "#",
      description: "Central de ajuda e suporte"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Simulação de Custeio aprovada",
      description: "João Silva Santos - R$ 50.000",
      time: "2 horas atrás",
      icon: "pi pi-check-circle",
      severity: "success"
    },
    {
      id: 2,
      title: "Nova proposta de investimento",
      description: "Maria Oliveira Costa - R$ 120.000",
      time: "5 horas atrás",
      icon: "pi pi-file",
      severity: "info"
    },
    {
      id: 3,
      title: "Pagamento processado",
      description: "Carlos Eduardo Lima - R$ 15.500",
      time: "1 dia atrás",
      icon: "pi pi-credit-card",
      severity: "success"
    },
    {
      id: 4,
      title: "Documento pendente",
      description: "Ana Paula Ferreira - CPR Física",
      time: "2 dias atrás",
      icon: "pi pi-exclamation-triangle",
      severity: "warning"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-6 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bem-vindo, {user?.email?.split('@')[0] || 'Usuário'}!
              </h1>
              <p className="text-blue-100">
                Gerencie suas operações de crédito agrícola de forma eficiente
              </p>
            </div>
            <div className="hidden md:block ">
                <div className="flex flex-wrap gap-2 align-items-center justify-content-start bg-white/20 p-4 rounded-lg text-center">
                <i className="pi pi-sun text-4xl"></i>
                <span className="text-sm">Bom trabalho!</span>
                </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <i className="pi pi-file-o text-blue-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {dashboardStats.activeLoans}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Empréstimos Ativos
            </p>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                <i className="pi pi-clock text-orange-600 text-2xl"></i>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {dashboardStats.pendingApprovals}
              </h3>
              <Badge value="!" severity="warning" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Aguardando Aprovação
            </p>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <i className="pi pi-dollar text-green-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {formatCurrency(dashboardStats.totalAmount)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Volume Total
            </p>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <i className="pi pi-percentage text-purple-600 text-2xl"></i>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {formatCurrency(dashboardStats.monthlyInterest)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Juros Mensais
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card title="Ações Rápidas" className="shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="block"
                >
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer hover:shadow-md">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${action.color} p-2 rounded-lg text-white`}>
                        <i className={`${action.icon} text-lg`}></i>
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {action.label}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card title="Atividades Recentes" className="shadow-lg">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className={`p-2 rounded-full ${
                    activity.severity === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                    activity.severity === 'warning' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                  }`}>
                    <i className={`${activity.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-800 dark:text-white text-sm">
                      {activity.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">
                      {activity.description}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            <div className="text-center">
              <Button 
                label="Ver Todas as Atividades" 
                icon="pi pi-arrow-right"
                text
                size="small"
              />
            </div>
          </Card>
        </div>

        {/* System Status */}
        <Card title="Status do Sistema" className="shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <i className="pi pi-check-circle text-green-600 text-xl"></i>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  API Conectada
                </h4>
                <p className="text-green-600 dark:text-green-300 text-sm">
                  Todos os serviços operacionais
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <i className="pi pi-database text-blue-600 text-xl"></i>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  Backup Atualizado
                </h4>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  Última sincronização: hoje
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <i className="pi pi-shield text-purple-600 text-xl"></i>
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                  Segurança Ativa
                </h4>
                <p className="text-purple-600 dark:text-purple-300 text-sm">
                  Certificados SSL válidos
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default withAuth(DashboardPage);