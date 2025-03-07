import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [isVisisble, setIsVisible] = useState(false);
  const [friends, setFriends] = useState(initialFriends)
  const [selectFriend, setSelectFriend] = useState(null)

  function toggleVisible(){
    setIsVisible((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setIsVisible(false);
  }

  function handleSelection(friend) {
    //setSelectFriend(friend)
    setSelectFriend((selected) => selected?.id === friend.id ? null : friend);
    setIsVisible(false)
  }

  function handleSplitBill(value) {
    setFriends(friends => friends.map((friend) => 
      friend.id === selectFriend.id ? 
        {...friend, balance: friend.balance + value} : friend))

    setSelectFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList 
        friends={friends} 
        selectFriend = {selectFriend}
        onSelection = {handleSelection}
        />

        {isVisisble && <FormAddFriend onAddFriend={handleAddFriend}/>}

        <Button onClick={toggleVisible}>{isVisisble ? 'Close' : 'Add Friend'}</Button>
      </div>

      {selectFriend && 
      <FormSplitBill 
        selectFriend = {selectFriend}
        onSplitBill = {handleSplitBill}
        />}
    </div>
  )
}

function FriendsList ({friends, onSelection, selectFriend}) {

  return(
    <ul>
      {friends.map((friend) =>(
       <Friend 
       friend={friend} 
       selectFriend = {selectFriend} 
       key={friend.id} 
       onSelection = {onSelection}/>
      ))}
    </ul>
  )
}

function Friend({friend, onSelection, selectFriend}) {
  const isSelected = selectFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} Euros
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you {Math.abs(friend.balance)} Euros
        </p>
      )}

      {friend.balance === 0 && (
        <p className="">
          You and {friend.name} are even
        </p>
      )}

      <Button onClick={() => onSelection(friend)}>
      {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
}


function FormAddFriend({onAddFriend}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  function handleSubmit(e) {
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0, 
    }
    console.log(newFriend);
    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  }
  

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input 
      type='text'
      value = {name}
      onChange={(event) => setName(event.target.value)}
      />

      <label>🌅Image url</label>
      <input 
      type="text"
      value = {image}
      onChange={(event) => setImage(event.target.value)}
      />

      <Button>Add Friend</Button>
    </form>
  )
}

function FormSplitBill({selectFriend, onSplitBill}) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  function handleSubmit (e) {
    e.preventDefault();

    if(!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectFriend.name}</h2>

      <label>💰💰Bill Value</label>
      <input type="text"
        value = {bill}
        onChange = {(e) => setBill(Number(e.target.value))}
      />

      <label>Your expenses</label>
      <input type="text"
      value = {paidByUser}
      onChange = {(e) => setPaidByUser(
        Number(e.target.value) > bill ? paidByUser :
        Number(e.target.value))}
      />

      <label>🧑‍🤝‍🧑 {selectFriend.name}'s expenses:</label>
      <input type="text" disabled
        value={paidByFriend}
      />

      <label>Who is paying the bill</label>
      <select
        value = {whoIsPaying}
        onChange = {(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>

      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  )
}