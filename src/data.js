export const towns = [
  {id:'caldwell', name:'Caldwell', label:'Featured demo town', tagline:'The Border Queen: public art, turtle sculptures, lawmen, frontier women, and walkable quests.', lat:37.0334, lng:-97.6067, hero:'Turtle Trail • Mural Quest • Fallen Badges', accent:'gold'},
  {id:'wellington', name:'Wellington', label:'County seat', tagline:'Rail heritage, shops, events, civic stories, and route connections.', lat:37.2653, lng:-97.3717, hero:'Downtown Discoveries', accent:'blue'},
  {id:'argonia', name:'Argonia', label:'Trailblazers', tagline:'First woman mayor, rockets, prairie innovation, and big stories from a small town.', lat:37.2670, lng:-97.7656, hero:'Argonia Trailblazers', accent:'green'},
  {id:'south-haven', name:'South Haven', label:'Gateway', tagline:'An I-35 gateway stop with backroad access and rural-route day trip potential.', lat:37.0492, lng:-97.4056, hero:'Gateway Stops', accent:'blue'},
  {id:'conway-springs', name:'Conway Springs', label:'Community stop', tagline:'Small-town gathering place with local food, events, and route loops.', lat:37.3903, lng:-97.6423, hero:'Community Stops', accent:'green'},
  {id:'belle-plaine', name:'Belle Plaine', label:'Garden + Main', tagline:'Historic downtown, Bartlett Arboretum, and family-friendly day-trip appeal.', lat:37.3945, lng:-97.2814, hero:'Garden & Main Street', accent:'gold'},
  {id:'oxford', name:'Oxford', label:'River town', tagline:'Brick streets, Walnut River setting, and heritage-route stops.', lat:37.2742, lng:-97.1689, hero:'River Town Stops', accent:'blue'},
  {id:'mulvane', name:'Mulvane', label:'Connector', tagline:'Route connector with murals, food stops, and family discoveries.', lat:37.4745, lng:-97.2439, hero:'Connector Quest', accent:'green'}
];

const turtleNames = [
 ['Outlaw','Nelson P. Nelson'],['Bartholomew','Laura Ireland'],['Sunny','Laura Ireland'],['Sonny','Jasinta (Jessy) Wencel-Potts'],['Ampersand','Jill Kuehny'],['Cosmo','Dr. Jen Kern'],['Earp','Sammie Strnad'],['Doris','Brooke Cink'],['Mosey','Brooke Cink'],['Blanche','Brooke Cink'],['Polka Dot','Brenda Lebeda-Almond'],['Ernie','Brenda Lebeda-Almond']
];
export const turtles = turtleNames.map((t,i)=>({id:`turtle-${i+1}`, number:i+1, name:t[0], subtitle:`Artist: ${t[1]}`, artist:t[1], town:'Caldwell', points:50, type:'Turtle Sculpture', qr:`RR:TURTLE:${i+1}`, image:`/assets/turtle${String(i+1).padStart(2,'0')}-photo.jpeg`, sketch:`/assets/turtle${String(i+1).padStart(2,'0')}-sketch.png`, hint:'Look for a painted ornate box turtle sculpture near a public-facing stop in Caldwell.'}));

const fallenBadges = ['Marshal Mike Meagher','Deputy Marshal Harry Hill','Marshal George Flatt','Deputy Marshal Ed Burch','Marshal James O\'Brien','Deputy Marshal James McCormick','Deputy Sheriff Henry Brown','Caldwell Fallen Badge'];
const queens = ['Eleanor “Madam Mustache” Dumont','Libby “Squirrel-toothed Alice” Thompson','Mag Woods','Big Nose Kate','Border Queen Entertainer','Frontier Businesswoman','Prairie Homesteader','Railroad Hotel Keeper','Chisholm Trail Hostess','Caldwell Saloon Woman','Borderlands Survivor','Caldwell Story Keeper'];
const legends = ['Byron Berline','Max Showalter','Jesse Chisholm','Gladys Anderson Emerson','The Dinning Sisters','Susanna Madora Salter','Borderlands Pioneer','Prairie Innovator'];

