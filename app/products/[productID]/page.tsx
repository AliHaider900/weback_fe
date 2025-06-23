"use client";

import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import RentalOptions from "../../../components/products/rental-options";

function ProductDetailsPage() {
  const params = useParams();
  const productID = params?.productID as string;
  const { data: product, isLoading, error } = useProduct(productID);

  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="flex items-center justify-center h-60">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">로딩 중...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-4">
              상품을 찾을 수 없습니다
            </h2>
            <p className="text-muted-foreground mb-6">
              요청하신 상품 정보를 불러올 수 없습니다.
            </p>
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0];

  const primaryImage = product.images.find(img => img.is_primary) || product.images[0];

  return (
    <div>
      <Navbar />
      <main className="flex-1">
        <h2 className="text-lg font-medium text-center pb-2">{product.name}</h2>
        <div className="bg-blue-50 flex justify-center items-center py-1">
          <Image
            src={currentVariant.image_url}
            alt={`${product.name} - ${currentVariant.name}`}
            width={392}
            height={378}
            className="object-contain"
            priority
          />
        </div>
        <div className="px-4 py-4 space-y-2">
          <div className="flex items-center space-x-4 space-y-2 flex-wrap">
            <h3 className="text-lg font-medium">{product.name}</h3>
            <div className="bg-primary text-white text-sm rounded-sm text-center inline-flex items-center font-medium py-1 px-2">
              리워드 최대 {parseFloat(product.reward).toLocaleString()}원
            </div>
          </div>
          {/* Product Model & Rating */}
          <div className="flex items-center gap-2">
            <h4 className="text-sm">{product.model}</h4>
            <span className="text-xs text-gray-400 ">|</span>
            <div className="flex items-center">
              <FaStar className="text-[#FCD010]" size={16} />
              <span className="text-xs ml-1 text-[#6A6A6A]">
                {product.rating} ({product.review_count})
              </span>
            </div>
          </div>
          {/* Variants Selection */}
          <div className="flex gap-1 flex-col">
            <p className="text-sm mb-2">
              색상 옵션:{" "}
              <span className="font-medium">{currentVariant.name}</span>
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`relative w-14 h-14 rounded-sm overflow-hidden border-2 ${
                    selectedVariant === variant.id
                      ? "border-[#5F5F60] border-2"
                      : "border-gray-200"
                  } flex-shrink-0`}
                  onClick={() => setSelectedVariant(variant.id)}
                  aria-label={`Select ${variant.name} variant`}
                >
                  <Image
                    src={variant.image_url}
                    alt={variant.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <RentalOptions product={product} />

        <div className="mt-4">
          <h3 className="text-base font-medium py-2 border-b border-gray-200 text-center">
            상세페이지
          </h3>
          <div className="bg-[#F7F7FC] py-6 px-4">
            <div className="bg-white p-3 rounded-xl border border-[#E0E0E0]">
              <div className="w-full flex justify-center mb-4 bg-[#E2EBFD] rounded-[5px] h-[160px]">
                <Image
                  src={primaryImage?.image_url || currentVariant.image_url}
                  alt={product.name}
                  width={155}
                  height={148}
                  className="object-contain rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-light">
                  제품의 상세페이지는 브랜드 홈페이지를 참고해주세요.
                </p>
                <Link
                  href="/"
                  className="inline-block mt-4 text-sm font-normal text-[#3A3A3A] hover:text-black"
                >
                  브랜드 홈페이지로 이동 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
