export const towns = [
  { id:'caldwell', name:'Caldwell', tagline:'Wild West heritage + Borderlands stories', lat:37.032, lng:-97.606, description:'Frontier history, public art, Czech heritage, local festivals, historic architecture, and deep Caldwell side quests.', highlights:['Turtle Trail','Fallen Badges of Caldwell','Border Queen Museum','Czech heritage','Carnegie Library'] },
  { id:'wellington', name:'Wellington', tagline:'Glass, quilts, downtown stops', lat:37.265, lng:-97.397, description:'A central Sumner County stop with museums, local shops, and easy I-35 access.', highlights:['National Glass Museum','BeeHive Quilt Shop','Downtown dining','County seat'] },
  { id:'southhaven', name:'South Haven', tagline:'Buffalo, murals, open prairie', lat:37.049, lng:-97.405, description:'A border stop anchored by live buffalo, a photo-worthy mural, and rural character.', highlights:['Live buffalo','Buffalo mural','Kansas/Oklahoma border','Small town photo stop'] },
  { id:'argonia', name:'Argonia', tagline:'First woman mayor + rocket energy', lat:37.267, lng:-97.765, description:'A proud history town connected to Susanna Salter and modern rocket competition energy.', highlights:['Susanna Salter House','First woman mayor','Rocket competition'] },
  { id:'conway', name:'Conway Springs', tagline:'Springs, water, and rural welcome', lat:37.391, lng:-97.642, description:'Western Sumner County stop built around the Spring House and local water stories.', highlights:['Historic Spring House','Small town main street','Rural hospitality'] },
  { id:'belleplaine', name:'Belle Plaine', tagline:'Botanical beauty on the prairie', lat:37.394, lng:-97.281, description:'A garden and festival-friendly town anchored by Bartlett Arboretum and seasonal color.', highlights:['Bartlett Arboretum','Tulip season','Gardens','Photography'] },
  { id:'oxford', name:'Oxford', tagline:'The Old Mill and river-town character', lat:37.274, lng:-97.168, description:'A quiet heritage stop with Old Mill history and a strong sense of place.', highlights:['Old Mill','Historic architecture','River-town feel'] },
  { id:'mulvane', name:'Mulvane', tagline:'Gateway stops and entertainment', lat:37.475, lng:-97.244, description:'A northeast gateway with casino traffic, visitor services, and quick access from Wichita and I-35.', highlights:['Kansas Star Casino','Gateway from Wichita','Food and lodging','Events'] }
];

export const routes = [
  { id:'wildwest', name:'Wild West Route', theme:'History', duration:'2–3.5 hours', miles:'~120 miles', towns:['Caldwell','South Haven','Wellington'], description:'Frontier stories, borderland grit, museums, murals, and towns with a strong sense of place.', stops:['Caldwell Wild West stop','South Haven buffalo mural','Wellington museum stop'] },
  { id:'heritage', name:'Heritage & Handmade', theme:'Culture', duration:'Half day', miles:'~95 miles', towns:['Wellington','Caldwell','Belle Plaine','Oxford'], description:'Glass, quilts, gardens, Czech heritage, local making, and small-town downtowns.', stops:['National Glass Museum','Kolache side quest','Bartlett Arboretum','Old Mill'] },
  { id:'family', name:'Family Side Quest Loop', theme:'Family', duration:'1–2 hours', miles:'Flexible', towns:['Caldwell','South Haven','Argonia'], description:'Short, playful stops designed for photos, badges, and kid-friendly discovery.', stops:['Cowboy selfie','Buffalo photo','Rocket story','Passport stamp'] },
  { id:'i35', name:'I-35 Quick Exit', theme:'Traveler', duration:'60–180 minutes', miles:'Flexible', towns:['Wellington','Mulvane','Caldwell'], description:'A fast detour for road-trippers who have one to three hours and want a memorable stop.', stops:['Food stop','Photo stop','Local shopping','Earn a digital stamp'] }
];

