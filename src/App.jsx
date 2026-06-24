import React, { useEffect, useMemo, useState } from "react";

/**
 * DC 2026 Travel Infrastructure
 * Single-file React component. No third-party packages required.
 * Default export: DC2026Infrastructure
 */

const COLORS = {
  paper: "#FCFAF2",
  sumi: "#1C1C1C",
  ai: "#0F4C5C",
  aiSoft: "#DDEBEA",
  beni: "#CB4042",
  beniSoft: "#F4E1DE",
  yamabuki: "#FFB11B",
  yamabukiSoft: "#F8EDCF",
  hanada: "#006284",
  hanadaSoft: "#DCECF2",
  matcha: "#86A697",
  matchaSoft: "#E5ECE7",
  nezumi: "#787D7B",
  shironeri: "#FCFAF2",
  border: "#D8D2C4",
  white: "#FFFFFF",
};

const content = {
  en: {
    appTitle: "Washington, D.C. 2026",
    appSubtitle: "A field-ready travel operating guide",
    dates: "June 24–26, 2026",
    status: "Departure edition",
    verified: "Public information checked June 24, 2026",
    nav: {
      overview: "Overview",
      day1: "Day 1",
      day2: "Day 2",
      day3: "Day 3",
      transport: "Transport",
      packing: "Packing",
      backup: "Contingencies",
      sources: "Sources",
    },
    hero: {
      eyebrow: "3 DAYS · 2 NIGHTS · BOSTON TO WASHINGTON",
      title: "Your complete D.C. operating plan",
      intro:
        "This guide turns every reservation, transfer, admission window, meal, and fallback decision into one clear system. Use the timeline during the day and open the detail cards only when needed.",
      critical: "Critical departure line",
      criticalText:
        "Leave Allston at 4:00 AM. Reach Logan Terminal C by 5:00 AM. Be at the gate by about 5:35 AM.",
    },
    switcher: {
      label: "Language",
      en: "English",
      zh: "中文",
      both: "EN + 中文",
    },
    overview: {
      title: "Trip command center",
      subtitle: "The few facts that control the entire trip",
      fixed: "Fixed commitments",
      flexible: "Flexible blocks",
      risk: "Items to reconfirm",
      fixedItems: [
        ["Jun 24 · 6:15 AM", "JetBlue B6 2255 departs BOS"],
        ["Jun 24 · 5:00 PM", "Old Ebbitt Grill reservation"],
        ["Jun 25 · 10:00 AM", "Washington Monument ticket"],
        ["Jun 25 · 2:00 PM", "Air and Space Museum ticket"],
        ["Jun 25 · 4:30 PM", "Library of Congress ticket"],
        ["Jun 26 · 3:30 PM", "Georgetown water taxi"],
        ["Jun 26 · 10:00 PM", "Delta DL 5633 departs DCA"],
      ],
      flexibleItems: [
        "Chinatown and CityCenter walk",
        "Secondary National Gallery rooms",
        "One of the Vietnam or Korean War memorials",
        "M Street shopping",
        "The Wharf dwell time",
      ],
      riskItems: [
        "Confirm the final return booking. A later planning note mentions Acela 2262 on June 27, while this operating plan uses Delta DL 5633 on June 26.",
        "Confirm the hostel’s luggage storage, late check-in process, and locker requirements.",
        "Check airline gates, Metro alerts, water taxi status, and weather on each travel day.",
      ],
      metrics: [
        ["3", "timed-entry tickets"],
        ["2", "airport transfers"],
        ["1", "restaurant reservation"],
        ["10–13 mi", "likely walking on Day 2"],
      ],
    },
    now: {
      title: "Do these five things before leaving",
      items: [
        "Complete JetBlue check-in and save the boarding pass offline.",
        "Confirm the terminal and gate in the JetBlue app.",
        "Set alarms for 3:30 AM and 3:40 AM. Request the ride at 4:00 AM.",
        "Save all three timed-entry QR codes as screenshots.",
        "Confirm late check-in and luggage storage with the hostel.",
      ],
    },
    flight: {
      outTitle: "Outbound flight",
      backTitle: "Return flight",
      outbound: [
        ["Flight", "JetBlue B6 2255"],
        ["Route", "Boston BOS → Washington DCA"],
        ["Date", "Wednesday, June 24"],
        ["Schedule", "6:15 AM → 7:57 AM"],
        ["Aircraft", "Airbus A220-300"],
        ["Boston terminal", "Terminal C, subject to boarding pass"],
        ["Airport arrival target", "4:45–5:00 AM"],
        ["Gate target", "About 5:35 AM"],
      ],
      inbound: [
        ["Flight", "Delta DL 5633"],
        ["Route", "Washington DCA → Boston BOS"],
        ["Date", "Friday, June 26"],
        ["Schedule", "10:00 PM → 11:44 PM"],
        ["Aircraft", "Embraer 175"],
        ["DCA terminal", "Terminal 2"],
        ["Airport arrival target", "8:00–8:15 PM"],
        ["Gate target", "About 9:20 PM"],
      ],
      note:
        "Airline schedules and gates can change. The boarding pass and airline app are the final authority.",
    },
    day1: {
      date: "Wednesday · June 24",
      title: "Arrival, art, Old Ebbitt, and the Tidal Basin",
      theme: "Low-friction arrival day",
      summary:
        "The first day protects the 5:00 PM reservation and saves enough energy for Jefferson Memorial at sunset.",
      timeline: [
        ["4:00 AM", "Leave Allston", "Rideshare to Logan Terminal C", "fixed"],
        ["4:45–5:00 AM", "Arrive at BOS", "TSA, refill water, walk to gate", "fixed"],
        ["6:15–7:57 AM", "JetBlue B6 2255", "BOS to DCA", "fixed"],
        ["8:20–9:15 AM", "DCA to hostel", "Yellow Line to Mount Vernon Square", "move"],
        ["9:15–9:35 AM", "Store luggage", "I Street Capsule Hostel", "fixed"],
        ["9:35–10:40 AM", "Chinatown loop", "Water, coffee, essentials only", "flex"],
        ["11:00–11:45 AM", "Lunch at Teaism", "400 8th St NW", "meal"],
        ["12:05–3:45 PM", "National Gallery of Art", "West Building first", "visit"],
        ["4:45 PM", "Arrive at Old Ebbitt", "Check in 15 minutes early", "fixed"],
        ["5:00–6:15 PM", "Old Ebbitt Grill", "Reservation for one", "meal"],
        ["6:15–6:55 PM", "Walk to Jefferson Memorial", "Ellipse and Monument route", "move"],
        ["6:55–8:20 PM", "Jefferson Memorial", "Tidal Basin at dusk", "visit"],
        ["8:20–9:00 PM", "Return to hostel", "Rideshare recommended", "move"],
      ],
      highlights: [
        ["Teaism Penn Quarter", "400 8th Street NW", "Lunch begins at 11:00 AM. Do not add a full breakfast beforehand."],
        ["National Gallery, West Building", "6th St and Constitution Ave NW", "Prioritize Ginevra de’ Benci, The Alba Madonna, Woman Holding a Balance, Young Girl Reading, and the Impressionist galleries."],
        ["Old Ebbitt Grill", "675 15th Street NW", "Arrive at 4:45 PM. Keep dinner near 75 minutes."],
        ["Thomas Jefferson Memorial", "16 E Basin Dr SW", "Allow 35–40 minutes to walk from Old Ebbitt. A full Tidal Basin loop is unnecessary."],
      ],
      cut: ["Chinatown loop", "Secondary gallery rooms", "Full Tidal Basin loop"],
      protect: ["Luggage storage and check-in plan", "Old Ebbitt at 5:00 PM"],
    },
    day2: {
      date: "Thursday · June 25",
      title: "Monuments, museums, and Capitol Hill",
      theme: "High-density timed-entry day",
      summary:
        "This is the most demanding day. The schedule is built backward from three admission windows. Food must remain fast and portable.",
      timeline: [
        ["7:00–7:30 AM", "Wake and eat", "Simple hostel breakfast", "meal"],
        ["7:40 AM", "Leave hostel", "Walk toward Lafayette Square", "fixed"],
        ["8:10–8:45 AM", "White House", "North-side photographs", "visit"],
        ["8:45–9:15 AM", "Walk to Washington Monument", "Allow 20–30 minutes", "move"],
        ["9:15–9:50 AM", "Queue and security", "Open QR code before arrival", "fixed"],
        ["10:00–10:50 AM", "Washington Monument", "Timed reservation", "fixed"],
        ["11:05–11:25 AM", "World War II Memorial", "Short focused stop", "visit"],
        ["11:25 AM–12:00 PM", "Reflecting Pool walk", "Hydrate and photograph", "move"],
        ["12:00–12:25 PM", "Lincoln Memorial", "Main chamber and steps", "visit"],
        ["12:25–12:55 PM", "Vietnam and Korean memorials", "Trim one if delayed", "visit"],
        ["1:15–1:40 PM", "Fast lunch", "Pavilion Café or grab-and-go", "meal"],
        ["2:00–3:30 PM", "Air and Space Museum", "Timed-entry ticket", "fixed"],
        ["3:30–3:55 PM", "Walk to Library of Congress", "Do not stop for shopping", "move"],
        ["3:55–4:25 PM", "Queue and security", "Peak-season buffer", "fixed"],
        ["4:30–6:40 PM", "Library of Congress", "Timed-entry ticket", "fixed"],
        ["7:10–8:10 PM", "DAIKAYA", "First-floor ramen shop", "meal"],
      ],
      highlights: [
        ["White House north side", "Lafayette Square, 16th St NW & H St NW", "Security perimeters can change. Use the best available public viewpoint rather than chasing a closer angle."],
        ["Washington Monument", "2 15th St NW", "Timed entry is required. Arrive 30–45 minutes early for security."],
        ["National Air and Space Museum", "650 Jefferson Drive SW", "Use the Jefferson Drive entrance. Free timed-entry passes are required. The museum is open 10:00 AM–5:30 PM."],
        ["Library of Congress", "10 First Street SE", "Thursday visitor hours run to 8:00 PM. Peak visitation from March through July can lengthen security lines."],
        ["DAIKAYA Ramen Shop", "705 6th St NW", "Use the first floor. The second-floor izakaya does not serve the ramen menu."],
      ],
      airspace: [
        "1903 Wright Flyer",
        "Apollo 11 Command Module Columbia",
        "Boeing Milestones of Flight Hall",
        "Destination Moon",
        "Mercury Friendship 7 or Spirit of St. Louis if time remains",
      ],
      cut: ["Pavilion Café, replace with grab-and-go", "One secondary memorial", "Secondary Air and Space galleries"],
      protect: ["Washington Monument at 10:00 AM", "Air and Space at 2:00 PM", "Library of Congress at 4:30 PM"],
    },
    day3: {
      date: "Friday · June 26",
      title: "Georgetown, the Potomac, and departure",
      theme: "Leisurely morning, strict evening",
      summary:
        "The first half is flexible. The second half is controlled by the 3:30 PM boat, luggage pickup, and DCA arrival target.",
      timeline: [
        ["8:30–10:15 AM", "Slow morning", "Breakfast, packing, charging", "flex"],
        ["10:15–11:00 AM", "Check out", "Store luggage at hostel", "fixed"],
        ["11:00–11:35 AM", "Travel to Georgetown", "Rideshare saves time", "move"],
        ["11:35 AM–12:20 PM", "M Street and C&O Canal", "Historic commercial core", "visit"],
        ["12:20–1:20 PM", "Lunch", "M Street or Washington Harbour", "meal"],
        ["1:20–2:05 PM", "Wisconsin Avenue", "Shops and side streets", "flex"],
        ["2:05–2:50 PM", "Waterfront Park", "Potomac and Key Bridge views", "visit"],
        ["2:50–3:10 PM", "Walk to dock", "Move toward Washington Harbour", "move"],
        ["3:10–3:20 PM", "Water taxi check-in", "Boarding buffer", "fixed"],
        ["3:30–4:15 PM", "Potomac Water Taxi", "Georgetown to The Wharf", "fixed"],
        ["4:15–5:15 PM", "The Wharf", "Transit Pier and waterfront", "visit"],
        ["5:15–5:50 PM", "Return to Chinatown", "Metro or rideshare", "move"],
        ["5:50–6:35 PM", "Bantam King", "Early dinner", "meal"],
        ["6:50–7:10 PM", "Collect luggage", "Final repack", "fixed"],
        ["7:10–7:50 PM", "Travel to DCA", "Yellow Line", "move"],
        ["8:00–8:15 PM", "Arrive at Terminal 2", "TSA and gate", "fixed"],
        ["10:00–11:44 PM", "Delta DL 5633", "DCA to BOS", "fixed"],
      ],
      highlights: [
        ["Old Stone House", "3051 M St NW", "A practical starting point for the M Street walk."],
        ["Georgetown Waterfront Park", "Wisconsin Ave & K St NW", "Use the riverfront path for Potomac and Key Bridge views."],
        ["Georgetown Dock", "3100 K St NW", "Check in around 3:10 PM for the 3:30 PM one-way sailing."],
        ["The Wharf Transit Pier", "950 Wharf St SW", "Keep the visit near one hour so dinner and airport timing remain intact."],
        ["Bantam King", "501 G St NW", "Target 5:50 PM arrival and a 40–45 minute meal."],
      ],
      taxi: [
        ["Departure", "Georgetown · 3:30 PM"],
        ["Arrival", "The Wharf · 4:15 PM"],
        ["Fare", "About $25 one way"],
        ["Check-in", "3:10–3:15 PM"],
      ],
      cut: ["M Street shopping", "The Wharf dwell time", "Water taxi if weather or operations fail"],
      protect: ["Luggage pickup by about 7:10 PM", "DCA arrival by 8:15 PM", "Delta departure at 10:00 PM"],
    },
    transport: {
      title: "Transport system",
      subtitle: "Use this as the movement layer beneath the daily schedule",
      routes: [
        {
          title: "Allston → Logan",
          steps: ["4:00 AM rideshare", "Terminal C drop-off", "TSA", "Gate by about 5:35 AM"],
          note: "Do not rely on the first Green Line and Blue Line connection for a 6:15 AM flight.",
        },
        {
          title: "DCA → Hostel",
          steps: ["Terminal 2 walkway", "DCA Metro station", "Yellow Line northbound", "Mount Vernon Square", "8–12 minute walk"],
          note: "Allow 45–60 minutes from aircraft arrival to hostel.",
        },
        {
          title: "Hostel → DCA",
          steps: ["Walk to Gallery Place", "Yellow Line southbound", "DCA station", "Terminal 2 walkway"],
          note: "Leave the hostel area around 7:10 PM for an 8:00–8:15 PM airport arrival.",
        },
        {
          title: "Logan → Allston after midnight",
          steps: ["Massport shuttle", "Airport Blue Line station", "Government Center", "Green Line B"],
          note: "Check live late-night service immediately after landing. Use rideshare if the rail connection is no longer practical.",
        },
      ],
      hostel: [
        ["Name", "I Street Capsule Hostel"],
        ["Address", "512 I St NW, Washington, DC 20001"],
        ["Metro", "Mount Vernon Square / Gallery Place"],
        ["Confirm", "Luggage storage, late check-in, access code or key, towel, locker size, and lock requirement"],
      ],
    },
    packing: {
      title: "Packing and carry-on control",
      subtitle: "Pack for security, walking, heat, rain, and hostel conditions",
      categories: [
        {
          title: "Identity and reservations",
          items: ["Passport or REAL ID", "Both boarding passes", "Hostel confirmation", "Three timed-entry QR codes", "Old Ebbitt reservation", "Water taxi ticket", "Offline addresses"],
        },
        {
          title: "Electronics",
          items: ["Phone", "Charging cable", "Power bank", "Earbuds", "Watch charger", "Offline screenshots"],
        },
        {
          title: "Clothing and hostel",
          items: ["Two changes of clothes", "Underwear and socks", "Light layer", "Walking shoes", "Sleepwear", "Earplugs", "Eye mask", "Shower sandals", "Small lock", "Small towel"],
        },
        {
          title: "Outdoor and health",
          items: ["Sunscreen", "Hat", "Compact umbrella or rain shell", "Empty water bottle", "Tissues", "Medication", "Pain relief", "Stomach medicine", "Bandages"],
        },
      ],
      tsa:
        "Carry-on liquids, gels, and creams must be 3.4 oz / 100 ml or less per container and fit in one quart-size clear bag. Bring the water bottle empty through security.",
      bag:
        "To satisfy both airlines, keep the carry-on at or below 22 × 14 × 9 inches. JetBlue’s personal-item limit is 17 × 13 × 8 inches.",
    },
    contingencies: {
      title: "Decision rules when the schedule slips",
      subtitle: "Protect reservations first. Remove low-value walking and shopping before fixed admissions.",
      rows: [
        ["Day 1", "Cut Chinatown, secondary galleries, then the full basin loop", "Protect luggage handling and Old Ebbitt"],
        ["Day 2", "Replace lunch, cut one memorial, then secondary museum rooms", "Protect all three timed entries"],
        ["Day 3", "Cut shopping, shorten The Wharf, then replace the boat", "Protect luggage pickup and DCA arrival"],
      ],
      weatherTitle: "Weather response",
      weather: [
        ["Heat", "Start hydrated, use indoor stops, and shorten exposed memorial walks."],
        ["Thunderstorms", "Do not wait on an exposed pier. Verify the boat before leaving Georgetown."],
        ["Heavy rain", "Use rideshare for Jefferson Memorial and replace the waterfront walk with indoor time."],
        ["Flight disruption", "Use the airline app first. Keep all confirmations and payment cards accessible."],
      ],
      returnConflictTitle: "Return-booking conflict",
      returnConflict:
        "This source itinerary uses Delta DL 5633 on Friday, June 26. A later planning record mentions Amtrak Acela 2262 from Washington Union Station to Boston South Station on Saturday, June 27. These cannot both be the active return plan. Confirm the ticket in the airline or Amtrak account before relying on Day 3 departure timing.",
    },
    sources: {
      title: "Verification and official references",
      subtitle: "Operational details should still be checked on the day of travel",
      items: [
        ["JetBlue", "Flight status, boarding pass, baggage"],
        ["Delta", "Return flight status and Boston arrival terminal"],
        ["Massport", "Logan terminal and shuttle information"],
        ["WMATA", "Yellow Line status and first/last trains"],
        ["National Park Service", "Washington Monument and memorial operations"],
        ["National Gallery of Art", "Hours and visitor information"],
        ["National Air and Space Museum", "Timed entry, entrance, open galleries"],
        ["Library of Congress", "Thursday hours, security, Live! entry"],
        ["City Experiences", "Potomac Water Taxi status and dock instructions"],
        ["TSA", "Identification and 3-1-1 liquids rule"],
      ],
      design:
        "Interface structure follows responsive React patterns and WCAG 2.2 principles: semantic headings, keyboard-accessible controls, visible focus states, adequate contrast, reduced-motion support, and layouts that reflow without horizontal scrolling.",
    },
    checklist: {
      title: "Live departure checklist",
      reset: "Reset",
      completed: "completed",
      items: [
        "JetBlue check-in complete",
        "Terminal and gate confirmed",
        "Phone fully charged",
        "Power bank fully charged",
        "3:30 AM alarms set",
        "4:00 AM ride planned",
        "Passport or REAL ID packed",
        "Liquids follow 3-1-1",
        "Hostel late check-in confirmed",
        "Hostel luggage storage confirmed",
        "Water taxi purchased or fallback accepted",
        "Return booking reconfirmed",
      ],
    },
  },

  zh: {
    appTitle: "Washington, D.C. 2026",
    appSubtitle: "可直接執行的華府旅行系統",
    dates: "2026 年 6 月 24 日至 26 日",
    status: "出發執行版",
    verified: "公共資訊核對日期：2026 年 6 月 24 日",
    nav: {
      overview: "總覽",
      day1: "第一天",
      day2: "第二天",
      day3: "第三天",
      transport: "交通",
      packing: "行李",
      backup: "延誤備案",
      sources: "資料來源",
    },
    hero: {
      eyebrow: "3 天 · 2 夜 · 波士頓至華盛頓",
      title: "完整華府行程執行系統",
      intro:
        "本指南將訂位、交通、入場時段、餐飲與延誤處理整合成同一套系統。白天先看時間軸，需要時再展開細節。",
      critical: "最重要的出發時間",
      criticalText:
        "凌晨 4:00 從 Allston 出發，5:00 前抵達 Logan Terminal C，約 5:35 前抵達登機門。",
    },
    switcher: {
      label: "語言",
      en: "English",
      zh: "中文",
      both: "中英同步",
    },
    overview: {
      title: "行程控制中心",
      subtitle: "整趟旅程最重要的固定條件",
      fixed: "固定行程",
      flexible: "可調整項目",
      risk: "出發前需重新確認",
      fixedItems: [
        ["6/24 · 6:15 AM", "JetBlue B6 2255 自 BOS 起飛"],
        ["6/24 · 5:00 PM", "Old Ebbitt Grill 訂位"],
        ["6/25 · 10:00 AM", "Washington Monument 票券"],
        ["6/25 · 2:00 PM", "Air and Space Museum 票券"],
        ["6/25 · 4:30 PM", "Library of Congress 票券"],
        ["6/26 · 3:30 PM", "Georgetown 水上計程船"],
        ["6/26 · 10:00 PM", "Delta DL 5633 自 DCA 起飛"],
      ],
      flexibleItems: [
        "Chinatown 與 CityCenter 散步",
        "National Gallery 次要展廳",
        "Vietnam 或 Korean War Memorial 其中一處",
        "M Street 購物",
        "The Wharf 停留時間",
      ],
      riskItems: [
        "確認最終回程訂位。較新的規劃紀錄提及 6 月 27 日 Acela 2262，但本執行版仍使用 6 月 26 日 Delta DL 5633。",
        "確認 hostel 的行李寄放、late check-in 與置物櫃規則。",
        "每日重新確認登機門、Metro 通告、水上計程船及天氣。",
      ],
      metrics: [
        ["3", "張預約入場票券"],
        ["2", "次機場轉乘"],
        ["1", "筆餐廳訂位"],
        ["10–13 英里", "第二天可能步行距離"],
      ],
    },
    now: {
      title: "出門前先完成五件事",
      items: [
        "完成 JetBlue check-in，並離線儲存登機證。",
        "在 JetBlue App 確認航廈與登機門。",
        "設定 3:30 與 3:40 AM 鬧鐘，4:00 AM 叫車。",
        "將三張預約入場 QR code 截圖保存。",
        "向 hostel 確認 late check-in 與行李寄放。",
      ],
    },
    flight: {
      outTitle: "去程航班",
      backTitle: "回程航班",
      outbound: [
        ["航班", "JetBlue B6 2255"],
        ["航線", "Boston BOS → Washington DCA"],
        ["日期", "6 月 24 日，星期三"],
        ["時間", "6:15 AM → 7:57 AM"],
        ["機型", "Airbus A220-300"],
        ["Boston 航廈", "Terminal C，以登機證為準"],
        ["抵達機場目標", "4:45–5:00 AM"],
        ["抵達登機門目標", "約 5:35 AM"],
      ],
      inbound: [
        ["航班", "Delta DL 5633"],
        ["航線", "Washington DCA → Boston BOS"],
        ["日期", "6 月 26 日，星期五"],
        ["時間", "10:00 PM → 11:44 PM"],
        ["機型", "Embraer 175"],
        ["DCA 航廈", "Terminal 2"],
        ["抵達機場目標", "8:00–8:15 PM"],
        ["抵達登機門目標", "約 9:20 PM"],
      ],
      note:
        "航班時間與登機門可能調整，最終以登機證及航空公司 App 為準。",
    },
    day1: {
      date: "星期三 · 6 月 24 日",
      title: "抵達、藝術、Old Ebbitt 與 Tidal Basin",
      theme: "低負擔抵達日",
      summary:
        "第一天以保護 5:00 PM 訂位及晚間 Jefferson Memorial 體力為主。",
      timeline: [
        ["4:00 AM", "離開 Allston", "叫車前往 Logan Terminal C", "fixed"],
        ["4:45–5:00 AM", "抵達 BOS", "安檢、裝水、前往登機門", "fixed"],
        ["6:15–7:57 AM", "JetBlue B6 2255", "BOS 前往 DCA", "fixed"],
        ["8:20–9:15 AM", "DCA 前往 hostel", "Yellow Line 至 Mount Vernon Square", "move"],
        ["9:15–9:35 AM", "寄放行李", "I Street Capsule Hostel", "fixed"],
        ["9:35–10:40 AM", "Chinatown 小迴圈", "僅買水、咖啡及日用品", "flex"],
        ["11:00–11:45 AM", "Teaism 午餐", "400 8th St NW", "meal"],
        ["12:05–3:45 PM", "National Gallery of Art", "先看 West Building", "visit"],
        ["4:45 PM", "抵達 Old Ebbitt", "提早 15 分鐘報到", "fixed"],
        ["5:00–6:15 PM", "Old Ebbitt Grill", "一人訂位", "meal"],
        ["6:15–6:55 PM", "步行至 Jefferson Memorial", "經 Ellipse 與紀念碑", "move"],
        ["6:55–8:20 PM", "Jefferson Memorial", "黃昏 Tidal Basin", "visit"],
        ["8:20–9:00 PM", "返回 hostel", "建議叫車", "move"],
      ],
      highlights: [
        ["Teaism Penn Quarter", "400 8th Street NW", "午餐 11:00 AM 開始，之前不必再安排正式早餐。"],
        ["National Gallery, West Building", "6th St and Constitution Ave NW", "優先看 Ginevra de’ Benci、The Alba Madonna、Woman Holding a Balance、Young Girl Reading 及印象派展廳。"],
        ["Old Ebbitt Grill", "675 15th Street NW", "4:45 PM 報到，用餐控制在約 75 分鐘。"],
        ["Thomas Jefferson Memorial", "16 E Basin Dr SW", "Old Ebbitt 步行過去預留 35 至 40 分鐘，不必繞完整個 Tidal Basin。"],
      ],
      cut: ["Chinatown 小迴圈", "次要展廳", "完整 Tidal Basin 繞行"],
      protect: ["行李寄放與入住安排", "5:00 PM Old Ebbitt 訂位"],
    },
    day2: {
      date: "星期四 · 6 月 25 日",
      title: "紀念碑、博物館與 Capitol Hill",
      theme: "高密度預約入場日",
      summary:
        "這是最緊湊的一天。時間表由三個入場時段反推，午餐必須快速並保有替代方案。",
      timeline: [
        ["7:00–7:30 AM", "起床及早餐", "Hostel 簡單用餐", "meal"],
        ["7:40 AM", "離開 hostel", "步行前往 Lafayette Square", "fixed"],
        ["8:10–8:45 AM", "White House", "北側拍照", "visit"],
        ["8:45–9:15 AM", "步行至 Washington Monument", "預留 20 至 30 分鐘", "move"],
        ["9:15–9:50 AM", "排隊與安檢", "抵達前先開啟 QR code", "fixed"],
        ["10:00–10:50 AM", "Washington Monument", "預約入場", "fixed"],
        ["11:05–11:25 AM", "World War II Memorial", "集中參觀", "visit"],
        ["11:25 AM–12:00 PM", "Reflecting Pool", "拍照及補水", "move"],
        ["12:00–12:25 PM", "Lincoln Memorial", "主殿與階梯", "visit"],
        ["12:25–12:55 PM", "Vietnam 與 Korean Memorial", "延誤時刪除一處", "visit"],
        ["1:15–1:40 PM", "快速午餐", "Pavilion Café 或外帶", "meal"],
        ["2:00–3:30 PM", "Air and Space Museum", "預約入場", "fixed"],
        ["3:30–3:55 PM", "步行至 Library of Congress", "途中不要停留購物", "move"],
        ["3:55–4:25 PM", "排隊與安檢", "旺季緩衝", "fixed"],
        ["4:30–6:40 PM", "Library of Congress", "預約入場", "fixed"],
        ["7:10–8:10 PM", "DAIKAYA", "一樓拉麵店", "meal"],
      ],
      highlights: [
        ["White House 北側", "Lafayette Square, 16th St NW & H St NW", "安全封鎖範圍可能調整，以當日可公開抵達的最佳視角為準。"],
        ["Washington Monument", "2 15th St NW", "必須持預約票券，建議提早 30 至 45 分鐘抵達安檢。"],
        ["National Air and Space Museum", "650 Jefferson Drive SW", "由 Jefferson Drive 入口進入，免費但必須預約。博物館開放時間為 10:00 AM 至 5:30 PM。"],
        ["Library of Congress", "10 First Street SE", "星期四開放至 8:00 PM。3 月至 7 月為旺季，安檢可能較久。"],
        ["DAIKAYA Ramen Shop", "705 6th St NW", "前往一樓。二樓 Izakaya 不提供拉麵菜單。"],
      ],
      airspace: [
        "1903 Wright Flyer",
        "Apollo 11 Command Module Columbia",
        "Boeing Milestones of Flight Hall",
        "Destination Moon",
        "若有時間再看 Mercury Friendship 7 或 Spirit of St. Louis",
      ],
      cut: ["取消 Pavilion Café，改成外帶", "刪除一處次要 Memorial", "刪除 Air and Space 次要展廳"],
      protect: ["10:00 AM Washington Monument", "2:00 PM Air and Space", "4:30 PM Library of Congress"],
    },
    day3: {
      date: "星期五 · 6 月 26 日",
      title: "Georgetown、Potomac 與回程",
      theme: "上午放鬆，晚間嚴格控時",
      summary:
        "前半天可以彈性調整，後半天則由 3:30 PM 船班、取行李及抵達 DCA 的時間控制。",
      timeline: [
        ["8:30–10:15 AM", "慢起", "早餐、整理、充電", "flex"],
        ["10:15–11:00 AM", "Check-out", "在 hostel 寄放行李", "fixed"],
        ["11:00–11:35 AM", "前往 Georgetown", "叫車最省時", "move"],
        ["11:35 AM–12:20 PM", "M Street 與 C&O Canal", "歷史商業區", "visit"],
        ["12:20–1:20 PM", "午餐", "M Street 或 Washington Harbour", "meal"],
        ["1:20–2:05 PM", "Wisconsin Avenue", "商店與巷弄", "flex"],
        ["2:05–2:50 PM", "Waterfront Park", "Potomac 與 Key Bridge 景色", "visit"],
        ["2:50–3:10 PM", "前往碼頭", "開始往 Washington Harbour 移動", "move"],
        ["3:10–3:20 PM", "水上計程船報到", "保留登船時間", "fixed"],
        ["3:30–4:15 PM", "Potomac Water Taxi", "Georgetown 前往 The Wharf", "fixed"],
        ["4:15–5:15 PM", "The Wharf", "Transit Pier 與水岸", "visit"],
        ["5:15–5:50 PM", "返回 Chinatown", "Metro 或叫車", "move"],
        ["5:50–6:35 PM", "Bantam King", "提早晚餐", "meal"],
        ["6:50–7:10 PM", "領取行李", "最後重新整理", "fixed"],
        ["7:10–7:50 PM", "前往 DCA", "Yellow Line", "move"],
        ["8:00–8:15 PM", "抵達 Terminal 2", "安檢及找登機門", "fixed"],
        ["10:00–11:44 PM", "Delta DL 5633", "DCA 前往 BOS", "fixed"],
      ],
      highlights: [
        ["Old Stone House", "3051 M St NW", "適合作為 M Street 散步起點。"],
        ["Georgetown Waterfront Park", "Wisconsin Ave & K St NW", "沿河步道可看 Potomac 與 Key Bridge。"],
        ["Georgetown Dock", "3100 K St NW", "3:30 PM 船班建議 3:10 PM 左右報到。"],
        ["The Wharf Transit Pier", "950 Wharf St SW", "停留約一小時，避免壓縮晚餐與機場時間。"],
        ["Bantam King", "501 G St NW", "目標 5:50 PM 抵達，用餐 40 至 45 分鐘。"],
      ],
      taxi: [
        ["出發", "Georgetown · 3:30 PM"],
        ["抵達", "The Wharf · 4:15 PM"],
        ["票價", "單程約 $25"],
        ["報到", "3:10–3:15 PM"],
      ],
      cut: ["M Street 購物", "縮短 The Wharf 停留", "天氣或營運異常時取消船班"],
      protect: ["約 7:10 PM 前完成取行李", "8:15 PM 前抵達 DCA", "10:00 PM Delta 起飛"],
    },
    transport: {
      title: "交通系統",
      subtitle: "配合每日時間表使用的移動層",
      routes: [
        {
          title: "Allston → Logan",
          steps: ["4:00 AM 叫車", "Terminal C 下車", "TSA 安檢", "約 5:35 AM 前抵達登機門"],
          note: "6:15 AM 航班不建議依賴 Green Line 與 Blue Line 的首班轉乘。",
        },
        {
          title: "DCA → Hostel",
          steps: ["Terminal 2 天橋", "DCA Metro 站", "Yellow Line 北向", "Mount Vernon Square", "步行 8 至 12 分鐘"],
          note: "自航班抵達至 hostel 共預留 45 至 60 分鐘。",
        },
        {
          title: "Hostel → DCA",
          steps: ["步行至 Gallery Place", "Yellow Line 南向", "DCA Metro 站", "Terminal 2 天橋"],
          note: "約 7:10 PM 離開 hostel 區域，目標 8:00 至 8:15 PM 抵達機場。",
        },
        {
          title: "深夜 Logan → Allston",
          steps: ["Massport 接駁車", "Airport Blue Line 站", "Government Center", "Green Line B"],
          note: "落地後立即確認末班車。若轉乘已不實際，直接叫車。",
        },
      ],
      hostel: [
        ["名稱", "I Street Capsule Hostel"],
        ["地址", "512 I St NW, Washington, DC 20001"],
        ["鄰近 Metro", "Mount Vernon Square / Gallery Place"],
        ["需確認", "行李寄放、late check-in、門禁方式、毛巾、置物櫃大小及是否需自備鎖"],
      ],
    },
    packing: {
      title: "行李與隨身物品",
      subtitle: "依安檢、長距離步行、炎熱、降雨及 hostel 情境準備",
      categories: [
        {
          title: "證件與訂位",
          items: ["Passport 或 REAL ID", "兩段登機證", "Hostel 確認信", "三張預約入場 QR code", "Old Ebbitt 訂位", "水上計程船票", "離線地址"],
        },
        {
          title: "電子用品",
          items: ["手機", "充電線", "Power bank", "耳機", "手錶充電器", "離線截圖"],
        },
        {
          title: "衣物與住宿",
          items: ["兩套換洗衣物", "內衣襪", "薄外套", "步行鞋", "睡衣", "耳塞", "眼罩", "浴室拖鞋", "小鎖", "小毛巾"],
        },
        {
          title: "戶外與健康",
          items: ["防曬", "帽子", "小雨傘或雨衣", "空水瓶", "面紙", "個人藥物", "止痛藥", "腸胃藥", "OK 繃"],
        },
      ],
      tsa:
        "隨身行李中的液體、膠狀物及乳霜，每瓶不得超過 3.4 oz／100 ml，並放入一個 quart-size 透明袋。水瓶需空瓶通過安檢。",
      bag:
        "為同時符合兩家航空公司，carry-on 應控制在 22 × 14 × 9 inches 內。JetBlue personal item 上限為 17 × 13 × 8 inches。",
    },
    contingencies: {
      title: "行程延誤時的決策規則",
      subtitle: "先保護訂位與預約入場，先刪除低價值散步與購物。",
      rows: [
        ["第一天", "先刪 Chinatown、次要展廳，再刪完整 Tidal Basin 繞行", "保護行李安排與 Old Ebbitt"],
        ["第二天", "午餐改外帶、刪一處 Memorial，再刪次要展廳", "保護三個預約入場時段"],
        ["第三天", "先刪購物、縮短 The Wharf，再以陸路取代船班", "保護取行李與抵達 DCA"],
      ],
      weatherTitle: "天氣處理",
      weather: [
        ["高溫", "先補水，增加室內停留，縮短曝曬的 Memorial 步行。"],
        ["雷雨", "不要在碼頭暴露等待，離開 Georgetown 前先確認船班。"],
        ["大雨", "Jefferson Memorial 改叫車，水岸散步改成室內行程。"],
        ["航班異常", "先使用航空公司 App，將所有確認信及付款卡放在容易取得的位置。"],
      ],
      returnConflictTitle: "回程訂位衝突",
      returnConflict:
        "本原始行程使用 6 月 26 日星期五 Delta DL 5633。較新的規劃紀錄則提及 6 月 27 日星期六由 Washington Union Station 前往 Boston South Station 的 Amtrak Acela 2262。兩者不可能同時是有效回程。出發前必須登入航空公司或 Amtrak 帳戶確認。",
    },
    sources: {
      title: "核對與官方資料",
      subtitle: "所有營運資訊仍應於當日再次確認",
      items: [
        ["JetBlue", "航班狀態、登機證、行李"],
        ["Delta", "回程航班及 Boston 抵達航廈"],
        ["Massport", "Logan 航廈與接駁車"],
        ["WMATA", "Yellow Line 狀態及首末班車"],
        ["National Park Service", "Washington Monument 與 Memorial 營運"],
        ["National Gallery of Art", "開放時間與參觀資訊"],
        ["National Air and Space Museum", "預約入場、入口及開放展廳"],
        ["Library of Congress", "星期四開放時間、安檢與 Live! 入場"],
        ["City Experiences", "Potomac Water Taxi 船班及碼頭"],
        ["TSA", "身分證件與 3-1-1 液體規則"],
      ],
      design:
        "介面依響應式 React 與 WCAG 2.2 原則設計，包含語意化標題、鍵盤操作、清楚的 focus 狀態、足夠對比、減少動態效果支援，以及不產生水平捲動的自動重排。",
    },
    checklist: {
      title: "即時出發檢查表",
      reset: "重設",
      completed: "已完成",
      items: [
        "JetBlue check-in 完成",
        "航廈與登機門已確認",
        "手機已充滿",
        "Power bank 已充滿",
        "3:30 AM 鬧鐘已設定",
        "4:00 AM 叫車安排完成",
        "Passport 或 REAL ID 已放入隨身包",
        "液體符合 3-1-1",
        "Hostel late check-in 已確認",
        "Hostel 行李寄放已確認",
        "水上計程船已購票或接受備案",
        "最終回程訂位已重新確認",
      ],
    },
  },
};

