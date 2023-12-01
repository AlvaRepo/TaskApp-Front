import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../../types/Task';
import { TaskService } from '../../services/TaskService';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';

const TaskDetail = () => {
  const { taskId } = useParams<{ taskId?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [state, setState] = useState<string>('');
  const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {

    // obtiene tarea
    const fetchTask = async () => {
      try {
        if (taskId && !isNaN(parseInt(taskId, 10))) {
          const taskData = await TaskService.getOneTask(parseInt(taskId, 10));
          setTask(taskData);
          const tasksInCategory = await TaskService.getTasksInCategory(taskData.state);


          setRelatedTasks(tasksInCategory);
        }
        else {
          console.error('Identificador de tarea no válido');

        }
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleUpdateState = async () => {
    if (state !== '') {
      try {
        const updatedTask = await TaskService.updateStateTask(parseInt(taskId!, 10), state);
        console.log('Updated Task:', updatedTask);
        setTask((prevTask: Task | null) => ({
          ...(prevTask as Task),
          state: updatedTask.state,
        }));

        toast.success('Estado de la tarea actualizado correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        toast.error('Error al actualizar el estado de la tarea', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    } else {
      toast.error('Selecciona un estado válido', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Selecciona un estado válido');
    }
  };

  const handleDeleteTask = async () => {
    try {
      if (taskId) {
        await TaskService.deleteTask(parseInt(taskId, 10));
        toast.success('Tarea eliminada correctamente', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.log('Tarea eliminada con éxxito')
        navigate('/');
      }
    } catch (error) {
      toast.error('Eror al eliminar la tarea', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className='container mt-5'>
      {task && (
        <div className="card mb-3 d-flex">
          <img src={task.image} className="img-fluid align-self-center" alt="Task" />
          <div className="p-3 card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title p-3">Detalles de la tarea con ID: {task.id}</h5>
              <p className="card-text p-3 ">Detalles de la tarea: {task.description}</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Time: {task.time} hours</li>
                <li className="list-group-item">Responsable: {task.responsable}</li>
                <li className="list-group-item">State: {task.state}</li>
              </ul>
            </div>
            <div className="d-flex justify-content-between">
              <select title="Selecciona el estado de la tarea" className='form-select m-3' onChange={(e) => setState(e.target.value)} value={state}>
                <option value="">Seleccionar estado</option>
                <option value="TODO"> Por hacer</option>
                <option value="PRODUCTION"> En producción</option>
                <option value="TOBETESTED"> Para testear</option>
                <option value="COMPLETED"> Completada</option>
              </select>
              <button className='p-1 btn btn-danger' onClick={handleDeleteTask}> Eliminar tarea </button>
              <button className='p-1 btn btn-primary ms-2' onClick={handleUpdateState}> Actualizar Estado </button>
            </div>
          </div>
        </div>

      )}
      <div className='row mt-5'>
        {relatedTasks?.map((relatedTask) => (
          <Card key={relatedTask.id} className="mb-3 w-25">
            <Card.Img variant="top" src={relatedTask.image} className="card-img-top p-3" />
            <Card.Body>
              <Card.Title className="card-title">{relatedTask.title}</Card.Title>
              <Card.Text>
                <strong>Time:</strong> {relatedTask.time} hours<br />
                <strong>Responsable:</strong> {relatedTask.responsable}
              </Card.Text>
              <Button variant='primary' onClick={() => navigate(`/detalle/${relatedTask.id}`)}>Ver más</Button>
            </Card.Body>
          </Card>
        ))}
      </div>


    </div>
  )
}

export default TaskDetail