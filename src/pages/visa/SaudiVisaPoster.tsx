import { useRef, useState } from "react";
import {
  Button,
  NumberInput,
  Paper,
  Text,
  Stack,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import Layout from "../../components/Layout";
import { useNavigation } from "../../NavigationContext";
import { AutoFitPosterPreview } from "../../components/AutoFitPosterPreview";

const SaudiVisaPoster = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const [priceVisit, setPriceVisit] = useState<number | string>(12500);
  const [priceUmrah, setPriceUmrah] = useState<number | string>(9500);
  const [price1Year, setPrice1Year] = useState<number | string>(22500);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "saudi-visa-poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const formatPrice = (price: number | string) => {
    if (price === "" || price === null || price === undefined) return "";
    const num = typeof price === "string" ? parseInt(price) : price;
    if (isNaN(num)) return "";
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const renderPriceBadge = (label: string, price: number | string) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Inter', sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: "linear-gradient(180deg, #1a8a3f 0%, #147032 100%)",
          borderRadius: 10,
          padding: "8px 20px",
          minWidth: 140,
          textAlign: "center",
          boxShadow: "0 3px 8px rgba(26,138,63,0.35)",
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: -0.5,
          }}
        >
          {formatPrice(price)}
        </span>
      </div>
    </div>
  );

  const renderPosterPreview = () => (
    <div
      ref={posterRef}
      style={{
        width: 800,
        height: 1000,
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        background: "linear-gradient(160deg, #0d4d23 0%, #0a3a1a 40%, #062810 100%)",
      }}
    >
      {/* Decorative gold accent */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "linear-gradient(90deg, #c9a84c, #e8c95a, #c9a84c)",
      }} />

      {/* Header Section */}
      <div
        style={{
          padding: "50px 40px 30px",
          textAlign: "center",
        }}
      >
        <img src="/Seyahat.png" alt="Logo" style={{ width: 140, marginBottom: 20, filter: "brightness(0) invert(1)" }} />
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Visa Services
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Saudi Arabia
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#c9a84c",
            marginTop: 4,
            letterSpacing: 2,
          }}
        >
          VISA
        </div>
        <div
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            marginTop: 12,
            fontWeight: 500,
          }}
        >
          Visit • Umrah • Multiple Entry Options
        </div>
      </div>

      {/* Flag Area */}
      <div style={{ textAlign: "center", padding: "20px 0 30px" }}>
        <div style={{ fontSize: 80 }}>🇸🇦</div>
      </div>

      {/* Price Cards */}
      <div
        style={{
          padding: "0 50px",
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {renderPriceBadge("Visit Visa", priceVisit)}
        {renderPriceBadge("Umrah Visa", priceUmrah)}
        {renderPriceBadge("1 Year Multiple", price1Year)}
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "30px 40px",
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            fontWeight: 500,
          }}
        >
          Contact: seyahatholidays@gmail.com | 860 655 0235
        </div>
      </div>
    </div>
  );

  const { navigateHome } = useNavigation();

  return (
    <Layout
      title="Saudi Visa Poster"
      onNavigateHome={navigateHome}
      actions={
        <Button
          radius="md"
          leftSection={<Download size={16} />}
          onClick={handleDownload}
          color="green"
          size="sm"
        >
          Download Image
        </Button>
      }
    >
      <SimpleGrid
        cols={{ base: 1, sm: 1, lg: 2 }}
        spacing={{ base: 0, sm: 0 }}
        verticalSpacing={{ base: 0, sm: 0 }}
        style={{ flex: 1, minHeight: 0, height: "100%" }}
      >
        {/* Input Form */}
        <Paper
          withBorder
          radius={0}
          style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <ScrollArea style={{ flex: 1, height: "100%" }}>
            <Stack p="md" gap="lg">
              <Paper withBorder p="md" radius="md" bg="gray.0">
                <Text size="sm" fw={700} c="green.7" mb="sm">
                  Saudi Arabia Visa Prices
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                  Edit the prices for each visa type. They will be overlaid on the poster.
                </Text>
                <Stack gap="md">
                  <NumberInput
                    label="Visit Visa Price (₹)"
                    value={priceVisit}
                    onChange={(val) => setPriceVisit(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{ label: { fontWeight: 600 } }}
                  />
                  <NumberInput
                    label="Umrah Visa Price (₹)"
                    value={priceUmrah}
                    onChange={(val) => setPriceUmrah(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{ label: { fontWeight: 600 } }}
                  />
                  <NumberInput
                    label="1 Year Multiple Visa Price (₹)"
                    value={price1Year}
                    onChange={(val) => setPrice1Year(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{ label: { fontWeight: 600 } }}
                  />
                </Stack>
              </Paper>
            </Stack>
          </ScrollArea>
        </Paper>

        {/* Preview */}
        <Paper
          withBorder
          radius={0}
          style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}
        >
          <AutoFitPosterPreview posterWidth={800} posterHeight={1000}>
            {renderPosterPreview()}
          </AutoFitPosterPreview>
        </Paper>
      </SimpleGrid>
    </Layout>
  );
};

export default SaudiVisaPoster;
