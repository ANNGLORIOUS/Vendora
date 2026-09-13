import skyLogo from '../assets/skybeelogo.jpeg'

function Hero() {
  const highlights = ['Beauty essentials', 'Desk picks', 'Drinkware']

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_45%)] text-(--text-strong)">
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-none flex-col px-0 py-0 sm:px-0 lg:px-0">
        <section className="flex flex-1 items-stretch bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_40%),linear-gradient(135deg,#efc62b_0%,#d9a813_35%,#b68500_100%)] text-(--text-strong)">
          <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto w-full max-w-5xl rounded-4xl border border-black/10 bg-black/5 p-6 shadow-[0_20px_80px_rgba(20,20,20,0.15)] backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="flex flex-col items-center text-center">
                <img
                  src={skyLogo}
                  alt="Skybee logo"
                  className="w-full max-w-190 object-contain drop-shadow-[0_12px_26px_rgba(0,0,0,0.16)]"
                />

                <p className="mt-4 text-lg font-semibold uppercase tracking-[0.32em] text-(--brand-900) sm:text-xl">
                  Everyday gifting, beauty, and lifestyle finds
                </p>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] text-(--brand-900) sm:text-5xl lg:text-7xl">
                  Thoughtful pieces for brighter routines.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-(--text-soft) sm:text-lg">
                  Skybee brings together beauty essentials, desk must-haves, and elevated drinkware for everyday joy and standout gifting.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="#shop"
                    className="rounded-full bg-(--brand-900) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-700)"
                  >
                    Shop now
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-black/30 bg-white/70 px-6 py-3 text-sm font-semibold text-(--brand-900) transition hover:bg-white"
                  >
                    Discover more
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {highlights.map((item) => (
                    <div key={item} className="rounded-full border border-black/20 bg-white/65 px-4 py-2 text-sm font-medium text-(--brand-900)">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Hero
