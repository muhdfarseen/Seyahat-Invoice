import { useRef, useState } from "react";
import {
  Button,
  NumberInput,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  ActionIcon,
  Box,
  Flex,
  SimpleGrid,
  Image,
  ScrollArea,
} from "@mantine/core";
import { Download, ArrowLeft } from "lucide-react";
import { toPng } from "html-to-image";

interface BahrainPosterEditorProps {
  onNavigateBack: () => void;
}

const BahrainPosterEditor = ({ onNavigateBack }: BahrainPosterEditorProps) => {
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

  return (
    <Flex direction="column" h="100vh" bg="gray.0">
      {/* Header */}
      <Paper
        style={{ position: "sticky", top: 0, zIndex: 9000 }}
        shadow="md"
        p="lg"
        radius={0}
      >
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={onNavigateBack}
            >
              <ArrowLeft size={20} />
            </ActionIcon>
            <Image src="/Seyahat.png" alt="Logo" w={100} />
          </Group>
          <Title order={5} c="gray.9">
            Bahrain Visa Poster
          </Title>
          <Button
            radius="md"
            leftSection={<Download size={16} />}
            onClick={handleDownload}
            color="green"
            size="sm"
          >
            Download Image
          </Button>
        </Group>
      </Paper>

      <SimpleGrid
        cols={{ base: 1, sm: 1, lg: 2 }}
        spacing={{ base: 0, sm: 0 }}
        verticalSpacing={{ base: 0, sm: 0 }}
      >
        {/* Input Form */}
        <Paper withBorder radius={0}>
          <ScrollArea h="calc(100vh - 78px)">
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

              {/* Instructions */}
              <Paper withBorder p="md" radius="md" bg="green.0">
                <Text size="sm" fw={600} c="green.8" mb={4}>
                  How to use
                </Text>
                <Text size="xs" c="green.7" style={{ lineHeight: 1.6 }}>
                  1. Enter the prices for each visa type above
                  <br />
                  2. Preview updates live on the right
                  <br />
                  3. Click "Download Image" to save the poster
                </Text>
              </Paper>
            </Stack>
          </ScrollArea>
        </Paper>

        {/* Preview */}
        <Paper withBorder radius={0}>
          <ScrollArea h="calc(100vh - 78px)">
            <Box
              p="md"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text size="xs" c="dimmed" mb="sm" ta="center">
                Live Preview
              </Text>
              <Box
                style={{
                  transform: "scale(0.72)",
                  transformOrigin: "top center",
                }}
              >
                {renderPosterPreview()}
              </Box>
            </Box>
          </ScrollArea>
        </Paper>
      </SimpleGrid>
    </Flex>
  );
};

export default BahrainPosterEditor;
