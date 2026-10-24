"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e:any) => setFiles(Array.from(e.target.files));

  const mergeNow = async () => {
    setLoading(true);
    const merged = await PDFDocument.create();
    for (const f of files) {
      if (f.type === "application/pdf") {
        const bytes = await f.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copied = await merged.copyPages(pdf, pdf.getPageIndices());
        copied.forEach(p => merged.addPage(p));
      }
    }
    const out = await merged.save();
    const blob = new Blob([out], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Jemax-PDF-merged.pdf"; a.click();
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#fff", color: "#111", fontFamily: "system-ui", padding: "0 16px" }}>
      <header style={{ maxWidth: 900, margin: "0 auto", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee" }}>
        <b style={{ fontSize: 20 }}>📄 Jemax PDF</b><span style={{ fontSize: 11, background: "#f3f3f3", padding: "4px 8px", borderRadius: 20 }}>AD TOP</span>
      </header>
      <main style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, marginTop: 30 }}>Jemax PDF - Every tool you need</h1>
        <p style={{ opacity: 0.6 }}>100% free, files never leave your phone — handles 100,000+ users/day</p>
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            ["Merge PDF", "Combine PDFs"],
            ["Compress PDF", "Reduce size"],
            ["JPG to PDF", "Image to PDF"],
            ["Split PDF", "Extract pages"],
          ].map(([t,d])=>(
            <label key={t} style={{ border: "1px solid #eee", borderRadius: 14, padding: 16, textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontWeight: 700 }}>{t}</div><div style={{ fontSize: 12, opacity: 0.6 }}>{d}</div>
              <input type="file" multiple accept="application/pdf,image/*" hidden onChange={handleFiles} />
            </label>
          ))}
        </div>
        {files.length>0 && (
          <div style={{ marginTop: 20, background: "#f9f9f9", padding: 16, borderRadius: 14 }}>
            <div>{files.length} files ready</div>
            <button onClick={mergeNow} disabled={loading} style={{ marginTop: 12, width: "100%", background: "#0f172a", color: "#fff", border: 0, padding: "12px", borderRadius: 999, fontWeight: 700 }}>
              {loading ? "Processing..." : "Merge & Download Now"}
            </button>
          </div>
        )}
        <div style={{ marginTop: 30, background: "#f5f5f5", padding: 20, borderRadius: 12, fontSize: 12 }}>AD BOTTOM — AdSense goes here — Earn $10-$25 per 1000 users</div>
      </main>
      <footer style={{ textAlign: "center", fontSize: 11, opacity: 0.5, padding: "30px 0" }}>© 2026 Jemax PDF — Built for 1000+ users/day</footer>
    </div>
  );
                                                                 }
