export interface CategoryItem {
    id: number;
    img: string; // The URL or file path for the image
    title: string;
    cat: string; // Likely representing the category name (e.g., "women", "coat", "jeans")
}

// Optional: Type the entire array structure
export type Categories = CategoryItem[];
