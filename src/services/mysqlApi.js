const API_BASE_URL = "http://localhost:8000";

export const mysqlAPI = {

  async healthCheck() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (error) {
      console.error("❌ Health check failed:", error);
      return null;
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      return { data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      return { data: [] };
    }
  },

  async getTopicsByCategory(categorySlug) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/topics/${categorySlug}`);
      const data = await res.json();
      return { data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.error("❌ Error fetching topics:", error);
      return { data: [] };
    }
  },

  async getContentByTopic(topicSlug) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/topics/${topicSlug}/content`
      );
      const data = await res.json();
      console.log("📦 Content API raw:", data);
      return { data: Array.isArray(data) ? data : [] };
    } catch (error) {
      console.error("❌ Error fetching content:", error);
      return { data: [] };
    }
  }
};

console.log("🔗 MySQL API connected to:", API_BASE_URL);
