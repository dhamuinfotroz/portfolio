import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categories</h2>

      <div onClick={() => navigate("/exams")} style={card}>
        Government Exams
      </div>
      <div onClick={() => navigate("/exams")} style={card}>
        Engineering Exams
      </div>
    </div>
  );
};

const card = {
  padding: "20px",
  background: "#e5e7eb",
  marginTop: "15px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Categories;