function cardItems(prefix, names, points, frontPrefix){return names.map((name,i)=>({id:`${prefix}-${i+1}`, number:i+1, name, subtitle: prefix==='badge'?'Fallen Badges of Caldwell':prefix==='queen'?'Women of the Border Queen':'Borderlands Legends', town: prefix==='legend'?'Regional':'Caldwell', points, type:'Collectible Card', front:`/assets/${frontPrefix}${String(i+1).padStart(2,'0')}-front.jpg`, back:`/assets/${frontPrefix}${String(i+1).padStart(2,'0')}-back.jpg`, qr:`RR:${prefix.toUpperCase()}:${i+1}`, hint:'Unlock from the story card QR or through demo mode.'}))}

export const collections = [
 {id:'turtles', title:'Caldwell Turtle Trail', short:'Turtle Trail', type:'QR Quest', town:'Caldwell', reward:'Turtle Master badge', icon:'🐢', color:'gold', description:'Find all 12 Caldwell turtle sculptures, meet the artists, and unlock Turtle Trail progress.', items:turtles},
 {id:'murals', title:'Caldwell Mural Quest', short:'Mural Quest', type:'Photo Quest', town:'Caldwell', reward:'Caldwell Mural Master stamp', icon:'🎨', color:'blue', description:'Follow a walking mural tour through Main Street, alleys, ghost signs, public art, and bonus indoor murals.', items:Array.from({length:12},(_,i)=>({id:`mural-${i+1}`, number:i+1, name:`Mural Stop ${i+1}`, subtitle:'Caldwell walking art stop', town:'Caldwell', points:35, type:'Mural Stop', qr:`RR:MURAL:${i+1}`, hint:'Use the walking-tour handout and check off the mural stop.'}))},
 {id:'badges', title:'Fallen Badges of Caldwell', short:'Fallen Badges', type:'History Cards', town:'Caldwell', reward:'Fallen Badges completion stamp', icon:'⭐', color:'slate', description:'Collect all 8 Caldwell lawman cards and remember the badges who served during the Border Queen era.', items:cardItems('badge',fallenBadges,40,'fallenbadge')},
 {id:'queens', title:'Women of the Border Queen', short:'Border Queen', type:'History Cards', town:'Caldwell', reward:'Border Queen collection stamp', icon:'👒', color:'rose', description:'Collect 12 frontier women cards connected to Caldwell and the Border Queen era.', items:cardItems('queen',queens,40,'borderqueen')},
 {id:'legends', title:'Borderlands Legends', short:'Legends', type:'Story Cards', town:'Regional', reward:'Legends badge', icon:'🎻', color:'green', description:'Discover musicians, performers, pioneers, and local icons from the region.', items:cardItems('legend',legends,35,'legend')}
];

export const caldwellStops = [
 {id:'visitor-start', title:'Start at Main Street', kind:'Orientation', note:'Use Caldwell as the full demonstration town for sponsors and tourism partners.', x:22, y:50},
 {id:'turtle-loop', title:'Turtle Trail loop', kind:'QR Quest', note:'Sculpture stops unlock artist stories and progress.', x:42, y:38},
 {id:'mural-loop', title:'Mural walking tour', kind:'Photo Quest', note:'Outdoor murals, ghost signs, and indoor bonus art.', x:58, y:52},
 {id:'history-cards', title:'History card cluster', kind:'Story Cards', note:'Fallen Badges and Women of the Border Queen.', x:72, y:32},
 {id:'reward-stop', title:'Passport reward stop', kind:'Reward', note:'Claim stamps, badges, or sponsor coupons.', x:78, y:70}
];

export const achievements = [
 {id:'first-scan', title:'First Scan', rule:'Unlock any Rural Routes QR code', reward:50, icon:'🔓'},
 {id:'turtle-12', title:'Turtle Master', rule:'Find all 12 turtle sculptures', reward:250, icon:'🐢'},
 {id:'mural-8', title:'Mural Walker', rule:'Check in at 8 mural stops', reward:150, icon:'🎨'},
 {id:'caldwell-day', title:'Caldwell Day Tripper', rule:'Earn 500 points in Caldwell', reward:100, icon:'🧭'},
 {id:'golden', title:'Golden Card Claim', rule:'Complete a golden requirement quest', reward:500, icon:'🏆'}
];

export const adminDefaults = {
  headline:'Adventure first. Collection second.',
  sponsor:'Demo sponsor slot available',
  announcement:'Phase 2 polished Caldwell demo: ready for sponsor and tourism feedback.',
  pointsPerScan:50,
  gpsRadius:150
};
