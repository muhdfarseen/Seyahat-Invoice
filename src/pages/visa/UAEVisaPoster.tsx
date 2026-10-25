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

const UAEVisaPoster = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const [price14Days, setPrice14Days] = useState<number | string>(5500);
  const [price30Days, setPrice30Days] = useState<number | string>(8500);
  const [price90Days, setPrice90Days] = useState<number | string>(15500);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "uae-visa-poster.png";
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
          background: "linear-gradient(180deg, #c9a84c 0%, #a88a35 100%)",
          borderRadius: 10,
          padding: "8px 20px",
          minWidth: 140,
          textAlign: "center",
          boxShadow: "0 3px 8px rgba(201,168,76,0.35)",
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
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
      }}
    >
      {/* Decorative accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "linear-gradient(90deg, #009639, #ffffff, #000000, #ff0000)",
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
            fontSize: 52,
            fontWeight: 900,
            color: "#c9a84c",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          UAE Visa
        </div>
        <div
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            marginTop: 12,
            fontWeight: 500,
          }}
        >
          Dubai • Abu Dhabi • Sharjah
        </div>
      </div>

      {/* Flag Area */}
      <div style={{ textAlign: "center", padding: "20px 0 30px" }}>
        <div style={{ fontSize: 80 }}>🇦🇪</div>
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
        {renderPriceBadge("14 Days Tourist", price14Days)}
        {renderPriceBadge("30 Days Tourist", price30Days)}
        {renderPriceBadge("90 Days Multiple", price90Days)}
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
      title="UAE Visa Poster"
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
                <Text size="sm" fw={700} c="blue.7" mb="sm">
                  UAE Visa Prices
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                  Edit the prices for each visa type. They will be overlaid on the poster.
                </Text>
                <Stack gap="md">
                  <NumberInput
                    label="14 Days Tourist Visa Price (₹)"
                    value={price14Days}
                    onChange={(val) => setPrice14Days(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{ label: { fontWeight: 600 } }}
                  />
                  <NumberInput
                    label="30 Days Tourist Visa Price (₹)"
                    value={price30Days}
                    onChange={(val) => setPrice30Days(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{ label: { fontWeight: 600 } }}
                  />
                  <NumberInput
                    label="90 Days Multiple Visa Price (₹)"
                    value={price90Days}
                    onChange={(val) => setPrice90Days(val)}
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

export default UAEVisaPoster;
