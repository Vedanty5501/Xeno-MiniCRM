import Providers from './_app';

export const metadata = {
  title: 'Sneakers stop',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children,session }) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers></body>
    </html>
  )
}
