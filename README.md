# TripBuddy – Tour Management System

TripBuddy is a simple **Tour Management System** built using **ASP.NET Core MVC**, **Entity Framework Core (Code First)**, **MS SQL Server**, and **jQuery AJAX**. This project demonstrates how a real-world web application manages bookings, packages, and user interactions using modern ASP.NET Core practices.

---

## 🛠 Technologies Used

* **ASP.NET Core MVC** – Application architecture
* **Entity Framework Core** – ORM for database operations
* **MS SQL Server** – Relational database
* **LINQ** – Querying data
* **jQuery & AJAX** – Asynchronous UI updates
* **Session-based authentication** – User login handling
* **Bootstrap / HTML / CSS** – UI design

---

## 📂 Project Architecture (MVC)

* **Models**: Represent database tables (entities)
* **Views**: UI pages rendered to the user
* **Controllers**: Handle requests, business logic, and responses

The UI communicates with controllers using AJAX, and controllers interact with the database using Entity Framework Core.

---

## 🗄 Database Access (Entity Framework Core)

This project uses **Code First Approach**.

* Models are written in C#
* Entity Framework automatically creates database tables based on models
* No manual SQL table creation is required

### ApplicationDbContext

`ApplicationDbContext` inherits from `DbContext` and contains `DbSet<T>` properties that represent database tables.

Example:

```csharp
public DbSet<Login> Login { get; set; }
public DbSet<UserForm> UserForm { get; set; }
```

---

## 🔗 Connection String Setup

In `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TripBuddyDB;Trusted_Connection=True;"
}
```

In `Program.cs`:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

---

## 🧱 Code First & Migrations (MS SQL Server)

### Step 1: Install Required Packages

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### Step 2: Create Migration

```
Add-Migration InitialCreate
```

### Step 3: Update Database

```
Update-Database
```

This will:

* Create the database
* Create tables based on models
* Apply schema changes automatically

---

## 🔄 CRUD Operations

* **GET** requests are used to fetch data (packages, bookings)
* **POST** requests are used to save or update bookings
* LINQ queries (`Where`, `Select`, `FirstOrDefault`) are used to interact with the database

---

## ⚡ AJAX Usage

AJAX is used to:

* Load packages dynamically into dropdowns
* Submit booking forms without page reload
* Fetch booking data for edit mode

This improves performance and user experience.

---

## 🔐 Session Handling

ASP.NET Core sessions are used to store logged-in user details:

```csharp
HttpContext.Session.SetInt32("UserID", user.UserID);
HttpContext.Session.SetString("UserName", user.UserName);
```

Sessions help maintain user state across requests.

---

## ▶ How to Run the Project

1. Clone the repository
2. Update the connection string in `appsettings.json`
3. Run migrations using `Add-Migration` and `Update-Database`
4. Run the project using Visual Studio or `dotnet run`

---

## 📌 Purpose of This Project

This project is intended for learning and demonstration purposes. It helps understand:

* ASP.NET Core MVC workflow
* Code First approach with EF Core
* LINQ queries
* AJAX-based frontend interaction
* Middleware and session handling

---

✅ Beginner-friendly | ✅ Interview-ready | ✅ Real-world concepts
