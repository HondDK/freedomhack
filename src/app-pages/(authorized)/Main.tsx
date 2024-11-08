'use client';

import { getCookie } from 'cookies-next';

export function Main() {

  console.log(getCookie('authToken'));

  return <></>
}