export const quests = [
  { id:'turtles', title:'Turtle Trail', town:'Caldwell', total:12, type:'QR Quest', reward:'Turtle Master badge', description:'Find all 12 Caldwell turtle sculptures, meet the artists, and unlock Turtle Trail progress.' },
  { id:'fallen', title:'Fallen Badges of Caldwell', town:'Caldwell', total:8, type:'QR Quest', reward:'Fallen Badges Historian', description:'Collect all 8 Caldwell lawman cards and remember the badges who served during the Border Queen era.' },
  { id:'women', title:'Women of the Border Queen', town:'Caldwell', total:12, type:'QR Quest', reward:'Border Queen Historian', description:'Collect 12 frontier women cards connected to Caldwell and the Border Queen era.' },
  { id:'muralquest', title:'Caldwell Mural Quest', town:'Caldwell', total:20, type:'Photo Quest', reward:'Caldwell Mural Master', description:'Follow a walking mural tour through Main Street, alleys, ghost signs, public art, and bonus indoor murals.' },
  { id:'characters', title:'Characters of Caldwell', town:'Caldwell', total:8, type:'Photo Quest', reward:'Community Storykeeper', description:'A respectful portrait-and-story collection for local people who give Caldwell its personality and welcome.' },
  { id:'walking', title:'Historic Walking Tour', town:'Caldwell', total:12, type:'GPS Quest', reward:'Border Queen Walker', description:"Follow GPS and QR stops through Caldwell's downtown history." },
  { id:'redlight', title:'Red Light Saloon Mystery', town:'Caldwell', total:10, type:'QR Quest', reward:'Saloon Sleuth', description:"A story-based scavenger hunt inspired by Caldwell's Wild West past." },
  { id:'buffalo', title:'Buffalo References Roundup', town:'Route-wide', total:5, type:'Photo Quest', reward:'Buffalo Hunter', description:'Find buffalo references along a route: murals, live buffalo, signs, stories, and souvenirs.' }
];

export const stamps = towns.map(t => ({ id:t.id, town:t.name, symbol: {caldwell:'🤠',wellington:'🏛️',southhaven:'🐃',argonia:'🚀',conway:'💧',belleplaine:'🌷',oxford:'⚙️',mulvane:'🎲'}[t.id] || '📍', message:`You found ${t.name}.` }));

const asset = (name, ext='jpg') => `/assets/${name}.${ext}`;

export const collections = [
  { id:'turtles', title:'Turtle Trail', description:'12 Caldwell turtle sculptures and artist-inspired visits.', items: ['Outlaw','Bartholomew','Sunny','Sonny','Ampersand','Cosmo','Earp','Doris','Mosey','Blanche','Polka Dot','Ernie'].map((name,i)=>({ id:`turtle${i+1}`, number:i+1, name, collection:'Turtle Trail', front:asset(`Turtle${String(i+1).padStart(2,'0')}Photo`,'jpg'), back:asset(`Turtle${String(i+1).padStart(2,'0')}Sketch`, i===0||i===5||i===6?'jpg':'png'), payload:`ruralroutes://unlock/turtle/${i+1}` })) },
  { id:'fallen', title:'Fallen Badges', description:'Caldwell lawmen remembered through collectible cards.', items: ['George W. Flatt','George S. Brown','Cassius M. Hollister','Mike Meagher','Frank Hunt','Henry Newton Brown','Ben Wheeler','William Horseman'].map((name,i)=>({ id:`badge${i+1}`, number:i+1, name, collection:'Fallen Badges', front:asset(`FallenBadge${String(i+1).padStart(2,'0')}Front`), back:asset(`FallenBadge${String(i+1).padStart(2,'0')}Back`), payload:`ruralroutes://unlock/fallenbadge/${i+1}` })) },
  { id:'women', title:'Women of the Border Queen', description:'Frontier women and regional legends connected to Caldwell stories.', items: ['Mag Wood','Madam Mustache','Big Nose Kate','Dora Hand','Dora DuFran','Calamity Jane','Mattie Blaylock','Mollie Johnson','Squirrel-Toothed Alice','Mystery Woman','Border Queen Entrepreneur','Frontier Survivor'].map((name,i)=>({ id:`queen${i+1}`, number:i+1, name, collection:'Women of the Border Queen', front:asset(`BorderQueen${String(i+1).padStart(2,'0')}Front`), back:asset(`BorderQueen${String(i+1).padStart(2,'0')}Back`), payload:`ruralroutes://unlock/borderqueen/${i+1}` })) },
  { id:'gunfighters', title:'Gamblers & Gunfighters', description:'Western figures tied to frontier-era storytelling.', items: ['Doc Holliday','Wyatt Earp','Bat Masterson','Billy the Kid','Henry Newton Brown','George Spears','Pat Desmond','Jim Talbot'].map((name,i)=>({ id:`gun${i+1}`, number:i+1, name, collection:'Gamblers & Gunfighters', front:asset(`GunfighterFront${String(i+1).padStart(2,'0')}`), back:asset(`GunfighterBack${String(i+1).padStart(2,'0')}`), payload:`ruralroutes://unlock/gunfighter/${i+1}` })) },
  { id:'legends', title:'Borderlands Legends', description:'People and stories that help define the region.', items: ['Jesse Chisholm','Byron Berline','Max Showalter','Gladys Anderson Emerson','The Dinning Sisters','Henry Newton Brown','Mag Wood','Polly Bright'].map((name,i)=>({ id:`legend${i+1}`, number:i+1, name, collection:'Borderlands Legends', front:asset(`LegendFront${String(i+1).padStart(2,'0')}`), back:asset(`LegendBack${String(i+1).padStart(2,'0')}`), payload:`ruralroutes://unlock/legend/${i+1}` })) }
];

