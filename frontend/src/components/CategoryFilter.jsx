function CategoryFilter({
    categories = [],
    selectedCategory,
    setSelectedCategory
}) {
    const filterOptions = ["Összes", ...categories];

    return (
        <div className="filters">
            {filterOptions.map((category) => (
                <button
                    key={category}
                    className={
                        selectedCategory === category
                            ? "filter-button active"
                            : "filter-button"
                    }
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