const NAV_KEYS = ["overview", "day1", "day2", "day3", "transport", "packing", "backup", "sources"];

function Icon({ name, size = 20 }) {
  const common = {
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
    plane: <><path d="M22 2 9.6 14.4"/><path d="m15 2-4 4-7-1-2 2 6 3-3 3-3-.5-1.5 1.5 4.5 2 2 4.5 1.5-1.5-.5-3 3-3 3 6 2-2-1-7 4-4Z"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></>,
    alert: <><path d="M12 3 2.5 20h19Z"/><path d="M12 9v4M12 17h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    train: <><rect x="5" y="3" width="14" height="15" rx="2"/><path d="M8 21l2-3m6 3-2-3M8 7h8M8 12h.01M16 12h.01"/></>,
    food: <><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 5 4 8h-4"/></>,
    museum: <><path d="m3 9 9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return <svg {...common}>{paths[name] || paths.map}</svg>;
}

function usePersistedChecklist() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dc2026-checklist") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("dc2026-checklist", JSON.stringify(checked));
    } catch {}
  }, [checked]);
  return [checked, setChecked];
}

function Bilingual({ mode, en, zh, className = "" }) {
  if (mode === "en") return <span className={className}>{en}</span>;
  if (mode === "zh") return <span className={className}>{zh}</span>;
  return (
    <span className={`bilingual ${className}`}>
      <span>{en}</span>
      <span lang="zh-Hant">{zh}</span>
    </span>
  );
}

