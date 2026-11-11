import type { Question } from "./content";

function wrap(ctx: CanvasRenderingContext2D, value: string, width: number) {
  const lines: string[] = [];
  for (const paragraph of value.split("\n")) {
    if (!paragraph) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      if (ctx.measureText(word).width > width) {
        if (line) {
          lines.push(line);
          line = "";
        }
        for (const char of word) {
          if (ctx.measureText(line + char).width > width && line) {
            lines.push(line);
            line = "";
          }
          line += char;
        }
      } else if (line && ctx.measureText(line + " " + word).width > width) {
        lines.push(line);
        line = word;
      } else line += (line ? " " : "") + word;
    }
    if (line) lines.push(line);
  }
  return lines;
}

export function questionUrl(id: string) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("q", id);
  return url.toString();
}

export async function makeCard(q: Question, response: string): Promise<Blob> {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Gambar belum bisa dibuat di browser ini.");
  ctx.fillStyle = "#f6f5f2";
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "#e62b1e";
  ctx.fillRect(0, 0, 1080, 26);
  ctx.font = "600 25px Archivo";
  ctx.fillStyle = "#e62b1e";
  ctx.fillText("STILL, WE GROW", 88, 151);
  ctx.fillStyle = "#151515";
  ctx.font = "800 88px Archivo";
  ctx.fillText("Still figuring", 88, 288);
  ctx.fillText("it out.", 88, 388);
  ctx.strokeStyle = "#ceccc6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, 454);
  ctx.lineTo(992, 454);
  ctx.stroke();
  ctx.fillStyle = "#62615d";
  ctx.font = "600 24px Archivo";
  ctx.fillText(q.category.toLocaleUpperCase("id-ID"), 88, 526);
  const hasResponse = Boolean(response.trim());
  let size = hasResponse ? 52 : 76;
  let lines: string[] = [];
  do {
    ctx.font = `700 ${size}px Archivo`;
    lines = wrap(ctx, q.text, 892);
    if (lines.length * size * 1.22 <= (hasResponse ? 300 : 620)) break;
    size -= 2;
  } while (size > 32);
  ctx.fillStyle = "#151515";
  let y = 625;
  for (const line of lines) {
    ctx.fillText(line, 88, y);
    y += size * 1.22;
  }
  if (hasResponse) {
    y += 62;
    ctx.fillStyle = "#e62b1e";
    ctx.fillRect(88, y - 18, 54, 5);
    y += 52;
    let bodySize = 46;
    let bodyLines: string[];
    do {
      ctx.font = `400 ${bodySize}px "Source Sans 3"`;
      bodyLines = wrap(ctx, response.trim(), 880);
      if (bodyLines.length * bodySize * 1.36 < 1550 - y) break;
      bodySize -= 1;
    } while (bodySize > 22);
    ctx.fillStyle = "#343430";
    for (const line of bodyLines!) {
      ctx.fillText(line, 88, y);
      y += bodySize * 1.36;
    }
  }
  ctx.strokeStyle = "#ceccc6";
  ctx.beginPath();
  ctx.moveTo(88, 1635);
  ctx.lineTo(992, 1635);
  ctx.stroke();
  ctx.fillStyle = "#151515";
  ctx.font = "600 27px Archivo";
  ctx.fillText("What are you still figuring out?", 88, 1704);
  ctx.fillStyle = "#62615d";
  ctx.font = '400 27px "Source Sans 3"';
  ctx.fillText("Satu pertanyaan. Percakapan berikutnya.", 88, 1751);
  ctx.fillStyle = "#e62b1e";
  ctx.font = "700 28px Archivo";
  ctx.fillText("TEDx", 88, 1842);
  ctx.fillStyle = "#151515";
  ctx.font = "500 25px Archivo";
  ctx.fillText("UniversitasIndonesia", 164, 1842);
  // Do not include a local preview host in a public-facing image.
  const host = window.location.hostname;
  if (!/localhost|127\.0\.0\.1|preview|internal/.test(host)) {
    ctx.fillStyle = "#62615d";
    ctx.font = '400 20px "Source Sans 3"';
    const label = host.length > 48 ? host.slice(0, 45) + "…" : host;
    ctx.fillText(label, 88, 1884);
  }
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Gambar belum berhasil dibuat. Coba lagi.")),
      "image/png",
    ),
  );
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}
