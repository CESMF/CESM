import React, { useState } from "react";

const bistCompanies = [
  {
    symbol: "AKBNK",
    name: "Akbank",
    sector: "Bankacılık",
    marketCap: 120000000000,
    peRatio: 5.8,
    pbRatio: 0.9,
    roe: 0.18,
    debtToEquity: 0.6,
    isExporting: false,
  },
  {
    symbol: "THYAO",
    name: "Türk Hava Yolları",
    sector: "Ulaştırma",
    marketCap: 185000000000,
    peRatio: 6.3,
    pbRatio: 1.4,
    roe: 0.22,
    debtToEquity: 1.8,
    isExporting: true,
  },
  {
    symbol: "SISE",
    name: "Şişecam",
    sector: "Cam ve Kimya",
    marketCap: 90000000000,
    peRatio: 7.1,
    pbRatio: 1.1,
    roe: 0.2,
    debtToEquity: 0.7,
    isExporting: true,
  },
  {
    symbol: "EREGL",
    name: "Ereğli Demir Çelik",
    sector: "Demir-Çelik",
    marketCap: 150000000000,
    peRatio: 4.9,
    pbRatio: 1.3,
    roe: 0.25,
    debtToEquity: 0.3,
    isExporting: true,
  },
  {
    symbol: "BIMAS",
    name: "BİM Birleşik Mağazalar",
    sector: "Perakende",
    marketCap: 100000000000,
    peRatio: 10.2,
    pbRatio: 3.1,
    roe: 0.27,
    debtToEquity: 0.4,
    isExporting: false,
  },
];

export default function BistCompanyFilter() {
  const [sectorFilter, setSectorFilter] = useState("");
  const [maxPERatio, setMaxPERatio] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const sectors = [...new Set(bistCompanies.map((c) => c.sector))].sort();

  const filteredCompanies = bistCompanies.filter((company) => {
    if (sectorFilter && company.sector !== sectorFilter) return false;
    if (maxPERatio && company.peRatio > parseFloat(maxPERatio)) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>BIST Şirket Filtreleme ve Listeleme</h2>

      <div style={{ marginBottom: 16 }}>
        <label>
          <strong>Sektör:</strong>{" "}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="">Tümü</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 24 }}>
          <strong>Max P/E Oranı:</strong>{" "}
          <input
            type="number"
            value={maxPERatio}
            onChange={(e) => setMaxPERatio(e.target.value)}
            placeholder="Örn: 7"
            min="0"
            step="0.1"
            style={{ width: 80 }}
          />
        </label>
      </div>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th>Sembol</th>
            <th>Şirket</th>
            <th>Sektör</th>
            <th>P/E</th>
            <th>P/B</th>
            <th>ROE</th>
            <th>Borç/Öz Sermaye</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 16 }}>
                Kriterlere uygun şirket bulunamadı.
              </td>
            </tr>
          )}

          {filteredCompanies.map((company) => (
            <tr
              key={company.symbol}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedCompany(company)}
            >
              <td>{company.symbol}</td>
              <td>{company.name}</td>
              <td>{company.sector}</td>
              <td>{company.peRatio}</td>
              <td>{company.pbRatio}</td>
              <td>{(company.roe * 100).toFixed(1)}%</td>
              <td>{company.debtToEquity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCompany && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            border: "1px solid #ccc",
            borderRadius: 8,
            backgroundColor: "#fafafa",
          }}
        >
          <h3>Şirket Detayı: {selectedCompany.name}</h3>
          <p>
            <strong>Sembol:</strong> {selectedCompany.symbol}
          </p>
          <p>
            <strong>Sektör:</strong> {selectedCompany.sector}
          </p>
          <p>
            <strong>Market Cap:</strong>{" "}
            {(selectedCompany.marketCap / 1_000_000_000).toFixed(2)} Milyar TL
          </p>
          <p>
            <strong>P/E Oranı:</strong> {selectedCompany.peRatio}
          </p>
          <p>
            <strong>P/B Oranı:</strong> {selectedCompany.pbRatio}
          </p>
          <p>
            <strong>ROE:</strong> {(selectedCompany.roe * 100).toFixed(2)}%
          </p>
          <p>
            <strong>Borç / Öz Sermaye:</strong> {selectedCompany.debtToEquity}
          </p>
          <p>
            <strong>İhracat Var mı?:</strong>{" "}
            {selectedCompany.isExporting ? "Evet" : "Hayır"}
          </p>
          <button onClick={() => setSelectedCompany(null)}>Kapat</button>
        </div>
      )}
    </div>
  );
}
