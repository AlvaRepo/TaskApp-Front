import { Task } from "../../types/Task.ts"
import { Link } from 'react-router-dom';

const CategoriesTasks = ({ tasks }: { tasks: Task[] }) => {
    function limpiarCadena(cadena: string): string {
     
        cadena = cadena
        .replace(/\s/g, '') // Elimina todos los espacios en blanco
        .replace(/[áéíóúÁÉÍÓÚ]/g, letra =>
            'aeiouAEIOU'.includes(letra) ? 'aeiouAEIOU'['áéíóúÁÉÍÓÚ'.indexOf(letra)] : letra
        )
        .toUpperCase(); // Convierte a mayúsculas
        return cadena
            
            
    }
    const categories = ['PORHACER', 'ENPRODUCCION', 'PORTESTEAR', 'COMPLETADA'];
    return (
        <section className="container-fluid mt-5" id="categorias">
            {categories.map((category, index) => (
                <section className="text-center mb-5" key={index}>
                    <h3 className="display-6">{category}</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center g-4">
                        {tasks
                            .filter(task => limpiarCadena(task.state) === limpiarCadena(category)) // Filtra las tareas por categoría
                            .map(task => (
                                
                                <div className="col" key={task.id}>
                                    <div className="card h-100">
                                        <img
                                            className="card-img-top h-auto"
                                            src={task.image}
                                            alt={task.title}

                                            style={{
                                                minHeight: '300px',
                                                maxHeight: '300px',
                                            }}
                                        />
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder">{task.title}</h5>
                                                <span>{`Tiempo: ${task.time}`}</span> <br />
                                                <span>{`Responsable: ${task.responsable}`}</span>
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center d-flex gap-1 align-items-center justify-content-center">
                                                <Link to={`/detalle/${task.id}`} className="btn btn-outline-secondary mt-auto">
                                                    Ver más
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            ))}
        </section>
    );
};

export default CategoriesTasks;