function SectionHeading({ icon, eyebrow, title, subtitle }) {
  return (
    <header className="section-heading">
      <div className="section-icon"><Icon name={icon} size={22} /></div>
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}

function DataTable({ rows }) {
  return (
    <div className="data-table">
      {rows.map(([k, v], i) => (
        <div className="data-row" key={`${k}-${i}`}>
          <div className="data-key">{k}</div>
          <div className="data-value">{v}</div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ items }) {
  const typeIcon = { fixed: "clock", move: "train", meal: "food", visit: "museum", flex: "sun" };
  return (
    <div className="timeline">
      {items.map(([time, title, detail, type], i) => (
        <article className={`timeline-item type-${type}`} key={`${time}-${i}`}>
          <div className="timeline-time">{time}</div>
          <div className="timeline-marker"><Icon name={typeIcon[type] || "clock"} size={16} /></div>
          <div className="timeline-content">
            <h4>{title}</h4>
            <p>{detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function RouteDiagram({ lang }) {
  const labels = lang === "zh"
    ? ["Allston", "BOS", "DCA", "Hostel", "National Mall", "Georgetown", "The Wharf", "DCA"]
    : ["Allston", "BOS", "DCA", "Hostel", "National Mall", "Georgetown", "The Wharf", "DCA"];
  return (
    <div className="route-diagram" role="img" aria-label="Trip route schematic">
      <svg viewBox="0 0 900 180" preserveAspectRatio="xMidYMid meet">
        <path className="route-line" d="M55 95 C130 25, 190 25, 260 95 S390 165, 455 95 S590 25, 650 95 S780 165, 845 95" />
        {labels.map((label, i) => {
          const x = 55 + i * 113;
          const y = i % 2 === 0 ? 95 : i === 1 ? 54 : i === 3 ? 136 : i === 5 ? 54 : 136;
          return (
            <g key={label + i}>
              <circle className={i === 0 || i === labels.length - 1 ? "route-node endpoint" : "route-node"} cx={x} cy={y} r="9" />
              <text x={x} y={y + (i % 2 === 0 ? 28 : i === 1 || i === 5 ? -18 : 28)} textAnchor="middle">{label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DaySection({ id, data, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={id} className="page-section day-section">
      <div className="day-banner" style={{ "--accent": accent }}>
        <div>
          <div className="eyebrow">{data.date}</div>
          <h2>{data.title}</h2>
          <p>{data.summary}</p>
        </div>
        <div className="theme-pill">{data.theme}</div>
      </div>

      <div className="day-layout">
        <div className="card timeline-card">
          <h3><Icon name="clock" size={19} /> Daily timeline</h3>
          <Timeline items={data.timeline} />
        </div>

        <aside className="day-side">
          {data.taxi && (
            <div className="card">
              <h3><Icon name="map" size={19} /> Water taxi</h3>
              <DataTable rows={data.taxi} />
            </div>
          )}
          {data.airspace && (
            <div className="card">
              <h3><Icon name="museum" size={19} /> 90-minute priority</h3>
              <ol className="number-list">
                {data.airspace.map((x) => <li key={x}>{x}</li>)}
              </ol>
            </div>
          )}
          <div className="card decision-card">
            <h3><Icon name="alert" size={19} /> Delay logic</h3>
            <div className="decision-block">
              <strong>Cut first</strong>
              <ul>{data.cut.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="decision-block protect">
              <strong>Protect</strong>
              <ul>{data.protect.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </aside>
      </div>

      <button className="detail-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{open ? "Hide location details" : "Open location details"}</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="location-grid">
          {data.highlights.map(([name, address, note]) => (
            <article className="location-card" key={name}>
              <h3>{name}</h3>
              <address>{address}</address>
              <p>{note}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function DC2026Infrastructure() {
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = usePersistedChecklist();

  const t = content[lang === "both" ? "en" : lang];
  const z = content.zh;
  const isBoth = lang === "both";

  const tx = (path) => {
    const keys = path.split(".");
    const get = (obj) => keys.reduce((acc, k) => acc?.[k], obj);
    const en = get(content.en);
    const zh = get(content.zh);
    if (isBoth) return <Bilingual mode="both" en={en} zh={zh} />;
    return get(t);
  };

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 160;
      let current = "overview";
      NAV_KEYS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      });
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const checklistItems = isBoth
    ? content.en.checklist.items.map((x, i) => `${x}｜${content.zh.checklist.items[i]}`)
    : t.checklist.items;

  const completed = useMemo(
    () => checklistItems.reduce((n, _, i) => n + (checked[i] ? 1 : 0), 0),
    [checked, checklistItems]
  );

  const dayData = (key) => {
    if (!isBoth) return t[key];
    const en = content.en[key];
    const zh = content.zh[key];
    return {
      date: `${en.date}｜${zh.date}`,
      title: `${en.title}｜${zh.title}`,
      theme: `${en.theme}｜${zh.theme}`,
      summary: `${en.summary}\n${zh.summary}`,
      timeline: en.timeline.map((row, i) => [
        row[0],
        `${row[1]}｜${zh.timeline[i][1]}`,
        `${row[2]}｜${zh.timeline[i][2]}`,
        row[3],
      ]),
      highlights: en.highlights.map((row, i) => [
        row[0],
        row[1],
        `${row[2]}\n${zh.highlights[i][2]}`,
      ]),
      cut: en.cut.map((x, i) => `${x}｜${zh.cut[i]}`),
      protect: en.protect.map((x, i) => `${x}｜${zh.protect[i]}`),
      airspace: en.airspace?.map((x, i) => `${x}｜${zh.airspace[i]}`),
      taxi: en.taxi?.map((row, i) => [`${row[0]}｜${zh.taxi[i][0]}`, `${row[1]}｜${zh.taxi[i][1]}`]),
    };
  };

  return (
    <div className={`app lang-${lang}`}>
      <style>{styles}</style>

      <a className="skip-link" href="#overview">Skip to content</a>

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">DC</div>
          <div>
            <strong>{tx("appTitle")}</strong>
            <span>{tx("appSubtitle")}</span>
          </div>
        </div>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          {NAV_KEYS.map((key) => (
            <a
              href={`#${key}`}
              key={key}
              className={active === key ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {tx(`nav.${key}`)}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">{tx("hero.eyebrow")}</div>
            <h1>{tx("hero.title")}</h1>
            <p className="hero-intro">{tx("hero.intro")}</p>
            <div className="hero-meta">
              <span>{tx("dates")}</span>
              <span>{tx("status")}</span>
              <span>{tx("verified")}</span>
            </div>
            <div className="critical-line">
              <Icon name="alert" size={24} />
              <div>
                <strong>{tx("hero.critical")}</strong>
                <p>{tx("hero.criticalText")}</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="monument-art" aria-hidden="true">
              <div className="sun-disc" />
              <div className="obelisk"><span /></div>
              <div className="basin-line" />
              <div className="city-label">WASHINGTON<br />DISTRICT OF COLUMBIA</div>
            </div>
          </div>
        </section>

        <section id="overview" className="page-section">
          <SectionHeading icon="map" title={tx("overview.title")} subtitle={tx("overview.subtitle")} />
          <RouteDiagram lang={lang} />

          <div className="metric-grid">
            {(isBoth ? content.en.overview.metrics : t.overview.metrics).map(([value, label], i) => (
              <div className="metric-card" key={value}>
                <strong>{value}</strong>
                <span>{isBoth ? `${label}｜${z.overview.metrics[i][1]}` : label}</span>
              </div>
            ))}
          </div>

          <div className="overview-grid">
            <article className="card fixed-card">
              <h3><Icon name="clock" size={20} /> {tx("overview.fixed")}</h3>
              <div className="commitment-list">
                {(isBoth ? content.en.overview.fixedItems : t.overview.fixedItems).map(([time, item], i) => (
                  <div className="commitment" key={time}>
                    <time>{time}</time>
                    <span>{isBoth ? `${item}｜${z.overview.fixedItems[i][1]}` : item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <h3><Icon name="sun" size={20} /> {tx("overview.flexible")}</h3>
              <ul className="clean-list">
                {(isBoth ? content.en.overview.flexibleItems : t.overview.flexibleItems).map((x, i) => (
                  <li key={x}>{isBoth ? `${x}｜${z.overview.flexibleItems[i]}` : x}</li>
                ))}
              </ul>
            </article>

            <article className="card alert-card">
              <h3><Icon name="alert" size={20} /> {tx("overview.risk")}</h3>
              <ul className="clean-list">
                {(isBoth ? content.en.overview.riskItems : t.overview.riskItems).map((x, i) => (
                  <li key={x}>{isBoth ? `${x}\n${z.overview.riskItems[i]}` : x}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="card now-card">
            <div>
              <h3>{tx("now.title")}</h3>
              <ol className="number-list">
                {(isBoth ? content.en.now.items : t.now.items).map((x, i) => (
                  <li key={x}>{isBoth ? `${x}｜${z.now.items[i]}` : x}</li>
                ))}
              </ol>
            </div>
            <Checklist
              title={tx("checklist.title")}
              items={checklistItems}
              checked={checked}
              setChecked={setChecked}
              completed={completed}
              completedLabel={tx("checklist.completed")}
              resetLabel={tx("checklist.reset")}
            />
          </div>
        </section>

        <section className="page-section flight-section">
          <SectionHeading icon="plane" title={isBoth ? "Flight control｜航班控制" : lang === "zh" ? "航班控制" : "Flight control"} subtitle={tx("flight.note")} />
          <div className="flight-grid">
            <article className="card">
              <div className="flight-label outbound"><Icon name="plane" /> {tx("flight.outTitle")}</div>
              <DataTable rows={isBoth ? content.en.flight.outbound.map((r, i) => [`${r[0]}｜${z.flight.outbound[i][0]}`, `${r[1]}｜${z.flight.outbound[i][1]}`]) : t.flight.outbound} />
            </article>
            <article className="card">
              <div className="flight-label inbound"><Icon name="plane" /> {tx("flight.backTitle")}</div>
              <DataTable rows={isBoth ? content.en.flight.inbound.map((r, i) => [`${r[0]}｜${z.flight.inbound[i][0]}`, `${r[1]}｜${z.flight.inbound[i][1]}`]) : t.flight.inbound} />
            </article>
          </div>
        </section>

        <DaySection id="day1" data={dayData("day1")} accent={COLORS.hanada} />
        <DaySection id="day2" data={dayData("day2")} accent={COLORS.beni} />
        <DaySection id="day3" data={dayData("day3")} accent={COLORS.matcha} />

        <section id="transport" className="page-section">
          <SectionHeading icon="train" title={tx("transport.title")} subtitle={tx("transport.subtitle")} />
          <div className="route-grid">
            {(isBoth ? content.en.transport.routes : t.transport.routes).map((route, i) => {
              const zr = z.transport.routes[i];
              return (
                <article className="route-card" key={route.title}>
                  <h3>{isBoth ? `${route.title}｜${zr.title}` : route.title}</h3>
                  <div className="step-chain">
                    {route.steps.map((step, j) => (
                      <React.Fragment key={step}>
                        <span>{isBoth ? `${step}｜${zr.steps[j]}` : step}</span>
                        {j < route.steps.length - 1 && <b aria-hidden="true">›</b>}
                      </React.Fragment>
                    ))}
                  </div>
                  <p>{isBoth ? `${route.note}\n${zr.note}` : route.note}</p>
                </article>
              );
            })}
          </div>
          <div className="card hostel-card">
            <h3><Icon name="bag" size={20} /> Hostel</h3>
            <DataTable rows={isBoth ? content.en.transport.hostel.map((r, i) => [`${r[0]}｜${z.transport.hostel[i][0]}`, `${r[1]}｜${z.transport.hostel[i][1]}`]) : t.transport.hostel} />
          </div>
        </section>

        <section id="packing" className="page-section">
          <SectionHeading icon="bag" title={tx("packing.title")} subtitle={tx("packing.subtitle")} />
          <div className="packing-grid">
            {(isBoth ? content.en.packing.categories : t.packing.categories).map((cat, i) => {
              const zc = z.packing.categories[i];
              return (
                <article className="packing-card" key={cat.title}>
                  <h3>{isBoth ? `${cat.title}｜${zc.title}` : cat.title}</h3>
                  <ul>
                    {cat.items.map((item, j) => <li key={item}>{isBoth ? `${item}｜${zc.items[j]}` : item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="rule-grid">
            <div className="rule-card"><strong>TSA 3-1-1</strong><p>{tx("packing.tsa")}</p></div>
            <div className="rule-card"><strong>Bag size</strong><p>{tx("packing.bag")}</p></div>
          </div>
        </section>

        <section id="backup" className="page-section">
          <SectionHeading icon="alert" title={tx("contingencies.title")} subtitle={tx("contingencies.subtitle")} />
          <div className="priority-table">
            {(isBoth ? content.en.contingencies.rows : t.contingencies.rows).map((row, i) => (
              <div className="priority-row" key={row[0]}>
                <strong>{isBoth ? `${row[0]}｜${z.contingencies.rows[i][0]}` : row[0]}</strong>
                <span>{isBoth ? `${row[1]}｜${z.contingencies.rows[i][1]}` : row[1]}</span>
                <span>{isBoth ? `${row[2]}｜${z.contingencies.rows[i][2]}` : row[2]}</span>
              </div>
            ))}
          </div>

          <div className="weather-grid">
            <article className="card">
              <h3><Icon name="sun" size={20} /> {tx("contingencies.weatherTitle")}</h3>
              {(isBoth ? content.en.contingencies.weather : t.contingencies.weather).map(([condition, action], i) => (
                <div className="weather-row" key={condition}>
                  <strong>{isBoth ? `${condition}｜${z.contingencies.weather[i][0]}` : condition}</strong>
                  <p>{isBoth ? `${action}\n${z.contingencies.weather[i][1]}` : action}</p>
                </div>
              ))}
            </article>
            <article className="card conflict-card">
              <h3><Icon name="alert" size={20} /> {tx("contingencies.returnConflictTitle")}</h3>
              <p>{tx("contingencies.returnConflict")}</p>
            </article>
          </div>
        </section>

        <section id="sources" className="page-section source-section">
          <SectionHeading icon="link" title={tx("sources.title")} subtitle={tx("sources.subtitle")} />
          <div className="source-grid">
            {(isBoth ? content.en.sources.items : t.sources.items).map(([name, purpose], i) => (
              <div className="source-item" key={name}>
                <strong>{name}</strong>
                <span>{isBoth ? `${purpose}｜${z.sources.items[i][1]}` : purpose}</span>
              </div>
            ))}
          </div>
          <p className="design-note">{tx("sources.design")}</p>
        </section>
      </main>

      <div className="language-dock" role="group" aria-label={content.en.switcher.label}>
        {[
          ["en", "EN"],
          ["zh", "中"],
          ["both", "EN + 中"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={lang === value ? "active" : ""}
            onClick={() => setLang(value)}
            aria-pressed={lang === value}
            title={value === "en" ? content.en.switcher.en : value === "zh" ? content.zh.switcher.zh : content.en.switcher.both}
          >
            {label}
          </button>
        ))}
      </div>

      <footer>
        <strong>DC 2026</strong>
        <span>Built for use on desktop, tablet, and phone.</span>
      </footer>
    </div>
  );
}

function Checklist({ title, items, checked, setChecked, completed, completedLabel, resetLabel }) {
  const percent = Math.round((completed / items.length) * 100);
  return (
    <div className="checklist-panel">
      <div className="checklist-header">
        <div>
          <h3>{title}</h3>
          <span>{completed}/{items.length} {completedLabel}</span>
        </div>
        <button onClick={() => setChecked({})}>{resetLabel}</button>
      </div>
      <div className="progress" aria-label={`${percent}% complete`}><span style={{ width: `${percent}%` }} /></div>
      <div className="check-items">
        {items.map((item, i) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => setChecked({ ...checked, [i]: !checked[i] })}
            />
            <span className="custom-check"><Icon name="check" size={14} /></span>
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const styles = `
  :root {
    color-scheme: light;
    --paper: ${COLORS.paper};
    --ink: ${COLORS.sumi};
    --ai: ${COLORS.ai};
    --ai-soft: ${COLORS.aiSoft};
    --beni: ${COLORS.beni};
    --beni-soft: ${COLORS.beniSoft};
    --yamabuki: ${COLORS.yamabuki};
    --yamabuki-soft: ${COLORS.yamabukiSoft};
    --hanada: ${COLORS.hanada};
    --hanada-soft: ${COLORS.hanadaSoft};
    --matcha: ${COLORS.matcha};
    --matcha-soft: ${COLORS.matchaSoft};
    --muted: ${COLORS.nezumi};
    --border: ${COLORS.border};
    --white: ${COLORS.white};
    --shadow: 0 16px 42px rgba(40, 36, 28, .08);
    --radius: 20px;
    --max: 1240px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; scroll-padding-top: 86px; }
  body { margin: 0; background: var(--paper); color: var(--ink); }
  button, input { font: inherit; }
  a { color: inherit; }
  address { font-style: normal; }
  p { line-height: 1.65; }
  h1, h2, h3, h4, p { margin-top: 0; }
  .app {
    min-height: 100vh;
    background:
      radial-gradient(circle at 8% 10%, rgba(255,177,27,.10), transparent 24rem),
      linear-gradient(var(--paper), var(--paper));
    font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", "PingFang TC", sans-serif;
  }
  .lang-zh, .lang-both {
    font-family: Inter, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", ui-sans-serif, sans-serif;
  }
  .bilingual { display: inline-flex; flex-direction: column; gap: .18em; }
  .bilingual > span:last-child { color: #555; font-size: .88em; }
  .skip-link {
    position: fixed; top: -50px; left: 16px; z-index: 9999;
    padding: 10px 14px; background: var(--ink); color: white; border-radius: 8px;
  }
  .skip-link:focus { top: 10px; }

  .topbar {
    position: sticky; top: 0; z-index: 1000;
    min-height: 72px; padding: 10px clamp(16px, 4vw, 48px);
    display: flex; align-items: center; justify-content: space-between; gap: 24px;
    background: rgba(252,250,242,.92);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(216,210,196,.85);
  }
  .brand { display: flex; align-items: center; gap: 12px; min-width: max-content; }
  .brand-mark {
    width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
    background: var(--ai); color: white; font-weight: 800; letter-spacing: .04em;
  }
  .brand strong { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 1.08rem; }
  .brand span { display: block; color: var(--muted); font-size: .72rem; margin-top: 2px; }
  .nav { display: flex; gap: 4px; align-items: center; }
  .nav a {
    text-decoration: none; font-size: .82rem; font-weight: 700; color: #5d5d59;
    padding: 10px 11px; border-radius: 10px;
  }
  .nav a:hover, .nav a.active { color: var(--ai); background: var(--ai-soft); }
  .mobile-menu { display: none; border: 0; background: transparent; padding: 8px; border-radius: 10px; }

  main { overflow: clip; }
  .hero {
    min-height: 660px; display: grid; grid-template-columns: 1.12fr .88fr;
    max-width: 1440px; margin: 0 auto; padding: clamp(54px, 8vw, 110px) clamp(20px, 6vw, 90px);
    align-items: center; gap: clamp(30px, 7vw, 100px);
  }
  .eyebrow {
    color: var(--beni); font-size: .75rem; font-weight: 850; letter-spacing: .14em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  h1, h2 { font-family: Georgia, "Times New Roman", serif; letter-spacing: -.025em; }
  h1 { font-size: clamp(3rem, 7vw, 6.5rem); line-height: .94; max-width: 840px; margin-bottom: 26px; }
  .hero-intro { max-width: 740px; font-size: clamp(1rem, 1.6vw, 1.2rem); color: #4e4e49; }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0; }
  .hero-meta > span {
    border: 1px solid var(--border); background: rgba(255,255,255,.55);
    padding: 8px 12px; border-radius: 999px; font-size: .77rem; font-weight: 700;
  }
  .critical-line {
    display: flex; gap: 14px; align-items: flex-start; max-width: 700px;
    background: var(--yamabuki-soft); border-left: 5px solid var(--yamabuki);
    padding: 18px 20px; border-radius: 12px;
  }
  .critical-line strong { display: block; margin-bottom: 4px; }
  .critical-line p { margin: 0; line-height: 1.5; }
  .hero-visual { min-height: 470px; display: grid; place-items: center; }
  .monument-art {
    position: relative; width: min(100%, 480px); aspect-ratio: 1 / 1.14;
    border-radius: 48% 48% 12% 12%;
    background: linear-gradient(180deg, #e8f1f3 0%, #f7e9d5 54%, #d9e6df 55%, #cbdcd4 100%);
    box-shadow: var(--shadow); overflow: hidden; border: 12px solid rgba(255,255,255,.64);
  }
  .sun-disc {
    position: absolute; width: 120px; height: 120px; border-radius: 50%;
    background: var(--beni); top: 12%; right: 11%; opacity: .92;
  }
  .obelisk {
    position: absolute; left: 50%; bottom: 20%; transform: translateX(-50%);
    width: 45px; height: 58%; background: linear-gradient(90deg, #ece9df 0 50%, #c9c5ba 50%);
    clip-path: polygon(50% 0, 100% 10%, 87% 100%, 13% 100%, 0 10%);
    filter: drop-shadow(8px 10px 10px rgba(0,0,0,.13));
  }
  .obelisk span {
    position: absolute; width: 190%; height: 14px; left: -45%; bottom: -9px;
    background: #d8d3c8; border-radius: 3px;
  }
  .basin-line {
    position: absolute; bottom: 13%; left: -5%; width: 110%; height: 17%;
    border-radius: 50%; border-top: 4px solid rgba(15,76,92,.36);
    background: linear-gradient(180deg, transparent, rgba(15,76,92,.18));
  }
  .city-label {
    position: absolute; left: 22px; bottom: 20px; color: var(--ai);
    font-size: .66rem; font-weight: 900; letter-spacing: .16em; line-height: 1.5;
  }

  .page-section { max-width: var(--max); margin: 0 auto; padding: 72px clamp(18px, 4vw, 44px); }
  .section-heading { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 30px; }
  .section-icon {
    width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center;
    background: var(--ai); color: white; flex: 0 0 auto;
  }
  .section-heading h2 { font-size: clamp(2rem, 4vw, 3.25rem); margin-bottom: 8px; }
  .section-heading p { margin: 0; color: var(--muted); max-width: 760px; }

  .route-diagram {
    background: rgba(255,255,255,.64); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 18px; overflow: hidden; margin-bottom: 22px;
  }
  .route-diagram svg { display: block; width: 100%; height: auto; min-width: 700px; }
  .route-line { fill: none; stroke: var(--ai); stroke-width: 3; stroke-dasharray: 5 8; }
  .route-node { fill: var(--paper); stroke: var(--ai); stroke-width: 4; }
  .route-node.endpoint { fill: var(--beni); stroke: var(--beni); }
  .route-diagram text { font-size: 14px; fill: var(--ink); font-weight: 700; }

  .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 20px 0; }
  .metric-card {
    border-radius: 16px; padding: 20px; background: var(--white); border: 1px solid var(--border);
  }
  .metric-card strong { display: block; font-size: clamp(1.5rem, 3vw, 2.4rem); color: var(--ai); }
  .metric-card span { font-size: .82rem; color: var(--muted); }

  .overview-grid { display: grid; grid-template-columns: 1.25fr .8fr 1fr; gap: 18px; align-items: start; }
  .card {
    background: rgba(255,255,255,.78); border: 1px solid var(--border);
    border-radius: var(--radius); padding: clamp(20px, 3vw, 30px); box-shadow: 0 8px 26px rgba(40,36,28,.04);
  }
  .card h3, .packing-card h3, .route-card h3 {
    display: flex; align-items: center; gap: 9px; font-size: 1.05rem; margin-bottom: 18px;
  }
  .fixed-card { border-top: 5px solid var(--ai); }
  .alert-card { background: var(--beni-soft); border-color: #e4c1bc; }
  .commitment { display: grid; grid-template-columns: 116px 1fr; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--border); }
  .commitment:last-child { border: 0; }
  .commitment time { color: var(--ai); font-size: .78rem; font-weight: 850; }
  .commitment span { font-size: .9rem; line-height: 1.45; }
  .clean-list, .number-list { margin: 0; padding-left: 1.2rem; }
  .clean-list li, .number-list li { padding: 6px 0; line-height: 1.52; white-space: pre-line; }
  .now-card { display: grid; grid-template-columns: 1fr 1.15fr; gap: 28px; margin-top: 18px; background: var(--ai); color: white; }
  .now-card .number-list { color: rgba(255,255,255,.9); }
  .checklist-panel { background: white; color: var(--ink); padding: 22px; border-radius: 16px; }
  .checklist-header { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
  .checklist-header h3 { margin-bottom: 3px; }
  .checklist-header span { color: var(--muted); font-size: .78rem; }
  .checklist-header button {
    border: 1px solid var(--border); background: var(--paper); border-radius: 8px; padding: 7px 10px; cursor: pointer;
  }
  .progress { height: 8px; background: #eee9df; border-radius: 20px; overflow: hidden; margin: 15px 0; }
  .progress span { display: block; height: 100%; background: var(--beni); transition: width .25s ease; }
  .check-items { display: grid; gap: 4px; max-height: 310px; overflow: auto; padding-right: 5px; }
  .check-items label { display: flex; align-items: flex-start; gap: 10px; padding: 8px; border-radius: 9px; cursor: pointer; font-size: .86rem; line-height: 1.42; }
  .check-items label:hover { background: var(--paper); }
  .check-items input { position: absolute; opacity: 0; }
  .custom-check { width: 20px; height: 20px; border: 1px solid var(--border); border-radius: 6px; display: grid; place-items: center; flex: 0 0 auto; color: transparent; }
  .check-items input:checked + .custom-check { background: var(--ai); border-color: var(--ai); color: white; }
  .check-items input:focus-visible + .custom-check { outline: 3px solid rgba(0,98,132,.25); outline-offset: 2px; }

  .flight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .flight-label { display: flex; align-items: center; gap: 10px; font-weight: 850; margin-bottom: 18px; }
  .flight-label.outbound { color: var(--hanada); }
  .flight-label.inbound { color: var(--beni); }
  .data-row { display: grid; grid-template-columns: minmax(110px, .75fr) 1.25fr; gap: 14px; padding: 11px 0; border-bottom: 1px solid var(--border); }
  .data-row:last-child { border-bottom: 0; }
  .data-key { color: var(--muted); font-size: .78rem; font-weight: 750; }
  .data-value { font-size: .9rem; font-weight: 650; line-height: 1.45; }

  .day-section { max-width: 1320px; }
  .day-banner {
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 74%, black));
    color: white; border-radius: 28px; padding: clamp(26px, 5vw, 48px);
    display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 20px;
  }
  .day-banner .eyebrow { color: rgba(255,255,255,.76); }
  .day-banner h2 { font-size: clamp(2rem, 4.8vw, 4rem); margin-bottom: 12px; }
  .day-banner p { max-width: 760px; margin: 0; color: rgba(255,255,255,.88); white-space: pre-line; }
  .theme-pill { background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.34); padding: 10px 14px; border-radius: 999px; font-size: .8rem; font-weight: 750; white-space: nowrap; }
  .day-layout { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(280px, .65fr); gap: 20px; align-items: start; }
  .timeline-card h3 { margin-bottom: 26px; }
  .timeline { position: relative; }
  .timeline::before { content: ""; position: absolute; left: 131px; top: 6px; bottom: 8px; width: 1px; background: var(--border); }
  .timeline-item { display: grid; grid-template-columns: 110px 42px 1fr; gap: 0; min-height: 68px; position: relative; }
  .timeline-time { font-size: .76rem; font-weight: 800; color: var(--ai); padding-top: 5px; }
  .timeline-marker {
    width: 30px; height: 30px; margin-left: 6px; border-radius: 50%; display: grid; place-items: center;
    background: var(--paper); border: 1px solid var(--border); color: var(--ai); z-index: 1;
  }
  .type-fixed .timeline-marker { background: var(--beni); color: white; border-color: var(--beni); }
  .type-meal .timeline-marker { background: var(--yamabuki-soft); color: #8c5c00; }
  .type-visit .timeline-marker { background: var(--hanada-soft); color: var(--hanada); }
  .timeline-content { padding: 2px 0 18px 2px; }
  .timeline-content h4 { margin-bottom: 4px; font-size: .95rem; }
  .timeline-content p { margin: 0; color: var(--muted); font-size: .84rem; line-height: 1.45; white-space: pre-line; }
  .day-side { display: grid; gap: 16px; position: sticky; top: 92px; }
  .decision-block { border-top: 1px solid var(--border); padding-top: 14px; margin-top: 14px; }
  .decision-block strong { color: var(--beni); }
  .decision-block.protect strong { color: var(--ai); }
  .decision-block ul { margin-bottom: 0; padding-left: 1.1rem; }
  .decision-block li { padding: 4px 0; font-size: .84rem; line-height: 1.4; }
  .detail-toggle {
    width: 100%; margin-top: 18px; padding: 16px 20px; border-radius: 14px;
    border: 1px solid var(--border); background: rgba(255,255,255,.7);
    display: flex; justify-content: space-between; font-weight: 800; cursor: pointer;
  }
  .detail-toggle:hover { background: white; }
  .location-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px; }
  .location-card { background: white; border: 1px solid var(--border); border-radius: 16px; padding: 22px; }
  .location-card h3 { margin-bottom: 8px; font-size: 1rem; }
  .location-card address { color: var(--ai); font-size: .8rem; font-weight: 750; margin-bottom: 10px; }
  .location-card p { margin: 0; font-size: .86rem; color: #555; white-space: pre-line; }

  .route-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .route-card {
    background: white; border: 1px solid var(--border); border-radius: var(--radius);
    padding: 26px;
  }
  .step-chain { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .step-chain span { background: var(--ai-soft); color: var(--ai); border-radius: 999px; padding: 8px 10px; font-size: .78rem; font-weight: 750; }
  .step-chain b { color: var(--muted); }
  .route-card p { margin: 16px 0 0; color: var(--muted); font-size: .86rem; white-space: pre-line; }
  .hostel-card { margin-top: 18px; }

  .packing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .packing-card { background: white; border: 1px solid var(--border); border-radius: 18px; padding: 22px; }
  .packing-card:nth-child(1) { border-top: 5px solid var(--beni); }
  .packing-card:nth-child(2) { border-top: 5px solid var(--hanada); }
  .packing-card:nth-child(3) { border-top: 5px solid var(--matcha); }
  .packing-card:nth-child(4) { border-top: 5px solid var(--yamabuki); }
  .packing-card ul { padding-left: 1.05rem; margin: 0; }
  .packing-card li { padding: 5px 0; font-size: .84rem; line-height: 1.4; }
  .rule-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
  .rule-card { background: var(--ai); color: white; border-radius: 18px; padding: 24px; }
  .rule-card p { margin: 8px 0 0; color: rgba(255,255,255,.85); }

  .priority-table { border: 1px solid var(--border); border-radius: 18px; overflow: hidden; background: white; }
  .priority-row { display: grid; grid-template-columns: .55fr 1.5fr 1fr; gap: 18px; padding: 18px 20px; border-bottom: 1px solid var(--border); align-items: start; }
  .priority-row:last-child { border-bottom: 0; }
  .priority-row strong { color: var(--ai); }
  .priority-row span { font-size: .88rem; line-height: 1.5; }
  .weather-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 18px; margin-top: 18px; }
  .weather-row { display: grid; grid-template-columns: 110px 1fr; gap: 16px; border-top: 1px solid var(--border); padding: 12px 0; }
  .weather-row:first-of-type { border-top: 0; }
  .weather-row p { margin: 0; font-size: .86rem; white-space: pre-line; }
  .conflict-card { background: var(--beni-soft); border-color: #e4c1bc; }
  .conflict-card p { margin: 0; white-space: pre-line; }

  .source-section { padding-bottom: 120px; }
  .source-grid { display: grid; grid-template-columns: repeat(2, 1fr); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; }
  .source-item { padding: 16px 18px; display: grid; grid-template-columns: 170px 1fr; gap: 15px; background: white; border-bottom: 1px solid var(--border); }
  .source-item:nth-child(odd) { border-right: 1px solid var(--border); }
  .source-item strong { color: var(--ai); }
  .source-item span { color: var(--muted); font-size: .85rem; }
  .design-note { color: var(--muted); font-size: .82rem; margin-top: 18px; }

  .language-dock {
    position: fixed; right: 18px; bottom: 18px; z-index: 1100;
    display: flex; gap: 4px; padding: 6px; border-radius: 16px;
    background: rgba(28,28,28,.92); box-shadow: 0 12px 30px rgba(0,0,0,.2);
  }
  .language-dock button {
    border: 0; background: transparent; color: rgba(255,255,255,.7); border-radius: 11px;
    padding: 10px 12px; font-weight: 850; cursor: pointer;
  }
  .language-dock button.active { background: white; color: var(--ink); }
  button:focus-visible, a:focus-visible { outline: 3px solid rgba(0,98,132,.34); outline-offset: 3px; }

  footer {
    max-width: var(--max); margin: 0 auto; padding: 28px 44px 80px;
    display: flex; justify-content: space-between; color: var(--muted); font-size: .8rem;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 1050px) {
    .nav { position: fixed; top: 72px; right: 12px; left: 12px; display: none; grid-template-columns: repeat(2, 1fr); padding: 12px; background: var(--paper); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow); }
    .nav.open { display: grid; }
    .mobile-menu { display: grid; place-items: center; }
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero-visual { min-height: 380px; }
    .monument-art { width: min(100%, 390px); }
    .overview-grid { grid-template-columns: 1fr 1fr; }
    .overview-grid .alert-card { grid-column: 1 / -1; }
    .packing-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 800px) {
    .topbar { padding-inline: 16px; }
    .brand span { display: none; }
    .hero { padding-top: 58px; }
    h1 { font-size: clamp(3rem, 15vw, 5rem); }
    .metric-grid { grid-template-columns: repeat(2, 1fr); }
    .overview-grid, .now-card, .flight-grid, .day-layout, .route-grid, .weather-grid { grid-template-columns: 1fr; }
    .day-side { position: static; }
    .location-grid, .source-grid { grid-template-columns: 1fr; }
    .source-item:nth-child(odd) { border-right: 0; }
    .priority-row { grid-template-columns: 1fr; gap: 6px; }
    .rule-grid { grid-template-columns: 1fr; }
    .day-banner { align-items: flex-start; flex-direction: column; }
    .route-diagram { overflow-x: auto; }
  }

  @media (max-width: 560px) {
    .page-section { padding: 52px 15px; }
    .hero { padding-inline: 17px; }
    .hero-visual { min-height: 320px; }
    .monument-art { border-width: 8px; }
    .metric-grid, .packing-grid { grid-template-columns: 1fr; }
    .timeline::before { left: 25px; }
    .timeline-item { grid-template-columns: 42px 1fr; grid-template-areas: "marker content" "time content"; min-height: 86px; }
    .timeline-time { grid-area: time; font-size: .66rem; padding-top: 0; word-break: break-word; }
    .timeline-marker { grid-area: marker; margin-left: 0; }
    .timeline-content { grid-area: content; padding-left: 4px; }
    .commitment { grid-template-columns: 1fr; gap: 4px; }
    .data-row { grid-template-columns: 1fr; gap: 4px; }
    .source-item { grid-template-columns: 1fr; gap: 4px; }
    .weather-row { grid-template-columns: 1fr; gap: 4px; }
    .language-dock { right: 10px; bottom: 10px; }
    footer { padding: 24px 16px 86px; flex-direction: column; gap: 8px; }
  }

  @media print {
    .topbar, .language-dock, .detail-toggle, .checklist-header button { display: none !important; }
    .app { background: white; }
    .page-section, .hero { padding: 24px 0; max-width: none; }
    .hero { min-height: auto; }
    .hero-visual { display: none; }
    .card, .route-card, .packing-card, .priority-table { break-inside: avoid; box-shadow: none; }
    .day-side { position: static; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
  }
`;
