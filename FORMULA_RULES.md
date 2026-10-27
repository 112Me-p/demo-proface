# Formula Specification V4 — เฉพาะม่านลอน / Wave

## Inputs per curtain set

- `W`: width of measured curtain (m)
- `H`: height of measured curtain (m)
- `FW`: fabric full width (m)
- `TR`: track charge per meter
- `FR`: fabric price from the workbook column `ราคาตั้ง -50%` (already net, do not apply another 50%)
- `method`: wide | narrow | reverse, explicitly selected by Admin

## Direction / feasibility validation (confirmed by user)

| Method | Direction limit | Action |
|---|---|---|
| wide | `W <= FW - 0.30` | Reject selected method when false |
| narrow | W may exceed FW | Warn that fabrics need joining; height does not restrict direction choice |
| reverse | `H <= FW - 0.30` | Reject selected method when false |

This is a **fabric orientation** constraint distinct from the pricing formula. The 0.30 m allowance was explicitly provided by PROFACE for wide and reverse methods. Narrow does not use this allowance as a maximum panel-width eligibility rule here because its full production cutting rules are pending.

## Excel Wave pricing algorithm (demo)

`E = MAX(W, 1)`

**wide:**
```
QuantityForPricing = E * 3.6 * 1.2
```

**narrow:**
```
PricingPanels = CEILING((E * 2.4 + 1) / FW)
QuantityForPricing = (H + 1.8) * PricingPanels * 1.2
```

**reverse:**
```
PricingPanels = CEILING((E * 2.4 + 1) / FW)
QuantityForPricing = (H + 1.8) * PricingPanels * 1.2
```
*Reverse currently produces the same pricing results in supplied Excel examples, not independently verified for every kind of curtain or fabric. Its dimension validation is **different** from narrow and enforced separately.*

All modes:
```
RawPrice = QuantityForPricing * FR + W * TR
RoundedSalePrice = FLOOR(RawPrice / 100 + 0.5) * 100
ProjectSubtotal = SUM(RoundedSalePrice per confirmed-price item) + manual charges
VAT = ProjectSubtotal * 0.07
```

The pricing quantity is **not an order/purchasing quantity**. If narrow width > full fabric width, the UI shows rough flat coverage = `CEILING(W / FW)` only to explain seams; this is not the `PricingPanels` figure and is not a cutting calculation.

## Unknown / not yet approved

1. Pleated curtain pricing formula
2. Eyelet curtain pricing formula
3. Any product-specific exceptions, minimums, quantity discounts, or alternate fabric widths not yet supplied
4. Purchasing and sewing/cutting instructions
5. Role-bound secured production connectivity to Google Sheets

Excel examples should be tested for boundary cases and independently reconciled against current production policies before live quotation.
