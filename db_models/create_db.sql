--database setup
CREATE DATABASE IF NOT EXISTS  ggr_db;

--users table
CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT,  
    username VARCHAR(30) NOT NULL UNIQUE , 
    firstname VARCHAR(50), 
    lastname VARCHAR(50), 
    email VARCHAR(50), 
    hashedPassword VARCHAR(255)
    password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
--games table
CREATE TABLE IF NOT EXISTS games(
    id INT PRIMARY KEY AUTO_INCREMENT, --IGDB API IS USED FOR THE PRIMARY KEY
    title VARCHAR(255) NOT NULL,
    cover_url
    release_datae DATE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
-- genre table
CREATE TABLE GENRE(
    id int PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)
-- game genre table (for categories)
    CREATE TABLE game_geres(int PRIMARY KEY AUTO INCREMENT,
    game_id INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
    );
-- reviews table
    CREATE TABLE IF NOT EXISTS reviews(
        id INT PRIMARY KEY AUTO_INCREMENT, 
        game_id INT NOT NULL, 
        user_id INT NOT NULL, 
        score INT CHECK (score >= 0 AND score <= 10) NOT NULL, 
        review_text TEXT NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE, -- THIS DELETES THE REVIEW IF THE GAME GETS DELETED
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- THIS DELETES THE REVIEW IF THE USER GETS DELETED
    );