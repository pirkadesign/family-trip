"use client";

import { useEffect, useState } from "react";

type ScheduleItem = {
  time: string;
  title: string;
  detail?: string;
  area?: string;
  mapQuery?: string;
};

type TravelDay = {
  date: string;
  label: string;
  theme: string;
  items: ScheduleItem[];
};

const schedule: TravelDay[] = [
  {
    date: "9月20日（日）",
    label: "1日目",
    theme: "伊達・室蘭",
    items: [
      {
        time: "9:00",
        title: "自宅を出発",
        detail: "忘れ物がないか確認して、安全運転で出発。",
      },
      {
        time: "13:30〜16:30",
        title: "伊達大滝 CHILDHOOD",
        detail: "アスレチックを楽しむ。動きやすい服装と飲み物を準備。",
        area: "伊達",
        mapQuery: "伊達大滝 CHILDHOOD",
      },
      {
        time: "18:00",
        title: "室蘭ユースホステルにチェックイン",
        detail: "9月22日の朝まで宿泊。",
        area: "室蘭",
        mapQuery: "室蘭ユースホステル",
      },
      {
        time: "18:30",
        title: "夕食",
        detail: "お店はこれから決定。",
        area: "室蘭",
      },
      {
        time: "19:30",
        title: "工場夜景を観覧",
        detail: "白鳥大橋周辺から室蘭の工場夜景を楽しむ。",
        area: "室蘭",
        mapQuery: "白鳥大橋 展望台",
      },
      {
        time: "21:00",
        title: "ホテルに戻り就寝",
        detail: "翌日に備えて早めに休む。",
      },
    ],
  },
  {
    date: "9月21日（月・祝）",
    label: "2日目",
    theme: "登別",
    items: [
      {
        time: "9:00",
        title: "ホテルを出発",
        detail: "登別方面へ移動。",
      },
      {
        time: "10:00〜13:00",
        title: "登別マリンパークニクス",
        detail: "館内で昼食。ショーの時間は事前に確認。",
        area: "登別",
        mapQuery: "登別マリンパークニクス",
      },
      {
        time: "13:30〜17:00",
        title: "地獄谷見学・日帰り入浴",
        detail: "地獄谷を散策した後、登別温泉で入浴。",
        area: "登別",
        mapQuery: "登別地獄谷",
      },
      {
        time: "17:00〜20:00",
        title: "登別市内で夕食",
        detail: "夕食後、室蘭のホテルへ戻る。",
        area: "登別",
        mapQuery: "登別市 レストラン",
      },
      {
        time: "20:00ごろ",
        title: "ホテルに戻る",
        detail: "室蘭ユースホステルへ。",
        area: "室蘭",
      },
    ],
  },
  {
    date: "9月22日（火・祝）",
    label: "3日目",
    theme: "白老・苫小牧",
    items: [
      {
        time: "9:00",
        title: "チェックアウト",
        detail: "室蘭ユースホステルを出発。",
        area: "室蘭",
      },
      {
        time: "10:00〜12:00",
        title: "ウポポイ",
        detail: "民族共生象徴空間を見学。",
        area: "白老",
        mapQuery: "ウポポイ 民族共生象徴空間",
      },
      {
        time: "13:00",
        title: "昼食",
        detail: "白老町または苫小牧市で昼食。",
        area: "白老・苫小牧",
        mapQuery: "白老町 ランチ",
      },
      {
        time: "午後",
        title: "帰路または追加観光",
        detail: "時間と子どもたちの体力に応じて決定。",
      },
      {
        time: "候補",
        title: "サケのふるさと 千歳水族館",
        detail: "余裕があれば立ち寄る。",
        area: "千歳",
        mapQuery: "サケのふるさと 千歳水族館",
      },
    ],
  },
];

const initialPackingItems = [
  "着替え・下着",
  "パジャマ",
  "上着・雨具",
  "歩きやすい靴",
  "子どもの予備の服",
  "帽子",
  "タオル",
  "洗面用品",
  "温泉用タオル",
  "保険証・医療証",
  "常備薬・酔い止め",
  "飲み物・子どものおやつ",
  "モバイルバッテリー",
  "充電器",
  "予約情報",
];

function createMapUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedItems = window.localStorage.getItem("family-trip-packing");
    if (savedItems) {
      try {
        setCheckedItems(JSON.parse(savedItems));
      } catch {
        setCheckedItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(
        "family-trip-packing",
        JSON.stringify(checkedItems)
      );
    }
  }, [checkedItems, isLoaded]);

  function toggleItem(item: string) {
    setCheckedItems((current) =>
      current.includes(item)
        ? current.filter((checked) => checked !== item)
        : [...current, item]
    );
  }

  const progress = Math.round(
    (checkedItems.length / initialPackingItems.length) * 100
  );

  return (
    <main>
      <header className="hero">
        <div className="heroContent">
          <p className="eyebrow">FAMILY TRIP 2026</p>
          <h1>シルバーウィーク家族旅行</h1>
          <p className="heroDate">2026年9月20日（日）〜9月22日（火・祝）</p>
          <div className="destinationList">
            <span>伊達</span>
            <span>室蘭</span>
            <span>登別</span>
            <span>白老</span>
            <span>苫小牧</span>
          </div>
          <p className="familyNote">8歳・4歳の男の子と楽しむ3日間</p>
        </div>
      </header>

      <nav className="navigation" aria-label="ページ内メニュー">
        <a href="#schedule">予定</a>
        <a href="#packing">持ち物</a>
        <a href="#notes">メモ</a>
      </nav>

      <div className="container">
        <section className="intro card">
          <h2>旅の概要</h2>
          <div className="overviewGrid">
            <div>
              <span className="overviewIcon">📅</span>
              <strong>2泊3日</strong>
              <p>9月20日〜22日</p>
            </div>
            <div>
              <span className="overviewIcon">🏠</span>
              <strong>宿泊</strong>
              <p>室蘭ユースホステル</p>
            </div>
            <div>
              <span className="overviewIcon">🚗</span>
              <strong>移動</strong>
              <p>自家用車</p>
            </div>
          </div>
        </section>

        <section id="schedule">
          <div className="sectionHeading">
            <p>ITINERARY</p>
            <h2>旅行スケジュール</h2>
          </div>

          {schedule.map((day) => (
            <article className="dayCard" key={day.date}>
              <header className="dayHeader">
                <div className="dayNumber">{day.label}</div>
                <div>
                  <h3>{day.date}</h3>
                  <p>{day.theme}</p>
                </div>
              </header>

              <div className="timeline">
                {day.items.map((item, index) => (
                  <div className="timelineItem" key={`${item.time}-${index}`}>
                    <div className="time">{item.time}</div>
                    <div className="timelineMarker" aria-hidden="true">
                      <span />
                    </div>
                    <div className="event">
                      <div className="eventHeading">
                        <h4>{item.title}</h4>
                        {item.area && <span className="area">{item.area}</span>}
                      </div>
                      {item.detail && <p>{item.detail}</p>}
                      {item.mapQuery && (
                        <a
                          className="mapLink"
                          href={createMapUrl(item.mapQuery)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          地図を開く →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section id="packing" className="card packingSection">
          <div className="sectionHeading">
            <p>PACKING LIST</p>
            <h2>持ち物チェック</h2>
          </div>

          <div className="progressInfo">
            <span>
              {checkedItems.length} / {initialPackingItems.length} 完了
            </span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="progressBar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="checkList">
            {initialPackingItems.map((item) => {
              const checked = checkedItems.includes(item);

              return (
                <label className={checked ? "checked" : ""} key={item}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(item)}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>

          <p className="storageNote">
            チェック状態は、この端末のブラウザ内に保存されます。
          </p>
        </section>

        <section id="notes" className="card">
          <div className="sectionHeading">
            <p>TRAVEL NOTES</p>
            <h2>旅行メモ</h2>
          </div>

          <ul className="notes">
            <li>9月の北海道は朝晩が冷えるため、上着を用意する。</li>
            <li>アスレチック用に、動きやすい服と靴を準備する。</li>
            <li>温泉用のタオルや子どもの着替えを取り出しやすくする。</li>
            <li>施設の営業時間・休館日・予約条件は出発前に確認する。</li>
            <li>予定を詰めすぎず、子どもの体調や疲れに合わせて調整する。</li>
          </ul>
        </section>
      </div>

      <footer>
        <p>シルバーウィーク家族旅行 2026</p>
        <small>安全運転で、楽しい旅を！</small>
      </footer>
    </main>
  );
}
