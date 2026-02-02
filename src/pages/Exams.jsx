import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exams</h2>

      <div onClick={() => navigate("/syllabus")} style={card}>
        UPSC
      </div>
      <div onClick={() => navigate("/syllabus")} style={card}>
        SSC
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

export default Exams;
