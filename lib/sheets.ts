import Papa from 'papaparse';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  portion?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const FALLBACK_MENU: MenuCategory[] = [
  {
    category: "Cafetería Clásica",
    items: [
      { name: "Espresso", description: "Café negro corto e intenso.", price: "$2.20", portion: "Pocillo (60 ml)" },
      { name: "Cappuccino Italiano", description: "Café con leche y mucha espuma.", price: "$3.20", portion: "Taza Mediana (250 ml)" },
      { name: "Latte Vainilla", description: "Café con leche y vainilla.", price: "$3.50", portion: "Taza Grande (360 ml)" },
      { name: "Flat White", description: "Doble shot con leche fina.", price: "$3.40", portion: "Taza Mediana (200 ml)" },
      { name: "Caramel Macchiato", description: "Café con leche y caramelo.", price: "$3.80", portion: "Taza Grande (360 ml)" },
      { name: "Cold Brew Frapé", description: "Café frío licuado con hielo.", price: "$4.00", portion: "Vaso Alto (400 ml)" },
    ]
  },
  {
    category: "Pastelería & Panadería",
    items: [
      { name: "Croissant de Almendras", description: "Hojaldre relleno de almendras.", price: "$2.80", portion: "1 Unidad" },
      { name: "Cinnamon Roll", description: "Rollo de canela con glaseado.", price: "$2.60", portion: "1 Unidad" },
      { name: "Porción de Carrot Cake", description: "Torta de zanahoria y nuez.", price: "$3.20", portion: "1 Porción (150 g)" },
      { name: "Cookie Chocochips", description: "Galleta clásica con chocolate.", price: "$1.80", portion: "1 Unidad Grande" },
      { name: "Scons de Queso", description: "Pancitos horneados de queso.", price: "$2.00", portion: "2 Unidades" },
      { name: "Brownie con Nueces", description: "Cuadrado húmedo de chocolate.", price: "$2.40", portion: "1 Porción" },
    ]
  },
  {
    category: "Especialidades Saladas",
    items: [
      { name: "Tostado en Masa Madre", description: "Sándwich de jamón y queso.", price: "$4.50", portion: "1 Unidad (Grande)" },
      { name: "Avocado Toast", description: "Tostadas con palta y huevo.", price: "$4.80", portion: "1 Porción (2 tostadas)" },
      { name: "Bagel de Salmón", description: "Pan bagel, salmón y queso crema.", price: "$6.50", portion: "1 Unidad" },
      { name: "Croissant Relleno", description: "Hojaldre con queso brie y rúcula.", price: "$3.60", portion: "1 Unidad" },
      { name: "Tartine de Hongos", description: "Pan de campo con champiñones.", price: "$4.60", portion: "1 Porción" },
      { name: "Wrap de Pollo y Bacon", description: "Tortilla con pollo y panceta.", price: "$4.90", portion: "1 Unidad" },
    ]
  }
];

export async function getMenuData(): Promise<MenuCategory[]> {
  const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL;
  
  if (!sheetUrl) {
    console.warn("No NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL provided, using fallback data.");
    return FALLBACK_MENU;
  }
  
  try {
    const response = await fetch(sheetUrl, { next: { revalidate: 60 } }); // Revalidate every 60s
    if (!response.ok) {
      throw new Error("Failed to fetch Google Sheet CSV");
    }
    
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    const menuDataMap: { [key: string]: MenuItem[] } = {};
    const categoriesOrder: string[] = [];
    
    parsed.data.forEach((row: any) => {
      const category = row['Categoría']?.trim();
      const name = row['Nombre']?.trim();
      const description = row['Descripción']?.trim() || "";
      const price = row['Precio']?.trim();
      const portion = row['Tamaño / Porción']?.trim() || row['Tamaño/Porcion']?.trim() || row['Tamaño/Porción']?.trim() || row['Porción']?.trim() || row['Tamaño']?.trim() || "";
      
      if (!category || !name || !price) return; // Skip invalid rows
      
      if (!menuDataMap[category]) {
        menuDataMap[category] = [];
        categoriesOrder.push(category);
      }
      
      menuDataMap[category].push({ name, description, price, portion });
    });
    
    if (categoriesOrder.length === 0) {
      return FALLBACK_MENU;
    }
    
    const structuredData: MenuCategory[] = categoriesOrder.map(cat => ({
      category: cat,
      items: menuDataMap[cat]
    }));
    
    return structuredData;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return FALLBACK_MENU;
  }
}
