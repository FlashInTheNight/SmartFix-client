import AboutPage from '@/components/templates/AboutPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartFix | О компании"
};
function About() {

  const breadcrumbsMeta = {
    route: 'about',
    translate: 'О компании',
  };

  return (
    <>
      <main>
        <Breadcrumbs breadcrumbsMeta={breadcrumbsMeta} />
        <AboutPage />
      </main>
    </>
  );
}

export default About
