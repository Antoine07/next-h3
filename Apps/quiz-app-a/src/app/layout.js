import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="topbar__inner">
            <Link className="brand" href="/">
              Quiz App
            </Link>
            <nav className="nav" aria-label="Navigation principale">
              <Link className="nav__link" href="/">
                Accueil
              </Link>
              <Link className="nav__link" href="/quiz">
                Tous les quiz
              </Link>
            </nav>
          </div>
        </header>

        <main className="page">
          <div className="page__inner">{children}</div>
        </main>
      </body>
    </html>
  )
}
