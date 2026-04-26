import React, { useState, useEffect, useRef } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CURRENT_USER = {
  user_id:    1,
  name:       'Elias',
  department: 'User',
};

async function apiSaveQuery({ user_id, department, user_query, answer, answer_key }) {
  const res = await fetch(`${API_BASE}/queries`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, department, user_query, answer, answer_key }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function apiSaveFeedback(queryId, feedback) {
  const res = await fetch(`${API_BASE}/queries/${queryId}/feedback`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedback }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function apiSaveEvent({ type, title, detail }) {
  const res = await fetch(`${API_BASE}/events`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, title, detail }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap';

const T = {
  bg:      'linear-gradient(135deg, #EDE9FF 0%, #FFE4F7 48%, #FFFFFF 100%)',
  card:    '#ffffff',
  border:  '#E2E8F0',
  primary: '#5929D0',
  primaryL:'#E8E5FF',
  accent:  '#CF008B',
  success: '#16A34A',
  warning: '#E4902E',
  error:   '#DC2626',
  info:    '#2563EB',
  orange:  '#5929D0', orangeL: '#E8E5FF', orangeM: '#D8D2FF',
  blue:    '#2563EB', blueL:   '#EFF6FF',
  green:   '#16A34A', greenL:  '#F0FDF4', greenD:  '#BBF7D0',
  red:     '#DC2626', redL:    '#FEF2F2', redD:    '#FECACA',
  amber:   '#E4902E', amberL:  '#FFF7ED', amberD:  '#FED7AA',
  teal:    '#16A34A', tealL:   '#F0FDF4', tealD:   '#BBF7D0',
  purple:  '#5929D0', purpleL: '#E8E5FF', purpleD: '#D8D2FF',
  text:    '#0F172A', sub:     '#475569', muted:   '#94A3B8',
  feedBg:  '#F8FAFC',
  shadow:  '0 10px 30px rgba(15, 23, 42, 0.08)',
  shadowHover: '0 16px 36px rgba(89, 41, 208, 0.14)',
};

const ROLES = [
  { id: 'user',    label: 'My Dashboard', icon: '👤', desc: 'Personal HR self-service' },
  { id: 'hr',      label: 'HR Manager',   icon: '🏢', desc: 'Team management & analytics' },
  { id: 'finance', label: 'Finance',      icon: '💼', desc: 'Payroll & compensation' },
  { id: 'admin',   label: 'Admin',        icon: '⚙️', desc: 'System administration' },
];

const USER_STATS = [
  { label: 'Leave Balance', value: '12', unit: 'days',   icon: '🌴', color: T.green,  bg: T.greenL,  border: T.greenD  },
  { label: 'Attendance',    value: '94', unit: '%',      icon: '📅', color: T.primary, bg: T.primaryL, border: T.orangeM },
  { label: 'Pending Tasks', value: '3',  unit: 'tasks',  icon: '✅', color: T.orange, bg: T.orangeL, border: T.orangeM },
  { label: 'Team Members',  value: '18', unit: 'people', icon: '👥', color: T.amber,  bg: T.amberL,  border: T.amberD  },
];

const QUICK_LINKS = [
  { icon: '🌴', label: 'Apply Leave',   color: T.green,   bg: T.greenL  },
  { icon: '💰', label: 'View Payslip',  color: T.blue,    bg: T.blueL   },
  { icon: '📅', label: 'My Attendance', color: T.orange,  bg: T.orangeL },
  { icon: '🎯', label: 'My Goals',      color: T.amber,   bg: T.amberL  },
  { icon: '📚', label: 'My Training',   color: T.primary, bg: T.primaryL },
  { icon: '🔧', label: 'HR Helpdesk',   color: T.red,     bg: T.redL    },
];

/* ══════════════════════════════════════════════════════════════════
   CITATION DATA — rich source references per answer key
══════════════════════════════════════════════════════════════════ */
const CITATIONS = {
  leave: [
    {
      id: 'C1',
      source: 'HR Policy Manual',
      section: 'Section 4.2 — Annual Leave',
      excerpt: 'All confirmed employees accrue 1.5 earned leave days per month, totalling 18 days per financial year. Carry-forward limit is capped at 6 days.',
      relevance: 'Defines your 12-day remaining balance',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 98,
      updatedAt: 'Apr 1, 2026',
    },
    {
      id: 'C2',
      source: 'Leave Management System',
      section: 'Employee Record · EMP-1001',
      excerpt: 'Leave taken in FY 2026: 6 earned days (Jan 3, Feb 14, Mar 22). Sick leave taken: 0 days. Carry-forward applied from FY 2025: 4 days.',
      relevance: 'Live balance data from your record',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 25, 2026',
    },
    {
      id: 'C3',
      source: 'Payroll & Benefits Circular',
      section: 'Circular No. 12/2026 — Leave Encashment',
      excerpt: 'Employees may encash up to 10 unutilised earned leave days at the end of the FY. Encashment rate is basic salary / 26 per day.',
      relevance: 'Explains encashment eligibility',
      tag: 'Circular',
      tagColor: T.amber, tagBg: T.amberL,
      icon: '📢',
      confidence: 92,
      updatedAt: 'Mar 15, 2026',
    },
  ],
  salary: [
    {
      id: 'C1',
      source: 'Payroll System',
      section: 'April 2026 Payslip · EMP-1001',
      excerpt: 'Gross: ₹95,800 | TDS: ₹8,200 | PF (Employee): ₹4,800 | Professional Tax: ₹200 | Net Credited: ₹82,400 on Apr 30, 2026.',
      relevance: 'Direct source of your net pay figure',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 30, 2026',
    },
    {
      id: 'C2',
      source: 'Compensation Structure Sheet',
      section: 'FY 2026 CTC Breakdown · EMP-1001',
      excerpt: 'Annual CTC: ₹11,49,600. Components: Basic ₹4.8L, HRA ₹2.16L, Special Allowance ₹2.4L, PF (Employer) ₹0.58L, Gratuity ₹0.23L.',
      relevance: 'Explains your full CTC components',
      tag: 'HR Record',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📊',
      confidence: 97,
      updatedAt: 'Apr 1, 2026',
    },
    {
      id: 'C3',
      source: 'Income Tax Portal',
      section: 'Form 16 · FY 2025-26',
      excerpt: 'Projected TDS for FY 2026: ₹98,400. Deductions claimed: 80C ₹1.5L, 80D ₹25,000. Taxable income: ₹7,24,600 under new regime.',
      relevance: 'Basis for monthly TDS deduction',
      tag: 'Tax',
      tagColor: T.purple, tagBg: T.purpleL,
      icon: '🏛️',
      confidence: 90,
      updatedAt: 'Apr 1, 2026',
    },
  ],
  attendance: [
    {
      id: 'C1',
      source: 'Attendance Management System',
      section: 'April 2026 Log · EMP-1001',
      excerpt: 'Working days in April: 23. Present: 18. WFH: 3. Approved leave: 2. Late check-in flagged on Apr 22 at 09:34 AM (grace limit: 09:15 AM).',
      relevance: 'Your raw attendance record',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 25, 2026',
    },
    {
      id: 'C2',
      source: 'HR Policy Manual',
      section: 'Section 6.1 — Attendance & Punctuality',
      excerpt: 'Employees must check in by 09:15 AM. A grace period of 15 minutes applies twice per month. Third late check-in is marked as half-day absence.',
      relevance: 'Policy governing your late check-in',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 95,
      updatedAt: 'Jan 1, 2026',
    },
  ],
  training: [
    {
      id: 'C1',
      source: 'Learning Management System',
      section: 'My Enrollments · EMP-1001',
      excerpt: '"Leadership Foundations" — 68% complete, due May 10. "Excel for HR" — 42% complete, due Jun 1. Both are mandatory for L3 role progression.',
      relevance: 'Your active course enrollments',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 25, 2026',
    },
    {
      id: 'C2',
      source: 'L&D Policy',
      section: 'Section 2.3 — Mandatory Training Hours',
      excerpt: 'All employees must complete a minimum of 40 L&D hours per year. Completion is linked to annual appraisal score. Non-completion attracts a 5% KRA deduction.',
      relevance: 'Explains why completing courses matters',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 93,
      updatedAt: 'Apr 1, 2026',
    },
    {
      id: 'C3',
      source: 'Workshop Calendar Q2 2026',
      section: 'Open Registrations',
      excerpt: '3 workshops open: "Negotiation Skills" (May 5), "AI for HR" (May 19), "Project Fundamentals" (Jun 3). Seats limited to 20 per batch.',
      relevance: 'New workshops available to join',
      tag: 'Calendar',
      tagColor: T.amber, tagBg: T.amberL,
      icon: '📅',
      confidence: 88,
      updatedAt: 'Apr 20, 2026',
    },
  ],
  appraisal: [
    {
      id: 'C1',
      source: 'Performance Management System',
      section: 'FY 2025-26 Cycle · EMP-1001',
      excerpt: 'Self-rating submitted Apr 10. KRA score: 4.2/5. Manager rating: Pending (due May 20). Final normalisation by HR: Jun 1–15.',
      relevance: 'Your live appraisal status',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 25, 2026',
    },
    {
      id: 'C2',
      source: 'Appraisal Policy FY 2026',
      section: 'Section 3 — Rating Scale & Increments',
      excerpt: 'Rating 5 (Exceptional): 20–25% increment. Rating 4 (Exceeds): 12–18%. Rating 3 (Meets): 8–10%. Ratings below 3: Performance Improvement Plan triggered.',
      relevance: 'Explains what your rating means for increment',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 96,
      updatedAt: 'Apr 1, 2026',
    },
  ],
  policy: [
    {
      id: 'C1',
      source: 'HR Policy Manual',
      section: 'Section 8.4 — Remote Work Policy v3',
      excerpt: 'Effective Apr 18, 2026: WFH permitted up to 3 days/week. Core hours 9am–6pm IST mandatory for all remote days. Equipment policy unchanged.',
      relevance: 'Primary source for the updated policy',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 100,
      updatedAt: 'Apr 18, 2026',
    },
    {
      id: 'C2',
      source: 'All-Hands Communication',
      section: 'Circular No. 14/2026 — Policy Acknowledgement',
      excerpt: 'All employees must digitally acknowledge Remote Work Policy v3 by May 5, 2026 via HRMS portal. Non-acknowledgement will be flagged to reporting managers.',
      relevance: 'Deadline for your acknowledgement',
      tag: 'Circular',
      tagColor: T.amber, tagBg: T.amberL,
      icon: '📢',
      confidence: 99,
      updatedAt: 'Apr 18, 2026',
    },
  ],
  helpdesk: [
    {
      id: 'C1',
      source: 'HR Helpdesk System',
      section: 'Ticket #HR-2041',
      excerpt: 'Subject: "Reimbursement query — Apr medical claim ₹4,200". Status: In Review. Assigned to: Pooja Sharma (HR Ops). Opened: Apr 20. Expected SLA: Apr 24.',
      relevance: 'Direct record of your open ticket',
      tag: 'Live Data',
      tagColor: T.green, tagBg: T.greenL,
      icon: '🗄️',
      confidence: 100,
      updatedAt: 'Apr 25, 2026',
    },
    {
      id: 'C2',
      source: 'Reimbursement Policy',
      section: 'Section 5.1 — Medical Claim Limits',
      excerpt: 'Annual medical reimbursement limit: ₹15,000 per employee. Claims must be submitted within 30 days of expense with original receipts. Balance: ₹10,800 remaining.',
      relevance: 'Governs your claim eligibility',
      tag: 'Policy',
      tagColor: T.blue, tagBg: T.blueL,
      icon: '📋',
      confidence: 94,
      updatedAt: 'Jan 1, 2026',
    },
  ],
  default: [
    {
      id: 'C1',
      source: 'HR Knowledge Base',
      section: 'General Self-Service Guide',
      excerpt: 'Common queries can be resolved via HRMS self-service portal. For unresolved issues, raise a helpdesk ticket. SLA is 2 business days for standard queries.',
      relevance: 'General fallback guidance',
      tag: 'Guide',
      tagColor: T.muted, tagBg: T.bg,
      icon: '📖',
      confidence: 70,
      updatedAt: 'Jan 1, 2026',
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ANSWER LOOKUP
══════════════════════════════════════════════════════════════════ */
const ANSWERS = {
  leave:      { icon: '🌴', headline: '12 Earned Leave Days Remaining',        body: 'FY 2026 balance: 12 earned days + 6 sick days. Carry-forward: 4 days. Reset: 1 Apr 2027.',                          suggestions: ['Apply leave via Quick Actions', 'View team calendar for conflicts', 'Check encashment eligibility'] },
  salary:     { icon: '💰', headline: 'April Payslip · Net ₹82,400 Credited', body: 'Credited 30 Apr 2026. TDS: ₹8,200. HRA: ₹18,000. PF contribution: ₹4,800. Gross CTC: ₹11.2 LPA.',                  suggestions: ['Download payslip PDF', 'View CTC breakdown', 'Raise salary query via Helpdesk'] },
  payslip:    { icon: '💰', headline: 'April Payslip · Net ₹82,400 Credited', body: 'Credited 30 Apr 2026. TDS: ₹8,200. HRA: ₹18,000. PF contribution: ₹4,800. Gross CTC: ₹11.2 LPA.',                  suggestions: ['Download payslip PDF', 'View CTC breakdown', 'Raise salary query via Helpdesk'] },
  training:   { icon: '📚', headline: '2 Active Courses Enrolled',             body: '"Leadership Foundations" due May 10 · "Excel for HR" due Jun 1. Overall progress: 68%. 3 new workshops open.',       suggestions: ['Browse L&D catalog', 'Track enrolled courses under My Learning', 'Nominate for workshops'] },
  policy:     { icon: '📋', headline: 'Remote Work Policy v3 Updated',         body: 'Updated 18 Apr 2026. WFH limit raised to 3 days/week. Core hours: 9am–6pm. All employees acknowledge by 5 May.',   suggestions: ['Read Remote Work Policy v3', 'Download Code of Conduct PDF', 'Contact HR Business Partner'] },
  attendance: { icon: '📅', headline: '18/20 Days Present This Month',         body: 'Late check-in: Apr 22 (09:34 AM). No pending regularisations. Attendance score: 94%. Current streak: 8 days.',     suggestions: ['Submit regularisation request', 'View monthly attendance log', 'Download attendance report'] },
  appraisal:  { icon: '🎯', headline: 'FY 2025-26 Appraisal In Progress',      body: 'KRA submission deadline: 15 May 2026. Self-rating submitted. Manager ratings pending. Cycle closes 1 Jun.',        suggestions: ['Submit KRAs before May 15', 'View past appraisal history', 'Schedule 1:1 with manager'] },
  helpdesk:   { icon: '🔧', headline: '1 Open Helpdesk Ticket',                body: 'Ticket #HR-2041 "Reimbursement query" — In Review since Apr 20. Average SLA: 2 business days.',                   suggestions: ['Track ticket #HR-2041', 'Raise a new helpdesk request', 'View all past tickets'] },
};

function getAnswer(q) {
  const l = q.toLowerCase();
  for (const [k, v] of Object.entries(ANSWERS)) {
    if (l.includes(k)) return { key: k, ...v };
  }
  return {
    key: 'default', icon: '💬',
    headline: `Searching for "${q}"`,
    body: 'No direct HR record matched. Try a quick topic chip below or open a helpdesk ticket for personalised support.',
    suggestions: ['Open HR Helpdesk ticket', 'Contact your HR Business Partner', 'Browse HR knowledge base'],
  };
}

/* ══════════════════════════════════════════════════════════════════
   LIVE FEED
══════════════════════════════════════════════════════════════════ */
const SEED_EVENTS = [
  { id: 1, type: 'activity', title: 'Onboarding completed',   detail: 'Priya Nair – Engineering',    time: '09:02 AM' },
  { id: 2, type: 'alert',    title: 'Leave request pending',  detail: 'Rohan Mehta – 3 days',        time: '09:15 AM' },
  { id: 3, type: 'info',     title: 'Policy update viewed',   detail: 'Remote Work Policy v3',       time: '09:28 AM' },
  { id: 4, type: 'detection',title: 'Attendance anomaly',     detail: 'Late check-in · 3 employees', time: '09:41 AM' },
  { id: 5, type: 'activity', title: 'Training enrolled',      detail: 'Leadership Foundations',      time: '09:55 AM' },
  { id: 6, type: 'info',     title: 'Goal updated',           detail: 'Q2 KRA · Product Design',     time: '10:03 AM' },
  { id: 7, type: 'alert',    title: 'Probation review due',   detail: 'Dev Sharma · 2 days left',    time: '10:14 AM' },
  { id: 8, type: 'activity', title: 'Payslip downloaded',     detail: 'April 2026 · Finance team',   time: '10:22 AM' },
];

const POOL = [
  { type: 'activity', title: 'Skill badge earned',       detail: 'Data Analytics · Meera K'       },
  { type: 'alert',    title: 'Overtime logged',          detail: 'Ananya Singh · 14 hrs/week'     },
  { type: 'info',     title: 'Benefit claim submitted',  detail: 'Health · ₹12,400'               },
  { type: 'activity', title: 'Exit interview scheduled', detail: 'Sunita Rao · May 2'             },
  { type: 'info',     title: 'Holiday calendar updated', detail: 'May 2026 · 2 additions'         },
  { type: 'alert',    title: 'Compliance training due',  detail: '12 employees · 3 days left'     },
  { type: 'detection',title: 'Duplicate entry detected', detail: 'Attendance log · Apr 23'        },
  { type: 'activity', title: 'Performance review done',  detail: 'Q1 cycle · 48 completed'        },
];

const FM = {
  activity:  { c: T.green,  bg: T.greenL,  dot: T.greenD,  icon: '⚡', label: 'Activity'  },
  alert:     { c: T.red,    bg: T.redL,    dot: T.redD,    icon: '🔔', label: 'Alert'     },
  info:      { c: T.blue,   bg: T.blueL,   dot: '#bfdbfe', icon: 'ℹ',  label: 'Info'      },
  detection: { c: T.amber,  bg: T.amberL,  dot: T.amberD,  icon: '🔍', label: 'Detection' },
};

let _eid = 100;
function mkLocalEvent() {
  const s = POOL[Math.floor(Math.random() * POOL.length)];
  const now = new Date();
  return { ...s, id: ++_eid, time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
}

/* ══════════════════════════════════════════════════════════════════
   CITATION DRILL-DOWN COMPONENT
══════════════════════════════════════════════════════════════════ */
function ConfidenceBar({ value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ flex: 1, height: 5, borderRadius: 99, background: T.border, overflow: 'hidden' }}>
        <div style={{
          width: `${value}%`, height: '100%', borderRadius: 99,
          background: value >= 95 ? T.green : value >= 85 ? T.blue : T.amber,
          transition: 'width .6s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: value >= 95 ? T.green : value >= 85 ? T.blue : T.amber, minWidth: 30 }}>{value}%</span>
    </div>
  );
}

function CitationCard({ c, index, expanded, onToggle }) {
  return (
    <div style={{
      borderRadius: 12,
      border: `1.5px solid ${expanded ? c.tagColor + '55' : T.border}`,
      background: expanded ? c.tagBg : T.card,
      overflow: 'hidden',
      transition: 'all .22s ease',
      boxShadow: expanded ? `0 4px 18px ${c.tagColor}18` : '0 1px 3px rgba(0,0,0,.04)',
    }}>
      {/* Citation header — always visible */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 11,
          padding: '11px 14px', cursor: 'pointer',
          transition: 'background .15s',
        }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = T.bg; }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = 'transparent'; }}
      >
        {/* Index badge */}
        <div style={{
          width: 24, height: 24, borderRadius: 7, flexShrink: 0,
          background: `linear-gradient(135deg,${c.tagColor}22,${c.tagColor}44)`,
          border: `1px solid ${c.tagColor}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: c.tagColor,
        }}>{index + 1}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: T.text }}>{c.source}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20,
              background: c.tagBg, border: `1px solid ${c.tagColor}44`, color: c.tagColor,
            }}>{c.tag}</span>
          </div>
          <div style={{ fontSize: 11, color: T.muted, fontStyle: 'italic' }}>{c.section}</div>
        </div>

        {/* Relevance snippet */}
        <div style={{ fontSize: 11, color: T.sub, maxWidth: 130, textAlign: 'right', lineHeight: 1.4, display: expanded ? 'none' : 'block' }}>
          {c.relevance}
        </div>

        {/* Chevron */}
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: expanded ? c.tagColor + '22' : T.bg,
          border: `1px solid ${expanded ? c.tagColor + '44' : T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: expanded ? c.tagColor : T.muted,
          transform: expanded ? 'rotate(180deg)' : 'none',
          transition: 'all .2s',
        }}>▼</div>
      </div>

      {/* Expanded drill-down */}
      {expanded && (
        <div style={{
          padding: '0 14px 14px',
          borderTop: `1px solid ${c.tagColor}22`,
          animation: 'fadeUp .2s ease',
        }}>
          {/* Excerpt block */}
          <div style={{
            margin: '12px 0 10px',
            padding: '11px 14px',
            background: T.card,
            border: `1px solid ${T.border}`,
            borderLeft: `3px solid ${c.tagColor}`,
            borderRadius: 8,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
          }}>
            <div style={{ fontSize: 10.5, color: T.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .8, marginBottom: 6 }}>Source Excerpt</div>
            <div style={{ fontSize: 12.5, color: T.text, lineHeight: 1.7, fontStyle: 'italic' }}>"{c.excerpt}"</div>
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 8,
              background: T.bg, border: `1px solid ${T.border}`,
              fontSize: 11.5, color: T.sub,
            }}>
              <span style={{ fontSize: 14 }}>{c.icon}</span>
              <span style={{ fontWeight: 600 }}>{c.source}</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 10px', borderRadius: 8,
              background: T.bg, border: `1px solid ${T.border}`,
              fontSize: 11.5, color: T.sub,
            }}>
              <span>🗓</span>
              <span>Updated {c.updatedAt}</span>
            </div>
          </div>

          {/* Relevance + confidence */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              flex: 1, padding: '7px 10px', borderRadius: 8,
              background: c.tagBg, border: `1px solid ${c.tagColor}33`,
              fontSize: 11.5, color: c.tagColor, fontWeight: 600,
            }}>
              💡 {c.relevance}
            </div>
          </div>

          {/* Confidence meter */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10.5, color: T.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .8, marginBottom: 5 }}>Confidence Score</div>
            <ConfidenceBar value={c.confidence} />
          </div>
        </div>
      )}
    </div>
  );
}

