// Aman — Data & AI Systems, 0-to-1 Platforms & System Design
// Decluttered single-view architecture (No external edits, no explicit "Product Manager" label)

window.PORTFOLIO_DATA = {
  profile: {
    name: "Aman",
    initials: "as",
    headline: "Building <span>Data &amp; AI Systems</span> that scale for humans.",
    bio: "I build 0-to-1 platform infrastructure and enterprise data systems at HCLTech. Focused on closing the gap between complex distributed intelligence and intuitive, high-leverage workflows. MIT Solve Fellow.",
    status: "Data & AI @ HCLTech • MIT Solve",
    email: "aman@example.com",
    github: "https://github.com/Aman-system-design",
    location: "Bengaluru / India"
  },

  metrics: [
    { value: "3.5×", label: "Pipeline Acceleration", sub: "automated data workflows" },
    { value: "85%+", label: "Workflow Adoption", sub: "active copilot conversion" },
    { value: "Tier-1", label: "Enterprise Scale", sub: "production SLA & telemetry" }
  ],

  experience: [
    {
      company: "HCLTech",
      role: "Data & AI Solutions",
      period: "2023 – Present",
      tag: "Current",
      summary: "Leading 0-to-1 data platform rollouts and generative AI tooling for enterprise operations.",
      bullets: [
        "Cut p99 inference latency by 40% via tiered speculative caching and model quantization.",
        "Designed explainability & rollback gates that reduced automated write errors by 55%."
      ]
    },
    {
      company: "MIT Solve Initiative",
      role: "Innovation Fellow",
      period: "2022 – 2023",
      tag: "Fellowship",
      summary: "Prototyped and validated scalable human-centric technologies for global challenge cohorts.",
      bullets: [
        "Conducted 60+ discovery sessions to define atomic feedback loops and pilot retention."
      ]
    },
    {
      company: "Enterprise Analytics",
      role: "Systems & Telemetry",
      period: "2021 – 2022",
      tag: "Platform",
      summary: "Architected self-serve data query portals and cross-team telemetry pipelines.",
      bullets: [
        "Eliminated 4 manual reporting bottlenecks, reducing operational churn by 30%."
      ]
    }
  ],

  // Interactive System & Decision Simulator
  simulator: {
    scenarios: [
      {
        id: 1,
        title: "The AI Inference Latency Spike",
        context: "New model improves accuracy by +18%, but p99 latency ballooned from 350ms to 4.2s. Users report friction.",
        options: [
          {
            text: "Roll back completely to old model; delay launch.",
            impact: { velocity: -15, delight: -10, health: +20, cost: 0 },
            verdict: "Safe, but stalled competitive momentum and lost accuracy gains."
          },
          {
            text: "Implement tiered speculative caching + UI token streaming.",
            impact: { velocity: +20, delight: +30, health: +15, cost: -5 },
            verdict: "Masterful systems choice! Perceived latency dropped to 120ms with full accuracy."
          },
          {
            text: "Double GPU cluster instances to brute-force speed.",
            impact: { velocity: +5, delight: +5, health: -10, cost: -35 },
            verdict: "Infrastructure cost tripled in 24 hours without fixing the fundamental pipeline bottleneck."
          }
        ]
      },
      {
        id: 2,
        title: "The Whale Client Custom Fork",
        context: "A $400K enterprise deal demands bespoke proprietary auth that would divert core platform engineering for 6 weeks.",
        options: [
          {
            text: "Agree unconditionally and fork the codebase for this client.",
            impact: { velocity: -25, delight: -20, health: -20, cost: +30 },
            verdict: "Massive technical debt. Future upgrades became a maintenance nightmare."
          },
          {
            text: "Refuse outright and tell them to wait for next year's cycle.",
            impact: { velocity: +10, delight: -15, health: +10, cost: -20 },
            verdict: "Preserved roadmap, but missed a flagship logo and critical expansion revenue."
          },
          {
            text: "Architect an Extensible Webhook & Plugin SDK.",
            impact: { velocity: +20, delight: +25, health: +25, cost: +20 },
            verdict: "Platform strategy win! Turned a one-off request into a durable ecosystem capability."
          }
        ]
      },
      {
        id: 3,
        title: "Activation Funnel Friction",
        context: "5,000 weekly developers visit the API landing page, but only 4% make their first successful call.",
        options: [
          {
            text: "Remove credit card requirement; offer an in-browser 1-click sandbox.",
            impact: { velocity: +25, delight: +35, health: +15, cost: -5 },
            verdict: "Activation surged from 4% to 38%! Zero-friction trial drove organic developer adoption."
          },
          {
            text: "Add a mandatory 6-step modal tour explaining value.",
            impact: { velocity: -10, delight: -25, health: 0, cost: 0 },
            verdict: "Users bounced immediately. Added friction on top of an already leaky funnel."
          },
          {
            text: "Double paid ad spend to drive higher-volume traffic.",
            impact: { velocity: 0, delight: -10, health: -15, cost: -30 },
            verdict: "Pouring budget into a leaky sieve. Acquisition cost spiked without retention."
          }
        ]
      }
    ]
  },

  caseStudies: [
    {
      title: "Human-in-the-Loop Undo States",
      metric: "+65% Retention",
      problem: "Enterprise teams hesitated to trust automated AI actions without auditability.",
      solution: "Created confidence preview diffs and 1-click state restore before irreversible mutations."
    },
    {
      title: "Chaos Engineering in Distributed ETL",
      metric: "-70% Downtime",
      problem: "Silent data drift upstream broke downstream executive reporting without alerts.",
      solution: "Enforced perimeter data contracts, circuit breakers, and automated fallback mocks."
    }
  ],

  projects: [
    {
      name: "Agentic Data Orchestrator",
      tag: "Live",
      desc: "Autonomous agent mapping natural language queries to verified SQL pipelines and lineage graphs."
    },
    {
      name: "System Design Teardowns",
      tag: "Architecture",
      desc: "Visual breakdowns of caching topologies, event streaming, and distributed consensus."
    }
  ]
};
