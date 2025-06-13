"use client";

import Link from 'next/link';
import Image from 'next/image';

const ShowroomCTA = () => {
  return (
    <section className="py-24 bg-charcoal-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="text-luxury-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">
              Experience In Person
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-light text-warm-white-50 mb-8">
              Visit Our<br />
              <span className="text-luxury-gold-400">Napa Valley Showroom</span>
            </h2>
            
            <p className="text-body-large text-warm-white-100/90 mb-12 leading-relaxed">
              Touch, feel, and experience our products firsthand in our beautifully designed showroom. 
              Our design experts are ready to help you bring your vision to life.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-warm-white-50 font-medium">1234 Main Street</div>
                  <div className="text-warm-white-100/60 text-sm">Napa, CA 94559</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-warm-white-50 font-medium">Mon-Fri: 8AM-6PM</div>
                  <div className="text-warm-white-100/60 text-sm">Sat: 9AM-4PM, Sun: By Appointment</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-luxury-gold-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-luxury-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-warm-white-50 font-medium">(707) 555-0123</div>
                  <div className="text-warm-white-100/60 text-sm">Call for appointment or questions</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="bg-luxury-gold-500 text-charcoal-900 px-8 py-4 text-sm tracking-wide font-semibold hover:bg-luxury-gold-600 transition-all duration-300 text-center"
              >
                SCHEDULE VISIT
              </Link>
              <a 
                href="tel:(707)555-0123"
                className="border-2 border-warm-white-50/30 text-warm-white-50 px-8 py-4 text-sm tracking-wide font-medium hover:bg-warm-white-50 hover:text-charcoal-900 transition-all duration-300 text-center"
              >
                CALL NOW
              </a>
            </div>
          </div>

          {/* Showroom Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Napa Valley Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomCTA; 