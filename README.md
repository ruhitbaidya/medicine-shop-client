# Medicine E-Commerce Shop

![Medicine E-Commerce Shop Logo](https://via.placeholder.com/150x50?text=Medicine+Shop+Logo)  
The **Medicine E-Commerce Shop** is an online platform where users can browse, search, and purchase medicines. It provides a seamless shopping experience for customers and a robust management system for admins. Built with **Next.js**, **Node.js**, **Express**, and **MongoDB**, this project ensures a modern, responsive, and secure user interface.

---

## 🚀 Live Deployment

- **Frontend**: [https://medicine-shop.vercel.app](https://medicine-shop.vercel.app)
- **Backend API**: [https://medicine-shop-api.vercel.app](https://medicine-shop-api.vercel.app)

---

## 🔑 Admin Credentials

For testing purposes, use the following admin credentials:

- **Email**: `ruhitbaidya01@gmail.com`
- **Password**: `123456`

---

## ✨ Key Features

### For Customers:

- **User Authentication**: Secure login and registration using JWT.
- **Medicine Search**: Search medicines by name, category, or symptoms.
- **Shopping Cart**: Add, edit, and remove items from the cart.
- **Checkout**: Secure payment integration with prescription upload (if required).
- **Order Tracking**: Track orders with real-time status updates.
- **Profile Management**: Update personal details and view order history.

### For Admins:

- **Admin Dashboard**: Manage medicines, orders, and users.
- **Medicine Management**: Add, update, or remove medicines.
- **Order Management**: Approve/reject prescription-based orders and update order statuses.
- **User Management**: View customer details and order history.
- **Stock Alerts**: Notifications for low stock levels.

---

## 🛠️ Tech Stack

### Frontend:

- **Next.js**: For server-side rendering and routing.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For responsive and modern UI design.
- **React**: For building interactive user interfaces.
- **Axios**: For API requests.

### Backend:

- **Node.js**: For building the REST API.
- **Express**: For handling HTTP requests.
- **MongoDB**: For database management.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.

---

## 🖥️ Frontend Routes

### Customer Routes:

- **Home Page** (`/`): Overview of the shop with featured medicines and search functionality.
- **Register Page** (`/register`): Customer registration.
- **Login Page** (`/login`): Customer login.
- **Shop Page** (`/shop`): Browse all medicines with filtering and sorting options.
- **Medicine Details** (`/medicine/:id`): Detailed information about a specific medicine.
- **Cart Page** (`/cart`): View and edit the shopping cart.
- **Checkout Page** (`/checkout`): Enter shipping details, upload prescriptions, and confirm orders.
- **Order History** (`/orders`): View past and current orders.
- **Profile Page** (`/profile`): Update personal details.

### Admin Routes:

- **Admin Dashboard** (`/admin`): Overview of total orders, stock levels, and pending prescriptions.
- **Manage Medicines** (`/admin/medicines`): Add, update, or remove medicines.
- **Manage Orders** (`/admin/orders`): Approve/reject orders and update order statuses.
- **Manage Users** (`/admin/users`): View customer details and order history.

---

## 🛠️ Setup Instructions

### Prerequisites:

- Node.js (v16 or higher)
- MongoDB Atlas or local MongoDB instance
- npm or yarn

### Steps:

1. **Clone the Repository**:
   ```bash
   frontend git clone https://github.com/ruhitbaidya/medicine-shop-client.git
   backend git clone https://github.com/ruhitbaidya/medicine-shop-server.git
   ```
