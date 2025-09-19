import React from 'react'
import DashboardCard from '@/components/featured/dashboard/components/dashboard-card'
import { Layers } from 'lucide-react'
import { countAllProducts } from '@/components/featured/dashboard/services/product.service'

const page = async () => {
    const productData = await countAllProducts()
  return (
    <div className="container">
        <div className="grid grid-cols-3">
           <DashboardCard
                icon={<Layers className='text-amber-500'/>}
                title="Total Products"
                value={productData || 0}
           />
        </div>
    </div>
  )
}

export default page