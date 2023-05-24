import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import '../globals.css'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: {
    lng
  }
} : any) {
  return (
    <html lang={lng} dir={dir(lng)} data-theme='cupcake'>
      <head />
      <body suppressHydrationWarning={true} >
        {children}
      </body>
    </html>
  )
}
