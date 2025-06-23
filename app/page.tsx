"use client";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import TabLayout from "@/components/TabLayout";
import { useProducts } from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CgSortAz } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import ApplianceCategories, {
  categories,
} from "../components/home/appliance-categories";
import RewardCard from "../components/home/reward-card";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category");
  const category = categories.find((cat) => cat.slug === selectedCategory);

  const { data: products, isLoading } = useProducts(selectedCategory);

  const handleCategorySelect = (slug: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.replace(`/?${params.toString()}`, { scroll: true });
  };

  return (
    <>
      {!selectedCategory && (
        <div className="mt-4">
          <RewardCard />
          <ApplianceCategories onCategorySelect={handleCategorySelect} />
        </div>
      )}

      {selectedCategory && category ? (
        <div className="py-6 px-4 bg-[#F7F7FC]">
          <h1 className="text-[20px] font-medium mb-4 text-center">
            {category.label}
          </h1>
          <div className="">
            <div className="flex items-center bg-white rounded-[14px] px-4 py-3 shadow-sm mb-6 border border-gray-100 gap-2">
              <FiSearch className="text-[#B9B9B9] text-xl mr-2" />
              <input
                type="text"
                placeholder="제품명이나 브랜드를 검색하세요"
                className="flex-1 bg-transparent outline-none text-sm text-black placeholder-gray-400"
              />
            </div>

            <section id="product-list">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  {isLoading ? 'Loading...' : `${products.length}개`}
                </span>
                <button className="flex items-center gap-1 text-sm rounded-full px-3 py-1 font-medium">
                  인기순
                  <CgSortAz size={28} />
                </button>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white p-3 rounded-xl border border-[#E0E0E0] animate-pulse">
                      <div className="w-full h-32 bg-gray-200 rounded-[5px] mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => {
                    const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
                    return (
                      <Link href={`/products/${product.id}`} key={product.id}>
                        <div className="bg-white p-3 rounded-xl border border-[#E0E0E0]">
                          <div className="w-full flex justify-center mb-4 bg-[#E2EBFD] rounded-[5px]">
                            <Image
                              src={primaryImage?.image_url || "/assets/demo-product.png"}
                              alt={product.name}
                              width={155}
                              height={148}
                              className="object-contain rounded-lg"
                              priority
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">
                              {product.name}
                            </h4>
                            <div className="flex gap-1 items-center mb-3">
                              <p className="text-xs">{product.model}</p>
                              <span className="text-xs text-gray-400 ">|</span>
                              <div className="flex items-center text-xs text-[#6A6A6A]">
                                <FaStar
                                  className="inline-block mr-1 text-[#FCD010]"
                                  size={16}
                                />
                                {product.rating}
                              </div>
                            </div>
                            <div className="text-sm font-medium">
                              최저 {product.price.toLocaleString()}원/월
                            </div>
                            <div className="bg-primary text-white text-base rounded-sm w-full text-center py-[5px] mt-1 inline-block">
                              리워드 최대 {product.reward.toLocaleString()}원
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      ) : (
        <>
          <div className=""></div>
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <TabLayout>
        <Suspense fallback={""}>
          <HomeContent />
        </Suspense>
      </TabLayout>
      <Footer />
    </>
  );
}
