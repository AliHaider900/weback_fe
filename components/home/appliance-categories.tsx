import {
  AcIcon,
  BundleProductIcon,
  DryerIcon,
  OthersIcon,
  RefrigeratorIcon,
  WashingMachineIcon,
  WaterPurifierIcon,
} from "@/components/global/icons";
import { FiSearch } from "react-icons/fi";

export const categories = [
  { label: "정수기", slug: "water-purifier", icon: WaterPurifierIcon },
  { label: "에어컨", slug: "air-conditioner", icon: AcIcon },
  { label: "냉장고", slug: "refrigerator", icon: RefrigeratorIcon },
  { label: "세탁기", slug: "washing-machine", icon: WashingMachineIcon },
  { label: "건조기", slug: "dryer", icon: DryerIcon },
  { label: "결합상품", slug: "bundle-product", icon: BundleProductIcon },
  { label: "기타", slug: "others", icon: OthersIcon },
];

const categoryRows = [
  categories.slice(0, 2),
  categories.slice(2, 5),
  categories.slice(5, 7),
];

export default function ApplianceCategories({
  onCategorySelect,
}: {
  onCategorySelect: (slug: string) => void;
}) {
  return (
    <section className="w-full mx-auto px-4 py-6 pb-16 bg-[#F7F7FC]">
      <div className="flex items-center bg-white rounded-[14px] px-4 py-3 shadow-sm mb-6 border border-gray-100 gap-2">
        <FiSearch className="text-[#B9B9B9] text-xl mr-2" />
        <input
          type="text"
          placeholder="제품명이나 브랜드를 검색하세요"
          className="flex-1 bg-transparent outline-none text-sm text-black placeholder-gray-400"
        />
      </div>

      <div className="flex flex-col gap-4">
        {categoryRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-between gap-4">
            {row.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.slug}
                  className="group rounded-2xl hover:shadow-md transition cursor-pointer  flex-1 bg-white overflow-hidden"
                  tabIndex={0}
                  aria-label={category.label}
                  onClick={() => onCategorySelect(category.slug)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-black group-hover:text-[#7B61FF] ml-3">
                      {category.label}
                    </span>
                    <span className="-mr-2 group-hover:-mr-1 mt-4 -mb-1 transition-all duration-300">
                      <Icon className="w-16 h-20 text-primary" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
