import vendoraLogo from '../assets/logovendora.png'

function VendoraLogo({ compact = false }) {
  return (
    <div className={`flex items-center justify-center ${compact ? 'rounded-md bg-white' : ''}`}>
      <img
        src={vendoraLogo}
        alt="Vendora logo"
        className={compact ? 'h-16 w-16 object-contain' : 'h-28 w-28 object-contain'}
      />
    </div>
  )
}

export default VendoraLogo
