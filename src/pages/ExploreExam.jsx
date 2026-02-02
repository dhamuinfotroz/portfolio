import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mysqlAPI } from "../services/mysqlApi";
import NaveBar2 from '@/components/naveBarDemo/NaveBar2';
import Breadcrumb from "../components/Breadcrumb";

export default function ExploreExam() {
  const { exam } = useParams();
  const navigate = useNavigate();

  const [mainCategories, setMainCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [exam]);

  /* ---------------- LOAD DATA ---------------- */
  const loadCategories = async () => {
    try {
      setLoading(true);

      if (exam === "upsc") {
        const response = await mysqlAPI.getCategories();

        // ✅ FIX: API returns array directly
        const categories = Array.isArray(response)
          ? response
          : response?.data || [];

        if (categories.length > 0) {
          const grouped = groupCategoriesBySubject(categories);
          setMainCategories(grouped);
        } else {
          setMainCategories([]);
        }
      }
    } catch (err) {
      console.error("Category load failed", err);
      setMainCategories([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GROUP LOGIC ---------------- */
  const groupCategoriesBySubject = (categories) => {
    const subjects = {};

    categories.forEach((cat) => {
      const subject = cat.title.toUpperCase();

      if (!subjects[subject]) {
        subjects[subject] = {
          id: subject.toLowerCase(),
          title: subject,
          slug: subject.toLowerCase(),
          count: 0,
          subCategories: [],
        };
      }

      subjects[subject].subCategories.push(cat);
      subjects[subject].count += 1;
    });

    return Object.values(subjects);
  };

  /* ---------------- CLICK ---------------- */
  const openCategory = (cat) => {
    navigate(`/explore/${exam}/${cat.slug}`, {
      state: { subCategories: cat.subCategories },
    });
  };

  if (loading) {
    return (
      <>
        <NaveBar2  />
        <div className="p-10 text-center">Loading subjects...</div>
      </>
    );
  }

  return (
    <>
      <NaveBar2  />
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-6">
          All {exam.toUpperCase()} Subjects
        </h1>

        {mainCategories.length === 0 ? (
          <p className="text-gray-500">No subjects found</p>
        ) : (
          <div className="space-y-4">
            {mainCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => openCategory(cat)}
                className="p-6 border rounded-lg cursor-pointer hover:shadow hover:border-orange-500 flex justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">{cat.title}</h2>
                  <p className="text-gray-600">{cat.count} chapters</p>
                </div>
                <span className="text-xl">➜</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
