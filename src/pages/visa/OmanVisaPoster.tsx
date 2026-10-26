import { useRef, useState } from "react";
import { Button, Paper, SimpleGrid, ScrollArea } from "@mantine/core";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import Layout from "../../components/Layout";
import { useNavigation } from "../../NavigationContext";
import { AutoFitPosterPreview } from "../../components/AutoFitPosterPreview";
import { VisaPriceBadge, type VisaPriceItem } from "../../components/VisaPriceBadge";
import { VisaEditorForm } from "../../components/VisaEditorForm";

const OmanVisaPoster = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const [prices, setPrices] = useState<VisaPriceItem[]>([
    { id: "1", price: 9999, label: "Label Here" },
    { id: "2", price: 9999, label: "Label Here" },
    { id: "3", price: 9999, label: "Label Here" },
  ]);
  const [showB2B, setShowB2B] = useState<boolean>(false);

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "oman-visa-poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  const renderPosterPreview = () => (
    <div
      ref={posterRef}
      style={{
        width: 1080,
        height: 1350,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Background Template Image */}
      <img
        src="/omanvisa.png"
        alt="Oman Visa"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Horizontal Row of Price Badges */}
      <div
        style={{
          position: "absolute",
          top: 1030,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 24,
          zIndex: 5,
        }}
      >
        {prices.map((item) => (
          <VisaPriceBadge
            key={item.id}
            price={item.price}
            label={item.label}
          />
        ))}
      </div>

      {/* Optional B2B Sticker */}
      {showB2B && (
        <img
          src="/b2b.png"
          alt="B2B Rate Available"
          style={{
            position: "absolute",
            top: 45,
            right: 45,
            width: 220,
            zIndex: 6,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );

  const { navigateHome } = useNavigation();

  return (
    <Layout
      title="Oman Visa Poster"
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
        {/* Editor Form */}
        <Paper
          withBorder
          radius={0}
          style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <ScrollArea style={{ flex: 1, height: "100%" }}>
            <VisaEditorForm
              title="Oman Visa Rates"
              prices={prices}
              onPricesChange={setPrices}
              showB2B={showB2B}
              onShowB2BChange={setShowB2B}
            />
          </ScrollArea>
        </Paper>

        {/* Poster Preview */}
        <Paper
          withBorder
          radius={0}
          style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}
        >
          <AutoFitPosterPreview posterWidth={1080} posterHeight={1350}>
            {renderPosterPreview()}
          </AutoFitPosterPreview>
        </Paper>
      </SimpleGrid>
    </Layout>
  );
};

export default OmanVisaPoster;
