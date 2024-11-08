import {
  CircleUser,
  Search,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/shared/ui/dropdown-menu'
import { Input } from '@/shared/ui/input';
import { SheetContent, SheetTrigger, Sheet } from '@/shared/ui/sheet'
import { ScanEye } from 'lucide-react';

export function Header() {
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
        href="#"
      >
        Вакансии
      </Link>
      <Link
        className="text-muted-foreground transition-colors hover:text-foreground"
        href="#"
      >
        Просмотр компаний
      </Link>
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
            <LibraryBig className="h-6 w-6"/>
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Вакансии
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Просмотр компаний
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
          <Input
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="Поиск книг..."
            type="search"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="secondary" size="icon">
            <CircleUser className="h-5 w-5"/>
            <span className="sr-only">Профиль </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>Настройки</DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>Выйти с аккаунта</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
}