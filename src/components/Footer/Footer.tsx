import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-light">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <span> ALVAcO</span>
                        </div>
                    </Col>
                    <Col>
                        <ul className="list-unstyled d-flex justify-content-end">
                            <li className="mx-2">
                                <Link to="https://www.facebook.com/morox.alvarox/" target="_blank" rel="noopener noreferrer">
                                    <Facebook />
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="https://www.instagram.com/alvaam/" target="_blank" rel="noopener noreferrer">
                                    <Instagram />
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link to="https://twitter.com/FtwAlva" target="_blank" rel="noopener noreferrer">
                                    <Twitter />
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
