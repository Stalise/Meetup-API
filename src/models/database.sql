CREATE TABLE meetups (
  id SERIAL PRIMARY KEY,
  theme VARCHAR(50),
  description VARCHAR(150),
  time VARCHAR(24),
  venue VARCHAR(50)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(15),
  meetup_id INTEGER,
  FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE
);
