import { Carousel } from "react-bootstrap";

export default function CarouselHome() {
  return (
    <Carousel className="w-60 mx-auto" data-bs-theme="dark">
      <Carousel.Item>
        <img 
          className="d-block mx-auto img-fluid"
          src="https://img.freepik.com/foto-gratis/equipo-jovenes-empresarios-trabajando-juntos-oficina_23-2149206502.jpg" 
          alt="Imagen 1"/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img 
        className="d-block mx-auto img-fluid"
        src="https://img.freepik.com/foto-gratis/companeros-que-trabajan-oficina-ambiente-relajado_329181-11991.jpg" 
        alt="Imagen 1"/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img 
        className="d-block mx-auto img-fluid"
        src="https://img.freepik.com/foto-gratis/mujer-joven-lavado-ventana_231208-11263.jpg" 
        alt="Imagen 1"
        />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
      </Carousel.Item>
    </Carousel>)
}
