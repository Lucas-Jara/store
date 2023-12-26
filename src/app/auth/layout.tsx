import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';


export default async function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {


  const session = await auth();


  if ( session?.user ) {
    redirect('/');
  }
  


  return (

    <main className="flex items-center justify-center min-h-screen">

        { children }

    </main>
  );
}