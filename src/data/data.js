export const phones = [
  { id: 1,  etat: "scelle",   brand: "Apple",   name: "iPhone 15 Pro Max", price: 850000, oldPrice: null, discount: null, image: "/img1.jpg",          type: "ios",     category: "telephones" },
  { id: 2,  etat: "occasion", brand: "Apple",   name: "iPhone 15",         price: 550000, oldPrice: null, discount: null, image: "/img2.jpg",           type: "ios",     category: "telephones" },
  { id: 3,  etat: "scelle",   brand: "Apple",   name: "iPhone 14 Pro",     price: 680000, oldPrice: null, discount: null, image: "/iphone14pro.jpg",    type: "ios",     category: "telephones" },
  { id: 4,  etat: "venu",     brand: "Apple",   name: "iPhone 13",         price: 420000, oldPrice: null, discount: null, image: "/iphone13.jpg",       type: "ios",     category: "telephones" },
  { id: 5,  etat: "venu",     brand: "Samsung", name: "Galaxy S24 Ultra",  price: 780000, oldPrice: null, discount: null, image: "/galaxys24ultra.jpg", type: "android", category: "telephones" },
  { id: 6,  etat: "occasion", brand: "Samsung", name: "Galaxy A55",        price: 185000, oldPrice: null, discount: null, image: "/galaxya55.jpg",      type: "android", category: "telephones" },
  { id: 7,  etat: "scelle",   brand: "Samsung", name: "Galaxy S23",        price: 450000, oldPrice: null, discount: null, image: "/galaxys23.jpg",      type: "android", category: "telephones" },
  { id: 8,  etat: "venu",     brand: "Xiaomi",  name: "Redmi Note 13 Pro", price: 165000, oldPrice: null, discount: null, image: "/redminote13.jpg",    type: "android", category: "telephones" },
  { id: 9,  etat: "scelle",   brand: "Xiaomi",  name: "Poco X6 Pro",       price: 210000, oldPrice: null, discount: null, image: "/pocox6.jpg",         type: "android", category: "telephones" },
  { id: 10, etat: "venu",     brand: "Tecno",   name: "Camon 30 Pro",      price: 145000, oldPrice: null, discount: null, image: "/camon30.jpg",        type: "android", category: "telephones" },
  { id: 11, etat: "scelle",   brand: "Infinix", name: "Note 40 Pro",       price: 135000, oldPrice: null, discount: null, image: "/note40.jpg",         type: "android", category: "telephones" },
  { id: 12, etat: "occasion", brand: "Infinix", name: "Hot 40i",           price: 85000,  oldPrice: null, discount: null, image: "/hot40i.jpg",         type: "android", category: "telephones" },
];

export const accessories = [
  { id: 101, brand: "Apple",    name: "AirPods Pro 2",          price: 120000, oldPrice: null, discount: null, image: "/img3.jpg",         category: "ecouteurs"   },
  { id: 102, brand: "Samsung",  name: "Galaxy Buds 2 Pro",      price: 85000,  oldPrice: null, discount: null, image: "/img4.jpg",         category: "ecouteurs"   },
  { id: 103, brand: "JBL",      name: "Tune 770NC",             price: 45000,  oldPrice: null, discount: null, image: "/jbltune770.jpg",   category: "ecouteurs"   },
  { id: 104, brand: "Anker",    name: "Chargeur 65W GaN",       price: 18000,  oldPrice: null, discount: null, image: "/img5.jpg",         category: "chargeurs"   },
  { id: 105, brand: "Apple",    name: "MagSafe 15W",            price: 25000,  oldPrice: null, discount: null, image: "/img6.jpg",         category: "chargeurs"   },
  { id: 106, brand: "Baseus",   name: "Chargeur 100W GaN",      price: 28000,  oldPrice: null, discount: null, image: "/baseus100w.jpg",   category: "chargeurs"   },
  { id: 107, brand: "Spigen",   name: "Coque iPhone 15 Pro",    price: 12000,  oldPrice: null, discount: null, image: "/spigen15pro.jpg",  category: "coques"      },
  { id: 108, brand: "OtterBox", name: "Defender Galaxy S24",    price: 22000,  oldPrice: null, discount: null, image: "/otterboxs24.jpg",  category: "coques"      },
  { id: 109, brand: "Anker",    name: "Câble USB-C 3m",         price: 8000,   oldPrice: null, discount: null, image: "/anker-cable.jpg",  category: "accessoires" },
  { id: 110, brand: "Baseus",   name: "Power Bank 20000mAh",    price: 35000,  oldPrice: null, discount: null, image: "/powerbank.jpg",    category: "accessoires" },
  { id: 111, brand: "Belkin",   name: "Chargeur Sans Fil",      price: 18000,  oldPrice: null, discount: null, image: "/belkin-qi.jpg",    category: "accessoires" },
  { id: 112, brand: "Anker",    name: "Support Voiture MagSafe",price: 15000,  oldPrice: null, discount: null, image: "/support-mag.jpg",  category: "accessoires" },
];

