export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  intro: string;
  problemsSolved: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  process: {
    phase: string;
    description: string;
  }[];
  scopeBoundaries: {
    included: string[];
    excluded: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  seoTitle: string;
  metaDescription: string;
  enabled: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  projectDescription: string;
  budgetRange?: string;
  timeline?: string;
  consent: boolean;
  _honeypot?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
