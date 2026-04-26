export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSection = {
  title: string;
  body: string[];
};

export type ServicePage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  intro: string;
  nationalPitch: string;
  sections: ServiceSection[];
  outcomes: string[];
  deliverables: string[];
  idealFor: string[];
  ctaTitle: string;
  ctaBody: string;
  faq: ServiceFaq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "cqc-registration-support",
    name: "CQC Registration Support",
    metaTitle: "CQC Registration Support UK",
    metaDescription:
      "UK-wide CQC registration support for care providers. Get practical guidance on applications, policies, interviews, and launch readiness from a care business consultant.",
    keywords: [
      "CQC registration support UK",
      "CQC registration consultant UK",
      "care business consultant UK",
      "supported living registration support",
      "domiciliary care CQC registration"
    ],
    excerpt:
      "UK-wide support for care providers that need to register properly, present confidently, and launch with compliance already built in.",
    intro:
      "Care Cove provides UK-wide CQC registration support for care providers who want to launch properly, pass confidently, and avoid the costly delays that come from weak applications, poor evidence, or unclear operational planning.",
    nationalPitch:
      "We work nationally with providers across domiciliary care, supported living, residential care, and specialist services. The objective is not just to help you submit paperwork. It is to make sure your application, your policies, your operational model, and your leadership evidence all align with what the regulator expects from a credible provider.",
    sections: [
      {
        title: "A registration process that feels controlled, not chaotic",
        body: [
          "Most care businesses do not struggle because they are uncommitted. They struggle because the registration process is high stakes, terminology-heavy, and unforgiving when the story behind the service is unclear. A weak application can lead to delay, confusion, and loss of momentum before the service has even opened.",
          "Our role is to help you shape a strong application narrative, tighten the operational detail behind it, and present a service that looks ready to deliver safe, effective, and well-led care from day one."
        ]
      },
      {
        title: "Built for UK providers, not generic compliance templates",
        body: [
          "We support care providers across the UK with practical registration work that reflects the realities of regulated care. That means helping you translate your business model into compliant documentation, preparing for fit person interviews, and making sure your service proposition holds up under scrutiny.",
          "Because the advice is grounded in real care-sector growth experience, the outcome is commercially useful as well as compliant. You are not just preparing to register. You are preparing to run a stronger care business once registration is approved."
        ]
      }
    ],
    outcomes: [
      "A stronger, more coherent CQC application",
      "Greater confidence for fit person and leadership interviews",
      "Policies and evidence aligned with the service you actually want to run",
      "A smoother route from registration into launch and growth"
    ],
    deliverables: [
      "Application strategy and registration roadmap",
      "Policy and document review for regulated care services",
      "Fit person interview preparation and leadership positioning",
      "Support on statement of purpose, service model, and evidence gaps",
      "Launch-readiness guidance so compliance supports growth"
    ],
    idealFor: [
      "New domiciliary care businesses preparing to register",
      "Supported living providers formalising their service model",
      "Existing operators adding regulated activities or expanding",
      "Founders who need experienced guidance before submitting"
    ],
    ctaTitle: "Need CQC registration support anywhere in the UK?",
    ctaBody:
      "Book a strategy call and we will show you where your application, evidence, or readiness plan needs strengthening before you submit.",
    faq: [
      {
        question: "Do you only support start-up care businesses?",
        answer:
          "No. We support both start-up providers and existing operators that are adding regulated activities, changing service models, or tightening registration evidence before submission."
      },
      {
        question: "Can you help with fit person interviews?",
        answer:
          "Yes. We help founders and leaders prepare their answers, structure their evidence, and communicate operational readiness with more confidence."
      },
      {
        question: "Is this support available across the UK?",
        answer:
          "Yes. Care Cove positions this service nationally, supporting care providers across the UK rather than only in one local area."
      }
    ]
  },
  {
    slug: "tender-writing",
    name: "Tender Writing",
    metaTitle: "Care Tender Writing UK",
    metaDescription:
      "Care tender writing UK-wide for domiciliary care, supported living, residential care, and specialist services. Win more bids with stronger, compliant submissions.",
    keywords: [
      "care tender writing UK",
      "healthcare tender writing UK",
      "care tender consultant UK",
      "supported living tender writing",
      "domiciliary care tender writing"
    ],
    excerpt:
      "Compliant, persuasive bid support for care providers that want to compete nationally and stop wasting hours on weak submissions.",
    intro:
      "Care Cove offers care tender writing across the UK for providers that need stronger, more commercially intelligent submissions. We help you move beyond generic answers and create bids that are compliant, persuasive, and aligned with what commissioners actually want to see.",
    nationalPitch:
      "Whether you are targeting local authority frameworks, NHS-related opportunities, supported living contracts, or wider care service procurements, the same truth applies: strong bids come from structured strategy, credible evidence, and clear differentiation. That is the gap we help close.",
    sections: [
      {
        title: "From rushed answers to credible bid strategy",
        body: [
          "Many care providers know their service is good but struggle to translate that into tender language. Responses become reactive, repetitive, and too generic to stand out. That weakens scoring and makes every bid feel like a gamble.",
          "We help you shape a stronger commercial story, organise evidence properly, and answer quality questions in a way that feels specific, compliant, and convincing."
        ]
      },
      {
        title: "National bid support for care-sector growth",
        body: [
          "Our tender writing service is built specifically for UK care providers. That means we understand the pressure points around mobilisation, safeguarding, staffing, continuity, quality assurance, outcomes, and partnership working.",
          "The aim is not only to improve one bid. It is to build a reusable tender capability that makes future submissions faster, sharper, and more competitive."
        ]
      }
    ],
    outcomes: [
      "Sharper, more persuasive tender responses",
      "Better alignment with commissioner priorities",
      "Stronger use of evidence, differentiation, and outcomes",
      "Less wasted time on bids that feel rushed or generic"
    ],
    deliverables: [
      "Bid strategy and response planning",
      "Tender writing and editing support",
      "Evidence gathering and message shaping",
      "Review of scoring opportunities and response gaps",
      "Reusable bid language and submission improvements"
    ],
    idealFor: [
      "Care providers bidding for public sector contracts",
      "Supported living businesses responding to framework opportunities",
      "Domiciliary care providers pursuing growth through tenders",
      "Operators that need a more credible bid library and process"
    ],
    ctaTitle: "Need help writing a care tender that actually stands up?",
    ctaBody:
      "Book a call and we will review your current bid approach, where scoring is being lost, and what a stronger submission should look like.",
    faq: [
      {
        question: "Do you only write full tenders from scratch?",
        answer:
          "No. We can support with full bid writing, structured reviews, rewriting weak answers, or building a reusable response library for future tenders."
      },
      {
        question: "Which care services do you support?",
        answer:
          "We support a broad range of care providers including domiciliary care, supported living, residential care, specialist support, and related healthcare services."
      },
      {
        question: "Is this tender writing support UK-wide?",
        answer:
          "Yes. We position this as a UK-wide care tender writing service rather than a local-only consultancy."
      }
    ]
  },
  {
    slug: "private-client-growth",
    name: "Private Client Growth",
    metaTitle: "Private Clients for Care Agencies",
    metaDescription:
      "Private client growth support for care agencies across the UK. Improve positioning, referrals, enquiries, and conversion for private-paying care clients.",
    keywords: [
      "private clients for care agencies",
      "private client growth care providers",
      "private pay care marketing UK",
      "care business consultant UK",
      "home care private clients"
    ],
    excerpt:
      "A UK-wide growth service for care agencies that want more private enquiries, stronger positioning, and a more dependable pipeline.",
    intro:
      "Care Cove helps care agencies attract more private clients across the UK by improving their positioning, enquiry flow, conversion process, and commercial messaging. The focus is not vanity marketing. It is reliable private-pay growth that matches the quality of the service you deliver.",
    nationalPitch:
      "Many providers depend too heavily on word of mouth or inconsistent referrals. We help you become easier to trust, easier to understand, and easier to choose for families who are actively looking for care. That national positioning matters whether you operate in one area today or plan to scale into several.",
    sections: [
      {
        title: "Private growth starts with clarity and trust",
        body: [
          "Families do not buy care the way they buy ordinary services. They want confidence, reassurance, and a provider that feels competent from the first interaction. If your positioning is vague or your enquiry process is weak, good opportunities are lost before a conversation even begins.",
          "We help you strengthen the commercial side of trust: messaging, offer clarity, lead handling, and the structure needed to convert interest into paying clients."
        ]
      },
      {
        title: "A growth system built for care, not generic lead generation",
        body: [
          "Private client growth for care agencies needs a different approach from standard digital marketing. It must reflect sensitivity, urgency, safeguarding credibility, and the emotional weight behind care decisions.",
          "That is why we build around the realities of the care journey: how families search, what makes them hesitate, and what helps them feel safe enough to move forward."
        ]
      }
    ],
    outcomes: [
      "Clearer positioning for private-pay families",
      "Better enquiry quality and higher conversion confidence",
      "A stronger referral and inbound lead process",
      "More predictable private client growth over time"
    ],
    deliverables: [
      "Private client growth strategy and offer positioning",
      "Website messaging and conversion improvements",
      "Lead-handling and enquiry follow-up guidance",
      "Referral and partnership growth planning",
      "Commercial messaging aligned with trust and care outcomes"
    ],
    idealFor: [
      "Home care agencies wanting more private-paying clients",
      "Supported living or specialist providers building brand authority",
      "Founders who need a stronger conversion process, not just more traffic",
      "Care businesses looking to reduce dependence on a single lead source"
    ],
    ctaTitle: "Want more private clients for your care agency?",
    ctaBody:
      "Book a strategy call and we will show you where your positioning, enquiry process, or referral strategy is holding back growth.",
    faq: [
      {
        question: "Do you help with the whole private client journey or just leads?",
        answer:
          "We focus on the full commercial journey: positioning, demand generation, trust-building, enquiries, follow-up, and conversion."
      },
      {
        question: "Is this only for domiciliary care?",
        answer:
          "No. It is particularly relevant for home care agencies, but the principles also apply to supported living, specialist care, and wider care services targeting private demand."
      },
      {
        question: "Can this work nationally as well as locally?",
        answer:
          "Yes. The strategy is designed to strengthen your UK-wide market positioning while still supporting region-specific conversion where needed."
      }
    ]
  },
  {
    slug: "google-ads-for-care-agencies",
    name: "Google Ads for Care Agencies",
    metaTitle: "Google Ads for Care Agencies",
    metaDescription:
      "Google Ads for care agencies in the UK. Drive better quality enquiries, private clients, and growth with a care-specific paid search strategy.",
    keywords: [
      "Google Ads for care agencies",
      "home care Google Ads UK",
      "private clients for care agencies",
      "healthcare growth consultant UK",
      "care marketing consultant UK"
    ],
    excerpt:
      "Paid search strategy built specifically for UK care providers that want more qualified enquiries without wasting budget on generic campaigns.",
    intro:
      "Care Cove helps care agencies use Google Ads in a more disciplined, care-specific way. The goal is not to chase clicks. It is to generate better enquiries, more private client opportunities, and a stronger return from paid search across the UK.",
    nationalPitch:
      "Many care businesses try paid ads after seeing generic marketing advice that does not account for trust, urgency, compliance, or the emotional complexity of care decisions. We build Google Ads systems for care agencies that need a tighter message, better lead quality, and clearer commercial reporting.",
    sections: [
      {
        title: "Paid search that respects how care decisions are made",
        body: [
          "Families searching for care rarely behave like standard retail buyers. They search with urgency, uncertainty, and high levels of caution. That means your ads, landing pages, and enquiry handling must work together to reduce friction and build trust quickly.",
          "We shape campaigns around the real search intent behind private care demand, not vanity traffic or broad keywords that drain budget."
        ]
      },
      {
        title: "A national growth lever for ambitious providers",
        body: [
          "Google Ads can become a strong national growth channel for care agencies when it is built around service clarity, geographic control, conversion tracking, and commercially realistic expectations.",
          "We help care providers decide where ads fit, which services to promote, what a qualified lead should look like, and how to connect paid traffic to a stronger sales process."
        ]
      }
    ],
    outcomes: [
      "Higher-quality inbound enquiries from search",
      "Better use of budget and tighter keyword targeting",
      "Landing pages and ad messaging aligned to care-sector trust needs",
      "Clearer visibility into lead quality and return on spend"
    ],
    deliverables: [
      "Google Ads strategy for care-sector demand generation",
      "Keyword and campaign structure planning",
      "Landing page messaging guidance for better conversion",
      "Tracking recommendations and lead quality review",
      "Ongoing optimisation priorities and commercial reporting direction"
    ],
    idealFor: [
      "Home care agencies seeking more private enquiries",
      "Care providers that already advertise but need better results",
      "Operators expanding into new regions or services",
      "Founders who want performance marketing without generic agency fluff"
    ],
    ctaTitle: "Considering Google Ads for your care agency?",
    ctaBody:
      "Book a strategy call and we will show you whether paid search is the right growth channel, what it should target, and how to make it commercially worthwhile.",
    faq: [
      {
        question: "Do you manage ad strategy only, or can you help improve conversion too?",
        answer:
          "We look at both. A better ad account is not enough if the landing page, enquiry flow, and trust signals are weak."
      },
      {
        question: "Is Google Ads relevant for care providers outside one city?",
        answer:
          "Yes. Campaign structure can be built for local service areas while still supporting a national growth strategy and broader brand authority."
      },
      {
        question: "Can Google Ads help generate private clients for care agencies?",
        answer:
          "Yes, when campaigns are set up around the right service intent, location logic, and a conversion process that is designed for care-sector buyers."
      }
    ]
  },
  {
    slug: "ai-systems-for-care-providers",
    name: "AI Systems for Care Providers",
    metaTitle: "AI Systems for Care Providers",
    metaDescription:
      "AI systems for care providers across the UK. Reduce admin, improve workflows, and build smarter operational systems with practical implementation support.",
    keywords: [
      "AI systems for care providers",
      "AI for care agencies UK",
      "healthcare growth consultant UK",
      "care business consultant UK",
      "care operations automation"
    ],
    excerpt:
      "Practical AI implementation for care providers that want less admin, better systems, and a smarter route to scale across the UK.",
    intro:
      "Care Cove helps care providers implement AI systems in a practical, commercially useful way. We focus on workflows, admin, lead handling, documentation, and decision support where time savings and consistency can be created without introducing chaos.",
    nationalPitch:
      "This is not about chasing hype. It is about helping UK care providers identify where AI can genuinely reduce friction, improve team capacity, and support growth. The right systems can strengthen operations, but only when they are introduced with clear boundaries, sensible governance, and real process design.",
    sections: [
      {
        title: "AI that supports care operations instead of distracting from them",
        body: [
          "Most providers do not need dozens of tools. They need a clear view of where admin is piling up, where staff time is being lost, and which repeated tasks can be improved safely.",
          "We help you find the right use cases first, then shape AI-supported workflows that make sense for your team, your service model, and your growth stage."
        ]
      },
      {
        title: "Systems thinking for providers that want to scale properly",
        body: [
          "AI becomes valuable when it fits into a wider operating model: lead capture, enquiry handling, documents, reporting, internal knowledge, and daily execution. That is why we approach it as a systems project, not a novelty purchase.",
          "For care providers across the UK, this creates a better foundation for scale because growth stops depending on memory, improvisation, and founder bottlenecks."
        ]
      }
    ],
    outcomes: [
      "Reduced admin burden in high-friction workflows",
      "More consistent internal systems and documentation support",
      "Clearer decisions about which AI use cases are worth implementing",
      "Operational foundations that support growth rather than overwhelm it"
    ],
    deliverables: [
      "AI opportunity mapping for care-sector workflows",
      "Process design for admin, lead, and reporting improvements",
      "Tool selection guidance and implementation priorities",
      "Workflow documentation and adoption planning",
      "Practical guardrails around quality, oversight, and safe usage"
    ],
    idealFor: [
      "Care providers overwhelmed by admin and repeated manual work",
      "Growing teams that need better systems before scaling further",
      "Founders exploring AI but unsure what is genuinely useful",
      "Operators that want practical automation, not hype"
    ],
    ctaTitle: "Want practical AI systems for your care business?",
    ctaBody:
      "Book a strategy call and we will identify where AI could genuinely save time, improve consistency, and support growth in your organisation.",
    faq: [
      {
        question: "Is this service only for large care groups?",
        answer:
          "No. It is especially useful for smaller and mid-sized providers that are growing quickly and need better systems before complexity becomes unmanageable."
      },
      {
        question: "Do you focus on implementation or just advice?",
        answer:
          "The focus is on practical implementation priorities, workflow design, and real operational use cases rather than abstract AI commentary."
      },
      {
        question: "Can AI really help care providers without reducing quality?",
        answer:
          "Yes, when it is applied to the right administrative and operational tasks with clear oversight. The objective is to support quality and capacity, not replace care judgement."
      }
    ]
  }
];

export function getServicePageBySlug(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
