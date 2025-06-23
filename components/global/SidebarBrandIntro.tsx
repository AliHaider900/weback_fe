"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

export default function SidebarBrandIntro() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchContainerClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="relative h-full overflow-hidden w-[420px]">
      {/* Decorative Groups */}
      {/* Bottom Left Group */}
      <div
        className="absolute"
        style={{
          width: "157.06px",
          height: "157.06px",
          left: "-10px",
          top: "94%",
          filter: "blur(1.42302px)",
          transform: "rotate(-11.12deg)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "122.02px",
            height: "122.02px",
            left: "51.98px",
            top: "-128.25px",
            background: "rgba(230,239,250,0.3)",
            borderRadius: "50%",
            transform: "rotate(9.41deg)",
          }}
        />
        <Image
          src="/assets/09_Dehumidifier.png"
          alt="Dehumidifier"
          width={82}
          height={82}
          className="absolute"
          style={{
            left: "65.79px",
            top: "-108.03px",
            transform: "rotate(-11.12deg)",
          }}
        />
      </div>
      {/* Bottom Right Group */}
      <div
        className="absolute"
        style={{
          width: "201px",
          height: "201px",
          left: "40%",
          top: "80%",
          filter: "blur(1.91429px)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "156.16px",
            height: "156.16px",
            left: "54.75px",
            top: "0px",
            background: "rgba(230,239,250,0.3)",
            borderRadius: "50%",
            transform: "rotate(20.52deg)",
          }}
        />
        <Image
          src="/assets/03_Refrigerator.png"
          alt="Refrigerator"
          width={104}
          height={104}
          className="absolute"
          style={{
            left: "75.29px",
            top: "24.04px",
            transform: "rotate(20.52deg)",
          }}
        />
      </div>
      {/* Top Left Group */}
      <div
        className="absolute"
        style={{
          width: "128.64px",
          height: "128.64px",
          left: "-9px",
          top: "66.69px",
          filter: "blur(1.75015px)",
          transform: "rotate(-23.2deg)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "99.94px",
            height: "99.94px",
            left: "32.21px",
            top: "-13.81px",
            background: "rgba(230,239,250,0.4)",
            borderRadius: "50%",
            transform: "rotate(-2.68deg)",
          }}
        />
        <Image
          src="/assets/07_AirConditioner.png"
          alt="Air Conditioner"
          width={67}
          height={67}
          className="absolute"
          style={{
            left: "41.05px",
            top: "04.41px",
            transform: "rotate(-23.2deg)",
          }}
        />
      </div>

      {/* Main Content Frame */}
      <div className="flex flex-col items-center gap-8 justify-center z-10 h-full m-10">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center gap-[12px]">
          <div className="font-semibold text-[28px] leading-[110%] text-center text-[#121212]">
            Webpack은 여러분의 렌탈에 가치를 더합니다
          </div>
          <div className="font-normal text-[16px] leading-[110%] text-center tracking-[0.02em] text-[#3A3A3A]">
            가전제품을 빌릴 때마다 리워드가 쌓이는 새로운 소비 경험, 지금까지
            없던 렌탈 리워드 플랫폼.
          </div>
        </div>
        {/* Ellipse Shadow */}
        <div
          className="absolute"
          style={{
            width: "339px",
            height: "53px",
            left: "58px",
            top: "286.5px",
            background: "rgba(41,54,65,0.6)",
            filter: "blur(50px)",
            zIndex: 1,
            borderRadius: "50%",
          }}
        />
        {/* Search Bar */}
        <div className="relative flex flex-col justify-center items-center w-full">
          <div className="absolute left-0 right-0 top-0 bottom-0 z-0" />
          <div
            className="flex flex-row items-center relative z-10 bg-white rounded-[14px] shadow-sm border border-gray-100 gap-2 w-full cursor-pointer"
            onClick={handleSearchContainerClick}
          >
            <FiSearch className="text-[#B9B9B9] text-xl ml-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="제품명이나 브랜드를 검색하세요"
              className="font-normal text-sm text-gray-900 bg-transparent w-full outline-none placeholder-[#C7C6C6] border-none px-4 py-3 cursor-text"
            />
          </div>
        </div>
        {/* Main Washing Machine Illustration */}
        <Image
          src="/assets/09_WashingMachine.png"
          alt="Washing Machine"
          width={324}
          height={324}
          className="mx-auto block z-10"
        />
      </div>
    </div>
  );
}
