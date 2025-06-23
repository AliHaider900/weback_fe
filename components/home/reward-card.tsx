"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";

export default function RewardCard() {
  const router = useRouter();
  return (
    <div className="bg-[#D7EAFF]">
      <div className="flex p-5 gap-4 w-full ">
        <div className="w-1/2 relative h-36">
          <Image
            src="/reward-image.jpg"
            alt="Reward"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-1/2 flex flex-col justify-between">
          <h4 className="tracking-[1px] text-lg">
            가전 렌탈받고 리워드로 돌려받으세요!
          </h4>
          <button
            className="bg-[#3A3A3A] py-2 px-3 rounded-[48px] flex gap-2 w-fit text-white items-center justify-center hover:opacity-90 hover:cursor-pointer"
            onClick={() => router.push("/rewards")}
          >
            <span className="text-sm font-medium">리워드 신청하기 </span>
            <FaArrowRight size={12} />
          </button>
          <div className="flex gap-2 items-start justify-center mt-2">
            <span>
              <PiWarningCircleFill size={16} />
            </span>
            <p className="text-[10px]">
              리워드의 50%는 즉시, 나머지는 후기 작성 시 지급됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
