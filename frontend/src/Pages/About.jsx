const values = [
  { title: 'Style', text: 'Everyday essentials designed to look good and work beautifully.' },
  { title: 'Quality', text: 'Well-made pieces chosen for comfort, durability, and practical use.' },
  { title: 'Convenience', text: 'Thoughtful products that fit effortlessly into busy routines.' },
  { title: 'Joy', text: 'Small upgrades that bring delight to work, gifting, and self-care rituals.' },
]

function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0b0b0b_0%,#1a1a1a_55%,#d6a41b_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="space-y-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-(--brand-300)">About Skybee</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Smart essentials for everyday rituals.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/85">
              Skybee brings together beauty essentials, desk accessories, and striking daily-use items that make life feel more polished, practical, and personal.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/85">
              From self-care finds to functional gifting pieces, we curate products that balance style, usefulness, and a little bit of everyday luxury.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 border-t border-white/20 pt-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-(--brand-300)">Our philosophy</p>
                <p className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                  Beautiful design, useful purpose.
                </p>
              </div>
              <p className="text-base leading-8 text-white/85">
                Every Skybee product is chosen for how it elevates an ordinary routine, whether you are getting ready, working, gifting, or unwinding.
              </p>
            </div>

            <div className="space-y-6 border-t border-white/20 pt-6">
              {values.map((value) => (
                <div key={value.title} className="border-b border-white/20 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/80">{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h2 className="text-2xl font-semibold">Why choose Skybee?</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Curated product picks</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  We handpick products that balance trend, function, and quality across beauty, stationery, and lifestyle essentials.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Gifting made easy</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Our collection is built for thoughtful gifting, from desk upgrades to beauty care must-haves and personal favorites.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Modern everyday living</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  We focus on stylish and useful pieces that make your routine feel a little more elevated each day.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">A joyful shopping experience</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Skybee is designed to feel approachable, thoughtful, and personal from first browse to final purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 border-t border-white/20 pt-8">
            <div>
              <h2 className="text-2xl font-semibold">What we offer</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Beauty &amp; Personal Care, Stationery &amp; Desk Essentials, Drinkware, and other lifestyle picks chosen for daily use and gifting occasions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Our promise</h2>
              <p className="mt-3 text-base leading-8 text-white/80">
                Skybee is committed to thoughtful curation, reliable quality, and a modern shopping experience that helps customers discover pieces they genuinely love.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
