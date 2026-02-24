import {
    Users, ClipboardCheck, Globe, Briefcase,
    UserPlus, Banknote
} from 'lucide-react';
import React from 'react';

export interface Service {
    id: string;
    slug: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    image: string;
    secondaryImage: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    process: string[];
}

export const services: Service[] = [
    {
        id: '01',
        slug: 'permanent-staffing',
        title: 'Permanent Hiring',
        icon: Users,
        image: 'https://img.freepik.com/free-photo/smiling-young-couple-shaking-hands-with-insurance-agent_1139-978.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/businesspeople-working-finance-accounting-office_23-2148908915.jpg?w=740',
        shortDescription: 'We help organizations hire expert full-time talent across IT and Non-IT roles using creative sourcing strategies.',
        fullDescription: `In today's highly competitive market, finding the right permanent talent is the bedrock of organizational stability and long-term innovation. At TRYITTECH LLP, we don't just fill vacancies; we build your core workforce. We specialize in identifying high-caliber professionals for both IT and Non-IT roles, ensuring they align perfectly with your technical requirements and corporate culture.

Our methodology is rigorous and data-driven. We leverage a proprietary database of millions of pre-screened professionals and employ multi-channel sourcing—including social recruitment and passive candidate headhunting—to find the 10% of talent that truly drives business outcomes. From executive leadership to specialized technical contributors, our permanent staffing models are designed to reduce turnover and maximize ROI.`,
        benefits: [
            'Access to a proprietary database of over 1M pre-screened professionals.',
            'Reduced time-to-hire by 40% through specialized sourcing workflows.',
            'In-depth cultural fit & behavioral assessment to ensure 95%+ retention.',
            '90-day replacement guarantee providing risk-free hiring confidence.',
            'Dedicated account managers specializing in your specific industry vertical.'
        ],
        process: ['Requirement Analysis', 'Strategic Sourcing', 'Technical Vetting', 'Client Interviews', 'Onboarding Support']
    },
    {
        id: '02',
        slug: 'contract-staffing',
        title: 'Contract Staffing',
        icon: ClipboardCheck,
        image: 'https://img.freepik.com/premium-photo/executives-shaking-hands-office_13339-73579.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/diverse-business-people-office_53876-13350.jpg?w=740',
        shortDescription: 'Temporary staffing solutions enabling enterprises to focus on core business operations with strategic agility.',
        fullDescription: `Operational agility is critical in the modern business landscape. Our contract staffing services empower your organization to respond rapidly to project-based demands, seasonal peaks, or specialized skill gaps without the long-term liabilities of permanent headcount.

We manage the entire lifecycle of your temporary workforce—from statutory compliance and payroll to benefits and offboarding. By acting as the Employer of Record (EOR), TRYITTECH LLP assumes the administrative burden, allowing your internal leadership to focus exclusively on project delivery. Our contract pool includes thousands of pre-vetted specialists in Java, Python, SAP, Cloud Architecture, and Executive Management, ready for immediate deployment.`,
        benefits: [
            'Rapid scaling of technical teams to meet sudden project deadlines.',
            'Elimination of administrative overhead and employee liability.',
            '100% compliance with Indian labor laws (PF, ESI, Gratuity, PT).',
            'Shorter hiring cycles with access to 50,000+ active contractors.',
            'Flexible "Contract-to-Hire" models for evaluating potential before permanent offers.'
        ],
        process: ['Resource Profiling', 'Vetting & Screening', 'Client Evaluation', 'Compliance Setup', 'Resource Deployment']
    },
    {
        id: '03',
        slug: 'offshore-it-staffing',
        title: 'Offshore IT Hub',
        icon: Globe,
        image: 'https://img.freepik.com/free-photo/business-team-boardroom-attend-videocall-meeting-with-investors-group-discussing-about_482257-133177.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/software-developer-working-office_23-2148908906.jpg?w=740',
        shortDescription: 'Cost-effective offshore IT staffing solutions that save time, cost, and significant operational effort.',
        fullDescription: `Unlock the massive potential of global talent with our Offshore IT Staffing solutions. India remains the world's most sought-after destination for technical excellence, and TRYITTECH LLP provides the bridge to this elite talent pool. We help international businesses establish "Global Capability Centers" (GCCs) or specialized offshore teams in our Hyderabad hub.

Our model provides more than just developers; we provide a complete, secure infrastructure and a managed environment that acts as a seamless extension of your home office. By leveraging India's time-zone advantages, we enable 24/7 development cycles, allowing your business to move faster while optimizing costs by up to 70% compared to Western markets.`,
        benefits: [
            '30-70% reduction in total cost of ownership compared to US/EU hiring.',
            'Access to India\'s massive pool of 5M+ technical professionals.',
            'Comprehensive IP protection and enterprise-grade security protocols.',
            'Full management of Indian tax, labor law, and local compliance.',
            'Overnight turnaround cycles with efficient 24/7 delivery frameworks.'
        ],
        process: ['GCC Strategy', 'Infrastructure Setup', 'Talent Pod Building', 'Knowledge Transfer', 'Operational Scale']
    },
    {
        id: '04',
        slug: 'staff-augmentation',
        title: 'Staff Augmentation',
        icon: UserPlus,
        image: 'https://img.freepik.com/free-photo/close-up-company-team-working_23-2149114777.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/colleagues-working-together-office_23-2148908918.jpg?w=740',
        shortDescription: 'Dedicated IT professionals and fully managed teams tailored to your specific technical business needs.',
        fullDescription: `Bridge critical skill gaps instantly with Staff Augmentation. Unlike traditional hiring, Staff Augmentation allows you to inject specialized expertise directly into your internal teams for the exact duration you need it. Whether you're missing a DevOps architect, a Data Scientist, or a Frontend specialist, we provide the talent while you retain full project control.

Our augmented staff follows your processes, uses your tools, and reports to your managers—but TRYITTECH LLP handles the employment liablity, training, and benefits. This "Plug-and-Play" model accelerates your time-to-market while avoiding the long-term overheads of permanent hiring for project-specific needs.`,
        benefits: [
            'Immediate access to niche skillsets (AI, Blockchain, SAP, Azure).',
            'Zero recruitment costs and training overhead for your company.',
            'Maintain 100% control over project direction and IP.',
            'Highly flexible termination/scaling clauses for project-based work.',
            'Seamless integration with internal Agile or DevOps cultures.'
        ],
        process: ['Skill Mapping', 'Rapid Interviewing', 'Onboarding', 'Integration', 'Performance Management']
    },
    {
        id: '05',
        slug: 'managed-rpo',
        title: 'RPO Frameworks',
        icon: Briefcase,
        image: 'https://img.freepik.com/premium-photo/human-resources-talent-management-recruitment-business-concept_926199-2026683.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/businesswoman-working-office_23-2148908902.jpg?w=740',
        shortDescription: 'Scalable talent acquisition models (Recruitment Process Outsourcing) that evolve with business growth.',
        fullDescription: `Our Recruitment Process Outsourcing (RPO) is a strategic, long-term partnership where TRYITTECH LLP manages all or part of your recruitment lifecycle. We act as an extension of your company, using our specialized tools, employer branding expertise, and US-backed methodologies to build a high-performing talent pipeline.

An RPO transformation isn't just about filling seats; it's about rebuilding your hiring engine. We optimize your sourcing technologies, refine your candidate experience, and implement rigorous data analytics to drive down your cost-per-hire. Whether you need an End-to-End RPO, Project-based hiring, or Recruiters-on-Demand, we scale with your growth.`,
        benefits: [
            'Lower cost-per-hire through optimized sourcing technologies.',
            'Advanced AI-driven analytics for predicting hiring trends.',
            'Enhanced employer brand through professional candidate experience.',
            'Strategic scalability to manage massive hiring surges (100+ hires).',
            'Improved quality of hire through multi-tiered assessment frameworks.'
        ],
        process: ['Hiring Audit', 'Branding Strategy', 'Technology Integration', 'Candidate Pipeline Building', 'Full-Cycle Hiring']
    },
    {
        id: '06',
        slug: 'payroll-services',
        title: 'Payroll Services',
        icon: Banknote,
        image: 'https://img.freepik.com/free-photo/top-view-man-writing-something-paper-with-keyboard-eyeglasses-pen-cactus-magnifier-wooden-background-horizontal_176474-6280.jpg?w=740',
        secondaryImage: 'https://img.freepik.com/free-photo/calculator-finance-accounting-concept_53876-121652.jpg?w=740',
        shortDescription: 'End-to-end payroll solutions for Indian businesses, ensuring compliance and operational excellence.',
        fullDescription: `Managing payroll in India is a complex balancing act of local labor laws, tax codes, and statutory requirements. TRYITTECH LLP takes this burden off your shoulders, providing a zero-error, 100% compliant payroll engine. We handle everything from salary processing and PF/ESI calculations to professional tax and income tax filings.

Our payroll solution is built on modern, secure, and cloud-based technology. We provide an Employee Self-Service (ESS) platform where your staff can access payslips and tax declarations effortlessly. By outsourcing your payroll to us, you eliminate administrative errors, ensure timely payments, and maintain perfect standing with all Indian regulatory bodies.`,
        benefits: [
            'Zero-error salary processing with automated cloud workflows.',
            'Full management of PF, ESI, Gratuity, LWF, and Professional Tax.',
            'Secure Employee Self-Service (ESS) portal for pay and tax info.',
            'Direct handling of all salary-related employee queries.',
            'Comprehensive monthly and annual compliance reporting for audits.'
        ],
        process: ['Policy Alignment', 'Employee Data Setup', 'Calculation & Processing', 'Statutory Filing', 'Query Management']
    }
];
