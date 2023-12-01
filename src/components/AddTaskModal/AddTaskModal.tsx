
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Task } from '../../types/Task';
import { toast } from 'react-toastify';


type ModalAgregarTareaProps = {
    showModal: boolean;
    handleClose: () => void;
    createTask: (newTask: Task) => void;
};

const AddtaskModal: React.FC<ModalAgregarTareaProps> = ({ showModal, handleClose, createTask }) => {

    const validationSchema = Yup.object({
        title: Yup.string().required('Este campo es obligatorio'),
        description: Yup.string().required('Este campo es obligatorio'),
        time: Yup.number().required('Este campo es obligatorio').integer('El time debe ser en números').positive('El time debe ser mayor a 0'),
        image: Yup.string().required('Este campo es obligatorio'),
        responsable: Yup.string().required('Este campo es obligatorio'),
        state: Yup.string().required('Este campo es obligatorio'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            time: 0,
            image: '',
            responsable: '',
            state: '',
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            values.state = values.state.toUpperCase(); 
            console.log('Datos del formulario:', JSON.stringify(values));
            values.state = values.state.toUpperCase();
            await createTask(values);
            handleClose(); 
            toast.success('Tarea agregada correctamente', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        },
    });

    return (

        <Modal show={showModal} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Agregue una tarea</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form onSubmit={formik.handleSubmit}>

                    {/* ----- title ----- */}
                    <div className="mb-3 mt-1">
                        <label htmlFor="title" className="form-label"> Título </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />

                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-danger"> {formik.errors.title} </div>
                        ) : null}

                    </div>

                    {/* ----- Descripción ----- */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="description" className="form-label"> Descripción </label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            rows={3} // Número de filas
                            cols={50} // Número de columnas
                        />

                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-danger"> {formik.errors.description} </div>
                        ) : null}
                    </div>


                    {/* ----- time ----- */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="time" className="form-label"> time </label>
                        <input
                            placeholder='Ej: 30 días'
                            type="number"
                            className="form-control"
                            id="time"
                            name="time"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.time}
                        />

                        {formik.touched.time && formik.errors.time ? (
                            <div className="text-danger"> {formik.errors.time} </div>
                        ) : null}

                    </div>

                    {/* ----- image ----- */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="image" className="form-label"> image </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.image}
                        />

                        {formik.touched.image && formik.errors.image ? (
                            <div className="text-danger"> {formik.errors.image} </div>
                        ) : null}

                    </div>

                    {/* ----- Responsable ----- */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="responsable" className="form-label"> Responsable </label>
                        <input
                            type="text"
                            className="form-control"
                            id="responsable"
                            name="responsable"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.responsable}
                        />

                        {formik.touched.responsable && formik.errors.responsable ? (
                            <div className="text-danger"> {formik.errors.responsable} </div>
                        ) : null}

                    </div>

                    {/* ----- state ----- */}
                    <div className="mb-3 mt-3">
                        <label htmlFor="state" className="form-label"> state </label>

                        <Form.Select
                            id="state"
                            name="state"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.state}
                        >
                            <option value="">Selecciona un state</option>
                            <option value="PORHACER">Por hacer</option>
                            <option value="ENPRODUCCION">En producción</option>
                            <option value="PORTESTEAR">Por testear</option>
                            <option value="COMPLETADA">Completada</option>
                        </Form.Select>

                        {formik.touched.state && formik.errors.state ? (
                            <div className="text-danger"> {formik.errors.state} </div>
                        ) : null}

                    </div>

                    <div className='text-end'>
                        <Button className='px-5' variant="primary" type="submit" >
                            Enviar
                        </Button>
                    </div>


                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddtaskModal;