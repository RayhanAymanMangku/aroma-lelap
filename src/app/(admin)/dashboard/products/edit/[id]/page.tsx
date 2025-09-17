import DashboardProductEditForm from '@/components/featured/dashboard/components/dashboard-product-edit-form';
import { getProductById } from '@/components/featured/dashboard/services/product.service'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const productItem = await getProductById((await params).id);
    if (!productItem) {
        return (
            <div className="container text-center p-10">
                <h2>Produk Tidak Ditemukan</h2>
                <p>Data yang Anda cari tidak ada.</p>
            </div>
        )
    }
    return (
        <DashboardProductEditForm initialData={productItem} />
    )
}

export default page