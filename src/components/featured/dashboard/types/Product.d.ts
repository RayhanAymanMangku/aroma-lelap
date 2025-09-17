export type ProductType = {
    id: string
    name: string
    imageUrl: string
    flavour: string
    price: number
    stock: number
}

export type ProductForCreate = Omit<ProductType, 'id'>;

