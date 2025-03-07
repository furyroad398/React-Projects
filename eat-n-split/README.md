🧑‍🤝‍🧑 Eat-n-Split- A React Bill Splitting App
Eat-n-Split is a simple and intuitive React application that helps you manage your friends and split bills with them. Whether you owe money or are owed, this app makes it easy to keep track of balances and settle up.

🚀 Features
Add Friends: Add new friends with their name and profile picture.

Track Balances: See at a glance who owes whom and by how much.

Split Bills: Easily split bills with selected friends and update balances.

User-Friendly Interface: Clean and intuitive design for seamless navigation.

🛠️ Technologies Used
React: A JavaScript library for building user interfaces.

JavaScript (ES6+): Modern JavaScript syntax for clean and efficient code.

HTML/CSS: For structuring and styling the application.

State Management: React's useState hook for managing application state.

🎯 How to Use
Add a Friend:

Click the "Add Friend" button.

Enter the friend's name and image URL.

Click "Add Friend" to save.

Select a Friend:

Click the "Select" button next to a friend's name.

The friend will be highlighted, and the bill-splitting form will appear.

Split a Bill:

Enter the total bill amount and your share.

Choose who is paying the bill (you or your friend).

Click "Split Bill" to update the balance.

View Balances:

The app displays balances next to each friend's name.

A negative balance means you owe the friend.

A positive balance means the friend owes you.

A zero balance means you're even.

📂 Project Structure
Copy
friend-split/
├── src/
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point for the app
│   ├── components/          # Reusable components
│   │   ├── Button.js        # Button component
│   │   ├── Friend.js        # Friend component
│   │   ├── FriendsList.js   # Friends list component
│   │   ├── FormAddFriend.js # Form to add a friend
│   │   └── FormSplitBill.js # Form to split a bill
│   └── styles/              # CSS styles (if any)
├── public/                  # Static assets
└── README.md                # Project documentation


🤝 Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙏 Acknowledgments
Inspired by Jonas Schmedtmann's React course.

Avatars provided by pravatar.cc.

