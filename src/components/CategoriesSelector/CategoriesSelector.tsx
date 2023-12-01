import { BsBookmarkCheck, BsCheck, BsGear, BsPencilSquare } from 'react-icons/bs'
interface CategoriesSelectorProps {
    onSelectedCategory: (category: string) => void;
}
const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({ onSelectedCategory }) => {
    const categories = [
        { name: 'PORHACER', icon: <BsCheck /> },
        { name: 'ENPRODUCCION', icon: <BsGear /> },
        { name: 'PORTESTEAR', icon: <BsPencilSquare /> },
        { name: 'COMPLETADA', icon: <BsBookmarkCheck /> }
    ]
    return (
        <>
            <section className="container mt-3" id="selector-categorias">
                <p className="fs-3">Seleccione una categoría</p>
                <div className="row gap-4">
                    {categories.map((category, index) => (
                        <div className="col d-flex justify-content-center p-0" key={index}>
                            <button
                                onClick={() => onSelectedCategory(category.name)}
                                className="border border-1 border-black d-flex gap-1 align-items-center rounded p-1 text-decoration-none"
                            >
                                {category.icon} {category.name}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default CategoriesSelector