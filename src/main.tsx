import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  X,
  Download,
  Copy,
  Share2,
  Check,
  Plus,
  Minus,
  LockKeyhole,
  MoveUpRight,
  ChevronDown,
} from "lucide-react";
import "@fontsource/archivo/latin-400.css";
import "@fontsource/archivo/latin-500.css";
import "@fontsource/archivo/latin-600.css";
import "@fontsource/archivo/latin-700.css";
import "@fontsource/archivo/latin-800.css";
import "@fontsource/source-sans-3/latin-400.css";
import "@fontsource/source-sans-3/latin-500.css";
import "@fontsource/source-sans-3/latin-600.css";
import {
  categories,
  event,
  questions,
  type Category,
  type Question,
} from "./content";
import { downloadBlob, makeCard, questionUrl } from "./export";
import "./style.css";

const sampleIndexes = [0, 3, 2, 5];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand ${footer ? "brand-footer" : ""}`}>
      <span className="brand-name">
        <b>
          TED<sup>x</sup>
        </b>
        <span>UniversitasIndonesia</span>
      </span>
      <span className="brand-caption">
        <b>x</b> = independently organized TED event
      </span>
    </span>
  );
}

function Modal({
  children,
  title,
  close,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  close: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const el = ref.current!;
    const active = document.activeElement as HTMLElement | null;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => {
      el.close();
      document.body.style.overflow = old;
      active?.focus();
    };
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (el?.open) {
      el.scrollTop = 0;
      el.querySelector<HTMLButtonElement>(".modal-top button")?.focus({
        preventScroll: true,
      });
    }
  }, [title]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeRef.current();
      }}
    >
      <div className="modal-inner">
        <div className="modal-top">
          <span>{title}</span>
          <button className="icon-button" onClick={close} aria-label="Tutup">
            <X size={23} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

function QuestionRoom({
  question,
  close,
  next,
  drafts,
  setDrafts,
}: {
  question: Question;
  close: () => void;
  next: () => void;
  drafts: Record<string, string>;
  setDrafts: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const [feedback, setFeedback] = useState("");
  const notify = (message: string) => setFeedback(message);
  const [preview, setPreview] = useState<{ blob: Blob; url: string } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [showPerspective, setShowPerspective] = useState(false);
  const [error, setError] = useState("");
  const [linkFallback, setLinkFallback] = useState(false);
  const [lastQuestion, setLastQuestion] = useState(question.id);
  const alive = useRef(true);
  const currentQuestion = useRef(question.id);
  currentQuestion.current = question.id;
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview.url);
    },
    [preview],
  );
  if (lastQuestion !== question.id) {
    setLastQuestion(question.id);
    setShowPerspective(false);
    setPreview(null);
    setError("");
    setLinkFallback(false);
    setFeedback("");
  }
  const response = drafts[question.id] || "";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(questionUrl(question.id));
      notify("Tautan pertanyaan disalin.");
    } catch {
      setLinkFallback(true);
    }
  };
  const generate = async (text: string) => {
    setBusy(true);
    setError("");
    const requestedQuestion = question.id;
    try {
      const blob = await makeCard(question, text);
      if (alive.current && requestedQuestion === currentQuestion.current)
        setPreview({ blob, url: URL.createObjectURL(blob) });
    } catch (err) {
      if (alive.current)
        setError(
          err instanceof Error
            ? err.message
            : "Kartu belum berhasil dibuat. Coba lagi.",
        );
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  const share = async () => {
    if (!preview) return;
    const file = new File([preview.blob], `still-growing-${question.id}.png`, {
      type: "image/png",
    });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "What are you still figuring out?",
        });
      } else {
        downloadBlob(preview.blob, file.name);
        notify(
          "Gambar diunduh. Tambahkan ke Story, lalu tempel tautan pertanyaannya.",
        );
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError"))
        setError(
          "Menu berbagi belum bisa dibuka. Gunakan Unduh PNG dan Salin tautan.",
        );
    }
  };
  return (
    <Modal
      title={preview ? "Kartu untukmu" : "Ruang pertanyaan"}
      close={close}
      className="room-modal"
    >
      {preview ? (
        <div className="room-grid preview-grid">
          <div className="export-stage">
            <img
              src={preview.url}
              alt="Pratinjau kartu yang akan dibagikan"
              width="1080"
              height="1920"
            />
          </div>
          <div className="room-controls">
            <span className="eyebrow">SIAP DIBAWA KE LUAR</span>
            <h2>
              Satu kartu.
              <br />
              Percakapan baru.
            </h2>
            <p>Bagikan kalau kamu mau. Simpan untuk diri sendiri juga boleh.</p>
            <button className="button button-red" onClick={share}>
              <Share2 size={18} /> Bagikan kartu
            </button>
            <button
              className="button button-outline"
              onClick={() => {
                downloadBlob(preview.blob, `still-growing-${question.id}.png`);
                notify("Kartu PNG diunduh.");
              }}
            >
              <Download size={18} /> Unduh PNG
            </button>
            <button className="button button-outline" onClick={copyLink}>
              <Copy size={18} /> Salin tautan pertanyaan
            </button>
            <p className="fine-print">
              Untuk Instagram Story, simpan gambarnya lalu tambahkan tautan
              dengan stiker tautan. Pilihan berbagi mengikuti perangkatmu.
            </p>
            <button className="text-button" onClick={() => setPreview(null)}>
              <ArrowLeft size={16} /> Kembali ke jawaban
            </button>
            {error && (
              <p className="inline-error" role="alert">
                {error}
              </p>
            )}
            {linkFallback && (
              <label className="fallback-label">
                Salin tautan ini
                <input
                  readOnly
                  value={questionUrl(question.id)}
                  onFocus={(e) => e.target.select()}
                />
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className="room-grid">
          <div className="room-question">
            <span className="eyebrow">{question.category}</span>
            <div className="room-question-mark" aria-hidden="true">
              ?
            </div>
            <h2 key={question.id}>{question.text}</h2>
            <span className="room-brand">Still, We Grow</span>
            <button className="text-button" onClick={next}>
              <Shuffle size={17} /> Pertanyaan lain
            </button>
          </div>
          <div className="room-controls">
            <h3>Tidak harus langsung terjawab.</h3>
            <p className="question-hint">{question.hint}</p>
            <label htmlFor="response">
              Apa yang terlintas di pikiranmu? <span>(opsional)</span>
            </label>
            <textarea
              className="resize-none"
              id="response"
              placeholder="Aku sedang memikirkan…"
              maxLength={350}
              value={response}
              onChange={(e) =>
                setDrafts({ ...drafts, [question.id]: e.target.value })
              }
              aria-describedby="response-help response-count"
            />
            <div className="input-meta">
              <span id="response-help">
                <LockKeyhole size={13} /> Tetap di perangkatmu
              </span>
              <span id="response-count">{response.length}/350</span>
            </div>
            <button
              disabled={busy}
              className="button button-red"
              onClick={() => generate(response)}
            >
              {busy
                ? "Menyiapkan kartu…"
                : response.trim()
                  ? "Buat kartu jawabanku"
                  : "Buat kartu pertanyaan"}
              <ArrowUpRight size={19} />
            </button>
            <button className="text-button link-action" onClick={copyLink}>
              <Copy size={16} /> Salin tautan pertanyaan
            </button>
            <div className="perspective-disclosure">
              <button
                aria-expanded={showPerspective}
                onClick={() => setShowPerspective(!showPerspective)}
              >
                Baca perspektif lain
                {showPerspective ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {showPerspective && (
                <div className="disclosure-copy">
                  <p>“{question.perspective}”</p>
                  <span>Contoh editorial, bukan kiriman pengunjung.</span>
                </div>
              )}
            </div>
            <p className="fine-print">
              Jawabanmu tidak dikirim atau dipublikasikan. Draf hilang saat
              halaman dimuat ulang.
            </p>
            {error && (
              <p className="inline-error" role="alert">
                {error}
              </p>
            )}
            {linkFallback && (
              <label className="fallback-label">
                Salin tautan ini
                <input
                  readOnly
                  value={questionUrl(question.id)}
                  onFocus={(e) => e.target.select()}
                />
              </label>
            )}
          </div>
        </div>
      )}
      {feedback && (
        <p className="room-feedback" role="status">
          <Check size={16} />
          {feedback}
        </p>
      )}
    </Modal>
  );
}

function App() {
  const [active, setActive] = useState<Question | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Category>("Semua");
  const [limit, setLimit] = useState(6);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [info, setInfo] = useState<"event" | "privacy" | null>(null);
  const [menu, setMenu] = useState(false);
  const visible = questions.filter(
    (q) => filter === "Semua" || q.category === filter,
  );
  const sample = questions[sampleIndexes[sampleIndex]];
  const openQuestion = (q: Question) => {
    setActive(q);
    const u = new URL(window.location.href);
    u.searchParams.set("q", q.id);
    window.history.replaceState({}, "", u);
  };
  const closeQuestion = () => {
    setActive(null);
    const u = new URL(window.location.href);
    u.searchParams.delete("q");
    window.history.replaceState({}, "", u);
  };
  const randomQuestion = () => {
    const pool = questions.filter((q) => q.id !== active?.id);
    openQuestion(pool[Math.floor(Math.random() * pool.length)]);
  };
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get("q");
      setActive(questions.find((q) => q.id === id) || null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Langsung ke isi
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#main"
            aria-label="TEDxUniversitasIndonesia, beranda"
            onClick={() => setMenu(false)}
          >
            <Brand />
          </a>
          <nav aria-label="Navigasi utama" className={menu ? "nav-open" : ""}>
            <a href="#pertanyaan" onClick={() => setMenu(false)}>
              Pertanyaan
            </a>
            <a href="#perspektif" onClick={() => setMenu(false)}>
              Perspektif
            </a>
            <button
              className="nav-event"
              onClick={() => {
                setInfo("event");
                setMenu(false);
              }}
            >
              Main Event 2027 <ArrowUpRight size={15} />
            </button>
          </nav>
          <button
            className="menu-toggle icon-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Plus />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow hero-label">
              <span className="label-line" /> STILL, WE GROW
            </span>
            <h1 id="hero-title">
              What are
              <br />
              you still
              <br />
              <span>figuring out?</span>
            </h1>
            <p>
              Belum punya semua jawabannya?
              <br />
              Mulai dari satu pertanyaan.
            </p>
            <div className="hero-actions">
              <button className="button button-red" onClick={randomQuestion}>
                Tarik satu pertanyaan <ArrowUpRight size={20} />
              </button>
              <a className="text-link" href="#perspektif">
                Lihat perspektif lain <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="deck-stage">
              <div className="deck-back deck-back-white" aria-hidden="true" />
              <div className="deck-back deck-back-red" aria-hidden="true">
                <span>
                  Still,
                  <br />
                  We Grow.
                </span>
              </div>
              <button
                className="hero-question"
                onClick={() => openQuestion(questions[0])}
                aria-label={`Buka pertanyaan: ${questions[0].text}`}
              >
                <span className="deck-category">CARA PANDANG BARU</span>
                <span className="deck-question-mark" aria-hidden="true">
                  “
                </span>
                <span className="deck-question">
                  Kapan terakhir
                  <br />
                  kali kamu
                  <br />
                  berubah pikiran?
                </span>
                <span className="deck-footer">
                  <span>MULAI DARI SINI</span>
                  <span className="deck-arrow">
                    <ArrowUpRight size={24} />
                  </span>
                </span>
              </button>
              <span className="deck-side-note">
                TAK HARUS SELESAI HARI INI.
              </span>
            </div>
            <div className="art-caption">
              <span>Untuk pikiran yang masih bertumbuh.</span>
              <span>01 / 24</span>
            </div>
          </div>
        </section>
        <div className="intro-strip container">
          <span className="intro-symbol" aria-hidden="true">
            *
          </span>
          <p>
            Kadang, yang kita butuhkan bukan jawaban cepat.
            <br />
            <strong>Tapi pertanyaan yang belum pernah kita tanyakan.</strong>
          </p>
          <a
            href="#pertanyaan"
            className="circle-link"
            aria-label="Jelajahi pertanyaan"
          >
            <ChevronDown size={23} />
          </a>
        </div>
        <section
          id="pertanyaan"
          className="questions-section container"
          aria-labelledby="questions-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">MULAI DARI RASA INGIN TAHU</span>
              <h2 id="questions-title">
                Mana yang membuatmu
                <br />
                ingin berhenti sebentar?
              </h2>
            </div>
            <p>
              Pilih yang dekat denganmu.
              <br />
              Atau justru yang belum pernah terpikirkan.
            </p>
          </div>
          <div
            className="filters"
            role="group"
            aria-label="Filter topik pertanyaan"
          >
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={filter === c}
                className={filter === c ? "filter active" : "filter"}
                onClick={() => {
                  setFilter(c);
                  setLimit(6);
                }}
              >
                {c}
              </button>
            ))}
            <span className="question-count" aria-live="polite">
              {visible.length} pertanyaan
            </span>
          </div>
          <div className="question-grid">
            {visible.slice(0, limit).map((q, i) => (
              <button
                className={`question-tile tile-${i % 3}`}
                key={q.id}
                onClick={() => openQuestion(q)}
              >
                <span className="tile-top">
                  <span>{q.category}</span>
                  <ArrowUpRight size={22} />
                </span>
                <span className="tile-question">{q.text}</span>
                <span className="tile-bottom">
                  Pikirkan. Tulis. Atau bawa pulang.
                </span>
              </button>
            ))}
          </div>
          {limit < visible.length && (
            <button
              className="button button-outline load-more"
              onClick={() => setLimit(limit + 6)}
            >
              Jelajahi pertanyaan lain <Plus size={18} />
            </button>
          )}
        </section>
        <section
          id="perspektif"
          className="perspective-section"
          aria-labelledby="perspective-title"
        >
          <div className="container perspective-layout">
            <div className="perspective-heading">
              <span className="eyebrow">CARA LAIN MELIHAT</span>
              <h2 id="perspective-title">
                Satu pertanyaan.
                <br />
                Banyak perspektif.
              </h2>
              <p>
                Jawaban orang lain tidak harus menjadi jawabanmu. Kadang, cukup
                membuka cara pandang baru.
              </p>
              <span className="sample-label">Koleksi contoh editorial</span>
            </div>
            <div className="perspective-reading" aria-live="polite">
              <span className="reading-question">{sample.text}</span>
              <blockquote key={sample.id}>{sample.perspective}</blockquote>
              <div className="reading-bottom">
                <span>Ditulis sebagai contoh pengalaman</span>
                <div className="reading-arrows">
                  <button
                    className="icon-button"
                    aria-label="Perspektif sebelumnya"
                    onClick={() =>
                      setSampleIndex(
                        (sampleIndex - 1 + sampleIndexes.length) %
                          sampleIndexes.length,
                      )
                    }
                  >
                    <ArrowLeft size={21} />
                  </button>
                  <span>
                    {sampleIndex + 1} / {sampleIndexes.length}
                  </span>
                  <button
                    className="icon-button"
                    aria-label="Perspektif berikutnya"
                    onClick={() =>
                      setSampleIndex((sampleIndex + 1) % sampleIndexes.length)
                    }
                  >
                    <ArrowRight size={21} />
                  </button>
                </div>
              </div>
              <button
                className="text-button reading-answer"
                onClick={() => openQuestion(sample)}
              >
                Bagaimana denganmu? <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>
        <section className="takeaway container">
          <div className="takeaway-title">
            <h2>
              Pertanyaannya boleh sama.
              <br />
              <span>Cara melihatnya bisa berbeda.</span>
            </h2>
          </div>
          <div className="takeaway-description">
            <p>
              Tarik satu kartu untuk dirimu. Atau kirim ke seseorang yang ingin
              kamu dengar ceritanya.
            </p>
            <button className="button button-dark" onClick={randomQuestion}>
              Temukan pertanyaanmu <Shuffle size={18} />
            </button>
            <span className="privacy-note">
              <LockKeyhole size={14} /> Tanpa akun. Jawabanmu tidak dikirim.
            </span>
          </div>
        </section>
        <section
          className="event-section container"
          id="acara"
          aria-labelledby="event-title"
        >
          <div className="event-band">
            <span className="event-year">2027</span>
            <div className="event-copy">
              <span className="eyebrow">TEDxUniversitasIndonesia</span>
              <h2 id="event-title">
                Percakapannya
                <br />
                belum selesai.
              </h2>
              <p>
                Kenali perjalanan <em>Still, We Grow</em> menuju Main Event.
                Ruang untuk bertemu gagasan dan melihat dari sudut yang berbeda.
              </p>
              <button
                className="button button-outline"
                onClick={() => setInfo("event")}
              >
                Tentang Main Event <MoveUpRight size={18} />
              </button>
            </div>
            <div className="event-word" aria-hidden="true">
              Still,
              <br />
              We
              <br />
              Grow<span>.</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-main">
          <Brand footer />
          <p>
            Satu pertanyaan untukmu.
            <br />
            Satu percakapan yang mungkin belum dimulai.
          </p>
          <button className="text-button" onClick={() => setInfo("privacy")}>
            Tentang ruang ini <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>Still, We Grow · 2027</span>
          <span>
            Pratinjau interaktif · Perspektif berupa contoh editorial.
          </span>
        </div>
      </footer>
      {active && (
        <QuestionRoom
          question={active}
          close={closeQuestion}
          next={randomQuestion}
          drafts={drafts}
          setDrafts={setDrafts}
        />
      )}
      {info && (
        <Modal
          title={info === "event" ? "Main Event 2027" : "Tentang ruang ini"}
          close={() => setInfo(null)}
          className="info-modal"
        >
          {info === "event" ? (
            <div className="info-content">
              <span className="eyebrow">STILL, WE GROW</span>
              <h2>
                Mulai dari pertanyaan.
                <br />
                Bertemu gagasan baru.
              </h2>
              <p>
                Pengalaman interaktif ini merupakan konsep kampanye menuju{" "}
                {event.name}. Tema <em>Still, We Grow</em> mengajak kita melihat
                pertumbuhan sebagai proses belajar, bertanya, dan meninjau ulang
                cara pandang.
              </p>
              <dl>
                <div>
                  <dt>Tanggal</dt>
                  <dd>{event.date || "Akan diumumkan"}</dd>
                </div>
                <div>
                  <dt>Lokasi</dt>
                  <dd>{event.venue || "Akan diumumkan"}</dd>
                </div>
                <div>
                  <dt>Pembicara & tiket</dt>
                  <dd>Informasi resmi menyusul</dd>
                </div>
              </dl>
              <details>
                <summary>
                  Apa itu TEDx?
                  <Plus size={17} />
                </summary>
                <p>
                  TEDx adalah program acara lokal yang diselenggarakan secara
                  independen dengan semangat berbagi gagasan.
                  TEDxUniversitasIndonesia adalah acara TEDx, bukan konferensi
                  TED.
                </p>
              </details>
              <details>
                <summary>
                  Apakah harus mahasiswa UI?
                  <Plus size={17} />
                </summary>
                <p>
                  Ruang pertanyaan ini bisa dijelajahi siapa saja. Ketentuan
                  peserta Main Event akan disampaikan bersama informasi resmi
                  acara.
                </p>
              </details>
              {event.ticketUrl ? (
                <a
                  className="button button-red"
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat tiket resmi <ArrowUpRight size={18} />
                </a>
              ) : (
                <p className="event-status">
                  Penjualan tiket belum tersedia melalui situs pratinjau ini.
                </p>
              )}
              <button className="text-button" onClick={() => setInfo(null)}>
                <ArrowLeft size={17} /> Kembali menjelajah
              </button>
            </div>
          ) : (
            <div className="info-content">
              <h2>
                Ruang kecil untuk
                <br />
                rasa ingin tahu.
              </h2>
              <p>
                Ini adalah proof of concept kampanye “What are you still
                figuring out?” untuk TEDxUniversitasIndonesia 2027.
              </p>
              <h3>Tulisanmu tetap milikmu.</h3>
              <p>
                Jawaban diproses di browser dan tidak dikirim ke server, tidak
                disimpan permanen, dan tidak masuk ke koleksi publik. Saat
                halaman dimuat ulang, draf akan hilang. Kartu yang kamu unduh
                tersimpan di perangkatmu.
              </p>
              <h3>Perspektif adalah contoh.</h3>
              <p>
                Seluruh perspektif dalam pratinjau ditulis sebagai contoh
                editorial, bukan kesaksian atau kiriman pengunjung. Tidak ada
                komentar, pesan pribadi, atau layanan konseling di sini.
              </p>
              <h3>Berbagi adalah pilihan.</h3>
              <p>
                Tautan berbagi hanya membuka pertanyaannya. Jawaban pribadimu
                tidak dimasukkan ke dalam URL. Jika kamu membagikan gambar
                jawaban, orang yang menerima gambar tersebut dapat membacanya.
              </p>
              <button
                className="button button-dark"
                onClick={() => setInfo(null)}
              >
                Mengerti <Check size={17} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
