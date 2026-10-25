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

const BahrainVisaPoster = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const [price14Days, setPrice14Days] = useState<number | string>(14500);
  const [price90Multiple, setPrice90Multiple] = useState<number | string>(14500);
  const [price1Year, setPrice1Year] = useState<number | string>(14500);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "bahrain-visa-poster.png";
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
        gap: 4,
        flex: 1,
      }}
    >
      {/* Visa type label */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#2d2d2d",
          fontFamily: "'Poppins', 'Inter', sans-serif",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>

      {/* Price badge */}
      <div
        style={{
          background: "linear-gradient(180deg, #E84E1B 0%, #C73A0E 100%)",
          borderRadius: 10,
          padding: "8px 20px",
          minWidth: 140,
          textAlign: "center",
          boxShadow: "0 3px 8px rgba(232, 78, 27, 0.35)",
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
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* Base Image */}
      <img
        src="/bahrain.png"
        alt="Bahrain Visa Poster"
        style={{
          width: "100%",
          display: "block",
        }}
      />

      {/* Price Overlay — positioned at the blank area below "Bahrain Visa" text */}
      <div
        style={{
          position: "absolute",
          bottom: "13.5%",
          left: "5%",
          right: "5%",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          padding: "0 130px",
        }}
      >
        {renderPriceBadge("14 Days", price14Days)}
        {renderPriceBadge("90 Multiple", price90Multiple)}
        {renderPriceBadge("1 Year Multiple", price1Year)}
      </div>
    </div>
  );

  const { navigateHome } = useNavigation();

  return (
    <Layout
      title="Bahrain Visa Poster"
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
              {/* Price Editor */}
              <Paper withBorder p="md" radius="md" bg="gray.0">
                <Text size="sm" fw={700} c="green.7" mb="sm">
                  Bahrain Visa Prices
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                  Edit the prices for each visa type. They will be overlaid on
                  the poster.
                </Text>

                <Stack gap="md">
                  <NumberInput
                    label="14 Days Visa Price (₹)"
                    value={price14Days}
                    onChange={(val) => setPrice14Days(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{
                      label: { fontWeight: 600 },
                    }}
                  />

                  <NumberInput
                    label="90 Multiple Visa Price (₹)"
                    value={price90Multiple}
                    onChange={(val) => setPrice90Multiple(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{
                      label: { fontWeight: 600 },
                    }}
                  />

                  <NumberInput
                    label="1 Year Multiple Visa Price (₹)"
                    value={price1Year}
                    onChange={(val) => setPrice1Year(val)}
                    min={0}
                    hideControls
                    thousandSeparator=","
                    size="md"
                    styles={{
                      label: { fontWeight: 600 },
                    }}
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

export default BahrainVisaPoster;
