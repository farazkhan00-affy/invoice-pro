import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  brand: { fontSize: 18, fontWeight: 700 },
  status: { fontSize: 11, padding: "4 10", borderRadius: 12, backgroundColor: "#e0f2fe" },
  section: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1 solid #e2e8f0" },
  label: { color: "#64748b", fontSize: 9, marginBottom: 4 },
  bold: { fontWeight: 700 },
  table: { marginTop: 10 },
  tableRow: { flexDirection: "row", borderBottom: "1 solid #e2e8f0", paddingVertical: 8 },
  tableHeader: { flexDirection: "row", borderBottom: "1 solid #333", paddingBottom: 6, marginBottom: 4 },
  col1: { width: "40%" },
  col2: { width: "20%", textAlign: "right" },
  col3: { width: "20%", textAlign: "right" },
  col4: { width: "20%", textAlign: "right" },
  totals: { marginTop: 20, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 200, justifyContent: "space-between", marginBottom: 4 },
  grandTotal: { flexDirection: "row", width: 200, justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1 solid #333", fontWeight: 700, fontSize: 13 },
});

interface InvoicePdfProps {
  number: string;
  status: string;
  createdAt: string;
  dueDate: string;
  taxRate: number;
  client: { name: string; email: string; address: string | null };
  items: { description: string; qty: number; rate: number }[];
}

export function InvoicePdf({ number, status, createdAt, dueDate, taxRate, client, items }: InvoicePdfProps) {
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>InvoicePro</Text>
          <Text style={styles.status}>{status}</Text>
        </View>

        <View style={styles.section}>
          <View>
            <Text style={styles.label}>BILLED TO</Text>
            <Text style={styles.bold}>{client.name}</Text>
            <Text>{client.email}</Text>
            {client.address && <Text>{client.address}</Text>}
          </View>
          <View>
            <Text style={styles.label}>INVOICE #{number}</Text>
            <Text>Issued: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text>Due: {new Date(dueDate).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Description</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Rate</Text>
            <Text style={styles.col4}>Amount</Text>
          </View>
          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>{item.qty}</Text>
              <Text style={styles.col3}>${item.rate.toFixed(2)}</Text>
              <Text style={styles.col4}>${(item.qty * item.rate).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax ({taxRate}%)</Text>
            <Text>${taxAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>Total</Text>
            <Text>${total.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}