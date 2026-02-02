import { useParams } from "react-router-dom";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';
import Breadcrumb from "../components/Breadcrumb";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';

export default function ViewerPage() {
  const { type, id } = useParams();

  return (
    <>
      <NaveBar2  />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: "History", to: "/explore/upsc/history" },
            { label: "ancient", to: "/explore/upsc/history/ancient" },
            { label: "Indus Valley Civilization" },
          ]}
        />

        <div className="grid grid-cols-12 gap-8 mt-6">
          
          {/* LEFT: Table of contents */}
          <aside className="col-span-3 border rounded-lg p-4 h-fit">
            <h3 className="font-semibold mb-3">Table of contents</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Introduction</li>
              <li>Geographical Extent</li>
              <li>Town Planning</li>
              <li>Agriculture</li>
              <li>Decline</li>
            </ul>
          </aside>

          {/* CENTER: Main content */}
          <section className="col-span-6">
            <h1 className="text-3xl font-bold mb-4">
              Introduction to the Harappan Culture
            </h1>

            <p className="text-gray-700 leading-8 mb-6">
              Indus Valley Civilization (IVC) is one of the four great civilizations
              of the world. It flourished along the floodplains of Indus and
              Ghaggar-Hakra...
            </p>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Mohenjo-daro.jpg"
              alt="Harappa"
              className="rounded-lg mb-6"
            />
          </section>

          {/* RIGHT: Upgrade / Actions */}
          <aside className="col-span-3 border rounded-lg p-4 h-fit">
            <h3 className="font-semibold mb-4">Plans starting</h3>
            <p className="text-sm mb-4">₹121/month</p>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Upgrade Now
            </button>

            <div className="mt-6 space-y-2 text-sm text-gray-700">
              <p>⬇ Download this Doc</p>
              <p>📖 Open Chapter</p>
              <p>💰 View Pricing Plans</p>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}
