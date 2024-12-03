CREATE DATABASE IF NOT EXISTS gamereviews_db;
USE gamereviews_db;

CREATE TABLE IF NOT EXISTS users( id INT PRIMARY KEY AUTO_INCREMENT,  
    username VARCHAR(30) NOT NULL UNIQUE, 
    firstname VARCHAR(50), 
    lastname VARCHAR(50), 
    email VARCHAR(255) NOT NULL, 
    hashedPassword VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS games(id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    cover_url text,
    release_date DATE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    
CREATE TABLE IF NOT EXISTS GENRE(id int PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
    CREATE TABLE IF NOT EXISTS game_genres ( id INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
    );
    
    CREATE TABLE IF NOT EXISTS reviews(
        id INT PRIMARY KEY AUTO_INCREMENT, 
        game_id INT NOT NULL, 
        user_id INT NOT NULL, 
        score INT CHECK (score >= 0 AND score <= 10) NOT NULL, 
        review_text TEXT NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE, 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);
        
CREATE USER IF NOT EXISTS 'goldgamer'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON gamereviews_db.* TO 'goldgamer'@'localhost';
