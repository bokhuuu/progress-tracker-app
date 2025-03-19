import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTaskById } from "../services/api";

const TaskShowPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    fetchTaskById(token, id)
      .then((data) => setTask(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!task)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>{task ? <p>{task.description}</p> : <p>Loading...</p>}</Layout>
  );
};
export default TaskShowPage;
