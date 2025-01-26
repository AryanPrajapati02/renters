import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Luxury Room Enquiry",
  description: "Enquire about our luxurious rooms",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <style>{`
          :root {
            --color-deep-blue: #1a237e;
            --color-gold: #ffd700;
            --color-gold-dark: #ccac00;
          }
          .bg-deep-blue { background-color: var(--color-deep-blue); }
          .bg-gold { background-color: var(--color-gold); }
          .bg-gold-dark { background-color: var(--color-gold-dark); }
          .focus\\:ring-gold:focus { --tw-ring-color: var(--color-gold); }
          .focus\\:border-gold:focus { border-color: var(--color-gold); }
        `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

