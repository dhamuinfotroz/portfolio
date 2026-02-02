import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mysqlAPI } from "../services/mysqlApi";
import NaveBar2 from "@/components/naveBarDemo/NaveBar2";


export default function CoursePage() {
  const { exam, course } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, [course]);

  const loadTopics = async () => {
    try {
      setLoading(true);
      console.log("📘 Loading topics for course:", course);

      const response = await mysqlAPI.getTopicsByCategory(course);

      if (Array.isArray(response?.data)) {
        setTopics(response.data);
        console.log("✅ UI received topics:", response.data);
      } else {
        setTopics([]);
      }
    } catch (err) {
      console.error("❌ Failed to load topics:", err);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const openTopic = (topic) => {
    console.log("👉 Opening topic:", topic);

    navigate(
      `/explore/${exam}/${course}/${topic.slug}`
    );
  };

  if (loading) {
    return (
      <>
        <NaveBar2/>  
        <div className="p-10 text-center">Loading topics...</div>
      </>
    );
  }

  return (
    <>
      <NaveBar2/> 
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {course.replace("-", " ")} Topics
        </h1>

        {topics.length === 0 ? (
          <p className="text-gray-500">No topics found</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => openTopic(topic)}
                className="cursor-pointer border rounded-lg p-5 bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Click to open lesson →
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
