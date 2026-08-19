// ---------------------------------------------------------------------------
// All user-facing copy lives here. Components only map over these values, so
// editing the site's content never means touching layout or styling code.
// ---------------------------------------------------------------------------

import {
  Cpu,
  Cloud,
  Database,
  ShieldCheck,
  Layers,
  LineChart,
  Users,
  Rocket,
  HeartHandshake,
  GitBranch,
  Gauge,
  BookOpen,
} from 'lucide-react';

// -------------------- Home --------------------

export const HERO_STATS = [
  { label: 'Uptime across managed systems', value: 99.98, suffix: '%', decimals: 2 },
  { label: 'Systems in production', value: 140, suffix: '+' },
  { label: 'Median incident response', value: 6, suffix: ' min' },
];

export const CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Systems Engineering',
    description:
      'Architecture, infrastructure and platform design built to hold up under the load you will actually see.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'Provisioning, scaling and reliability engineering across multi-region environments.',
  },
  {
    icon: Database,
    title: 'Data Platforms',
    description: 'Pipelines and warehousing that turn raw operational data into something teams can act on.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description: 'Controls and audits built into the delivery process, not bolted on at the end.',
  },
];

// Placeholder client names — swap for real ones (or delete the section).
export const CLIENT_LOGOS = [
  'Northwind Freight',
  'Kirana Cloud',
  'Meridian Health',
  'Volta Mobility',
  'Palladium Bank',
  'Astra Retail',
  'Corvus Analytics',
];

export const CASE_STUDIES = [
  {
    client: 'Kirana Cloud',
    sector: 'Retail logistics',
    title: 'Cut checkout latency by 63% before peak season',
    summary:
      'Re-architected a single-region monolith into a regionalised service mesh with read-through caching, six weeks ahead of the festive traffic spike.',
    metrics: [
      { label: 'p95 latency', value: '−63%' },
      { label: 'Peak orders/min', value: '4.1k' },
      { label: 'Infra spend', value: '−18%' },
    ],
  },
  {
    client: 'Meridian Health',
    sector: 'Healthcare',
    title: 'SOC 2 Type II readiness in one quarter',
    summary:
      'Built access control, secrets management and audit logging into the existing CI/CD pipeline so evidence collection became automatic rather than a scramble.',
    metrics: [
      { label: 'Audit findings', value: '0 critical' },
      { label: 'Time to ready', value: '11 weeks' },
      { label: 'Manual evidence', value: '−90%' },
    ],
  },
  {
    client: 'Volta Mobility',
    sector: 'Mobility',
    title: 'From nightly batch to real-time fleet telemetry',
    summary:
      'Replaced a fragile nightly ETL with a Kafka-backed streaming pipeline, giving operations a live view of 22,000 vehicles instead of yesterday’s snapshot.',
    metrics: [
      { label: 'Data freshness', value: '<10 s' },
      { label: 'Pipeline failures', value: '−94%' },
      { label: 'Vehicles tracked', value: '22k' },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'They embedded with our team for a quarter and left behind infrastructure our own engineers can explain. That last part is rarer than it should be.',
    name: 'Priya Raghunathan',
    role: 'VP Engineering, Kirana Cloud',
  },
  {
    quote:
      'The audit stopped being a fire drill. Rexer turned compliance into something our pipeline just does on every merge.',
    name: 'Daniel Osei',
    role: 'CTO, Meridian Health',
  },
];

// -------------------- Services --------------------

export const SERVICES = [
  {
    id: 'systems-engineering',
    icon: Cpu,
    title: 'Systems Engineering',
    description:
      'Architecture, infrastructure and platform design built to hold up under real production load.',
    points: ['Architecture review & design', 'Performance & load testing', 'Legacy system modernisation'],
  },
  {
    id: 'cloud-infrastructure',
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    description: 'Provisioning, scaling and reliability engineering across multi-region environments.',
    points: ['Multi-cloud & hybrid setups', 'Autoscaling & cost optimisation', 'Disaster recovery planning'],
  },
  {
    id: 'data-platforms',
    icon: Database,
    title: 'Data Platforms',
    description: 'Pipelines and warehousing that turn raw operational data into something teams can act on.',
    points: ['Real-time & batch pipelines', 'Warehouse & lakehouse design', 'Analytics enablement'],
  },
  {
    id: 'security-compliance',
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description: 'Controls and audits built into the delivery process, not bolted on at the end.',
    points: [
      'SOC 2 / ISO 27001 readiness',
      'Access & secrets management',
      'Continuous vulnerability scanning',
    ],
  },
  {
    id: 'platform-engineering',
    icon: Layers,
    title: 'Platform Engineering',
    description: 'Internal tooling and developer platforms that make shipping faster and safer.',
    points: ['CI/CD pipeline design', 'Internal developer portals', 'Golden-path templates'],
  },
  {
    id: 'reliability',
    icon: LineChart,
    title: 'Reliability & Observability',
    description: 'Monitoring, alerting and on-call practice that catches problems before customers do.',
    points: ['SLOs & error budgets', 'Incident response design', 'Full-stack observability'],
  },
];

export const ENGAGEMENT_MODELS = [
  {
    title: 'Embedded Team',
    description: 'Our engineers sit inside your team and ship alongside you, sprint by sprint.',
    bestFor: 'Teams scaling faster than they can hire',
    starts: 'From 1 quarter',
  },
  {
    title: 'Fixed-Scope Project',
    description: 'A defined outcome, timeline and budget — ideal for a specific migration or build.',
    bestFor: 'A migration, re-platform or greenfield build',
    starts: 'From 6 weeks',
  },
  {
    title: 'Advisory Retainer',
    description: 'Ongoing architecture review and on-call escalation without a full-time hire.',
    bestFor: 'Small teams carrying a large system',
    starts: 'Monthly, rolling',
  },
];

export const FAQS = [
  {
    q: 'How quickly can you start?',
    a: 'Discovery usually starts within two weeks of the first call. A full embedded team typically ramps over three to four weeks, depending on access and onboarding requirements.',
  },
  {
    q: 'Do you work with our existing engineers, or replace them?',
    a: 'We work with them. Every engagement is designed so your team owns the system afterwards — that means pairing, written architecture decision records, and a documented handover as a delivery milestone rather than an afterthought.',
  },
  {
    q: 'What happens when the engagement ends?',
    a: 'You get runbooks, architecture diagrams, an SLO dashboard and a recorded handover session. Most clients keep an advisory retainer for escalation, but nothing is designed to require us.',
  },
  {
    q: 'Which clouds and stacks do you support?',
    a: 'Primarily AWS and GCP, with Kubernetes, Terraform, Postgres and Kafka as the common backbone. We also support Azure and managed-serverless architectures where they fit the problem better.',
  },
  {
    q: 'How do you price work?',
    a: 'Embedded teams and advisory retainers are monthly. Fixed-scope projects are quoted after a paid discovery week, so the estimate is based on your actual system rather than a guess.',
  },
];

// -------------------- About --------------------

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'Map the current system and define what success looks like.',
  },
  { step: '02', title: 'Design', description: 'Architect the solution against real constraints and load.' },
  { step: '03', title: 'Build', description: 'Ship in increments, with review gates at every stage.' },
  { step: '04', title: 'Operate', description: 'Monitor, tune and hand off with full documentation.' },
];

