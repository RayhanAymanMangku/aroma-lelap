"use client"
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Edit, Info, Trash } from 'lucide-react'
import Link from 'next/link'
import { ProductType } from '../types/Product'
import { deleteProductById, getAllProducts } from '../services/product.service'
import Image from 'next/image'
import ConfirmModal from './confirm-modal'

const DashboardProductTableList = () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts()
                if (response) {
                    setProducts(response);
                }
            } catch (error) {
                console.log("No data displayed", error)
            }
        }
        fetchProducts();
    }, [])

    const handleOpenDeleteModal = (id: string) => {
        setProductToDeleteId(id);
        setShowConfirmModal(true);
    }

    const handleConfirmDelete = async () => {
        if (!productToDeleteId) return; 
        try {
            await deleteProductById({ id: productToDeleteId })
            setProducts((prev) => prev.filter((item) => item.id !== productToDeleteId));
        } catch (error) {
            console.error("Failed to delete product:", error);
        } finally {
            setShowConfirmModal(false);
            setProductToDeleteId(null);
        }
    }

    return (
        <>
            <div className="overflow-hidden rounded-sm">
                <Table className='rounded-sm'>
                    <TableHeader className='bg-gray-100'>
                        <TableRow>
                            <TableHead className="text-left">ID</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Flavour</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id.slice(0, 8)}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                            className='rounded-md object-cover w-10 h-10 shadow-sm'
                                        />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.flavour}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <Link href={`/dashboard/products/edit/${item.id}`}>
                                            <Button variant="outline" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>

                                        <Button variant="destructive" size="icon" onClick={() => handleOpenDeleteModal(item.id)}>
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-400">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <ConfirmModal
                open={showConfirmModal}
                onOpenChange={setShowConfirmModal}
                icon={<Info className="text-red-500" />}
                title='Delete this Product'
                description='Are you sure you want to delete this product? This action cannot be undone.'
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}

export default DashboardProductTableList