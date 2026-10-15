const express = require("express");
const _ = require("lodash");
const config = require("./config");

const app = express();

const orders = [
  { id: 1, customer: "Customer A", total: 42.5, status: "shipped" },
  { id: 2, customer: "Customer B", total: 18.0, status: "pending" },
  { id: 3, customer: "Customer C", total: 99.99, status: "delivered" },
  { id: 4, customer: "Customer D", total: 7.25, status: "pending" }
];

// List all orders without customer details
app.get("/orders", (req, res) => {
  res.json(orders.map((o) => _.pick(o, ["id", "total", "status"])));
});

// Get one order by id
app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Search orders by status
app.get("/search", (req, res) => {
  const q = req.query.q || "";
  const results = orders.filter((o) => o.status.includes(q));
  res.send(`<h1>Results for ${q}</h1><p>${results.length} orders found</p>`);
});

app.listen(config.port, () => {
  console.log(`Orders API running on port ${config.port} (${config.currency})`);
});
