import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, hideToast } from "../actions/cartActions";
// import { addItemToShop } from "../store/slice/sliceProduct";
import { addItemToShop } from "../store/slice/sliceOrder";

const AddToCartBtn = ({ disabled, id, addToCartHandler }) => {
  const dispatch = useDispatch();

  return (
    <Button
      className="btn-block btn-brand"
      type="button"
      disabled={disabled}
      onClick={() => {
        addToCartHandler(id);
      }}
    >
      Añadir a la cesta
    </Button>
  );
};

AddToCartBtn.defaultProps = {
  qty: 1,
};

AddToCartBtn.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string,
};

export default AddToCartBtn;
