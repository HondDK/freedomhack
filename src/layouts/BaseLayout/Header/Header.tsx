'use client';

import { deleteCookie, hasCookie } from 'cookies-next';
import { CircleUser, ScanEye, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
} from '@/shared/ui/dropdown-menu';
import { SheetContent, SheetTrigger, Sheet } from '@/shared/ui/sheet';

export function Header() {
  const [isAuth, setIsAuth] = useState(false);

  // Check for authentication cookie only on the client side
  useEffect(() => {
    setIsAuth(hasCookie('authToken'));
  }, []);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <ScanEye className="h-6 w-6" />
        </Link>
        <Link className="text-foreground transition-colors hover:text-foreground" href="/">
          Вакансии
        </Link>
        {isAuth && (
          <>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/companies">
              Компании
            </Link>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/departaments">
              Департаменты
            </Link>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/resume">
              База резюме
            </Link>
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
              <ScanEye className="h-6 w-6" />
            </Link>
            <Link className="text-foreground transition-colors hover:text-foreground" href="/">
              Вакансии
            </Link>
            {isAuth && (
              <>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/companies">
                  Компании
                </Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/departaments">
                  Департаменты
                </Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" href="#">
                  Анализ вакансии
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {!isAuth ? (
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/auth">
            Войти
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" variant="secondary" size="icon">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Профиль</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => deleteCookie('authToken')}>
                Выйти с аккаунта
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
