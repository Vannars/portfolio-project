INSERT INTO users (user_id, username, firstname, lastname, email, hashedPassword, created_at) VALUES
(1, 'kokeceo3yrs', 'Koke', 'Ceo', 'kokeceo@forthreeyears.com', '$2b$10$6/TCkoSilFlTE/J4mj5hJ.tr4.e4jS5OFtqwKZ5qKmN.jd1XGWRLK', '2024-12-12T18:08:08'),
(2, 'kokeceo123', 'koke', 'ceo', 'ceo@ceo.com', '$2b$10$xRprG3J3VZKWKBTUcbUEWOcGopW05hQzh3t2LoMnac128yUuXmhV6', '2024-12-12T18:11:09'),
(3, 'notkojima', 'nothideo', 'notkojima', 'nothideokojima@games.com', '$2b$10$rmGbVnffBzm71Sq6OeOh4O0knn/n/I1PayqC9aVj8sQi6eO8OitbS', '2024-12-12T18:18:20'),
(4, 'bhaddock', 'Bill', 'Haddock', 'bill@haddock.com', '$2b$10$pkDVCpfEpnh96wt4xgUUZORlsoyJ73rzJ8ZFBf3bUhbIJnXvJfAxG', '2024-12-12T18:25:12'),
(5, 'eugym20x', 'Ewan', 'Mathews', 'eugy28@mail.com', '$2b$10$Dtp2rLkev1kHqU/jDzvGSuQji2y99dWav6AxfpxwoTt92tyu4s0rm', '2024-12-12T18:33:42');


INSERT INTO games (game_id, name, release_date, created_at) VALUES
(986, 'Halo 2', NULL, CURRENT_TIMESTAMP),
(302156, 'Call of Duty: Black Ops 6', NULL, CURRENT_TIMESTAMP),
(2368, 'Dark Souls II', NULL, CURRENT_TIMESTAMP),
(228530, 'Death Stranding 2: On The Beach', NULL, CURRENT_TIMESTAMP),
(6146, 'Stranglehold', NULL, CURRENT_TIMESTAMP),
(11265, 'Blood II: The Chosen', NULL, CURRENT_TIMESTAMP),
(990, 'Halo: Reach', NULL, CURRENT_TIMESTAMP);


INSERT INTO reviews (id, game_id, username, game_name, score, headline, review_text, created_at) VALUES
(1, 986, 'kokeceo123', 'Halo 2', 10, 'THE BEST HALO HANDS DOWN', 
    'I love this game...\n\nI first played this back in 2005 in the old days of xbox live. Man those were the good ol\' days. Still holds up today, especially if you can get some mates together for a lan party.', 
    '2024-12-12T18:13:38'),
(2, 302156, 'kokeceo123', 'Call of Duty: Black Ops 6', 6, '6 for a 6th game', 
    'Rain in the fire.\nThis game is pretty okay??\n\nThe campaign is about as good as cold war\'s but it isnt as good as MW 2019.', 
    '2024-12-12T18:14:58'),
(3, 2368, 'kokeceo123', 'Dark Souls II', 10, 'PRAISE THE SUN', 
    'After beating this game I finally had the strength to become ceo of a company for three years. \nPraise the SUN!', 
    '2024-12-12T18:16:08'),
(4, 228530, 'notkojima', 'Death Stranding 2: On The Beach', 10, 'From the future', 
    'This one will be special. The first strandlike sequel to the first strandlike game.', 
    '2024-12-12T18:21:08'),
(5, 6146, 'notkojima', 'Stranglehold', 10, 'John Woo is a masterclass', 
    'I felt like john wick before john wick.', 
    '2024-12-12T18:24:12'),
(6, 2368, 'bhaddock', 'Dark Souls II', 1, 'I disagree with the other review', 
    'This is the worst dark souls. I\'ve only completed it 7 times.', 
    '2024-12-12T18:28:16'),
(7, 11265, 'bhaddock', 'Blood II: The Chosen', 5, 'Only has one level', 
    'It might just be me but i couldnt get off the damn train. So based on the fact this game only has one level, I can\'t rate it highly.\n\nThat being said, ripping out hearts has never been so fun! Not bad for the late 90s.', 
    '2024-12-12T18:32:00'),
(8, 990, 'eugym20x', 'Halo: Reach', 9, 'Absolute class', 
    'I used to play this back in the day with my mates  nline.\nHalo reach was absolute class, I canny remember playing anything else back in 2011.\n\nShame halo 4 was when it became bad i barely played it. It should just be infection, bring that back like it used to be and maybe some customisations and id play infinite.', 
    '2024-12-12T18:37:02');
