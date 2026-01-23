import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <header className="site-header">
          <a className="skip-link visually-hidden visually-hidden-focusable" href="#content">
            Passer au contenu
          </a>

          <nav className="navbar" aria-label="Navigation principale">
            <div className="container navbar__inner">
              <Link className="navbar-brand" href="/">
                Quiz App
              </Link>

              <div className="nav" aria-label="Sections">
                <Link className="nav__link" href="/">
                  Accueil
                </Link>
                <Link className="nav__link" href="/quiz">
                  Tous les quiz
                </Link>
               
              </div>
            </div>
          </nav>
        </header>

        <main className="page" id="content">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  )
}
