create TABLE users(
  mail VARCHAR(320) PRIMARY KEY,
  password VARCHAR(16),
  role VARCHAR(5),
  token VARCHAR(500)
);
