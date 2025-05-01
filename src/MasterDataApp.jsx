// MasterDataApp.jsx
import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");

const companyList = ["Company A", "Company B"];
const supplierList = ["Supplier X", "Supplier Y"];
const unitList = ["kg", "litre", "piece"];
const categoryList = ["Vegetables", "Pulses", "Dairy", "Fuel"];
const wastageReasonList = ["Spoiled", "Over-prepared", "Damaged"];

export default function MasterDataApp() {
  const [order, setOrder] = useState({ date: today, company: "", orders: "", value: "", meals: "", notes: "" });
  const [sales, setSales] = useState({ date: today, company: "", mealsDelivered: "", salesValue: "", notes: "" });
  const [purchase, setPurchase] = useState({ date: today, supplier: "", item: "", quantity: "", unit: "", pricePerUnit: "", category: "", notes: "" });
  const [consumption, setConsumption] = useState({ date: today, item: "", quantity: "", unit: "", notes: "" });
  const [wastage, setWastage] = useState({ date: today, item: "", quantity: "", unit: "", reason: "", notes: "" });

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (setter, name, value) => {
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const validatePurchase = () => {
    const errors = [];
    if (!purchase.supplier || !purchase.item || !purchase.unit || !purchase.category) errors.push("All required fields must be filled in Purchase Form");
    if (purchase.quantity < 0 || purchase.pricePerUnit < 0) errors.push("Purchase: Values must be positive");
    return errors;
  };

  const handlePurchaseSubmit = () => {
    const errors = validatePurchase();
    if (errors.length) return alert(errors.join("\n"));
    const totalValue = parseFloat(purchase.quantity || 0) * parseFloat(purchase.pricePerUnit || 0);
    alert(`Raw Material Purchase Submitted. Total Value: INR ${totalValue}`);
    console.log({ ...purchase, totalValue });
  };

  const validateConsumption = () => {
    const errors = [];
    if (!consumption.item || !consumption.unit) errors.push("Consumption: Required fields missing");
    if (consumption.quantity < 0) errors.push("Consumption: Quantity must be positive");
    return errors;
  };

  const handleConsumptionSubmit = () => {
    const errors = validateConsumption();
    if (errors.length) return alert(errors.join("\n"));
    alert("Consumption Record Submitted Successfully");
    console.log(consumption);
  };

  const validateWastage = () => {
    const errors = [];
    if (!wastage.item || !wastage.unit || !wastage.reason) errors.push("Wastage: Required fields missing");
    if (wastage.quantity < 0) errors.push("Wastage: Quantity must be positive");
    return errors;
  };

  const handleWastageSubmit = () => {
    const errors = validateWastage();
    if (errors.length) return alert(errors.join("\n"));
    alert("Wastage Record Submitted Successfully");
    console.log(wastage);
  };

  return (
    <div className="space-y-10">
      {/* Orders Form */}
      <Card className="max-w-xl mx-auto mt-10">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Orders Form</h2>
          <Input name="date" value={order.date} onChange={handleInputChange(setOrder)} type="date" max={today} />
          <Select onValueChange={(value) => handleSelectChange(setOrder, "company", value)}>
            <SelectTrigger><SelectValue placeholder="Select Company" /></SelectTrigger>
            <SelectContent>{companyList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Input name="orders" value={order.orders} onChange={handleInputChange(setOrder)} placeholder="Number of Orders" type="number" min="0" />
          <Input name="value" value={order.value} onChange={handleInputChange(setOrder)} placeholder="Total Order Value (INR)" type="number" min="0" />
          <Input name="meals" value={order.meals} onChange={handleInputChange(setOrder)} placeholder="Total Number of Meals" type="number" min="0" />
          <Textarea name="notes" value={order.notes} onChange={handleInputChange(setOrder)} placeholder="Notes (Optional)" maxLength={500} />
          <Button onClick={() => alert("Orders Form Submitted Successfully")}>Submit Order</Button>
        </CardContent>
      </Card>

      {/* Sales Form */}
      <Card className="max-w-xl mx-auto">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Sales Form</h2>
          <Input name="date" value={sales.date} onChange={handleInputChange(setSales)} type="date" max={today} />
          <Select onValueChange={(value) => handleSelectChange(setSales, "company", value)}>
            <SelectTrigger><SelectValue placeholder="Select Company" /></SelectTrigger>
            <SelectContent>{companyList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Input name="mealsDelivered" value={sales.mealsDelivered} onChange={handleInputChange(setSales)} placeholder="Meals Delivered" type="number" min="0" />
          <Input name="salesValue" value={sales.salesValue} onChange={handleInputChange(setSales)} placeholder="Total Sales Value (INR)" type="number" min="0" />
          <Textarea name="notes" value={sales.notes} onChange={handleInputChange(setSales)} placeholder="Notes (Optional)" maxLength={500} />
          <Button onClick={() => alert("Sales Form Submitted Successfully")}>Submit Sales</Button>
        </CardContent>
      </Card>

      {/* Raw Material Purchase Form */}
      <Card className="max-w-xl mx-auto">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Raw Material Purchase Form</h2>
          <Input name="date" value={purchase.date} onChange={handleInputChange(setPurchase)} type="date" max={today} />
          <Select onValueChange={(value) => handleSelectChange(setPurchase, "supplier", value)}>
            <SelectTrigger><SelectValue placeholder="Select Supplier" /></SelectTrigger>
            <SelectContent>{supplierList.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <Input name="item" value={purchase.item} onChange={handleInputChange(setPurchase)} placeholder="Item Purchased" maxLength={255} />
          <Input name="quantity" value={purchase.quantity} onChange={handleInputChange(setPurchase)} placeholder="Quantity" type="number" min="0" />
          <Select onValueChange={(value) => handleSelectChange(setPurchase, "unit", value)}>
            <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
            <SelectContent>{unitList.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
          </Select>
          <Input name="pricePerUnit" value={purchase.pricePerUnit} onChange={handleInputChange(setPurchase)} placeholder="Purchase Price per Unit (INR)" type="number" min="0" />
          <Select onValueChange={(value) => handleSelectChange(setPurchase, "category", value)}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>{categoryList.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <Textarea name="notes" value={purchase.notes} onChange={handleInputChange(setPurchase)} placeholder="Notes (Optional)" maxLength={500} />
          <Button onClick={handlePurchaseSubmit}>Submit Purchase</Button>
        </CardContent>
      </Card>

      {/* Consumption Form */}
      <Card className="max-w-xl mx-auto">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Consumption Form</h2>
          <Input name="date" value={consumption.date} onChange={handleInputChange(setConsumption)} type="date" max={today} />
          <Input name="item" value={consumption.item} onChange={handleInputChange(setConsumption)} placeholder="Item Used" maxLength={255} />
          <Input name="quantity" value={consumption.quantity} onChange={handleInputChange(setConsumption)} placeholder="Quantity Consumed" type="number" min="0" />
          <Select onValueChange={(value) => handleSelectChange(setConsumption, "unit", value)}>
            <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
            <SelectContent>{unitList.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
          </Select>
          <Textarea name="notes" value={consumption.notes} onChange={handleInputChange(setConsumption)} placeholder="Notes (Optional)" maxLength={500} />
          <Button onClick={handleConsumptionSubmit}>Submit Consumption</Button>
        </CardContent>
      </Card>

      {/* Wastage Form */}
      <Card className="max-w-xl mx-auto">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Wastage Form</h2>
          <Input name="date" value={wastage.date} onChange={handleInputChange(setWastage)} type="date" max={today} />
          <Input name="item" value={wastage.item} onChange={handleInputChange(setWastage)} placeholder="Item Wasted" maxLength={255} />
          <Input name="quantity" value={wastage.quantity} onChange={handleInputChange(setWastage)} placeholder="Quantity Wasted" type="number" min="0" />
          <Select onValueChange={(value) => handleSelectChange(setWastage, "unit", value)}>
            <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
            <SelectContent>{unitList.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
          </Select>
          <Select onValueChange={(value) => handleSelectChange(setWastage, "reason", value)}>
            <SelectTrigger><SelectValue placeholder="Select Reason for Wastage" /></SelectTrigger>
            <SelectContent>{wastageReasonList.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
          <Textarea name="notes" value={wastage.notes} onChange={handleInputChange(setWastage)} placeholder="Notes (Optional)" maxLength={500} />
          <Button onClick={handleWastageSubmit}>Submit Wastage</Button>
        </CardContent>
      </Card>
    </div>
  );
}
