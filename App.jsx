import { useState } from "react";
import "./App.css";
import shoes from "./data";

function App() { const [cart, setCart] = useState([]);
  function addToCart(shoe) {

    const item = cart.find((p) => p.id === shoe.id);

    if (item) {

        const updatedCart = cart.map((p) =>

            p.id === shoe.id
                ? { ...p, quantity: p.quantity + 1 }
                : p
        );

        setCart(updatedCart);

    } else {

        setCart([...cart, { ...shoe, quantity: 1 }]);

    }

}
function increaseQuantity(id) {

    const updatedCart = cart.map((item) =>
        item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );

    setCart(updatedCart);

}

function decreaseQuantity(id) {

    const item = cart.find((p) => p.id === id);

    if (item.quantity === 1) {

        const updatedCart = cart.filter((p) => p.id !== id);

        setCart(updatedCart);

    } else {

        const updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );

        setCart(updatedCart);

    }

}
const total = cart.reduce((sum, item) => {

    return sum + item.price * item.quantity;

}, 0);
<header className="header">
    <h1>👟 Online Shoe Store</h1>
</header>
  return (
    
    <div className="container">

      <div className="left">

        <h1>Online Shoe Store</h1>

        <div className="shoe-list">

          {shoes.map((shoe) => (
            <div className="card" key={shoe.id}>

              <img src={shoe.image} alt={shoe.name} />

              <h3>{shoe.name}</h3>

              <p>₹ {shoe.price}</p>

            <button onClick={() => addToCart(shoe)}>
            Add to Cart
            </button>

            </div>
          ))}

        </div>

      </div>
      <div className="right">

    <h2>Shopping Cart</h2>

    {
        cart.length === 0 ? (

            <p>No items added.</p>

        ) : (

            <>
                {
                    cart.map((item) => (

                       <div className="cart-item" key={item.id}>

    <h4>{item.name}</h4>

    <p>₹ {item.price}</p>

    <div className="qty-box">

        <button
            className="qty-btn"
            onClick={() => decreaseQuantity(item.id)}
        >
            -
        </button>

        <span>{item.quantity}</span>

        <button
            className="qty-btn"
            onClick={() => increaseQuantity(item.id)}
        >
            +
        </button>

    </div>

    <p className="subtotal">
        Subtotal : ₹ {item.price * item.quantity}
    </p>

</div>

                    ))
                }

                <hr />

                <h3>Total : ₹ {total}</h3>

            </>

        )
    }

</div>
     

    </div>
  );
}

export default App;