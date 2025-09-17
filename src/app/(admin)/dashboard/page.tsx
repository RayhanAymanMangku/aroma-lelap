import React from 'react'
import DashboardCard from '@/components/featured/dashboard/components/dashboard-card'
import { Layers } from 'lucide-react'
// import { dashboardCardData } from '@/components/featured/dashboard/lib/constants'

const page = () => {
  return (
    <div className="container">
        <div className="grid grid-cols-3">
           <DashboardCard
                icon={<Layers className='text-amber-500'/>}
                title="Total Products"
                value={10}
           />
        </div>
    </div>
  )
}

export default page