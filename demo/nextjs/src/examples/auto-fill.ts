import type { WizardConfig } from 'better-form';

// Province to Region mapping (Italian example)
const provinceToRegion: Record<string, string> = {
  MI: 'Lombardia',
  BG: 'Lombardia',
  BS: 'Lombardia',
  CO: 'Lombardia',
  CR: 'Lombardia',
  LC: 'Lombardia',
  LO: 'Lombardia',
  MN: 'Lombardia',
  MB: 'Lombardia',
  PV: 'Lombardia',
  SO: 'Lombardia',
  VA: 'Lombardia',
  RM: 'Lazio',
  FR: 'Lazio',
  LT: 'Lazio',
  RI: 'Lazio',
  VT: 'Lazio',
  NA: 'Campania',
  AV: 'Campania',
  BN: 'Campania',
  CE: 'Campania',
  SA: 'Campania',
  TO: 'Piemonte',
  AL: 'Piemonte',
  AT: 'Piemonte',
  BI: 'Piemonte',
  CN: 'Piemonte',
  NO: 'Piemonte',
  VB: 'Piemonte',
  VC: 'Piemonte',
  FI: 'Toscana',
  AR: 'Toscana',
  GR: 'Toscana',
  LI: 'Toscana',
  LU: 'Toscana',
  MS: 'Toscana',
  PI: 'Toscana',
  PO: 'Toscana',
  PT: 'Toscana',
  SI: 'Toscana',
};

