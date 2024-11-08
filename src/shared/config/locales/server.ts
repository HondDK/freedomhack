import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  ru: () => import('@/shared/config/translations/ru/ru.translate'),
  kz: () => import('@/shared/config/translations/kz/kz.translate')
})