"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProgramAccordionItem, ProgramTab } from "@/lib/parse-programs";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: ProgramAccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headingId = `accordion-${item.title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        id={headingId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center gap-3 bg-white px-4 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center text-sm font-bold text-gray-600"
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
        <span className="text-base font-semibold text-esc-red underline decoration-esc-red underline-offset-2">
          {item.title}
        </span>
      </button>
      {isOpen && (
        <div
          className="wp-content border-t border-gray-100 bg-[#f6f6f6] px-4 py-4"
          dangerouslySetInnerHTML={{ __html: item.contentHtml }}
        />
      )}
    </div>
  );
}

export default function ProgramsPageClient({ tabs }: { tabs: ProgramTab[] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  function toggleItem(tabId: string, index: number) {
    setOpenItems((prev) => ({
      ...prev,
      [tabId]: prev[tabId] === index ? null : index,
    }));
  }

  if (!activeTab) return null;

  return (
    <div>
      {/* Tab navigation */}
      <div
        role="tablist"
        aria-label="Program categories"
        className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 sm:gap-0"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-4 py-3 text-sm font-semibold transition-colors sm:flex-1 sm:text-center ${
                isActive
                  ? "border-b-2 border-esc-red text-esc-red"
                  : "text-gray-600 hover:text-esc-black"
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Active tab panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
      >
        {activeTab.image && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={activeTab.image.src}
              alt={activeTab.image.alt || activeTab.title}
              width={1024}
              height={576}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200">
          {activeTab.items.map((item, index) => (
            <AccordionItem
              key={`${activeTab.id}-${item.title}`}
              item={item}
              isOpen={openItems[activeTab.id] === index}
              onToggle={() => toggleItem(activeTab.id, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
