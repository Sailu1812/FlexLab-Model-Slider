import { SERVICES } from './services';

export function getStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PhysicalTherapy',
    name: 'FlexLab Physical Therapy',
    description:
      'Premier movement-focused physical therapy clinic specializing in orthopedic rehabilitation, sports injury recovery, spine care, and movement retraining.',
    medicalSpecialty: 'Physical Therapy',
    currenciesAccepted: 'USD',
    paymentAccepted: [
      'Medicare',
      'MassHealth (Medicaid)',
      'Tricare',
      'GIC / Unicare',
      'Blue Cross Blue Shield of MA',
      'Harvard Pilgrim Health Care',
      'Tufts Health Plan',
      'Aetna',
      'Cigna',
      'United Healthcare',
      'Fallon Health',
      'Multiplan / PHCS',
      "Workers' Compensation",
      'Auto and PIP',
      'Cash Pay'
    ],
    // Authentic placeholders per brief guidelines — no fabricated personal information
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Clinic Address Placeholder]',
      addressLocality: 'Boston',
      addressRegion: 'MA',
      postalCode: '[02108]',
      addressCountry: 'US'
    },
    telephone: '[Clinic Telephone Number]',
    openingHours: ['Mo-Fr 07:00-19:00', 'Sa 08:00-14:00'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Physical Therapy Services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.title,
          description: service.description,
          code: {
            '@type': 'MedicalCode',
            code: service.number,
            codingSystem: 'FlexLab-Clinical-Index'
          }
        },
        position: index + 1
      }))
    }
  };
}
