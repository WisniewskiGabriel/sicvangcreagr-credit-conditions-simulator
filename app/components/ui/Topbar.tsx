"use client";

import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const menu = useRef<Menu>(null);
  const toast = useRef<Toast>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    confirmDialog({
      message: 'Tem certeza que deseja sair do sistema?',
      header: 'Confirmar Logout',
      icon: 'pi pi-sign-out',
      acceptLabel: 'Sim, sair',
      rejectLabel: 'Cancelar',
      accept: async () => {
        try {
          await logout();
          toast.current?.show({
            severity: 'success',
            summary: 'Logout realizado',
            detail: 'Você foi desconectado com sucesso.',
            life: 3000
          });
          router.push('/login');
        } catch {
          toast.current?.show({
            severity: 'error',
            summary: 'Erro no logout',
            detail: 'Não foi possível realizar o logout. Tente novamente.',
            life: 3000
          });
        }
      }
    });
  };

  const userMenuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => {
        router.push('/dashboard');
        setMenuVisible(false);
      }
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        router.push('/profile');
        setMenuVisible(false);
      }
    },
    {
      separator: true
    },
    {
      label: 'Nova Simulação',
      icon: 'pi pi-calculator',
      command: () => {
        router.push('/agricultural-credit');
        setMenuVisible(false);
      }
    },
    {
      separator: true
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: handleLogout
    }
  ];

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  SICVANGCREAGR
                </h1>
              </div>
            </Link>
          </div>

          {/* Right side - User menu or login button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* User info */}
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getUserDisplayName(user.email)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* User menu */}
                <div className="relative">
                  <Menu
                    ref={menu}
                    model={userMenuItems}
                    popup
                    className="mt-2"
                  />
                  {/* <Button
                    className="p-0 bg-transparent border-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 flex items-center justify-center"
                    
                  > */}
                    <div
                      className="relative bg-gray-100 dark:bg-gray-700 flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 justify-center w-12 h-12 rounded-full hover:shadow-md transition-all duration-200"
                      onClick={(e) => {
                      setMenuVisible(!menuVisible);
                      menu.current?.toggle(e);
                    }}
                    aria-label="User menu">
                      <Avatar 
                        label={getInitials(user.email)}
                        shape="circle"
                        className="bg-blue-500 text-white w-10 h-10 text-sm font-medium shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-sm border border-gray-200 dark:border-gray-600">
                        <i 
                          className={`pi pi-chevron-down text-xs text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
                            menuVisible ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  {/* </Button> */}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  label="Login"
                  icon="pi pi-sign-in"
                  onClick={() => router.push('/login')}
                  size="small"
                />
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};