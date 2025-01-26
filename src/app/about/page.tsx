//src//app//about//page.tsx
import { MotionDiv } from '@/components/motion';
import { coaches } from '@/lib/constants';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Coaches Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-center mb-12">Meet Our Coaches</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {coaches.map((coach, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-2">{coach.name}</h2>
                  <h3 className="text-emerald-600 font-semibold mb-4">{coach.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{coach.bio}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Sponsors Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Our Sponsors</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Exotic Detailing</h3>
              <p className="text-gray-600">
                We&apos;re proud to partner with local businesses that support youth sports development.
              </p>
            </div>
            <div className="mt-8 text-center text-gray-500">
              <p>Interested in becoming a sponsor?</p>
              <p>Contact us to learn more about partnership opportunities.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 