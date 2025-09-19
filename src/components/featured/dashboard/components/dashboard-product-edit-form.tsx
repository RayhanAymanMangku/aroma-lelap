"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductType } from "@/components/featured/dashboard/types/Product"
import { updateProduct } from "@/components/featured/dashboard/services/product.service"
import { deleteImage, uploadImage } from "@/lib/supabase"
import { formatRupiah } from "@/lib/utils"

interface ProductEditProps {
    initialData: ProductType;
}

const DashboardProductEditForm = ({ initialData }: ProductEditProps) => {
    // State untuk gambar yang sudah ada 
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(initialData.imageUrl);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        id: initialData.id,
        name: "",
        flavour: "",
        stock: "",
        price: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                name: initialData.name || "",
                flavour: initialData.flavour || "",
                price: formatRupiah(initialData.price.toString()),
                stock: initialData.stock.toString(),
            });
            setExistingImageUrl(initialData.imageUrl);
        }
    }, [initialData]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            setExistingImageUrl(null);
        }
    };

    const removeNewImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setSelectedImage(null);
        setImagePreview(null);
        setExistingImageUrl(initialData.imageUrl);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        let newImageUrl: string | null = null;
        let finalImageUrl = existingImageUrl;

        try {
            if (selectedImage) {
                newImageUrl = await uploadImage(selectedImage);
                if (!newImageUrl) {
                    throw new Error("Gagal mengunggah gambar baru.");
                }
                finalImageUrl = newImageUrl;
            }

            if (!finalImageUrl) {
                setError("Produk harus memiliki gambar.");
                setIsSubmitting(false);
                return;
            }

            const productDataToUpdate = {
                id: initialData.id,
                name: formData.name,
                flavour: formData.flavour,
                price: parseInt(formData.price.replace(/\./g, ''), 10),
                stock: parseInt(formData.stock, 10),
                imageUrl: finalImageUrl,
            };

            await updateProduct(initialData.id, productDataToUpdate);

            if (newImageUrl && initialData.imageUrl) {
                await deleteImage(initialData.imageUrl);
            }

            alert("Produk berhasil diperbarui!");
            router.push("/dashboard/products");

        } catch (err) {
            console.error("Submission failed:", err);
            setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");

            if (newImageUrl) {
                await deleteImage(newImageUrl);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container max-w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-sm border ">
                <div>
                    <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                    <Input id="name" name="name" required placeholder="Product Name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div>
                    <Label htmlFor="flavour">Flavour Type <span className="text-red-500">*</span></Label>
                    <Input id="flavour" name="flavour" required placeholder="Aroma Type" onChange={handleInputChange} value={formData.flavour} />
                </div>
                <div>
                    <Label htmlFor="stock">Stock <span className="text-red-500">*</span></Label>
                    <Input type="number" id="stock" name="stock" required placeholder="Stock" onChange={handleInputChange} value={formData.stock} />
                </div>
                <div>
                    <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
                    <Input type="text" id="price" name="price" required placeholder="Price" inputMode="numeric" onChange={handleInputChange} value={formData.price} />
                </div>
                <div>
                    <Label htmlFor="image">Image (Ganti gambar jika perlu)</Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                    <div className="mt-4">
                        <div className="relative group w-full max-w-xs">
                            {imagePreview ? (
                                <>
                                    <p className="text-center text-sm mb-2">Preview Gambar Baru:</p>
                                    <Image src={imagePreview} alt="New Preview" width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                                    <Button variant="destructive" size="icon" onClick={removeNewImage} className="absolute top-8 right-2 rounded-full flex text-center">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </>
                            ) : existingImageUrl && (
                                <>
                                    <p className="text-center text-sm mb-2">Gambar Saat Ini:</p>
                                    <Image src={existingImageUrl} alt={formData.name} width={300} height={128} className="w-full h-32 object-cover rounded-sm border" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-sm">{error}</p>}
                <Button type="submit" disabled={isSubmitting} className="bg-amber-500 text-white hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Update Product"}
                </Button>
            </form>
        </div>
    )
}

export default DashboardProductEditForm