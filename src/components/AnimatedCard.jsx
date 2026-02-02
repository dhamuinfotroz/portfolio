export default function AnimatedCard({ title, icon, delay }) {
  return (
    <div
      className="bg-white border rounded-xl p-5 flex items-center gap-3
                 hover:shadow-lg hover:-translate-y-1 transition
                 opacity-0 animate-fadeUp"
      style={{ animationDelay: delay }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{title}</span>
    </div>
  );
}
