export const seed = {
  towns: [
    { id:'TOWN-CALDWELL', name:'Caldwell', slug:'caldwell', latitude:37.0322, longitude:-97.6070 },
    { id:'TOWN-WELLINGTON', name:'Wellington', slug:'wellington', latitude:37.2653, longitude:-97.3717 },
    { id:'TOWN-ARGONIA', name:'Argonia', slug:'argonia', latitude:37.2678, longitude:-97.7662 },
    { id:'TOWN-MULVANE', name:'Mulvane', slug:'mulvane', latitude:37.4745, longitude:-97.2431 },
    { id:'TOWN-BELLE-PLAINE', name:'Belle Plaine', slug:'belle-plaine', latitude:37.3945, longitude:-97.2823 },
    { id:'TOWN-OXFORD', name:'Oxford', slug:'oxford', latitude:37.2745, longitude:-97.1689 },
    { id:'TOWN-CONWAY-SPRINGS', name:'Conway Springs', slug:'conway-springs', latitude:37.3906, longitude:-97.6423 },
    { id:'TOWN-SOUTH-HAVEN', name:'South Haven', slug:'south-haven', latitude:37.0498, longitude:-97.4067 }
  ],
  quests: [
    { id:'turtle-trail', title:'Turtle Trail', shortName:'Turtle', emoji:'🐢', subtitle:'Find Caldwell’s 12 public art turtles.', collection:'Caldwell Art Adventure', mapTitle:'Turtle Trail Map', targetsSource:'turtles' },
    { id:'mural-quest', title:'Mural Quest', shortName:'Mural', emoji:'🎨', subtitle:'Discover Caldwell murals through clues.', collection:'Caldwell Public Art', mapTitle:'Mural Quest Map', targetsSource:'muralStops' },
    { id:'historic-caldwell', title:'Historic Caldwell', shortName:'Historic Stop', emoji:'🏛️', subtitle:'Border Queen sites, frontier stories, and civic landmarks.', collection:'Heritage Story Path', mapTitle:'Historic Caldwell Map', targetsSource:'historicStops' },
    { id:'local-rewards', title:'Local Rewards', shortName:'Reward', emoji:'🎁', subtitle:'Find buy-local bonuses tied to adventures.', collection:'Buy Local Rewards', mapTitle:'Local Rewards Map', targetsSource:'businesses' }
  ],
  targets: {
    turtles: [
      { id:'TURT-01', cardId:'TURT-01', icon:'1', name:'Outlaw', coordinate:{lat:37.031325,lng:-97.611305}, radiusMeters:25, hint:'Look for the Outlaw mascot story that joins Caldwell and South Haven.', qrPayload:'ruralroutes://unlock/turtle/1' },
      { id:'TURT-02', cardId:'TURT-02', icon:'2', name:'Bartholomew', coordinate:{lat:37.032519,lng:-97.610083}, radiusMeters:25, hint:'A turtle about community hands and school spirit.', qrPayload:'ruralroutes://unlock/turtle/2' },
      { id:'TURT-03', cardId:'TURT-03', icon:'3', name:'Sunny', coordinate:{lat:37.032608,lng:-97.604088}, radiusMeters:25, hint:'Think Kansas sunflower.', qrPayload:'ruralroutes://unlock/turtle/3' },
      { id:'TURT-04', cardId:'TURT-04', icon:'4', name:'Sonny', coordinate:{lat:37.032422,lng:-97.607055}, radiusMeters:25, hint:'Prairie life, sunflowers, wind and sky.', qrPayload:'ruralroutes://unlock/turtle/4' },
      { id:'TURT-05', cardId:'TURT-05', icon:'5', name:'Ampersand', coordinate:{lat:37.032203,lng:-97.606828}, radiusMeters:25, hint:'The name means connection.', qrPayload:'ruralroutes://unlock/turtle/5' },
      { id:'TURT-06', cardId:'TURT-06', icon:'6', name:'Cosmo', coordinate:{lat:37.032647,lng:-97.606863}, radiusMeters:25, hint:'Color, imagination, and playful geometric energy.', qrPayload:'ruralroutes://unlock/turtle/6' },
      { id:'TURT-07', cardId:'TURT-07', icon:'7', name:'Earp', coordinate:{lat:37.032617,lng:-97.607728}, radiusMeters:25, hint:'Caldwell’s welcome turtle at City Hall.', qrPayload:'ruralroutes://unlock/turtle/7' },
      { id:'TURT-08', cardId:'TURT-08', icon:'8', name:'Doris', coordinate:{lat:37.033500,lng:-97.607042}, radiusMeters:25, hint:'Look for Bluejay pride.', qrPayload:'ruralroutes://unlock/turtle/8' },
      { id:'TURT-09', cardId:'TURT-09', icon:'9', name:'Mosey', coordinate:{lat:37.030361,lng:-97.607033}, radiusMeters:25, hint:'Mosaic art and garden-like color.', qrPayload:'ruralroutes://unlock/turtle/9' },
      { id:'TURT-10', cardId:'TURT-10', icon:'10', name:'Blanche', coordinate:{lat:37.030686,lng:-97.606797}, radiusMeters:25, hint:'A decorative folk-art shell in bright color.', qrPayload:'ruralroutes://unlock/turtle/10' },
      { id:'TURT-11', cardId:'TURT-11', icon:'11', name:'Polka Dot', coordinate:{lat:37.031495,lng:-97.606858}, radiusMeters:25, hint:'Czech heritage and folk-art motifs.', qrPayload:'ruralroutes://unlock/turtle/11' },
      { id:'TURT-12', cardId:'TURT-12', icon:'12', name:'Ernie', coordinate:{lat:37.031497,lng:-97.607033}, radiusMeters:25, hint:'Family farm heritage and wheat country.', qrPayload:'ruralroutes://unlock/turtle/12' }
    ],
    muralStops: [
      { id:'MURAL-01', icon:'M1', name:'Downtown Welcome Mural', coordinate:{lat:37.03220,lng:-97.60755}, radiusMeters:35, hint:'Look for a large welcome wall near downtown.', cardId:'MURAL-01' },
      { id:'MURAL-02', icon:'M2', name:'Cattle Drive Mural', coordinate:{lat:37.03185,lng:-97.60705}, radiusMeters:35, hint:'Think Chisholm Trail and hoofbeats.', cardId:'MURAL-02' },
      { id:'MURAL-03', icon:'M3', name:'Border Queen History Mural', coordinate:{lat:37.03270,lng:-97.60715}, radiusMeters:35, hint:'Look for old west stories painted downtown.', cardId:'MURAL-03' },
      { id:'MURAL-04', icon:'M4', name:'Community Art Wall', coordinate:{lat:37.03310,lng:-97.60680}, radiusMeters:35, hint:'A colorful wall near where people gather.', cardId:'MURAL-04' }
    ],
    historicStops: [
      { id:'HIST-01', icon:'H1', name:'Caldwell City Hall', coordinate:{lat:37.032617,lng:-97.607728}, radiusMeters:35, hint:'Start where civic Caldwell welcomes visitors.', cardId:'HIST-01' },
      { id:'HIST-02', icon:'H2', name:'Carnegie Library Story Stop', coordinate:{lat:37.03292,lng:-97.60738}, radiusMeters:35, hint:'A landmark of learning and civic pride.', cardId:'HIST-02' },
      { id:'HIST-03', icon:'H3', name:'Border Queen Downtown', coordinate:{lat:37.03198,lng:-97.60738}, radiusMeters:40, hint:'Frontier Caldwell lives along Main Street.', cardId:'HIST-03' }
    ],
    businesses: []
  },
  businesses: [
    { id:'BIZ-CZECH-BAKERY', name:'Czech Heritage Bakery', category:'Bakery', coordinate:{lat:37.03155,lng:-97.60670}, promotion:{id:'PROMO-KOLACHE-50', title:'Kolache Explorer Bonus', reward:'+50 Explorer Points', requirement:'Scan after purchase', qrPayload:'promo://kolache-50'} },
    { id:'BIZ-TURTLE-GIFTS', name:'Turtle Trail Gift Shop', category:'Souvenirs', coordinate:{lat:37.03170,lng:-97.60710}, promotion:{id:'PROMO-TURTLE-GIFT', title:'Turtle Trail Souvenir Reward', reward:'+75 Explorer Points', requirement:'Complete 3 turtle discoveries', qrPayload:'promo://turtle-gift'} },
    { id:'BIZ-COFFEE', name:'Main Street Coffee', category:'Coffee', coordinate:{lat:37.03230,lng:-97.60730}, promotion:{id:'PROMO-COFFEE-UPGRADE', title:'Road Trip Coffee Bonus', reward:'+25 Explorer Points', requirement:'Scan at counter', qrPayload:'promo://coffee-upgrade'} }
  ],
  cards: [
    { id:'BL-01', collection:'Borderlands Legends', name:'Jesse Chisholm', isGolden:true, front:'LegendFront01.jpg', back:'LegendBack01.jpg' },
    { id:'BL-02', collection:'Borderlands Legends', name:'Byron Berline', front:'LegendFront02.jpg', back:'LegendBack02.jpg' },
    { id:'BL-03', collection:'Borderlands Legends', name:'Max Showalter', front:'LegendFront03.jpg', back:'LegendBack03.jpg' },
    { id:'BL-04', collection:'Borderlands Legends', name:'Gladys Anderson Emerson', front:'LegendFront04.jpg', back:'LegendBack04.jpg' },
    { id:'BL-05', collection:'Borderlands Legends', name:'Dinning Sisters', front:'LegendFront05.jpg', back:'LegendBack05.jpg' },
    { id:'BL-06', collection:'Borderlands Legends', name:'Susanna M. Salter', isGolden:true, front:'LegendFront06.jpg', back:'LegendBack06.jpg' },
    { id:'BL-07', collection:'Borderlands Legends', name:'Walter P. Chrysler', front:'LegendFront07.jpg', back:'LegendBack07.jpg' },
    { id:'BL-08', collection:'Borderlands Legends', name:'Pawnee Bill', front:'LegendFront08.jpg', back:'LegendBack08.jpg' },
    ...Array.from({length:12}, (_,i) => ({ id:`TURT-${String(i+1).padStart(2,'0')}`, collection:'Turtle Trail', name:['Outlaw','Bartholomew','Sunny','Sonny','Ampersand','Cosmo','Earp','Doris','Mosey','Blanche','Polka Dot','Ernie'][i], front:`Turtle${String(i+1).padStart(2,'0')}Photo.jpeg`, back:`Turtle${String(i+1).padStart(2,'0')}Sketch.${[2,3,4,5,8,9,10,11,12].includes(i+1)?'png':'jpeg'}` }))
  ],
  achievements: [
    { id:'ACH-FIRST', name:'First Footsteps', description:'Unlock your first discovery.', type:'discoveries', count:1 },
    { id:'ACH-TURTLE-SPOTTER', name:'Turtle Spotter', description:'Find 3 turtles.', type:'discoveries', count:3 },
    { id:'ACH-TURTLE-MASTER', name:'Keeper of the Shell', description:'Complete all Turtle Trail discoveries.', type:'collection', source:'turtles' },
    { id:'ACH-GOLDEN', name:'Golden Legacy', description:'Collect a golden card.', type:'golden' }
  ]
};
seed.targets.businesses = seed.businesses.map(b => ({ id:b.id, icon:'$', name:b.name, coordinate:b.coordinate, radiusMeters:30, hint:`${b.promotion.title}: ${b.promotion.requirement}`, cardId:b.promotion.id, qrPayload:b.promotion.qrPayload }));
