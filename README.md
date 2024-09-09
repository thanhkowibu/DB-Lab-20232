<div align="center">
<a href="https://github.com/thanhkowibu/DB-Lab-20232">
    <img src="/airbnb-client/public/images/app_icon.png" alt="Logo" width="300">
</a>
</div>

<h1 align="center">Airbnb - Hotel Rental Website</h1>

<p align="center">
    <a href="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots">View Screenshots</a>
    ·
    <a href="https://github.com/thanhkowibu/DB-Lab-20232/issues">Report Bug</a>
    ·
    <a href="https://github.com/thanhkowibu/DB-Lab-20232/issues">Request Feature</a>
</p>

## Overview

This is a fully functional website built with React TypeScript for the frontend and Java Spring for the backend.

This platform allows users to browse, book, and manage hotel reservations around the world, enhancing user experience through efficient property and booking management.

## Team Members

- **Backend developer:** Trần Quang Huy
- **Frontend developer:** Phạm Lê Thành
- **Development time:** March 2024 - June 2024

<p align="right">(<a href="#readme">back to top</a>)</p>

## Installation

### Backend

Follow the instructions [here](https://github.com/thanhkowibu/DB-Lab-20232/tree/main/airbnb-server#getting-started) to set up the backend server.

### Admin Dashboard

For setting up the admin dashboard, please refer to [this guide](https://github.com/thanhkowibu/DB-Lab-20232/tree/main/airbnb-admin#installation).

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/thanhkowibu/DB-Lab-20232
   ```
2. Navigate to the project directory:
   ```bash
   cd airbnb-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the localhost:
   ```bash
   npm run dev
   ```

<p align="right">(<a href="#readme">back to top</a>)</p>

## Features

<!-- ### Watch the demo of the website here:

[![Watch the demo](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE) -->

### User Management

- **Account Creation:** Users can create accounts with a secure transaction procedure and email verification using a token.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/1.Login.jpg?raw=true" alt="Login" width="750"/>
</p>

- **CRUD Operations:** Users can perform basic CRUD operations on their accounts.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/2.UserUpdate.jpg?raw=true" alt="UserUpdate" width="750" />
</p>

- **View other profiles**: Users can browse for other users' profile in the platform
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/3.UserProfile.jpg?raw=true" alt="UserProfile" width="750"/>
</p>

- **User Reporting:** Users can report other users for violations.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/4.UserReport.jpg?raw=true" alt="UserReport" width="750"/>
</p>

- **Host Requests:** Users can request to become a host by submitting a request to the admin.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/5.RequestHost.jpg?raw=true" alt="RequestHost" width="750"/>
</p>

- **Admin Controls:** Admins can ban users, set user permissions, and view growth reports of new users by month/year.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/6.BanUser.jpg?raw=true" alt="BanUser" width="750"/>
</p>

### Property Management

- **Browse Properties:** Users can view a list of properties and see detailed information about each one.
<p align="center">
  <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/7.PropertyList.jpg?raw=true" alt="PropertyList" width="750"/>
</p>
<p align="center">
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/11.PropertyDetail.jpg?raw=true" alt="PropertyDetail" width="750"/> </p>

- **Map View:** Users can view properties on a map for easy location-based searching.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/8.Map.png?raw=true" alt="MapView" width="750"/> </p>

- **Property Filters:** Users can filter properties by different criteria to find exactly what they're looking for.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/10.Filter1.png?raw=true" alt="Filter1" width="750"/> </p> <p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/9.Filter2.jpg?raw=true" alt="Filter2" width="750"/> </p>

- **Favorites:** Users can favorite/unfavorite properties and view their list of favorite properties.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/14.Favourite.jpg?raw=true" alt="Favourite" width="750"/> </p>

- **Property CRUD:** Hosts can create new properties and perform basic CRUD operations on them.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/12.PropertyCreate.jpg?raw=true" alt="PropertyCreate" width="750"/> </p> 
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/13.PropertyUpdate.jpg?raw=true" alt="PropertyUpdate" width="750"/> </p>

### Booking Management

#### User Side

- **Booking:** Users can make reservations for properties.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/15.BookingCreate.jpg?raw=true" alt="BookingCreate" width="750"/> </p>

- **Booking History:** Users can view all their bookings, see detailed statuses, and check logs.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/16.Trip.jpg?raw=true" alt="BookingHistory" width="750"/> </p> 
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/17.BookingDetail.jpg?raw=true" alt="BookingDetail" width="750"/> </p>

- **Cancellation:** Users can cancel bookings.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/18.BookingDelete.jpg?raw=true" alt="BookingDelete" width="750"/> </p>

- **Reviews:** After checking out, users can leave reviews for properties they've stayed in.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/19.ReviewCreate.jpg?raw=true" alt="ReviewCreate" width="750"/> </p>

#### Host Side

- **View Bookings:** Hosts can view all bookings and check logs for their properties.
- **Manage Bookings:** Hosts can confirm or decline bookings, and mark them as checked out or no-show.
<p align="center"> <img src="https://github.com/thanhkowibu/DB-Lab-20232/blob/main/airbnb-client/public/images/screenshots/20.ReserveUpdate.jpg?raw=true" alt="ReserveUpdate" width="750"/> </p>

#### Admin Side

- **Booking Oversight:** Admins can view all bookings.
- **Revenue Reports:** Admins can view overall revenue growth reports based on bookings.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Technical Highlights

- **Frontend:** Built with React, TypeScript, and Vite, featuring a component-based architecture for reusability and maintainability.
- **Backend:** Built with Java Spring, ensuring robust server-side performance and scalability.
- **API Integration:** Utilizes RESTful APIs for efficient communication between frontend and backend.
- **Friendly and Interactive UI/UX:** Using **Framer Motion** and **Shadcn UI** library to create visually stunning components with dynamic animations that enhance user interaction.
- **Responsive Design:** Optimized for mobile and desktop, providing a seamless experience across all devices.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

If you have any questions, feel free to contact me at my email thanhphamleuruha@gmail.com.

<p align="right">(<a href="#readme">back to top</a>)</p>

## Like this project?

If you find this project interesting, please leave a star on the repo!

<p align="right">(<a href="#readme">back to top</a>)</p>
