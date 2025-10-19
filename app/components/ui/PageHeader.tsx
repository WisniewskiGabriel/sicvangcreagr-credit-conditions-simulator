"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  );
};