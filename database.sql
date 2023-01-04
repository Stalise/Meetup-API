CREATE TABLE meetups (
  id SERIAL PRIMARY KEY,
  theme VARCHAR(255),
  description VARCHAR(255),
  venue VARCHAR(255)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
  meetup_id INTEGER,
  FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE
);
