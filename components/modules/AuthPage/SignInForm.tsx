'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import { useStore } from 'effector-react'
// import { $mode } from '@/context/mode'
import { singInFx } from '@/api/auth'
import { useRouter } from 'next/navigation'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { useLoginMutation } from '@/lib/features/api/auth'
import { setUser } from '@/lib/features/user/userSlice'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const currentThemeMode = useAppSelector((state) => state.themeMode.mode)
  const darkModeClass = currentThemeMode === 'dark' ? `${styles.dark_mode}` : ''
  const route = useRouter()
  const dispatch = useAppDispatch()

  const [sentLoginQuery, { isLoading }] = useLoginMutation()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const { user } = await singInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })

      dispatch(setUser(user))

      // await sentLoginQuery({
      //   username: data.name,
      //   password: data.password,
      // })

      resetField('name')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      // showAuthError(error)
      console.error(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        Войти на сайт
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  )
}

export default SignInForm
