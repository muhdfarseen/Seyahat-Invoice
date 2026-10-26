import {
  Stack,
  Paper,
  Text,
  Group,
  ActionIcon,
  NumberInput,
  TextInput,
  Button,
  Switch,
} from "@mantine/core";
import { Plus, Trash2 } from "lucide-react";
import type { VisaPriceItem } from "./VisaPriceBadge";

interface VisaEditorFormProps {
  title: string;
  prices: VisaPriceItem[];
  onPricesChange: (prices: VisaPriceItem[]) => void;
  showB2B: boolean;
  onShowB2BChange: (val: boolean) => void;
}

export const VisaEditorForm = ({
  title,
  prices,
  onPricesChange,
  showB2B,
  onShowB2BChange,
}: VisaEditorFormProps) => {
  const handleUpdatePrice = (
    index: number,
    field: "price" | "label",
    value: string | number
  ) => {
    const updated = [...prices];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onPricesChange(updated);
  };

  const handleAddPrice = () => {
    if (prices.length >= 3) return;
    const newId = String(Date.now());
    onPricesChange([...prices, { id: newId, price: 9999, label: "Label Here" }]);
  };

  const handleRemovePrice = (index: number) => {
    if (prices.length <= 1) return;
    const updated = prices.filter((_, i) => i !== index);
    onPricesChange(updated);
  };

  return (
    <Stack p="md" gap="lg">
      {/* Poster Settings / Prices */}
      <Paper withBorder p="md" radius="md" bg="gray.0">
        <Group justify="space-between" mb="sm">
          <Text size="sm" fw={700} c="green.7">
            {title}
          </Text>
          <Text size="xs" c="dimmed">
            {prices.length} / 3 Prices
          </Text>
        </Group>

        <Stack gap="md">
          {prices.map((item, index) => (
            <Paper key={item.id} withBorder p="sm" radius="md" bg="white">
              <Group justify="space-between" mb="xs">
                <Text size="xs" fw={700} c="gray.7">
                  Price #{index + 1}
                </Text>
                {prices.length > 1 && (
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    size="sm"
                    onClick={() => handleRemovePrice(index)}
                    title="Remove price"
                  >
                    <Trash2 size={14} />
                  </ActionIcon>
                )}
              </Group>

              <Stack gap="xs">
                <NumberInput
                  label="Rate (₹)"
                  value={item.price}
                  onChange={(val) => handleUpdatePrice(index, "price", val)}
                  min={0}
                  thousandSeparator=","
                  prefix="₹"
                  styles={{ label: { fontSize: 12, fontWeight: 600 } }}
                />

                <TextInput
                  label="Label"
                  description="Leave empty to show price only"
                  placeholder="e.g. 14 Days / Label Here"
                  value={item.label}
                  onChange={(e) =>
                    handleUpdatePrice(index, "label", e.target.value)
                  }
                  styles={{
                    label: { fontSize: 12, fontWeight: 600 },
                    description: { fontSize: 11, marginBottom: 4 },
                  }}
                />
              </Stack>
            </Paper>
          ))}

          {prices.length < 3 && (
            <Button
              variant="light"
              color="green"
              leftSection={<Plus size={16} />}
              onClick={handleAddPrice}
              size="sm"
              fullWidth
            >
              Add Price ({prices.length}/3)
            </Button>
          )}
        </Stack>
      </Paper>

      {/* B2B Sticker Toggle */}
      <Paper withBorder p="md" radius="md" bg="gray.0">
        <Group justify="space-between" align="center">
          <div>
            <Text size="sm" fw={600} c="gray.9">
              B2B Rate Sticker
            </Text>
            <Text size="xs" c="dimmed">
              Show "B2B Rate Available" badge on poster
            </Text>
          </div>
          <Switch
            checked={showB2B}
            onChange={(e) => onShowB2BChange(e.currentTarget.checked)}
            color="orange"
            size="md"
          />
        </Group>
      </Paper>
    </Stack>
  );
};
