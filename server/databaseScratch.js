/*This file was used to create and test the Database*/

const sqlite3 = require('sqlite3');

class DatabaseScratch {
	static db = null;

	static async createConnection() {
		if (this.db === null) {
			this.db = new sqlite3.Database('./espresso.sqlite', err => err && console.log(err));
			await this.createTables();
			console.log('Creating');
			console.log('done Creating');
			await this.createHardcodedData();
			await this.runSQL(`PRAGMA foreign_keys=on;`);
		}
	}

	static async createTables() {
		for (let tableSQL of this.tables) {
			await this.runSQL(tableSQL);
		}
	}

	static runSQL(SQL) {
		return new Promise((resolve, reject) => {
			this.db.run(SQL, err => {
				if (err) {
					console.log('Error running SQL', err);
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	//bullet symbol &#8226

	static tables = [
		`CREATE TABLE user_profile (
    		user_id INTEGER NOT NULL,
    		email TEXT NOT NULL,
    		password TEXT NOT NULL,
    		name TEXT NOT NULL ,
    		surname TEXT NOT NULL ,
    		display_name TEXT NOT NULL ,
    		dob TEXT NOT NULL ,
    		gender TEXT NOT NULL ,
    		country TEXT NOT NULL ,
    		bio TEXT NOT NULL ,
        saved_posts TEXT,
        friends TEXT ,
        trends TEXT ,
		blocked_trends TEXT ,
		profile_photo TEXT ,
    		PRIMARY KEY (user_id)
		    );`,

		`CREATE TABLE friend_request (
            request_id INTEGER NOT NULL,
            sender_id INTEGER NOT NULL,
            receiver_id INTEGER NOT NULL,
            date_sent TEXT NOT NULL,
            accepted INTEGER NOT NULL,
            accept_date TEXT,
            PRIMARY KEY (request_id),
            FOREIGN KEY(sender_id) REFERENCES user_profile(user_id),
            FOREIGN KEY(receiver_id) REFERENCES user_profile(user_id)
            );`,

		`CREATE TABLE normal_post (
            npost_id INTEGER NOT NULL,
            author_id INTEGER NOT NULL,
            textual_input TEXT ,
            media_location TEXT,
            creation_date TEXT NOT NULL,
            life_event INTEGER NOT NULL,
            nshared_id INTEGER,
            sshared_id INTEGER,
			isEdited INTEGER,
            PRIMARY KEY(npost_id),
            FOREIGN KEY(author_id) REFERENCES user_profile(user_id),
            FOREIGN KEY(sshared_id) REFERENCES smart_post(spost_id),
            FOREIGN KEY(nshared_id) REFERENCES normal_post(npost_id)
            );`,
		`CREATE TABLE npost_like (
              like_id INTEGER NOT NULL,
              npost_id INTEGER NOT NULL,
              liker_id INTEGER NOT NULL,
              creation_date TEXT NOT NULL,
              PRIMARY KEY(like_id),
              FOREIGN KEY(liker_id) REFERENCES user_profile(user_id),
              FOREIGN KEY(npost_id) REFERENCES normal_post(npost_id)
              );`,
		`CREATE TABLE npost_comment (
                comment_id INTEGER NOT NULL,
                npost_id INTEGER NOT NULL,
                commenter_id INTEGER NOT NULL,
                textual_input TEXT NOT NULL,
                creation_date TEXT NOT NULL,
                PRIMARY KEY(comment_id),
                FOREIGN KEY(commenter_id) REFERENCES user_profile(user_id),
                FOREIGN KEY(npost_id) REFERENCES normal_post(npost_id)
                );`,

		`CREATE TABLE smart_post (
            spost_id INTEGER NOT NULL,
            author_id INTEGER NOT NULL,
            media_type TEXT NOT NULL,
            tags TEXT NOT NULL,
            time_needed INTEGER NOT NULL,
            textual_input TEXT ,
            media_location TEXT,
            creation_date TEXT NOT NULL,
            PRIMARY KEY(spost_id),
            FOREIGN KEY(author_id) REFERENCES user_profile(user_id)
            );`,
		`CREATE TABLE spost_like (
              vote_id INTEGER NOT NULL,
              spost_id INTEGER NOT NULL,
              voter_id INTEGER NOT NULL,
              creation_date TEXT NOT NULL,
              up_down INTEGER NOT NULL,
              PRIMARY KEY(vote_id),
              FOREIGN KEY(voter_id) REFERENCES user_profile(user_id),
              FOREIGN KEY(spost_id) REFERENCES smart_post(spost_id)
              );`,
		`CREATE TABLE spost_comment (
                comment_id INTEGER NOT NULL,
                spost_id INTEGER NOT NULL,
                commenter_id INTEGER NOT NULL,
                textual_input TEXT NOT NULL,
                creation_date TEXT NOT NULL,
                PRIMARY KEY(comment_id),
                FOREIGN KEY(commenter_id) REFERENCES user_profile(user_id),
                FOREIGN KEY(spost_id) REFERENCES smart_post(spost_id)
                );`,

		`CREATE TABLE trend (
            trend_id INTEGER NOT NULL,
            title TEXT NOT NULL,
			summary TEXT NOT NULL,
            tags TEXT NOT NULL,
            time_needed INTEGER NOT NULL,
            textual_input TEXT ,
            media_location TEXT,
            creation_date TEXT NOT NULL,
            last_updated TEXT NOT NULL,
			ranking INTEGER NOT NULL,
			video_id TEXT NOT NULL,
            PRIMARY KEY(trend_id)
            );`,

		`CREATE TABLE timer (
              timer_id INTEGER NOT NULL,
              user_id INTEGER NOT NULL,
              duration INTEGER NOT NULL,
              start TEXT NOT NULL,
              end TEXT NOT NULL,
              active INTEGER NOT NULL,
              PRIMARY KEY(timer_id),
              FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
              );`,

		`CREATE TABLE note (
    		note_id INTEGER NOT NULL,
    		author_id INTEGER NOT NULL,
    		title TEXT NOT NULL,
    		category TEXT NOT NULL,
    		text TEXT ,
    		creation_date TEXT NOT NULL,
    		PRIMARY KEY (note_id),
    		FOREIGN KEY (author_id) REFERENCES user_profile(user_id)
		    );`
	];

	static async createHardcodedData() {
		try {
			/*User Profiles */
			await this.createUser(
				'michealscott@dundlermifflin.com',
				'testpassword',
				'Michael',
				'Scott',
				'Michael Scott',
				'15/02/1997',
				'M',
				'USA',
				'I am Beyonce, always.',
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaVPCEE6pm2HEPwg63emcji05tX5rkIxy382sFbvw&s'
			);
			await this.createUser(
				'dwightshrute@dundlermifflin.com',
				'testpassword',
				'Dwight',
				'Schrute',
				'Dwight Schrute',
				'23/03/1994',
				'M',
				'Germany',
				'You couldn’t handle my undivided attention.',
				'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Dwight_Schrute.jpg/220px-Dwight_Schrute.jpg'
			);
			await this.createUser(
				'jimhalpert@dundlermifflin.com',
				'testpassword',
				'Jim',
				'Halpert',
				'Jim Halpert',
				'25/01/1993',
				'M',
				'Ireland',
				'Bears, Beets, Battlestar Galactica',
				'https://img.nbc.com/sites/nbcunbc/files/metaverse_assets/1/0/6/3/3/4/jim-500x500.jpg'
			);
			await this.createUser(
				'pambeesly@dundlermifflin.com',
				'testpassword',
				'Pamela',
				'Beesly',
				'Pam Beesly',
				'11/08/1999',
				'F',
				'England',
				'There’s a lot of beauty in ordinary things. Isn’t that kind of the point?',
				'https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-pam-beesly.jpg/_jcr_content/renditions/original.JPEG'
			);
			await this.createUser(
				'janlevinson@dundlermifflin.com',
				'testpassword',
				'Jannifer',
				'Levinson',
				'Jan Levinson',
				'27/08/1993',
				'F',
				'Canada',
				'A proud mother and ex-manager.',
				'https://static1.personality-database.com/profile_images/ae624d57eb84461bbcec6af43d13062e.png'
			);
			/*User Friends*/
			await this.createFriends(1, '2|3|4');
			await this.createFriends(2, '1|4|5');
			await this.createFriends(3, '1|4|5');
			await this.createFriends(4, '1|2|3');
			await this.createFriends(5, '2|3');
			/*Posts*/
			await this.createNormalPosts(
				1,
				`A guy gave me 1000 Dogecoin last week. I don’t understand crypto at all but the person who gave them to me told me I should hold them because Twitter will use Dogecoin as a currency in the near future.\n\nIs this really going to happen??\n\nI really don’t know what to do, sell or hold. If anyone can give me some advice, that would be awesome.  `,
				null,
				`Mon, 26 Dec 2022 12:39:15 GMT`,
				0,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				1,
				`I've just got my driver's liscence, Watch out fellow drivers!.  `,
				null,
				`Mon, 26 Dec 2022 12:00:15 GMT`,
				1,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				1,
				`I'm not superstitious but I am a little stitious.\n\nSo I knock on wood, but I also flush the toilet three times before leaving the bathroom.  `,
				'https://cdn.theatlantic.com/thumbor/qf3OZxABtwdkxsPxNl_l-pbFyYY=/2733x1:4028x1296/1080x1080/media/img/mt/2020/10/Dwight_comop/original.jpg',
				`Sun, 25 Dec 2022 10:39:15 GMT`,
				0,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				1,
				`Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing.  `,
				'https://cdn.theatlantic.com/thumbor/qf3OZxABtwdkxsPxNl_l-pbFyYY=/2733x1:4028x1296/1080x1080/media/img/mt/2020/10/Dwight_comop/original.jpg',
				`Sun, 25 Dec 2022 10:39:15 GMT`,
				0,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				1,
				`I'm not a vegetarian, but I don't eat meat. I'm a dessertarian.  `,
				'https://cdn.theatlantic.com/thumbor/qf3OZxABtwdkxsPxNl_l-pbFyYY=/2733x1:4028x1296/1080x1080/media/img/mt/2020/10/Dwight_comop/original.jpg',
				`Sun, 25 Dec 2022 10:39:15 GMT`,
				0,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				1,
				`I would say I have an unfair advantage, because I watch reality dating shows like a hawk, and I learn.\n\nI absorb information from the strategies of the winners and the losers.  `,
				'https://cdn.theatlantic.com/thumbor/qf3OZxABtwdkxsPxNl_l-pbFyYY=/2733x1:4028x1296/1080x1080/media/img/mt/2020/10/Dwight_comop/original.jpg',
				`Sun, 25 Dec 2022 10:39:15 GMT`,
				0,
				null,
				null,
				0
			);
			await this.createNormalPosts(
				3,
				`That's my boy !!`,
				null,
				`Mon, 26 Dec 2022 19:39:15 GMT`,
				0,
				3,
				null,
				0
			);

			/*User Trend*/
			await this.createUserTrends(1, '1|2');
			await this.createUserTrends(2, '3|4');
			await this.createUserTrends(3, '2|4');
			/*User Blocked Trends*/
			await this.createUserBlockedTrends(1, '4');
			await this.createUserBlockedTrends(2, '2');
			await this.createUserBlockedTrends(3, '1');
			/*trends*/

			await this.createTrends(
				`World cup comes to an end`,
				'64 matches, a record 172 goals, one of the best (and most evenly priced) finals in history and the prior 12 years of existential footballing crisis',
				'Sport',
				9,
				`<pre>Well, after 64 matches, a record 172 goals, one of the best (and most evenly priced) finals in history and the prior 12 years of existential footballing crisis, the Qatar 2022 World Cup finally reached its crescendo. In many ways, the footballing gods treated us to a fairytale like no other. Lionel Messi, the best to ever lace the cleats, lifted the one prize that always seemed to allude to him and extinguished any doubt that he sits alone in the pantheon of football greatness. Although you get the inkling, Kylian Mbappe will give his title a challenge in the coming years after pushing the 'little magician' all the way on the greatest stage. 

Both PSG stars were heavily backed from the get-go to claim the top goal scorer market, with 17% of total bets on the eventual winner, Mbappe. Messi, though, would still hurt us by winning his second Golden Ball, which saw our biggest pay out across our massive 100+ outright player markets range. But both paled into near insignificance to the liability we had on France to win the final, with 38% of the outright winner bets on Le Blues to win their second consecutive World Cup.

In addition to being swept up in the Messi romantic narrative, the tournament was dripping in spectacular games and goals, scintillating talents and teams. Near unbackable nations shocked heavily proclaimed morals, as footballing powerhouses in South America and Europe were stunned by defiant nations from confederations in Africa and Asia, bridging the gap between regions significantly closer. Record-breaking bookings were seen in a game in a tournament where there was an unprecedented low for the 32-team World Cup format. And most notably, there were an equal record number of goalless draws in a tournament that set a record high for total goals – quite the paradox.

Like all sports fans, the Football World Cup is undoubtedly our pinnacle here at Kindred, bringing a gluttonous of betting trends and insights.</pre>

<h4>&#8226 Player & Team Statistics</h4>

<pre>The 2022 World Cup saw an even bigger shift from the traditional main markets to the more eccentric and quirkier player markets, which continue to grow at a rate of knots. In fact, we saw a 105% rise in Player Occurrence bets compared to Euro 2020 through our significantly improved PM Bet Builder offering, most notably Player shots on target, Player shots and Player fouls. These were supplemented by Match and Team stats markets available in Bet Builder and Multi-Builder for the first time – Offsides, Shots, Shots on Target and Fouls. Combining these with our overall UX, combinability capabilities and settlement times, we believe the punter experience here in this campaign was the best in class. And given that 45% of pre-match actives in the knockout stage placed a Bet Builder, we now set our sights on expanding this offering to domestic leagues worldwide in the coming months. </pre>

<h4>The Closing of the Gap</h4>

<pre>The 2022 World Cup was the first global tournament where the gap between confederations was significantly closed. Both Asia and Africa stamped their brand onto the world stage. For the first time ever, the Asian Confederation saw three sides reach the Round of 16, producing major upsets throughout their campaigns. Saudi Arabia was our widest-priced underdog to win at any World Cup in Kindred's recorded history, 20/1 at one stage in PM, when they gave eventual tournament winners Argentina an early group-stage hiccup. We saw Japan top Group E, priced at 11/1 ahead of previous world champions Spain and Germany, as well as Australia, beating 10th world-ranked Denmark and Tunisia as priced outsiders PM in both respective games, to make the knockout stage. 

Then we turn our attention to Africa, particularly Senegal and Morocco, equalling the continent's best-ever group stage performance in 2014 when Algeria and Nigeria reached the knockout rounds. But it was Morocco who stole our hearts. The first African and Arab nation to make the final four despite being a 60/1 chance to do so and even at one stage becoming our worst way in the overall outright winners' market which was pre-tournament priced at 400/1. 

And dare I forget about Croatia, too, a nation with a population of tiny propositions compared to the main powerhouses, who yet again exceeded themselves, finishing 3rd.

All these upsets would see an overall shift from the traditional 'favourite-backing' approach to times when the ledger would be red for the bookmakers' outsiders. </pre>

<h4>Backing the 'Unders'</h4>

<pre>Traditionally punters have always been mad for the overs - and to be fair, it was still the more favoured proposition across the overall Over/Under offer - but despite the Qatar World Cup seeing the most goals ever for the tournament, there was a clear shift from punters starting to take notice on the unders in a wagering sense. As a result, the under outcome grew substantially, with bets up 35% compared to last year's men's Euros, taking back its share on the bet offer considerably to 19%. 

No doubt an unprecedented total of goalless draws in the early stage of the competition would have swayed punters to this strategy, but the counterargument could be made that with the significant amount of added-on time throughout the world cup - some matches which had almost 30 minutes added on across both halves - players would have been more enticed to back the overs. But overall, it wasn't the case and indeed, the unders across all its propositions (goals/cards/corners etc.) would, in the fullness of time for the WC22, prove to be a profitable strategy for our players. 

After one of the most memorable World Cups in history, guess what? This is not the end of things... A women's Football World Cup to follow in 2023. Bring it on.</pre>`,
				'https://as01.epimg.net/meristation_en/imagenes/2022/11/19/news/1668888009_438076_1668888181_noticia_normal.jpg',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Thu, 26 Jan 2023 01:22:15 GMT`,
				1,
				'Szba2T-b8a4'
			);

			await this.createTrends(
				`Batman is back`,
				'"The Batman" is a gritty, noir-inspired reboot of the iconic superhero franchise , this time featuring a new actor which may change how we used to see batman',
				'Cinema',
				8,
				`<pre>
The latest Batman movie, titled "The Batman," is a reboot of the iconic superhero franchise and features a new actor, Robert Pattinson, in the role of Bruce Wayne/Batman. The film is set in the early days of Batman's crime-fighting career, as he struggles to bring justice to the streets of Gotham City and confront a rising tide of crime and corruption. Along the way, he must also contend with some of the city's most infamous villains, including the Riddler and Catwoman.
</pre>
<h4>&#8226 Cast and Crew</h4>
<pre>
The movie is directed by Matt Reeves, who previously directed the "Planet of the Apes" trilogy. In addition to Pattinson, the film also stars Zoe Kravitz as Catwoman, Colin Farrell as the Penguin, Paul Dano as the Riddler, and John Turturro as crime lord Carmine Falcone.
</pre>
<h4>&#8226 Production and Filming</h4>
<pre>
"The Batman" began filming in 2019 and was initially set to be released in June 2021, but due to the COVID-19 pandemic, its release date was delayed multiple times before settling on October 2021. The movie was shot on location in Liverpool, London, and Glasgow, as well as at Pinewood Studios in the UK. 
</pre>
<h4>&#8226 Marketing and Promotion</h4>
<pre>
The marketing campaign for "The Batman" began in earnest in late 2020, with the release of a teaser trailer and promotional images. The studio has also released several official posters and other promotional materials leading up to the film's release. The production company also gave fans a glimpse of the film's sets and other behind-the-scenes footage.
</pre>
<h4>&#8226 Reception</h4>
<pre>
"The Batman" received positive reviews upon its release, with many praising Pattinson's performance as the Dark Knight and the film's gritty, noir-inspired tone. Critics also noted the film's strong supporting cast and its unique take on the iconic character. The film has been  highly praised by critics and fans alike, and has perform well in the box office.
</pre>
<h4>&#8226 Conclusion</h4>
<pre>
Overall, "The Batman" is a fresh and exciting reboot of the beloved superhero franchise that successfully updates the character for a new generation of audiences. With its strong cast, compelling story, and top-notch action, the movie is sure to be a hit with fans of the comics as well as newcomers to the franchise.
</pre>`,
				'https://fumettologica.it/wp-content/uploads/2022/03/the-batman.jpg',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Fri, 27 Jan 2023 01:22:15 GMT`,
				2,
				'mqqft2x_Aa4'
			);

			await this.createTrends(
				`Musk - Twitter situation`,
				'Well-known entrepreneur and CEO of SpaceX and Tesla, Elon Musk uses Twitter to share thoughts, updates, and announcements that often make headlines and stir controversy.',
				'Tech',
				12,
				`<pre>
Elon Musk is a well-known entrepreneur and the CEO of SpaceX and Tesla. He is also known for his active presence on social media, particularly on Twitter, where he frequently shares updates about his companies, thoughts on various topics, and even makes announcements about new projects and initiatives. His tweets often make headlines, and can also move markets and set trends.
</pre>
<h4>&#8226 Early Twitter Activity</h4>
<pre>
Musk first joined Twitter in 2008 and has since amassed a large following. In the early days of his Twitter activity, he primarily used the platform to share updates about SpaceX and Tesla, as well as personal musings and thoughts. He quickly became known for his candid, unfiltered, and often humorous tweets.
</pre>
<h4>&#8226 Controversial Tweets and Market Impact</h4>
<pre>
In recent years, some of Musk's tweets have sparked controversy and backlash, particularly when they relate to Tesla's stock or when he mentions cryptocurrencies like Bitcoin and Dogecoin. In several occasions, tweets from Musk have been credited for moving the stock prices for his companies, and even for the cryptocurrency market. Due to this, his Twitter activity has been the subject of scrutiny by the Securities and Exchange Commission (SEC) and raised questions about the impact of social media on financial markets.
</pre>
<h4>&#8226 Twitter Use for Business and Marketing</h4>
<pre>
In addition to generating headlines and stirring up controversy, Musk has also used Twitter to announce major business developments and new projects. From tweets about product launches and updates on SpaceX and Tesla, to announcing the creation of a new company, Neuralink, he has effectively leveraged the platform to build buzz and interest in his various ventures. 
</pre>
<h4>&#8226 Impact on Pop culture</h4>
<pre>
Musk has become a pop culture figure as well, with his tweets often being parodied and quoted on social media, and his public personality being referenced in various forms of media, from music and TV shows, to memes and digital art.
</pre>
<h4>&#8226 Conclusion</h4>
<pre>
Overall, Elon Musk's presence on Twitter has had a significant impact on the way he conducts business and interacts with the public. He has used the platform to share updates, make announcements, and generate buzz for his companies, but also has been a subject of controversy due to his statements, particularly when it comes to the stock market and crypto. Regardless, his tweets are often discussed, analyzed and even parodied, making his Twitter account a must-watch for anyone interested in business, technology, and popular culture.
</pre>`,
				'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F220503123434-20220504-elon-musk-black-twitter-illustration.jpg%7C',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				3,
				'rpAZi1x-PxE'
			);

			await this.createTrends(
				`Nolan is back with a TENET`,
				'"Tenet" is a mind-bending science fiction action-thriller from Christopher Nolan, known for directing "Inception" and "Dunkirk".',
				'Cinema',
				12,
				`<pre>
"Tenet" is a science fiction action-thriller film directed by Christopher Nolan, known for directing "Inception" and "Dunkirk". The film stars John David Washington as the protagonist, a secret agent who embarks on a mission to prevent World War III through the use of a mysterious technology called "inversion." The film follows the agent's journey as he navigates through the world of espionage and time manipulation.
</pre>
<h4>&#8226 Cast and Crew</h4>
<pre>
The film features an ensemble cast, with John David Washington as the protagonist, along with Robert Pattinson, Elizabeth Debicki, Dimple Kapadia, Michael Caine, and Kenneth Branagh. Christopher Nolan wrote and directed the film, with Hoyte van Hoytema serving as the cinematographer and Ludwig Göransson composing the score.
</pre>
<h4>&#8226 Production and Filming</h4>
<pre>
"Tenet" began filming in 2019 and was initially set to be released in July 2020, but due to the COVID-19 pandemic, its release date was delayed until September 2020. Filming took place in various locations including Denmark, Estonia, India, Italy, Norway, and the United Kingdom. In addition, the studio filmed in several iconic location as the Guggenheim Museum in Bilbao, the Tallinn TV Tower, and the Svalbard Global Seed Vault.
</pre>
<h4>&#8226 Marketing and Promotion</h4>
<pre>
The marketing campaign for "Tenet" began with a teaser trailer which was released in December 2019, and revealed the first look at the film's plot and characters. A series of promotional materials and posters were released later on,  giving fans a glimpse of the film's concept and visuals. A number of behind-the-scenes content were also shared with the audience .
</pre>
<h4>&#8226 Reception</h4>
<pre>
"Tenet" received generally positive reviews upon its release, with many praising Nolan's direction and the film's visual effects and action sequences.  The film was praised for its ambitious and mind-bending plot, as well as its strong performances, especially from the leading man John David Washington. The film has performed well in box office and gain a strong following among fans and critics.
</pre>
<h4>&#8226 Conclusion</h4>
<pre>
"Tenet" is an ambitious and visually stunning film that is sure to please fans of Nolan's previous work. The film's mind-bending story and action-packed set pieces make for a thrilling ride, and the strong performances from the cast only add to the film's overall impact. It is a thought-provoking and mind-bending action thriller that is sure to be remembered as a iconic film in the sci-fi genre.
</pre>`,
				'https://cdn.gelestatic.it/deejay/sites/2/2022/07/tenet-spiegazione-finale-significato-film-nolan.jpg',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				4,
				'mqqft2x_Aa4'
			);

			await this.createTrends(
				`Bitcoin and Economy`,
				'Step into the world of Bitcoin, a decentralized digital currency that enables instant payments to anyone, anywhere in the world. Experience the thrill of peer-to-peer transactions and mining, as you navigate the world of cryptography and blockchain technology.',
				'Tech',
				11,
				`<pre>
Bitcoin is a decentralized digital currency that enables instant payments to anyone, anywhere in the world. It was created in 2009 by an unknown individual or group using the pseudonym Satoshi Nakamoto. Bitcoin operates on a peer-to-peer network and transactions take place between users directly, without an intermediary. These transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. 
</pre>
<h4>&#8226 How Bitcoin Works </h4>
<pre>
Bitcoin transactions are recorded on a public ledger called the blockchain. The blockchain is a decentralized and distributed digital ledger that is maintained by a network of computers around the world. When a user initiates a transaction, it is broadcast to the network and verified by multiple computers, called nodes. Once verified, the transaction is added to the blockchain, creating a permanent and transparent record of the transfer. 
</pre>
<h4>&#8226 The Role of Miners </h4>
<pre>
Miners play a crucial role in maintaining the integrity of the Bitcoin network. These individuals and organizations dedicate powerful computers and large amounts of electricity to the process of verifying transactions and adding them to the blockchain. In return for their work, miners are rewarded with newly created bitcoins. As the number of bitcoins in circulation approaches its 21 million limit, the reward for mining will decrease over time.
</pre>
<h4>&#8226 Volatility and Adoption</h4>
<pre>
One of the most notable characteristics of Bitcoin is its high volatility, which has led to significant fluctuations in its value over time. Despite this, Bitcoin and other cryptocurrencies are gaining increasing attention and adoption as a form of investment and digital currency. Some industries such as online gambling, online marketplaces and remittances have adopted Bitcoin as a form of payment.
</pre>
<h4>&#8226 Regulation and Legal Status</h4>
<pre>
The legal status of Bitcoin and other cryptocurrencies varies by jurisdiction. Some countries have outright banned it, while others have embraced it and created favorable regulatory environments. In the United States, for example, Bitcoin is considered a commodity by the Commodity Futures Trading Commission and is subject to capital gains taxes. Other jurisdictions treat Bitcoin more like a currency, subjecting it to tax laws similar to those that apply to fiat currencies.
</pre>
<h4>&#8226 Conclusion</h4>
<pre>
Bitcoin is a decentralized digital currency that has captured the attention of individuals, businesses, and governments around the world. It operates on a peer-to-peer network and transactions are recorded on a public ledger called the blockchain. Its volatility and regulatory challenges have deterred some people, but it's continued adoption by various industries and the rise of other cryptocurrencies has solidified it as a new asset class. 
</pre>`,
				'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/pexels-pixabay-315788-scaled.jpg',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				5,
				'rYQgy8QDEBI'
			);

			await this.createTrends(
				`ChatGPT taking over`,
				'GPT-3 (Generative Pre-training Transformer 3) is a state-of-the-art language processing model developed by OpenAI.',
				'Tech',
				7,
				`<pre>
GPT-3 (Generative Pre-training Transformer 3) is a state-of-the-art language processing model developed by OpenAI. It uses deep learning techniques to generate human-like text, and has the ability to complete tasks such as translation, summarization, and question answering. GPT-3 has 175 billion parameters, making it one of the largest language models available to date, and it has been trained on a diverse corpus of internet text.
</pre>
<h4>&#8226 Applications of GPT-3</h4>
<pre>
GPT-3 has a wide range of potential applications, from natural language processing and computer-assisted writing to dialogue systems and language translation. Some of the potential use cases for GPT-3 include: 
- Generating natural language text for chatbots and virtual assistants.

- Automating content generation for various industries such as marketing, journalism and education.

- Improving search engine results by understanding natural language queries

- Augmenting human capabilities in areas such as customer support, writing, and translation

- Enabling new use-cases such as language-based games and interactive fiction

</pre>
<h4>&#8226 Limitations of GPT-3</h4>
<pre>
Despite its capabilities, GPT-3 also has its limitations. One of the main challenges of using GPT-3 is that it can sometimes generate text that is nonsensical or biased, as it has been trained on a large dataset of internet text which includes biases and misinformation. Additionally, GPT-3 is not capable of understanding or reasoning about the meaning of the text it generates, and is not able to perform tasks such as image recognition or object detection. As with any machine learning model, GPT-3 also requires fine-tuning and training on specific tasks or domains to achieve optimal performance.
</pre>`,
				'https://miro.medium.com/max/1400/1*3Xb43WwoeYwQIAKYsCQg6g.png',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				6,
				'40Kp_fa8vIw'
			);

			await this.createTrends(
				`Champions leauge is here`,
				'The tournament has a great significance in the world of football, and it is a dream for any football team and their fans to win the Champions League.',
				'Sport',
				6,
				`<pre>
The Champions League is an elite club football tournament organized by the Union of European Football Associations (UEFA) and contested by top-division European clubs. It is one of the most prestigious tournaments in the world and typically features many of the best teams and players from across Europe. The competition has a group stage, where teams are divided into several groups, and they compete against each other in a round-robin format. The top teams from each group advance to the knockout stage, where they compete in a single-elimination format until a winner is crowned.
</pre>
<h4> &#8226 Participating Teams</h4>
<pre>
The tournament features many of the best club teams from around Europe, including powerhouses like Real Madrid, Barcelona, Bayern Munich, Manchester United, and Paris Saint-Germain. These teams are traditionally considered favorites to win the tournament and are consistently among the top teams in the competition. The Champions League also features a number of teams from lesser-known leagues who have qualified for the tournament through their domestic performances. These teams are considered underdogs but have the ability to cause upsets and surprise the top teams.
</pre>
<h4> &#8226 Significance and Impact of the Pandemic</h4>
<pre>
The tournament has a great significance in the world of football, and it is a dream for any football team and their fans to win the Champions League. The tournament provides a platform for players to showcase their skills and for teams to measure themselves against the best in Europe. It's also considered as a Barometer of a team's consistency, strength, and dominance in Europe. However, this year, due to the ongoing pandemic the tournament has been impacted, causing changes in the schedule, format, and even the hosting location of the games, but it is still considered one of the most exciting and highly-anticipated events in the football calendar.
</pre>`,
				'https://pictures.tribuna.com/image/b1987368-648b-4211-a0f4-934afdf351c9',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				7,
				'VubjtnRmhc'
			);

			await this.createTrends(
				`Jordan Peterson strikes again`,
				'Jordan Peterson has built a reputation as one of the most influential and controversial public intellectual of the last decade.',
				'General',
				7,
				`<pre>
Jordan Peterson is a Canadian clinical psychologist, cultural critic, and professor of psychology at the University of Toronto. He is well-known for his critiques of political correctness and his opposition to compelled speech, as well as for his self-help philosophy centered on personal responsibility and individual freedom. He has written several books, including the bestselling "12 Rules for Life: An Antidote to Chaos." He also hosts a popular self-help YouTube channel and podcast.
</pre>
<h4> &#8226 Themes in Jordan Peterson's Work </h4>
<pre>
Many of Jordan Peterson's ideas revolve around the concepts of personal responsibility and individual freedom. He encourages people to take control of their lives, set goals, and take action to achieve them. He also emphasizes the importance of self-discipline, hard work, and the rejection of victimhood. He argues that people should accept the responsibility for their own lives, instead of blaming their problems on external factors. He also promotes traditional values such as marriage, fatherhood, and religion, as well as the importance of understanding and living by archetypal principles.
</pre>
<h4> &#8226 Controversies</h4>
<pre>
Jordan Peterson's ideas and public appearances have led to considerable controversy. Some of his views, such as his critiques of political correctness and his opposition to compelled speech, have led to accusations of transphobia and misogyny. Also, his views on gender identity and related issues have been criticized by some as being scientifically unsupported and potentially harmful. 
He has also received criticism for his views on various social and political issues, with some accusing him of promoting regressive and authoritarian ideas, while others argue that his work and speeches are an important defense of free speech and intellectual diversity.
</pre>`,
				'https://images.thewest.com.au/publication/C-9006612/ec9dcfeb632d09475b810f9ba60fb7c5d986cd71-16x9-x0y0w4182h2352.jpg?imwidth=810&impolicy=wan_v3',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				8,
				'REu_-Y1DKbI'
			);

			await this.createTrends(
				`The Tates arrested`,
				'Andrew Tate is a British entrepreneur, professional kickboxer, and internet personalit , was arrested yesterday in romania form his home along with his brother Tristan',
				'General',
				7,
				`<pre>
Andrew Tate is a British entrepreneur, professional kickboxer, and internet personality. He is known for his appearances on reality TV shows, such as "The Apprentice UK" and "Celebrity Big Brother UK," as well as for his controversial and outspoken views on a variety of topics, which he often shares on social media. He is also a successful businessman and has several companies such as real estate and education.
</pre>
<h4> &#8226 Business Ventures </h4>
<pre>
Andrew Tate has had a successful career as an entrepreneur, starting and running several businesses in different industries. Some of his most notable ventures include real estate, finance, and education. He is the CEO of a real estate investment company and also has a finance education company that focuses on teaching people how to make money through various investment strategies. He is known for his business acumen and his ability to make substantial profits from his ventures.
</pre>
<h4> &#8226 Controversies</h4>
<pre>
 Andrew Tate is known for his controversial and often polarizing views and statements, which he often shares on social media. Some of his views on social issues, such as race and gender, have been criticized as insensitive and offensive. He has also been criticized for his treatment of women and for his aggressive and confrontational attitude towards those who disagree with him.
Additionally, he has been known to engage in online confrontations and public feuds with other public figures and social media personalities, and has been banned by some social media platforms.
</pre>`,
				'https://www.thesouthafrican.com/wp-content/uploads/2022/12/andrew-tate-arrested-414x276.jpeg',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				9,
				'nXFK3UK3o-o'
			);

			await this.createTrends(
				`Federal funds rate spikes`,
				`It's important to keep in mind that interest rates and their effect on the economy is a complex topic and there are many factors to consider.`,
				'Economy',
				13,
				`<pre>
Interest rates, also known as the federal funds rate, are set by the Federal Reserve and are used to control the money supply and inflation. When the Federal Reserve increases interest rates, it makes borrowing money more expensive, which can help control inflation and stabilize the economy. Increasing interest rates can also discourage borrowing and spending, which can slow down the economy.
</pre>
<h4> &#8226 Effects on the economy</h4>
<pre>
When the Federal Reserve increases interest rates, it can have a number of effects on the economy. Higher interest rates tend to slow down economic growth, as borrowing and spending become more expensive, which can lead to slower business growth and hiring, and can also discourage investment in stocks and other riskier assets. Higher interest rates also make it more expensive for consumers to borrow, whether it is for a home, car, or credit card. This can impact consumer spending, which is a major driver of economic growth.
However, increasing interest rates can also benefit savers as they tend to receive higher returns on their savings. It also can strengthen the value of the currency and can attract foreign investment.
</pre>

<h4> &#8226 Effect on industries and individuals</h4>
<pre>
Rising interest rates can have different effects on different industries and individuals. For example, they can benefit banks and other financial institutions by increasing their lending profits. On the other hand, they can hurt borrowers, such as home buyers and credit card holders, by making it more expensive to borrow money. Industries that rely on consumer spending, such as retail and hospitality, may also be negatively impacted by higher interest rates as they may see a reduction in consumer spending.

Additionally, businesses that rely on borrowing to finance their operations, such as small businesses and startups, may find it harder to secure loans and may have to pay more to borrow money. This can make it more difficult for them to expand or invest in new projects.

Finally, it's important to note that interest rate changes may also have an impact on housing prices, as they can have a direct impact on mortgage rates and on the willingness of individuals to invest in the housing market.
</pre>`,
				'https://i.insider.com/5fdb8dbfc910a400192e815d?width=700',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				10,
				'C31c1sF9iys'
			);

			await this.createTrends(
				`Covid-19 back and forth`,
				`The pandemic continues to evolve and its impacts are likely to change over time. Governments and public health organizations around the world are continuing to monitor the situation and adapt their responses accordingly.`,
				'Science',
				15,
				`<pre>
The COVID-19 pandemic, caused by the novel coronavirus, is a global health crisis that began in 2019 and continues to affect countries worldwide. The virus primarily spreads through respiratory droplets and can lead to severe illness and death, particularly in older adults and those with underlying health conditions. The virus has caused widespread panic and disruption to daily life, as well as significant economic impacts.
</pre>
<h4> &#8226 Public Health Measures</h4>
<pre>
In response to the pandemic, governments and public health organizations around the world have implemented a variety of measures to slow the spread of the virus. These measures include things like lockdowns, quarantine requirements, social distancing guidelines, and mask mandates. These actions have been successful in slowing the spread of the virus in many areas, but the pandemic's impact continues to evolve.
Additionally, many countries have also started to implement vaccination programs to reduce the risk of severe illness and death in vulnerable populations, which has been proven to be effective in controlling the spread of the pandemic.
</pre>

<h4> &#8226 Economic Impact</h4>
<pre>
The COVID-19 pandemic has also had a significant impact on the global economy, with many businesses shutting down or struggling to stay afloat due to reduced consumer demand and supply chain disruptions. This has led to a high level of unemployment and economic uncertainty for many individuals and companies. Many governments have implemented economic stimulus measures to try and mitigate the economic damage, such as providing financial assistance to individuals and businesses and implementing low-interest loans for small businesses.

Additionally, the pandemic has also had a major impact on various sectors such as travel, tourism, entertainment and events, and many others. It led to the cancellation of many events and the closing of many businesses such as restaurants and shops, and it has led to a major decline in revenue for many companies.

It is also worth mentioning that the pandemic has highlighted various social and economic inequalities and disparities, with some communities and individuals being disproportionately affected by the health and economic impacts of the virus.
</pre>`,
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx6uKyXkizdLuj9IpZ9gqFpHRwZKDemcMWhJGaQuHF_7oJETG4r9nx03P3OA4CNOVdlrE&usqp=CAU',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				11,
				'BvArUcf-1V4'
			);

			await this.createTrends(
				`Depp-Heard defamation trial`,
				`The pandemic continues to evolve and its impacts are likely to change over time. Governments and public health organizations around the world are continuing to monitor the situation and adapt their responses accordingly.`,
				'Celebrities',
				15,
				`<pre>The defamation trial between Amber Heard and Johnny Depp took place in the United Kingdom in 2020. The trial centered around an article that Heard wrote in 2018 in which she described her experience of being a survivor of domestic abuse. Depp, who was Heard's ex-husband, filed a lawsuit against her, claiming that her article defamed him and caused him to lose work opportunities.
</pre>
<h4>&#8226 The Allegations and the Outcome</h4>
<pre>Heard alleged that Depp physically and emotionally abused her throughout their relationship and provided evidence to support her claims. Depp denied the allegations. The court ultimately found in favor of Heard and ruled that the allegations she made in the article were true, and that Depp had indeed been abusive towards her.
</pre>
<h4>&#8226 The Impact and Follow-Up</h4>
<pre>The trial brought attention to the issue of domestic abuse and the difficulties faced by survivors in coming forward. The outcome of the trial had a significant impact on Depp's career and reputation. The legal case has ended with the court's ruling, and the impact of the trial on Depp and Heard's reputation, career and personal life will continue to be evaluated by the public, media and industry's professionals.
</pre>`,
				'https://deadline.com/wp-content/uploads/2022/12/depp.jpg?w=681&h=383&crop=1',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				12,
				'3h46ia1RrU4'
			);

			await this.createTrends(
				`Nolan's Openheimer`,
				`"Discover the thrilling tale of J. Robert Oppenheimer and the Manhattan Project in Christopher Nolan's highly-anticipated biopic, Oppenheimer. Starring Cillian Murphy, Emily Blunt and Matt Damon.`,
				'Cinema',
				13,
				`<pre>
Every few years, Christopher Nolan delivers another must-see movie. As a writer, director, and producer, he’s one of the most successful auteurs working in cinema, and he’s making blockbusters that match the scale of Spielberg’s or Kubrick’s classics. The Dark Knight Trilogy, Inception, Memento: his body of work is a checkerboard of originality and adaptation. Nolan recently announced that his 12th film will be a change of pace for his filmography; the director is writing and producing a biopic concerning the life of J. Robert Oppenheimer. 
</pre>
<h4> &#8226 What is Oppenheimer About? </h4>
<pre>
Oppenheimer is an adaptation of the book American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer by Martin Sherwin and Kai Bird. The Pulitzer Prize-winning book is being adapted into a movie described as, “An IMAX-shot epic thriller that thrusts the audience into the pulse-pounding paradox of the enigmatic man who must risk destroying the world in order to save it.” Oppenheimer was a scientist most famous for leading The Manhattan Project—the team that developed the atomic bomb for the United States of America in World War II. He later served as chairman of the United States Atomic Energy Commission where he worked to slow the developing nuclear arms race with the Soviet Union.
</pre>
<h4> &#8226 Cast </h4>
<pre>
Frequent Christopher Nolan accomplice Cillian Murphy is set to star as J. Robert Oppenheimer himself. Emily Blunt reteams with Murphy as Katherine Oppenheimer. Katherine was an activist and scientist, and one of many links between Oppenheimer and the communist ideology. Matt Damon joined the cast as Lieutenant General Leslie Groves. Robert Downey Jr joined the film as Lewis Strauss.
</pre>
<h4> &#8226 Release Date </h4>
<pre>
Oppenheimer will be released on July 21, 2023. It will be exclusively in theaters, and it’ll be available in the standard digital cinema projection as well as in IMAX, 70mm, and 35mm formats. The film will open opposite another star-studded blockbuster from an auteur director in Greta Gerwig's Barbie. Nolan is also one of the most vocal proponents of celluloid film and the silver-screen experience.
</pre>`,
				'https://variety.com/wp-content/uploads/2022/12/oppenheimer-trailer.jpg?w=1000',
				`Sun, 25 Dec 2022 19:39:15 GMT`,
				`Tue, 27 Dec 2022 01:22:15 GMT`,
				13,
				'bK6ldnjE3Y0'
			);
		} catch (err) {
			console.log(err);
		}
	}

	static async createUser(
		email,
		password,
		name,
		surname,
		display_name,
		dob,
		gender,
		country,
		bio,
		profile_photo
	) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `INSERT INTO user_profile (email, password, name, surname, display_name, dob, gender, country, bio, profile_photo)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
			dbConnection.run(
				sql,
				[email, password, name, surname, display_name, dob, gender, country, bio, profile_photo],
				function (err) {
					if (err) {
						reject(err);
					}
					resolve();
				}
			);
		});
	}

	static async createFriends(user_id, friends) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `UPDATE user_profile SET friends = ? WHERE user_id = ? ;`;
			dbConnection.run(sql, [friends, user_id], function (err) {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

	static async createUserTrends(user_id, trends) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `UPDATE user_profile SET trends = ? WHERE user_id = ? ;`;
			dbConnection.run(sql, [trends, user_id], function (err) {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

	static async createUserBlockedTrends(user_id, blocked_trends) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `UPDATE user_profile SET blocked_trends = ? WHERE user_id = ? ;`;
			dbConnection.run(sql, [blocked_trends, user_id], function (err) {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
	}

	static async createNormalPosts(
		author_id,
		textual_input,
		media_location,
		creation_date,
		life_event,
		nshared_id,
		sshared_id,
		isEdited
	) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `INSERT INTO normal_post (author_id, textual_input, media_location, creation_date, life_event, nshared_id, sshared_id, isEdited)
      VALUES (?,?,?,?,?,?,?,?);`;
			dbConnection.run(
				sql,
				[
					author_id,
					textual_input,
					media_location,
					creation_date,
					life_event,
					nshared_id,
					sshared_id,
					isEdited
				],
				function (err) {
					if (err) {
						reject(err);
					}
					resolve();
				}
			);
		});
	}

	static async createTrends(
		title,
		summary,
		tags,
		time_needed,
		textual_input,
		media_location,
		creation_date,
		last_updated,
		ranking,
		video_id
	) {
		return new Promise((resolve, reject) => {
			const dbConnection = require('./databaseScratch.js').db;
			const sql = `INSERT INTO trend (title, summary, tags, time_needed, textual_input, media_location, creation_date, last_updated,ranking, video_id)
      VALUES (?,?,?,?,?,?,?,?,?,? );`;
			dbConnection.run(
				sql,
				[
					title,
					summary,
					tags,
					time_needed,
					textual_input,
					media_location,
					creation_date,
					last_updated,
					ranking,
					video_id
				],
				function (err) {
					if (err) {
						reject(err);
					}
					resolve();
				}
			);
		});
	}
}

module.exports = DatabaseScratch;
