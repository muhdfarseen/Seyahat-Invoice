import { useRef, useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Table,
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
  Accordion,
  ThemeIcon,
  ScrollArea,
  Input,
  Select,
} from "@mantine/core";
import { Plus, Trash2, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";

const InvoiceGenerator = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [currency,setCurrency]=useState("₹");

  const [invoiceData, setInvoiceData] = useState({
    addressLine1: "Near Bilal Masjid, Kattampally Road",
    addressLine2: "Puthiyatheru, Kannur",
    email: "seyahatholidays@gmail.com",
    phone: "965 655 0235 | 860 655 0235",
    invoiceTo: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    items: [{ id: 1, description: "", qty: 1, rate: 0 }],
    discount: 0,
    footer: `Thank you for choosing us for your travel needs!
We truly appreciate your business and look forward to helping you explore more destinations in the future.
Wishing you safe travels and unforgettable experiences!
#turning miles into memories`,
  });

  const random10Digit = Math.floor(1000000000 + Math.random() * 9000000000);

  const addItem = () => {
    const newId = Math.max(...invoiceData.items.map((item) => item.id)) + 1;
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { id: newId, description: "", qty: 1, rate: 0 }],
    }));
  };

  const removeItem = (id: any) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const updateItem = (id: any, field: any, value: any) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleItemNumberChange = (
    id: any,
    field: any,
    value: string | number
  ) => {
    // Handle empty string or null/undefined values
    if (value === "" || value === null || value === undefined) {
      updateItem(id, field, field === "qty" ? 1 : 0);
      return;
    }

    // Convert to number and validate
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    // Only update if it's a valid number
    if (!isNaN(numValue) && numValue >= 0) {
      updateItem(id, field, numValue);
    }
  };

  const updateField = (field: any, value: any) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => {
      const qty =
        typeof item.qty === "number" && !isNaN(item.qty) ? item.qty : 0;
      const rate =
        typeof item.rate === "number" && !isNaN(item.rate) ? item.rate : 0;
      return total + qty * rate;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountValue =
      typeof invoiceData.discount === "number" && !isNaN(invoiceData.discount)
        ? invoiceData.discount
        : 0;
    return Math.max(0, subtotal - discountValue);
  };

  const handleDiscountChange = (value: string | number) => {
    // Handle empty string or null/undefined values
    if (value === "" || value === null || value === undefined) {
      updateField("discount", 0);
      return;
    }

    // Convert to number and validate
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    // Only update if it's a valid number
    if (!isNaN(numValue) && numValue >= 0) {
      updateField("discount", numValue);
    }
  };

  const rows = invoiceData.items.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <TextInput
          value={item.description}
          onChange={(e) => updateItem(item.id, "description", e.target.value)}
          placeholder="Item description"
          variant="unstyled"
          size="sm"
        />
      </Table.Td>
      <Table.Td align="right">
        <NumberInput
          value={item.qty}
          onChange={(value) => handleItemNumberChange(item.id, "qty", value)}
          min={1}
          variant="unstyled"
          size="sm"
          allowNegative={false}
          clampBehavior="strict"
          allowLeadingZeros={false}
          maw={50}
        />
      </Table.Td>
      <Table.Td align="right">
        <NumberInput
          styles={{
            input: {
              textAlign: "right",
            },
          }}
          w={60}
          inputWrapperOrder={["input", "label", "description", "error"]}
          hideControls
          value={item.rate}
          onChange={(value) => handleItemNumberChange(item.id, "rate", value)}
          min={0}
          step={0.01}
          decimalScale={2}
          variant="unstyled"
          size="sm"
          allowNegative={false}
          clampBehavior="strict"
          allowLeadingZeros={false}
        />
      </Table.Td>
      <Table.Td align="right">
        <Text ta={"right"} size="sm" fw={"700"}>
          {(
            (typeof item.qty === "number" ? item.qty : 0) *
            (typeof item.rate === "number" ? item.rate : 0)
          ).toFixed(2)}
        </Text>
      </Table.Td>
      <Table.Td align="center">
        {invoiceData.items.length > 1 && (
          <ActionIcon
            color="red"
            variant="light"
            size="sm"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={14} />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  const previewRows = invoiceData.items.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td style={{ fontWeight: 500 }}>{item.description}</Table.Td>
      <Table.Td style={{ textAlign: "center" }}>
        {(typeof item.qty === "number" ? item.qty : 0).toFixed(2)}
      </Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        {(typeof item.rate === "number" ? item.rate : 0).toFixed(2)}
      </Table.Td>
      <Table.Td style={{ textAlign: "right", fontWeight: 500 }}>
        ₹
        {(
          (typeof item.qty === "number" ? item.qty : 0) *
          (typeof item.rate === "number" ? item.rate : 0)
        ).toFixed(2)}
      </Table.Td>
    </Table.Tr>
  ));

  const discountValue =
    typeof invoiceData.discount === "number" && !isNaN(invoiceData.discount)
      ? invoiceData.discount
      : 0;

  return (
    <Flex direction={"column"} h="100vh" bg="gray.0">
      {/* Header Section */}
      <Paper style={{position:"sticky",top:0,zIndex:9000}} shadow="md" p="lg" radius={0}>
        <Group justify="space-between" align="center">
          <Image src={"/Seyahat.png"} alt="Logo" w={"100"} />
          <Title order={5} c="gray.9">
            Invoice Generator
          </Title>
          <Button
            radius={"md"}
            leftSection={<Download size={16} />}
            onClick={reactToPrintFn}
            color="green"
            size="sm"
          >
            Download PDF
          </Button>
        </Group>
      </Paper>

      <SimpleGrid
        cols={{ base: 1, sm: 1, lg: 2 }}
        spacing={{ base: 0, sm: 0 }}
        verticalSpacing={{ base: 0, sm: 0 }}
      >
        {/* Input Form - Left Section */}

        <Paper withBorder radius={0}>
          <Accordion defaultValue={"inv"} radius="md">
            <Accordion.Item value={"cmny"}>
              <Accordion.Control>
                <Text size="sm" fw={700} c="gray.9">
                  Company Information
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={{ base: 1, sm: 2, lg: 2 }}
                  spacing={{ base: 10, sm: "md" }}
                  verticalSpacing={{ base: "md", sm: "md" }}
                >
                  <TextInput
                    label="Address Line 1"
                    value={invoiceData.addressLine1}
                    onChange={(e) =>
                      updateField("addressLine1", e.target.value)
                    }
                  />
                  <TextInput
                    label="Address Line 2"
                    value={invoiceData.addressLine2}
                    onChange={(e) =>
                      updateField("addressLine2", e.target.value)
                    }
                  />
                  <TextInput
                    label="Email Id"
                    value={invoiceData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  <TextInput
                    label="Phone Numbers"
                    value={invoiceData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"inv"}>
              <Accordion.Control>
                <Text size="sm" fw={700} c="gray.9">
                  Invoice Information
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Box>
                  <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "md" }}
                    verticalSpacing={{ base: "md", sm: "md" }}
                  >
                    <TextInput
                      label="Invoice To"
                      placeholder="Customer name"
                      value={invoiceData.invoiceTo}
                      onChange={(e) => updateField("invoiceTo", e.target.value)}
                    />
                    <TextInput
                      label="Invoice Date"
                      type="date"
                      value={invoiceData.invoiceDate}
                      onChange={(e) =>
                        updateField("invoiceDate", e.target.value)
                      }
                    />
                  </SimpleGrid>
                </Box>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"itm"}>
              <Accordion.Control>
                <Text size="sm" fw={700} c="gray.9">
                  Invoice Items
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Box>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th ta={"center"}>Qty</Table.Th>
                        <Table.Th ta={"right"}>Rate</Table.Th>
                        <Table.Th ta={"right"}>Amount</Table.Th>
                        <Table.Th ta={"center"}>
                          <ThemeIcon color="red" variant="default" size="sm">
                            <Trash2 size={14} />
                          </ThemeIcon>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>

                  <Group my={"lg"} justify="end">
                    <Button
                      radius={"md"}
                      variant="light"
                      leftSection={<Plus size={16} />}
                      onClick={addItem}
                      size="sm"
                    >
                      Add Item
                    </Button>
                  </Group>
                </Box>

                {/* Discount Section */}
                <Flex gap={'md'} align={"center"} justify={"end"}>

                  <Select label={"Choose Currency"} value={currency} data={["₹","AED","QAR"]} onChange={(d:any)=>setCurrency(d)}   />                
                  
                  <NumberInput
                    styles={{
                      input: {
                        textAlign: "right",
                      },
                    }}
                    hideControls
                    label="Total Discount"
                    value={discountValue}
                    onChange={handleDiscountChange}
                    min={0}
                    step={0.01}
                    decimalScale={2}
                    allowNegative={false}
                    clampBehavior="strict"
                    allowLeadingZeros={false}
                  />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"ftr"}>
              <Accordion.Control>
                <Text size="sm" fw={700} c="gray.9">
                  Invoice Footer
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Textarea
                  value={invoiceData.footer}
                  onChange={(e) => updateField("footer", e.target.value)}
                  rows={8}
                  resize="vertical"
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Paper>

        {/* Preview - Right Section */}

        <Paper withBorder radius={0}>
          <ScrollArea h={"calc(100vh - 78px)"}>
          <Paper ref={contentRef} p="xl" maw="800px" mx="auto">
            {/* Header */}
            <Group justify="space-between" mb="xl">
              <Group gap="md">
                <Image src={"/Seyahat.png"} alt="Logo" w={200} />
              </Group>
              <Box>
                <Title order={2} c="gray.9">
                  INVOICE
                </Title>
                <Title order={6} c="gray.9">
                  #{random10Digit}
                </Title>
              </Box>
            </Group>

            {/* Company Address */}
            <Box mb="xl">
              <Text size="sm" c="gray.7">
                {invoiceData.addressLine1}
              </Text>
              <Text size="sm" c="gray.7">
                {invoiceData.addressLine2}
              </Text>
              <Text mt={10} size="sm" c="gray.7">
                {invoiceData.email}
              </Text>
              <Text size="sm" c="gray.9" fw={700}>
                {invoiceData.phone}
              </Text>
            </Box>

            {/* Customer and Invoice Details */}
            <Group justify="space-between" mb="xl">
              <Box>
                <Text size="lg" fw={700} c="gray.9">
                  {invoiceData.invoiceTo}
                </Text>
              </Box>
              <Box style={{ textAlign: "right" }}>
                <Text size="sm" c="gray.9">
                  Invoice Date :{" "}
                  <Text component="span" ml="sm">
                    {invoiceData.invoiceDate}
                  </Text>
                </Text>
              </Box>
            </Group>

            {/* Items Table */}
            <Table mb="xl">
              <Table.Thead bg="gray.9">
                <Table.Tr>
                  <Table.Th style={{ color: "white", padding: "12px" }}>
                    #
                  </Table.Th>
                  <Table.Th style={{ color: "white", padding: "12px" }}>
                    Description
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "white",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    Qty
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "white",
                      padding: "12px",
                      textAlign: "right",
                    }}
                  >
                    Rate
                  </Table.Th>
                  <Table.Th
                    style={{
                      color: "white",
                      padding: "12px",
                      textAlign: "right",
                    }}
                  >
                    Amount
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{previewRows}</Table.Tbody>
            </Table>

            {/* Total Section */}
            <Flex justify="flex-end" mb="xl">
              <Box w={256}>
                <Group
                  justify="space-between"
                  py="xs"
                  style={{ borderBottom: "1px solid #e9ecef" }}
                >
                  <Text size="sm" fw={500}>
                    Sub Total
                  </Text>
                  <Text size="sm" fw={500}>
                    ₹{calculateSubtotal().toFixed(2)}
                  </Text>
                </Group>
                {discountValue > 0 && (
                  <Group
                    justify="space-between"
                    py="xs"
                    style={{ borderBottom: "1px solid #e9ecef" }}
                  >
                    <Text size="sm" fw={500} c="red.6">
                      Discount
                    </Text>
                    <Text size="sm" fw={500} c="red.6">
                      -₹{discountValue.toFixed(2)}
                    </Text>
                  </Group>
                )}
                <Group
                  justify="space-between"
                  py="md"
                  style={{ borderBottom: "2px solid #212529" }}
                >
                  <Text fw={700}>Total</Text>
                  <Text fw={700}>{currency}  {calculateTotal().toFixed(2)}</Text>
                </Group>
              </Box>
            </Flex>

            {/* Footer */}
            <Box mt="300">
              <Stack gap={5}>
                {invoiceData.footer.split("\n").map((line, index) => (
                  <Text
                    key={index}
                    size="sm"
                    c={line.startsWith("#") ? "blue.5" : "gray.7"}
                    fw={line.startsWith("#") ? 500 : 400}
                  >
                    {line}
                  </Text>
                ))}
              </Stack>
            </Box>
          </Paper>
          </ScrollArea>
        </Paper>
      </SimpleGrid>
    </Flex>
  );
};

export default InvoiceGenerator;
