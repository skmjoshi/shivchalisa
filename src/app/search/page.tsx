import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search devotional texts",
  description: "Search Shiv Chalisa devotional texts.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://shivchalisa.org/search" },
};

export default function SearchPage() {
  return <SearchClient />;
}
