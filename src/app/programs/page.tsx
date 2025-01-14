import Link from 'next/link';
import { MotionDiv } from '@/components/motion';
import { programDetails, trainingFocus } from '@/lib/constants';

export default function Programs() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Program Overview */}
        <section className="mb-20">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6">Our Training Programs</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive basketball training for youth ages {programDetails.ageRange}, designed to develop
              skills, build confidence, and foster a love for the game.
            </p>
          </MotionDiv>
        </section>

        {/* Program Details */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Program Structure</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>{programDetails.sessionsPerWeek} training sessions per week</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Small group training (maximum 12 players per group)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Age-appropriate skill development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">•</span>
                  <span>Regular progress assessments</span>
                </li>
              </ul>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
              <ul className="space-y-4">
                {programDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>
        </section>

        {/* Skills Development */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Skills Development Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingFocus.map((focus, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{focus}</h3>
                <p className="text-gray-600">
                  Professional instruction and practice drills focused on mastering this essential skill.
                </p>
              </MotionDiv>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-emerald-600 text-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Monthly Program</h2>
            <p className="text-2xl mb-2">${programDetails.monthlyPrice}</p>
            <p className="text-lg mb-6">per month</p>
            <ul className="text-left mb-8 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                {programDetails.sessionsPerWeek} sessions per week
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Professional coaching
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Skill development focus
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Progress tracking
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Register Now
            </Link>
          </MotionDiv>
        </section>
      </div>
    </div>
  );
} 