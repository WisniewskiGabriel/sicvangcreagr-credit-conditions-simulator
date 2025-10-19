"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { useState } from "react";

export default function Home() {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-6xl space-y-6 py-8">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
            Credit Conditions Simulator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powered by Next.js 15.5+ with TurboPack & PrimeReact
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="Loan Calculator"
            className="shadow-lg"
            footer={
              <div className="flex justify-end gap-2">
                <Button
                  label="Reset"
                  icon="pi pi-refresh"
                  severity="secondary"
                  outlined
                  onClick={() => {
                    setLoanAmount(10000);
                    setInterestRate(5.5);
                    setSliderValue(50);
                  }}
                />
                <Button label="Calculate" icon="pi pi-calculator" />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="loanAmount"
                  className="font-semibold text-gray-700 dark:text-gray-200"
                >
                  Loan Amount
                </label>
                <InputNumber
                  id="loanAmount"
                  value={loanAmount}
                  onValueChange={(e) => setLoanAmount(e.value ?? 0)}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="interestRate"
                  className="font-semibold text-gray-700 dark:text-gray-200"
                >
                  Interest Rate (%)
                </label>
                <InputNumber
                  id="interestRate"
                  value={interestRate}
                  onValueChange={(e) => setInterestRate(e.value ?? 0)}
                  minFractionDigits={2}
                  maxFractionDigits={2}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="term"
                  className="font-semibold text-gray-700 dark:text-gray-200"
                >
                  Loan Term: {sliderValue} months
                </label>
                <Slider
                  id="term"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(e.value as number)}
                  min={6}
                  max={360}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Card title="Features Showcase" className="shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className="pi pi-check-circle text-2xl text-green-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  Next.js 15.5.6 with App Router
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="pi pi-bolt text-2xl text-yellow-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  TurboPack for faster development
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="pi pi-palette text-2xl text-purple-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  PrimeReact UI Components
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="pi pi-code text-2xl text-blue-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  TypeScript Support
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="pi pi-star text-2xl text-orange-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  Prettier Code Formatting
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="pi pi-mobile text-2xl text-teal-500"></i>
                <span className="text-gray-700 dark:text-gray-200">
                  Tailwind CSS v4
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  label="Primary"
                  icon="pi pi-star"
                  size="small"
                  rounded
                />
                <Button
                  label="Success"
                  icon="pi pi-check"
                  severity="success"
                  size="small"
                  rounded
                />
                <Button
                  label="Info"
                  icon="pi pi-info-circle"
                  severity="info"
                  size="small"
                  rounded
                />
                <Button
                  label="Warning"
                  icon="pi pi-exclamation-triangle"
                  severity="warning"
                  size="small"
                  rounded
                />
                <Button
                  label="Danger"
                  icon="pi pi-times"
                  severity="danger"
                  size="small"
                  rounded
                />
              </div>
            </div>
          </Card>
        </div>

        <Card title="Quick Start" className="shadow-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Development Server
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run dev
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Production Build
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run build
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Format Code
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run format
                </code>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
