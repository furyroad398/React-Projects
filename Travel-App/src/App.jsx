import { useState } from "react";


export default function App() {

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }


  function handleDeleteItem(id) {
    setItems((item) => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id  ? {...item, packed: !item.packed }
        : item
      )
    )
  }

  function handleClearList() {
    const confirm = window.confirm("Are you sure you want to clear all items?");
    if(confirm) setItems([]);
  }

  return(
    <div className="app">
    <Logo />
    <Form onAddItems = {handleAddItems}/>
    <PackingList items = {items} 
      onDeleteItem = {handleDeleteItem} 
      onToggleItem = {handleToggleItem}
      onClearList = {handleClearList}/>
    <Stats items = {items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴🌴 Far Away 💼💼</h1>
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
    
  function handleSubmit(e) {
      e.preventDefault();
      
      if (!description) return;

      const newItem = {description, quantity, package: false, id: Date.now()}
      console.log(newItem)

    onAddItems(newItem);

      setDescription("")
      setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form">
        <h3>What do you need for your 😍 trip??</h3>

        <select value ={quantity} onChange={(e) => setQuantity(Number(e.target.value))}> {Array.from({length: 20}, (_, i) => i + 1).map
        ((num) => (
          <option value ={num} key={num} >
            {num}
          </option>
        ))}</select>

        <input type="test" placeholder="item.." value={description} onChange={(e)=> setDescription(e.target.value)}></input>
        <button>Add</button>
      </div>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
    <ul>
        {sortedItems.map((item) =>(<Item item={item} 
          onDeleteItem = {onDeleteItem} 
          onToggleItem = {onToggleItem}
          onClearList = {onClearList}
          key={item.id}/>
      ))}
  </ul>

  <div className="actions">
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value='input'>Sort by input orders</option>
      <option value='descrption'>Sort by description</option>
      <option value='packed'>Sort by packed status</option>
    </select>
    <button onClick={onClearList}>Clear List</button>
  </div>
    </div>
      
  ); 
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
  <li>
    <input type="checkbox" 
      value = {item.packed} 
      onChange = {() => onToggleItem(item.id)} 
    />
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>
      {item.description} {item.quantity} 
    </span>
  <button type="button" onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
  );
}

function Stats({items} ) {

  if (!items.length)
    return (
      <p className="stats">
        <em>Run and start packing 🏃‍♂️💨🏃‍♀️💨</em>
      </p>
      )
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100)
  return(
    <footer className="stats">
    {percentage === 100 ? <em>You have got everything! Ready to go ✈️✈️</em> :
    <em>You have {numItems} items in your list, and you already packed {numPacked} ({percentage} %)</em>
  } 
      
    </footer>
  );
}