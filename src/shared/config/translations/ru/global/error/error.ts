export const ERROR_TRANSLATIONS = {
  COMMON: {
    notFound: 'Ничего не найдено'
  },
  ERROR_PAGE: {
    error: 'Произошла ошибка',
    reload: 'Перезагрузить',
    tryReload: 'Попробуйте перезагрузить страницу'
  },
  NOT_FOUND_PAGE: {
    errorNotFound: 'Ошибка не найдена',
    goToMain: 'Вернуться на главную',
    oops: 'Ой',
    pageNotFound: 'Страница не найдена'
  },
  TOAST: {
    accessDenied: 'Отказано в доступе',
    accountBanned: 'Аккаунт заблокирован',
    errorNotFound: 'Произошла неизвестная ошибка',
    invalidData: 'Были введены некорректные данные',
    invalidUsernameOrPassword: 'Неверный логин или пароль',
    notAuthorized: 'Вы не авторизованы',
    tellToSP: 'Обратитесь в службу поддержки.',
    waitRequest: 'Пожалуйста, подождите некоторое время и повторите запрос.',
    waitingLimitExceeded: 'Превышен лимит ожидания',
    warningBanIp: 'После двух повторных отправок некорректных данных, ваш IP адрес будет заблокирован',
    youIpBanned: 'Ваш IP адрес заблокирован',
    youIpBannedDetail: 'В целях безопасности доступа в кабинет, ваш IP адрес заблокирован. Обратитесь в нашу службу поддержки'
  }
} as const;