"use server"

import prisma from "../../../../../lib/prisma"
import { ProductForCreate, ProductType } from "../types/Product";

const prismaDb = prisma;

export async function getAllProducts() {
    try {
        const data = await prismaDb.product.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                flavour: true,
                price: true,
                stock: true
            }
        });
        return data;

    } catch (error) {
        console.log(error)
        return;
    }

}

export async function getProductById(id: string) {
    try {
        const data = await prismaDb.product.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                flavour: true,
                price: true,
                stock: true
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function createProduct(params: ProductForCreate) {
    try {
        const data = await prismaDb.product.create({
            data: {
                name: params.name,
                imageUrl: params.imageUrl,
                flavour: params.flavour,
                stock: params.stock,
                price: params.price
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return;
    }
}

export async function updateProduct(id: string, params: ProductType) {
    try {
        const data = await prismaDb.product.update({
            where: {
                id: id
            },
            data: {
                name: params.name,
                imageUrl: params.imageUrl,
                flavour: params.flavour,
                stock: params.stock,
                price: params.price
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        return;
    }
}

export async function deleteProductById(params: { id: string }) {
    try {
        const data = await prismaDb.product.delete({
            where: {
                id: params.id,
            },
        });
        return data;
    } catch (error) {
        console.log(error)
        return;
    }
}