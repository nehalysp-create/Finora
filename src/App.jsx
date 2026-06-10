import { useState, useEffect } from "react";

const CARD_IMG =
  "data:image/jpeg;base64,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";
const LOGO_IMG =
  "data:image/png;base64,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";

const COLORS = {
  bg: "#1A4A2E",
  card: "#2D7A4F",
  cardLight: "#3D8A5F",
  accent: "#B8960C",
  accentDim: "#9A7E0A",
  accentGlow: "rgba(184, 150, 12, 0.15)",
  white: "#FBF8F0",
  cream: "#F2ECD8",
  gray: "#A8B8A0",
  grayLight: "#D4DDD0",
  red: "#FF5252",
  yellow: "#B8960C",
  green: "#4CAF50",
  overlay: "rgba(0, 0, 0, 0.6)",
};

const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', 'Helvetica Neue', sans-serif",
};

const PhoneFrame = ({ children }) => (
  <div
    style={{
      width: 375,
      height: 812,
      borderRadius: 40,
      overflow: "hidden",
      background: COLORS.bg,
      position: "relative",
      boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 2px #3D6B4A",
      fontFamily: FONTS.body,
    }}
  >
    <div
      style={{
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        fontSize: 12,
        color: COLORS.cream,
        fontWeight: 600,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <span>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 10 }}>●●●●</span>
        <span style={{ fontSize: 11 }}>🔋</span>
      </div>
    </div>
    <div style={{ height: "100%", overflowY: "auto", paddingTop: 50 }}>
      {children}
    </div>
  </div>
);

const Button = ({ children, onClick, variant = "primary", style = {} }) => {
  const [hover, setHover] = useState(false);
  const styles = {
    primary: {
      background: hover ? COLORS.accentDim : COLORS.accent,
      color: COLORS.bg,
      fontWeight: 700,
    },
    secondary: {
      background: hover ? COLORS.cardLight : COLORS.card,
      color: COLORS.white,
      fontWeight: 600,
      border: `1px solid ${COLORS.cardLight}`,
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        padding: "16px 24px",
        borderRadius: 14,
        border: "none",
        fontSize: 15,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: FONTS.body,
        letterSpacing: 0.3,
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Input = ({ label, placeholder, value, onChange }) => (
  <div style={{ marginBottom: 16 }}>
    <div
      style={{
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 6,
        fontWeight: 500,
        letterSpacing: 0.5,
      }}
    >
      {label}
    </div>
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "14px 16px",
        borderRadius: 12,
        background: "#245A38",
        border: `1px solid ${COLORS.cardLight}`,
        color: COLORS.white,
        fontSize: 15,
        fontFamily: FONTS.body,
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  </div>
);

const Progress = ({ step, total }) => (
  <div style={{ display: "flex", gap: 4, padding: "0 24px", marginBottom: 20 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height: 3,
          borderRadius: 2,
          background: i <= step ? COLORS.accent : COLORS.cardLight,
          transition: "all 0.4s ease",
        }}
      />
    ))}
  </div>
);

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      color: COLORS.cream,
      fontSize: 22,
      cursor: "pointer",
      padding: "12px 24px",
    }}
  >
    ←
  </button>
);

const LogoSmall = ({ size = 28 }) => (
  <img
    src={LOGO_IMG}
    alt="Finora"
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: "hue-rotate(90deg) brightness(0.4) saturate(2)",
    }}
  />
);

// ===== SCREENS =====

const SplashScreen = ({ onNext }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);
  return (
    <div
      style={{
        height: 762,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        background: `radial-gradient(ellipse at 50% 30%, rgba(184,150,12,0.1) 0%, ${COLORS.bg} 70%)`,
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <img
        src={LOGO_IMG}
        alt="Finora"
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          marginBottom: 20,
        }}
      />
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 36,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 8,
          fontWeight: 400,
        }}
      >
        finora
      </h1>
      <p
        style={{
          color: COLORS.gray,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.5,
          marginBottom: 60,
          maxWidth: 260,
        }}
      >
        Your mutual fund is your credit score. One card. One app.
      </p>
      <Button onClick={onNext}>Get Started</Button>
      <button
        onClick={onNext}
        style={{
          background: "none",
          border: "none",
          color: COLORS.gray,
          fontSize: 14,
          marginTop: 16,
          cursor: "pointer",
          fontFamily: FONTS.body,
        }}
      >
        Already have an account?{" "}
        <span style={{ color: COLORS.accent }}>Sign In</span>
      </button>
    </div>
  );
};

