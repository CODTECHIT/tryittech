import {
    Users, FileText, Globe, Briefcase,
    GitBranch, Banknote
} from 'lucide-react';

export const services = [
    {
        id: '01',
        slug: 'permanent-staffing',
        title: 'Permanent Staffing',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
        shortDescription: 'We help organizations hire expert full-time talent across IT and Non-IT roles using creative sourcing strategies.',
        fullDescription: `In today's volatile market, finding the right permanent talent is the cornerstone of organizational stability. At TRYITTECH LLP, we simplify technical and non-technical recruitment by matching your company culture with candidates who possess the right skills and mindset. 

Our approach goes beyond keyword matching. We utilize deep-market insights and multi-channel sourcing to identify high-performers who are not actively searching but are ready for the right opportunity. Whether you are scaling a startup or reinforcing an enterprise team, our permanent staffing models are designed for long-term success.`,
        benefits: [
            'Access to a proprietary database of pre-screened professionals.',
            'Reduced time-to-hire through efficient sourcing workflows.',
            'Cultural fit assessment to ensure long-term retention.',
            'Replacement guarantees for peace of mind.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Contract Signing', 'Candidate Interview', 'Closure']
    },
    {
        id: '02',
        slug: 'contract-staffing',
        title: 'Contract Staffing',
        icon: FileText,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        shortDescription: 'Temporary staffing solutions enabling enterprises to focus on core business operations with strategic agility.',
        fullDescription: `Agility is the new currency in business. Our contract staffing services empower organizations to manage seasonal workloads, project-based requirements, and specialized skill gaps without the long-term overhead of permanent hiring.

We handle the entire lifecycle of temporary staff, from onboarding and compliance to payroll and offboarding. This allows your core team to remain focused on mission-critical objectives while we maintain the workforce flexibility you need to stay competitive.`,
        benefits: [
            'Flexible workforce scaling based on project demands.',
            'Significant reduction in administrative and HR overhead.',
            'Immediate access to specialized technical skills.',
            'Simplified budgeting with transparent contractual costs.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Internal Interview', 'Client Interview', 'Contract Signing', 'Closure']
    },
    {
        id: '03',
        slug: 'offshore-it-staffing',
        title: 'Offshore IT Staffing',
        icon: Globe,
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
        shortDescription: 'Cost-effective offshore IT staffing solutions that save time, cost, and significant operational effort.',
        fullDescription: `Leverage the power of global talent with our Offshore IT Staffing solutions. We help international businesses establish and manage high-performing technical teams in India, providing a seamless extension to their home-base operations.

Operating from our Hyderabad hub, we bridge the gap between global expectations and Indian excellence. We provide the infrastructure, management, and local compliance expertise, allowing you to benefit from 24/7 productivity and significant cost optimizations without sacrificing quality.`,
        benefits: [
            '50-70% cost savings compared to on-shore hiring.',
            'Highly scalable delivery models (PODs, Managed Teams).',
            'Overnight turnaround cycles with time-zone advantages.',
            'Comprehensive IP protection and secure infrastructure.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Internal Interview', 'Client Interview', 'Finalization', 'Closure']
    },
    {
        id: '04',
        slug: 'staff-augmentation',
        title: 'Staff Augmentation',
        icon: Briefcase,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        shortDescription: 'Dedicated IT professionals and fully managed teams tailored to your specific technical business needs.',
        fullDescription: `Bridge specific skill gaps instantly with our Staff Augmentation services. Instead of hiring a full team, you can add specific expertise—developers, architects, or project managers—directly into your existing workflows.

Our augmented staff works under your direction, following your processes and tools, but they are managed and employed by TRYITTECH LLP. This model provides the high-level control of in-house hiring with the speed and flexibility of outsourcing.`,
        benefits: [
            'Eliminate the cost of traditional recruitment and training.',
            'Maintain full control over project direction and standards.',
            'Avoid long-term liability for niche, project-specific roles.',
            'Seamless integration with your internal dev/ops culture.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Internal Interview', 'Client Interview', 'Resource Deployment', 'Closure']
    },
    {
        id: '05',
        slug: 'managed-rpo',
        title: 'Managed RPO',
        icon: GitBranch,
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
        shortDescription: 'Scalable talent acquisition models (Recruitment Process Outsourcing) that evolve with business growth.',
        fullDescription: `Our Recruitment Process Outsourcing (RPO) is a strategic partnership where we take full ownership of the recruitment function. From employer branding and sourcing technology to interviewing and onboarding, we become your internal talent acquisition department.

An RPO with TRYITTECH LLP is not just about filling seats; it's about transforming your hiring ecosystem. We bring 10+ years of US-backed expertise to refine your processes, improve candidate quality, and lower the overall cost-per-hire through data-driven strategies.`,
        benefits: [
            'Transformation of hiring from a cost-center to a value-driver.',
            'Advanced analytics and reporting on recruitment KPIs.',
            'Enhanced employer brand through consistent candidate experiences.',
            'Built-in scalability to handle sudden hiring surges.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Plan Derivation', 'Choice of Actions', 'Contract Finalization', 'Implementation']
    },
    {
        id: '06',
        slug: 'payroll-services',
        title: 'Payroll Services',
        icon: Banknote,
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        shortDescription: 'End-to-end payroll solutions for Indian businesses, ensuring compliance and operational excellence.',
        fullDescription: `Managing payroll in India involves navigating complex labor laws, tax regulations, and compliance requirements. Our Payroll Services take this burden off your shoulders, ensuring your employees are paid accurately and on time, every time.

We provide a comprehensive platform for salary processing, statutory compliance (PF, ESI, PT), web-based reporting, and query handling. Our team ensures that your organization remains 100% compliant with local regulations while providing a transparent, professional experience for your workforce.`,
        benefits: [
            'Zero-error payroll processing with automated workflows.',
            'Complete handling of statutory compliance and filings.',
            'Dedicated helpdesk for employee salary and tax queries.',
            'Secure, cloud-based access to payslips and tax declarations.'
        ],
        process: ['Requirement Gathering', 'Requirement Discussion', 'Payroll Execution', 'Complaints Handling', 'Contract Finalization', 'Closure']
    }
];
