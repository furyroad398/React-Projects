import React from 'react';

const GroceryStore = () => {
  const handleAddToCart = (item) => {
    alert(`Added ${item} to the cart!`);
  };

  return (
    <div>
      <GroceryItem item="Apples" onAddToCart={handleAddToCart} />
      <GroceryItem item="Bananas" onAddToCart={handleAddToCart} />
      <GroceryItem item="Oranges" onAddToCart={handleAddToCart} />
      <GroceryItem item="Milk" onAddToCart={handleAddToCart} />
    </div>
  );
};

const GroceryItem = ({ item, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(item);
  };

  return (
    <button onClick={handleClick}>{item}</button>
  );
};

export default GroceryStore;
