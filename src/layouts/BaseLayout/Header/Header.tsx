'use client';

import { deleteCookie, hasCookie } from 'cookies-next';
import { CircleUser, ScanEye, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/core/providers/I18nextProvider/LanguageContext/LanguageContext';
import { useScopedI18n } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from '@/shared/ui/dropdown-menu';
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from '@/shared/ui/select';
import { SheetContent, SheetTrigger, Sheet } from '@/shared/ui/sheet';

export function Header() {
  const t = useScopedI18n('base.header');
  const { language, setLanguage } = useLanguage();
  const isAuth = hasCookie('authToken');
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('authToken');
    router.push('/');
    router.refresh();
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <ScanEye className="h-6 w-6" />
        </Link>
        <Link className="text-foreground transition-colors hover:text-foreground" href="/">
          {t('vacancies')}
        </Link>
        {isAuth && (
          <>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/companies">
              {t('companies')}
            </Link>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/departaments">
              {t('departaments')}
            </Link>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/resume">
              {t('resume_database')}
            </Link>
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('toggle_navigation')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
              <ScanEye className="h-6 w-6" />
            </Link>
            <Link className="text-foreground transition-colors hover:text-foreground" href="/">
              {t('vacancies')}
            </Link>
            {isAuth && (
              <>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/companies">
                  {t('companies')}
                </Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/departaments">
                  {t('departaments')}
                </Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/resume">
                  {t('resume_database')}
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial" />

        {/* Language Selection Dropdown */}
        <Select onValueChange={handleLanguageChange} value={language}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder={t('select_language')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ru">{t('russian')}</SelectItem>
            <SelectItem value="kz">{t('kazakh')}</SelectItem>
            <SelectItem value="en">{t('english')}</SelectItem>
          </SelectContent>
        </Select>

        {!isAuth && (
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/auth">
            {t('login')}
          </Link>
        )}
        {isAuth && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant="secondary" size="icon">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">{t('profile')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
