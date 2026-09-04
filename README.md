# Classic Business Centre (CBC Goa) - Web Application

A lightweight, vibrant, light-themed web application designed and built for **Classic Business Centre (CBC Goa)**, Goa's premier printing, design, architectural plotting, and large-format solutions provider.

## Architecture & Features

1. **Branch Selection Gateway (Modal Lock)**:
   - Locks screen on initial visit to prompt user branch selection.
   - Saves context in `localStorage`.
   - Branches:
     - **Panjim – M.G. Road (Alfran Plaza)**: `+91 94235 30182`
     - **Panjim – Patto Plaza (Kamat Towers)**: `+91 83229 50687`
     - **Mapusa – Municipal Council Area**: `+91 97671 17867`
     - **Porvorim – Housing Board Colony**: `+91 83224 11786`
2. **Dynamic Routing & WhatsApp Payload**:
   - Binds order submissions dynamically to active branch phone numbers.
3. **Interactive WhatsApp Order Specs Builder**:
   - Step-by-step print setup with visual drag-and-drop file preview.
   - Generates formatted WhatsApp orders.
   - Explicitly excludes prices and GSM mentions as requested.
4. **Pre-Press File Readiness Checklist**:
   - 4-step accordion guide for client prepress files.
5. **Live Branch Status Indicator**:
   - Calculates Goa IST time (UTC+5:30) and displays real-time "Open Now" / "Closed" badges.
6. **Playful 404 Error State**:
   - Interactive Paper Jam modal simulation.

## File Structure

```
cbc-goa-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── branches.js
│   └── order-builder.js
└── README.md
```

Designed with a strict Light Theme and CMYK Accent palette.
