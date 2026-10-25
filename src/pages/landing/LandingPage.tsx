import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { routes, type RouteConfig } from "../../routes";
import { useNavigation } from "../../NavigationContext";

// Mini preview graphics for each card (Canva-style tilted overlapping cards)
const CardPreview = ({ route }: { route: RouteConfig }) => {
  const { id, accentColor } = route;

  return (
    <Box
      className="card-preview-box"
      style={{
        position: "relative",
        width: 82,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* Tilted Back Layer Sheet */}
      <Box
        className="preview-back"
        style={{
          position: "absolute",
          width: 48,
          height: 48,
          borderRadius: 10,
          background: accentColor,
          opacity: 0.7,
          transform: "rotate(-10deg) translate(-4px, 2px)",
          transition: "transform 0.25s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      />

      {/* Tilted Front Layer Mockup */}
      <Box
        className="preview-front"
        style={{
          position: "absolute",
          width: 54,
          height: 46,
          borderRadius: 8,
          background: "#ffffff",
          transform: "rotate(6deg) translate(2px, -1px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transition: "transform 0.25s ease",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Specific graphic depending on tool type */}
        {id === "invoice" && (
          <Box style={{ width: "100%", height: "100%", padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            <Box style={{ height: 6, background: "#3b82f6", borderRadius: 3 }} />
            <Box style={{ height: 2.5, width: "75%", background: "#e2e8f0", borderRadius: 2 }} />
            <Box style={{ height: 2.5, width: "90%", background: "#e2e8f0", borderRadius: 2 }} />
            <Box style={{ height: 2.5, width: "55%", background: "#e2e8f0", borderRadius: 2 }} />
            <Box
              style={{
                marginTop: "auto",
                alignSelf: "flex-end",
                height: 7,
                width: 18,
                background: "#10b981",
                borderRadius: 3,
              }}
            />
          </Box>
        )}

        {id === "flight" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              style={{
                height: 14,
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 9, lineHeight: 1 }}>✈️</Text>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box style={{ height: 2.5, width: "80%", background: "#cbd5e1", borderRadius: 2 }} />
              <Box
                style={{
                  height: 2,
                  width: "100%",
                  borderBottom: "1.5px dashed #94a3b8",
                  marginTop: 2,
                }}
              />
              <Box
                style={{
                  marginTop: 2,
                  alignSelf: "flex-end",
                  height: 6,
                  width: 20,
                  background: "#f97316",
                  borderRadius: 3,
                }}
              />
            </Box>
          </Box>
        )}

        {id === "bahrain" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              style={{
                height: 14,
                background: "#da291c",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 4px",
              }}
            >
              <Box
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderLeft: "6px solid #ffffff",
                }}
              />
              <Text fw={900} style={{ fontSize: 7, color: "#fff" }}>BH</Text>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              <Box style={{ height: 3, width: "70%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box style={{ height: 3, width: "85%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box
                style={{
                  marginTop: 1,
                  height: 7,
                  background: "#fee2e2",
                  borderRadius: 3,
                  border: "0.5px solid #ef4444",
                }}
              />
            </Box>
          </Box>
        )}

        {id === "qatar" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              style={{
                height: 14,
                background: "#8a1538",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 4px",
              }}
            >
              <Box
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderLeft: "6px solid #ffffff",
                }}
              />
              <Text fw={900} style={{ fontSize: 7, color: "#fff" }}>QA</Text>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              <Box style={{ height: 3, width: "70%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box style={{ height: 3, width: "85%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box
                style={{
                  marginTop: 1,
                  height: 7,
                  background: "#fce4ec",
                  borderRadius: 3,
                  border: "0.5px solid #8a1538",
                }}
              />
            </Box>
          </Box>
        )}

        {id === "uae" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            {/* UAE flag stripe */}
            <Box style={{ height: 13, display: "flex" }}>
              <Box style={{ width: 6, background: "#ef4444" }} />
              <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box style={{ flex: 1, background: "#00732f" }} />
                <Box style={{ flex: 1, background: "#ffffff" }} />
                <Box style={{ flex: 1, background: "#000000" }} />
              </Box>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              <Box style={{ height: 3, width: "70%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box style={{ height: 3, width: "85%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box
                style={{
                  marginTop: 1,
                  height: 7,
                  background: "#fef9c3",
                  borderRadius: 3,
                  border: "0.5px solid #eab308",
                }}
              />
            </Box>
          </Box>
        )}

        {id === "oman" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box style={{ height: 13, display: "flex" }}>
              <Box style={{ width: 8, background: "#db1616" }} />
              <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box style={{ flex: 1, background: "#ffffff" }} />
                <Box style={{ flex: 1, background: "#db1616" }} />
                <Box style={{ flex: 1, background: "#008000" }} />
              </Box>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              <Box style={{ height: 3, width: "70%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box style={{ height: 3, width: "85%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box
                style={{
                  marginTop: 1,
                  height: 7,
                  background: "#dcfce7",
                  borderRadius: 3,
                  border: "0.5px solid #16a34a",
                }}
              />
            </Box>
          </Box>
        )}

        {id === "saudi" && (
          <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              style={{
                height: 14,
                background: "#006c35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text fw={900} style={{ fontSize: 7, color: "#fff" }}>KSA</Text>
            </Box>
            <Box style={{ padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              <Box style={{ height: 3, width: "70%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box style={{ height: 3, width: "85%", background: "#e2e8f0", borderRadius: 2 }} />
              <Box
                style={{
                  marginTop: 1,
                  height: 7,
                  background: "#dcfce7",
                  borderRadius: 3,
                  border: "0.5px solid #006c35",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const LandingPage = () => {
  const { navigate } = useNavigation();

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        padding: "48px 24px",
      }}
    >
      {/* Centered Logo */}
      <Box mb={44} style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/Seyahat.png"
          alt="Seyahat Tours & Travels"
          w={210}
          style={{ userSelect: "none" }}
        />
      </Box>

      {/* Minimal Canva-Style 4-Column Cards Grid */}
      <Container size={1140} px={0} w="100%">
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 2, md: 4 }}
          spacing={20}
        >
          {routes.map((route) => (
            <Box
              key={route.path}
              className="canva-card"
              onClick={() => navigate(route.path)}
              style={{
                height: 84,
                borderRadius: 20,
                backgroundColor: route.cardBg,
                padding: "0 14px 0 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)",
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              {/* Left Side: Bold Title */}
              <Text
                fw={700}
                style={{
                  fontSize: 15,
                  color: "#1e2124",
                  lineHeight: 1.25,
                  letterSpacing: -0.2,
                  maxWidth: "58%",
                }}
              >
                {route.label}
              </Text>

              {/* Right Side: Micro Tilted Graphic */}
              <CardPreview route={route} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Hover effects */}
      <style>{`
        .canva-card:hover {
          transform: translateY(-2px);
        }
        .canva-card:hover .preview-back {
          transform: rotate(-14deg) scale(1.06) !important;
        }
        .canva-card:hover .preview-front {
          transform: rotate(9deg) scale(1.08) !important;
        }
        .canva-card:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </Box>
  );
};

export default LandingPage;
