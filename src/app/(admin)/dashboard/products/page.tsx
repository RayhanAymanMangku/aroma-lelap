import DashboardProductTableList from '@/components/featured/dashboard/components/dashboard-product-tablelist'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-end">
          <Link href="/dashboard/products/create">
            <Button className='bg-amber-500 text-white hover:bg-amber-600 text-xs'>Add Product</Button>
          </Link>
        </div>
        <DashboardProductTableList />
      </div>
    </div>
  )
}

export default page