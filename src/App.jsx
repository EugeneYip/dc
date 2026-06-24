import React, { useEffect, useMemo, useState } from "react";

/**
 * D.C. 2026
 * Responsive bilingual travel itinerary.
 * English is the primary line. Traditional Chinese is the secondary line.
 * No third-party packages required.
 */

const MAPS = {
  loganC: "https://maps.app.goo.gl/ZAD5jzY97FQXXQiD9",
  hostel: "https://maps.app.goo.gl/QbnSNkEVB7xGxLA67",
  teaism: "https://maps.app.goo.gl/sKG3LQYGEfaLxyXW8",
  nga: "https://maps.app.goo.gl/kkXZtoZULe6e9axWA",
  oldEbbitt: "https://maps.app.goo.gl/NsfkM1p8iVsKgHMT8",
  jefferson: "https://maps.app.goo.gl/6EdYq4FoGTCVoye89",
  whiteHouse: "https://maps.app.goo.gl/2SheKfyfhMby4Yu87",
  washingtonMonument: "https://maps.app.goo.gl/Z8j8Cj55fGEtsPnr9",
  wwii: "https://maps.app.goo.gl/q9miJLMVuwVSyF4D7",
  reflectingPool: "https://maps.app.goo.gl/2Kw6NaoRHTJgxPxB7",
  lincoln: "https://maps.app.goo.gl/1xq6i65gQ1kk7N9B6",
  vietnam: "https://maps.app.goo.gl/wNYVdZGpJum1EPa67",
  korean: "https://maps.app.goo.gl/xnmJ5iQ3QsK47Xuu7",
  marsCafe: "https://maps.app.goo.gl/UdKFKbP9Psf5E5x66",
  airSpace: "https://maps.app.goo.gl/jXJ7ghNd5GxqjRiz5",
  loc: "https://maps.app.goo.gl/SM1yBD1T8ci9oPN7A",
  daikaya: "https://maps.app.goo.gl/2m96QpntsgBbs9QH6",
  georgetown: "https://maps.app.goo.gl/PAUmnaQ2bmPfF6Ms9",
  mStreet: "https://maps.app.goo.gl/ine9n9thbZEDH8MC8",
  waterfront: "https://maps.app.goo.gl/NYvHe4ogQdRaiTck7",
  waterTaxi: "https://maps.app.goo.gl/6y1wGtJxCuZSe76EA",
  wharf: "https://maps.app.goo.gl/f8ByZ5mj7thS97VF9",
  bantamKing: "https://maps.app.goo.gl/Ma3KkMjs529UysY18",
  dcaT2: "https://maps.app.goo.gl/Ak1smXPiGH3N7vLv9",
};

