'use client'
import styles from '@/styles/feedbackForm/index.module.scss'
import emailjs from '@emailjs/browser'
import NameInput from './NameInput'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/types/feedbackForm'
import MessageInput from './MessageInput'
import { MutableRefObject, useRef, useState } from 'react'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/lib/hooks'

const FeedbackForm = () => {
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode);
  const darkModeClass =
    currentThemeMode === "dark" ? `${styles.dark_mode}` : "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        "service_gkfzh6l",
        "template_lyurxlg",
        formRef.current,
        "FOo09Hh6GJ0p5-wty"
      )
      .then((result) => {
        setSpinner(false);
        toast.success(`Сообщение отправлено! ${result.text}`);
      })
      .catch((error) => {
        setSpinner(false);
        toast.error(`Что-то пошло не так! ${error.text}`);
      });

    formRef.current.reset()
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Форма обратной связи
      </h3>
      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '6px', left: '47%' }}
              />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