export const murals = [
 ['Welcome to Caldwell','South wall of Roop\'s Relics','Gateway mural for the Caldwell art district.'],
 ['Library Bookshelf','Alley behind Caldwell Public Library','A colorful bookshelf mural celebrating books and learning.'],
 ["Children's Library Mural",'Inside Caldwell Public Library','Indoor children\'s room mural.'],
 ['Heritage Park Mural','Heritage Park area','Local heritage mural.'],
 ["Joe B's Saloon Marker","Back wall of Joe B's Bar alley",'Small marker mural identifying the saloon location.'],
 ['Where Everybody Knows Your Name',"Near Joe B's Bar",'One of the first Caldwell Art Brigade murals.'],
 ['Bluff Creek Cattle Drive',"Back wall of Joe B's Bar",'A cattle drive crossing Bluff Creek south of Caldwell.'],
 ['Tuff Buffs & Cool Mules','Alley behind Sugar Sisters','Postage-stamp style mural honoring buffalo and mules.'],
 ['The Gunslinger','Behind and south of the Opera House','First CAB mural from 2016, painted on original limestone.'],
 ['Kansas State Reptile Turtle','Above The Spot','Honors the Ornate Box Turtle.'],
 ["Last Chance Bar & Grill Murals",'Inside Last Chance Bar & Grill','Three indoor murals.'],
 ["Doc Small's",'Back of Dr. Small\'s Dental Office, 3 S Main','Vintage advertisement-style tribute.'],
 ['Rigsby Drug Ghost Sign','Caldwell Pharmacy area','Revived ghost mural advertisement.'],
 ['Cherokee Strip Land Run','Back side of City Hall/original jail alley','Large mural depicting the Cherokee Strip opening.'],
 ['Caldwell Messenger Advertisement','East end/back door of Caldwell Messenger','Small advertisement mural near hotel rooms and coffee lounge.'],
 ['Coca-Cola Ghost Sign','North side of the mortuary','Classic Coca-Cola wall sign.'],
 ['Chisholm Trail Post Office Mural','Inside the U.S. Post Office','Bonus indoor stop during post office hours.'],
 ['Sinclair Service Station Tribute','Back wall','Nostalgic dedication to Sinclair gas stations.'],
 ["St. Martin's Catholic Church Mural",'Behind the altar, St. Martin\'s Catholic Church','Bonus indoor church stop.'],
 ['Bakery Flowers Mural','Behind Pekarna Bakery','Cheerful floral mural behind the local bakery.']
].map((m,i)=>({ id:`mural${i+1}`, number:i+1, title:m[0], location:m[1], description:m[2] }));
