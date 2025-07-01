import { useDraggable } from "@dnd-kit/core";
import { ImKey } from "react-icons/im";

const AnswerSelection = ({ item, mode }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: JSON.stringify({
        name: item[mode],
        soundPath: item[`${mode}Sound`],
      }),
    });

  const style = {
    ...(transform
      ? {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
      : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-stretch rounded-md bg-white shadow-md z-50
        ${item.isCorrect ? "pointer-events-none opacity-0" : ""}
        ${isDragging ? "scale-[1.02] bg-orange-50 shadow-lg" : ""} 
        transition-shadow duration-200 cursor-move select-none touch-none will-change-transform hover:bg-orange-50 hover:scale-[1.02] hover:shadow-lg`}
    >
      {/* Icon with full height */}
      <div className="flex items-center justify-center bg-orange-600 px-1 text-gray-100 md:px-2">
        <ImKey className="text-base md:text-xl" />
      </div>

      {/* Text section */}
      <div className="flex items-center px-2 py-1">
        <span className="text-sm font-semibold capitalize text-orange-600 md:text-lg">
          {item[mode]}
        </span>
      </div>
    </div>
  );
};

export default AnswerSelection;
