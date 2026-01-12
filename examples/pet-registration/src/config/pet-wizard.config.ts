import type { WizardConfig } from '@better_form/core';
import { createCondition, orConditions } from '@better_form/core';
import {
  dogBreeds,
  catBreeds,
  birdSpecies,
  rabbitBreeds,
  reptileTypes,
  cageSizes,
  terrariumSizes,
} from '@/lib/pet-breeds';

export const petWizardConfig: WizardConfig = {
  id: 'pet-registration',
  title: 'Registrazione Animale Domestico',
  description: 'Compila il form per registrare il tuo amico peloso',
  version: '1.0.0',

  steps: [
    // ============================================
    // STEP 1: Tipo Animale
    // ============================================
    {
      id: 'pet-type',
      title: 'Chi vuoi registrare?',
      description: 'Seleziona il tipo di animale',
      fieldGroups: [
        {
          fields: [
            {
              id: 'petType',
              name: 'petType',
              label: 'Tipo di animale',
              type: 'radio',
              required: true,
              options: [
                { label: '🐕 Cane', value: 'dog' },
                { label: '🐱 Gatto', value: 'cat' },
                { label: '🦜 Uccello', value: 'bird' },
                { label: '🐰 Coniglio', value: 'rabbit' },
                { label: '🦎 Rettile', value: 'reptile' },
                { label: '❓ Altro', value: 'other' },
              ],
              validation: [
                { type: 'required', message: 'Seleziona un tipo di animale' },
              ],
            },
          ],
        },
      ],
    },

    // ============================================
    // STEP 2: Info Base
    // ============================================
    {
      id: 'basic-info',
      title: 'Raccontaci di più',
      description: 'Informazioni di base sul tuo animale',
      fieldGroups: [
        {
          fields: [
            {
              id: 'petName',
              name: 'petName',
              label: 'Come si chiama?',
              type: 'text',
              placeholder: 'Es. Fido, Luna, Pluto...',
              required: true,
              validation: [
                { type: 'required', message: 'Il nome è obbligatorio' },
                { type: 'minLength', value: 2, message: 'Il nome deve avere almeno 2 caratteri' },
              ],
            },
            {
              id: 'birthDate',
              name: 'birthDate',
              label: 'Data di nascita',
              type: 'date',
              helperText: 'Se non conosci la data esatta, inserisci una stima',
            },
            {
              id: 'sex',
              name: 'sex',
              label: 'Sesso',
              type: 'radio',
              required: true,
              options: [
                { label: 'Maschio ♂️', value: 'male' },
                { label: 'Femmina ♀️', value: 'female' },
                { label: 'Non so', value: 'unknown' },
              ],
            },
            {
              id: 'isNeutered',
              name: 'isNeutered',
              label: 'È sterilizzato/a?',
              type: 'boolean',
              // Mostra solo per cani, gatti e conigli
              showIf: orConditions(
                createCondition('petType', 'equals', 'dog'),
                createCondition('petType', 'equals', 'cat'),
                createCondition('petType', 'equals', 'rabbit')
              ),
            },
          ],
        },
      ],
    },

    // ============================================
    // STEP 3: Dettagli Specifici (CONDITIONAL)
    // ============================================
    {
      id: 'specific-details',
      title: 'Dettagli specifici',
      description: 'Informazioni più dettagliate',
      fieldGroups: [
        // --- CANE ---
        {
          title: 'Informazioni sul cane',
          showIf: createCondition('petType', 'equals', 'dog'),
          fields: [
            {
              id: 'dogBreed',
              name: 'dogBreed',
              label: 'Razza',
              type: 'select',
              options: dogBreeds,
              placeholder: 'Seleziona la razza',
            },
            {
              id: 'dogSize',
              name: 'dogSize',
              label: 'Taglia',
              type: 'radio',
              required: true,
              options: [
                { label: 'Piccola (< 10kg)', value: 'small' },
                { label: 'Media (10-25kg)', value: 'medium' },
                { label: 'Grande (> 25kg)', value: 'large' },
              ],
            },
            {
              id: 'hasPedigree',
              name: 'hasPedigree',
              label: 'Ha il pedigree?',
              type: 'boolean',
            },
          ],
        },

        // --- GATTO ---
        {
          title: 'Informazioni sul gatto',
          showIf: createCondition('petType', 'equals', 'cat'),
          fields: [
            {
              id: 'catBreed',
              name: 'catBreed',
              label: 'Razza',
              type: 'select',
              options: catBreeds,
              placeholder: 'Seleziona la razza',
            },
            {
              id: 'furType',
              name: 'furType',
              label: 'Tipo di pelo',
              type: 'radio',
              options: [
                { label: 'Pelo corto', value: 'short' },
                { label: 'Pelo lungo', value: 'long' },
                { label: 'Senza pelo', value: 'hairless' },
              ],
            },
            {
              id: 'livingEnvironment',
              name: 'livingEnvironment',
              label: 'Dove vive principalmente?',
              type: 'radio',
              options: [
                { label: 'Solo in casa (indoor)', value: 'indoor' },
                { label: 'Solo fuori (outdoor)', value: 'outdoor' },
                { label: 'Entrambi', value: 'both' },
              ],
            },
          ],
        },

        // --- UCCELLO ---
        {
          title: 'Informazioni sull\'uccello',
          showIf: createCondition('petType', 'equals', 'bird'),
          fields: [
            {
              id: 'birdSpecies',
              name: 'birdSpecies',
              label: 'Specie',
              type: 'select',
              options: birdSpecies,
              placeholder: 'Seleziona la specie',
            },
            {
              id: 'canTalk',
              name: 'canTalk',
              label: 'Sa parlare/imitare suoni?',
              type: 'boolean',
            },
            {
              id: 'cageSize',
              name: 'cageSize',
              label: 'Dimensione della gabbia',
              type: 'select',
              options: cageSizes,
              placeholder: 'Seleziona la dimensione',
            },
          ],
        },

        // --- CONIGLIO ---
        {
          title: 'Informazioni sul coniglio',
          showIf: createCondition('petType', 'equals', 'rabbit'),
          fields: [
            {
              id: 'rabbitBreed',
              name: 'rabbitBreed',
              label: 'Razza',
              type: 'select',
              options: rabbitBreeds,
              placeholder: 'Seleziona la razza',
            },
            {
              id: 'rabbitWeight',
              name: 'rabbitWeight',
              label: 'Peso (kg)',
              type: 'number',
              placeholder: 'Es. 2.5',
              min: 0.1,
              max: 15,
            },
            {
              id: 'rabbitEnvironment',
              name: 'rabbitEnvironment',
              label: 'Dove vive?',
              type: 'radio',
              options: [
                { label: 'In casa', value: 'indoor' },
                { label: 'In giardino', value: 'outdoor' },
                { label: 'Entrambi', value: 'both' },
              ],
            },
          ],
        },

        // --- RETTILE ---
        {
          title: 'Informazioni sul rettile',
          showIf: createCondition('petType', 'equals', 'reptile'),
          fields: [
            {
              id: 'reptileType',
              name: 'reptileType',
              label: 'Tipo di rettile',
              type: 'select',
              options: reptileTypes,
              placeholder: 'Seleziona il tipo',
            },
            {
              id: 'terrariumSize',
              name: 'terrariumSize',
              label: 'Dimensione terrario',
              type: 'select',
              options: terrariumSizes,
              placeholder: 'Seleziona la dimensione',
            },
            {
              id: 'reptileDiet',
              name: 'reptileDiet',
              label: 'Alimentazione',
              type: 'radio',
              options: [
                { label: 'Vegetariano', value: 'vegetarian' },
                { label: 'Carnivoro', value: 'carnivore' },
                { label: 'Onnivoro', value: 'omnivore' },
              ],
            },
          ],
        },

        // --- ALTRO ---
        {
          title: 'Descrivi il tuo animale',
          showIf: createCondition('petType', 'equals', 'other'),
          fields: [
            {
              id: 'otherDescription',
              name: 'otherDescription',
              label: 'Che tipo di animale è?',
              type: 'textarea',
              placeholder: 'Descrivi il tuo animale...',
              required: true,
            },
            {
              id: 'specialNeeds',
              name: 'specialNeeds',
              label: 'Ha necessità speciali?',
              type: 'textarea',
              placeholder: 'Descrivi eventuali necessità speciali...',
            },
          ],
        },
      ],
    },

    // ============================================
    // STEP 4: Salute (CONDITIONAL STEP)
    // Solo se l'animale ha più di 1 anno
    // ============================================
    {
      id: 'health',
      title: 'Stato di salute',
      description: 'Informazioni sulla salute del tuo animale',
      // Questo step viene mostrato solo se è stata inserita una data di nascita
      // In un caso reale, si potrebbe calcolare l'età dalla data
      showIf: createCondition('birthDate', 'isNotEmpty', true),
      fieldGroups: [
        {
          fields: [
            {
              id: 'vaccinesUpToDate',
              name: 'vaccinesUpToDate',
              label: 'Vaccinazioni aggiornate?',
              type: 'boolean',
            },
            {
              id: 'hasMicrochip',
              name: 'hasMicrochip',
              label: 'Ha il microchip?',
              type: 'boolean',
              // Solo per cani e gatti
              showIf: orConditions(
                createCondition('petType', 'equals', 'dog'),
                createCondition('petType', 'equals', 'cat')
              ),
            },
            {
              id: 'microchipNumber',
              name: 'microchipNumber',
              label: 'Numero microchip',
              type: 'text',
              placeholder: 'Es. 380260000123456',
              // Nested condition: mostra solo se hasMicrochip è true
              showIf: createCondition('hasMicrochip', 'equals', true),
              validation: [
                { type: 'pattern', value: '^[0-9]{15}$', message: 'Il microchip deve avere 15 cifre' },
              ],
            },
            {
              id: 'allergies',
              name: 'allergies',
              label: 'Allergie note',
              type: 'textarea',
              placeholder: 'Descrivi eventuali allergie...',
            },
            {
              id: 'medicalConditions',
              name: 'medicalConditions',
              label: 'Condizioni mediche',
              type: 'textarea',
              placeholder: 'Descrivi eventuali condizioni mediche...',
            },
          ],
        },
      ],
    },

    // ============================================
    // STEP 5: Proprietario
    // ============================================
    {
      id: 'owner',
      title: 'I tuoi dati',
      description: 'Informazioni sul proprietario',
      fieldGroups: [
        {
          fields: [
            {
              id: 'ownerName',
              name: 'ownerName',
              label: 'Nome completo',
              type: 'text',
              placeholder: 'Mario Rossi',
              required: true,
              validation: [
                { type: 'required', message: 'Il nome è obbligatorio' },
              ],
            },
            {
              id: 'ownerEmail',
              name: 'ownerEmail',
              label: 'Email',
              type: 'email',
              placeholder: 'mario.rossi@email.com',
              required: true,
              validation: [
                { type: 'required', message: 'L\'email è obbligatoria' },
                { type: 'pattern', value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Email non valida' },
              ],
            },
            {
              id: 'ownerPhone',
              name: 'ownerPhone',
              label: 'Telefono',
              type: 'tel',
              placeholder: '+39 333 1234567',
              required: true,
              validation: [
                { type: 'required', message: 'Il telefono è obbligatorio' },
              ],
            },
            {
              id: 'ownerCity',
              name: 'ownerCity',
              label: 'Città',
              type: 'text',
              placeholder: 'Milano',
            },
            {
              id: 'notes',
              name: 'notes',
              label: 'Note aggiuntive',
              type: 'textarea',
              placeholder: 'Altre informazioni utili...',
            },
          ],
        },
      ],
    },

    // ============================================
    // STEP 6: Riepilogo e Conferma
    // ============================================
    {
      id: 'summary',
      title: 'Conferma registrazione',
      description: 'Verifica i dati e conferma',
      fieldGroups: [
        {
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Accetto i termini e le condizioni',
              type: 'single-checkbox',
              required: true,
              validation: [
                { type: 'required', message: 'Devi accettare i termini per procedere' },
              ],
            },
            {
              id: 'acceptPrivacy',
              name: 'acceptPrivacy',
              label: 'Accetto la privacy policy',
              type: 'single-checkbox',
              required: true,
              validation: [
                { type: 'required', message: 'Devi accettare la privacy policy per procedere' },
              ],
            },
            {
              id: 'acceptNewsletter',
              name: 'acceptNewsletter',
              label: 'Desidero ricevere aggiornamenti via email',
              type: 'single-checkbox',
            },
          ],
        },
      ],
    },
  ],

  // Opzioni globali
  submitButtonText: 'Registra! 🎉',
  nextButtonText: 'Avanti →',
  previousButtonText: '← Indietro',
  showProgressBar: true,
  allowBackNavigation: true,
  validateOnChange: false,
  validateOnBlur: true,
};
