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
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { ProductType } from '../types/Product'
import { deleteProductById, getAllProducts } from '../services/product.service'
import Image from 'next/image'
const DashboardProductTableList = () => {
    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        const fetchCrafts = async () => {
            try {
                const response = await getAllProducts()
                if (response) {
                    setProducts(
                        response.map((product) => ({
                            id: product.id,
                            name: product.name,
                            imageUrl: product.imageUrl,
                            flavour: product.flavour,
                            price: product.price,
                            stock: product.stock
                        }))
                    );
                }
            } catch (error) {
                console.log("No data displayed", error)
            }
        }
        fetchCrafts();
    }, [])

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            await deleteProductById({id})
            setProducts((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }


    return (
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
                                        alt='img'
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

                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-400">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DashboardProductTableList