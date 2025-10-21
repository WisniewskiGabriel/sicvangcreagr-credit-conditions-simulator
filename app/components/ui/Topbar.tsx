"use client";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
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
          
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              SICVANGCREAGR
            </h1>
          </div>
        </div>

        {/* Right side - User menu and other actions */}
        <div className="flex items-center space-x-4">
          {/* Placeholder for future user menu, notifications, etc. */}
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </header>
  );
};