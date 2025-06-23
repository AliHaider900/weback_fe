"use client";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import TabLayout from "@/components/TabLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function RewardsPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <TabLayout>
        <div className="py-10 px-4 mb-4">
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <h3 className="text-xl font-medium">렌탈 완료하셨나요?</h3>
              <p className="text-base mt-1">
                간단한 정보 등록으로 리워드를 받아보세요.
              </p>
            </div>
            <Image
              src={"/rewards-art.svg"}
              height="306"
              width="306"
              alt="art"
            />
            <button
              className="bg-[#8D84F5] hover:bg-primary text-white py-[10px] px-5 rounded-[48px] hover:cursor-pointer"
              onClick={() => router.push("/consultation")}
            >
              리워드 신청하러 가기 →
            </button>
          </div>
        </div>
      </TabLayout>
      <Footer />
    </>
  );
}

export default RewardsPage;
