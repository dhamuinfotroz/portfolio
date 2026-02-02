import { useState } from "react";

const TopicCard = ({ index, topic, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center
                   px-6 py-5 cursor-pointer
                   hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-6">
          <span className="text-gray-500 font-semibold w-8">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <h3 className="font-medium">{topic.title}</h3>
            <p className="text-sm text-gray-500">
              {topic.subtopics} subtopics
            </p>
          </div>
        </div>

        <span className="text-gray-400 text-xl">
          {open ? "▲" : "▼"}
        </span>
      </div>

      {/* Expanded content */}
      {open && content && (
        <div className="border-t px-10 py-4 space-y-3">
          {content.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center
                         py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-6">
                <span className="text-gray-400 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
              </div>

              <span className="text-sm text-gray-500">
                {item.videos && `${item.videos} videos`}
                {item.videos && item.docs && " | "}
                {item.docs && `${item.docs} docs`}
                {item.tests && ` | ${item.tests} tests`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicCard;
