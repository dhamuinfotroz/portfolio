import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mysqlAPI } from "../services/mysqlApi";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';

export default function LessonPage() {
  const { exam, course, topic, lesson } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [topicTitle, setTopicTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [lesson]);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      if (location.state?.topicSlug) {
        // Load content from MySQL using topic slug
        const response = await mysqlAPI.getContentByTopic(location.state.topicSlug);
        
        if (response?.data && Array.isArray(response.data)) {
          setContent(response.data);
        }
        setTopicTitle(location.state.topicTitle || lesson);
      } else {
        setContent([]);
        setTopicTitle(lesson);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setContent([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <NaveBar2  />
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center min h [400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NaveBar2  />
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <span 
            onClick={() => navigate(`/explore/${exam}`)}
            className="hover:text-orange-600 cursor-pointer"
          >
            {exam.toUpperCase()}
          </span>
          <span className="mx-2">›</span>
          <span 
            onClick={() => navigate(`/explore/${exam}/${course}`)}
            className="hover:text-orange-600 cursor-pointer"
          >
            {course}
          </span>
          <span className="mx-2">›</span>
          <span 
            onClick={() => navigate(-1)}
            className="hover:text-orange-600 cursor-pointer"
          >
            {topic}
          </span>
          <span className="mx-2">›</span>
          <span>{topicTitle}</span>
        </div>

        {/* Content Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {topicTitle}
          </h1>
        </div>
        
        {/* Content Body */}
        {content.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {content.map((item, index) => (
              <div key={item.id} className="mb-8 last:mb-0">
                {index > 0 && <hr className="my-8 border-gray-200" />}
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html:  item.content_body  || ""
                  }}
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
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No content available for this topic yet</p>
            <p className="text-gray-400 text-sm mt-2">Content will be added soon</p>
          </div>
        )}
      </div>
    </div>
  );
}