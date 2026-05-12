function CategoryFilter({
    selectedCategory,
    setSelectedCategory
}) {

    const categories = [
        "Összes",
        "Pólók",
        "Nadrágok",
        "Cipők",
        "Kabátok",
        "Ruhák"
    ];

    return (
        <div className="filters">

            {categories.map(category => (

                <button
                    key={category}
                    className={
                        selectedCategory === category
                            ? "filter-button active"
                            : "filter-button"
                    }
                    onClick={() =>
                        setSelectedCategory(category)
                    }
                >
                    {category}
                </button>

            ))}

        </div>
    );
}

export default CategoryFilter;