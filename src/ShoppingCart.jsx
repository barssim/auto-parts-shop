import React, { useState } from "react";

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]); // Produkt zum Warenkorb hinzufügen
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId)); // Produkt entfernen
  };

  return (
    <div>
      <h1>Warenkorb</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} €
            <button onClick={() => removeFromCart(item.id)}>Entfernen</button>
          </li>
        ))}
      </ul>
      <button onClick={() => console.log("Bestellung abschicken", cart)}>Kaufen</button>
    </div>
  );
}

export default ShoppingCart;
