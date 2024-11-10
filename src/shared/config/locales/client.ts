'use client'

import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ru: () => import('@/shared/config/translations/ru/ru.translate'),
  kz: () => import('@/shared/config/translations/kz/kz.translate'),
  en: () => import('@/shared/config/translations/en/en.translate')
})