"use client";

import { useEffect } from "react";
import { Divider } from "@/components/Divider";

const menuData = [
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

export default function MenuPage() {
  useEffect(() => {
    // Scroll Progress Logic
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressEl = document.getElementById("scroll-progress");
      if (progressEl) {
        progressEl.style.width = scrolled + "%";
      }

      // Parallax effect for Hero Image
      const heroParallax = document.getElementById("hero-parallax-img");
      if (heroParallax) {
        heroParallax.style.transform = `translateY(${winScroll * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for Staggered Reveals
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress"></div>
      <main className="pt-20 min-h-screen">
        <section className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden border-b border-primary/10">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div id="hero-parallax-img" className="absolute inset-x-0 -top-[15%] h-[130%]">
              <img alt="Menu Background" className="w-full h-full object-cover" src="/menu_hero.png" />
            </div>
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center reveal-on-scroll">
            <span className="text-xs md:text-sm font-semibold text-primary-fixed tracking-[0.2em] uppercase mb-6 block drop-shadow-md">Carta Completa</span>
            <h1 className="font-display-lg text-5xl md:text-7xl text-primary-fixed leading-none mb-6 uppercase tracking-widest drop-shadow-lg">
              NUESTRO MENÚ
            </h1>
            <p className="text-lg md:text-2xl text-primary-fixed/90 italic drop-shadow-md">
              Explora nuestra cuidada selección de sabores
            </p>
          </div>
        </section>

        {menuData.map((category, index) => {
          const isLight = index % 3 === 0;
          const isDark = index % 3 === 1;
          
          const sectionBg = isLight ? 'bg-surface-container-low' : isDark ? 'dark-block' : 'bg-primary';
          const textMain = isLight ? 'text-primary' : 'text-primary-fixed';
          const textDesc = isLight ? 'text-on-surface-variant/70' : 'text-primary-fixed/70';
          const borderStyle = isLight ? 'border-primary/20 hover:border-primary' : 'border-primary-fixed/20 hover:border-primary-fixed';
          const dividerStyle = isLight ? 'bg-primary/20' : 'bg-primary-fixed/20';

          return (
            <section key={index} className={`py-16 md:py-24 ${sectionBg}`}>
              <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="text-center mb-12 reveal-on-scroll">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textMain}`}>
                    {category.category}
                  </h2>
                  <Divider isLight={isLight} />
                </div>
                
                <div className="grid grid-cols-1 gap-6 text-left">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className={`group border-b pb-4 transition-all duration-500 reveal-on-scroll delay-100 ${borderStyle}`}
                    >
                      <div className="flex justify-between items-end mb-2 gap-4">
                        <h3 className={`text-xl md:text-2xl font-bold group-hover:italic group-hover:translate-x-2 transition-all duration-500 flex-1 ${textMain}`}>
                          {item.name}
                        </h3>
                        <span className={`font-body-md font-bold transition-transform duration-500 group-hover:-translate-x-2 whitespace-nowrap ${textMain}`}>
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className={`font-body-md ${textDesc}`}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
