export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Awards & Mentions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-md animate-fadeUp">
            <h4 className="font-bold mb-2">🏆 Best Learning App</h4>
            <p className="text-gray-600">
              Awarded best education platform for exam preparation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md animate-fadeUp delay-100">
            <h4 className="font-bold mb-2">📰 Featured in Media</h4>
            <p className="text-gray-600">
              Helping students crack exams with smart learning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md animate-fadeUp delay-200">
            <h4 className="font-bold mb-2">⭐ Trusted by Students</h4>
            <p className="text-gray-600">
              Used by thousands of aspirants across India.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
