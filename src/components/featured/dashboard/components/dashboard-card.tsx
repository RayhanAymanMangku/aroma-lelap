import { Card } from '@/components/ui/card'
import React from 'react'

interface DashboardCardProps {
    icon: React.ReactNode
    title: string
    value: number
}

const DashboardCard = ({ icon, title, value }: DashboardCardProps) => {
    return (
        <Card className='w-full rounded-sm p-6 shadow-none'>
            <div className="flex flex-col gap-2">
                <div className={`w-10 h-10 rounded-full bg-orange-100 items-center justify-center flex`}>
                    {icon}
                </div>
                <h1 className='text-lg'>{title}</h1>
                <h1 className='text-gray-500 text-xl font-semibold'>{value}</h1>
            </div>
        </Card>
    )
}

export default DashboardCard