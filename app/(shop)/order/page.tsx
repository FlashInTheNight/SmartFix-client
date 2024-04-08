import OrderPage from '@/components/templates/OrderPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SmartFix | Оформление заказа",
};

  const breadcrumbsMeta = {
    route: "order",
    translate: "Оформление заказа",
  };
export default function Order() {

  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        <OrderPage />
      </main>
    </>
  );
}