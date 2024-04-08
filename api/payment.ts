import api from './axiosClient'
import { ICheckPayFx, IMakePayFx } from '@/types/order'

export const makePaymentFx = async ({ url, amount, description }: IMakePayFx) => {
    const { data } = await api.post(url, { amount, description })

    return data
}


export const checkPaymentFx = async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await api.post(url, { paymentId })

    return data
}

