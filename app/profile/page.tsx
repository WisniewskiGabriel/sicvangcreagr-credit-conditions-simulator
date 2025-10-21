"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { AppLayout, PageHeader } from "../components";
import { useAuth } from "../context/AuthContext";
import withAuth from "../hoc/withAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Profile form state
  const [profileData, setProfileData] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // User stats
  const [userStats] = useState({
    joinDate: "Janeiro 2024",
    totalSimulations: 45,
    activeLoans: 12,
    lastLogin: "Hoje às 14:30"
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically call an API to update profile
      setSuccess("Perfil atualizado com sucesso!");
      
      // Clear password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (err) {
      setError("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (profileData.newPassword !== profileData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (profileData.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically call an API to change password
      setSuccess("Senha alterada com sucesso!");
      
      // Clear all password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (err) {
      setError("Erro ao alterar senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <PageHeader
          title="Perfil do Usuário"
          subtitle="Gerencie suas informações pessoais e configurações de conta"
        />

        {success && (
          <Message severity="success" text={success} className="w-full" />
        )}

        {error && (
          <Message severity="error" text={error} className="w-full" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card title="Informações da Conta" className="shadow-lg h-fit">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Avatar 
                    label={getInitials(user?.email || "")}
                    size="xlarge"
                    shape="circle"
                    className="bg-blue-500 text-white"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {user?.email?.split('@')[0] || 'Usuário'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {user?.email}
                  </p>
                  <Badge value="Ativo" severity="success" className="mt-2" />
                </div>

                <Divider />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Membro desde:</span>
                    <span className="font-medium">{userStats.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Simulações:</span>
                    <span className="font-medium">{userStats.totalSimulations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Empréstimos ativos:</span>
                    <span className="font-medium">{userStats.activeLoans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Último acesso:</span>
                    <span className="font-medium">{userStats.lastLogin}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Settings Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card title="Configurações do Perfil" className="shadow-lg">
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <InputText
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full"
                    disabled={loading}
                  />
                  <small className="text-gray-500 dark:text-gray-400">
                    Seu email é usado para login e notificações importantes.
                  </small>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    label={loading ? "Salvando..." : "Salvar Alterações"}
                    icon={loading ? "pi pi-spinner pi-spin" : "pi pi-save"}
                    disabled={loading || profileData.email === user?.email}
                    loading={loading}
                  />
                </div>
              </form>
            </Card>

            {/* Password Change */}
            <Card title="Alterar Senha" className="shadow-lg">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Senha Atual
                  </label>
                  <Password
                    id="currentPassword"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full"
                    inputClassName="w-full"
                    disabled={loading}
                    feedback={false}
                    toggleMask
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nova Senha
                    </label>
                    <Password
                      id="newPassword"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full"
                      inputClassName="w-full"
                      disabled={loading}
                      promptLabel="Digite uma senha"
                      weakLabel="Fraca"
                      mediumLabel="Média"
                      strongLabel="Forte"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirmar Nova Senha
                    </label>
                    <Password
                      id="confirmPassword"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full"
                      inputClassName="w-full"
                      disabled={loading}
                      feedback={false}
                      toggleMask
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    label={loading ? "Alterando..." : "Alterar Senha"}
                    icon={loading ? "pi pi-spinner pi-spin" : "pi pi-key"}
                    disabled={loading || !profileData.currentPassword || !profileData.newPassword || !profileData.confirmPassword}
                    loading={loading}
                    severity="warning"
                  />
                </div>
              </form>
            </Card>

            {/* Account Actions */}
            <Card title="Ações da Conta" className="shadow-lg">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <i className="pi pi-download text-blue-500 text-lg mt-1"></i>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                        Exportar Dados
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                        Baixe uma cópia de todos os seus dados e simulações.
                      </p>
                      <Button 
                        label="Exportar" 
                        icon="pi pi-download"
                        size="small"
                        outlined
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <i className="pi pi-exclamation-triangle text-orange-500 text-lg mt-1"></i>
                    <div className="flex-1">
                      <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">
                        Desativar Conta
                      </h4>
                      <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
                        Desative temporariamente sua conta. Você pode reativá-la a qualquer momento.
                      </p>
                      <Button 
                        label="Desativar" 
                        icon="pi pi-pause"
                        size="small"
                        severity="warning"
                        outlined
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <i className="pi pi-trash text-red-500 text-lg mt-1"></i>
                    <div className="flex-1">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
                        Excluir Conta
                      </h4>
                      <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                        Permanentemente exclua sua conta e todos os dados associados. Esta ação não pode ser desfeita.
                      </p>
                      <Button 
                        label="Excluir Conta" 
                        icon="pi pi-trash"
                        size="small"
                        severity="danger"
                        outlined
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuth(ProfilePage);