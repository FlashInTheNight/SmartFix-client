import ContactsPage from '@/components/templates/ContactsPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SmartFix | Контакты",
};

  const breadcrumbsMeta = {
    route: "wholesale-buyers",
    translate: "Оптовым покупателям",
  };

function WholesaleBuyers() {

  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        <ContactsPage isWholesaleBuyersPage={true} />
      </main>
    </>
  );
}

export default WholesaleBuyers
