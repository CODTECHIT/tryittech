import { BookOpen, ShieldCheck, Gamepad2, Laptop } from 'lucide-react';

export const trainingCategories = [
    {
        id: 'it-training',
        title: "IT Training",
        slug: "it-training",
        description: "Master modern technologies with our comprehensive IT training programs.",
        longDescription: "Our IT Training programs are designed to equip you with the latest skills in the tech industry. Whether you are a beginner looking to start a career in coding or a professional aiming to upskill, our expert-led courses cover everything from foundational programming to advanced cloud computing and data science.",
        icon: <Laptop className="w-8 h-8 text-white relative z-10" />,
        image: "https://img.freepik.com/free-photo/team-database-admins-analyzing-source-code-wall-screen-tv-comparing-errors-using-digital-tablet-busy-server-room-two-cloud-programers-debugging-algorithm-software-innovation-office_482257-43976.jpg",
        modules: [
            "Software Development",
            "Web Development",
            "Data Science",
            "Cloud Computing",
            "Cybersecurity Basics",
            "DevOps Engineering",
            "Mobile App Development",
            "AI & Machine Learning"
        ]
    },
    {
        id: 'general-training',
        title: "General Trainings",
        slug: "general-training",
        description: "Comprehensive professional development and competitive exam preparation.",
        longDescription: "Boost your career prospects with our General Training programs. specialized in competitive exam preparation for government jobs and professional skills development to enhance your workplace effectiveness.",
        icon: <BookOpen className="w-8 h-8 text-white relative z-10" />,
        image: "https://img.freepik.com/free-photo/business-startup-strategy-goals-concept_53876-120909.jpg",
        modules: [
            "Government Jobs Preparation",
            "Professional Skills Development",
            "Communication Skills",
            "Leadership & Management",
            "Time Management",
            "Critical Thinking",
            "Interview Preparation"
        ]
    },
    {
        id: 'ehs-training',
        title: "EHS Training",
        slug: "ehs-training",
        description: "Essential Environment, Health, and Safety training for a secure workplace.",
        longDescription: "Safety is paramount in any industry. Our EHS (Environment, Health, and Safety) training ensures your workforce is compliant, safe, and prepared for emergencies. We cover international safety standards and practical emergency response techniques.",
        icon: <ShieldCheck className="w-8 h-8 text-white relative z-10" />,
        image: "https://img.freepik.com/free-photo/female-construction-engineers-working-together-discussing-project-plan_114579-14641.jpg",
        modules: [
            "Safety Training",
            "Safety, Fire Extinguisher, CPR",
            "Workplace Hazard Identification",
            "First Aid Certification",
            "Industrial Safety Protocols",
            "Environmental Compliance"
        ]
    },
    {
        id: 'kids-language',
        title: "Kids & Language",
        slug: "kids-language",
        description: "Foundational courses in public speaking, phonics, and creative skills.",
        longDescription: "Nurture your child's potential with our specialized courses for kids. We focus on building confidence, creativity, and strong communication skills from an early age through interactive and engaging learning methods.",
        icon: <Gamepad2 className="w-8 h-8 text-white relative z-10" />,
        image: "https://img.freepik.com/free-photo/cute-girl-writing-notes-while-elearning-laptop-home_637285-9354.jpg",
        modules: [
            "Public Speaking & Creative Writing",
            "Phonics",
            "Mathematical Ability",
            "Logic & Reasoning",
            "Language Learning (Basics)",
            "Art & Creativity Workshop"
        ]
    }
];
