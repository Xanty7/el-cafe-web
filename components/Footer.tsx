import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  return (
    <footer className="bg-surface-dim py-16 md:py-24 border-t border-primary/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="col-span-1 md:col-span-5 reveal-on-scroll">
            <span className="font-headline-md text-primary block mb-4 uppercase tracking-widest">EL CAFÉ</span>
            <p className="font-body-lg text-on-surface-variant italic opacity-80">Lorem ipsum dolor sit, amet.</p>
          </div>
          <div className="col-span-1 md:col-span-3 reveal-on-scroll delay-100">
            <h4 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-8">Navegación</h4>
            <ul className="space-y-4 font-body-md text-on-surface-variant">
              <li><Link className="nav-link hover:text-primary transition-colors inline-block" href="/">Inicio</Link></li>
              <li><Link className="nav-link hover:text-primary transition-colors inline-block" href="/menu">Menú</Link></li>
              <li><Link className="nav-link hover:text-primary transition-colors inline-block" href="/galeria">Galería</Link></li>
              <li><Link className="nav-link hover:text-primary transition-colors inline-block" href="/nosotros">Nosotros</Link></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-4 reveal-on-scroll delay-200">
            <h4 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-8">contacto</h4>
            <div className="space-y-8">
              <div className="flex gap-8">
                <Link className="nav-link text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group/social" href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="text-[20px] group-hover/social:scale-110 transition-transform" />
                  Instagram
                </Link>
                <Link className="nav-link text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group/social" href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebookF} className="text-[20px] group-hover/social:scale-110 transition-transform" />
                  Facebook
                </Link>
              </div>
              <div className="font-body-md text-on-surface-variant">
                <p className="mb-2">contacto@tucafe.com</p>
                <p>+54 2302 554433</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 reveal-on-scroll delay-300">
          <p className="font-body-md text-on-surface-variant/60 text-center md:text-left">
            © 2026 El Café. Todos los derechos reservados. <span className="hidden md:inline">|</span><br className="md:hidden" /> Desarrollado por Xanti Baras
          </p>
          <Link className="nav-link font-label-caps text-label-caps text-on-surface-variant/60 hover:text-primary uppercase tracking-widest transition-colors" href="#">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  );
}
