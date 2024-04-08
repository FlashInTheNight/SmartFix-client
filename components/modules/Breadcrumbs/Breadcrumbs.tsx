"use client";

import Link from "next/link";
import { capitalize } from "@/utils/common";
import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import type { IBreadcrumbsMeta } from "@/types/common";
import styles from "@/styles/breadcrumbs/index.module.scss";
import { useAppSelector } from "@/lib/hooks";
import Crumb from "./Crumb";

const Breadcrumbs = ({
  breadcrumbsMeta,
}: {
  breadcrumbsMeta: IBreadcrumbsMeta;
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";

  // const home = {
  //   icon: "pi pi-home",
  //   url: "/",
  // };

  const { route, translate } = breadcrumbsMeta;

  const items = segments.map((item, index) => {
    const translatedItem = item === route ? translate : item;

    return (
      <li
        key={index}
        className={`${styles.breadcrumbs__item} ${darkModeClass}`}
      >
        {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
         * @ts-ignore */}
        <Crumb
          translatedItem={translatedItem}
          routeItem={item}
          key={index}
          last={index === segments.length - 1}
        />
      </li>
    );
  });

  return (
    // <div className='container'>
    //   <BreadCrumb
    //     home={home}
    //     model={items}
    //     className={`${styles.breadcrumbs}`}
    //   />
    // </div>
    <div className="container">
      <ul className={styles.breadcrumbs}>
        <li className={styles.breadcrumbs__item}>
          <Link href="/dashboard" passHref legacyBehavior>
            <a>
              <span
                className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`}
                style={{ marginRight: 0 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.6667 13.9993H3.33341C3.1566 13.9993 2.98703 13.9291 2.86201 13.804C2.73699 13.679 2.66675 13.5094 2.66675 13.3326V7.33263H0.666748L7.55141 1.07396C7.67415 0.962281 7.83414 0.900391 8.00008 0.900391C8.16603 0.900391 8.32601 0.962281 8.44875 1.07396L15.3334 7.33263H13.3334V13.3326C13.3334 13.5094 13.2632 13.679 13.1382 13.804C13.0131 13.9291 12.8436 13.9993 12.6667 13.9993ZM4.00008 12.666H12.0001V6.10396L8.00008 2.46796L4.00008 6.10396V12.666Z" />
                </svg>
              </span>
            </a>
          </Link>
        </li>
        {items}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