function CitationDrilldown({ answerKey, query }) {
  const [expandedId, setExpandedId] = useState(null);
  const [visible, setVisible]       = useState(false);
  const citations = CITATIONS[answerKey] || CITATIONS.default;

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [answerKey]);

  const handleToggle = (id) => setExpandedId(p => p === id ? null : id);

  if (!visible) return null;

  return (
    <div style={{
      marginTop: 14,
      borderRadius: 16,
      background: T.card,
      border: `1.5px solid ${T.border}`,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,.05)',
      animation: 'fadeUp .3s ease',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 16px',
        background: 'linear-gradient(135deg,#fffaf5,#f5f3ff)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'linear-gradient(135deg,#fff0e8,#ede9fe)',
            border: `1.5px solid ${T.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15,
          }}>🔗</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Source Citations</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>
              {citations.length} verified source{citations.length > 1 ? 's' : ''} · Click any to expand
            </div>
          </div>
        </div>

        {/* Source count badges */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: 'Live', color: T.green, bg: T.greenL, border: T.greenD, count: citations.filter(c => c.tag === 'Live Data').length },
            { label: 'Policy', color: T.primary, bg: T.primaryL, border: T.orangeM, count: citations.filter(c => c.tag === 'Policy').length },
            { label: 'Other', color: T.amber, bg: T.amberL, border: T.amberD, count: citations.filter(c => !['Live Data','Policy'].includes(c.tag)).length },
          ].filter(b => b.count > 0).map(b => (
            <div key={b.label} style={{
              padding: '3px 9px', borderRadius: 20,
              background: b.bg, border: `1px solid ${b.border}`,
              fontSize: 10.5, color: b.color, fontWeight: 700,
            }}>{b.count} {b.label}</div>
          ))}
        </div>
      </div>

      {/* Citation cards */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {citations.map((c, i) => (
          <CitationCard
            key={c.id}
            c={c}
            index={i}
            expanded={expandedId === c.id}
            onToggle={() => handleToggle(c.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 16px',
        borderTop: `1px solid ${T.border}`,
        background: T.bg,
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: 5,
          background: T.greenL, border: `1px solid ${T.greenD}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: T.green, fontWeight: 800,
        }}>✓</div>
        <span style={{ fontSize: 11.5, color: T.muted }}>
          All sources verified against live HRMS data and official policy documents as of{' '}
          <span style={{ color: T.text, fontWeight: 700 }}>Apr 25, 2026</span>
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EXISTING SUB-COMPONENTS (unchanged)
══════════════════════════════════════════════════════════════════ */

function StatCard({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flex: 1, minWidth: 0, padding: '20px', borderRadius: 12, background: T.card, border: `1px solid ${hov ? T.primary : T.border}`, boxShadow: hov ? T.shadowHover : T.shadow, transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease', transform: hov ? 'translateY(-3px)' : 'none', cursor: 'default' }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>{s.icon}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>
        {s.value}<span style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginLeft: 6 }}>{s.unit}</span>
      </div>
      <div style={{ fontSize: 14, color: T.sub, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
    </div>
  );
}

function AnswerCard({ result, savedQueryId, onFeedbackDone }) {
  const [done,     setDone]     = useState(false);
  const [fbSaving, setFbSaving] = useState(false);
  const [fbError,  setFbError]  = useState('');
  const [showCite, setShowCite] = useState(false);

  const handleFeedback = async (positive) => {
    const value = positive ? 1 : -1;
    setFbSaving(true);
    setFbError('');
    try {
      if (savedQueryId) {
        await apiSaveFeedback(savedQueryId, value);
        console.log(`✅ Feedback saved → id=${savedQueryId}  value=${value}`);
      }
      onFeedbackDone(positive);
      setDone(true);
    } catch (err) {
      console.error('Feedback error:', err.message);
      setFbError('Could not save feedback — please try again.');
    } finally {
      setFbSaving(false);
    }
  };

  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '24px', boxShadow: T.shadow, animation: 'fadeUp .35s ease' }}>

      {/* Answer body */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: T.primaryL, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{result.icon}</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: T.text, lineHeight: 1.35 }}>{result.headline}</div>
          <div style={{ fontSize: 14, color: T.sub, marginTop: 8, lineHeight: 1.65 }}>{result.body}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, color: T.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>Quick Actions</div>
        {result.suggestions.map((s, i) => (
          <div key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px', background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, marginBottom: 6, cursor: 'pointer', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.background = T.orangeL; e.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.orange, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: T.text, flex: 1 }}>{s}</span>
            <span style={{ color: T.muted, fontSize: 14 }}>→</span>
          </div>
        ))}
      </div>

      {/* ── CITATION TOGGLE BUTTON ── */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 13, marginBottom: 2 }}>
        <button
          onClick={() => setShowCite(p => !p)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            width: '100%', padding: '9px 14px',
            borderRadius: 10,
            border: `1.5px solid ${showCite ? T.orange + '88' : T.border}`,
            background: showCite ? T.orangeL : T.card,
            cursor: 'pointer', transition: 'all .18s',
            fontFamily: "'Poppins',sans-serif",
          }}
          onMouseEnter={e => { if (!showCite) { e.currentTarget.style.borderColor = T.orange + '66'; e.currentTarget.style.background = T.orangeL; } }}
          onMouseLeave={e => { if (!showCite) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; } }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: 7, flexShrink: 0,
            background: showCite ? T.orange + '22' : T.bg,
            border: `1px solid ${showCite ? T.orange + '55' : T.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>🔗</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: showCite ? T.orange : T.text }}>
              View Source Citations
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>
              {(CITATIONS[result.key] || CITATIONS.default).length} verified sources behind this answer
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(CITATIONS[result.key] || CITATIONS.default).slice(0,3).map((c, i) => (
              <div key={i} style={{
                width: 20, height: 20, borderRadius: 6,
                background: c.tagBg, border: `1px solid ${c.tagColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11,
              }}>{c.icon}</div>
            ))}
          </div>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: showCite ? T.orange + '22' : T.bg,
            border: `1px solid ${showCite ? T.orange + '55' : T.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: showCite ? T.orange : T.muted,
            transform: showCite ? 'rotate(180deg)' : 'none',
            transition: 'all .2s', marginLeft: 2,
          }}>▼</div>
        </button>

        {/* Citation Drill-down Panel */}
        {showCite && (
          <CitationDrilldown answerKey={result.key} />
        )}
      </div>

      {/* Feedback */}
      {!done ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: `1px solid ${T.border}`, flexWrap: 'wrap', marginTop: 13 }}>
          <span style={{ fontSize: 12.5, color: T.muted, flex: 1 }}>Was this helpful?</span>
          {fbError && <span style={{ fontSize: 11, color: T.red, width: '100%', marginBottom: 4 }}>{fbError}</span>}
          {[{ l: '👍  Yes', p: true }, { l: '👎  No', p: false }].map(({ l, p }) => (
            <button key={l} onClick={() => handleFeedback(p)} disabled={fbSaving}
              style={{ padding: '6px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 600, border: `1px solid ${T.border}`, background: T.card, color: T.sub, cursor: fbSaving ? 'wait' : 'pointer', transition: 'all .2s ease', opacity: fbSaving ? 0.6 : 1, fontFamily: "'Poppins',sans-serif" }}
              onMouseEnter={e => { if (!fbSaving) { const cl = p ? T.green : T.red; const bg = p ? T.greenL : T.redL; e.currentTarget.style.borderColor = cl; e.currentTarget.style.color = cl; e.currentTarget.style.background = bg; } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.sub; e.currentTarget.style.background = T.card; }}
            >{fbSaving ? '…' : l}</button>
          ))}
        </div>
      ) : (
        <div style={{ paddingTop: 12, borderTop: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 8, marginTop: 13 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: T.greenL, border: `1.5px solid ${T.greenD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
          <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>Thanks! Your feedback has been saved.</span>
        </div>
      )}
    </div>
  );
}

