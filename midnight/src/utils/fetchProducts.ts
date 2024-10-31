export const fetchProducts = async () => {
  try {
    // Veicam pieprasījumu uz API, lai iegūtu produktus
    const response = await fetch("https://www.midnightrunners.club/_functions/products");
    
    // Pārbaudām, vai atbilde ir veiksmīga
    if (!response.ok) {
      const errorText = await response.text(); // Iegūstam kļūdas tekstu
      throw new Error(`Network response was not ok: ${response.status} ${errorText}`); // Izmetam kļūdu, ja atbilde nav veiksmīga
    }
    
    // Konvertējam atbildi uz JSON formātu
    const data = await response.json();
    return data.items; // Atgriežam iegūtos produktus
  } catch (error) {
    console.error("Error fetching products: ", error); // Logojam kļūdu
    throw error; // Izmetam kļūdu, lai to varētu apstrādāt augstāk
  }
};
