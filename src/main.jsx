import React, { useMemo, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Compass, MapPinned, ScanLine, Trophy, User, Gift, Map, CreditCard, Lock, Star, Navigation, Eye, EyeOff, Route, Store, Bell, HeartPulse } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { supabase, isSupabaseConfigured } from './lib/supabase.js';
import { seed } from './data/seed.js';

const asset = (name) => `/assets/${name}`;
const metersToMiles = (meters) => meters / 1609.344;
const ft = (meters) => Math.round(meters * 3.28084);

function haversine(a, b) {
  if (!a || !b) return Infinity;
  const R = 6371000;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const s = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function bearing(from, to) {
  if (!from || !to) return 0;
  const lat1 = from.lat * Math.PI / 180;
  const lat2 = to.lat * Math.PI / 180;
  const dLon = (to.lng - from.lng) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function useGeo() {
  const [loc, setLoc] = useState(null);
  const [heading, setHeading] = useState(null);
  const [status, setStatus] = useState('Location not started');
  useEffect(() => {
    if (!navigator.geolocation) { setStatus('Geolocation unavailable'); return; }
    const id = navigator.geolocation.watchPosition(
      (pos) => { setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }); setStatus('Location active'); },
      (err) => setStatus(err.message),
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    );
    const onOrient = (event) => {
      const h = event.webkitCompassHeading ?? (event.alpha == null ? null : 360 - event.alpha);
      if (Number.isFinite(h)) setHeading(h);
    };
    window.addEventListener('deviceorientationabsolute', onOrient, true);
    window.addEventListener('deviceorientation', onOrient, true);
    return () => { navigator.geolocation.clearWatch(id); window.removeEventListener('deviceorientationabsolute', onOrient); window.removeEventListener('deviceorientation', onOrient); };
  }, []);
  return { loc, heading, status };
}

function useData() {
  const [data, setData] = useState(seed);
  const [source, setSource] = useState('local demo seed');
  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) return;
      try {
        const [towns, cards, locations, achievements] = await Promise.all([
          supabase.from('towns').select('*'),
          supabase.from('cards').select('*'),
          supabase.from('locations').select('*'),
          supabase.from('achievements').select('*')
        ]);
        if (!towns.error && towns.data?.length) {
          setSource('Supabase live content + local demo quest layer');
          setData(prev => ({ ...prev, towns: towns.data, supabaseCards: cards.data ?? [], supabaseLocations: locations.data ?? [], supabaseAchievements: achievements.data ?? [] }));
        }
      } catch (e) { console.warn('Supabase fallback', e); }
    }
    load();
  }, []);
  return { data, source };
}

function iconHtml(color, label) {
  return L.divIcon({
    html: `<div class="map-pin" style="--pin:${color}">${label}</div>`,
    className: 'rr-pin',
    iconSize: [34, 34], iconAnchor: [17, 17]
  });
}

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => { if (center) map.setView([center.lat, center.lng], map.getZoom() || 15); }, [center]);
  return null;
}

function UserMarker({ loc, heading }) {
  if (!loc) return null;
  return <Marker position={[loc.lat, loc.lng]} icon={L.divIcon({ html: `<div class="you-dot"><span class="heading-cone" style="transform:rotate(${heading ?? 0}deg)"></span></div>`, className: 'you-icon', iconSize: [42,42], iconAnchor: [21,21] })}><Popup>You are here</Popup></Marker>;
}

function TargetArrowOverlay({ loc, target, revealed }) {
  if (!loc || !target || !revealed) return null;
  const angle = bearing(loc, target.coordinate);
  const distance = haversine(loc, target.coordinate);
  return <div className="target-arrow-hud">
    <div className="target-arrow" style={{ transform: `rotate(${angle}deg)` }}>▲</div>
    <div><strong>Target</strong><br />{ft(distance)} ft</div>
  </div>;
}

