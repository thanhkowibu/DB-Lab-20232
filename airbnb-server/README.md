# Airbnb Server
## Overview

This project is a backend application modeled after Airbnb, developed using Spring Boot, MySQL, Docker, and MinIO (for S3 storage). Although using JPA but native query is being ultilized and optimized due to
this project is made for the SQL class

For more detail about schema and architecture as well as frontend client implementaion, please refer to [this repo](https://github.com/thanhkowibu/DB-Lab-20232)

## Technologies Used

- **Spring Boot**: For building the backend application
- **MySQL**: As the relational database
- **Docker**: For containerizing the application
- **MinIO**: For S3-compatible object storage
- **Swagger**: For API documentation
## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Java 11+
- Maven

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tranhuy105/short-term-rental-platform.git
   cd short-term-rental-platform
   ```

2. **Download Docker Volume:**

    You can download the mock volume data for MySQL and S3 [here](https://drive.google.com/drive/folders/1Cm6kqSqG0by7xQnX2eVnrHFDW46UCiF_?usp=drive_link).
    
    Place the downloaded data folder inside the main project directory. Extract the s3 to inside the data folder. The data folder should consists of two volume: `mysql` and `s3`. After this, you are already set and can proceed to run the application:
    ```
    docker compose up
    ```
6. **Alternative Setup Without Mock Data:**

   If you prefer not to download the mock data, you can initialize the database using the provided schema. Uncomment all commented line in the `docker-compose.yml` file:

   ```yaml
   services:
     mysql:
       container_name: mysqldb
       image: mysql
       environment:
         MYSQL_ROOT_PASSWORD: password
         MYSQL_DATABASE: airbnb_db
         MYSQL_USER: username
         MYSQL_PASSWORD: password
         TZ: 'UTC'
       volumes:
         - ./init-db.sql:/docker-entrypoint-initdb.d/1.sql
         - ./data/mysql:/var/lib/mysql
       ports:
         - 3306:3306
       networks:
         - app-network
       command: ["--log_bin_trust_function_creators=1"]
       restart: unless-stopped
   ```

7. **Initialize MinIO:**

   To initialize MinIO (skip if already download the data volume), run the following script:

   ```
   ./init-s3-bucket.bat
8. **Run the Application in your local dev envi**
   ```
   docker-compose up
9. **Access the Application:**

   - The application will be available at `http://localhost:8080`
   - The MinIO console will be available at `http://localhost:9000`
   - Maildev console will be available at `http://localhost:1080`


## Features

### User Management

- Users can create accounts (handled by procedures to ensure safe transactions) -> email verification with token
- Users can perform basic CRUD operations with their accounts
- Users can request to become a host from the admin
- Users can report other users for violations
- Admins can ban users, assign permissions to other users, and view growth reports on new users by month/year

### Property Management

- Users can view a list of properties and see details of a property
- Users can favorite/unfavorite and view a list of favorited properties
- Hosts can create new properties and perform basic CRUD operations with properties

### Booking Management

#### User Side

- Users can book rooms
- Users can view their bookings and see detailed statuses with logs
- Users can cancel bookings
- After checkout, users can create a review for the rented property corresponding to the booking

#### Host Side

- Hosts can view all bookings and detailed logs of their rented properties
- Hosts can confirm or reject bookings
- Hosts can check out/mark no-show for bookings
