"use client";

import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ApplicationDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const applicationDetails = {
    productName: searchParams.get("productName") || "-",
    modelName: searchParams.get("modelName") || "-",
    rentalFee: searchParams.get("rentalFee") || "-",
    reward: searchParams.get("reward") || "-",
  };

  const detailFields = [
    {
      id: "productName",
      label: "제품명",
      value: applicationDetails.productName,
    },
    { id: "modelName", label: "모델명", value: applicationDetails.modelName },
    { id: "rentalFee", label: "렌탈료", value: applicationDetails.rentalFee },
    { id: "reward", label: "리워드", value: applicationDetails.reward },
  ];

  //redirect to homepage after 5 secs
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-semibold text-[28px] text-center text-[#121212]">
            상담 신청이 완료되었어요!
          </h1>
          <p className="text-[16px] text-center text-[#3A3A3A]">
            담당자가 빠르게 확인 후 연락드릴 예정입니다.
          </p>
        </div>

        <div className="h-[272px] w-[272px]">
          <Image
            src="/success-art.svg"
            alt="Application completed successfully"
            width={272}
            height={272}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 mb-6">
        <h2 className="font-medium text-[18px] leading-[20px] text-center tracking-[1px]">
          신청 내역
        </h2>

        <div className="flex w-full">
          <div className="flex flex-col w-[119px]">
            {detailFields.map((field) => (
              <div
                key={`label-${field.id}`}
                className="flex justify-center items-center h-[34px] bg-[#F3F4F6] border border-[#CECECE] text-[12px] text-opacity-50"
              >
                {field.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col flex-1">
            {detailFields.map((field) => (
              <div
                key={`value-${field.id}`}
                className="flex items-center h-[34px] px-3 border border-[#CECECE] text-[12px]"
              >
                {field.value}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[14px] text-center text-[#C7C6C6] mt-2">
          {countdown}초 후 메인 페이지로 자동 이동됩니다.
        </p>
      </div>
    </>
  );
}

function ApplicationLoading() {
  return (
    <div className="flex justify-center items-center p-8">
      <p className="text-gray-500">로딩 중...</p>
    </div>
  );
}

export default function ApplicationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-8 mb-4">
        <div className="flex flex-col items-center gap-8">
          <Suspense>
            <ApplicationDetails />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
