import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';
import SyllabusSidebar from "../components/SyllabusSidebar";
import historyTree from "../data/historyTree.json";
import { mysqlAPI } from "../services/mysqlApi";

export default function HistoryNodePage() {
  const navigate = useNavigate();
  const { "*": splat } = useParams();
  const [mysqlContent, setMysqlContent] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     1️⃣ HISTORY ROOT PAGE
  =============================== */
  if (!splat) {
    return (
      <>
        <NaveBar2  />
        <main className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">History – Topics</h1>

          <div className="space-y-4">
            {Object.entries(historyTree).map(([slug, item], index) => (
              <div
                key={slug}
                onClick={() => navigate(`/explore/upsc/history/${slug}`)}
                className="flex justify-between items-center
                           bg-gray-50 rounded-lg px-6 py-5
                           cursor-pointer hover:bg-gray-100 transition"
              >
                <div>
                  <div className="font-medium">
                    {String(index + 1).padStart(2, "0")} {item.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.children ? Object.keys(item.children).length : 0} subtopics
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  /* ===============================
     2️⃣ WALK JSON TREE SAFELY
  =============================== */
  const pathParts = splat.split("/").filter(Boolean);
  let currentNode = { children: historyTree };

  for (let part of pathParts) {
    if (!currentNode.children || !currentNode.children[part]) {
      return (
        <>
          <NaveBar2  />
          <div className="p-10 text-center text-gray-500">Not Found</div>
        </>
      );
    }
    currentNode = currentNode.children[part];
  }

  /* ===============================
     3️⃣ FETCH CONTENT FROM MySQL
  =============================== */
  useEffect(() => {
    const fetchMySQLContent = async () => {
      if (currentNode.type === "doc") {
        setLoading(true);
        try {
          // Get the slug from the URL (last part of the path)
          const urlSlug = pathParts[pathParts.length - 1];
          
          // Convert URL slug to MySQL slug format
          const contentSlug = decodeURIComponent(urlSlug)
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          console.log('Fetching content for slug:', contentSlug);
          
          // Fetch content from MySQL backend
          const response = await mysqlAPI.getContent(contentSlug);
          
          console.log('MySQL response:', response);
          
          if (response?.data && response.data.length > 0) {
            // Get the first content item
            setMysqlContent(response.data[0].attributes.ContentBody);
          } else {
            console.log('No content found for slug:', contentSlug);
          }
        } catch (error) {
          console.error("Error fetching MySQL content:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMySQLContent();
  }, [splat]);

  /* ===============================
     4️⃣ DOCUMENT PAGE (WITH MySQL CONTENT)
  =============================== */
  if (currentNode.type === "doc") {
    return (
      <>
        <NaveBar2  />
        <main className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
          <SyllabusSidebar />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">{currentNode.title}</h1>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading content...</p>
                </div>
              </div>
            ) : mysqlContent ? (
              // Render MySQL content if available
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                  prose-li:text-gray-700 prose-li:my-2
                  prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
                  prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
                  prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
                  prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
                  prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-3
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{
                  __html: mysqlContent,
                }}
              />
            ) : (
              // Fallback to JSON content if MySQL content not available
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-p:text-gray-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: currentNode.content || "<p>No content available</p>",
                }}
              />
            )}
          </div>
        </main>
      </>
    );
  }

  /* ===============================
     5️⃣ CATEGORY / TOPIC PAGE
  =============================== */
  const isModernHistory = splat === "modern-history";

  return (
    <>
      <NaveBar2  />

      <main className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* LEFT SIDEBAR */}
        <SyllabusSidebar />

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">{currentNode.title}</h1>

          {/* ⭐ EXTRA PART ONLY FOR MODERN HISTORY */}
          {isModernHistory && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border">
              <h2 className="text-xl font-semibold mb-2">
                About Modern Indian History
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Modern Indian History deals with the period from the decline of
                the Mughal Empire to India's independence in 1947. It focuses on
                colonial rule, resistance movements, socio-religious reforms, and
                the rise of Indian nationalism.
              </p>
            </div>
          )}

          {/* CHILD TOPICS LIST */}
          <div className="bg-white rounded-xl border">
            {currentNode.children &&
              Object.entries(currentNode.children).map(([slug, item], index) => (
                <div
                  key={slug}
                  onClick={() => navigate(`/explore/upsc/history/${splat}/${slug}`)}
                  className="flex justify-between items-center
                               px-6 py-4 border-b last:border-b-0
                               cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-gray-400 w-8">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-medium">
                      {item.type === "doc" ? "📄 " : "📁 "}
                      {item.title}
                    </span>
                  </div>

                  <span className="text-gray-400">›</span>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}