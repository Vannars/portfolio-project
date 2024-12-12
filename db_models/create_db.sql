CREATE DATABASE IF NOT EXISTS gamereviews_db;
USE gamereviews_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE, 
    firstname VARCHAR(50), 
    lastname VARCHAR(50), 
    email VARCHAR(50), 
    hashedPassword VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games(
    game_id INT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    release_date DATE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    game_id INT NOT NULL, 
    username  VARCHAR(50) NOT NULL, 
    game_name VARCHAR(255) NOT NULL, -- Include the human-readable game name
    score INT CHECK (score >= 0 AND score <= 10) NOT NULL, 
    headline VARCHAR(50) NOT NULL,
    review_text TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE, 
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE USER IF NOT EXISTS 'goldgamer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON gamereviews_db.* TO 'goldgamer'@'localhost';