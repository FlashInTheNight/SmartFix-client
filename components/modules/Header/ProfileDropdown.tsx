"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileSvg from "@/components/elements/ProfileSvg/ProfileSvg";
import LogoutSvg from "@/components/elements/LogoutSvg/LogoutSvg";
import { withClickOutside } from "../../../utils/withClickOutside";
import { useRouter } from "next/navigation";
import type { IWrappedComponentProps } from "../../../types/common";
import styles from "@/styles/profileDropDown/index.module.scss";
import { logoutFx } from "@/api/auth";
import { setUser } from "@/lib/features/user/userSlice";
import useCheckUser from "@/hooks/useCheckUser";

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
    const { username, email } = useAppSelector((state) => state.user);
    const router = useRouter();
    const darkModeClass =
      currentThemeMode === "dark" ? `${styles.dark_mode}` : "";
    const dispatch = useAppDispatch();

    const toggleProfileDropDown = () => setOpen(!open);

    const [checkUser, setCheckUser] = useState(false);

    const fetchData = async () => {
      const user = await useCheckUser();
      
      setCheckUser(user);
    };

    useEffect(() => {
      fetchData();
    }, [checkUser]);

    const handleSignUp = () => {
      router.push("/auth");
    };

    const handleLogout = async () => {
      await logoutFx("/users/logout");
      dispatch(setUser({ username: "", email: "", userId: "" }));
      fetchData();
      router.push("/dashboard");
    };

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: "right top" }}
            >
              <li className={styles.profile__dropdown__user}>
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                >
                  {username}
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                >
                  {email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                {!checkUser ? (
                  <button
                    className={styles.profile__dropdown__item__btn}
                    onClick={handleSignUp}
                  >
                    <span
                      className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                    >
                      Войти на сайт
                    </span>
                    <span
                      className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                    >
                      <LogoutSvg />
                    </span>
                  </button>
                ) : (
                  <button
                    className={styles.profile__dropdown__item__btn}
                    onClick={handleLogout}
                  >
                    <span
                      className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                    >
                      Выйти
                    </span>
                    <span
                      className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                    >
                      <LogoutSvg />
                    </span>
                  </button>
                )}
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropDown.displayName = "ProfileDropDown";

export default withClickOutside(ProfileDropDown);
