import Link from 'next/link'
import { RiFlashlightFill, RiArrowRightUpLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-[#F4F1EA] border-t border-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E85D2A] text-white flex items-center justify-center">
                <RiFlashlightFill className="text-lg" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                VOLT &amp; GRAIN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Industrial-grade MagSafe cases, 100W GaN III desktop stations, Kevlar-braided
              240W cords, and lossless ANC audio engineered for everyday carry longevity.
            </p>
            <p className="text-[11px] font-mono text-neutral-500">
              QI2 CERTIFIED LAB • CNC 6063 ALUMINUM • DUPONT KEVLAR® ARAMID
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#E85D2A] mb-3">
              Store Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/" className="hover:text-white">
                  01. Flagship Storefront
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  02. Full Accessories Catalog
                </Link>
              </li>
              <li>
                <Link href="/bundle" className="hover:text-white">
                  03. Custom 4-Piece EDC Builder
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="hover:text-white">
                  04. Qi2 &amp; Wattage Lab
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white">
                  05. Checkout &amp; Live Order Tracker
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#E85D2A] mb-3">
              Engineering Credits
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Designed &amp; architected as a standalone multi-page e-commerce system by{' '}
              <strong className="text-white">Jeyarajan Thilakraj</strong>.
            </p>
            <a
              href="https://portfolio-six-lyart-fyjdxl16rt.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
            >
              <span>Developer Portfolio</span>
              <RiArrowRightUpLine />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-neutral-500">
          <span>© 2026 VOLT &amp; GRAIN INDUSTRIAL LABS. ALL RIGHTS RESERVED.</span>
          <span>PROMO CODES: VOLT15 (15% OFF) • MAGSAFE20 (20% OFF)</span>
        </div>
      </div>
    </footer>
  )
}
