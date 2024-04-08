// import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import CatalogPage from "@/components/templates/CatalogPage";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SmartFix | Каталог",
};

const breadcrumbsMeta = {
  route: "catalog",
  translate: "Каталог",
};

function Catalog() {
  return (
    <>
      <main>
        <Suspense>
          <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
          <CatalogPage />
        </Suspense>
      </main>
    </>
  );
}

export default Catalog;