export const PRINCIPLES = [
  {
    icon: GitBranch,
    title: 'Small changes, often',
    description: 'Large releases hide risk. We ship in increments that are easy to reason about and reverse.',
  },
  {
    icon: Gauge,
    title: 'Measure before you tune',
    description: 'Every performance claim we make is backed by a benchmark you can re-run yourself.',
  },
  {
    icon: BookOpen,
    title: 'Write it down',
    description: 'If a decision only lives in someone’s head, the system has a single point of failure.',
  },
];

export const TIMELINE = [
  { year: '2015', title: 'Founded', description: 'Two engineers, one pager, and a lot of 3am incidents.' },
  {
    year: '2018',
    title: 'First platform team',
    description: 'Moved from firefighting to building the systems that prevent fires.',
  },
  {
    year: '2021',
    title: 'Data practice',
    description: 'Added streaming and warehouse engineering as a standalone practice.',
  },
  {
    year: '2024',
    title: '140+ systems',
    description: 'Operating production infrastructure across three continents.',
  },
];

export const TECH_STACK = [
  'Kubernetes',
  'AWS',
  'GCP',
  'Terraform',
  'Postgres',
  'Kafka',
  'ClickHouse',
  'Go',
  'Python',
  'React',
  'Grafana',
  'OpenTelemetry',
];

// -------------------- Careers --------------------

export const CULTURE_POINTS = [
  {
    icon: Users,
    title: 'Small, senior teams',
    description: 'No layers of management between you and the decision.',
  },
  {
    icon: Rocket,
    title: 'Real ownership',
    description: 'You scope it, you build it, you carry the pager for it.',
  },
  {
    icon: HeartHandshake,
    title: 'Sustainable pace',
    description: 'On-call is rotated and compensated — nobody burns out quietly here.',
  },
];

export const BENEFITS = [
  'Remote-first, with an optional Chennai office',
  'Compensated, rotated on-call',
  '₹1L annual learning budget',
  'Private health cover for you and dependants',
  '4-day recharge break every quarter',
  'Open-source Fridays, one per month',
];

export const OPEN_ROLES = [
  {
    id: 'senior-platform-engineer',
    title: 'Senior Platform Engineer',
    location: 'Remote / Chennai',
    type: 'Full-time',
    level: 'Senior',
    summary:
      'Own the internal developer platform: golden paths, CI/CD and the tooling every team ships through.',
  },
  {
    id: 'cloud-infrastructure-engineer',
    title: 'Cloud Infrastructure Engineer',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid–Senior',
    summary: 'Design and operate multi-region AWS and GCP environments with Terraform and Kubernetes.',
  },
  {
    id: 'data-platform-engineer',
    title: 'Data Platform Engineer',
    location: 'Remote / Chennai',
    type: 'Full-time',
    level: 'Mid–Senior',
    summary: 'Build streaming and batch pipelines that analytics and product teams depend on daily.',
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    location: 'Remote',
    type: 'Contract',
    level: 'Senior',
    summary: 'Embed access control, secrets management and audit evidence into client delivery pipelines.',
  },
];

export const HIRING_STEPS = [
  { step: '01', title: 'Intro call', description: '30 minutes with an engineer, not a recruiter.' },
  {
    step: '02',
    title: 'Systems conversation',
    description: 'A real architecture problem, discussed — no whiteboard trivia.',
  },
  { step: '03', title: 'Paid work sample', description: 'A scoped, paid exercise close to the actual job.' },
  { step: '04', title: 'Offer', description: 'Decision within five working days of the last conversation.' },
];
