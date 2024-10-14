const http = require("http");
const url = require("url");

// Data pengguna
let users = [
  {
    id: 1,
    name: "Ali",
    email: "ali@example.com",
    username: "ali123",
    age: 18,
    address: "Jl. Manggis, Surakarta, Jawa Tengah, Indonesia",
    phone: "+628123456789",
    occupation: "Software Engineer",
    bio: "I love coding and enjoy outdoor activities.",
    status: "Online",
    role: "User",
  },
  {
    id: 2,
    name: "Ahmad",
    email: "ahmad@example.com",
    username: "ahmad321",
    age: 19,
    address: "Jl. Veteran, Bandung, Jawa Barat, Indonesia",
    phone: "+628987654321",
    occupation: "Data Scientist",
    bio: "A data enthusiast who loves exploring new trends in AI.",
    status: "Online",
    role: "User",
  },
  {
    id: 3,
    name: "Rizky",
    email: "rizky@example.com",
    username: "rizky789",
    age: 17,
    address: "Jl. Manggarai, Jakarta, Indonesia",
    phone: "+6282233445566",
    occupation: "UI/UX Designer",
    bio: "Passionate about Making user-friendly interfaces.",
    status: "Online",
    role: "User",
  },
];

// Membuat server HTTP
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Halaman utama dengan informasi API
  if (method === "GET" && path === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User API Information</title>
      </head>
      <body>
        <h1>Welcome to the User API</h1>
        <p>Use the following endpoints to access the API:</p>
        <ul>
          <li><strong>GET /api/users</strong>: Returns the list of users in JSON format.</li>
          <li><strong>GET /api/users/:id</strong>: Returns the details of a user by ID (e.g., /api/users/1).</li>
        </ul>
      </body>
      </html>
    `);
  }
  // API untuk mendapatkan semua pengguna
  else if (method === "GET" && path === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
  // API untuk mendapatkan pengguna berdasarkan ID
  else if (method === "GET" && path.startsWith("/api/users/")) {
    const id = parseInt(path.split("/").pop(), 10);
    const user = users.find((user) => user.id === id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
    }
  }
  // Jika URL tidak ditemukan
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Menjalankan server di port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
