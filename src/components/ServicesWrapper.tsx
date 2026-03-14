'use client';

import dynamic from 'next/dynamic';
import { Service } from '@/lib/services';

const Services = dynamic(() => import('@/components/Services'), {
    ssr: false, // Disable SSR to avoid hydration mismatch with styled-components
});

export default function ServicesWrapper({ initialData }: { initialData?: Service[] }) {
    return <Services initialData={initialData} />;
}
