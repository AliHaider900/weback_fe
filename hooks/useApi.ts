import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import axios from "axios";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useProducts(categorySlug?: string | null) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url = "http://3.34.52.243:3000/api/v1/product";

        // Add category as query parameter if provided
        if (categorySlug) {
          url += `?category=${categorySlug}`;
        }

        const response = await axios.get(url);

        if (response.data.success) {
          // Transform the API response to match the expected Product type
          const transformedProducts = response.data.data.map(
            (product: any) => ({
              id: product.id.toString(),
              name: product.name,
              model: product.model,
              price: parseFloat(product.price),
              reward: parseFloat(product.reward || 0),
              rating: parseFloat(product.rating || 0),
              reviewCount: product.review_count || 0,
              imageUrl: product.primary_image_url || "/images/demo-product.png", // Use primary_image_url
              category: product.category,
            })
          );

          setData(transformedProducts);
        } else {
          throw new Error(response.data.message || "Failed to fetch products");
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setData([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  return { data, isLoading, error };
}

export function useProduct(productId: string) {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://3.34.52.243:3000/api/v1/product/${productId}`
        );

        if (response.data.success) {
          // Use the API response directly since we've updated the types to match
          setData(response.data.data);
        } else {
          throw new Error(response.data.message || "Product not found");
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { data, isLoading, error };
}

// For form submissions (like consultation)
export async function submitForm(formData: any) {
  try {
    const response = await axios.post(
      "http://3.34.52.243:3000/api/v1/consultation",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit form");
  }
}
