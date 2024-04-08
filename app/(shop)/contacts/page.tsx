import ContactsPage from '@/components/templates/ContactsPage'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs';

export const metadata: Metadata = {
  title: "SmartFix | Контакты",
};

function Contacts() {

    const breadcrumbsMeta = {
      route: "contacts",
      translate: "Контакты",
    };


  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        <ContactsPage />
      </main>
    </>
  );
}

export default Contacts