function QuestMap({ quest, targets, loc, heading, activeTarget, targetArrowVisible }) {
  const center = loc || targets[0]?.coordinate || { lat: 37.0322, lng: -97.6070 };
  return <div className="map-wrap">
    <MapContainer center={[center.lat, center.lng]} zoom={15} scrollWheelZoom className="leaflet-map">
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter center={loc || targets[0]?.coordinate} />
      <UserMarker loc={loc} heading={heading} />
      {loc && <CircleMarker center={[loc.lat, loc.lng]} radius={Math.min(40, Math.max(10, (loc.accuracy || 25) / 4))} pathOptions={{ color: '#2d8cff', fillOpacity: 0.08 }} />}
      {targets.map((t, i) => <Marker key={t.id} position={[t.coordinate.lat, t.coordinate.lng]} icon={iconHtml(t.id === activeTarget?.id ? '#f59e0b' : '#7a4a2d', t.icon || (i+1))}>
        <Popup><strong>{t.name}</strong><br />{t.hint || quest.title}</Popup>
      </Marker>)}
      {loc && activeTarget && targetArrowVisible && <Polyline positions={[[loc.lat, loc.lng], [activeTarget.coordinate.lat, activeTarget.coordinate.lng]]} pathOptions={{ color: '#f59e0b', dashArray: '6 8' }} />}
    </MapContainer>
    <TargetArrowOverlay loc={loc} target={activeTarget} revealed={targetArrowVisible} />
  </div>
}

function Explore({ data, progress, setScreen, loc }) {
  const quests = data.quests.map(q => {
    const targets = data.targets[q.targetsSource] || [];
    const remaining = targets.filter(t => !progress.discoveries.includes(t.id));
    const nearest = remaining.map(t => ({ t, d: haversine(loc, t.coordinate) })).sort((a,b)=>a.d-b.d)[0];
    return { ...q, targets, remaining, nearestDistance: nearest?.d ?? Infinity };
  }).sort((a,b) => a.nearestDistance - b.nearestDistance);
  const nearbyRewards = data.businesses.filter(b => !loc || haversine(loc, b.coordinate) < 1609);
  return <main className="screen explore">
    <HeroLogo />
    <section className="panel intro">
      <p className="eyebrow">Quest-first discovery</p>
      <h1>Choose your adventure.</h1>
      <p>Hunt one quest at a time. Heartbeat haptics only start close to the target; directions stay hidden until the last hint.</p>
    </section>
    <section><h2>Nearby Adventures</h2>
      <div className="quest-list">
        {quests.map(q => <button className="quest-card" key={q.id} onClick={() => setScreen({ name: 'quest', questId: q.id })}>
          <div className="quest-icon">{q.emoji}</div><div className="grow"><strong>{q.title}</strong><span>{q.subtitle}</span><small>{q.targets.length - q.remaining.length}/{q.targets.length} complete · {Number.isFinite(q.nearestDistance) ? `${metersToMiles(q.nearestDistance).toFixed(2)} mi nearest` : 'targets ready'}</small></div><Route /></button>)}
      </div>
    </section>
    <section><h2>Rewards Nearby</h2>
      <div className="reward-row">{nearbyRewards.map(b => <div className="reward-card" key={b.id}><Gift /><strong>{b.name}</strong><span>{b.promotion.title}</span><small>{b.promotion.reward}</small></div>)}</div>
    </section>
  </main>;
}

function HeroLogo() { return <div className="hero-logo"><img src={asset('rural_routes_main_logo.jpg')} alt="Rural Routes Explorer" /></div>; }