const DAYS = [
  {
    id: "day1",
    number: "01",
    dateEn: "WED · JUN 24",
    dateZh: "星期三 · 6 月 24 日",
    titleEn: "Arrival, art, and the Tidal Basin",
    titleZh: "抵達、藝術與 Tidal Basin",
    accent: "hanada",
    summaryEn: "Keep the morning light. Protect the 5:00 PM reservation and sunset at Jefferson Memorial.",
    summaryZh: "上午保持輕鬆，優先保護 5:00 PM 訂位與 Jefferson Memorial 黃昏時段。",
    items: [
      {
        time: "4:00 AM",
        en: "Leave Allston",
        zh: "離開 Allston",
        detailEn: "Rideshare to Logan Terminal C",
        detailZh: "叫車前往 Logan Terminal C",
        map: MAPS.loganC,
        type: "move",
        fixed: true,
      },
      {
        time: "4:45–5:00",
        en: "Arrive at BOS",
        zh: "抵達 BOS",
        detailEn: "Security, water, gate",
        detailZh: "安檢、裝水、前往登機門",
        type: "airport",
        fixed: true,
      },
      {
        time: "6:15–7:57",
        en: "JetBlue B6 2255",
        zh: "JetBlue B6 2255",
        detailEn: "Boston to Washington National",
        detailZh: "Boston 前往 Washington National",
        type: "flight",
        fixed: true,
      },
      {
        time: "8:20–9:15",
        en: "DCA to hostel",
        zh: "DCA 前往 hostel",
        detailEn: "Yellow Line to Mount Vernon Square",
        detailZh: "Yellow Line 至 Mount Vernon Square",
        map: MAPS.hostel,
        type: "move",
      },
      {
        time: "9:15–9:35",
        en: "Store luggage",
        zh: "寄放行李",
        detailEn: "I Street Capsule Hostel",
        detailZh: "I Street Capsule Hostel",
        map: MAPS.hostel,
        type: "stay",
        fixed: true,
      },
      {
        time: "9:35–10:40",
        en: "Chinatown and CityCenter",
        zh: "",
        detailEn: "Water, coffee, or essentials only",
        detailZh: "只買水、咖啡或日用品",
        type: "flex",
      },
      {
        time: "11:00–11:45",
        en: "Teaism Penn Quarter",
        zh: "",
        detailEn: "Lunch",
        detailZh: "午餐",
        map: MAPS.teaism,
        type: "meal",
      },
      {
        time: "12:05–3:45",
        en: "National Gallery of Art",
        zh: "",
        detailEn: "West Building first",
        detailZh: "先看 West Building",
        map: MAPS.nga,
        type: "visit",
      },
      {
        time: "4:45 PM",
        en: "Arrive at Old Ebbitt",
        zh: "抵達 Old Ebbitt",
        detailEn: "Check in 15 minutes early",
        detailZh: "提早 15 分鐘報到",
        map: MAPS.oldEbbitt,
        type: "meal",
        fixed: true,
      },
      {
        time: "5:00–6:15",
        en: "Old Ebbitt Grill",
        zh: "",
        detailEn: "Reservation for one",
        detailZh: "一人訂位",
        map: MAPS.oldEbbitt,
        type: "meal",
        fixed: true,
      },
      {
        time: "6:15–6:55",
        en: "Walk to Jefferson Memorial",
        zh: "步行前往 Jefferson Memorial",
        detailEn: "Via the Ellipse and Washington Monument",
        detailZh: "經 Ellipse 與 Washington Monument",
        map: MAPS.jefferson,
        type: "move",
      },
      {
        time: "6:55–8:20",
        en: "Jefferson Memorial and Tidal Basin",
        zh: "Jefferson Memorial 與 Tidal Basin",
        detailEn: "Dusk walk. A full loop is unnecessary.",
        detailZh: "黃昏散步，不必繞完整一圈。",
        map: MAPS.jefferson,
        type: "visit",
      },
      {
        time: "8:20–9:00",
        en: "Return to hostel",
        zh: "返回 hostel",
        detailEn: "Rideshare recommended",
        detailZh: "建議叫車",
        map: MAPS.hostel,
        type: "move",
      },
    ],
    priorities: {
      keepEn: ["Old Ebbitt at 5:00 PM", "Luggage storage and check-in"],
      keepZh: ["5:00 PM Old Ebbitt 訂位", "行李寄放與入住安排"],
      cutEn: ["Chinatown walk", "Secondary gallery rooms", "Full Tidal Basin loop"],
      cutZh: ["Chinatown 散步", "次要展廳", "完整 Tidal Basin 繞行"],
    },
  },
  {
    id: "day2",
    number: "02",
    dateEn: "THU · JUN 25",
    dateZh: "星期四 · 6 月 25 日",
    titleEn: "Monuments, museums, and Capitol Hill",
    titleZh: "紀念碑、博物館與 Capitol Hill",
    accent: "beni",
    summaryEn: "Three timed entries control the day. Keep lunch fast and leave margin for security lines.",
    summaryZh: "全天由三個預約入場時段控制，午餐要快，並保留安檢緩衝。",
    items: [
      {
        time: "7:00–7:30",
        en: "Breakfast",
        zh: "早餐",
        detailEn: "Simple food at the hostel",
        detailZh: "在 hostel 簡單用餐",
        type: "meal",
      },
      {
        time: "7:40 AM",
        en: "Leave hostel",
        zh: "離開 hostel",
        detailEn: "Walk toward Lafayette Square",
        detailZh: "步行前往 Lafayette Square",
        type: "move",
        fixed: true,
      },
      {
        time: "8:10–8:45",
        en: "White House",
        zh: "",
        detailEn: "North-side photographs",
        detailZh: "北側拍照",
        map: MAPS.whiteHouse,
        type: "visit",
      },
      {
        time: "8:45–9:15",
        en: "Walk to Washington Monument",
        zh: "步行至 Washington Monument",
        detailEn: "Allow 20–30 minutes",
        detailZh: "預留 20 至 30 分鐘",
        map: MAPS.washingtonMonument,
        type: "move",
      },
      {
        time: "9:15–9:50",
        en: "Queue and security",
        zh: "排隊與安檢",
        detailEn: "Open the QR code before arrival",
        detailZh: "抵達前先開啟 QR code",
        type: "security",
        fixed: true,
      },
      {
        time: "10:00–10:50",
        en: "Washington Monument",
        zh: "",
        detailEn: "Timed reservation",
        detailZh: "預約入場",
        map: MAPS.washingtonMonument,
        type: "visit",
        fixed: true,
      },
      {
        time: "11:05–11:25",
        en: "World War II Memorial",
        zh: "",
        detailEn: "Short focused stop",
        detailZh: "集中參觀",
        map: MAPS.wwii,
        type: "visit",
      },
      {
        time: "11:25–12:00",
        en: "Reflecting Pool",
        zh: "",
        detailEn: "Walk, photos, and water",
        detailZh: "步行、拍照、補水",
        map: MAPS.reflectingPool,
        type: "move",
      },
      {
        time: "12:00–12:25",
        en: "Lincoln Memorial",
        zh: "",
        detailEn: "Main chamber and steps",
        detailZh: "主殿與階梯",
        map: MAPS.lincoln,
        type: "visit",
      },
      {
        time: "12:25–12:55",
        en: "Vietnam and Korean War Memorials",
        zh: "",
        detailEn: "Drop one if the schedule slips",
        detailZh: "若延誤，刪除其中一處",
        links: [
          { label: "Vietnam", url: MAPS.vietnam },
          { label: "Korean", url: MAPS.korean },
        ],
        type: "visit",
      },
      {
        time: "1:05–1:35",
        en: "Mars Café",
        zh: "",
        detailEn: "Fast lunch or takeaway",
        detailZh: "快速午餐或外帶",
        map: MAPS.marsCafe,
        type: "meal",
      },
      {
        time: "1:35–1:55",
        en: "Travel to Air and Space",
        zh: "前往 Air and Space",
        detailEn: "Use rideshare if timing is tight",
        detailZh: "時間不足時改叫車",
        map: MAPS.airSpace,
        type: "move",
      },
      {
        time: "2:00–3:30",
        en: "National Air and Space Museum",
        zh: "",
        detailEn: "Timed entry",
        detailZh: "預約入場",
        map: MAPS.airSpace,
        type: "visit",
        fixed: true,
      },
      {
        time: "3:30–3:55",
        en: "Walk to Library of Congress",
        zh: "步行至 Library of Congress",
        detailEn: "Go directly to the visitor entrance",
        detailZh: "直接前往訪客入口",
        map: MAPS.loc,
        type: "move",
      },
      {
        time: "3:55–4:25",
        en: "Queue and security",
        zh: "排隊與安檢",
        detailEn: "Keep the QR code ready",
        detailZh: "準備好 QR code",
        type: "security",
        fixed: true,
      },
      {
        time: "4:30–6:40",
        en: "Library of Congress",
        zh: "",
        detailEn: "Live! at the Library",
        detailZh: "Live! at the Library",
        map: MAPS.loc,
        type: "visit",
        fixed: true,
      },
      {
        time: "7:10–8:10",
        en: "DAIKAYA",
        zh: "",
        detailEn: "First-floor ramen shop",
        detailZh: "一樓拉麵店",
        map: MAPS.daikaya,
        type: "meal",
      },
    ],
    priorities: {
      keepEn: ["Washington Monument at 10:00 AM", "Air and Space at 2:00 PM", "Library of Congress at 4:30 PM"],
      keepZh: ["10:00 AM Washington Monument", "2:00 PM Air and Space", "4:30 PM Library of Congress"],
      cutEn: ["Mars Café, replace with takeaway", "One memorial", "Secondary museum galleries"],
      cutZh: ["Mars Café 改外帶", "刪除一處 Memorial", "刪除次要展廳"],
    },
  },
  {
    id: "day3",
    number: "03",
    dateEn: "FRI · JUN 26",
    dateZh: "星期五 · 6 月 26 日",
    titleEn: "Georgetown, the Potomac, and departure",
    titleZh: "Georgetown、Potomac 與回程",
    accent: "matcha",
    summaryEn: "The morning is flexible. The 3:30 PM boat, luggage pickup, and airport arrival are not.",
    summaryZh: "上午可彈性調整，3:30 PM 船班、取行李與抵達機場時間不可延誤。",
    items: [
      {
        time: "8:30–10:15",
        en: "Slow morning",
        zh: "慢起",
        detailEn: "Breakfast, packing, charging",
        detailZh: "早餐、整理、充電",
        type: "flex",
      },
      {
        time: "10:15–11:00",
        en: "Check out and store luggage",
        zh: "退房及寄放行李",
        detailEn: "I Street Capsule Hostel",
        detailZh: "I Street Capsule Hostel",
        map: MAPS.hostel,
        type: "stay",
        fixed: true,
      },
      {
        time: "11:00–11:35",
        en: "Travel to Georgetown",
        zh: "前往 Georgetown",
        detailEn: "Rideshare is simplest",
        detailZh: "叫車最直接",
        map: MAPS.georgetown,
        type: "move",
      },
      {
        time: "11:35–12:20",
        en: "M Street and C&O Canal",
        zh: "",
        detailEn: "Historic streets and canal",
        detailZh: "歷史街區與運河",
        map: MAPS.mStreet,
        type: "visit",
      },
      {
        time: "12:20–1:20",
        en: "Lunch",
        zh: "午餐",
        detailEn: "M Street or Washington Harbour",
        detailZh: "M Street 或 Washington Harbour",
        type: "meal",
      },
      {
        time: "1:20–2:05",
        en: "Wisconsin Avenue",
        zh: "",
        detailEn: "Shops and side streets",
        detailZh: "商店與巷弄",
        type: "flex",
      },
      {
        time: "2:05–2:50",
        en: "Georgetown Waterfront Park",
        zh: "",
        detailEn: "Potomac and Key Bridge views",
        detailZh: "Potomac 與 Key Bridge 景色",
        map: MAPS.waterfront,
        type: "visit",
      },
      {
        time: "2:50–3:10",
        en: "Walk to the dock",
        zh: "步行前往碼頭",
        detailEn: "Move toward Washington Harbour",
        detailZh: "前往 Washington Harbour",
        map: MAPS.waterTaxi,
        type: "move",
      },
      {
        time: "3:10–3:20",
        en: "Water taxi check-in",
        zh: "水上計程船報到",
        detailEn: "Be ready before boarding begins",
        detailZh: "登船前完成報到",
        map: MAPS.waterTaxi,
        type: "security",
        fixed: true,
      },
      {
        time: "3:30–4:15",
        en: "Potomac Water Taxi",
        zh: "",
        detailEn: "Georgetown to The Wharf",
        detailZh: "Georgetown 前往 The Wharf",
        map: MAPS.waterTaxi,
        type: "boat",
        fixed: true,
      },
      {
        time: "4:15–5:15",
        en: "The Wharf",
        zh: "",
        detailEn: "Transit Pier and waterfront",
        detailZh: "Transit Pier 與水岸",
        map: MAPS.wharf,
        type: "visit",
      },
      {
        time: "5:15–5:50",
        en: "Return to Chinatown",
        zh: "返回 Chinatown",
        detailEn: "Metro or rideshare",
        detailZh: "Metro 或叫車",
        type: "move",
      },
      {
        time: "5:50–6:35",
        en: "Bantam King",
        zh: "",
        detailEn: "Early dinner",
        detailZh: "提早晚餐",
        map: MAPS.bantamKing,
        type: "meal",
      },
      {
        time: "6:50–7:10",
        en: "Collect luggage",
        zh: "領取行李",
        detailEn: "Final repack",
        detailZh: "最後整理",
        map: MAPS.hostel,
        type: "stay",
        fixed: true,
      },
      {
        time: "7:10–7:50",
        en: "Travel to DCA",
        zh: "前往 DCA",
        detailEn: "Yellow Line to Terminal 2",
        detailZh: "Yellow Line 前往 Terminal 2",
        map: MAPS.dcaT2,
        type: "move",
      },
      {
        time: "8:00–8:15",
        en: "Arrive at DCA Terminal 2",
        zh: "抵達 DCA Terminal 2",
        detailEn: "Security and gate",
        detailZh: "安檢及前往登機門",
        map: MAPS.dcaT2,
        type: "airport",
        fixed: true,
      },
      {
        time: "10:00–11:44",
        en: "Delta DL 5633",
        zh: "Delta DL 5633",
        detailEn: "Washington to Boston",
        detailZh: "Washington 前往 Boston",
        type: "flight",
        fixed: true,
      },
    ],
    priorities: {
      keepEn: ["Water taxi check-in by 3:20 PM", "Luggage pickup by 7:10 PM", "DCA by 8:15 PM"],
      keepZh: ["3:20 PM 前完成船班報到", "7:10 PM 前取行李", "8:15 PM 前抵達 DCA"],
      cutEn: ["M Street shopping", "Shorten The Wharf", "Replace the boat if weather disrupts service"],
      cutZh: ["刪除 M Street 購物", "縮短 The Wharf 停留", "天氣異常時改走陸路"],
    },
  },
];