function EventCard({ ev, fresh }) {
  const m = FM[ev.type] || FM.info;
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px', background: fresh ? m.bg : T.card, borderRadius: 12, marginBottom: 10, border: `1px solid ${fresh ? m.dot : T.border}`, boxShadow: fresh ? `0 8px 18px ${m.dot}66` : '0 4px 14px rgba(15,23,42,.05)', transition: 'all .2s ease', animation: fresh ? 'fadeUp .3s ease' : 'none' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: m.bg, border: `1px solid ${m.dot}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, color: m.c, fontWeight: 800 }}>{m.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.35 }}>{ev.title}</span>
          <span style={{ fontSize: 11, color: T.muted, whiteSpace: 'nowrap', marginTop: 1 }}>{ev.time}</span>
        </div>
        <div style={{ fontSize: 12, color: T.sub, marginTop: 3, lineHeight: 1.45 }}>{ev.detail}</div>
        <div style={{ display: 'inline-block', marginTop: 8, padding: '2px 9px', borderRadius: 999, background: m.bg, border: `1px solid ${m.dot}`, fontSize: 11, color: m.c, fontWeight: 700 }}>{m.label}</div>
      </div>
    </div>
  );
}

function RoleDropdown({ active, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cur = ROLES.find(r => r.id === active) || ROLES[0];

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px 7px 10px', borderRadius: 999, border: `1px solid ${open ? T.primary : T.border}`, background: open ? T.primaryL : T.card, cursor: 'pointer', transition: 'all .2s ease', outline: 'none', fontFamily: "'Poppins',sans-serif" }}>
        <span style={{ fontSize: 17 }}>{cur.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{cur.label}</span>
        <span style={{ fontSize: 10, color: T.muted, marginLeft: 2, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'inline-block' }}>▼</span>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 44, left: 0, width: 230, background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,.12)', zIndex: 50, overflow: 'hidden', animation: 'fadeUp .18s ease' }}>
          {ROLES.map(r => (
            <div key={r.id} onClick={() => { onSelect(r.id); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', cursor: 'pointer', background: r.id === active ? T.orangeL : 'transparent', borderLeft: r.id === active ? `3px solid ${T.orange}` : '3px solid transparent', transition: 'all .12s' }}
              onMouseEnter={e => { if (r.id !== active) e.currentTarget.style.background = T.bg; }}
              onMouseLeave={e => { if (r.id !== active) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.id === active ? T.orange : T.text }}>{r.label}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{r.desc}</div>
              </div>
              {r.id === active && <span style={{ marginLeft: 'auto', fontSize: 13, color: T.orange }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RolePlaceholder({ role }) {
  const cfg = {
    hr:      { icon: '🏢', title: 'HR Manager View',  desc: 'Team analytics, headcount, attrition, open positions and hiring pipeline.' },
    finance: { icon: '💼', title: 'Finance View',     desc: 'Payroll runs, CTC management, reimbursements and tax filings.' },
    admin:   { icon: '⚙️', title: 'Admin View',       desc: 'User management, system configuration and audit logs.' },
  };
  const c = cfg[role] || {};
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 340 }}>
        <div style={{ fontSize: 56, marginBottom: 18 }}>{c.icon}</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: T.text, marginBottom: 10 }}>{c.title}</div>
        <div style={{ fontSize: 14, color: T.sub, lineHeight: 1.7, marginBottom: 24 }}>{c.desc}</div>
        <div style={{ padding: '12px 20px', background: T.orangeL, border: `1.5px solid ${T.orangeM}`, borderRadius: 12, fontSize: 13, color: T.orange, fontWeight: 600 }}>
          🔒 Role access required — contact your system administrator
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT (unchanged except AnswerCard now has citations)
══════════════════════════════════════════════════════════════════ */
export default function UserDashboard({ onClose, userName = CURRENT_USER.name }) {
  const [role,      setRole]      = useState('user');
  const [query,     setQuery]     = useState('');
  const [result,    setResult]    = useState(null);
  const [savedId,   setSavedId]   = useState(null);
  const [history,   setHistory]   = useState([]);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState('');
  const [events,    setEvents]    = useState(SEED_EVENTS);
  const [freshIds,  setFreshIds]  = useState(new Set());
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setInterval(async () => {
      const ev = mkLocalEvent();
      setEvents(p => [ev, ...p].slice(0, 60));
      setFreshIds(p => new Set([...p, ev.id]));
      setTimeout(() => setFreshIds(p => { const n = new Set(p); n.delete(ev.id); return n; }), 4000);
      try {
        await apiSaveEvent({ type: ev.type, title: ev.title, detail: ev.detail });
      } catch (e) {
        console.warn('Event save skipped (backend offline?):', e.message);
      }
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const runQuery = async (q) => {
    const ans = getAnswer(q);
    setResult(ans);
    setSavedId(null);
    setSaveError('');
    setHistory(p => [q, ...p.filter(x => x !== q)].slice(0, 5));
    setSaving(true);

    try {
      const response = await apiSaveQuery({
        user_id:    CURRENT_USER.user_id,
        department: CURRENT_USER.department,
        user_query: q,
        answer:     `${ans.headline} — ${ans.body}`,
        answer_key: ans.key,
      });
      const dbRow = response.data;
      setSavedId(dbRow.id);
      console.log(`✅ Query saved to DB:`, {
        id:         dbRow.id,
        user_id:    dbRow.user_id,
        department: dbRow.department,
        user_query: dbRow.user_query,
        answer_key: dbRow.answer_key,
        timestamp:  dbRow.timestamp,
      });
    } catch (err) {
      console.error('Save query error:', err.message);
      setSaveError(`Could not save query (${err.message}). Showing answer anyway.`);
    } finally {
      setSaving(false);
    }
  };

  const handleAsk = () => {
    const q = query.trim();
    if (!q || saving) return;
    runQuery(q);
    setQuery('');
  };

  const initials = userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT_URL} rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
        .ud-chip:hover  { background:${T.primaryL}!important; border-color:${T.primary}!important; color:${T.primary}!important; transform:translateY(-1px); }
        .ud-ql:hover    { transform:translateY(-3px); border-color:${T.primary}!important; box-shadow:${T.shadowHover}!important; }
        .ud-close:hover { background:${T.redL}!important; color:${T.red}!important; border-color:${T.redD}!important; }
        .ud-scroll::-webkit-scrollbar { width:4px }
        .ud-scroll::-webkit-scrollbar-track { background:transparent }
        .ud-scroll::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:4px }
      `}</style>

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: T.bg, zIndex: 1000, fontFamily: "'Poppins',sans-serif", overflow: 'hidden', animation: 'fadeUp .3s ease' }}>

        {/* ── HEADER ── */}
        {false && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 24px', background: T.card, borderBottom: `1px solid ${T.border}`, boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${T.primary},${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff', boxShadow: `0 4px 14px rgba(89,41,208,.24)` }}>{initials}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{userName}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>HR Manager · Employee Portal</div>
              </div>
              <div style={{ width: 1, height: 32, background: T.border, margin: '0 6px' }} />
              <RoleDropdown active={role} onSelect={setRole} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 20, background: saveError ? T.amberL : T.greenL, border: `1.5px solid ${saveError ? T.amberD : T.greenD}` }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: saveError ? T.amber : T.green, animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 11.5, color: saveError ? T.amber : T.green, fontWeight: 700 }}>
                  {saveError ? 'DB Offline' : 'DB Connected'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 20, background: T.greenL, border: `1.5px solid ${T.greenD}` }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.green, animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 11.5, color: T.green, fontWeight: 700 }}>Live</span>
              </div>
              <button className="ud-close" onClick={onClose} style={{ width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.card, color: T.muted, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s', outline: 'none' }}>✕</button>
            </div>
          </div>
        )}

        {/* ── BODY ── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

          {/* ══ LEFT ══ */}
          <div className="ud-scroll" style={{ flex: 1, overflowY: 'auto', padding: '32px', minWidth: 0, borderRight: `1px solid ${T.border}` }}>

            {role !== 'user' ? <RolePlaceholder role={role} /> : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase', color: T.accent, marginBottom: 8 }}>My Dashboard</div>
                  <h2 style={{ fontSize: 32, fontWeight: 600, color: T.text, margin: 0, lineHeight: 1.18 }}>
                    Good morning, <span style={{ color: T.primary }}>{userName.split(' ')[0]}!</span>
                  </h2>
                  <p style={{ fontSize: 14, color: T.sub, margin: '12px 0 0', lineHeight: 1.6 }}>
                    Here's your HR snapshot for today ·{' '}
                    <span style={{ color: T.text, fontWeight: 700 }}>
                      {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 16, marginBottom: 32 }}>
                  {USER_STATS.map(s => <StatCard key={s.label} s={s} />)}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: T.muted, marginBottom: 16 }}>Quick Links</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                    {QUICK_LINKS.map(q => (
                      <div key={q.label} className="ud-ql"
                        style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 72, padding: '14px 16px', background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, cursor: 'pointer', transition: 'all .2s ease', boxShadow: '0 4px 14px rgba(15,23,42,.05)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.background = T.card; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}
                      >
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: q.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{q.icon}</div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{q.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: T.border }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: T.card, border: `1px solid ${T.border}`, borderRadius: 999, boxShadow: '0 4px 14px rgba(15,23,42,.04)' }}>
                    <span style={{ fontSize: 14 }}>🔍</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.sub }}>HR Self-Service Search</span>
                  </div>
                  <div style={{ flex: 1, height: 1, background: T.border }} />
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.muted, pointerEvents: 'none' }}>🔍</span>
                    <input ref={inputRef} value={query}
                      onChange={e => setQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAsk()}
                      placeholder="Ask about leave, salary, appraisal, attendance, policy…"
                      style={{ width: '100%', padding: '17px 18px 17px 52px', borderRadius: 16, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 14, outline: 'none', boxSizing: 'border-box', transition: 'border .2s, box-shadow .2s', fontFamily: "'Poppins',sans-serif", boxShadow: '0 8px 24px rgba(15,23,42,.06)' }}
                      onFocus={e => { e.target.style.borderColor = T.primary; e.target.style.boxShadow = `0 0 0 4px rgba(89,41,208,.12), 0 12px 30px rgba(15,23,42,.08)`; }}
                      onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = '0 8px 24px rgba(15,23,42,.06)'; }}
                    />
                  </div>
                  <button onClick={handleAsk} disabled={saving}
                    style={{ padding: '0 28px', borderRadius: 999, border: 'none', background: `linear-gradient(135deg,${T.primary},${T.accent})`, color: '#fff', fontWeight: 700, fontSize: 14, cursor: saving ? 'wait' : 'pointer', boxShadow: `0 12px 26px rgba(89,41,208,.26)`, transition: 'transform .2s ease, box-shadow .2s ease', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap', opacity: saving ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!saving) { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 16px 34px rgba(207,0,139,.28)`; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 12px 26px rgba(89,41,208,.26)`; }}
                  >{saving ? '⏳ Saving…' : 'Ask →'}</button>
                </div>

                {saveError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 13px', background: T.amberL, border: `1px solid ${T.amberD}`, borderRadius: 9, marginBottom: 12, fontSize: 12, color: T.amber, fontWeight: 600 }}>
                    ⚠️ {saveError}
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {['Leave balance', 'Payslip', 'Attendance', 'Appraisal', 'Training', 'Policy', 'Helpdesk'].map(t => (
                    <button key={t} className="ud-chip" onClick={() => runQuery(t)} disabled={saving}
                      style={{ height: 40, padding: '0 18px', borderRadius: 999, border: `1px solid ${T.border}`, background: T.card, color: T.sub, fontSize: 13, fontWeight: 500, cursor: saving ? 'wait' : 'pointer', transition: 'all .2s ease', fontFamily: "'Poppins',sans-serif", boxShadow: '0 3px 10px rgba(15,23,42,.04)' }}
                    >{t}</button>
                  ))}
                </div>

                {result && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ flex: 1, height: 1, background: T.border }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10.5, color: T.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Answer</span>
                        {savedId && (
                          <span style={{ fontSize: 10, color: T.green, background: T.greenL, border: `1px solid ${T.greenD}`, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                            ✓ Saved to DB #{savedId}
                          </span>
                        )}
                        {saving && (
                          <span style={{ fontSize: 10, color: T.amber, background: T.amberL, border: `1px solid ${T.amberD}`, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                            ⏳ Saving…
                          </span>
                        )}
                      </div>
                      <div style={{ flex: 1, height: 1, background: T.border }} />
                    </div>
                    <AnswerCard
                      key={result.headline}
                      result={result}
                      savedQueryId={savedId}
                      onFeedbackDone={pos => console.log('Feedback:', pos ? '👍' : '👎', '| DB row:', savedId)}
                    />
                  </>
                )}

                {history.length > 1 && (
                  <div style={{ marginTop: 24 }}>
                    <div style={{ fontSize: 10.5, color: T.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>Recent Searches</div>
                    {history.slice(1).map((h, i) => (
                      <button key={i} onClick={() => runQuery(h)} disabled={saving}
                        style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid transparent', background: 'transparent', cursor: saving ? 'wait' : 'pointer', textAlign: 'left', color: T.sub, fontSize: 13, transition: 'all .2s ease', fontFamily: "'Poppins',sans-serif" }}
                        onMouseEnter={e => { e.currentTarget.style.background = T.card; e.currentTarget.style.borderColor = T.border; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                      >
                        <span style={{ opacity: .4, fontSize: 14 }}>↺</span>{h}
                      </button>
                    ))}
                  </div>
                )}

                {!result && (
                  <div style={{ marginTop: 8, textAlign: 'center', padding: '48px 24px', background: 'rgba(255,255,255,.76)', borderRadius: 12, border: `1px dashed ${T.border}`, boxShadow: '0 8px 24px rgba(15,23,42,.04)' }}>
                    <div style={{ fontSize: 34, marginBottom: 10 }}>💬</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.text, marginBottom: 8 }}>Ask anything about your HR data</div>
                    <div style={{ fontSize: 14, color: T.muted }}>Try "What's my leave balance?" or tap a topic chip above.</div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ══ RIGHT — LIVE FEED ══ */}
          <div style={{ width: 288, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'rgba(248,250,252,.92)', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ flexShrink: 0, padding: '20px 16px 16px', background: 'rgba(248,250,252,.96)', borderBottom: `1px solid ${T.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Live Activity</span>
                </div>
                <span style={{ fontSize: 12, color: T.sub, fontWeight: 700, background: T.card, border: `1px solid ${T.border}`, padding: '4px 10px', borderRadius: 999 }}>{events.length}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {Object.entries(FM).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: v.c }} />
                    <span style={{ fontSize: 11, color: T.sub, textTransform: 'capitalize', fontWeight: 500 }}>{k}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ud-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 20px', minHeight: 0 }}>
              {events.map(ev => <EventCard key={ev.id} ev={ev} fresh={freshIds.has(ev.id)} />)}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
