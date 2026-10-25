import { ServiceItem } from "@/types";

export const SERVICES: ServiceItem[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    summary: "Production websites, client portals, and web applications built with Next.js, TypeScript, and clean API integrations.",
    intro: "We build structured, fast, and maintainable web platforms designed around clear business workflows. Every build emphasizes responsive performance, accessibility standards, clean code architecture, and complete documentation handover.",
    problemsSolved: [
      "Slow, bloated legacy websites that lose prospective clients before pages finish loading.",
      "Fragmented marketing sites disconnected from backend CRM, databases, and authentication systems.",
      "Unmaintainable theme codebases that break during routine updates and lack architectural tests.",
      "Poor accessibility and responsive degradation across mobile and tablet viewports."
    ],
    capabilities: [
      {
        title: "Marketing & Marketing-Tech Sites",
        description: "Static and server-rendered marketing sites with structured content modeling, instant page transitions, and sub-second load times."
      },
      {
        title: "Web Platforms & Dashboards",
        description: "Authenticated client portals, reporting interfaces, and administrative consoles built with strict type safety and component modularity."
      },
      {
        title: "API & Data Integrations",
        description: "Direct connections to payment processors, customer databases, headless CMS endpoints, and external REST or GraphQL services."
      },
      {
        title: "Accessibility & Technical Audits",
        description: "WCAG 2.2 AA compliance audits, semantic markup refactoring, and keyboard navigation engineering."
      }
    ],
    deliverables: [
      "Fully typed TypeScript codebase in Git version control",
      "Production deployment configuration (Vercel, AWS, or custom Linux servers)",
      "Automated test coverage for core business paths and data mutations",
      "Handover documentation covering environment variables, build steps, and maintenance routines"
    ],
    process: [
      { phase: "Architecture & Spec", description: "Define data schemas, component seams, external API contracts, and responsive layout blueprints." },
      { phase: "Component Implementation", description: "Construct modular React/Next.js components with clean CSS and strict prop definitions." },
      { phase: "System Integration", description: "Connect databases, forms, third-party APIs, and deployment pipelines." },
      { phase: "Verification & Handover", description: "Run automated Lighthouse audits, browser testing, and transfer source ownership to your team." }
    ],
    scopeBoundaries: {
      included: [
        "Front-end and full-stack web implementation as agreed in project scope",
        "Semantic HTML structure, WCAG 2.2 AA accessibility baseline, responsive layouts",
        "CI/CD deployment pipeline setup and production build verification",
        "30-day post-launch bug triage for in-scope code"
      ],
      excluded: [
        "Unbudgeted third-party SaaS subscription fees (hosting, CMS licenses, paid fonts)",
        "Net-new feature additions after functional specification sign-off",
        "Continuous 24/7 webmaster content authoring unless contracted separately"
      ]
    },
    faqs: [
      {
        question: "What frameworks do you build with?",
        answer: "We primarily build with Next.js (App Router), TypeScript, React, and Tailwind CSS. When a project demands it, we also support Node.js backends and standard relational databases such as PostgreSQL."
      },
      {
        question: "Do you hand over full source code ownership?",
        answer: "Yes. Upon final invoice settlement, your organization receives full ownership of all repository code, assets, and deployment documentation."
      },
      {
        question: "How do you handle hosting and deployment?",
        answer: "We configure deployments to your preferred infrastructure provider (such as Vercel, AWS, Cloudflare, or dedicated virtual servers) under your organization's own account."
      }
    ],
    seoTitle: "Web Development Services",
    metaDescription: "Production web applications, customer portals, and marketing platforms built with Next.js and TypeScript. Clean code, tested integrations, and full handover.",
    enabled: true
  },
  {
    slug: "app-development",
    title: "App Development",
    shortTitle: "App Dev",
    summary: "Scoped application design, API engineering, MVPs, and production web and cross-platform apps.",
    intro: "We take product concepts from validated problem statements to production-ready software. We focus on clean data schemas, predictable state management, reliable API contracts, and testable domain logic.",
    problemsSolved: [
      "Prototypes trapped in slide decks or fragile no-code setups that cannot handle concurrent users.",
      "Poor state management causing data inconsistencies and phantom UI updates.",
      "Rigid application architectures that prevent new feature rollouts without breaking existing modules.",
      "Lack of structured testing leading to user-reported regressions on production releases."
    ],
    capabilities: [
      {
        title: "Product MVP Engineering",
        description: "Rapid, disciplined development of initial commercial software versions scoped strictly around core customer value."
      },
      {
        title: "Progressive & Cross-Platform Apps",
        description: "High-performance web apps and responsive application shells with offline caching, push notifications, and native-feeling interfaces."
      },
      {
        title: "API Design & Microservices",
        description: "RESTful and RPC backend services with strict validation schemas, token authentication, and documented Swagger/OpenAPI specifications."
      },
      {
        title: "Database Modeling & Migration",
        description: "Relational schema design, database indexing, data validation rules, and automated migration scripts."
      }
    ],
    deliverables: [
      "Modular application repository with end-to-end type safety",
      "Database migration scripts and seed datasets",
      "Authentication and session management implementation",
      "API contract specifications and postman/curl test collections",
      "Staging and production environment configurations"
    ],
    process: [
      { phase: "Product Discovery", description: "Establish user stories, technical risks, data models, and minimum viable feature boundaries." },
      { phase: "Core Architecture", description: "Set up the database, authentication gates, API routes, and base application framework." },
      { phase: "Feature Execution", description: "Build user flows systematically against test suites and staged preview deployments." },
      { phase: "Release Readiness", description: "Conduct security review, load testing on critical paths, and package deployment assets." }
    ],
    scopeBoundaries: {
      included: [
        "Full application development defined within the agreed functional specification",
        "Role-based access control, data encryption in transit, and secure credential storage",
        "Integration test suites for primary business logic and database writes",
        "Technical documentation for internal engineering onboarding"
      ],
      excluded: [
        "Apple App Store or Google Play developer account registration fees",
        "App Store review disputes stemming from business model compliance rather than technical bugs",
        "Unbounded third-party API usage fees or third-party service outages"
      ]
    },
    faqs: [
      {
        question: "Do you build web apps or native mobile apps?",
        answer: "We specialize in modern web applications, progressive web apps (PWAs), and cross-platform application architectures. If your product specifically requires native Swift/Kotlin hardware access, we clarify that during initial discovery."
      },
      {
        question: "How do you manage version releases?",
        answer: "We use Git branching with pull request reviews, automated CI builds, and isolated staging environments before merging into production."
      }
    ],
    seoTitle: "Application Development & Engineering",
    metaDescription: "Engineered web and cross-platform applications. From MVP discovery to production release with clean APIs and reliable database architecture.",
    enabled: true
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Marketing",
    summary: "Technical marketing execution, landing page testing, attribution modeling, and structured campaign workflows.",
    intro: "We bridge the gap between marketing strategy and technical execution. We build conversion-focused landing pages, configure server-side analytics, and eliminate tracking data loss without making unsupported performance guarantees.",
    problemsSolved: [
      "Ad spend wasted on slow, untracked landing pages with confusing visual hierarchies.",
      "Broken analytics and attribution gaps caused by browser privacy restrictions and misconfigured tags.",
      "Marketing teams unable to deploy landing page variants without waiting weeks for developer availability.",
      "Inaccurate conversion tracking polluting ad platform machine learning algorithms."
    ],
    capabilities: [
      {
        title: "Conversion Landing Page Systems",
        description: "Lightweight, high-converting landing page templates engineered for instant mobile rendering and clear message hierarchy."
      },
      {
        title: "Attribution & Server-Side Tagging",
        description: "Server-side tracking setups (Meta CAPI, Google Tag Manager Server, PostHog) for accurate, privacy-compliant event measurement."
      },
      {
        title: "Audience & Funnel Instrumentation",
        description: "Deep user flow instrumentation measuring funnel drop-offs, form abandonment, and interaction depth."
      },
      {
        title: "Campaign Operations & Asset Assembly",
        description: "Systematic coordination of campaign creative, URL taxonomy, UTM parameters, and lead ingestion pipelines."
      }
    ],
    deliverables: [
      "Production-ready landing pages with automated lighthouse performance scores > 90",
      "Documented tag taxonomy and event tracking specification document",
      "Server-side conversion API pipeline connected to marketing channels",
      "Attribution dashboard verification report"
    ],
    process: [
      { phase: "Audit & Instrumentation", description: "Audit existing analytics, verify pixel firing accuracy, and map tracking gaps." },
      { phase: "Landing Infrastructure", description: "Construct high-speed landing pages aligned to specific search and campaign hooks." },
      { phase: "Telemetry Validation", description: "Send test transactions through conversion paths and confirm server-side receipt." },
      { phase: "Ongoing Coordination", description: "Monitor event flow consistency and update page experiments based on observed data." }
    ],
    scopeBoundaries: {
      included: [
        "Technical configuration of tracking infrastructure, landing pages, and lead delivery hooks",
        "Documentation of event triggers and data schema for ongoing internal management",
        "Testing across common browser configurations and ad platform debugging consoles"
      ],
      excluded: [
        "Direct ad spend billing (ad budgets are paid directly to ad platforms by the client)",
        "Guaranteed conversion rates or customer acquisition costs (outcomes depend on market demand, pricing, and external factors)",
        "Unsolicited email blasting or non-compliant outbound scraping"
      ]
    },
    faqs: [
      {
        question: "Do you manage our ad spend directly?",
        answer: "No. Your business maintains direct billing accounts with platforms like Google and Meta. We handle technical execution, landing page engineering, tracking infrastructure, and campaign setup."
      },
      {
        question: "Do you guarantee specific ROAS or conversion lifts?",
        answer: "No. Anyone promising guaranteed marketing ROAS is making unverified claims. We guarantee technical accuracy, fast page load times, verified conversion tracking, and honest reporting."
      }
    ],
    seoTitle: "Technical Digital Marketing & Analytics",
    metaDescription: "Conversion landing page engineering, server-side attribution, and technical marketing infrastructure built for measurable client acquisition.",
    enabled: true
  },
  {
    slug: "seo-aeo",
    title: "SEO and AEO",
    shortTitle: "SEO & AEO",
    summary: "Technical SEO, Schema markup, crawlability optimization, and Answer Engine Optimization structured for AI discovery.",
    intro: "Search visibility now requires two disciplines: technical crawlability for traditional search engines, and factual, question-directed content structured for answer engines and AI assistants. We optimize code, schema, and page architecture for both.",
    problemsSolved: [
      "Client websites hidden from search crawlers due to client-side rendering issues and poor internal linking.",
      "Thin, repetitive marketing text that fails to provide clear answers to target buyer search queries.",
      "Absence of structured JSON-LD data leaving search engines unable to parse products, services, and organization entities.",
      "Loss of organic discovery in AI search interfaces like Perplexity, ChatGPT Search, and Google AI Overviews."
    ],
    capabilities: [
      {
        title: "Technical SEO Foundations",
        description: "Core Web Vitals optimization, XML sitemap generation, canonicalization, crawl budget management, and robots rules."
      },
      {
        title: "Answer Engine Optimization (AEO)",
        description: "Structuring page content into direct, authoritative question-and-answer patterns that answer engines can extract and cite."
      },
      {
        title: "JSON-LD Entity Modeling",
        description: "Deep Schema markup implementation (Organization, Service, BreadcrumbList, FAQPage) tied to visible page content."
      },
      {
        title: "Content Architecture & Information Scent",
        description: "Logical directory structures, internal topic clusters, and semantic breadcrumbs that establish topical authority."
      }
    ],
    deliverables: [
      "Comprehensive technical crawl report identifying indexation errors and remediation steps",
      "Custom JSON-LD schema implementation integrated directly into page templates",
      "Server-side rendered metadata, OpenGraph tags, and dynamic sitemap generators",
      "On-page content optimization blueprints tailored for high-intent search queries"
    ],
    process: [
      { phase: "Technical Crawl Audit", description: "Inspect server responses, index status, canonical tags, rendering bottlenecks, and status codes." },
      { phase: "Architecture Refactor", description: "Repair heading hierarchies, optimize metadata templates, and deploy structured schema." },
      { phase: "Answer Modeling", description: "Rewrite key section answers to directly answer specific questions asked by decision-makers." },
      { phase: "Verification & Monitoring", description: "Submit verified sitemaps to Search Console and monitor index coverage and crawl health." }
    ],
    scopeBoundaries: {
      included: [
        "Code-level technical fixes, schema generation, and site architecture refactoring",
        "Editorial guidelines for answer-oriented service and product explanations",
        "Google Search Console configuration and index coverage verification"
      ],
      excluded: [
        "Guarantees of rank 1 placement or promised organic traffic numbers",
        "Guarantees that an AI assistant will cite a specific domain in its answers",
        "Paid backlink purchasing or low-quality directory submission schemes"
      ]
    },
    faqs: [
      {
        question: "What is AEO (Answer Engine Optimization)?",
        answer: "AEO is the practice of formatting page content, facts, and structured data so that large language models and search engines can parse direct answers to user queries without hallucinating or losing context."
      },
      {
        question: "Can you guarantee first-page Google rankings?",
        answer: "No. Search engine ranking algorithms use hundreds of proprietary signals that no external agency controls. We provide rigorous technical hygiene, crawlability, and clear content structuring."
      }
    ],
    seoTitle: "Technical SEO and AEO Services",
    metaDescription: "Technical search engine optimization and Answer Engine Optimization (AEO). Structured schema, Core Web Vitals, and content engineered for AI discovery.",
    enabled: true
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortTitle: "AI Automation",
    summary: "Targeted language model integrations, document processing, internal search, and automated review pipelines with human oversight.",
    intro: "We deploy practical AI tools where they measurably reduce manual effort, while keeping strict deterministic checks and human approval gates for high-consequence business actions.",
    problemsSolved: [
      "Staff spending hours manually reading, classifying, and extracting structured data from unstructured documents and emails.",
      "Customer inquiries delayed because support teams cannot search internal policies and product docs rapidly.",
      "Experimental AI scripts leaking sensitive data to public cloud models without access controls.",
      "Fragile AI prototypes hallucinating incorrect customer-facing information without validation gates."
    ],
    capabilities: [
      {
        title: "Document Classification & Extraction",
        description: "Automated pipelines that ingest PDFs, invoices, and intake emails, extract validated data schemas, and write to operational databases."
      },
      {
        title: "Internal Knowledge Retrieval (RAG)",
        description: "Private search engines indexing company manuals, technical specs, and standard operating procedures for internal staff reference."
      },
      {
        title: "Drafting & Assistance Workflows",
        description: "Systems that prepare suggested client replies or summaries for review, keeping human employees in the decision loop."
      },
      {
        title: "Model Cost & Latency Optimization",
        description: "Benchmarking smaller open-weight models against commercial APIs to reduce ongoing token costs and processing latency."
      }
    ],
    deliverables: [
      "Containerized AI pipeline or cloud function code with structured input/output schemas",
      "Vector database and retrieval pipeline configuration",
      "Validation test suite measuring extraction accuracy and hallucination rates",
      "API usage monitoring and cost ceiling controls"
    ],
    process: [
      { phase: "Feasibility Assessment", description: "Evaluate task data, error tolerance, latency requirements, and privacy constraints." },
      { phase: "Pipeline Engineering", description: "Develop deterministic pre-processing rules, prompt contracts, and schema validation layers." },
      { phase: "Evaluation Testing", description: "Run test datasets through the pipeline to measure accuracy against human baseline standards." },
      { phase: "Deployment with Review UI", description: "Integrate review interfaces that allow staff to approve or correct AI outputs before execution." }
    ],
    scopeBoundaries: {
      included: [
        "Custom integration of vetted LLM APIs or self-hosted models within your private infrastructure",
        "Deterministic schema validation rejecting malformed or low-confidence outputs",
        "Human-in-the-loop review interfaces for consequential business steps",
        "Data boundary rules preventing internal data from training external foundation models"
      ],
      excluded: [
        "Unsupervised autonomous decision-making in legal, medical, or financial compliance contexts",
        "Underlying API token fees charged by third-party model providers",
        "Claims that AI models are 100% accurate or infallible"
      ]
    },
    faqs: [
      {
        question: "Is our proprietary data used to train public AI models?",
        answer: "No. We configure commercial enterprise endpoints with zero-data-retention agreements or deploy self-hosted models within your private cloud environment."
      },
      {
        question: "How do you prevent AI hallucinations?",
        answer: "We pair language models with strict retrieval constraints (RAG), typed schema validators (like Zod), and deterministic confidence thresholds that flag low-certainty outputs for human review."
      }
    ],
    seoTitle: "AI Automation & Enterprise Integration",
    metaDescription: "Deploy practical AI pipelines for document extraction, internal knowledge search, and assisted workflows. Strict validation and human oversight.",
    enabled: true
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    shortTitle: "Workflows",
    summary: "Reliable business logic pipelines connecting CRMs, databases, messaging, and internal tools with error handling and logging.",
    intro: "Not every process needs an AI model. Many of the highest-leverage operational improvements come from dependable, deterministic automation: event triggers, data transformations, retry mechanisms, and auditable logging between existing software tools.",
    problemsSolved: [
      "Manual copy-pasting of leads and order details between web forms, CRMs, spreadsheets, and accounting tools.",
      "Missed customer notifications and delayed handoffs between sales and engineering teams.",
      "Silent automation failures in fragile webhook setups that lose data without notifying anyone.",
      "Lack of centralized logs and ownership when automated business steps fail unexpectedly."
    ],
    capabilities: [
      {
        title: "Cross-System Integration",
        description: "Direct API integration between tools like HubSpot, Salesforce, Stripe, Slack, PostgreSQL, and custom backends."
      },
      {
        title: "Event-Driven Pipelines",
        description: "Webhook listeners and message queue architectures that process transactions reliably under fluctuating load."
      },
      {
        title: "Error Handling & Automatic Retries",
        description: "Exponential backoff algorithms, dead-letter queues, and operational alert channels when external APIs return errors."
      },
      {
        title: "Audit Logging & Operational Telemetry",
        description: "Structured transaction logs showing exact input payloads, timestamped execution steps, and delivery receipts."
      }
    ],
    deliverables: [
      "Production webhook service or serverless automation workflows",
      "Data mapping documentation detailing transformations and field validation rules",
      "Alert notification integration for unexpected pipeline failures",
      "Runbook detailing routine maintenance, token refreshes, and failure recovery"
    ],
    process: [
      { phase: "Workflow Mapping", description: "Document current manual steps, trigger conditions, field mappings, and exception states." },
      { phase: "Integration Build", description: "Implement connector code with input sanitization, idempotent processing, and retries." },
      { phase: "Failure Simulation", description: "Simulate downstream API outages to verify that data is safely queued rather than dropped." },
      { phase: "Production Cutover", description: "Switch operational traffic to the automated pipeline and verify live data accuracy." }
    ],
    scopeBoundaries: {
      included: [
        "Development and testing of specified integration workflows between authorized systems",
        "Idempotent processing preventing duplicate records during network retries",
        "Alert routing to team email or Slack channels upon unrecoverable exceptions"
      ],
      excluded: [
        "Subscription fees for integration platforms (Zapier, Make, AWS, etc.)",
        "Remediation of bugs or unplanned outages inside third-party SaaS vendors",
        "Modifications to systems where client does not possess API access credentials"
      ]
    },
    faqs: [
      {
        question: "What happens if a connected software goes down?",
        answer: "Our automations implement queuing with exponential backoff retries. If an endpoint remains unreachable after configured retry limits, the payload is preserved in a dead-letter queue and an alert is sent."
      },
      {
        question: "Do you use no-code platforms or custom code?",
        answer: "We support both. When tools like n8n or Make fit the business need, we use them for speed and client visibility. For high-volume or sensitive operations, we write custom TypeScript/Node microservices."
      }
    ],
    seoTitle: "Workflow Automation & System Integration",
    metaDescription: "Connect business systems, eliminate manual data entry, and establish reliable event-driven automations with built-in error handling and logs.",
    enabled: true
  },
  {
    slug: "soc",
    title: "Security Operations Center (SOC) Services",
    shortTitle: "SOC Services",
    summary: "Scoped security monitoring support, log analysis, alert triage workflows, and incident escalation planning.",
    intro: "We help growing organizations establish practical security visibility. Rather than selling generic promises, we agree on specific log sources, alert triage rules, and clear escalation protocols tailored to your technical architecture.",
    problemsSolved: [
      "Security tools generating hundreds of unprioritized alerts that overwhelm internal engineers.",
      "Absence of centralized log aggregation across cloud accounts, servers, and identity providers.",
      "Unclear escalation chains when anomalous account behavior or potential breaches are detected.",
      "Inability to demonstrate basic security monitoring during vendor security evaluations."
    ],
    capabilities: [
      {
        title: "Log Source Review & Centralization",
        description: "Assessing critical telemetry sources (AWS CloudTrail, Google Workspace, GitHub, firewall logs) and configuring ingestion pipelines."
      },
      {
        title: "SIEM & Alert Triage Engineering",
        description: "Configuring detection rules and filtering noise so your team receives actionable alerts rather than endless false positives."
      },
      {
        title: "Escalation Runbooks & Protocols",
        description: "Documenting exact response steps, roles, and communication trees for severity-graded security incidents."
      },
      {
        title: "Periodic Telemetry Audits",
        description: "Scheduled reviews verifying that log agents are actively reporting and detection rules remain aligned with system updates."
      }
    ],
    deliverables: [
      "Log architecture assessment and coverage matrix",
      "Documented SIEM detection rules and alert severity definitions",
      "Incident triage and escalation protocol runbook",
      "Periodic security monitoring summary reports during active retainers"
    ],
    process: [
      { phase: "Source Discovery", description: "Inventory digital assets, identities, cloud accounts, and critical data repositories." },
      { phase: "Ingestion & Rules", description: "Connect log streams to the agreed monitoring platform and calibrate baseline detection rules." },
      { phase: "Triage Calibration", description: "Refine alert thresholds over an initial operating period to suppress benign noise." },
      { phase: "Operational Handover", description: "Establish communication channels and escalation workflows with your internal engineering leads." }
    ],
    scopeBoundaries: {
      included: [
        "Setup, tuning, and agreed monitoring workflows across documented and approved log sources",
        "Alert triage and notification delivery according to agreed operating hours and response windows",
        "Documented escalation steps for verified critical security incidents"
      ],
      excluded: [
        "Unbudgeted 24/7/365 active human monitoring unless explicitly agreed in a dedicated SLA contract",
        "Direct emergency on-site incident forensics or legal representation",
        "Monitoring systems or accounts not explicitly listed in the written service schedule"
      ]
    },
    faqs: [
      {
        question: "Do you provide round-the-clock 24/7 human eyes on glass?",
        answer: "We offer agreed coverage windows and escalation tiers defined in writing. We do not make generic claims of 24/7 monitoring unless your organization explicitly contracts a dedicated continuous coverage tier."
      },
      {
        question: "What log sources can you monitor?",
        answer: "Common sources include AWS CloudTrail, Google Cloud Audit, Microsoft Entra/365, GitHub audit logs, Cloudflare access logs, and application authentication endpoints."
      }
    ],
    seoTitle: "Security Operations & Log Triage Support",
    metaDescription: "Pragmatic SOC support, log source review, SIEM tuning, and structured alert triage. Clear boundaries, documented runbooks, and defined escalation paths.",
    enabled: true
  },
  {
    slug: "vapt",
    title: "Vulnerability Assessment & Penetration Testing (VAPT)",
    shortTitle: "VAPT",
    summary: "Authorized security assessments of web apps, APIs, and cloud infrastructure with verifiable findings and remediation guidance.",
    intro: "We conduct methodical security assessments of approved web applications, APIs, and network perimeters. Every finding is backed by reproducible evidence, risk severity justification, and step-by-step remediation guidance.",
    problemsSolved: [
      "Unknown vulnerabilities in web applications that could expose customer data or allow unauthorized access.",
      "Enterprise prospective clients requesting third-party penetration testing reports before closing contracts.",
      "Security scanning tools producing confusing reports with hundred of unverified false positives.",
      "Lack of actionable guidance on how engineering teams can remediate identified weaknesses."
    ],
    capabilities: [
      {
        title: "Web Application Penetration Testing",
        description: "Manual and automated testing against OWASP Top 10 vulnerabilities, authentication bypasses, IDOR, and injection flaws."
      },
      {
        title: "REST & GraphQL API Testing",
        description: "Testing API endpoint authorization logic, rate limiting, parameter tampering, and token security boundaries."
      },
      {
        title: "Cloud Configuration Auditing",
        description: "Reviewing IAM roles, bucket permissions, network security groups, and exposed administrative ports."
      },
      {
        title: "Remediation Retesting",
        description: "Re-assessing patched vulnerabilities to confirm that engineering fixes completely mitigate the identified risk."
      }
    ],
    deliverables: [
      "Executive summary presenting risk posture for leadership and compliance auditors",
      "Detailed technical report listing each finding with CVSS score, business impact, and step-by-step reproduction steps",
      "Specific code and architectural remediation recommendations",
      "Formal Letter of Attestation upon conclusion of testing and retesting"
    ],
    process: [
      { phase: "Authorization & Scoping", description: "Execute mutual Rules of Engagement (RoE), confirm asset ownership, and agree on test windows." },
      { phase: "Reconnaissance & Testing", description: "Perform authorized reconnaissance, vulnerability scanning, and manual exploitation verification." },
      { phase: "Evidence Synthesis", description: "Compile validated findings, eliminate false positives, and formulate precise remediation steps." },
      { phase: "Report Briefing & Retest", description: "Present report to your engineering leads and conduct retesting once patches are deployed." }
    ],
    scopeBoundaries: {
      included: [
        "Testing conducted strictly against assets specified in the signed Rules of Engagement document",
        "Safe testing methodologies designed to avoid service degradation or production data corruption",
        "One round of remediation verification testing within 60 days of initial report delivery"
      ],
      excluded: [
        "Testing any system, domain, or IP address not explicitly owned and authorized in writing",
        "Physical break-ins, social engineering of employees, or destructive denial-of-service (DDoS) attacks",
        "Guarantees that a system is 100% impenetrable (security assessments reflect system posture at the time of testing)"
      ]
    },
    faqs: [
      {
        question: "Do you require written authorization before testing?",
        answer: "Yes, without exception. We require a signed Rules of Engagement (RoE) confirming that your organization owns or is legally authorized to commission testing on the target assets."
      },
      {
        question: "Can testing take place on production environments?",
        answer: "We recommend staging environments that mirror production. When production testing is required, we schedule specific testing windows and use non-destructive payloads to protect live operations."
      },
      {
        question: "Do you provide a report acceptable to enterprise clients?",
        answer: "Yes. Our reports follow industry standards with CVSS scoring, technical proof-of-concept evidence, and an executive attestation summary suitable for enterprise compliance reviews."
      }
    ],
    seoTitle: "Vulnerability Assessment & Penetration Testing (VAPT)",
    metaDescription: "Authorized penetration testing for web applications, APIs, and cloud assets. Verifiable proof-of-concept findings, CVSS scoring, and actionable remediation.",
    enabled: true
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
