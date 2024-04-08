import Head from "next/head";
import ShippingPayment from "@/components/templates/ShippingPayment";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import { useCallback } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartFix | Оформление заказа",
};

  const breadcrumbsMeta = {
    route: "shipping-payment",
    translate: "Доставка и оплата",
  };

function ShippingPaymentPage() {

  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        <ShippingPayment />
      </main>
    </>
  );
}

export default ShippingPaymentPage;