const TYPE_META = {
  move: ["Move", "移動"],
  airport: ["Airport", "機場"],
  flight: ["Flight", "航班"],
  stay: ["Stay", "住宿"],
  flex: ["Flexible", "彈性"],
  meal: ["Meal", "餐飲"],
  visit: ["Visit", "參觀"],
  security: ["Check-in", "報到"],
  boat: ["Boat", "船班"],
};

const CHECKLIST = [
  ["JetBlue check-in complete", "JetBlue check-in 完成"],
  ["Terminal and gate confirmed", "航廈與登機門已確認"],
  ["Phone and power bank charged", "手機與 power bank 已充滿"],
  ["3:30 AM alarms set", "3:30 AM 鬧鐘已設定"],
  ["4:00 AM ride arranged", "4:00 AM 叫車已安排"],
  ["Passport or REAL ID packed", "Passport 或 REAL ID 已放入隨身包"],
  ["Three QR codes saved offline", "三張 QR code 已離線保存"],
  ["Hostel late check-in confirmed", "Hostel late check-in 已確認"],
  ["Hostel luggage storage confirmed", "Hostel 行李寄放已確認"],
  ["Water taxi ticket ready", "水上計程船票已準備"],
  ["Final return booking reconfirmed", "最終回程訂位已重新確認"],
];

function Icon({ name, size = 18 }) {
  const base = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    plane: <><path d="M22 2 9.5 14.5"/><path d="m15 2-4 4-7-1-2 2 6 3-3 3-3-.5L.5 14l4.5 2 2 4.5 1.5-1.5-.5-3 3-3 3 6 2-2-1-7 4-4Z"/></>,
    train: <><rect x="5" y="3" width="14" height="15" rx="2"/><path d="M8 21l2-3m6 3-2-3M8 7h8M8 12h.01M16 12h.01"/></>,
    food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 5 4 8h-4"/></>,
    museum: <><path d="m3 9 9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/></>,
    bed: <><path d="M3 18V8M3 14h18v4M6 10h5a3 3 0 0 1 3 3v1M6 10V7h4a3 3 0 0 1 3 3"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2"/></>,
    shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z"/><path d="m9 12 2 2 4-5"/></>,
    boat: <><path d="M4 13 6 8h12l2 5"/><path d="M2 15c2 2 4 2 6 0 2 2 4 2 6 0 2 2 4 2 8 0"/><path d="M12 8V3l4 2-4 2"/></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></>,
  };

  return <svg {...base}>{paths[name] || paths.map}</svg>;
}

