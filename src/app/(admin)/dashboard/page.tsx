import React from 'react'
import DashboardCard from '@/components/featured/dashboard/components/dashboard-card'
import { Layers, Package } from 'lucide-react'
import { countAllProducts, countAllStock, inventoryValueCount } from '@/components/featured/dashboard/services/product.service'

const page = async () => {
    const productData = await countAllProducts();
    const stockData = await countAllStock();
    const inventoryData = await inventoryValueCount();

  return (
    <div className="container max-w-full">
        <div className="grid md:grid-cols-3 gap-4">
           <DashboardCard
                icon={<Layers className='text-amber-500'/>}
                bgColor='bg-orange-100'
                title="Total Products"
                value={productData || 0}
           />
           <DashboardCard
                icon={<Package className='text-sky-500'/>}
                bgColor='bg-sky-100'
                title='Total Stock'
                value={stockData || 0}
           />
           <DashboardCard
                icon={<Package className='text-green-500'/>}
                bgColor='bg-green-100'
                title='Inventory Value'
                value={inventoryData || 0}
                isRupiah={true}
           />
        </div>
    </div>
  )
}

export default page