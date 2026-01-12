'use client';

import { useState } from 'react';
import { WizardContainer, AutoStep } from '@better_form/core';
import '@better_form/core/styles';
import { petWizardConfig } from '@/config/pet-wizard.config';
import { SuccessConfetti } from '@/components/SuccessConfetti';
import { petTypes } from '@/lib/pet-breeds';

export default function Home() {
  const [isComplete, setIsComplete] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsComplete(true);
  };

  const handleReset = () => {
    setIsComplete(false);
    setSubmittedData(null);
  };

  if (isComplete && submittedData) {
    const petType = petTypes.find(p => p.id === submittedData.petType);

    return (
      <>
        <SuccessConfetti trigger={isComplete} />
        <div className="card-pop p-8 text-center animate-bounce-in">
          <div className="text-7xl mb-4">{petType?.emoji || '🎉'}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Registrazione completata!
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>{submittedData.petName as string}</strong> è stato registrato con successo!
          </p>

          {/* Summary Card */}
          <div className="summary-card text-left mb-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Riepilogo</h3>

            <div className="summary-row">
              <span className="summary-label">Animale</span>
              <span className="summary-value">{petType?.label} {petType?.emoji}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Nome</span>
              <span className="summary-value">{submittedData.petName as string}</span>
            </div>

            {submittedData.birthDate && (
              <div className="summary-row">
                <span className="summary-label">Data di nascita</span>
                <span className="summary-value">
                  {new Date(submittedData.birthDate as string).toLocaleDateString('it-IT')}
                </span>
              </div>
            )}

            <div className="summary-row">
              <span className="summary-label">Proprietario</span>
              <span className="summary-value">{submittedData.ownerName as string}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Email</span>
              <span className="summary-value">{submittedData.ownerEmail as string}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="btn-pop btn-primary"
          >
            Registra un altro animale
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="card-pop p-6 md:p-8">
      <WizardContainer config={petWizardConfig} onSubmit={handleSubmit}>
        <AutoStep />
      </WizardContainer>
    </div>
  );
}
