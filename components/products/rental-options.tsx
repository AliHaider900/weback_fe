import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const RentalOptions = ({ product }: { product: Product }) => {
  const [openIndex, setOpenIndex] = useState(0); // Default: first provider open
  const router = useRouter();

  const handleApply = (
    provider: string,
    months: number,
    monthlyPrice: string,
    reward: string
  ) => {
    // Convert the data to a format suitable for URL parameters
    const params = new URLSearchParams({
      productName: product.name,
      modelName: product.model,
      rentalFee: `${parseFloat(monthlyPrice).toLocaleString()}원`,
      reward: `최대 ${parseFloat(reward).toLocaleString()}원`,
    });

    // Navigate to the success page with the application details
    router.push(`/application/success?${params.toString()}`);
  };

  return (
    <div className="px-4 pt-6">
      <h3 className="text-base font-medium mb-3">[펼쳐서 다양한 조건 보기]</h3>
      <div className="space-y-2">
        {product.rentalOptions.map((providerOption, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={providerOption.provider}
              className={`rounded-lg transition-shadow ${isOpen ? "" : ""}`}
            >
              <button
                className="w-full flex items-center gap-2 focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                {...(isOpen && { "aria-expanded": true })}
              >
                <IoIosArrowDown
                  size={20}
                  className={`transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                <div className="flex items-center">
                  <span className="font-medium text-sm mr-2">
                    {providerOption.provider}
                  </span>
                  {!isOpen && (
                    <span className="text-sm">
                      <span className="mr-1">|</span>
                      {providerOption.options[0].months}개월 /{" "}
                      {parseFloat(providerOption.options[0].monthly_price).toLocaleString()}
                      원/월 리워드 +
                      {parseFloat(providerOption.options[0].reward).toLocaleString()}원
                    </span>
                  )}
                </div>
              </button>
              {isOpen && (
                <ul className=" px-4 py-2 pl-2 space-y-2">
                  {providerOption.options.map((opt, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-sm">
                        • {opt.months}개월 | {parseFloat(opt.monthly_price).toLocaleString()}
                        원/월 리워드 +{parseFloat(opt.reward).toLocaleString()}원
                      </span>
                      <button
                        className="text-primary font-medium ml-2 hover:font-semibold cursor-pointer"
                        onClick={() =>
                          handleApply(
                            providerOption.provider,
                            opt.months,
                            opt.monthly_price,
                            opt.reward
                          )
                        }
                      >
                        [신청하기]
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentalOptions;
