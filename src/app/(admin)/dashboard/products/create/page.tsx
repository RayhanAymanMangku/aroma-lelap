"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductForCreate } from "@/components/featured/dashboard/types/Product"
import { createProduct } from "@/components/featured/dashboard/services/product.service"
import { deleteImage, uploadImage } from "@/lib/supabase"
import { formatRupiah } from "@/lib/utils"

const ProductCreatePage = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [formData, setFormData] = useState({
        name: "",
        flavour: "",
        stock: "",
        price: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "price") {
            setFormData((prev) => ({ ...prev, [name]: formatRupiah(value) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (imagePreviews.length > 0) {
                URL.revokeObjectURL(imagePreviews[0]);
            }
            setSelectedImages([file]);
            setImagePreviews([URL.createObjectURL(file)]);
        } else {
            if (imagePreviews.length > 0) {
                URL.revokeObjectURL(imagePreviews[0]);
            }
            setSelectedImages([]);
            setImagePreviews([]);
        }
    };

    const removeImage = () => {
        if (imagePreviews.length > 0) {
            URL.revokeObjectURL(imagePreviews[0]);
        }
        setSelectedImages([]);
        setImagePreviews([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (selectedImages.length === 0) {
            setError("Setidaknya satu gambar harus diunggah.");
            return;
        }

        setIsLoading(true);
        let uploadedImageUrl: string | null = null;

        try {
            uploadedImageUrl = await uploadImage(selectedImages[0]);

            if (!uploadedImageUrl) {
                throw new Error("Gagal mengunggah gambar.");
            }

            const productData: ProductForCreate = {
                ...formData,
                price: parseInt(formData.price, 0),
                stock: parseInt(formData.stock, 0),
                imageUrl: uploadedImageUrl
            };


            await createProduct(productData);

            alert("Produk berhasil ditambahkan!");
            router.push("/dashboard");

        } catch (err) {
            console.error("Submission failed:", err);
            setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");

            if (uploadedImageUrl) {
                console.log("Gagal menyimpan ke database. Menghapus gambar yang sudah diunggah...");
                try {
                    await deleteImage(uploadedImageUrl);
                    console.log("Cleanup berhasil.");
                } catch (cleanupError) {
                    console.error("Gagal menghapus gambar:", cleanupError);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container max-w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-sm border ">
                {/* Nama Produk */}
                <div>
                    <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                    <Input id="name" name="name" required placeholder="Product Name" onChange={handleInputChange} value={formData.name} />
                </div>
                {/* Flavour */}
                <div>
                    <Label htmlFor="flavour">Flavour Type <span className="text-red-500">*</span></Label>
                    <Input id="flavour" name="flavour" required placeholder="Aroma Type" onChange={handleInputChange} value={formData.flavour} />
                </div>
                {/* Stock */}
                <div>
                    <Label htmlFor="stock">Stock <span className="text-red-500">*</span></Label>
                    <Input type="number" id="stock" name="stock" required placeholder="Stock" onChange={handleInputChange} value={formData.stock} />
                </div>
                {/* Price */}
                <div>
                    <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
                    <Input type="number" id="price" name="price" required placeholder="Price" inputMode="numeric" onChange={handleInputChange} value={formData.price} />
                </div>
                {/* Gambar */}
                <div>
                    <Label htmlFor="image">Image (1 Required) <span className="text-red-500">*</span></Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreviews.length > 0 && (
                        <div className="mt-4">
                            <div className="relative group w-full max-w-xs mx-auto">
                                <Image src={imagePreviews[0] || "/placeholder.svg"} alt={`Preview 1`} width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                                <Button variant="destructive" size="icon" onClick={removeImage} className="absolute top-2 right-2 rounded-full flex text-center">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                {/* Tombol Submit */}
                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-sm">{error}</p>}
                <Button type="submit" disabled={isLoading || selectedImages.length === 0} className="bg-orange-500 text-white hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : "Upload Product"}
                </Button>
            </form>
        </div>
    )
}

export default ProductCreatePage