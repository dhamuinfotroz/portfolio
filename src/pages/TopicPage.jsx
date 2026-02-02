import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mysqlAPI } from "../services/mysqlApi";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';
import Breadcrumb from "../components/Breadcrumb";

export default function TopicPage() {
  const { topic } = useParams();

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topic) loadContent();
  }, [topic]);

  const loadContent = async () => {
    try {
      setLoading(true);
      console.log("📥 Loading content for:", topic);

      const response = await mysqlAPI.getContentByTopic(topic);
      console.log("✅ Final content array:", response.data);

      setContent(response.data || []);
    } catch (err) {
      console.error("❌ Failed to load content", err);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NaveBar2  />
      <div className="max-w-5xl mx-auto p-6">
        <Breadcrumb />

        <h1 className="text-2xl font-bold mb-6 capitalize">
          {topic?.replaceAll("-", " ")}
        </h1>

        {loading && <p>Loading content...</p>}

        {!loading && content.length === 0 && (
          <p className="text-gray-500">No content found</p>
        )}

        {!loading && content.length > 0 && (
          <div className="space-y-6">
            {content.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {item.title}
                </h2>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: item.html_content,   // ✅ correct field
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