const PhoneScreen = ({ onNext, onBack }) => {
  const [phone, setPhone] = useState("");
  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={0} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Enter your mobile number
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 14,
            marginBottom: 32,
            lineHeight: 1.5,
          }}
        >
          We'll send you a 6-digit OTP to verify
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            background: "#245A38",
            borderRadius: 14,
            padding: "4px 16px",
            border: `1px solid ${COLORS.cardLight}`,
          }}
        >
          <span style={{ color: COLORS.cream, fontSize: 15, fontWeight: 600 }}>
            +91
          </span>
          <div style={{ width: 1, height: 24, background: COLORS.cardLight }} />
          <input
            placeholder="Enter 10-digit number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            style={{
              flex: 1,
              padding: "14px 0",
              background: "none",
              border: "none",
              color: COLORS.white,
              fontSize: 17,
              fontFamily: FONTS.body,
              outline: "none",
              letterSpacing: 1.5,
            }}
          />
        </div>
        <Button onClick={onNext}>Send OTP</Button>
      </div>
    </div>
  );
};

const OTPScreen = ({ onNext, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={1} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Verify OTP
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 14,
            marginBottom: 32,
            lineHeight: 1.5,
          }}
        >
          Sent to +91 98765 43210
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 32,
            justifyContent: "center",
          }}
        >
          {otp.map((d, i) => (
            <input
              key={i}
              maxLength={1}
              value={d}
              onChange={(e) => {
                const n = [...otp];
                n[i] = e.target.value;
                setOtp(n);
              }}
              style={{
                width: 48,
                height: 56,
                textAlign: "center",
                fontSize: 22,
                borderRadius: 12,
                border: `1px solid ${d ? COLORS.accent : COLORS.cardLight}`,
                background: d ? COLORS.accentGlow : "#245A38",
                color: COLORS.white,
                fontFamily: FONTS.body,
                fontWeight: 700,
                outline: "none",
              }}
            />
          ))}
        </div>
        <Button onClick={onNext}>Verify</Button>
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: COLORS.gray,
          }}
        >
          Didn't receive?{" "}
          <span style={{ color: COLORS.accent }}>Resend in 30s</span>
        </p>
      </div>
    </div>
  );
};

