// Aman — aman.atii.in
// 100% Value-Add, Zero-Fluff Data Architecture

window.PORTFOLIO_DATA = {
  profile: {
    name: "Aman",
    logo: "AT",
    domain: "aman.atii.in",
    email: "iat.connectme@outlook.in",
    github: "https://github.com/Aman-system-design",
    status: "Data & AI @ HCLTech • MIT Solve Fellow",
    headline: "Building <span>Data &amp; AI Systems</span> that scale for humans.",
    bio: "I design and scale 0-to-1 platform infrastructure and enterprise AI workflows at HCLTech. Focused on closing the gap between complex distributed systems and intuitive human decision loops.",
    location: "Bengaluru, India"
  },

  metrics: [
    { value: "3.5×", label: "Pipeline Velocity", sub: "automated data workflows" },
    { value: "85%+", label: "Workflow Adoption", sub: "enterprise copilot conversion" },
    { value: "Tier-1", label: "Production Scale", sub: "enterprise SLA & telemetry" }
  ],

  experience: [
    {
      company: "HCLTech",
      role: "Data & AI Solutions",
      period: "2023 – Present",
      tag: "Current",
      highlights: [
        "Cut p99 model inference latency by 40% via tiered speculative caching and quantization.",
        "Engineered explainability & safety rollback gates that reduced automated write failures by 55%."
      ]
    },
    {
      company: "MIT Solve Initiative",
      role: "Innovation Fellow",
      period: "2022 – 2023",
      tag: "Fellowship",
      highlights: [
        "Prototyped and validated 0-to-1 human-centered platform across 60+ enterprise user discovery loops."
      ]
    }
  ],

  caseStudies: [
    {
      title: "Human-in-the-Loop Undo States",
      metric: "+65% Trust Retention",
      summary: "Users hesitated to trust automated AI copilot actions. Introduced confidence preview diffs and 1-click state rollback before irreversible writes."
    },
    {
      title: "Chaos Engineering in Distributed ETL",
      metric: "-70% Unplanned Downtime",
      summary: "Upstream data drift broke downstream executive reporting silently. Enforced perimeter data contracts, circuit breakers, and automated fallback mocks."
    }
  ],

  // Interactive System Trade-Off Simulator
  simulator: {
    scenarios: [
      {
        title: "AI Inference Latency Spike",
        context: "New model improves accuracy by +18%, but p99 latency jumped from 350ms to 4.2s. Team is paralyzed.",
        options: [
          {
            label: "Roll back completely to old model; delay release.",
            impact: { velocity: -15, delight: -10, health: +20, cost: 0 },
            verdict: "Safe, but stalled competitive velocity and discarded accuracy gains."
          },
          {
            label: "Implement tiered speculative caching + token UI streaming.",
            impact: { velocity: +20, delight: +30, health: +15, cost: -5 },
            verdict: "Optimal systems leverage! Perceived latency dropped to 120ms with full model accuracy preserved."
          },
          {
            label: "Double GPU cluster nodes to brute-force throughput.",
            impact: { velocity: +5, delight: +5, health: -10, cost: -35 },
            verdict: "Cloud spend tripled in 24 hours without addressing the root pipeline bottleneck."
          }
        ]
      },
      {
        title: "Whale Client Custom Derailment",
        context: "A $400K enterprise customer demands bespoke proprietary auth that would freeze the core roadmap for 6 weeks.",
        options: [
          {
            label: "Fork codebase and build one-off custom feature.",
            impact: { velocity: -25, delight: -20, health: -20, cost: +30 },
            verdict: "Heavy technical debt. Future deployments became an unmaintainable nightmare."
          },
          {
            label: "Refuse outright and tell them to wait for next year.",
            impact: { velocity: +10, delight: -15, health: +10, cost: -20 },
            verdict: "Preserved roadmap, but missed a tier-1 flagship logo and critical expansion revenue."
          },
          {
            label: "Architect an Extensible Webhook & Plugin SDK.",
            impact: { velocity: +20, delight: +25, health: +25, cost: +20 },
            verdict: "Platform strategy win! Turned a custom demand into a durable competitive moat for all accounts."
          }
        ]
      }
    ]
  }
};
