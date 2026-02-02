import { useNavigate } from "react-router-dom";
import "./ExamGrid.css";

const ExamGrid = () => {
  const navigate = useNavigate();

  const exams = [
    "UPSC",
    "NEET",
    "JEE",
    "SSC",
    "GATE",
    "Banking",
    "CAT",
    "Defence",
    "Railways",
  ];

  return (
    <div className="flex justify-center mt-10 mb-10 gap-10 flex-wrap">
      {exams.map((exam) => (
        <div
          key={exam}
          className="card"
          onClick={() => navigate(`/explore/${exam.toLowerCase()}`)}
        >
          <p className="heading">Edu INFOTROZ</p>
          <p>Powered by InfoCloud</p>
          <p>{exam}</p>
        </div>
      ))}
    </div>
  );
};

export default ExamGrid;