export const promoProducts = [
  { id: 201, brand: "Apple",    name: "iPhone 15 Pro Max",    price: 850000, oldPrice: 920000, discount: 8,  image: "/img1.jpg",          type: "ios",     category: "telephones" },
  { id: 202, brand: "Apple",    name: "iPhone 14 Pro",        price: 620000, oldPrice: 680000, discount: 9,  image: "/iphone14pro.jpg",   type: "ios",     category: "telephones" },
  { id: 203, brand: "Samsung",  name: "Galaxy S24 Ultra",     price: 720000, oldPrice: 780000, discount: 8,  image: "/galaxys24ultra.jpg",type: "android", category: "telephones" },
  { id: 204, brand: "Samsung",  name: "Galaxy S23",           price: 390000, oldPrice: 450000, discount: 13, image: "/galaxys23.jpg",     type: "android", category: "telephones" },
  { id: 205, brand: "Xiaomi",   name: "Redmi Note 13 Pro",    price: 145000, oldPrice: 165000, discount: 12, image: "/redminote13.jpg",   type: "android", category: "telephones" },
  { id: 206, brand: "Tecno",    name: "Camon 30 Pro",         price: 125000, oldPrice: 145000, discount: 14, image: "/camon30.jpg",       type: "android", category: "telephones" },
  { id: 207, brand: "Infinix",  name: "Hot 40i",              price: 72000,  oldPrice: 85000,  discount: 15, image: "/hot40i.jpg",        type: "android", category: "telephones" },
  { id: 208, brand: "Apple",    name: "AirPods Pro 2",        price: 105000, oldPrice: 120000, discount: 13, image: "/img3.jpg",          type: null,      category: "ecouteurs"  },
  { id: 209, brand: "Samsung",  name: "Galaxy Buds 2 Pro",    price: 72000,  oldPrice: 85000,  discount: 15, image: "/img4.jpg",          type: null,      category: "ecouteurs"  },
  { id: 210, brand: "Anker",    name: "Chargeur 65W GaN",     price: 15000,  oldPrice: 18000,  discount: 17, image: "/img5.jpg",          type: null,      category: "chargeurs"  },
  { id: 211, brand: "Baseus",   name: "Chargeur 100W GaN",    price: 22000,  oldPrice: 28000,  discount: 21, image: "/baseus100w.jpg",    type: null,      category: "chargeurs"  },
  { id: 212, brand: "Baseus",   name: "Power Bank 20000mAh",  price: 28000,  oldPrice: 35000,  discount: 20, image: "/powerbank.jpg",     type: null,      category: "accessoires"},
  { id: 213, brand: "OtterBox", name: "Defender Galaxy S24",  price: 17000,  oldPrice: 22000,  discount: 23, image: "/otterboxs24.jpg",   type: null,      category: "coques"     },
];

export const allProducts = [...phones, ...accessories];