// Category to subcategory mapping
const _categoryToSubcategories: Record<string, Array<{ label: string; value: string }>> = {
  electronics: [
    { label: 'Smartphones', value: 'smartphones' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Tablets', value: 'tablets' },
    { label: 'Accessories', value: 'accessories' },
  ],
  clothing: [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Kids', value: 'kids' },
    { label: 'Sports', value: 'sports' },
  ],
  home: [
    { label: 'Furniture', value: 'furniture' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Decor', value: 'decor' },
    { label: 'Garden', value: 'garden' },
  ],
  books: [
    { label: 'Fiction', value: 'fiction' },
    { label: 'Non-Fiction', value: 'non-fiction' },
    { label: 'Educational', value: 'educational' },
    { label: 'Comics', value: 'comics' },
  ],
};

export const autoFillConfig: WizardConfig = {
  id: 'auto-fill-demo',
  title: 'Product Registration',
  steps: [
    {
      id: 'location',
      title: 'Location',
      fieldGroups: [
        {
          id: 'address',
          title: 'Address Information',
          description: 'Select province to auto-fill region',
          fields: [
            {
              id: 'street',
              name: 'street',
              label: 'Street Address',
              type: 'text',
              required: true,
              placeholder: 'Via Roma, 1',
            },
            {
              id: 'city',
              name: 'city',
              label: 'City',
              type: 'text',
              required: true,
              placeholder: 'Milano',
            },
            {
              id: 'province',
              name: 'province',
              label: 'Province',
              type: 'select',
              required: true,
              options: [
                { label: 'Milano (MI)', value: 'MI' },
                { label: 'Roma (RM)', value: 'RM' },
                { label: 'Napoli (NA)', value: 'NA' },
                { label: 'Torino (TO)', value: 'TO' },
                { label: 'Firenze (FI)', value: 'FI' },
                { label: 'Bergamo (BG)', value: 'BG' },
                { label: 'Brescia (BS)', value: 'BS' },
              ],
              // onChange auto-fills the region field
              // Return an object with field names and values to update
              onChange: (value) => {
                const region = provinceToRegion[value as string];
                if (region) {
                  return { region };
                }
                return undefined;
              },
            },
            {
              id: 'region',
              name: 'region',
              label: 'Region',
              type: 'text',
              required: true,
              placeholder: 'Auto-filled from province',
              // Read-only since it's auto-filled
              // disabled: true, // Uncomment to make it read-only
            },
            {
              id: 'postalCode',
              name: 'postalCode',
              label: 'Postal Code',
              type: 'text',
              required: true,
              placeholder: '20100',
              validations: [
                {
                  type: 'pattern',
                  value: '^\\d{5}$',
                  message: 'Enter a valid 5-digit postal code',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'product',
      title: 'Product',
      fieldGroups: [
        {
          id: 'category-selection',
          title: 'Product Category',
          description: 'Category selection updates available subcategories',
          fields: [
            {
              id: 'category',
              name: 'category',
              label: 'Category',
              type: 'select',
              required: true,
              options: [
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
                { label: 'Home & Garden', value: 'home' },
                { label: 'Books', value: 'books' },
              ],
              // onChange clears the subcategory when category changes
              // Note: For dynamic options, use conditional showIf or pre-populate all options
              onChange: () => {
                // Clear the subcategory when category changes
                return { subcategory: '' };
              },
            },
            {
              id: 'subcategory',
              name: 'subcategory',
              label: 'Subcategory',
              type: 'select',
              required: true,
              // All options available - in production, use dynamic loading or separate fields per category
              options: [
                { label: 'Smartphones', value: 'smartphones' },
                { label: 'Laptops', value: 'laptops' },
                { label: 'Tablets', value: 'tablets' },
                { label: 'Accessories', value: 'accessories' },
                { label: 'Men', value: 'men' },
                { label: 'Women', value: 'women' },
                { label: 'Kids', value: 'kids' },
                { label: 'Sports', value: 'sports' },
                { label: 'Furniture', value: 'furniture' },
                { label: 'Kitchen', value: 'kitchen' },
                { label: 'Decor', value: 'decor' },
                { label: 'Garden', value: 'garden' },
                { label: 'Fiction', value: 'fiction' },
                { label: 'Non-Fiction', value: 'non-fiction' },
                { label: 'Educational', value: 'educational' },
                { label: 'Comics', value: 'comics' },
              ],
              // Disabled until category is selected
              disabledIf: {
                field: 'category',
                operator: 'isEmpty',
                value: true,
              },
            },
          ],
        },
        {
          id: 'product-details',
          title: 'Product Details',
          fields: [
            {
              id: 'productName',
              name: 'productName',
              label: 'Product Name',
              type: 'text',
              required: true,
              placeholder: 'Enter product name',
            },
            {
              id: 'productPrice',
              name: 'productPrice',
              label: 'Price (EUR)',
              type: 'number',
              required: true,
              placeholder: '99.99',
              validations: [{ type: 'min', value: 0.01, message: 'Price must be positive' }],
              // Auto-calculate VAT when price changes
              // Return an object with field values to update
              onChange: (value) => {
                const price = Number(value);
                if (price > 0) {
                  const vat = (price * 0.22).toFixed(2);
                  const total = (price * 1.22).toFixed(2);
                  return {
                    vatAmount: vat,
                    totalPrice: total,
                  };
                }
                return undefined;
              },
            },
            {
              id: 'vatAmount',
              name: 'vatAmount',
              label: 'VAT (22%)',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-calculated',
            },
            {
              id: 'totalPrice',
              name: 'totalPrice',
              label: 'Total Price',
              type: 'text',
              disabled: true,
              placeholder: 'Auto-calculated',
            },
          ],
        },
      ],
    },
    {
      id: 'confirmation',
      title: 'Confirm',
      fieldGroups: [
        {
          id: 'confirm',
          fields: [
            {
              id: 'acceptTerms',
              name: 'acceptTerms',
              label: 'Terms',
              type: 'single-checkbox',
              checkboxLabel: 'I confirm all information is correct',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const autoFillCode = `const config: WizardConfig = {
  id: 'product-registration',
  steps: [{
    id: 'location',
    title: 'Location',
    fieldGroups: [{
      id: 'address',
      fields: [
        {
          id: 'province',
          name: 'province',
          label: 'Province',
          type: 'select',
          options: [
            { label: 'Milano (MI)', value: 'MI' },
            { label: 'Roma (RM)', value: 'RM' },
            // ...more options
          ],
          // Auto-fill region when province changes
          // Return an object with field values to update
          onChange: (value) => {
            const regionMap = { MI: 'Lombardia', RM: 'Lazio' };
            const region = regionMap[value];
            return region ? { region } : undefined;
          },
        },
        {
          id: 'region',
          name: 'region',
          label: 'Region',
          type: 'text',
          // Read-only, auto-filled from province
        },
      ],
    }],
  }],
};`;