function BilingualText({ en, zh, className = "" }) {
  return (
    <span className={`bi ${className}`}>
      <span className="en">{en}</span>
      <span className="zh" lang="zh-Hant">{zh}</span>
    </span>
  );
}

function MapButton({ href, label = "Open in Google Maps", compact = false }) {
  if (!href) return null;
  return (
    <a
      className={`map-button ${compact ? "compact" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <Icon name="map" size={compact ? 15 : 17} />
      {!compact && <BilingualText en="Google Maps" zh="開啟地圖" />}
      <Icon name="external" size={compact ? 13 : 15} />
    </a>
  );
}

function TypeIcon({ type }) {
  const icon = {
    move: "train",
    airport: "shield",
    flight: "plane",
    stay: "bed",
    flex: "sun",
    meal: "food",
    visit: "museum",
    security: "shield",
    boat: "boat",
  }[type] || "clock";

  return <Icon name={icon} size={17} />;
}

function useChecklist() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dc2026-v2-checklist") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dc2026-v2-checklist", JSON.stringify(checked));
    } catch {}
  }, [checked]);

  return [checked, setChecked];
}

function TimelineItem({ item }) {
  const [typeEn, typeZh] = TYPE_META[item.type] || ["Item", "項目"];

  return (
    <article className={`timeline-item type-${item.type}`}>
      <div className="time-cell">
        <time>{item.time}</time>
        {item.fixed && <span className="fixed-dot" title="Fixed time" />}
      </div>

      <div className="timeline-rail">
        <div className="timeline-icon"><TypeIcon type={item.type} /></div>
      </div>

      <div className="timeline-card">
        <div className="timeline-main">
          <div>
            <div className="type-label">
              <BilingualText en={typeEn} zh={typeZh} />
              {item.fixed && <span className="fixed-badge">FIXED · 固定</span>}
            </div>
            <h3>{item.en}</h3>
            {item.zh && <p lang="zh-Hant">{item.zh}</p>}
          </div>

          <div className="timeline-actions">
            {item.map && <MapButton href={item.map} compact />}
            {item.links?.map((link) => (
              <a
                key={link.label}
                className="mini-map"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <Icon name="external" size={12} />
              </a>
            ))}
          </div>
        </div>

        <div className="timeline-detail">
          <span>{item.detailEn}</span>
          <span lang="zh-Hant">{item.detailZh}</span>
        </div>
      </div>
    </article>
  );
}

function PriorityPanel({ priorities }) {
  return (
    <div className="priority-panel">
      <div className="priority-box keep">
        <div className="priority-kicker">PROTECT · 必須保留</div>
        <ul>
          {priorities.keepEn.map((item, i) => (
            <li key={item}>
              <BilingualText en={item} zh={priorities.keepZh[i]} />
            </li>
          ))}
        </ul>
      </div>
      <div className="priority-box cut">
        <div className="priority-kicker">CUT FIRST · 優先刪除</div>
        <ul>
          {priorities.cutEn.map((item, i) => (
            <li key={item}>
              <BilingualText en={item} zh={priorities.cutZh[i]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DaySection({ day }) {
  const [showAll, setShowAll] = useState(true);
  const visibleItems = showAll ? day.items : day.items.filter((item) => item.fixed);

  return (
    <section id={day.id} className={`day-section accent-${day.accent}`}>
      <div className="day-header">
        <div className="day-number">{day.number}</div>
        <div className="day-heading">
          <div className="date-line">
            <span>{day.dateEn}</span>
            <span lang="zh-Hant">{day.dateZh}</span>
          </div>
          <h2>{day.titleEn}</h2>
          <p className="day-title-zh" lang="zh-Hant">{day.titleZh}</p>
          <div className="day-summary">
            <span>{day.summaryEn}</span>
            <span lang="zh-Hant">{day.summaryZh}</span>
          </div>
        </div>
        <button className="filter-button" onClick={() => setShowAll(!showAll)}>
          <Icon name="clock" />
          <BilingualText
            en={showAll ? "Fixed only" : "Show full day"}
            zh={showAll ? "只看固定行程" : "顯示完整行程"}
          />
        </button>
      </div>

      <div className="day-body">
        <div className="timeline">
          {visibleItems.map((item, i) => (
            <TimelineItem item={item} key={`${item.time}-${item.en}-${i}`} />
          ))}
        </div>

        <aside className="day-sidebar">
          <PriorityPanel priorities={day.priorities} />
        </aside>
      </div>
    </section>
  );
}

function Checklist() {
  const [checked, setChecked] = useChecklist();
  const count = useMemo(
    () => CHECKLIST.reduce((n, _, i) => n + (checked[i] ? 1 : 0), 0),
    [checked]
  );
  const percent = Math.round((count / CHECKLIST.length) * 100);

  return (
    <section id="checklist" className="checklist-section">
      <div className="section-title">
        <div className="section-index">04</div>
        <div>
          <h2>Departure checklist</h2>
          <p lang="zh-Hant">出發檢查表</p>
        </div>
      </div>

      <div className="checklist-card">
        <div className="checklist-top">
          <div>
            <strong>{count}/{CHECKLIST.length}</strong>
            <span>completed · 已完成</span>
          </div>
          <button onClick={() => setChecked({})}>Reset · 重設</button>
        </div>

        <div className="progress" aria-label={`${percent}% complete`}>
          <span style={{ width: `${percent}%` }} />
        </div>

        <div className="checklist-grid">
          {CHECKLIST.map(([en, zh], i) => (
            <label className={checked[i] ? "checked" : ""} key={en}>
              <input
                type="checkbox"
                checked={!!checked[i]}
                onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
              />
              <span className="check-box"><Icon name="check" size={14} /></span>
              <BilingualText en={en} zh={zh} />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransportStrip() {
  const cards = [
    {
      titleEn: "Outbound",
      titleZh: "去程",
      icon: "plane",
      main: "JetBlue B6 2255",
      subEn: "BOS 6:15 AM → DCA 7:57 AM",
      subZh: "6 月 24 日",
      map: MAPS.loganC,
    },
    {
      titleEn: "Stay",
      titleZh: "住宿",
      icon: "bed",
      main: "I Street Capsule Hostel",
      subEn: "512 I St NW",
      subZh: "寄放行李與 late check-in 須確認",
      map: MAPS.hostel,
    },
    {
      titleEn: "Return",
      titleZh: "回程",
      icon: "plane",
      main: "Delta DL 5633",
      subEn: "DCA 10:00 PM → BOS 11:44 PM",
      subZh: "6 月 26 日",
      map: MAPS.dcaT2,
    },
  ];

  return (
    <section className="transport-strip" id="overview">
      {cards.map((card) => (
        <article className="transport-card" key={card.titleEn}>
          <div className="transport-icon"><Icon name={card.icon} size={20} /></div>
          <div>
            <div className="transport-label">
              <span>{card.titleEn}</span>
              <span lang="zh-Hant">{card.titleZh}</span>
            </div>
            <strong>{card.main}</strong>
            <div className="transport-sub">
              <span>{card.subEn}</span>
              <span lang="zh-Hant">{card.subZh}</span>
            </div>
          </div>
          <MapButton href={card.map} compact />
        </article>
      ))}
    </section>
  );
}

function QuickFacts() {
  const facts = [
    ["3", "timed entries", "個預約入場"],
    ["1", "restaurant reservation", "筆餐廳訂位"],
    ["3:30 PM", "water taxi", "水上計程船"],
    ["8:15 PM", "DCA target", "抵達 DCA 目標"],
  ];

  return (
    <section className="quick-facts">
      {facts.map(([value, en, zh]) => (
        <article key={value + en}>
          <strong>{value}</strong>
          <BilingualText en={en} zh={zh} />
        </article>
      ))}
    </section>
  );
}

function PackingSection() {
  const blocks = [
    {
      icon: "shield",
      titleEn: "Documents",
      titleZh: "證件與訂位",
      items: [
        ["Passport or REAL ID", "Passport 或 REAL ID"],
        ["Both boarding passes", "兩段登機證"],
        ["Three QR codes", "三張預約入場 QR code"],
        ["Hostel confirmation", "Hostel 確認信"],
        ["Restaurant and water taxi confirmations", "餐廳及船票確認"],
      ],
    },
    {
      icon: "bag",
      titleEn: "Daily bag",
      titleZh: "每日隨身包",
      items: [
        ["Phone and power bank", "手機與 power bank"],
        ["Water bottle", "水瓶"],
        ["Sunscreen", "防曬"],
        ["Compact rain gear", "輕便雨具"],
        ["Personal medication", "個人藥物"],
      ],
    },
    {
      icon: "bed",
      titleEn: "Hostel",
      titleZh: "Hostel",
      items: [
        ["Earplugs and eye mask", "耳塞與眼罩"],
        ["Shower sandals", "浴室拖鞋"],
        ["Small lock", "小鎖"],
        ["Small towel", "小毛巾"],
        ["Two changes of clothes", "兩套換洗衣物"],
      ],
    },
  ];

  return (
    <section id="packing" className="packing-section">
      <div className="section-title">
        <div className="section-index">05</div>
        <div>
          <h2>Pack only what serves the trip</h2>
          <p lang="zh-Hant">只攜帶真正需要的物品</p>
        </div>
      </div>

      <div className="packing-grid">
        {blocks.map((block) => (
          <article key={block.titleEn}>
            <div className="packing-icon"><Icon name={block.icon} /></div>
            <h3>{block.titleEn}</h3>
            <p lang="zh-Hant">{block.titleZh}</p>
            <ul>
              {block.items.map(([en, zh]) => (
                <li key={en}><BilingualText en={en} zh={zh} /></li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="rules-row">
        <div>
          <strong>TSA 3-1-1</strong>
          <BilingualText
            en="Liquids must be 3.4 oz / 100 ml or less per container."
            zh="每瓶液體不得超過 3.4 oz／100 ml。"
          />
        </div>
        <div>
          <strong>Carry-on</strong>
          <BilingualText
            en="Keep the bag within 22 × 14 × 9 inches."
            zh="行李尺寸控制在 22 × 14 × 9 inches 內。"
          />
        </div>
      </div>
    </section>
  );
}

export default function DC2026() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const ids = ["overview", "day1", "day2", "day3", "checklist", "packing"];
    const onScroll = () => {
      const point = window.scrollY + 150;
      let current = "overview";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= point) current = id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    ["overview", "Overview", "總覽"],
    ["day1", "Day 1", "第一天"],
    ["day2", "Day 2", "第二天"],
    ["day3", "Day 3", "第三天"],
    ["checklist", "Checklist", "檢查表"],
    ["packing", "Packing", "行李"],
  ];

  return (
    <div className="app">
      <style>{styles}</style>

      <a className="skip-link" href="#overview">Skip to itinerary</a>

      <header className="topbar">
        <a className="brand" href="#overview" aria-label="D.C. 2026 home">
          <span className="brand-mark">DC</span>
          <span className="brand-copy">
            <strong>D.C. 2026</strong>
            <small>JUN 24–26 · 3 DAYS</small>
          </span>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>

        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          {nav.map(([id, en, zh]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              <span>{en}</span>
              <span lang="zh-Hant">{zh}</span>
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-left">
            <div className="hero-kicker">WASHINGTON, D.C. · 2026</div>
            <h1>D.C. 2026</h1>
            <p className="hero-zh" lang="zh-Hant">華盛頓三天兩夜</p>

            <div className="hero-date">
              <span>JUNE 24–26</span>
              <span>WED–FRI</span>
              <span>BOSTON → D.C.</span>
            </div>

            <div className="departure-callout">
              <Icon name="clock" size={22} />
              <div>
                <strong>4:00 AM departure</strong>
                <span lang="zh-Hant">凌晨 4:00 從 Allston 出發</span>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-sun" />
            <div className="hero-obelisk" />
            <div className="hero-water" />
            <div className="hero-stamp">
              <span>WASHINGTON</span>
              <strong>DC</strong>
              <span>2026</span>
            </div>
          </div>
        </section>

        <TransportStrip />
        <QuickFacts />

        {DAYS.map((day) => (
          <DaySection day={day} key={day.id} />
        ))}

        <Checklist />
        <PackingSection />
      </main>

      <a
        className="floating-map"
        href="https://maps.app.goo.gl/3V7D3rmZY6j4Umih6"
        target="_blank"
        rel="noreferrer"
        aria-label="Open trip map in Google Maps"
      >
        <Icon name="map" size={21} />
        <span>
          <strong>Trip Map</strong>
          <small>Google Maps</small>
        </span>
      </a>

      <footer>
        <div>
          <strong>D.C. 2026</strong>
          <span>Responsive bilingual itinerary · 響應式雙語行程</span>
        </div>
        <span>Return confirmed: Delta DL 5633</span>
      </footer>
    </div>
  );
}

const styles = `
  :root {
    color-scheme: light;
    --paper: #FCFAF2;
    --ink: #1C1C1C;
    --muted: #6A6D6B;
    --line: #D8D2C4;
    --white: #FFFFFF;
    --hanada: #006284;
    --hanada-soft: #DDECF1;
    --beni: #CB4042;
    --beni-soft: #F4E1DE;
    --matcha: #86A697;
    --matcha-soft: #E6ECE8;
    --yamabuki: #FFB11B;
    --yamabuki-soft: #F7EBCB;
    --ai: #0F4C5C;
    --shadow: 0 18px 50px rgba(43, 39, 31, .08);
    --max: 1240px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-padding-top: 82px; }
  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", sans-serif;
  }
  a { color: inherit; }
  button, input { font: inherit; }
  h1, h2, h3, p { margin-top: 0; }
  .app {
    min-height: 100vh;
    background:
      radial-gradient(circle at 8% 3%, rgba(255,177,27,.11), transparent 24rem),
      linear-gradient(var(--paper), var(--paper));
  }
  .bi { display: inline-flex; flex-direction: column; gap: .14rem; }
  .bi .en { line-height: 1.32; }
  .bi .zh { color: var(--muted); font-size: .88em; line-height: 1.38; }
  .skip-link {
    position: fixed; left: 12px; top: -60px; z-index: 9999;
    background: var(--ink); color: white; padding: 10px 14px; border-radius: 10px;
  }
  .skip-link:focus { top: 12px; }

  .topbar {
    position: sticky; top: 0; z-index: 1000;
    height: 72px; padding: 0 clamp(16px, 4vw, 46px);
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    background: rgba(252,250,242,.93);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(216,210,196,.8);
  }
  .brand {
    display: flex; align-items: center; gap: 11px; text-decoration: none; min-width: max-content;
  }
  .brand-mark {
    width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center;
    color: white; background: var(--ai); font-weight: 900; letter-spacing: .06em;
  }
  .brand-copy strong { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 1.08rem; }
  .brand-copy small { display: block; color: var(--muted); font-size: .72rem; font-weight: 750; letter-spacing: .06em; margin-top: 2px; }

  .nav { display: flex; gap: 4px; align-items: center; }
  .nav a {
    display: flex; flex-direction: column; align-items: center; gap: 1px;
    min-width: 72px; padding: 8px 10px; border-radius: 11px;
    text-decoration: none; color: #5c5e5c; font-weight: 750; font-size: .76rem;
  }
  .nav a span:last-child { font-size: .72rem; color: #858783; }
  .nav a:hover, .nav a.active { background: var(--hanada-soft); color: var(--hanada); }
  .nav a.active span:last-child { color: var(--hanada); }
  .menu-button { display: none; border: 0; background: transparent; padding: 9px; border-radius: 10px; }

  main { overflow: clip; }
  .hero {
    max-width: 1440px; margin: 0 auto;
    min-height: 610px; padding: clamp(48px, 8vw, 104px) clamp(18px, 6vw, 88px);
    display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: clamp(30px, 7vw, 100px);
  }
  .hero-kicker {
    color: var(--beni); font-size: .75rem; font-weight: 900; letter-spacing: .16em;
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(3.4rem, 8vw, 6.2rem); line-height: .9; letter-spacing: -.05em;
    margin-bottom: 8px;
  }
  .hero-zh {
    font-family: "Noto Serif TC", "Songti TC", Georgia, serif;
    font-size: clamp(1rem, 2vw, 1.35rem); color: var(--muted); margin-bottom: 28px;
  }
  .hero-date { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .hero-date span {
    padding: 9px 12px; border: 1px solid var(--line); border-radius: 999px;
    background: rgba(255,255,255,.55); font-size: .76rem; font-weight: 850; letter-spacing: .04em;
  }
  .departure-callout {
    display: inline-flex; align-items: center; gap: 13px;
    background: var(--yamabuki-soft); border-left: 5px solid var(--yamabuki);
    padding: 15px 18px; border-radius: 13px;
  }
  .departure-callout strong, .departure-callout span { display: block; }
  .departure-callout span { color: #6c654d; font-size: .82rem; margin-top: 2px; }

  .hero-art {
    position: relative; min-height: 460px; border-radius: 40px;
    overflow: hidden; background: linear-gradient(180deg, #e9f1f2 0%, #f2e2cf 58%, #c9ddd6 59%, #b8d1c9 100%);
    border: 10px solid rgba(255,255,255,.66); box-shadow: var(--shadow);
  }
  .hero-sun {
    position: absolute; width: 128px; height: 128px; border-radius: 50%;
    background: var(--beni); right: 12%; top: 12%;
  }
  .hero-obelisk {
    position: absolute; width: 44px; height: 64%; left: 50%; bottom: 17%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, #f0ede4 0 50%, #c9c4b8 50%);
    clip-path: polygon(50% 0, 100% 11%, 86% 100%, 14% 100%, 0 11%);
    filter: drop-shadow(8px 12px 12px rgba(0,0,0,.12));
  }
  .hero-water {
    position: absolute; left: -4%; bottom: 6%; width: 108%; height: 21%;
    border-radius: 50%; border-top: 4px solid rgba(15,76,92,.32);
    background: linear-gradient(180deg, transparent, rgba(15,76,92,.18));
  }
  .hero-stamp {
    position: absolute; left: 25px; bottom: 24px; width: 112px; aspect-ratio: 1;
    border: 2px solid rgba(15,76,92,.72); border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: var(--ai); transform: rotate(-8deg); text-align: center;
  }
  .hero-stamp span { font-size: .55rem; letter-spacing: .14em; font-weight: 850; }
  .hero-stamp strong { font-size: 2.25rem; line-height: 1; margin: 4px 0; }

  .transport-strip {
    max-width: var(--max); margin: -34px auto 0; padding: 0 clamp(16px, 4vw, 40px);
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; position: relative; z-index: 2;
  }
  .transport-card {
    background: rgba(255,255,255,.88); border: 1px solid var(--line); border-radius: 18px;
    padding: 18px; display: grid; grid-template-columns: auto 1fr auto; gap: 13px;
    align-items: center; box-shadow: 0 12px 34px rgba(43,39,31,.06);
  }
  .transport-icon {
    width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center;
    background: var(--hanada-soft); color: var(--hanada);
  }
  .transport-label { display: flex; gap: 6px; color: var(--muted); font-size: .74rem; font-weight: 800; text-transform: uppercase; }
  .transport-card strong { display: block; margin: 3px 0; font-size: .92rem; }
  .transport-sub { display: flex; flex-direction: column; font-size: .84rem; color: var(--muted); line-height: 1.35; }

  .quick-facts {
    max-width: var(--max); margin: 18px auto 0; padding: 0 clamp(16px, 4vw, 40px);
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
  }
  .quick-facts article {
    background: rgba(255,255,255,.5); border: 1px solid var(--line); border-radius: 16px; padding: 16px;
  }
  .quick-facts strong { display: block; color: var(--ai); font-size: 1.45rem; margin-bottom: 4px; }

  .return-alert {
    max-width: calc(var(--max) - 80px); margin: 18px auto 0;
    display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: start;
    padding: 17px 19px; border-radius: 16px; background: var(--beni-soft); border: 1px solid #e7c7c2;
  }
  .return-alert .alert-icon {
    width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px;
    background: white; color: var(--beni);
  }
  .return-alert strong, .return-alert > div > span { display: block; }
  .return-alert > div > span { color: #765957; font-size: .86rem; margin: 2px 0 8px; }
  .return-alert p { margin: 2px 0; font-size: .86rem; line-height: 1.45; color: #5f4b49; }

  .day-section {
    max-width: var(--max); margin: 0 auto; padding: 90px clamp(16px, 4vw, 40px) 20px;
  }
  .day-header {
    display: grid; grid-template-columns: auto 1fr auto; gap: 22px; align-items: end;
    padding-bottom: 26px; border-bottom: 1px solid var(--line); margin-bottom: 28px;
  }
  .day-number {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(4rem, 8vw, 7rem); line-height: .75; color: var(--accent);
  }
  .accent-hanada { --accent: var(--hanada); --accent-soft: var(--hanada-soft); }
  .accent-beni { --accent: var(--beni); --accent-soft: var(--beni-soft); }
  .accent-matcha { --accent: #68887B; --accent-soft: var(--matcha-soft); }

  .date-line { display: flex; flex-wrap: wrap; gap: 9px; color: var(--accent); font-size: .79rem; font-weight: 900; letter-spacing: .1em; }
  .day-heading h2 {
    font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 4.5vw, 4rem);
    line-height: 1; letter-spacing: -.035em; margin: 8px 0 4px;
  }
  .day-title-zh { color: var(--muted); font-size: 1rem; margin-bottom: 14px; }
  .day-summary { display: flex; flex-direction: column; gap: 3px; max-width: 760px; font-size: .94rem; line-height: 1.5; }
  .day-summary span:last-child { color: var(--muted); }

  .filter-button {
    display: inline-flex; align-items: center; gap: 8px; padding: 11px 13px;
    border: 1px solid var(--line); border-radius: 12px; background: white; cursor: pointer;
  }
  .filter-button:hover { background: var(--accent-soft); border-color: var(--accent); }
  .filter-button .bi { font-size: .74rem; text-align: left; }

  .day-body { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(260px, .55fr); gap: 24px; align-items: start; }
  .timeline { position: relative; }
  .timeline::before {
    content: ""; position: absolute; left: 132px; top: 18px; bottom: 18px;
    width: 1px; background: var(--line);
  }
  .timeline-item {
    display: grid; grid-template-columns: 108px 48px minmax(0,1fr); align-items: start; min-height: 88px;
  }
  .time-cell { padding-top: 13px; text-align: right; position: relative; }
  .time-cell time { font-size: .82rem; font-weight: 850; color: var(--accent); }
  .fixed-dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: var(--beni); margin-left: 7px;
  }
  .timeline-rail { position: relative; z-index: 1; display: flex; justify-content: center; padding-top: 6px; }
  .timeline-icon {
    width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center;
    background: var(--paper); border: 1px solid var(--line); color: var(--accent);
  }
  .type-flight .timeline-icon,
  .type-airport .timeline-icon,
  .type-security .timeline-icon {
    background: var(--accent); color: white; border-color: var(--accent);
  }
  .type-meal .timeline-icon { background: var(--yamabuki-soft); color: #8d6208; }
  .type-visit .timeline-icon { background: var(--accent-soft); color: var(--accent); }
  .type-boat .timeline-icon { background: var(--hanada-soft); color: var(--hanada); }

  .timeline-card {
    background: rgba(255,255,255,.72); border: 1px solid var(--line); border-radius: 16px;
    padding: 14px 15px; margin-bottom: 12px; transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
  }
  .timeline-card:hover {
    transform: translateY(-2px); border-color: var(--accent);
    box-shadow: 0 10px 25px rgba(43,39,31,.06);
  }
  .timeline-main { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
  .type-label { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 4px; }
  .type-label .bi { flex-direction: row; gap: 5px; color: var(--muted); font-size: .78rem; font-weight: 850; text-transform: uppercase; letter-spacing: .05em; }
  .type-label .bi .zh { color: var(--muted); font-size: 1em; }
  .fixed-badge {
    padding: 3px 6px; border-radius: 999px; background: var(--beni-soft); color: var(--beni);
    font-size: .66rem; font-weight: 900; letter-spacing: .04em;
  }
  .timeline-card h3 { font-size: 1.04rem; margin-bottom: 2px; }
  .timeline-card h3 + p { margin: 0; color: var(--muted); font-size: .84rem; }
  .timeline-detail {
    display: flex; flex-direction: column; gap: 2px; margin-top: 10px;
    padding-top: 9px; border-top: 1px solid #ebe7dd; font-size: .84rem; line-height: 1.4;
  }
  .timeline-detail span:last-child { color: var(--muted); }
  .timeline-actions { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .map-button, .mini-map {
    display: inline-flex; align-items: center; gap: 7px; text-decoration: none;
    color: var(--hanada); background: var(--hanada-soft); border-radius: 10px;
    padding: 9px 11px; font-size: .78rem; font-weight: 850;
  }
  .map-button.compact { width: 34px; height: 34px; padding: 0; justify-content: center; }
  .mini-map { padding: 7px 8px; }
  .map-button:hover, .mini-map:hover { background: #c8e0e9; }

  .day-sidebar { position: sticky; top: 92px; }
  .priority-panel { display: grid; gap: 12px; }
  .priority-box { border-radius: 17px; padding: 18px; border: 1px solid var(--line); background: white; }
  .priority-box.keep { border-top: 5px solid var(--accent); }
  .priority-box.cut { border-top: 5px solid var(--beni); }
  .priority-kicker { font-size: .72rem; font-weight: 900; letter-spacing: .08em; color: var(--muted); margin-bottom: 10px; }
  .priority-box ul { margin: 0; padding-left: 1.05rem; }
  .priority-box li { padding: 5px 0; font-size: .84rem; line-height: 1.35; }

  .checklist-section, .packing-section {
    max-width: var(--max); margin: 0 auto; padding: 90px clamp(16px, 4vw, 40px) 20px;
  }
  .section-title {
    display: flex; align-items: flex-end; gap: 18px; padding-bottom: 24px; border-bottom: 1px solid var(--line); margin-bottom: 24px;
  }
  .section-index { font-family: Georgia, "Times New Roman", serif; font-size: 4.5rem; line-height: .78; color: var(--ai); }
  .section-title h2 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(2rem, 4vw, 3.4rem); margin-bottom: 2px; }
  .section-title p { color: var(--muted); margin: 0; }

  .checklist-card {
    background: var(--ai); color: white; border-radius: 24px; padding: clamp(20px, 4vw, 34px);
  }
  .checklist-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .checklist-top strong { display: block; font-size: 2rem; }
  .checklist-top span { color: rgba(255,255,255,.72); font-size: .84rem; }
  .checklist-top button {
    color: white; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.24);
    padding: 8px 11px; border-radius: 10px; cursor: pointer;
  }
  .progress { height: 8px; background: rgba(255,255,255,.16); border-radius: 999px; margin: 18px 0 22px; overflow: hidden; }
  .progress span { display: block; height: 100%; background: var(--yamabuki); transition: width .2s ease; }
  .checklist-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .checklist-grid label {
    display: flex; align-items: flex-start; gap: 10px; padding: 11px;
    border-radius: 12px; cursor: pointer; background: rgba(255,255,255,.06);
  }
  .checklist-grid label:hover { background: rgba(255,255,255,.1); }
  .checklist-grid label.checked { opacity: .68; }
  .checklist-grid input { position: absolute; opacity: 0; }
  .check-box {
    width: 21px; height: 21px; border-radius: 6px; border: 1px solid rgba(255,255,255,.48);
    display: grid; place-items: center; flex: 0 0 auto; color: transparent;
  }
  .checklist-grid input:checked + .check-box { background: white; color: var(--ai); border-color: white; }
  .checklist-grid .bi { font-size: .86rem; }
  .checklist-grid .bi .zh { color: rgba(255,255,255,.68); }

  .packing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
  .packing-grid article { background: white; border: 1px solid var(--line); border-radius: 20px; padding: 22px; }
  .packing-icon {
    width: 40px; height: 40px; display: grid; place-items: center;
    border-radius: 12px; background: var(--hanada-soft); color: var(--hanada); margin-bottom: 15px;
  }
  .packing-grid h3 { margin-bottom: 2px; }
  .packing-grid h3 + p { color: var(--muted); font-size: .84rem; }
  .packing-grid ul { margin: 14px 0 0; padding-left: 1.05rem; }
  .packing-grid li { padding: 5px 0; font-size: .86rem; }
  .rules-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 15px; }
  .rules-row > div {
    display: grid; grid-template-columns: 110px 1fr; gap: 14px; align-items: start;
    background: var(--yamabuki-soft); border: 1px solid #ead9a4; border-radius: 16px; padding: 17px;
  }
  .rules-row strong { color: #705515; }

  .floating-map {
    position: fixed; right: 16px; bottom: 16px; z-index: 1100;
    display: flex; align-items: center; gap: 10px; text-decoration: none;
    background: rgba(28,28,28,.93); color: white; border-radius: 15px;
    padding: 11px 14px; box-shadow: 0 16px 34px rgba(0,0,0,.18);
  }
  .floating-map strong, .floating-map small { display: block; }
  .floating-map strong { font-size: .84rem; }
  .floating-map small { color: rgba(255,255,255,.65); font-size: .64rem; margin-top: 2px; }

  footer {
    max-width: var(--max); margin: 90px auto 0; padding: 28px 40px 84px;
    border-top: 1px solid var(--line); display: flex; justify-content: space-between; gap: 20px;
    color: var(--muted); font-size: .76rem;
  }
  footer strong, footer span { display: block; }
  footer strong { color: var(--ink); }

  a:focus-visible, button:focus-visible, input:focus-visible + .check-box {
    outline: 3px solid rgba(0,98,132,.35); outline-offset: 3px;
  }

  @media (max-width: 1040px) {
    .menu-button { display: grid; place-items: center; }
    .nav {
      position: fixed; top: 72px; right: 12px; left: 12px;
      display: none; grid-template-columns: repeat(2, 1fr); padding: 12px;
      background: var(--paper); border: 1px solid var(--line); border-radius: 16px; box-shadow: var(--shadow);
    }
    .nav.open { display: grid; }
    .hero { grid-template-columns: 1fr; }
    .hero-art { min-height: 360px; }
    .transport-strip { grid-template-columns: 1fr; margin-top: 0; }
    .quick-facts { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 820px) {
    .day-header { grid-template-columns: auto 1fr; align-items: start; }
    .filter-button { grid-column: 1 / -1; justify-self: start; }
    .day-body { grid-template-columns: 1fr; }
    .day-sidebar { position: static; }
    .packing-grid { grid-template-columns: 1fr; }
    .checklist-grid { grid-template-columns: 1fr; }
    .rules-row { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .topbar { height: 66px; padding-inline: 14px; }
    .brand-copy small { display: none; }
    html { scroll-padding-top: 72px; }

    .hero { padding: 48px 16px 38px; min-height: auto; }
    .hero h1 { font-size: 3.8rem; }
    .hero-art { min-height: 270px; border-radius: 24px; border-width: 6px; }
    .hero-sun { width: 92px; height: 92px; }
    .hero-stamp { width: 88px; left: 18px; bottom: 18px; }

    .transport-strip, .quick-facts { padding-inline: 14px; }
    .quick-facts { grid-template-columns: 1fr 1fr; gap: 10px; }
    .return-alert { margin-inline: 14px; }

    .day-section, .checklist-section, .packing-section { padding-inline: 14px; padding-top: 68px; }
    .day-header { grid-template-columns: 1fr; gap: 14px; }
    .day-number { font-size: 3.8rem; }
    .filter-button { grid-column: auto; }
    .timeline::before { left: 17px; }
    .timeline::before { left: 15px; }
    .timeline-item {
      grid-template-columns: 32px minmax(0,1fr);
      grid-template-areas:
        "rail time"
        "rail card";
      min-height: 118px;
      column-gap: 8px;
    }
    .time-cell {
      grid-area: time;
      text-align: left;
      padding: 2px 0 7px;
      writing-mode: horizontal-tb;
      transform: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .time-cell time { font-size: .78rem; }
    .fixed-dot { display: inline-block; }
    .timeline-rail { grid-area: rail; justify-content: flex-start; }
    .timeline-card { grid-area: card; margin-bottom: 16px; }
    .timeline-main { gap: 8px; }
    .timeline-actions { flex-direction: column; align-items: flex-end; }
    .timeline-card h3 { font-size: 1rem; }

    .section-index { font-size: 3rem; }
    .rules-row > div { grid-template-columns: 1fr; gap: 7px; }

    .floating-map { right: 10px; bottom: 10px; padding: 10px 12px; }
    .floating-map span { display: none; }

    footer { margin-top: 60px; padding-inline: 16px; flex-direction: column; }
  }

  @media print {
    .topbar, .floating-map, .filter-button, .map-button, .mini-map, .checklist-top button { display: none !important; }
    .hero { min-height: auto; padding: 20px 0; }
    .hero-art { display: none; }
    .transport-strip, .quick-facts, .day-section, .checklist-section, .packing-section {
      max-width: none; padding-left: 0; padding-right: 0;
    }
    .timeline-card, .transport-card, .packing-grid article, .priority-box, .checklist-card { break-inside: avoid; }
    .day-sidebar { position: static; }
    .app { background: white; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }
`;
