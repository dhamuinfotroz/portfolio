import { useParams } from "react-router-dom";

const TopicDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">
        Topic Detail
      </h2>
      <p className="text-gray-600">
        Topic ID: {id}
      </p>
    </div>
  );
};

export default TopicDetail;
