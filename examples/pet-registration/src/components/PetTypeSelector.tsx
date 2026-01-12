'use client';

import { motion } from 'framer-motion';
import { petTypes } from '@/lib/pet-breeds';

interface PetTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PetTypeSelector({ value, onChange, error }: PetTypeSelectorProps) {
  return (
    <div>
      <div className="pet-selector-grid">
        {petTypes.map((pet, index) => (
          <motion.button
            key={pet.id}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(pet.id)}
            className={`pet-card ${value === pet.id ? 'selected' : ''}`}
            style={{
              borderColor: value === pet.id ? pet.color : undefined,
              backgroundColor: value === pet.id ? `${pet.color}15` : undefined,
            }}
          >
            <motion.span
              className="emoji"
              animate={value === pet.id ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {pet.emoji}
            </motion.span>
            <span className="label">{pet.label}</span>
            {value === pet.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: pet.color }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      {error && (
        <p className="field-error mt-3 text-center">{error}</p>
      )}
    </div>
  );
}
