"use client";

import { useState } from "react";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IVariant {
  id: string;
  name: string;
  price: string;
  image?: File;
  imagePreview?: string;
}

interface IRentalOption {
  id: string;
  months: string;
  monthlyPrice: string;
  reward: string;
}

interface IRentalProvider {
  id: string;
  provider: string;
  options: IRentalOption[];
}

interface IFormData {
  name: string;
  model: string;
  price: string;
  reward: string;
  rating: string;
  reviewCount: string;
  images: File[];
  category: string;
  variants: IVariant[];
  rentalOptions: IRentalProvider[];
}

interface IFormErrors {
  name?: string;
  price?: string;
  images?: string;
  category?: string;
  variants?: string;
  rentalOptions?: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    model: "",
    price: "",
    reward: "",
    rating: "",
    reviewCount: "",
    images: [],
    category: "",
    variants: [],
    rentalOptions: [],
  });
  const [errors, setErrors] = useState<IFormErrors>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof IFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files.filter((file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024; // 5MB
        return allowedTypes.includes(file.type) && file.size <= maxSize;
      });

      if (validFiles.length !== files.length) {
        setErrors((prev) => ({
          ...prev,
          images:
            "Some files were invalid. Only JPEG, PNG, or WebP files up to 5MB are allowed.",
        }));
      }

      if (validFiles.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validFiles],
        }));

        const newPreviews: string[] = [];
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === validFiles.length) {
              setImagePreviews((prev) => [...prev, ...newPreviews]);
            }
          };
          reader.readAsDataURL(file);
        });

        if (errors.images) {
          setErrors((prev) => ({ ...prev, images: "" }));
        }
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const inputElement = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;

    if (inputElement) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      inputElement.files = dataTransfer.files;
      const event = new Event("change", { bubbles: true });
      inputElement.dispatchEvent(event);
    }
  };

  // --- Variants Logic ---
  const handleAddVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: Date.now().toString(),
          name: "",
          price: "",
          image: undefined,
          imagePreview: undefined,
        },
      ],
    }));
  };

  const handleRemoveVariant = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));
  };

  const handleVariantChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id ? { ...v, [name]: value } : v
      ),
    }));
  };

  const handleVariantImageChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          variants: prev.variants.map((v) =>
            v.id === id
              ? { ...v, image: file, imagePreview: reader.result as string }
              : v
          ),
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Rental Options Logic ---
  const handleAddRentalProvider = () => {
    setFormData((prev) => ({
      ...prev,
      rentalOptions: [
        ...prev.rentalOptions,
        { id: Date.now().toString(), provider: "", options: [] },
      ],
    }));
  };

  const handleRemoveRentalProvider = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      rentalOptions: prev.rentalOptions.filter((p) => p.id !== id),
    }));
  };

  const handleRentalProviderChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentalOptions: prev.rentalOptions.map((p) =>
        p.id === id ? { ...p, provider: value } : p
      ),
    }));
  };

  const handleAddRentalOption = (providerId: string) => {
    setFormData((prev) => ({
      ...prev,
      rentalOptions: prev.rentalOptions.map((p) =>
        p.id === providerId
          ? {
              ...p,
              options: [
                ...p.options,
                {
                  id: Date.now().toString(),
                  months: "",
                  monthlyPrice: "",
                  reward: "",
                },
              ],
            }
          : p
      ),
    }));
  };

  const handleRemoveRentalOption = (providerId: string, optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      rentalOptions: prev.rentalOptions.map((p) =>
        p.id === providerId
          ? { ...p, options: p.options.filter((o) => o.id !== optionId) }
          : p
      ),
    }));
  };

  const handleRentalOptionChange = (
    providerId: string,
    optionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentalOptions: prev.rentalOptions.map((p) =>
        p.id === providerId
          ? {
              ...p,
              options: p.options.map((o) =>
                o.id === optionId ? { ...o, [name]: value } : o
              ),
            }
          : p
      ),
    }));
  };

  const validate = () => {
    const newErrors: IFormErrors = {};
    if (!formData.name) newErrors.name = "Product name is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required.";
    }
    formData.variants.forEach((v) => {
      if (!v.name || !v.price || !v.image) {
        newErrors.variants =
          "All variant fields, including an image, are required.";
      }
    });
    formData.rentalOptions.forEach((p) => {
      if (!p.provider) newErrors.rentalOptions = "Provider name is required.";
      p.options.forEach((o) => {
        if (!o.months || !o.monthlyPrice)
          newErrors.rentalOptions = "All rental option fields are required.";
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("model", formData.model);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("reward", formData.reward);
    data.append("rating", formData.rating);
    data.append("reviewCount", formData.reviewCount);

    formData.images.forEach((image) => {
      data.append("images", image);
    });

    // Prepare and append variants
    const variantsForApi = formData.variants.map((v) => ({
      name: v.name,
      price: v.price,
    }));
    data.append("variants", JSON.stringify(variantsForApi));
    formData.variants.forEach((v) => {
      if (v.image) data.append("variant_images", v.image);
    });

    // Prepare and append rental options
    const rentalOptionsForApi = formData.rentalOptions.map((p) => ({
      provider: p.provider,
      options: p.options.map((o) => ({
        months: o.months,
        monthlyPrice: o.monthlyPrice,
        reward: o.reward,
      })),
    }));
    data.append("rentalOptions", JSON.stringify(rentalOptionsForApi));

    try {
      const response = await axios.post(
        "https://www.weback.kiwicoder.com/api/v1/product",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Product created successfully!");
        router.push("/dashboard/product");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      let errorMessage = "An unknown error occurred.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="relative mb-8">
          <button
            onClick={() => router.push("/dashboard/product")}
            className="absolute top-0 left-0 text-gray-500 hover:text-gray-800 flex items-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create New Product
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSave} noValidate>
          {/* Product Details Section */}
          <div className="p-2 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter model number"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="dryer">Dryer</option>
                  <option value="air-conditioner">Air Conditioner</option>
                  <option value="water-purifier">Water Purifier</option>
                  <option value="refrigerator">Refrigerator</option>
                  <option value="washing-machine">Washing Machine</option>
                  <option value="bundle-product">Bundle Product</option>
                  <option value="others">Others</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₩)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reward (₩)
                </label>
                <input
                  type="number"
                  name="reward"
                  value={formData.reward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reward amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rating (0-5)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  name="reviewCount"
                  value={formData.reviewCount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter review count"
                />
              </div>
            </div>
          </div>

          {/* Product Images Section */}
          <div className="p-6 border border-gray-200 rounded-lg">
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              Product Images
            </label>
            <div className="mt-1">
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={preview}
                        alt={`Product preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="image-upload"
                        name="images"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WebP up to 5MB
                  </p>
                </div>
              </div>
            </div>
            {errors.images && (
              <p className="text-red-500 text-xs mt-1">{errors.images}</p>
            )}
          </div>

          {/* Variants Section */}
          <div className="p-2 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Variants
            </h3>
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 relative"
                >
                  <div className="md:col-span-1 flex flex-col items-center justify-center">
                    <label
                      htmlFor={`variant-image-${variant.id}`}
                      className="cursor-pointer"
                    >
                      {variant.imagePreview ? (
                        <img
                          src={variant.imagePreview}
                          alt="Variant preview"
                          className="w-24 h-24 object-cover rounded-md border"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-md flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8" />
                          <span className="text-xs mt-1">Upload Image</span>
                        </div>
                      )}
                    </label>
                    <input
                      id={`variant-image-${variant.id}`}
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleVariantImageChange(variant.id, e)}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(variant.id, e)}
                      placeholder="Variant Name (e.g., Color)"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <input
                      type="number"
                      name="price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(variant.id, e)}
                      placeholder="Variant Price (₩)"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(variant.id)}
                    className="absolute top-2 right-2 p-1 text-red-500"
                    aria-label="Remove Variant"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddVariant}
              className="mt-4 flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Variant
            </button>
            {errors.variants && (
              <p className="text-red-500 text-xs mt-1">{errors.variants}</p>
            )}
          </div>

          {/* Rental Options Section */}
          <div className="p-2 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rental Options
            </h3>
            <div className="space-y-4">
              {formData.rentalOptions.map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 border rounded-md space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={provider.provider}
                      onChange={(e) =>
                        handleRentalProviderChange(provider.id, e)
                      }
                      placeholder="Provider Name"
                      className="flex-grow px-3 py-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRentalProvider(provider.id)}
                      className="p-1 text-red-500"
                      aria-label="Remove Rental Provider"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {provider.options.map((option) => (
                      <div
                        key={option.id}
                        className="grid grid-cols-2 gap-2 items-center"
                      >
                        <input
                          type="number"
                          name="months"
                          value={option.months}
                          onChange={(e) =>
                            handleRentalOptionChange(provider.id, option.id, e)
                          }
                          placeholder="Months"
                          className="px-2 py-1 border rounded-md"
                        />
                        <input
                          type="number"
                          name="monthlyPrice"
                          value={option.monthlyPrice}
                          onChange={(e) =>
                            handleRentalOptionChange(provider.id, option.id, e)
                          }
                          placeholder="Monthly Price (₩)"
                          className="px-2 py-1 border rounded-md"
                        />
                        <div className="flex items-center w-full col-span-2 gap-2">
                          <input
                            type="number"
                            name="reward"
                            value={option.reward}
                            onChange={(e) =>
                              handleRentalOptionChange(
                                provider.id,
                                option.id,
                                e
                              )
                            }
                            placeholder="Reward (₩)"
                            className="flex-grow px-2 py-1 border rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveRentalOption(provider.id, option.id)
                            }
                            className="p-1 text-red-500"
                            aria-label="Remove Rental Option"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddRentalOption(provider.id)}
                    className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Option
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddRentalProvider}
              className="mt-4 flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Rental Provider
            </button>
            {errors.rentalOptions && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rentalOptions}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/product")}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
