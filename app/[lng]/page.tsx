'use client';
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import Mint from '@/components/layouts/Mint';
import NavBar from '@/components/layouts/NavBar'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useTranslation } from '../i18n';

export default async function Page({ params: { lng } } : any) {

  let { t } = await useTranslation(lng, 'client-page');

  console.log(t('min'))
  
  return (
    <>
      <NavBar
        rightButton={(<Link href="/mint" className="btn text-white border-none bg-red-500 hover:bg-red-600">Mint Now</Link>)}
      />
      <Header translate={t}/>
      <Mint transalte={t}/>
      <Footer/>
    </>
  )
}
