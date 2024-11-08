import { Auth } from '@/features/worker/ui';
import { CardDescription, CardHeader, CardTitle, Card } from '@/shared/ui/card';

export function AuthPage() {

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Авторизация</CardTitle>
          <CardDescription>
						Введите все данные чтобы зайти в аккаунт
          </CardDescription>
        </CardHeader>
        <Auth />
      </Card>
    </div>
  )
}
	