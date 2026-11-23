// Aman's PM Portfolio & Interactive PM System Sandbox
// Original concept: Systems & Product Primitives + The PM Decision Game

window.PORTFOLIO_DATA = {
  profile: {
    name: "Aman",
    shortName: "Aman",
    initials: "as",
    role: "Product Manager — Data & AI Platform | 0-to-1 Systems",
    tagline: "Building <span>data &amp; AI systems</span> that scale for humans.",
    bio: "I’m a technical Product Manager leading enterprise AI platforms at HCLTech, scaling 0-to-1 software systems, and researching human-machine decision loops. MIT Solve Fellow.",
    email: "aman@example.com",
    location: "India",
    statusBadge: "Data & AI @ HCLTech • MIT Solve Fellow",
    socials: {
      linkedin: "https://www.linkedin.com/",
      twitter: "https://x.com/",
      github: "https://github.com/Aman-system-design"
    }
  },

  primitives: [
    { id: "systems", color: "blue", label: "Systems Architecture", icon: "⬡" },
    { id: "zerotoone", color: "amber", label: "0-to-1 Products", icon: "△" },
    { id: "telemetry", color: "green", label: "Field Telemetry", icon: "◇" },
    { id: "models", color: "purple", label: "PM Mental Models", icon: "○" }
  ],

  work: {
    current: {
      company: "HCLTech",
      url: "https://www.hcltech.com/",
      badge: "Current Role",
      role: "Product Manager — Data & AI Solutions",
      period: "2023 – Present",
      summary: "Leading 0-to-1 data platform and enterprise AI capability rollouts. Architecting developer workflows, telemetry dashboards, and foundational model integrations for tier-1 enterprise accounts.",
      metrics: [
        { label: "Pipeline Efficiency", value: "3.5×", detail: "reduction in automated pipeline cycles" },
        { label: "Active Copilot Conversion", value: "85%+", detail: "workflow adoption across target teams" },
        { label: "Data Scale", value: "Enterprise", detail: "multi-tenant security & telemetry" }
      ],
      highlights: [
        "Spearheaded enterprise AI copilot strategy, turning ambiguous workflow friction into verified prompt-engineered agent toolchains.",
        "Partnered with data engineering and ML teams to reduce inference latency by 40% using tiered caching and model quantization.",
        "Created an internal 'Explainability & Safety Gate' pattern that cut false user hallucinations by 55%."
      ]
    },
    previous: [
      {
        company: "MIT Solve Initiative",
        role: "Innovation Fellow & 0-to-1 Product Lead",
        period: "2022 – 2023",
        summary: "Selected for global challenge cohort to design and validate scalable technology products for high-impact social challenges.",
        bullets: [
          "Ran end-to-end customer discovery across 60+ user interviews to define MVP scope and user journey maps.",
          "Delivered zero-to-one product prototype adopted by early pilot partners, proving core retention loop."
        ]
      },
      {
        company: "Enterprise Analytics Systems",
        role: "Associate Product Manager / Systems Engineer",
        period: "2021 – 2022",
        summary: "Led analytics dashboard rebuild and self-serve querying interface for operational teams.",
        bullets: [
          "Redesigned information hierarchy, eliminating 4 manual reporting steps and cutting ticket churn by 30%.",
          "Engineered reusable telemetry metrics adopted across 8 internal engineering teams."
        ]
      }
    ]
  },

  caseStudies: [
    {
      id: "ai-enterprise",
      category: "Field Telemetry",
      tag: "Enterprise AI Case Study",
      title: "Closing the Last Mile: Why Enterprise AI Copilots Fail Without Human-in-the-Loop Undo States",
      metricHighlight: "+65% User Adoption",
      problem: "Enterprise teams loved the promise of LLM assistants, but abandonment spiked after 2 weeks due to lack of explainability, fear of automated write errors, and zero instant undo mechanisms.",
      solution: "Designed a 2-stage 'Confidence Release Gate' with inline citations, preview diffs before state mutations, and a 1-click snapshot restore. Replaced black-box execution with transparent confidence tags.",
      impact: "Trust score rose from 42% to 88%, and weekly active user retention jumped by 65% across 4 business units."
    },
    {
      id: "pipeline-chaos",
      category: "Systems Architecture",
      tag: "Reliability & Platform Engineering",
      title: "Resilience by Design: Chaos Engineering for Distributed ETL Pipelines",
      metricHighlight: "-70% Unplanned Downtime",
      problem: "Silent data degradation in upstream API endpoints was poisoning downstream executive dashboards without triggering infrastructure alerts.",
      solution: "Instituted automated data-contract validation at the ingestion perimeter, graceful fallback synthetic data flags, and circuit breakers that halted pipeline propagation when anomaly scores breached 3-sigma.",
      impact: "Reduced customer-reported data bugs to zero and saved an estimated 12 engineering hours per sprint."
    }
  ],

  projects: [
    {
      title: "Agentic Data Orchestrator",
      status: "Active Project",
      url: "https://github.com/Aman-system-design",
      desc: "An autonomous agent layer translating plain business queries into verified SQL pipelines, lineage maps, and anomaly alerts.",
      stack: ["AI Agents", "Data Lineage", "LLMs", "DevTools"]
    },
    {
      title: "0-to-1 PM Scaffolds",
      status: "Open Source",
      url: "https://github.com/Aman-system-design",
      desc: "Battle-tested PRD templates, decision logs, and metrics frameworks designed specifically for technical PMs building in AI and distributed systems.",
      stack: ["Product Strategy", "PRD Templates", "Decision Trees"]
    },
    {
      title: "System Design Teardowns",
      status: "Knowledge Base",
      url: "https://github.com/Aman-system-design",
      desc: "Visual architectural breakdowns of how modern high-scale apps manage caching, event streams, idempotency, and partition tolerance.",
      stack: ["System Design", "Scalability", "Architecture"]
    }
  ],

  // Interactive PM Simulator Game Data
  game: {
    scenarios: [
      {
        id: 1,
        title: "Sprint Dilemma: The AI Model Latency Crisis",
        situation: "Your engineering lead just deployed a state-of-the-art reasoning model to production. Model accuracy jumped by 18%, but p99 latency ballooned from 400ms to 4.2 seconds! Executive customers are complaining that the app feels sluggish.",
        choices: [
          {
            text: "Roll back completely to the old fast model and postpone the launch.",
            telemetry: { velocity: -15, delight: -10, health: +20, cost: 0 },
            feedback: "Safe, but disappointed leadership and lost accuracy gains. Product momentum stalled."
          },
          {
            text: "Implement tiered speculative caching + async streaming with an instant UI skeleton loader.",
            telemetry: { velocity: +15, delight: +25, health: +15, cost: -10 },
            feedback: "Masterclass PM move! Perceived latency dropped to 120ms with full model accuracy preserved."
          },
          {
            text: "Double server compute instances to brute-force faster throughput.",
            telemetry: { velocity: +5, delight: +5, health: -10, cost: -35 },
            feedback: "Cloud bill tripled in 24 hours without fixing core architectural bottle-neck. Finance is furious!"
          }
        ]
      },
      {
        id: 2,
        title: "Roadmap Collision: The Whale Customer Custom Request",
        situation: "A massive potential enterprise client promises an annual contract of $400K, BUT demands a custom proprietary auth connector and bespoke UI modifications that would derail your core Q3 platform roadmap for 6 weeks.",
        choices: [
          {
            text: "Agree unconditionally and reassign the entire sprint team to build the custom feature.",
            telemetry: { velocity: -25, delight: -20, health: -15, cost: +30 },
            feedback: "You sold out the roadmap and created technical debt. Core users churned from neglected features."
          },
          {
            text: "Say strict NO and tell them to wait until next year's roadmap review.",
            telemetry: { velocity: +10, delight: -15, health: +10, cost: -20 },
            feedback: "Roadmap was protected, but you lost a flagship logo and revenue milestone."
          },
          {
            text: "Architect a generic Extensible Webhook/Plugin SDK that satisfies their need while benefiting all customers.",
            telemetry: { velocity: +20, delight: +30, health: +25, cost: +20 },
            feedback: "Iconic platform strategy! Turned a one-off custom request into a durable platform competitive moat."
          }
        ]
      },
      {
        id: 3,
        title: "0-to-1 Funnel Leak: The Onboarding Drop-Off",
        situation: "Your new self-serve developer API platform has 5,000 weekly landing page visits, but only 4% complete onboarding to make their first API call. Heatmaps show users drop off at the credit-card authentication screen.",
        choices: [
          {
            text: "Remove credit-card requirement for a free tier (with rate limits) and offer an in-browser 1-click sandbox.",
            telemetry: { velocity: +25, delight: +35, health: +15, cost: -5 },
            feedback: "Activation shot from 4% to 38%! Developer friction disappeared and organic word-of-mouth exploded."
          },
          {
            text: "Add an aggressive 7-step popup walkthrough explaining why credit cards are required.",
            telemetry: { velocity: -10, delight: -30, health: -5, cost: 0 },
            feedback: "Users hated the modal clutter and drop-off actually worsened to 2.8%."
          },
          {
            text: "Run more paid ads to bring higher-intent traffic to the existing funnel.",
            telemetry: { velocity: 0, delight: -10, health: -10, cost: -30 },
            feedback: "Pouring water into a leaky bucket! Customer Acquisition Cost (CAC) skyrocketed."
          }
        ]
      }
    ]
  },

  // PM Mental Models Revision Flashcards
  mentalModels: [
    {
      title: "Gall’s Law",
      category: "Systems Thinking",
      concept: "A complex system that works is invariably found to have evolved from a simple system that worked.",
      pmApplication: "Never start with complex microservices or omni-channel feature suites. Build the simplest atomic feedback loop first, verify demand, then layer modular complexity."
    },
    {
      title: "The Second-Order Effect",
      category: "Decision Making",
      concept: "First-order thinking considers immediate results; second-order thinking considers the consequences of those consequences.",
      pmApplication: "Adding a quick discount code raises conversions today (1st order), but trains users never to pay full price and devalues the brand tomorrow (2nd order)."
    },
    {
      title: "Conway’s Law",
      category: "Organizational Design",
      concept: "Organizations design systems that mirror their own communication structures.",
      pmApplication: "If your backend and frontend teams don't communicate, your product UI will feel disjointed and uncoupled. Organize squads around customer outcomes, not technical layers."
    },
    {
      title: "Good PM vs Bad PM (Horowitz)",
      category: "Execution Craft",
      concept: "A good PM takes full ownership of outcomes and views themselves as the CEO of the product; a bad PM makes excuses about engineering bandwidth and market conditions.",
      pmApplication: "A good PM defines the 'Why' and the 'What', measures the business impact, and ruthlessly protects the team from organizational noise."
    }
  ]
};