function QuestScreen({ data, progress, setProgress, screen, setScreen, loc, heading }) {
  const quest = data.quests.find(q => q.id === screen.questId) || data.quests[0];
  const targets = data.targets[quest.targetsSource] || [];
  const remaining = targets.filter(t => !progress.discoveries.includes(t.id));
  const [activeId, setActiveId] = useState(screen.targetId || remaining[0]?.id || targets[0]?.id);
  const [hunt, setHunt] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const activeTarget = targets.find(t => t.id === activeId) || targets[0];
  const distance = loc && activeTarget ? haversine(loc, activeTarget.coordinate) : Infinity;
  const close = distance < 91.44; // 300 ft
  const discovery = distance < (activeTarget?.radiusMeters || 25);
  const strength = Number.isFinite(distance) ? Math.max(1, Math.min(10, Math.ceil((1 - Math.min(distance, 300) / 300) * 10))) : 1;

  useEffect(() => {
    if (!hunt || !close || !navigator.vibrate) return;
    const interval = distance < 15 ? 1800 : distance < 30 ? 3000 : distance < 60 ? 5000 : 8000;
    const pulse = () => navigator.vibrate([90, 120, 130]);
    pulse();
    const id = setInterval(pulse, interval);
    return () => clearInterval(id);
  }, [hunt, close, Math.round(distance / 10)]);

  function unlock() {
    if (!activeTarget) return;
    if (!progress.discoveries.includes(activeTarget.id)) {
      setProgress(p => ({ ...p, discoveries: [...p.discoveries, activeTarget.id], cards: [...new Set([...p.cards, activeTarget.cardId || activeTarget.id])] }));
      if (navigator.vibrate) navigator.vibrate([200,100,200,100,400]);
    }
  }

  return <main className="screen quest-detail">
    <button className="back" onClick={() => setScreen({ name: 'explore' })}>← Explore</button>
    <section className="panel quest-hero"><div className="quest-icon big">{quest.emoji}</div><div><p className="eyebrow">{quest.collection}</p><h1>{quest.title}</h1><p>{quest.subtitle}</p><strong>{targets.length - remaining.length}/{targets.length} complete</strong></div></section>
    <section className="panel active-hunt"><h2>{hunt ? 'Heartbeat Hunt Active' : 'Start Hunt'}</h2><p>Target: {hintLevel >= 2 ? activeTarget?.name : 'Unknown ' + quest.shortName}</p><div className="signal">{Array.from({ length: 10 }, (_, i) => <span key={i} className={i < strength ? 'on' : ''}></span>)}</div><small>{Number.isFinite(distance) ? `${ft(distance)} ft from active target` : 'Enable location for distance and haptics'}</small>
      <div className="actions"><button onClick={() => setHunt(!hunt)}>{hunt ? 'Stop Hunt' : 'Start Hunt'}</button><button onClick={() => setHintLevel(Math.max(hintLevel,1))}>Text Hint</button><button onClick={() => setHintLevel(Math.max(hintLevel,3))}>Direction Hint</button><button onClick={() => { setHintLevel(4); }}>Reveal Exact Location</button>{(discovery || progress.easyUnlocks) && <button className="gold" onClick={unlock}>Unlock Discovery</button>}</div>
      {hintLevel >= 1 && <p className="hint">Hint: {activeTarget?.hint}</p>}
    </section>
    <section><h2>{quest.mapTitle}</h2><QuestMap quest={quest} targets={targets} loc={loc} heading={heading} activeTarget={activeTarget} targetArrowVisible={hintLevel >= 3} /></section>
    <section><h2>Quest Targets</h2><div className="target-list">{targets.map(t => <button key={t.id} className={t.id === activeId ? 'selected' : ''} onClick={() => { setActiveId(t.id); setHintLevel(0); }}><span>{progress.discoveries.includes(t.id) ? '✅' : '○'}</span>{t.name}</button>)}</div></section>
  </main>;
}

function MapScreen({ data, loc, heading, setScreen }) {
  const targets = Object.values(data.targets).flat();
  return <main className="screen"><h1>Regional Map</h1><p>All public map views use the same user location layer, heading cone, and controls.</p><QuestMap quest={{title:'Regional Map'}} targets={targets} loc={loc} heading={heading} activeTarget={null} targetArrowVisible={false} /><button onClick={() => setScreen({ name: 'explore' })}>Back to Explore</button></main>
}

function Scan({ data, progress, setProgress }) {
  const [payload, setPayload] = useState('ruralroutes://unlock/turtle/11');
  const [message, setMessage] = useState('');
  function redeem() {
    const match = Object.values(data.targets).flat().find(t => t.qrPayload === payload || t.id === payload);
    const promo = data.businesses.find(b => b.promotion.qrPayload === payload);
    if (match) { setProgress(p => ({ ...p, discoveries: [...new Set([...p.discoveries, match.id])], cards: [...new Set([...p.cards, match.cardId || match.id])] })); setMessage(`Unlocked ${match.name}`); }
    else if (promo) { setProgress(p => ({ ...p, promotions: [...new Set([...p.promotions, promo.promotion.id])] })); setMessage(`Redeemed ${promo.promotion.title}`); }
    else setMessage('No matching QR payload found in demo data.');
  }
  return <main className="screen"><h1>Universal Scanner</h1><p>For web builds, connect a camera scanner such as zxing-js/browser or html5-qrcode. This demo also accepts QR payload text.</p><input value={payload} onChange={e=>setPayload(e.target.value)} /><button onClick={redeem}><ScanLine /> Redeem Payload</button>{message && <div className="panel success">{message}</div>}</main>
}

