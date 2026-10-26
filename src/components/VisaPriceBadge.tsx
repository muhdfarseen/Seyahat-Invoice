import "./VisaPriceBadge.css";

export interface VisaPriceItem {
  id: string;
  price: number | string;
  label: string;
}

export const VisaPriceBadge = ({
  price,
  label,
}: {
  price: number | string;
  label?: string;
}) => {
  const formatPrice = (val: number | string) => {
    if (val === "" || val === null || val === undefined) return "";
    const str = String(val).replace(/,/g, "").trim();
    const num = parseInt(str, 10);
    if (isNaN(num)) return str;
    return num.toLocaleString("en-IN");
  };

  const hasLabel = Boolean(label && label.trim().length > 0);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Top Red-Orange Box matching Figma Auto-Layout */}
      <div
        className="figma-100-percent"
        style={{
          background: "linear-gradient(180deg, #F04C23 0%, #DE3018 100%)",
          minWidth: 218.59,
          minHeight: 84.63,
          boxSizing: "border-box",
          padding: "10.5px 16.79px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.05px solid #9E2C14",
          boxShadow: "0 11.55px 9.03px rgba(0, 0, 0, 0.15)",
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 0.93,
          }}
        >
          {/* Rupee symbol in Inter Bold */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 53.12,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 0.93,
              marginRight: 4,
            }}
          >
            ₹
          </span>

          {/* Price numbers in Montserrat Bold */}
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 53.12,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 0.93,
              letterSpacing: -0.5,
            }}
          >
            {formatPrice(price)}
          </span>
        </div>
      </div>

      {/* Bottom White Label Tab */}
      {hasLabel && (
        <div
          className="figma-100-percent-bottom"
          style={{
            background: "#ffffff",
            padding: "14px 12px 7px 12px",
            marginTop: -10,
            width: "72%",
            minWidth: 165,
            maxWidth: 210,
            textAlign: "center",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.10)",
            zIndex: 1,
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#9E2C14",
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: 1.25,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: -0.2,
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
