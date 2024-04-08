'use client'
import PartPage from "@/components/templates/PartPage";
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useGetBoilerPartFxQuery } from "@/lib/features/api/boilerParts";

function CatalogPartPage({ params }: { params: { partid: string } }) {
  const currentId = params.partid;

  const {
    data: boilerPart,
    isSuccess,
  } = useGetBoilerPartFxQuery(currentId);

    const breadcrumbsMeta = {
      route: "catalog",
      translate: "Каталог",
    };

  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        {isSuccess && <PartPage boilerPart={boilerPart} />}
      </main>
    </>
  );
}

export default CatalogPartPage;