function Rewards({ data, progress }) {
  const cards = data.cards.filter(c => progress.cards.includes(c.id));
  const achievements = data.achievements.map(a => ({...a, complete: evaluateAchievement(a, progress, data)}));
  return <main className="screen"><h1>Rewards</h1><section className="stats"><div><strong>{cards.length}</strong><span>Cards</span></div><div><strong>{progress.discoveries.length}</strong><span>Discoveries</span></div><div><strong>{achievements.filter(a=>a.complete).length}</strong><span>Achievements</span></div></section><h2>Achievement Showcase</h2><div className="badge-grid">{achievements.map(a => <div className={`badge ${a.complete ? 'earned' : ''}`} key={a.id}><Trophy /><strong>{a.name}</strong><small>{a.description}</small></div>)}</div></main>
}
function evaluateAchievement(a, p, data) {
  if (a.type === 'discoveries') return p.discoveries.length >= a.count;
  if (a.type === 'collection') return data.targets[a.source]?.every(t => p.discoveries.includes(t.id));
  if (a.type === 'golden') return p.cards.some(id => data.cards.find(c => c.id === id && c.isGolden));
  return false;
}

function Profile({ data, progress, setProgress }) {
  const cards = data.cards.filter(c => progress.cards.includes(c.id));
  return <main className="screen"><h1>Profile</h1><section className="panel"><h2>My Cards Binder</h2><p>Unlocked cards from every deck appear here, separated from collection checklists.</p><label className="switch"><input type="checkbox" checked={progress.easyUnlocks} onChange={e=>setProgress(p=>({...p, easyUnlocks:e.target.checked}))} /> Easy demo unlocks</label></section><div className="card-grid">{cards.map(c => <div className={`collect-card ${c.isGolden ? 'golden' : ''}`} key={c.id}><img src={asset(c.front)} /><strong>{c.name}</strong><small>{c.collection}{c.isGolden ? ' · GOLDEN' : ''}</small></div>)}</div><section className="panel"><h2>Screenshot Showcase</h2><div className="showcase"><img src={asset('rural_routes_main_logo.jpg')} /><strong>Explorer Trophy Case</strong><span>{cards.length} cards · {progress.discoveries.length} discoveries</span></div></section></main>
}

function Local({ data, progress }) {
  return <main className="screen"><h1>Local / Buy Local</h1><p>Demonstrates business rewards, printable QR promotions, and discovery-triggered recommendations.</p><div className="business-list">{data.businesses.map(b => <div className="panel business" key={b.id}><Store /><h2>{b.name}</h2><p>{b.category}</p><strong>{b.promotion.title}</strong><span>{b.promotion.reward}</span><div className="print-sign"><h3>Rural Routes Reward</h3><div className="fake-qr">QR</div><small>{b.promotion.qrPayload}</small></div></div>)}</div></main>
}

function App() {
  const { data, source } = useData();
  const { loc, heading, status } = useGeo();
  const [screen, setScreen] = useState({ name: 'explore' });
  const [progress, setProgress] = useLocalStorage('rr-progress-v35d', { discoveries: [], cards: ['BL-01'], promotions: [], easyUnlocks: true });
  const content = screen.name === 'quest' ? <QuestScreen data={data} progress={progress} setProgress={setProgress} screen={screen} setScreen={setScreen} loc={loc} heading={heading} /> : screen.name === 'map' ? <MapScreen data={data} loc={loc} heading={heading} setScreen={setScreen} /> : screen.name === 'scan' ? <Scan data={data} progress={progress} setProgress={setProgress} /> : screen.name === 'rewards' ? <Rewards data={data} progress={progress} /> : screen.name === 'profile' ? <Profile data={data} progress={progress} setProgress={setProgress} /> : screen.name === 'local' ? <Local data={data} progress={progress} /> : <Explore data={data} progress={progress} setScreen={setScreen} loc={loc} />;
  return <><div className="app-status">{status} · Data: {source}</div>{content}<nav className="tabbar"><button onClick={()=>setScreen({name:'explore'})}><Compass/>Explore</button><button onClick={()=>setScreen({name:'map'})}><Map/>Map</button><button onClick={()=>setScreen({name:'scan'})}><ScanLine/>Scan</button><button onClick={()=>setScreen({name:'local'})}><Gift/>Local</button><button onClick={()=>setScreen({name:'rewards'})}><Trophy/>Rewards</button><button onClick={()=>setScreen({name:'profile'})}><User/>Profile</button></nav></>;
}

createRoot(document.getElementById('root')).render(<App />);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
