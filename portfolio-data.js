// PM Portfolio Configuration File
// Pre-configured for Aman (Data & AI @ HCLTech • 0-to-1 Products • MIT Solve)
// You can edit any field here or use the on-site "Customize" button!

window.PORTFOLIO_DATA = {
  profile: {
    name: "Aman",
    shortName: "Aman",
    initials: "as",
    role: "Product Manager — Data & AI Platform | 0-to-1 Products",
    tagline: "Hi, I’m <span>Aman.</span>",
    bio: "Product Manager building data & AI platforms and 0-to-1 software systems. Focused on closing the gap between complex machine intelligence and intuitive, high-impact enterprise user workflows.",
    email: "aman@example.com",
    location: "India",
    statusBadge: "Data & AI @ HCLTech • MIT Solve Fellow",
    socials: {
      linkedin: "https://www.linkedin.com/",
      twitter: "https://x.com/",
      substack: "https://substack.com/",
      github: "https://github.com/Aman-system-design"
    }
  },

  colorKey: [
    { id: "building", color: "blue", label: "Blue for building", section: "work" },
    { id: "learning", color: "yellow", label: "Yellow for learning", section: "education" },
    { id: "sharing", color: "red", label: "Red for sharing", section: "field-notes" }
  ],

  work: {
    current: {
      company: "HCLTech",
      url: "https://www.hcltech.com/",
      badge: "Current",
      role: "Product Manager — Data & AI Solutions",
      period: "2023 – Present",
      location: "India",
      summary: "Leading 0-to-1 data platform and generative AI capability rollouts for enterprise operations. Championing product strategy, cross-functional engineering execution, and customer telemetry.",
      metrics: [
        { label: "Platform Scale", value: "Enterprise", detail: "tier-1 global deployments" },
        { label: "Efficiency Gain", value: "3.5×", detail: "in automated data pipeline workflows" },
        { label: "AI Adoption", value: "85%+", detail: "user conversion on generative assistant" }
      ],
      highlights: [
        "Architected product roadmap for next-gen data platforms and AI-driven decision copilot tooling.",
        "Partnered with data engineering and ML research teams to reduce latency on pipeline orchestration by 40%.",
        "Established product discovery loops with enterprise stakeholders, turning qualitative friction into high-velocity sprint features."
      ]
    },
    previous: [
      {
        company: "0-to-1 Product Ventures & MIT Solve",
        role: "Product Lead & Innovation Fellow",
        period: "2022 – 2023",
        description: "Built and scaled early-stage tech solutions addressing systemic operational challenges.",
        bulletPoints: [
          "Recognized through MIT Solve initiative for human-centric product design and measurable social impact.",
          "Led prototyping, user interviews, and GTM positioning from zero to first 10,000 active users."
        ]
      },
      {
        company: "Enterprise Software & Analytics",
        role: "Associate Product Manager / Systems Analyst",
        period: "2021 – 2022",
        description: "Led analytics dashboard redesign and core telemetry pipelines.",
        bulletPoints: [
          "Spearheaded user research across 50+ enterprise users, discovering critical funnel drop-offs.",
          "Cut report generation latency by 35% through query caching and simplified information hierarchy."
        ]
      }
    ]
  },

  education: [
    {
      institution: "MIT Solve Initiative",
      degree: "Innovation & Global Challenge Fellow",
      period: "2022 – 2023",
      notes: "Technology for impact, scalable product frameworks, and human-centered design."
    },
    {
      institution: "Bachelor of Technology / Engineering",
      degree: "Computer Science & Engineering",
      period: "2018 – 2022",
      notes: "Distributed systems, database architecture, algorithm optimization."
    }
  ],

  projects: [
    {
      title: "Agentic Data Orchestrator",
      tag: "Active Project",
      badgeColor: "blue",
      url: "https://github.com/Aman-system-design",
      description: "An autonomous agent layer that translates natural language business queries into verified SQL pipelines, lineage maps, and anomaly alerts.",
      tags: ["AI Agents", "Data Lineage", "LLMs", "DevTools"],
      cta: "View on GitHub ↗"
    },
    {
      title: "0-to-1 PM Toolkit",
      tag: "Open Source",
      badgeColor: "green",
      url: "https://github.com/Aman-system-design",
      description: "Curated decision models, PRD scaffolds, and product metric telemetry templates designed specifically for technical PMs building in AI and distributed systems.",
      tags: ["Product Strategy", "System Design", "PRD Templates"],
      cta: "Explore Repository ↗"
    },
    {
      title: "System Design Explorer",
      tag: "Knowledge Base",
      badgeColor: "purple",
      url: "https://github.com/Aman-system-design",
      description: "Visual architectural teardowns of modern high-scale apps: caching topologies, event sourcing, consensus algorithms, and rate limiting patterns.",
      tags: ["Architecture", "Scalability", "Tech Notes"],
      cta: "Browse Teardowns ↗"
    }
  ],

  fieldNotes: [
    {
      id: "ai-enterprise",
      badge: "Field Study",
      date: "Nov 2026",
      title: "Why 80% of Enterprise AI copilots fail at the last mile: The feedback loop problem.",
      summary: "I spent three weeks observing how operations managers actually use internal LLM assistants. The biggest barrier wasn’t model accuracy—it was explainability and lack of undo states. We introduced inline verification pills, which boosted team adoption by 65%.",
      press: ["Product Tear Down", "Enterprise AI Patterns"],
      link: "#",
      linkText: "Read the case study ↗"
    },
    {
      id: "system-resilience",
      badge: "Operational Experiment",
      date: "Jul 2025",
      title: "Simulating cascade failures in distributed data pipelines before our users notice.",
      summary: "Conducted chaos engineering simulations across our ETL pipelines to quantify how degradation propagates through customer dashboards. Defined SLA grace zones and graceful fallback degradation.",
      press: ["Reliability Engineering", "Platform Strategy"],
      link: "#",
      linkText: "Explore the breakdown ↗"
    }
  ],

  essays: [
    {
      title: "Product Managers don't need to write code, but must understand architecture",
      category: "Product Philosophy",
      date: "2026",
      readTime: "5 min read",
      description: "Why technical intuition and system thinking are the ultimate superpowers for modern AI platform product leaders.",
      url: "https://github.com/Aman-system-design"
    },
    {
      title: "The ergonomics of modern data tooling",
      category: "UX & Systems",
      date: "2025",
      readTime: "6 min read",
      description: "How friction in developer and data analyst interfaces compounds into engineering burnout and bad business decisions.",
      url: "https://github.com/Aman-system-design"
    },
    {
      title: "0 to 1 vs 1 to 100: Relearning product instincts",
      category: "Strategy",
      date: "2025",
      readTime: "4 min read",
      description: "The mental model shifts required when transitioning from rapid scrappy prototypes to hardened enterprise platforms.",
      url: "https://github.com/Aman-system-design"
    }
  ],

  books: [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      category: "Systems",
      takeaway: "The definitive guide for understanding replication, partitioning, and the true cost of distributed consistency.",
      rating: "★★★★★"
    },
    {
      title: "Building Microservices",
      author: "Sam Newman",
      category: "Architecture",
      takeaway: "Decomposition patterns, service boundaries, and organizational alignment with Conway's Law.",
      rating: "★★★★★"
    },
    {
      title: "The Mom Test",
      author: "Rob Fitzpatrick",
      category: "Product Discovery",
      takeaway: "How to talk to customers and learn if your business is a good idea when everyone is lying to you.",
      rating: "★★★★★"
    },
    {
      title: "High Output Management",
      author: "Andy Grove",
      category: "Leadership",
      takeaway: "Leverage, managerial output, and treating organizational processes as high-yield production lines.",
      rating: "★★★★★"
    }
  ],

  coffeeNotes: {
    title: "Off the Clock: Coffee & Fuel",
    subtitle: "Notes on specialty beans, pour-overs & sprint fuel",
    favorites: [
      { spot: "Single Origin Aeropress", city: "Home Barista", note: "Medium roast Ethiopian Yirgacheffe, floral and citrus notes" },
      { spot: "Blue Tokai Roasters", city: "Bengaluru / Delhi", note: "Vienna roast cold brew, smooth dark chocolate undertone" },
      { spot: "Araku Micro-lot", city: "Araku Valley", note: "Natural process pour-over, balanced acidity with stone fruit finish" },
      { spot: "Espresso Tonic", city: "Summer Sprints", note: "Double shot espresso over chilled tonic with citrus peel" }
    ]
  },

  socialPosts: [
    {
      platform: "LinkedIn",
      eyebrow: "Product Insight",
      quote: "The best product managers aren’t the ones with the most features on the roadmap. They’re the ones who ruthlessly protect engineering focus and eliminate ambiguity.",
      url: "https://github.com/Aman-system-design",
      date: "Recent"
    },
    {
      platform: "X (Twitter)",
      eyebrow: "AI & Platform Strategy",
      quote: "AI wrappers compete on prompt engineering. AI platform products compete on data integration, permission sandboxes, and enterprise workflow muscle memory.",
      url: "https://github.com/Aman-system-design",
      date: "Recent"
    },
    {
      platform: "X (Twitter)",
      eyebrow: "System Design",
      quote: "Before you add a distributed cache or an event queue to solve a performance bottleneck, check if you’re just querying unindexed tables in a tight loop.",
      url: "https://github.com/Aman-system-design",
      date: "Recent"
    }
  ]
};
