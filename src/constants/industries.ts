import { LucideIcon, Cpu, Briefcase, HeartPulse, Building2, Car, Truck, ShoppingBag, Radio, Factory, Headphones, Zap, Target, Shield, BarChart3, Globe, Users, Award, Lightbulb } from 'lucide-react';

export interface Industry {
    id: string;
    slug: string;
    name: string;
    image: string;
    secondaryImage: string;
    icon: LucideIcon;
    info: string;
    overview: string;
    segments: {
        title: string;
        description: string;
    }[];
    solutions: {
        title: string;
        description: string;
    }[];
    insights: {
        title: string;
        category: string;
        image: string;
    }[];
    edge: {
        title: string;
        description: string;
        icon: LucideIcon;
    }[];
}

export const industriesData: Industry[] = [
    {
        id: 'it',
        slug: 'it',
        name: 'Information Technology',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/hitech-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_DPE_L1_B1_Desktop.jpg',
        icon: Cpu,
        info: 'Innovative tech leadership search and digital transformation staffing.',
        overview: 'The Information Technology sector is the backbone of modern global enterprises. At TRYITTECH LLP, we specialize in identifying and placing top-tier technical talent that drives innovation. From Cloud Architects to Cybersecurity Experts, we provide the human capital necessary to navigate the rapidly evolving digital landscape.',
        segments: [
            { title: 'Software Engineering', description: 'Placing experts in Full Stack, Mobile, and Specialized Backend development.' },
            { title: 'Cloud & Infrastructure', description: 'Specialized talent for AWS, Azure, and Google Cloud ecosystems.' },
            { title: 'Data Science & AI', description: 'Hiring Ph.D. level researchers and experienced machine learning engineers.' }
        ],
        solutions: [
            { title: 'Digital Transformation Staffing', description: 'Building teams to transition legacy systems to modern architectures.' },
            { title: 'On-Demand Tech Scaling', description: 'Rapidly deploying augmented teams for project-critical deadlines.' }
        ],
        insights: [
            { title: 'The Future of AI in Enterprise', category: 'Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
            { title: 'Cloud Migration Strategies for 2026', category: 'Cloud', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80' }
        ],
        edge: [
            { title: 'Agile Delivery', description: 'Faster time-to-market with our rapid deployment models.', icon: Zap },
            { title: 'Tech Excellence', description: 'Access to the top 1% of specialized technical talent.', icon: Target },
            { title: 'Global Grid', description: '24/7 follow-the-sun delivery model for unified support.', icon: Globe },
            { title: 'Strategic Scale', description: 'Ability to scale teams from 5 to 500 within weeks.', icon: BarChart3 }
        ]
    },
    {
        id: 'healthcare',
        slug: 'healthcare',
        name: 'Healthcare',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/Health-Lifescience-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg',
        icon: HeartPulse,
        info: 'Specialized medical talent acquisition and healthcare IT solutions.',
        overview: 'Healthcare is undergoing a massive digital shift. We bridge the gap between medical expertise and technological efficiency. Our talent network includes specialized healthcare IT professionals, clinical researchers, and administrative leadership that understands the nuances of patient care and regulatory compliance.',
        segments: [
            { title: 'HealthTech', description: 'Experts in Electronic Health Records (EHR) and telehealth platforms.' },
            { title: 'BioTech', description: 'Staffing for laboratory research and development phases.' },
            { title: 'Clinical Staffing', description: 'Specialized placement for nursing, therapy, and clinical management.' }
        ],
        solutions: [
            { title: 'Regulatory Compliance Teams', description: 'Building teams focused on HIPAA and GDPR healthcare standards.' },
            { title: 'Medical Research Augmentation', description: 'Scalable research teams for clinical trials.' }
        ],
        insights: [
            { title: 'Telehealth Evolution', category: 'Healthcare', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80' },
            { title: 'AI in Drug Discovery', category: 'Life Sciences', image: 'https://images.unsplash.com/photo-1532187863486-abf51ad9869d?w=800&q=80' }
        ],
        edge: [
            { title: 'HIPAA Ready', description: 'Full compliance with international medical data standards.', icon: Shield },
            { title: 'Clinical Speed', description: 'Accelerate R&D phases with specialized medical talent.', icon: Zap },
            { title: 'Patient Centric', description: 'Solutions designed with patient outcomes at the core.', icon: Users },
            { title: 'Innovation DNA', description: 'Integrating future-tech into legacy medical systems.', icon: Lightbulb }
        ]
    },
    {
        id: 'bfsi',
        slug: 'bfsi',
        name: 'BFSI',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/Banking-secor.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_DA_L1_B1_Desktop.jpg',
        icon: Building2,
        info: 'Secure banking and finance staffing for the digital economy.',
        overview: 'In the Banking, Financial Services, and Insurance (BFSI) sector, security and precision are paramount. We provide professionals who understand the complexities of Fintech, High-Frequency Trading, and risk management. Our candidates bring both technical prowess and deep domain knowledge of global financial regulations.',
        segments: [
            { title: 'Fintech', description: 'Innovative talent for payment gateways and blockchain-based finance.' },
            { title: 'Investment Banking', description: 'Quantitative analysts and high-speed trading system developers.' },
            { title: 'Insurance Technology', description: 'Modernizing claims processing and risk assessment through technology.' }
        ],
        solutions: [
            { title: 'Security-First Staffing', description: 'Placing cybersecurity experts with deep financial sector experience.' },
            { title: 'Compliance Modernization', description: 'Teams focused on automating regulatory reporting and transparency.' }
        ],
        insights: [
            { title: 'Digital Banking Trends', category: 'Fintech', image: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?w=800&q=80' },
            { title: 'Cybersecurity in Finance', category: 'Security', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80' }
        ],
        edge: [
            { title: 'Risk Mitigated', description: 'Rigorous vetting for security-cleared financial talent.', icon: Shield },
            { title: 'Fintech Fluent', description: 'Deep understanding of modern digital payment ecosystems.', icon: Zap },
            { title: 'Legacy Bridge', description: 'Seamlessly migrating core banking to the cloud.', icon: BarChart3 },
            { title: 'Compliance Lead', description: 'Staying ahead of evolving global finance regulations.', icon: Award }
        ]
    },
    {
        id: 'automotive',
        slug: 'automotive',
        name: 'Automotive',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/manufacturi-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/cloud-infrastructure.jpg',
        icon: Car,
        info: 'Driving automotive excellence through advanced manufacturing talent.',
        overview: 'The automotive industry is being redefined by electrification and autonomous systems. TRYITTECH LLP provides the specialized engineering talent required for the next generation of mobility. From hardware engineers for EV batteries to software developers for ADAS systems, we power the future of transportation.',
        segments: [
            { title: 'Electric Vehicles', description: 'Engineers specializing in battery chemistry and power electronics.' },
            { title: 'Autonomous Driving', description: 'Computer vision and sensor fusion experts.' },
            { title: 'Smart Manufacturing', description: 'IoT and robotics specialists for the assembly floor.' }
        ],
        solutions: [
            { title: 'EV R&D Teams', description: 'Complete research teams for breakthrough mobility technologies.' },
            { title: 'Supply Chain Optimization', description: 'Strategic staffing for automotive logistics and procurement.' }
        ],
        insights: [
            { title: 'The EV Revolution', category: 'Automotive', image: 'https://images.unsplash.com/photo-1593941707882-a5bba149a4f4?w=800&q=80' },
            { title: 'Autonomous AI Safety', category: 'AI', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80' }
        ],
        edge: [
            { title: 'Industry 4.0', description: 'Leaders in smart factory staffing and automation.', icon: Factory },
            { title: 'Mobility First', description: 'Experts in future-mobility and autonomous software.', icon: Zap },
            { title: 'Supply Expert', description: 'Deep visibility into automotive supply chain talent.', icon: Target },
            { title: 'Global Bench', description: 'Access to specialized European and Asian automotive talent.', icon: Globe }
        ]
    },
    {
        id: 'logistics',
        slug: 'logistics',
        name: 'Logistics',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/travel-Transpost-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/06/Cloud-Services-thumb-1.jpg',
        icon: Truck,
        info: 'Optimizing supply chain talent for global trade and local delivery.',
        overview: 'Logistics and supply chain management are more complex than ever. We provide the strategic thinkers and operational experts who keep the world moving. Our candidates specialize in last-mile delivery technology, warehousing automation, and global trade compliance.',
        segments: [
            { title: 'Supply Chain Strategy', description: 'Analysts and managers for global shipment optimization.' },
            { title: 'Warehouse Automation', description: 'Robotics and software experts for modern fulfillment centers.' },
            { title: 'Freight Tech', description: 'Developing platforms for real-time tracking and logistics transparency.' }
        ],
        solutions: [
            { title: 'Last-Mile Efficiency Teams', description: 'Specialized talent for urban delivery and route optimization.' },
            { title: 'Inventory Resilience Planning', description: 'Staffing for risk management and supply continuity.' }
        ],
        insights: [
            { title: 'Last-Mile Delivery Tech', category: 'Logistics', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' },
            { title: 'Automated Fulfillment', category: 'Automation', image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad54?w=800&q=80' }
        ],
        edge: [
            { title: 'Real-time Talent', description: 'Staffing for real-time logistics tracking systems.', icon: Zap },
            { title: 'Global Reach', description: 'Connecting talent across major global trade hubs.', icon: Globe },
            { title: 'Tech Optimized', description: 'Experts in modern warehouse management software (WMS).', icon: BarChart3 },
            { title: 'Agile Scale', description: 'Rapid scaling for peak seasonal demand cycles.', icon: Users }
        ]
    },
    {
        id: 'non-it',
        slug: 'non-it',
        name: 'Non-IT Professional',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/find-a-job-strip-nbg.jpg',
        icon: Briefcase,
        info: 'Diverse professional staffing solutions across leadership and management.',
        overview: 'Excellence in leadership and administration is industry-agnostic. At TRYITTECH LLP, we source high-impact professionals for roles in Finance, HR, Marketing, and Operations. Our holistic approach ensures that non-technical leadership is just as robust as your engineering teams.',
        segments: [
            { title: 'Executive Leadership', description: 'Placing C-level and senior management professionals.' },
            { title: 'Operations Management', description: 'Specialized talent for organizational efficiency and growth.' },
            { title: 'Corporate Services', description: 'HR, Finance, and Administrative staffing for office excellence.' }
        ],
        solutions: [
            { title: 'Global Talent Pipeline', description: 'Connecting enterprises with international leadership talent.' },
            { title: 'Diversity & Inclusion Hiring', description: 'Focused strategies for building balanced and inclusive teams.' }
        ],
        insights: [
            { title: 'Leadership in Digital Era', category: 'Management', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80' },
            { title: 'The Future of Remote Work', category: 'HR', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80' }
        ],
        edge: [
            { title: 'Strategic Match', description: 'AI-driven leadership matching for cultural fit.', icon: Target },
            { title: 'Speed to Hire', description: 'Executive placements in average of 21 days.', icon: Zap },
            { title: 'Holistic Vetting', description: 'Beyond credentials: EQ and cultural alignment assessment.', icon: Users },
            { title: 'Global Pool', description: 'Access to passive candidates across 40+ countries.', icon: Globe }
        ]
    },
    {
        id: 'retail',
        slug: 'retail',
        name: 'Retail & E-commerce',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/retail-CPG-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg',
        icon: ShoppingBag,
        info: 'Customer-centric retail staffing and e-commerce technology talent.',
        overview: 'The retail landscape is merging physical and digital experiences. We provide the expertise to manage omnichannel platforms, inventory systems, and customer-facing technology. Our candidates help retailers stay competitive in an era of instant delivery and personalized shopping.',
        segments: [
            { title: 'Omnichannel Retail', description: 'Staffing for seamless online and offline customer journeys.' },
            { title: 'E-commerce Platforms', description: 'Experts in Shopify, Magento, and custom headless commerce.' },
            { title: 'Retail Analytics', description: 'Data scientists focused on consumer behavior and trend forecasting.' }
        ],
        solutions: [
            { title: 'Holiday Peak Scaling', description: 'Rapid staffing for peak seasonal demand in retail and logistics.' },
            { title: 'Digital Storefront Modernization', description: 'Building tech teams to upgrade legacy retail systems.' }
        ],
        insights: [
            { title: 'Omnichannel Mastery', category: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' },
            { title: 'Personalized Shopping AI', category: 'AI', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' }
        ],
        edge: [
            { title: 'Customer First', description: 'Focused on CX specialist talent acquisition.', icon: Users },
            { title: 'Platform Pro', description: 'Deep bench of platform-specific engineering talent.', icon: Zap },
            { title: 'Omni Vision', description: 'Unified talent for online and physical retail.', icon: Target },
            { title: 'Scalable Force', description: 'Flexible workforce for high-demand retail events.', icon: BarChart3 }
        ]
    },
    {
        id: 'telecom',
        slug: 'telecom',
        name: 'Telecom & Networking',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/Comm-media-Pic-1.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_DA_L1_B1_Desktop.jpg',
        icon: Radio,
        info: 'Next-gen network solutions and 5G infrastructure engineering talent.',
        overview: 'Connectivity is the lifeblood of the modern world. We support the telecommunications industry by providing engineers and architects who build 5G, fiber optic networks, and satellite communications. Our talent powers the infrastructure that connects billions of devices.',
        segments: [
            { title: '5G Infrastructure', description: 'Specialists in small cell deployment and core network upgrades.' },
            { title: 'Network Security', description: 'Architects focused on protecting national and enterprise communication grids.' },
            { title: 'Satellite Comms', description: 'Aerospace and telecom combined expertise for global connectivity.' }
        ],
        solutions: [
            { title: 'Broadband Expansion Teams', description: 'Project-based staffing for large-scale fiber and wireless rollouts.' },
            { title: 'Managed Network Operations', description: 'Placing NOC and field engineers for 24/7 reliability.' }
        ],
        insights: [
            { title: 'The 5G Future', category: 'Telecom', image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80' },
            { title: 'Securing Next-Gen Networks', category: 'Security', image: 'https://images.unsplash.com/photo-1558494949-ef010958a196?w=800&q=80' }
        ],
        edge: [
            { title: '5G Pioneers', description: 'Access to early-adopter 5G engineering talent.', icon: Zap },
            { title: 'Network First', description: 'Focus on high-availability networking experts.', icon: Shield },
            { title: 'Satellite Bench', description: 'Rare aerospace communications talent network.', icon: Target },
            { title: 'Always On', description: 'NOC teams for mission-critical connectivity.', icon: Globe }
        ]
    },
    {
        id: 'manufacturing',
        slug: 'manufacturing',
        name: 'Manufacturing',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/05/manufacturi-Pic.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/cloud-infrastructure.jpg',
        icon: Factory,
        info: 'Industrial growth through advanced talent and Industry 4.0 expertise.',
        overview: 'Manufacturing is entering the Industry 4.0 era. We provide the mechanical engineers, automation specialists, and IoT experts who make factories smarter and more efficient. Our candidates help industrial leaders integrate robotics and AI into traditional production lines.',
        segments: [
            { title: 'Industrial Automation', description: 'PLC programming and robotics maintenance specialists.' },
            { title: 'Smart Factory IoT', description: 'Placing sensors and software experts for real-time plant monitoring.' },
            { title: 'Quality & Six Sigma', description: 'Operational excellence leads for manufacturing precision.' }
        ],
        solutions: [
            { title: 'Plant Modernization Teams', description: 'Engineering talent to oversee the transition to smart manufacturing.' },
            { title: 'Global SCM Support', description: 'Staffing for international procurement and vendor management.' }
        ],
        insights: [
            { title: 'Smart Factory Trends', category: 'Industry 4.0', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
            { title: 'Robotics in Production', category: 'Automation', image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=800&q=80' }
        ],
        edge: [
            { title: 'Automation DNA', description: 'Experts in integrating robots with human talent.', icon: Factory },
            { title: 'Precision Hires', description: 'Rigorous testing for high-precision engineering roles.', icon: Target },
            { title: 'Safety Focused', description: 'Full safety-certified workforce for industrial zones.', icon: Shield },
            { title: 'Modern Vision', description: 'Bridging OT and IT for unified smart production.', icon: Zap }
        ]
    },
    {
        id: 'bpo',
        slug: 'bpo',
        name: 'BPO Services',
        image: 'https://innovasolutions.com/wp-content/uploads/2025/06/Cloud-Services-thumb-1.jpg',
        secondaryImage: 'https://innovasolutions.com/wp-content/uploads/2025/03/SOL_TAL_L2_B1_Desktop-2.jpg',
        icon: Headphones,
        info: 'Efficiency-driven outsourcing talent for global business processing.',
        overview: 'Global business processing relies on high-quality operations. We provide the team leads, language experts, and technical support professionals who ensure seamless BPO delivery. Our focus is on high-value BPO roles that require specialized domain knowledge.',
        segments: [
            { title: 'Technical Support', description: 'Tier 1 to Tier 3 support experts for global software firms.' },
            { title: 'Financial Processing', description: 'Staffing for specialized accounting and audit outsourcing.' },
            { title: 'Customer Experience', description: 'Multilingual professionals for superior global client engagement.' }
        ],
        solutions: [
            { title: 'Multilingual Hub Setup', description: 'Building teams with uncommon language fluencies for specific markets.' },
            { title: 'Process Optimization Leads', description: 'Hiring consultants to automate and streamline BPO workflows.' }
        ],
        insights: [
            { title: 'The Future of BPO', category: 'Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
            { title: 'Multilingual Support Success', category: 'CX', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80' }
        ],
        edge: [
            { title: 'Polyglot Talent', description: 'Support in 40+ languages for a global clientele.', icon: Globe },
            { title: 'Tech Stack Savvy', description: 'Deep knowledge of Zendesk, Salesforce, and modern CRM.', icon: Zap },
            { title: 'Quality Assurance', description: 'Dedicated QA leads for every single client account.', icon: Award },
            { title: 'Scalable Hubs', description: 'Expanding support teams from 10 to 100 within days.', icon: Users }
        ]
    },
];
