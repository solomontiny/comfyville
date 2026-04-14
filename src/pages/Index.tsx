const Index = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      {/* HERO */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "#f8fafc",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Welcome to Comfyville 🏡
        </h1>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "600px", margin: "0 auto" }}>
          Discover premium properties, short-term stays, and smart real estate investments — all in one place.
        </p>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          Our Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h3>🏠 Property Sales</h3>
            <p>Buy and sell properties with ease and full transparency.</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h3>🛏 Short-Term Rentals</h3>
            <p>Comfortable apartments for short stays and travel needs.</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h3>📊 Property Management</h3>
            <p>Professional management for your real estate assets.</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
            <h3>💼 Investment Guidance</h3>
            <p>Expert advice to help you make smart property decisions.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        style={{
          padding: "70px 20px",
          textAlign: "center",
          background: "#111",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          Start Your Journey with Comfyville
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Let’s help you find the perfect property today.
        </p>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            background: "#fff",
            color: "#111",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Index;