const KYCScreen = ({ onNext, onBack }) => {
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={2} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Complete KYC
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 14,
            marginBottom: 32,
            lineHeight: 1.5,
          }}
        >
          Required by our banking partner for card issuance
        </p>
        <Input
          label="PAN CARD NUMBER"
          placeholder="ABCDE1234F"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
        />
        <Input
          label="AADHAAR NUMBER"
          placeholder="1234 5678 9012"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value.slice(0, 14))}
        />
        <div
          style={{
            background: "#245A38",
            borderRadius: 14,
            padding: 16,
            marginBottom: 24,
            border: `1px solid ${COLORS.cardLight}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: COLORS.accentGlow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🔒
            </div>
            <div>
              <div
                style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}
              >
                Bank-grade security
              </div>
              <div style={{ color: COLORS.gray, fontSize: 11 }}>
                KYC processed by SFB partner via DigiLocker
              </div>
            </div>
          </div>
        </div>
        <Button onClick={onNext}>Verify Identity</Button>
      </div>
    </div>
  );
};

const KYCSuccessScreen = ({ onNext }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);
  return (
    <div
      style={{
        height: 762,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        opacity: show ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          marginBottom: 28,
          background: COLORS.accentGlow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          boxShadow: `0 0 40px ${COLORS.accentGlow}`,
        }}
      >
        ✓
      </div>
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: 26,
          color: COLORS.white,
          marginBottom: 8,
          fontWeight: 400,
        }}
      >
        KYC Verified
      </h2>
      <p
        style={{
          color: COLORS.gray,
          fontSize: 14,
          textAlign: "center",
          lineHeight: 1.5,
          marginBottom: 48,
          maxWidth: 260,
        }}
      >
        Your identity has been verified. Now let's link your mutual funds to get
        your credit limit.
      </p>
      <Button onClick={onNext}>Link Mutual Funds →</Button>
    </div>
  );
};

const LinkMFScreen = ({ onNext, onBack }) => {
  const [linked, setLinked] = useState(false);
  const [loading, setLoading] = useState(false);
  const folios = [
    { platform: "Groww", icon: "📈", funds: 3, value: "₹42,500" },
    { platform: "Zerodha Coin", icon: "🪙", funds: 2, value: "₹18,200" },
    { platform: "Kuvera", icon: "💎", funds: 1, value: "₹8,300" },
  ];
  const handleLink = () => {
    setLoading(true);
    setTimeout(() => {
      setLinked(true);
      setLoading(false);
    }, 1500);
  };
  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={3} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Link your Mutual Funds
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 14,
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          We'll fetch your folios via MFCentral. Your investments stay where
          they are.
        </p>
        {!linked ? (
          <>
            <div
              style={{
                background: "#245A38",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                border: `1px solid ${COLORS.cardLight}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔗</div>
              <div
                style={{
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Connect via MFCentral
              </div>
              <div
                style={{ color: COLORS.gray, fontSize: 12, lineHeight: 1.5 }}
              >
                SEBI-mandated platform. Fetches all your MF holdings across AMCs
                securely.
              </div>
            </div>
            <Button onClick={handleLink}>
              {loading ? "Fetching your folios..." : "Connect MFCentral"}
            </Button>
          </>
        ) : (
          <>
            <div
              style={{
                background: COLORS.accentGlow,
                borderRadius: 12,
                padding: "10px 16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: COLORS.accent, fontSize: 16 }}>✓</span>
              <span
                style={{ color: COLORS.accent, fontSize: 13, fontWeight: 600 }}
              >
                3 platforms detected • 6 funds • ₹69,000 total value
              </span>
            </div>
            {folios.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#245A38",
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 10,
                  border: `1px solid ${COLORS.cardLight}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: COLORS.card,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        color: COLORS.white,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {f.platform}
                    </div>
                    <div style={{ color: COLORS.gray, fontSize: 12 }}>
                      {f.funds} funds
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    color: COLORS.accent,
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {f.value}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <Button onClick={onNext}>Select Funds to Pledge →</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PledgeScreen = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState({});
  const funds = [
    {
      name: "ICICI Pru Liquid Fund",
      type: "Debt",
      value: 22500,
      ltv: 80,
      platform: "Groww",
    },
    {
      name: "HDFC Overnight Fund",
      type: "Debt",
      value: 12000,
      ltv: 80,
      platform: "Groww",
    },
    {
      name: "Nippon India Large Cap",
      type: "Equity",
      value: 8000,
      ltv: 50,
      platform: "Groww",
    },
    {
      name: "SBI Blue Chip Fund",
      type: "Equity",
      value: 10200,
      ltv: 50,
      platform: "Zerodha",
    },
    {
      name: "Kotak Flexi Cap Fund",
      type: "Equity",
      value: 8000,
      ltv: 50,
      platform: "Zerodha",
    },
    {
      name: "UTI Liquid Fund",
      type: "Debt",
      value: 8300,
      ltv: 80,
      platform: "Kuvera",
    },
  ];
  const toggle = (i) => setSelected((s) => ({ ...s, [i]: !s[i] }));
  const selectedFunds = funds.filter((_, i) => selected[i]);
  const totalValue = selectedFunds.reduce((a, f) => a + f.value, 0);
  const creditLimit = selectedFunds.reduce(
    (a, f) => a + Math.floor((f.value * f.ltv) / 100),
    0
  );

  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={4} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Select funds to pledge
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 14,
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Your MF stays invested. We just mark a lien — you keep earning
          returns.
        </p>
        <div
          style={{
            background: `linear-gradient(135deg, #245A38 0%, ${COLORS.card} 100%)`,
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
            border: `1px solid ${COLORS.accent}33`,
          }}
        >
          <div
            style={{
              color: COLORS.gray,
              fontSize: 11,
              letterSpacing: 1,
              marginBottom: 4,
              textTransform: "uppercase",
            }}
          >
            Your credit limit
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 36,
              color: COLORS.accent,
              fontWeight: 400,
            }}
          >
            ₹{creditLimit.toLocaleString()}
          </div>
          <div style={{ color: COLORS.gray, fontSize: 12, marginTop: 4 }}>
            from ₹{totalValue.toLocaleString()} pledged MF value
          </div>
          <div
            style={{
              color: COLORS.gray,
              fontSize: 11,
              marginTop: 8,
              fontStyle: "italic",
            }}
          >
            Pledge more funds anytime to increase your limit
          </div>
        </div>
        {funds.map((f, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{
              background: selected[i] ? COLORS.accentGlow : "#245A38",
              borderRadius: 14,
              padding: 14,
              marginBottom: 8,
              border: `1px solid ${
                selected[i] ? COLORS.accent + "44" : COLORS.cardLight
              }`,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: `2px solid ${
                    selected[i] ? COLORS.accent : COLORS.gray
                  }`,
                  background: selected[i] ? COLORS.accent : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: COLORS.bg,
                  fontWeight: 800,
                }}
              >
                {selected[i] && "✓"}
              </div>
              <div>
                <div
                  style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}
                >
                  {f.name}
                </div>
                <div style={{ color: COLORS.gray, fontSize: 11 }}>
                  {f.type} • LTV {f.ltv}% • {f.platform}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{ color: COLORS.white, fontSize: 14, fontWeight: 700 }}
              >
                ₹{f.value.toLocaleString()}
              </div>
              <div style={{ color: COLORS.accent, fontSize: 11 }}>
                → ₹{Math.floor((f.value * f.ltv) / 100).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={onNext}
            style={{ opacity: creditLimit > 0 ? 1 : 0.4 }}
          >
            Pledge & Get Card →
          </Button>
        </div>
      </div>
    </div>
  );
};

const ConfirmPledgeScreen = ({ onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ padding: "0 0 40px 0" }}>
      <BackButton onClick={onBack} />
      <Progress step={4} total={5} />
      <div style={{ padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            color: COLORS.white,
            marginBottom: 24,
            fontWeight: 400,
          }}
        >
          Confirm pledge
        </h2>
        <div
          style={{
            background: "#245A38",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            border: `1px solid ${COLORS.cardLight}`,
          }}
        >
          {[
            { label: "Total MF Value", value: "₹69,000" },
            { label: "Funds Selected", value: "6 funds" },
            { label: "Blended LTV", value: "~65%" },
            { label: "Credit Limit", value: "₹44,900", highlight: true },
            { label: "Lien Creation Fee", value: "₹200 (one-time)" },
            { label: "Interest Rate", value: "28% APR" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < 5 ? `1px solid ${COLORS.cardLight}` : "none",
              }}
            >
              <span style={{ color: COLORS.gray, fontSize: 13 }}>
                {item.label}
              </span>
              <span
                style={{
                  color: item.highlight ? COLORS.accent : COLORS.white,
                  fontSize: item.highlight ? 18 : 14,
                  fontWeight: item.highlight ? 700 : 600,
                  fontFamily: item.highlight ? FONTS.display : FONTS.body,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: COLORS.accentGlow,
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span style={{ color: COLORS.cream, fontSize: 12, lineHeight: 1.5 }}>
            Your MF units stay invested and continue earning returns. Lien is
            marked via CAMS/KFintech. You can pledge more funds later to
            increase your limit.
          </span>
        </div>
        <Button
          onClick={() => {
            setLoading(true);
            setTimeout(() => onNext(), 2000);
          }}
        >
          {loading
            ? "Marking lien on your MF units..."
            : "Confirm & Issue Card"}
        </Button>
      </div>
    </div>
  );
};

const CardIssuedScreen = ({ onNext }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 400);
  }, []);
  return (
    <div
      style={{
        height: 762,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px 40px",
      }}
    >
      <div
        style={{
          marginBottom: 16,
          fontSize: 12,
          color: COLORS.accent,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Card Issued Successfully
      </div>
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: 24,
          color: COLORS.white,
          marginBottom: 24,
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Your Finora card is ready
      </h2>
      {/* Card image */}
      <div
        style={{
          width: "100%",
          padding: "0 24px",
          boxSizing: "border-box",
          transform: show ? "translateY(0)" : "translateY(30px)",
          opacity: show ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={CARD_IMG}
          alt="Finora Card"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 14,
            boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          background: "#245A38",
          borderRadius: 14,
          padding: 16,
          marginTop: 28,
          width: "100%",
          textAlign: "center",
          border: `1px solid ${COLORS.cardLight}`,
        }}
      >
        <div
          style={{
            color: COLORS.gray,
            fontSize: 11,
            letterSpacing: 1,
            marginBottom: 4,
          }}
        >
          CREDIT LIMIT
        </div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 30,
            color: COLORS.accent,
          }}
        >
          ₹44,900
        </div>
        <div style={{ color: COLORS.gray, fontSize: 12, marginTop: 4 }}>
          Linked to UPI • Ready to spend
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "auto" }}>
        <Button onClick={onNext}>Go to Dashboard →</Button>
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [loanTab, setLoanTab] = useState("active");

  const transactions = [
    {
      name: "Amazon India",
      amount: "-₹2,499",
      time: "Today, 2:34 PM",
      icon: "🛒",
    },
    { name: "Swiggy", amount: "-₹456", time: "Today, 12:10 PM", icon: "🍕" },
    { name: "EMI Payment", amount: "-₹1,833", time: "Yesterday", icon: "🔄" },
    { name: "Uber", amount: "-₹189", time: "Yesterday", icon: "🚗" },
    { name: "Reliance Digital", amount: "-₹15,999", time: "2 Mar", icon: "📱" },
  ];

  const pledgedFunds = [
    {
      name: "ICICI Pru Liquid Fund",
      type: "Debt",
      value: "₹22,500",
      limit: "₹18,000",
      ltv: "80%",
      status: "Active",
    },
    {
      name: "HDFC Overnight Fund",
      type: "Debt",
      value: "₹12,000",
      limit: "₹9,600",
      ltv: "80%",
      status: "Active",
    },
    {
      name: "Nippon India Large Cap",
      type: "Equity",
      value: "₹8,000",
      limit: "₹4,000",
      ltv: "50%",
      status: "Active",
    },
    {
      name: "SBI Blue Chip Fund",
      type: "Equity",
      value: "₹10,200",
      limit: "₹5,100",
      ltv: "50%",
      status: "Active",
    },
    {
      name: "Kotak Flexi Cap Fund",
      type: "Equity",
      value: "₹8,000",
      limit: "₹4,000",
      ltv: "50%",
      status: "Active",
    },
    {
      name: "UTI Liquid Fund",
      type: "Debt",
      value: "₹8,300",
      limit: "₹6,640",
      ltv: "80%",
      status: "Active",
    },
  ];

  const ltvPercent = 47;

  if (activeTab === "loans") {
    return (
      <div style={{ padding: "0 0 80px 0" }}>
        <div
          style={{
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => setActiveTab("home")}
            style={{
              background: "none",
              border: "none",
              color: COLORS.cream,
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 22,
              color: COLORS.white,
              fontWeight: 400,
              margin: 0,
            }}
          >
            My Loans
          </h2>
        </div>

        {/* Loan summary card */}
        <div
          style={{
            margin: "12px 24px",
            padding: 18,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${COLORS.card} 0%, #245A38 100%)`,
            border: `1px solid ${COLORS.accent}33`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div>
              <div
                style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 1 }}
              >
                AVAILABLE AMOUNT
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 26,
                  color: COLORS.accent,
                }}
              >
                ₹23,923
              </div>
            </div>
            <div
              style={{
                background: COLORS.accent,
                color: COLORS.bg,
                fontSize: 12,
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: 10,
                cursor: "pointer",
                alignSelf: "center",
              }}
            >
              Avail Now
            </div>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "#1A4A2E" }}>
            <div
              style={{
                width: "53%",
                height: "100%",
                borderRadius: 2,
                background: COLORS.accent,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <span style={{ fontSize: 10, color: COLORS.gray }}>
              Outstanding: ₹20,977
            </span>
            <span style={{ fontSize: 10, color: COLORS.gray }}>
              Limit: ₹44,900
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            margin: "16px 24px 0",
            gap: 0,
            borderRadius: 10,
            overflow: "hidden",
            border: `1px solid ${COLORS.cardLight}`,
          }}
        >
          {["active", "pledged"].map((tab) => (
            <button
              key={tab}
              onClick={() => setLoanTab(tab)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: loanTab === tab ? COLORS.accent : "#245A38",
                color: loanTab === tab ? COLORS.bg : COLORS.gray,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: FONTS.body,
                textTransform: "capitalize",
              }}
            >
              {tab === "active" ? "Loan Details" : "Pledged Funds"}
            </button>
          ))}
        </div>

        {loanTab === "active" ? (
          <div style={{ padding: "16px 24px" }}>
            {[
              { label: "Total Loan Amount", value: "₹44,900" },
              { label: "Outstanding", value: "₹20,977" },
              { label: "Interest Rate", value: "28% APR" },
              { label: "EMI (if converted)", value: "₹1,833/month" },
              { label: "Loan End Date", value: "Mar 7, 2027" },
              { label: "Next Payment Due", value: "Mar 15, 2026" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: `1px solid ${COLORS.cardLight}`,
                }}
              >
                <span style={{ color: COLORS.gray, fontSize: 13 }}>
                  {item.label}
                </span>
                <span
                  style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "16px 24px" }}>
            {pledgedFunds.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "#245A38",
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 8,
                  border: `1px solid ${COLORS.cardLight}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {f.name}
                  </div>
                  <span
                    style={{
                      color: COLORS.green,
                      fontSize: 10,
                      fontWeight: 600,
                      background: "rgba(76,175,80,0.15)",
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {f.status}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ color: COLORS.gray, fontSize: 11 }}>
                    {f.type} • LTV {f.ltv}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: COLORS.white, fontSize: 12 }}>
                      Value: {f.value}
                    </div>
                    <div style={{ color: COLORS.accent, fontSize: 11 }}>
                      Credit: {f.limit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <Button variant="secondary">Pledge More Funds</Button>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 80px 0" }}>
      <div
        style={{
          padding: "12px 24px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: COLORS.gray, fontSize: 12 }}>Good morning</div>
          <div style={{ color: COLORS.white, fontSize: 18, fontWeight: 700 }}>
            Nehal 👋
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={LOGO_IMG}
            alt="Finora"
            style={{
              width: 28,
              height: 28,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: COLORS.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🔔
          </div>
        </div>
      </div>

      {/* Mini card */}
      <div
        style={{
          margin: "20px 24px 0",
          padding: 20,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${COLORS.card} 0%, #245A38 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 12, color: COLORS.cream, fontWeight: 500 }}>
            Finora RuPay
          </div>
          <div style={{ fontSize: 12, color: COLORS.cream }}>•••• 7891</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                color: COLORS.gray,
                fontSize: 10,
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              AVAILABLE LIMIT
            </div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 28,
                color: COLORS.white,
                fontWeight: 400,
              }}
            >
              ₹23,923
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                color: COLORS.gray,
                fontSize: 10,
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              OUTSTANDING
            </div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 20,
                color: COLORS.accent,
                fontWeight: 400,
              }}
            >
              ₹20,977
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            height: 4,
            borderRadius: 2,
            background: "#1A4A2E",
          }}
        >
          <div
            style={{
              width: "47%",
              height: "100%",
              borderRadius: 2,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.green})`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ fontSize: 10, color: COLORS.gray }}>₹0</span>
          <span style={{ fontSize: 10, color: COLORS.gray }}>
            ₹44,900 limit
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 10, padding: "20px 24px 0" }}>
        {[
          { icon: "💳", label: "Pay Bill" },
          { icon: "📋", label: "My Loans", tab: "loans" },
          { icon: "📈", label: "My MF" },
          { icon: "⭐", label: "Rewards" },
        ].map((a, i) => (
          <div
            key={i}
            onClick={() => a.tab && setActiveTab(a.tab)}
            style={{
              flex: 1,
              background: "#245A38",
              borderRadius: 14,
              padding: "14px 8px",
              textAlign: "center",
              border: `1px solid ${COLORS.cardLight}`,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ color: COLORS.cream, fontSize: 11, fontWeight: 500 }}>
              {a.label}
            </div>
          </div>
        ))}
      </div>

      {/* LTV Health */}
      <div
        style={{
          margin: "16px 24px 0",
          padding: 14,
          borderRadius: 14,
          background: "#245A38",
          border: `1px solid ${COLORS.cardLight}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span style={{ color: COLORS.cream, fontSize: 12, fontWeight: 500 }}>
            Collateral Health
          </span>
          <span style={{ color: COLORS.green, fontSize: 12, fontWeight: 700 }}>
            Healthy
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "#1A4A2E" }}>
          <div
            style={{
              width: `${ltvPercent}%`,
              height: "100%",
              borderRadius: 3,
              background: COLORS.green,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <span style={{ fontSize: 10, color: COLORS.gray }}>
            MF Value: ₹69,000
          </span>
          <span style={{ fontSize: 10, color: COLORS.gray }}>
            LTV: {ltvPercent}%
          </span>
        </div>
      </div>

      {/* Payment due */}
      <div
        style={{
          margin: "12px 24px 0",
          padding: 14,
          borderRadius: 14,
          background: COLORS.accentGlow,
          border: `1px solid ${COLORS.accent}33`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 600 }}>
            Payment Due
          </div>
          <div style={{ color: COLORS.cream, fontSize: 11 }}>
            Due by 15 Mar 2026
          </div>
        </div>
        <div
          style={{
            background: COLORS.accent,
            color: COLORS.bg,
            fontSize: 12,
            fontWeight: 700,
            padding: "8px 16px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Pay ₹3,200
        </div>
      </div>

      {/* Recent transactions */}
      <div style={{ padding: "20px 24px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <span style={{ color: COLORS.white, fontSize: 15, fontWeight: 700 }}>
            Recent Transactions
          </span>
          <span
            style={{ color: COLORS.accent, fontSize: 12, cursor: "pointer" }}
          >
            View All
          </span>
        </div>
        {transactions.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom:
                i < transactions.length - 1
                  ? `1px solid ${COLORS.cardLight}`
                  : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#245A38",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  border: `1px solid ${COLORS.cardLight}`,
                }}
              >
                {t.icon}
              </div>
              <div>
                <div
                  style={{ color: COLORS.white, fontSize: 13, fontWeight: 600 }}
                >
                  {t.name}
                </div>
                <div style={{ color: COLORS.gray, fontSize: 11 }}>{t.time}</div>
              </div>
            </div>
            <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>
              {t.amount}
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const BottomNav = ({ activeTab, setActiveTab }) => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      width: 375,
      background: COLORS.bg,
      borderTop: `1px solid ${COLORS.cardLight}`,
      display: "flex",
      justifyContent: "space-around",
      padding: "12px 0 8px",
      zIndex: 50,
    }}
  >
    {[
      { icon: "🏠", label: "Home", id: "home" },
      { icon: "💳", label: "Card", id: "card" },
      { icon: "📋", label: "My Loans", id: "loans" },
      { icon: "📈", label: "Portfolio", id: "portfolio" },
      { icon: "👤", label: "Profile", id: "profile" },
    ].map((n) => (
      <div
        key={n.id}
        onClick={() => setActiveTab(n.id)}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <div style={{ fontSize: 18, marginBottom: 2 }}>{n.icon}</div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: activeTab === n.id ? COLORS.accent : COLORS.gray,
          }}
        >
          {n.label}
        </div>
      </div>
    ))}
  </div>
);

export default function App() {
  const [screen, setScreen] = useState(0);
  const screens = [
    <SplashScreen onNext={() => setScreen(1)} />,
    <PhoneScreen onNext={() => setScreen(2)} onBack={() => setScreen(0)} />,
    <OTPScreen onNext={() => setScreen(3)} onBack={() => setScreen(1)} />,
    <KYCScreen onNext={() => setScreen(4)} onBack={() => setScreen(2)} />,
    <KYCSuccessScreen onNext={() => setScreen(5)} />,
    <LinkMFScreen onNext={() => setScreen(6)} onBack={() => setScreen(4)} />,
    <PledgeScreen onNext={() => setScreen(7)} onBack={() => setScreen(5)} />,
    <ConfirmPledgeScreen
      onNext={() => setScreen(8)}
      onBack={() => setScreen(6)}
    />,
    <CardIssuedScreen onNext={() => setScreen(9)} />,
    <HomeScreen />,
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0D1A12",
        padding: 20,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div>
        <PhoneFrame>{screens[screen]}</PhoneFrame>
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#3D6B4A",
            fontFamily: FONTS.body,
          }}
        >
          {
            [
              "Splash",
              "Phone",
              "OTP",
              "KYC",
              "KYC Done",
              "Link MF",
              "Select Funds",
              "Confirm Pledge",
              "Card Issued",
              "Dashboard",
            ][screen]
          }{" "}
          • Screen {screen + 1}/10
        </div>
      </div>
    </div>
  );
}
