import { createContext, useContext, useState } from "react";

type FilterType = "all" | "twitter" | "youtube" | "instagram" | "note";

const FilterContext = createContext<{
  filterContent: FilterType;
  setFilterContent: (filter: FilterType) => void;
} | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterContent, setFilterContent] = useState<FilterType>("all");

  return (
    <FilterContext.Provider value={{ filterContent, setFilterContent }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used inside a FilterProvider");
  }
  return context;
}
