"use client";

import { useState, FormEvent } from "react";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { submitForm } from "@/hooks/useApi";

const ConsultationRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agreement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // submitForm function from API hooks
      await submitForm({
        name: formData.name,
        phone: formData.phone,
        agreeToTerms: formData.agreement,
      });
      setFormData({ name: "", phone: "", agreement: false });
      alert("상담 신청이 완료되었습니다.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-6 md:py-8 min-h-[70vh]">
        <h3 className="text-center text-xl font-medium pb-3 border-b border-[#01010180] mx-4">
          상담 신청
        </h3>

        <div className="flex flex-col items-center mt-8 md:mt-14 px-4 md:px-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[300px] flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3 mb-6 md:mb-10 w-full">
              <div className="flex gap-2 w-full">
                <div className="flex justify-center items-center bg-[#F3F1F1] text-xs md:text-sm w-16 md:w-[63px] h-[44px] flex-shrink-0">
                  이름<span className="text-primary">*</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 h-[44px] border border-[rgba(0,0,0,0.5)] px-2.5 min-w-0"
                  required
                />
              </div>

              <div className="flex gap-2 w-full">
                <div className="flex justify-center items-center bg-[#F3F1F1] text-xs md:text-sm w-16 md:w-[63px] h-[44px] flex-shrink-0">
                  연락처<span className="text-primary">*</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 h-[44px] border border-[rgba(0,0,0,0.5)] px-2.5 min-w-0"
                  required
                />
              </div>
              <p className="text-xs text-center tracking-wider mt-1 px-2 md:px-0">
                ※ 상담 신청 완료 시, 입력하신 번호로 알림 메시지가 발송됩니다.
              </p>
            </div>

            <div className="flex items-start md:items-center gap-1.5">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="w-4 h-4 border border-[#132634] rounded mt-0.5 md:mt-0"
                required
              />
              <label htmlFor="agreement" className="text-xs tracking-wider">
                상담을 위해 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 md:mt-4 ${
                isSubmitting ? "bg-gray-400" : "bg-[#8D84F5] hover:bg-primary"
              } text-white text-base md:text-lg font-medium rounded-full py-2.5 md:py-[10px] px-8 md:px-12 w-fit self-center transition-colors`}
            >
              {isSubmitting ? "처리 중..." : "상담 신청하기"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConsultationRequest;
