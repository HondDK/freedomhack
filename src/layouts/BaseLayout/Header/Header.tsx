'use client'

import { deleteCookie, hasCookie } from 'cookies-next';
import {
  CircleUser,
  Menu
} from 'lucide-react';
import { ScanEye } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { Button } from '@/shared/ui/button';
import {

  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from '@/shared/ui/dropdown-menu'
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';
import { SheetContent, SheetTrigger, Sheet } from '@/shared/ui/sheet'

export function Header() {
  const { language, setLanguage } = useLanguage();
  const isAuth = hasCookie('authToken');

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav
      className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
        href="#"
      >
        <ScanEye className="h-6 w-6"/>
      </Link>
      <Link
        className="text-foreground transition-colors hover:text-foreground"
        href="/"
      >
        Вакансии
      </Link>
      {isAuth && <>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/companies"
        >
        Компании
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/departaments"
        >
        Департаменты
        </Link>
        <Link
          className="text-muted-foreground transition-colors hover:text-foreground"
          href="/resume"
        >
        База резюме
        </Link>
      </>}
    </nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="shrink-0 md:hidden"
          variant="outline"
          size="icon"
        >
          <Menu className="h-5 w-5"/>
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <ScanEye className="h-6 w-6"/>
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/"
          >
            Вакансии
          </Link>
          {isAuth && <>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/companies"
            >
            Компании
            </Link>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/departaments"
            >
            Департаменты
            </Link>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href="/resume"
            >
              База резюме
            </Link>
          </>}
        </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial">
      </form>
      <Select onValueChange={handleLanguageChange} value={language}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="kz">Қазақ</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
      {!isAuth && <Link className={'text-muted-foreground transition-colors hover:text-foreground'} href={'/auth'}>
        Войти
      </Link>}
      {isAuth &&
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="secondary" size="icon">
            <CircleUser className="h-5 w-5"/>
            <span className="sr-only">Профиль</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/*<DropdownMenuLabel>Мой профиль</DropdownMenuLabel>*/}
          {/*<DropdownMenuSeparator/>*/}
          {/*<DropdownMenuSeparator/>*/}
          <DropdownMenuItem onClick={() => deleteCookie('authToken')}>Выйти с аккаунта</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      }
    </div>
  </header>
}