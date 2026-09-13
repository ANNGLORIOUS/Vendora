import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className="min-h-screen bg-(--brand-50) py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-(--brand-900) text-center mb-4">
          Contact Skybee
        </h1>

        <p className="text-center text-(--text-soft) mb-12">
          We'd love to hear from you. Reach out for product inquiries,
          gifting ideas, or wholesale collaborations.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-(--brand-700) text-xl" />
              <span>+254 700 000 000</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-(--brand-700) text-xl" />
              <span>hello@skybee.co</span>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-(--brand-700) text-xl" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          <form className="space-y-4 bg-white p-6 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-(--brand-300) rounded-lg px-4 py-3 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-(--brand-300) rounded-lg px-4 py-3 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-(--brand-300) rounded-lg px-4 py-3 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-(--brand-900) text-white py-3 rounded-lg hover:bg-(--brand-700) transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;