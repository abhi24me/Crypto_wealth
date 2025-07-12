
"use client";

import dynamic from 'next/dynamic';
import { KxIndexChartSkeleton } from "@/components/dashboard/kx-index-chart-skeleton";

const KxIndexChart = dynamic(() => import('@/components/dashboard/kx-index-chart').then(mod => mod.KxIndexChart), {
  ssr: false,
  loading: () => <KxIndexChartSkeleton />,
});

export function KxIndexChartDynamic() {
  return <KxIndexChart />;
}
