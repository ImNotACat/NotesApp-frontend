import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Project ID: {id}</h1>
      {/* You can load project-specific notes here later */}
    </div>
  );
}
