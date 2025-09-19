import DashboardProductTableList from '@/components/featured/dashboard/components/dashboard-product-tablelist'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="container max-w-full flex flex-col gap-4">
        <header className="flex w-full justify-end items-center">
          <Link href="/dashboard/products/create">
            <Button className='bg-amber-500 text-white hover:bg-amber-600 text-xs'>Add Product</Button>
          </Link>
        </header>
        <section>
          <DashboardProductTableList />
        </section>
    </div>
  )
}

export default page