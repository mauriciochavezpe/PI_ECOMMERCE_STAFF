import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { changeLoading } from "../store/slice/product";


function TodoModal() {
  const dispatch = useDispatch();

  var {loading, product} = useSelector((state) => state.product);
  const handleClose = () => dispatch(changeLoading(!loading));
  return (
    <Modal show={loading} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Detalle del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <img src={product.image} alt={product.name} />
        <p>Categoría: {product.category}</p>
        <p>Marca: {product.brand}</p>
        <p>Nombre: {product.name}</p>
        {/* Agrega más detalles del producto aquí si es necesario */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
  </Modal>
  );
}

export default TodoModal;