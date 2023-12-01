
import CategoriesSelector from "../components/CategoriesSelector/CategoriesSelector";
import CategoriesTasks from "../components/CategoriesTasks/CategoriesTasks";
import CarouselHome from "../components/CarouselHome/CarouselHome";
import { useState, useEffect } from "react";
import { Task } from "../types/Task";
import { TaskService } from "../services/TaskService";

export default function LandingPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredtasks] = useState<Task[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await TaskService.getAllTasks();
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);
    useEffect(() => {
        if (selectedCategory) {
            const filtered = tasks.filter(task => task && task.state && task.state.toUpperCase() === selectedCategory.toUpperCase());
            setFilteredtasks(filtered);
        } else {
            setFilteredtasks(tasks);
        }
    }, [selectedCategory, tasks]);

    
    
    return (
        <>
            <CarouselHome />
            <CategoriesSelector onSelectedCategory={setSelectedCategory} />
            <CategoriesTasks tasks={filteredTasks.length > 0 ? filteredTasks : tasks} />
        </>
    )
}
