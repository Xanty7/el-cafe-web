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
    category: "Cafetería y Cafés Especiales",
    items: [
      { name: "Café irlandés", description: "Café, whisky y crema", price: "$6,000.00" },
      { name: "Café cubano", description: "Café, ron y crema", price: "$6,000.00" },
      { name: "Latte Saborizado", description: "Café latte saborizado a elección (Avellanas, Vainilla, Caramel, Chocolate, Pistacho)", price: "$6,000.00" },
      { name: "Cappuccino", description: "", price: "$6,500.00" },
      { name: "Bartoccino", description: "Café, leche, dulce de leche y crema chantilly", price: "$6,500.00" },
      { name: "Submarino", description: "", price: "$6,500.00" },
      { name: "Capuccino Marroc", description: "Bombón Marroc, crema chantilly, canela y salsa de chocolate", price: "$6,500.00" },
      { name: "Café bombón", description: "Café, espuma de leche, salsa de chocolate y leche condensada", price: "$6,500.00" },
      { name: "Café Bartolo", description: "Café, baileys, crema y canela", price: "$7,500.00" },
    ]
  },
  {
    category: "Dulces, Pastelería y Panadería",
    items: [
      { name: "Medialunas", description: "(por unidad)", price: "$2,000.00" },
      { name: "Cookies", description: "(por unidad)", price: "$2,500.00" },
      { name: "Tostadas", description: "(plato)", price: "$2,500.00" },
      { name: "Dips / Agregados", description: "Dulce de leche, Manteca, Mermelada o Queso untable", price: "$2,500.00 c/u" },
      { name: "Alfajor de maicena", description: "", price: "$3,000.00" },
      { name: "Alfajor sin T.A.C.C", description: "Dulce de leche y chocolate (negro o blanco)", price: "$3,000.00" },
      { name: "Factura", description: "Membrillo o pastelera", price: "$3,000.00" },
      { name: "Croissant", description: "(por unidad)", price: "$4,500.00" },
      { name: "Cupcakes", description: "(por unidad)", price: "$4,500.00" },
      { name: "Donas", description: "(por unidad)", price: "$4,500.00" },
      { name: "Budín", description: "(porción): Limón o Hamburgués (chocolate y nuez)", price: "$5,000.00" },
      { name: "Cuadradito de torta", description: "(porción): Limón, Coco, Brownie o Pastafrola", price: "$6,000.00" },
      { name: "Tabla Dulce", description: "Frutillas, bananas, waffles, budín de limón, galletitas, mix de golosinas, dips de dulce de leche y crema", price: "$12,000.00" },
    ]
  },
  {
    category: "Tortas (Porción)",
    items: [
      { name: "Brownie con merengue y dulce de leche", description: "", price: "$8,500.00" },
      { name: "Chocotorta", description: "", price: "$8,500.00" },
      { name: "Lemon Pie", description: "", price: "$8,500.00" },
      { name: "Rogel", description: "", price: "$8,500.00" },
      { name: "Tiramisú", description: "", price: "$8,500.00" },
      { name: "Torta bombón", description: "", price: "$8,500.00" },
      { name: "Cheesecake de frutos rojos", description: "", price: "$10,000.00" },
      { name: "Cheesecake Oreo", description: "", price: "$10,000.00" },
      { name: "Torta de frutilla", description: "Bizcochuelo de chocolate, mousse de frutilla y frutillas con crema", price: "$10,000.00" },
      { name: "Torta Moka", description: "Bizcochuelo de chocolate, mousse de dulce de leche y crema moka", price: "$10,000.00" },
    ]
  },
  {
    category: "Postres y Waffles",
    items: [
      { name: "Copa Bartolina", description: "Chocolinas, leche condensada, frutillas y crema chantilly", price: "$7,500.00" },
      { name: "Super copa", description: "Chocolinas molidas, crema de café, dulce de leche, chantilly y chocolate", price: "$7,500.00" },
      { name: "Waffle Chuli", description: "Dulce de leche y frutillas", price: "$9,000.00" },
      { name: "Waffle Nut", description: "Nutella, frutillas y crema chantilly", price: "$9,000.00" },
      { name: "Waffle Warhol", description: "Banana y dulce de leche", price: "$9,000.00" },
      { name: "Waffle Dubai", description: "Helado de chocolate, chantilly, dulce de leche y salsa de pistacho", price: "$12,000.00" },
      { name: "Waffle MaxPower", description: "Helado, sirope de chocolate y dulce de leche, crema, chispas y rocklets", price: "$12,000.00" },
    ]
  },
  {
    category: "Frappés",
    items: [
      { name: "Caramel Macchiato", description: "Café, leche, crema y sirope de caramelo", price: "$7,000.00" },
      { name: "Moka", description: "Café, chocolatada, crema y sirope de chocolate", price: "$7,000.00" },
      { name: "Bartolo Frappé", description: "Café, helado de americana, chips de chocolate, crema y sirope", price: "$9,000.00" },
      { name: "Nutella Frappé", description: "Café, helado de americana, nutella, chantilly y chocolate rallado", price: "$9,000.00" },
      { name: "Oreo Frappe", description: "Café, helado de americana, crema, oreos y sirope de chocolate", price: "$9,000.00" },
    ]
  },
  {
    category: "Entradas, Minutas y Salados",
    items: [
      { name: "Croissant JyQ", description: "Con jamón y queso", price: "$9,000.00" },
      { name: "Avocado Toast", description: "2 tostadas de pan integral con palta y huevo duro", price: "$9,000.00" },
      { name: "The Wings", description: "Alitas de pollo crocante rebozadas con salsa barbacoa", price: "$11,500.00" },
      { name: "Tostados de Jamón y Queso", description: "", price: "$12,000.00" },
      { name: "Papas fritas", description: "Porción simple bastón", price: "$12,000.00" },
      { name: "Nuggets de pollo", description: "Con ketchup", price: "$13,000.00" },
      { name: "Bruschettas", description: "(6 unidades surtidas de pan tostado con oliva)", price: "$14,000.00" },
      { name: "Fritas 4k", description: "Bañadas en salsa de 4 quesos", price: "$16,000.00" },
      { name: "Papas al verdeo", description: "Crema, cebolla de verdeo y tiritas de jamón cocido", price: "$16,000.00" },
      { name: "Papas Bartolo", description: "Rústicas con queso cheddar y panceta", price: "$16,000.00" },
      { name: "Papas del roque", description: "Rústicas con pollo y queso azul", price: "$16,000.00" },
      { name: "Papas Hendrix", description: "Bastón con rebozaditos de pollo y salsa", price: "$16,000.00" },
      { name: "Red Hot Chilli Papas", description: "Bastón con salsa picante y verdeo", price: "$16,000.00" },
      { name: "Rabas", description: "", price: "$18,000.00" },
      { name: "Tina Turner", description: "Tabla con rabas, nuggets, milanesa, alitas de pollo y papas con queso", price: "$28,000.00" },
    ]
  },
  {
    category: "Platos Principales",
    items: [
      { name: "Huevos revueltos (A.K.A Yesterday)", description: "Con muzzarella y jamón cocido", price: "$12,000.00" },
      { name: "Costeleta con ensalada", description: "Lechuga, tomate y queso", price: "$20,000.00" },
      { name: "Bondiola de cerdo", description: "A la mostaza", price: "$21,000.00" },
      { name: "Matambrito a la pizza", description: "De cerdo, con papas fritas", price: "$21,000.00" },
      { name: "Mila Blur", description: "Con queso y cebolla. Sale con fritas", price: "$23,000.00" },
      { name: "Mila Morrissey", description: "Con queso sardo, roque, tybo y cheddar. Sale con fritas", price: "$23,000.00" },
      { name: "Mila Oasis", description: "A la napolitana. Sale con fritas", price: "$23,000.00" },
      { name: "Mila Ramones", description: "Con cheddar y huevo frito. Sale con fritas", price: "$23,000.00" },
      { name: "Picada Bartolo", description: "Variedad de fiambres, quesos (gruyere, azul), olivas y pickles", price: "$29,000.00" },
    ]
  },
  {
    category: "Ensaladas",
    items: [
      { name: "Capresse", description: "Albahaca, tomate cherry, mozzarella y aceitunas negras", price: "$11,000.00" },
      { name: "César", description: "Lechuga, pollo, salsa césar, queso y croutons", price: "$11,000.00" },
      { name: "Green", description: "Mix de hojas verdes, queso azul, tomate cherry y nuez", price: "$11,000.00" },
      { name: "Bartolo", description: "Lechuga, tomate cherry, huevo, panceta y aceitunas negras", price: "$13,500.00" },
      { name: "Rocanrol", description: "Lechuga, tomate cherry, pollo, cebolla y aceitunas negras", price: "$13,500.00" },
    ]
  },
  {
    category: "Pizzas",
    items: [
      { name: "Precio general", description: "Americana, Anchoas, Calabresa, Caprese, Criolla, Cuatro quesos, Especial, Fugazzetta, Hawaiana, Palmitos, Pancetas BBQ, Picante, Pollo, Roquefort, Rucucú", price: "$26,000.00" },
      { name: "Pizza Cochina", description: "Mozzarella, cheddar, panceta, huevo frito y papas fritas", price: "$29,000.00" },
    ]
  },
  {
    category: "Sándwiches Gourmet y Hamburguesas",
    items: [
      { name: "Crudo y Rucu", description: "Rúcula, jamón crudo, queso y cherry con oliva", price: "$13,500.00" },
      { name: "Vegetariano POP", description: "Lechuga, tomate, palta y huevo duro", price: "$13,500.00" },
      { name: "Costanero", description: "Bondiola de cerdo, jamón, queso y huevo frito", price: "$16,000.00" },
      { name: "Porky", description: "Bondiola de cerdo, cebolla caramelizada, mozza y lechuga", price: "$16,000.00" },
      { name: "Hamburguesas", description: "(Cheessy, Bono, Iuesei, Jimi, Manchester, Randy, Veggie)", price: "$18,000.00 c/u" },
      { name: "Lomos / Pollo", description: "(Oliver, Pampa, Putanezco, Pollo Bartolo)", price: "$22,000.00 c/u" },
    ]
  },
  {
    category: "Cervezas",
    items: [
      { name: "Andes, Imperial, Imperial Stout, Sol", description: "", price: "$6,000.00" },
      { name: "Corona, Grolsch, Miller, Patagonia, Stella Artois, Stella Noir", description: "", price: "$7,000.00" },
      { name: "Corona 750ml, Patagonia 750ml", description: "", price: "$11,000.00" },
    ]
  },
  {
    category: "Tragos y Coctelería",
    items: [
      { name: "Gin / Tragos Nacionales", description: "Gin Tonic, Gin Pink, Ginger Ale Nac., Cuba Libre, Daikiri, Fernet, Gancia, Campari", price: "$7,000.00 / $9,000.00" },
      { name: "Ohlalá", description: "Vino blanco, sprite, vodka de frambuesa, arándanos y frutilla", price: "$7,500.00" },
      { name: "Vodka + Speed / Jägermeister + Red Bull", description: "", price: "$9,500.00" },
      { name: "Valenciano", description: "Campari, helado de maracuyá y jugo de naranja", price: "$10,000.00" },
      { name: "Premium", description: "Absolut + Red Bull, Baileys Frozen, Gin Tonic Sin Alcohol", price: "$11,000.00" },
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
