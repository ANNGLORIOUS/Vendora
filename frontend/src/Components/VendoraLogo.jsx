function VendoraLogo({ compact = false }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 520 250"
        className={compact ? 'h-12 w-auto' : 'h-28 w-auto'}
        role="img"
        aria-label="Vendora logo"
      >
        <defs>
          <linearGradient id="vendoraGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#72f0d0" />
            <stop offset="25%" stopColor="#1dd3b0" />
            <stop offset="60%" stopColor="#0b9c7d" />
            <stop offset="100%" stopColor="#0b6d5a" />
          </linearGradient>
          <linearGradient id="vendoraDark" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#0f8f77" />
            <stop offset="100%" stopColor="#0e554d" />
          </linearGradient>
        </defs>

        <g transform="translate(20 0)">
          <path
            d="M40 0 L190 170 L266 80 L208 0 L120 0 L170 80 L90 0 Z"
            fill="url(#vendoraGradient)"
            opacity="0.96"
          />
          <path
            d="M198 0 L476 0 L314 200 L236 200 L348 40 L270 40 L198 0 Z"
            fill="url(#vendoraGradient)"
            opacity="0.96"
          />
          <path d="M248 40 L315 145 L248 145 Z" fill="url(#vendoraDark)" opacity="0.9" />
          <path d="M160 90 L215 170 L160 170 Z" fill="url(#vendoraDark)" opacity="0.6" />
          <rect x="318" y="145" width="22" height="48" rx="4" fill="#1dd3b0" opacity="0.92" />
          <rect x="346" y="118" width="22" height="75" rx="4" fill="#1ac0a4" opacity="0.9" />
          <rect x="374" y="92" width="22" height="101" rx="4" fill="#0da68f" opacity="0.85" />
          <path d="M320 120 L380 90 L400 108 L330 135 Z" fill="#d1fff2" opacity="0.9" />
        </g>
      </svg>
    </div>
  )
}

export default VendoraLogo
