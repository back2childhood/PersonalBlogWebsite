-- Drop tables if they exist (reverse order to avoid FK constraint errors)
DROP TABLE IF EXISTS comment, articles_tags, article, tag, "user" CASCADE;

-- Step 1: Create User Table (Independent)
CREATE TABLE "user" (  
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50),
  email VARCHAR(100),
  status BOOLEAN DEFAULT FALSE, -- Converted from INT
  type INT DEFAULT 0, -- 0 - normal user, 1 - admin
  header_url VARCHAR(200),
  create_time TIMESTAMP
);

-- Step 2: Create Tag Table (Independent)
CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- Step 3: Create Article Table (References user.id)
CREATE TABLE article (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id) ON DELETE CASCADE, -- Foreign key added
  title VARCHAR(100) NOT NULL,
  create_time TIMESTAMP NOT NULL,
  cover VARCHAR(200),
  draft BOOLEAN DEFAULT TRUE, -- Converted from INT
  content TEXT NOT NULL,
  comment_count INT,
  hide BOOLEAN DEFAULT FALSE -- Converted from INT
);

-- Step 4: Create Articles_Tags Table (References article.id and tag.id)
CREATE TABLE articles_tags (
  article_id INT NOT NULL REFERENCES article(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Step 5: Create Comment Table (References article.id and user.id)
CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  article_id INT REFERENCES article(id) ON DELETE CASCADE,
  target_id INT,
  target_type INT,
  content TEXT,
  create_time TIMESTAMP NOT NULL
);

-- Insert Data into User Table (Must come first)
INSERT INTO "user" (id, username, password, email, status, type, header_url, create_time) VALUES 
(101, 'test_admin', '1234', '1234@gmail.com', FALSE, 1, 'https://images.app.goo.gl/owDkCrRttJ2X6fhK6', '2025-02-25 18:48:36');

-- Insert Data into Tag Table
INSERT INTO tag (id, name) VALUES 
(1, 'C++'), (2, 'MySQL'), (3, 'JAVA'), (4, 'JPA'), (5, 'React'), (6, 'troubleshooting'),
(7, 'Python'), (8, 'JavaScript'), (9, 'Kafka'), (10, 'MongoDB'), (11, 'Redis'), (12, 'Elasticsearch'),
(13, 'Linux'), (14, 'Docker'), (15, 'Kubernetes'), (16, 'Git'), (17, 'Cassandra'), (18, 'nvim'),
(19, 'useful tools'), (20, 'Books'), (21, 'Build web'), (22, 'shower thoughts');

-- Insert Data into Article Table
INSERT INTO article (id, user_id, title, create_time, cover, draft, content, comment_count, hide) VALUES 
(3, 101, 'Get started with Elasticsearch for storing and searching articles.', '2025-03-13 14:35:29', '0', FALSE, 'Use Elasticsearch with Spring Boot...', 0, FALSE),
(4, 101, 'Age of the Imperium', '2025-03-21 15:19:54', '0', FALSE, 'The Age of the Imperium is the name given by Imperial lexographers...', 0, FALSE),
(5, 101, 'Chaos', '2025-03-21 15:32:55', '0', FALSE, 'Chaos, also known to its servants as the Primordial Truth...', 0, FALSE),
(6, 101, 'Dawn of Creation', '2025-03-22 04:44:31', '0', FALSE, 'At the dawn of time, the powerful and ancient alien species known only as the Old Ones...', 0, FALSE);

-- Insert Data into Articles_Tags Table
INSERT INTO articles_tags (article_id, tag_id) VALUES 
(3,1), (4,1), (4,2), (4,3), (4,4), (5,5), (3,6), (5,6), (5,7), (5,8), (6,9), (6,10), (6,11), (6,12);

-- Insert Data into Comment Table (Must come last)
INSERT INTO comment (user_id, article_id, target_id, target_type, content, create_time) VALUES 
(101, 3, NULL, 0, 'Great article on Elasticsearch!', '2025-03-14 10:00:00');

