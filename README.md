
# **Zubagram: A social media platform with live messaging 📸🚀**  


---

## 📑 **Table of Contents**  
1. [🔑 Key Features](#-key-features)
3.  [🔗 Links](#-links)  
4. [🖥️ Screenshots](#-screenshots)
5. [💻 Zubagram Backend Routes](#-zubagram-backend-routes)  
6. [🚀 Getting Started](#-getting-started)  
7. [💡 About the Project](#-about-the-project)  
8. [🤝 Contributing](#-contributing)  

---

## 🖥️ **Screenshots**  


### 📱 **Completely Responsive Design**  
![completely responsive](https://github.com/user-attachments/assets/859e0188-65ce-435e-83bb-94b980774b91)  
Zubagram is fully responsive, ensuring a seamless experience across all devices—whether it's a smartphone, tablet, or desktop. The UI adapts dynamically to different screen sizes for an optimal user experience.  

### ❤️ **Live Like & Dislike System**  
![live_like](https://github.com/user-attachments/assets/637155d3-e271-4b3e-aa09-71d889c781b4)  
Instantly like or dislike posts in real time! The UI updates dynamically, and the post owner receives immediate feedback through notifications, creating an interactive and engaging user experience.  

### 💬 **Real-Time Commenting System**  
![realtime comment](https://github.com/user-attachments/assets/89958c0e-3f1e-4ad5-a4fe-c52bb6974130)  
Leave comments on posts and see them appear instantly without refreshing the page. Powered by WebSockets, the real-time commenting feature keeps conversations fluid and engaging.  

### 📩 **Instant Messaging with Real-Time Updates**  
![realtime messaging](https://github.com/user-attachments/assets/a3318dc1-66b6-46a9-bfe3-b0ddb6235885)  
Zubagram features a built-in chat system for real-time messaging between users. The conversation updates live, ensuring fast and smooth communication without delays.  

---


## 🔗 **Links**  

🔴 **Live Demo:** [ZUBAGRAM](zubagram.onrender.com) *(⚠️ Free Render version - may take ~1 min to start if inactive)*  

📂 **GitHub Repository:** [GitHub](https://github.com/yourusername/zubagram)  

📹 **Live Video Demo:** [Demo Video](https://dms.licdn.com/playlist/vid/v2/D4D05AQFA5uvyqTGcbA/feedshare-ambry-analyzed_servable_progressive_video/feedshare-ambry-analyzed_servable_progressive_video/0/1726519303686?e=1743922800&v=beta&t=7p8TQF7iHVAfx4oMge-jpv2dKGEIiTTjN_OVBaclKug)  

💼 **LinkedIn Profile:** [LinkedIn](https://linkedin.com/in/zubair-mallik/)  



---


## 🔑 **Key Features**  


Over the past few weeks, I've been focused on building a **full-stack social media platform** using the **MERN stack (MongoDB, Express.js, React, Node.js)**, integrated with **Cloudinary for media storage** and **Socket.io for real-time messaging**. The project also leverages **Tailwind CSS for a sleek UI** and **Redux Toolkit for efficient state management**. I’m thrilled to share that it's now live and ready for users to **connect, share, and engage!**  

### **🔐 Secure Authentication**  
- Implemented **JWT-based authentication** to ensure **secure login and session management**.  
- **Google OAuth** integration for seamless user authentication (coming soon).  

### **🖥️ User-Friendly Interface**  
- Built with **React.js + Tailwind CSS**, delivering a **smooth, responsive, and intuitive user experience**.  
- **Dark mode & theme customization** for a **personalized experience**.  

### **📱 Fully Responsive Design**  
- Designed with a **mobile-first approach**, ensuring **seamless access on smartphones, tablets, and desktops**.  

### **⚙️ Robust Backend**  
- **Express.js & Node.js** power the backend for **fast, scalable, and efficient API handling**.  
- Secure **JWT authentication** and **Multer for file uploads**.  

### **🖼️ Media Uploads & Storage**  
- Integrated **Cloudinary for image and video uploads**, allowing users to **post high-quality content** without storage issues.  

### **💬 Real-Time Messaging**  
- **Socket.io-powered chat system** for **instant messaging and real-time conversations**.  
- **Notifications for new messages, likes, and comments**.  

### **📊 Scalable Data Management**  
- **MongoDB for flexible and scalable database solutions**, ensuring **efficient management of users, posts, comments, and interactions**.  

### **🔗 Real-Time State Management**  
- Implemented **Redux Toolkit** for **efficient state management and improved performance**.  

### **❤️ Post Interactions & Engagement**  
- **Like, comment, and bookmark posts** for enhanced user engagement.  
- **Follow/unfollow system** to create personalized feeds.  
- **Suggested users feature** to help users discover new connections.  

### **📞 Secure Video & Voice Calls**  
- Implemented **WebRTC-based** **doctor-patient calling feature** for healthcare applications.  

### **🛠️ Admin Panel** (Coming Soon)  
- **Role-based access** for admins to monitor and manage content.  

---

## 💻 **Zubagram Backend Routes**  

### **📝 Post Routes**  
```plaintext
/addpost          - Add a new post  
/all              - Get all posts  
/userpost/all     - Get all posts by a specific user  
/like             - Like a post  
/dislike          - Dislike a post  
/comment          - Add a comment to a post  
/bookmark        - Bookmark or unbookmark a post  
/delete           - Delete a post  
```

### **📩 Messaging Routes**  
```plaintext
/send/:id       - Send a message  
/all/:id        - Get all messages in a conversation  
```

### **👤 User Routes**  
```plaintext
/register           - Register a new user  
/login              - Authenticate and return JWT token  
/logout             - Log out user  
/profile           - Fetch user profile  
/edit              - Edit profile information  
/followorunfollow - Follow or unfollow a user  
/suggested         - Get suggested users  
/search            - Search for users  
/isfollowing       - Check if a user is following another user  
```

---

## 🚀 **Getting Started**  

### **1️⃣ Clone the repository**  
```bash
git clone https://github.com/yourusername/zubagram.git
cd zubagram
```

### **2️⃣ Install dependencies**  
#### **Frontend**  
```bash
cd frontend
npm install
```
#### **Backend**  
```bash
cd ../backend
npm install
```

### **3️⃣ Set up environment variables**  
Create a `.env` file in the root of the backend directory with the following:  
```plaintext
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4️⃣ Run the application**  
#### **Start Backend**  
```bash
cd backend
npm run dev
```

#### **Start Frontend**  
```bash
cd frontend
npm start
```


## 💡 **About the Project**  
This project has been an **amazing learning experience**, allowing me to explore **full-stack development**, **real-time communication**, and **secure authentication systems**. 


---

## 🤝 **Contributing**  
🚀 Want to improve Zubagram? Feel free to **fork the repository**, create a **feature branch**, and submit a **pull request**. Contributions, issues, and feature requests are **always welcome!**  

---

