"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "가전 렌탈", href: "/" }, // Home Appliance Rental
  { label: "후기 모음", href: "#" }, // reviews
  { label: "브랜드 스토리", href: "#" }, // brand-story
  { label: "리워드 신청 방법", href: "#" }, // how-to-reward
  { label: "리워드 신청", href: "/rewards" }, // Rewards
  // { label: "리워드 신청", href: "/apply-reward" }, // Apply for Rewards
];

function TabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <Tabs className="w-full">
        <TabsList className="w-full h-fit flex items-center justify-start overflow-x-auto whitespace-nowrap bg-transparent">
          {tabs.map((tab, idx) => (
            <Link key={idx} href={tab.href} className="flex-1">
              <TabsTrigger
                value={tab.href}
                className={clsx(
                  "bg-transparent shadow-none w-full relative transition-all duration-300 pb-2",
                  "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px]",
                  "after:transition-all after:duration-300",
                  pathname === tab.href
                    ? "font-semibold after:bg-primary after:scale-x-100"
                    : "font-medium text-muted-foreground after:scale-x-0"
                )}
                asChild
              >
                <span className="block w-full text-center text-[13px]">
                  {tab.label}
                </span>
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
}

export default TabLayout;
