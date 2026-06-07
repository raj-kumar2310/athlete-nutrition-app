import { createClient } from '@/lib/supabase/client';

type InsertableFood = {
  name: string;
  name_tamil: string;
  brand: string;
  barcode: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  fiber_g: number;
  sodium_mg: number;
  potassium_mg: number;
  serving_size_g: number;
  is_indian_food: boolean;
};

/**
 * Look up a food by barcode in the local Supabase `foods` table.
 * Returns the food record if found, otherwise null.
 */
export async function findLocalFoodByBarcode(barcode: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('barcode', barcode)
    .single();
  if (error && error.code !== 'PGRST115') {
    // PGRST115 = no rows returned – ignore, rethrow others
    console.error('Supabase barcode lookup error:', error);
    throw error;
  }
  return data ?? null;
}

/**
 * Fetch food data from Open Food Facts API.
 * Returns a simplified food object compatible with our `foods` table schema.
 */
export async function fetchFoodFromOpenFoodFacts(barcode: string): Promise<InsertableFood> {
  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`);
  if (!response.ok) {
    throw new Error('Open Food Facts request failed');
  }
  const json = (await response.json()) as {
    status: number;
    product?: {
      product_name?: string;
      generic_name?: string;
      brands?: string;
      nutriments?: {
        energy_kcal?: number;
        proteins_100g?: number;
        carbohydrates_100g?: number;
        fat_100g?: number;
        fiber_100g?: number;
        sodium_100g?: number;
        potassium_100g?: number;
      };
      serving_size?: string | number;
    };
  };
  if (json.status !== 1) {
    throw new Error('Food not found on Open Food Facts');
  }
  const product = json.product ?? {};
  // Map Open Food Facts fields to our schema (adjust as needed)
  return {
    name: product.product_name ?? 'Unknown Food',
    name_tamil: product.generic_name ?? '',
    brand: product.brands ?? '',
    barcode: barcode,
    calories: Number(product.nutriments?.energy_kcal ?? 0),
    protein_g: Number(product.nutriments?.proteins_100g ?? 0),
    carbs_g: Number(product.nutriments?.carbohydrates_100g ?? 0),
    fats_g: Number(product.nutriments?.fat_100g ?? 0),
    fiber_g: Number(product.nutriments?.fiber_100g ?? 0),
    sodium_mg: Number(product.nutriments?.sodium_100g ?? 0) * 1000,
    potassium_mg: Number(product.nutriments?.potassium_100g ?? 0) * 1000,
    serving_size_g: Number(product.serving_size ?? 0),
    is_indian_food: false,
  };
}

/**
 * Insert a new food record into Supabase.
 */
export async function insertFoodRecord(food: InsertableFood) {
  const supabase = createClient();
  // Supabase client typing can be strict in this workspace; cast to `any` for pragmatic insertion.
  const { error } = await (supabase as any).from('foods').insert([food]);
  if (error) {
    console.error('Failed to insert new food:', error);
    throw error;
  }
  return food;
}

/**
 * Public helper used by the API route: given a barcode, return a food record.
 * Looks locally first, then falls back to Open Food Facts and stores the result.
 */
export async function scanBarcode(barcode: string) {
  // 1️⃣ Try local DB
  const local = await findLocalFoodByBarcode(barcode);
  if (local) return local;

  // 2️⃣ Fetch from Open Food Facts
  const fetched = await fetchFoodFromOpenFoodFacts(barcode);

  // 3️⃣ Insert into Supabase and return the inserted record
  await insertFoodRecord(fetched);
  return fetched;
}
