import { useRef, useState } from "react";
import {
  Button,
  TextInput,
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
  FileInput,
  Select,
} from "@mantine/core";
import { Plus, Trash2, Download, ArrowLeft, Upload } from "lucide-react";
import { IconLuggage } from "@tabler/icons-react";
import { toPng } from "html-to-image";

interface FlightDate {
  day: string;
  month: string;
}

interface FlightCard {
  id: number;
  from: string;
  to: string;
  connectingDetails: string[];
  luggage: string;
  dates: FlightDate[];
  logoFile: File | null;
  logoUrl: string;
  logoType: string;
  price: number | string;
  priceLabel: string;
}

const LOGO_OPTIONS = [
  { value: "airarabia.svg", label: "Air Arabia" },
  { value: "airindia.svg", label: "Air India Express" },
  { value: "fludubai.svg", label: "Fly Dubai" },
  { value: "flynas.svg", label: "Flynas" },
  { value: "indigo.svg", label: "Indigo" },
  { value: "saudia.svg", label: "Saudia" },
  { value: "spacejet.svg", label: "SpiceJet" },
  { value: "other", label: "Other (Upload)" },
];

const HEADER_BANNER_OPTIONS = [
  { value: "/headerbanner/banner1.svg", label: "Banner 1" },
  { value: "/headerbanner/banner2.svg", label: "Banner 2" },
  { value: "/headerbanner/banner3.svg", label: "Banner 3" },
  { value: "/headerbanner/banner4.svg", label: "Banner 4" },
  { value: "/headerbanner/banner5.svg", label: "Banner 5" },
];

const createEmptyCard = (id: number): FlightCard => ({
  id,
  from: "Calicut",
  to: "Sharjah",
  connectingDetails: ["MCT 08:30 -> FJR 09:25", "MCT 08:30 -> FJR 09:25"],
  luggage: "30 + 7 KG",
  dates: [
    { day: "13", month: "MAR" },
    { day: "15", month: "MAR" },
  ],
  logoFile: null,
  logoUrl: "/airlinelogos/airindia.svg",
  logoType: "airindia.svg",
  price: 12000,
  priceLabel: "One Way for Traveler",
});

interface PosterGeneratorProps {
  onNavigateInvoice: () => void;
}

