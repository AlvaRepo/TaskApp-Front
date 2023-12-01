import { useEffect, useState } from "react"
import { Task } from "../../types/Task";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import CategoriesTasks from "../CategoriesTasks/CategoriesTasks";
import { TaskService } from "../../services/TaskService";
const Category = () => {
  const [tasks, setTasks] = useState<Task[]> ([]);
  const [selectedCategory, setSelectedCategory]= useState<string>('');
  useEffect(() =>{
    const fetchTasks = async () => {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    };
    fetchTasks();
  }, []);

  const filteredTasks = selectedCategory
  ? tasks.filter(task => task.state.toUpperCase() === selectedCategory.toUpperCase())
  : tasks;
  
  
  return (
    <div className="container mt-5">
      <CategoriesSelector onSelectedCategory={setSelectedCategory}/>
      <CategoriesTasks tasks = {filteredTasks} />
    </div>
  )
}

export default Category