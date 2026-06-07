// components/food-search.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon, XIcon, FilterIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Food {
  id: string;
  name: string;
  name_tamil?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
}

const POPULAR_FOODS: Food[] = []; // Placeholder, could be fetched from API on mount

async function searchFoods(query: string, filters: { category: string; calorieRange: [number, number]; sortBy: string }): Promise<Food[]> {
  if (!query.trim()) return [];
  const sample: Food[] = [
    { id: '1', name: 'Oats', calories: 389, protein: 17, carbs: 66, fats: 7, category: 'grains' },
    { id: '2', name: 'Banana', calories: 89, protein: 1, carbs: 23, fats: 0, category: 'fruit' },
    { id: '3', name: 'Paneer', calories: 265, protein: 18, carbs: 1, fats: 21, category: 'protein' },
  ];

  const q = query.toLowerCase();
  let result = sample.filter((f) => f.name.toLowerCase().includes(q));

  if (filters.category) {
    result = result.filter((f) => f.category === filters.category);
  }

  result = result.filter(
    (f) => f.calories >= filters.calorieRange[0] && f.calories <= filters.calorieRange[1]
  );

  if (filters.sortBy === 'calories') {
    result.sort((a, b) => a.calories - b.calories);
  } else {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    language: 'en',
    category: '',
    calorieRange: [0, 1000] as [number, number],
    sortBy: 'name',
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentFoodSearches');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const debouncedSearch = useCallback(
    (q: string) => {
      if (q.trim()) {
        const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 10);
        setRecentSearches(updated);
        localStorage.setItem('recentFoodSearches', JSON.stringify(updated));
      }
    },
    [recentSearches]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => debouncedSearch(query), 300);
    return () => window.clearTimeout(timeoutId);
  }, [query, debouncedSearch]);

  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['food-search', query, filters],
    queryFn: () => searchFoods(query, filters),
    enabled: !!query,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search foods..."
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-10 text-foreground placeholder-muted"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        {query && (
          <button
            type="button"
            className="absolute right-12 top-1/2 -translate-y-1/2"
            onClick={() => setQuery('')}
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowFilters(true)}
        >
          <FilterIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-foreground mb-2">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button
                key={s}
                className="rounded-full bg-muted px-3 py-1 text-sm text-foreground hover:bg-muted/80"
                onClick={() => setQuery(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Foods */}
      {POPULAR_FOODS.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-foreground mb-2">Popular Foods</h3>
          <ul className="grid grid-cols-2 gap-4">
            {POPULAR_FOODS.map((food) => (
              <li key={food.id} className="p-2 border border-border rounded-md bg-card">
                <p className="font-medium text-foreground">{food.name}</p>
                <p className="text-muted-foreground text-xs">{food.calories} kcal</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search Results */}
      <div className="mt-6">
        {isLoading && <p className="text-muted-foreground">Loading...</p>}
        {isError && <p className="text-destructive">Error loading foods.</p>}
        {foods && foods.length === 0 && <p className="text-muted-foreground">No foods found.</p>}
        {foods && foods.length > 0 && (
          <ul className="space-y-3">
            {foods.map((food) => (
              <li key={food.id} className="p-3 border border-border rounded-md bg-card flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">{food.name}</p>
                  <p className="text-muted-foreground text-sm">{food.calories} kcal • {food.protein}g protein</p>
                </div>
                <button className="text-primary hover:underline" onClick={() => {/* add to log logic */}}>
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showFilters && (
        <div className="mt-4 rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium">Filters</p>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            <input
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Category"
              className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
              className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            >
              <option value="name">Sort by name</option>
              <option value="calories">Sort by calories</option>
            </select>
            <button
              type="button"
              className="rounded-md border border-input px-2 py-1 text-sm"
              onClick={() => setShowFilters(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
