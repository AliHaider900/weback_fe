import React from "react";

function Footer() {
  return (
    <footer className="bg-[#212332] text-white">
      <div className="flex flex-col gap-8 px-6 py-8">
        <div>
          <h2 className="tracking-[0.0625em] text-lg font-bold">WEBACK</h2>
          <p className="text-sm">
            신뢰할 수 있는 가전 렌탈, 리워드로 더 돌려드립니다.
          </p>
        </div>
        <div className="text-xs leading-[170%]">
          <p className="text-xs">
            <span className="font-medium">사업자등록번호:</span> 123-45-67890 |{" "}
            <span className="font-medium">대표:</span> 홍길동
          </p>
          <p className="text-xs">
            <span className="font-medium">주소:</span> 서울특별시 강남구
            테헤란로 123, 4층
          </p>
          <p className="text-xs">
            <span className="font-medium">고객센터:</span> 1544-0000 |{" "}
            <span className="font-medium">이메일:</span> support@weback.kr
          </p>
        </div>
        <div>
          <p className="text-[10px]">
            &copy; 2025 weback. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
