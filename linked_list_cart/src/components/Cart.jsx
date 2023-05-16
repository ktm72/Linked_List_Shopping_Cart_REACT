import { useState } from "react";
// import the shopping cart implementation
import CreateShoppingCart from "../utils/ShoppingCart";
function Cart() {
  const [cart, setCart] = useState(CreateShoppingCart()); // create a new shopping cart instance and initialize the state
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  function handleAddItem() {
    const { name, price, quantity } = product;
    cart.addItem(name, price, quantity); // add the item to the cart
    setCart({ ...cart }); // update the state to trigger a re-render
  }

  function handleRemoveItem(name) {
    cart.removeItem(name); // remove the item from the cart
    setCart({ ...cart }); // update the state to trigger a re-render
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = parseFloat(form.price.value);
    const qtn = parseInt(form.qtn.value);
    setProduct({ name: name, price: price, quantity: qtn });
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <input type="text" name="name" placeholder="Product Name" />
        <input type="text" name="price" placeholder="Price" />
        <input type="text" name="qtn" placeholder="Quantity" />
        <input type="submit" />
      </form>
      <button onClick={handleAddItem}>Add Item</button>
      <p>Cart Size: {cart.getSize()}</p>
      <p>Total Price: ${cart.getTotalPrice().toFixed(2)}</p>
      <ul>
        {cart.getAllItems().map((item) => (
          <li key={item.name}>
            {item.name} - {item.quantity} x ${item.price}
            <button onClick={() => handleRemoveItem(item.name)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Cart;