const PosterGenerator = ({ onNavigateInvoice }: PosterGeneratorProps) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<FlightCard[]>([createEmptyCard(1)]);
  const [headerBanner, setHeaderBanner] = useState<string>("/headerbanner/banner1.svg");

  const addCard = () => {
    const newId = Math.max(...cards.map((c) => c.id)) + 1;
    setCards((prev) => [...prev, createEmptyCard(newId)]);
  };

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const updateCard = (id: number, field: keyof FlightCard, value: any) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addConnecting = (cardId: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, connectingDetails: [...c.connectingDetails, ""] }
          : c
      )
    );
  };

  const removeConnecting = (cardId: number, index: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              connectingDetails: c.connectingDetails.filter(
                (_, i) => i !== index
              ),
            }
          : c
      )
    );
  };

  const updateConnecting = (
    cardId: number,
    index: number,
    value: string
  ) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              connectingDetails: c.connectingDetails.map((d, i) =>
                i === index ? value : d
              ),
            }
          : c
      )
    );
  };

  const addDate = (cardId: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, dates: [...c.dates, { day: "", month: "" }] }
          : c
      )
    );
  };

  const removeDate = (cardId: number, dateIndex: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, dates: c.dates.filter((_, i) => i !== dateIndex) }
          : c
      )
    );
  };

  const updateDate = (
    cardId: number,
    dateIndex: number,
    field: keyof FlightDate,
    value: string
  ) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              dates: c.dates.map((d, i) =>
                i === dateIndex ? { ...d, [field]: value } : d
              ),
            }
          : c
      )
    );
  };

  const handleLogoUpload = (cardId: number, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, logoFile: file, logoUrl: url } : c
        )
      );
    }
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        quality: 1,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "seyahat-poster.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  // ─── Poster Preview ─────────────────────────────────────

  const renderPosterPreview = () => (
    <div
      ref={posterRef}
      style={{
        width: 800,
        background: "#f5f5f5",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Header — actual image */}
      <div style={{ position: "relative" }}>
        <img
          src={headerBanner}
          alt="Header"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginTop: -130,
          background: "#f5f5f5",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{ 
              background: "#ffffff",
              borderRadius: 30,
              border: "1.5px solid #e2e2e2",
              padding: "22px 24px",
              
          zIndex: 1000,
              display: "flex",
              gap: 16,
              
            }}
          >
            {/* Left Side */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Route Line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#1a1a1a",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.from}
                </span>
                <img
                  src="/fromtodesign.svg"
                  alt="route"
                  style={{
                    width: 140,
                    height: 36,
                    objectFit: "contain",
                  }}
                />
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#1a1a1a",
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.to}
                </span>
              </div>

              {/* Connecting Details — Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                {card.connectingDetails.filter((detail) => detail.trim() !== "").map((detail, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      background: "#F5F5F5",
                      color: "#414651",
                      fontSize: 14,
                      fontWeight: 500,
                      padding: "6px 16px",
                      borderRadius: 999,
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Luggage Badge */}
              {card.luggage && card.luggage.trim() !== "" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#EFF8FF",
                    color: "#017746",
                    padding: "5px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: 14,
                  }}
                >
                  <IconLuggage size={18} stroke={2.2} /> {card.luggage}
                </div>
              )}

              {/* Date Badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {card.dates.filter((d) => d.day.trim() !== "" || d.month.trim() !== "").map((d, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      borderRadius: 15,
                      padding: "10px 14px 8px",
                      minWidth: 56,
                      background: "#F5F5F5",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 900,
                        color: "#414651",
                        lineHeight: 1,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {d.day}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#414651",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: 0.5,
                        marginTop: 2,
                      }}
                    >
                      {d.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div
              style={{
                width: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              {card.logoUrl ? (
                <div
                  style={{
                    width: 170,
                    height: 80,
                    background: "#FAFAFA",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                  }}
                >
                  <img
                    src={card.logoUrl}
                    alt="Airline Logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: 170,
                    height: 80,
                    border: "2px dashed #ccc",
                    borderRadius: 20,
                    background: "#FAFAFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#bbb",
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Airline Logo
                </div>
              )}
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: "#1a8a3f",
                    lineHeight: 1.1,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {card.price !== "" && card.price !== null && card.price !== undefined ? `₹${card.price}` : ""}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#999",
                    fontFamily: "'Inter', sans-serif",
                    marginTop: 2,
                  }}
                >
                  {card.priceLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer — actual image */}
      <div style={{ padding: "0 28px 24px", background: "#f5f5f5" }}>
        <img
          src="/footerPoster.svg"
          alt="Footer"
          style={{ width: "100%", display: "block", borderRadius: 14 }}
        />
      </div>
    </div>
  );

  // ─── Form Render ────────────────────────────────────────

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
              onClick={onNavigateInvoice}
            >
              <ArrowLeft size={20} />
            </ActionIcon>
            <Image src="/Seyahat.png" alt="Logo" w={100} />
          </Group>
          <Title order={5} c="gray.9">
            Poster Generator
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
              {/* Poster Settings */}
              <Paper withBorder p="md" radius="md" bg="gray.0">
                <Text size="sm" fw={700} c="green.7" mb="sm">
                  Poster Settings
                </Text>
                <Select
                  label="Header Banner"
                  data={HEADER_BANNER_OPTIONS}
                  value={headerBanner}
                  onChange={(val) => setHeaderBanner(val || "/headerbanner/banner1.svg")}
                />
              </Paper>

              {/* Flight Cards */}
              {cards.map((card, cardIndex) => (
                <Paper key={card.id} withBorder p="md" radius="md" bg="gray.0">
                  <Group justify="space-between" mb="sm">
                    <Text size="sm" fw={700} c="green.7">
                      Flight Card #{cardIndex + 1}
                    </Text>
                    {cards.length > 1 && (
                      <ActionIcon
                        color="red"
                        variant="light"
                        size="sm"
                        onClick={() => removeCard(card.id)}
                      >
                        <Trash2 size={14} />
                      </ActionIcon>
                    )}
                  </Group>

                  <SimpleGrid cols={2} spacing="sm" mb="sm">
                    <TextInput
                      label="From"
                      value={card.from}
                      onChange={(e) =>
                        updateCard(card.id, "from", e.target.value)
                      }
                    />
                    <TextInput
                      label="To"
                      value={card.to}
                      onChange={(e) =>
                        updateCard(card.id, "to", e.target.value)
                      }
                    />
                  </SimpleGrid>

                  {/* Connecting Details — Dynamic */}
                  <Text size="sm" fw={600} mb={4}>
                    Connecting Details
                  </Text>
                  <Stack gap="xs" mb="sm">
                    {card.connectingDetails.map((detail, di) => (
                      <Group key={di} gap="xs">
                        <TextInput
                          placeholder="e.g. MCT 08:30→ FJR 09:25"
                          value={detail}
                          onChange={(e) =>
                            updateConnecting(card.id, di, e.target.value)
                          }
                          style={{ flex: 1 }}
                          size="xs"
                        />
                        {card.connectingDetails.length > 1 && (
                          <ActionIcon
                            color="red"
                            variant="light"
                            size="xs"
                            onClick={() => removeConnecting(card.id, di)}
                          >
                            <Trash2 size={12} />
                          </ActionIcon>
                        )}
                      </Group>
                    ))}
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<Plus size={12} />}
                      onClick={() => addConnecting(card.id)}
                      w="fit-content"
                    >
                      Add Connecting
                    </Button>
                  </Stack>

                  <SimpleGrid cols={2} spacing="sm" mb="sm">
                    <TextInput
                      label="Luggage"
                      value={card.luggage}
                      onChange={(e) =>
                        updateCard(card.id, "luggage", e.target.value)
                      }
                    />
                    <NumberInput
                      label="Price (₹)"
                      value={card.price}
                      onChange={(val) => updateCard(card.id, "price", val)}
                      min={0}
                      hideControls
                    />
                  </SimpleGrid>

                  <TextInput
                    label="Price Label"
                    value={card.priceLabel}
                    onChange={(e) =>
                      updateCard(card.id, "priceLabel", e.target.value)
                    }
                    mb="sm"
                  />

                  <Select
                    label="Airline Logo"
                    data={LOGO_OPTIONS}
                    value={card.logoType}
                    onChange={(val) => {
                      updateCard(card.id, "logoType", val);
                      if (val && val !== "other") {
                        updateCard(card.id, "logoUrl", `/airlinelogos/${val}`);
                        updateCard(card.id, "logoFile", null);
                      } else if (val === "other") {
                        updateCard(
                          card.id,
                          "logoUrl",
                          card.logoFile ? URL.createObjectURL(card.logoFile) : ""
                        );
                      }
                    }}
                    mb="sm"
                  />

                  {card.logoType === "other" && (
                    <FileInput
                      label="Upload Custom Logo"
                      placeholder="Upload airline logo"
                      accept="image/*"
                      leftSection={<Upload size={14} />}
                      onChange={(file) => handleLogoUpload(card.id, file)}
                      mb="sm"
                    />
                  )}

                  {/* Dates */}
                  <Text size="sm" fw={600} mb={4}>
                    Travel Dates
                  </Text>
                  <Stack gap="xs">
                    {card.dates.map((d, di) => (
                      <Group key={di} gap="xs">
                        <TextInput
                          placeholder="Day"
                          value={d.day}
                          onChange={(e) =>
                            updateDate(card.id, di, "day", e.target.value)
                          }
                          w={70}
                          size="xs"
                        />
                        <TextInput
                          placeholder="Month"
                          value={d.month}
                          onChange={(e) =>
                            updateDate(card.id, di, "month", e.target.value)
                          }
                          w={70}
                          size="xs"
                        />
                        {card.dates.length > 1 && (
                          <ActionIcon
                            color="red"
                            variant="light"
                            size="xs"
                            onClick={() => removeDate(card.id, di)}
                          >
                            <Trash2 size={12} />
                          </ActionIcon>
                        )}
                      </Group>
                    ))}
                    <Button
                      variant="light"
                      size="xs"
                      leftSection={<Plus size={12} />}
                      onClick={() => addDate(card.id)}
                      w="fit-content"
                    >
                      Add Date
                    </Button>
                  </Stack>
                </Paper>
              ))}

              <Button
                variant="light"
                color="green"
                leftSection={<Plus size={16} />}
                onClick={addCard}
                radius="md"
              >
                Add Flight Card
              </Button>
            </Stack>
          </ScrollArea>
        </Paper>

        {/* Preview */}
        <Paper withBorder radius={0}>
          <ScrollArea h="calc(100vh - 78px)">
            <Box p="md" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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

export default PosterGenerator;
