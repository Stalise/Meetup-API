CREATE TABLE participants(
  id SERIAL PRIMARY KEY,
  user_mail VARCHAR(320),
  meetup_id INTEGER,
  FOREIGN KEY (user_mail) REFERENCES users (mail) ON DELETE CASCADE,
  FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE
);
