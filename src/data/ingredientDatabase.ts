const ingredientDatabase = [
  // Grains and Cereals
  "Rice", "Brown Rice", "White Rice", "Basmati Rice", "Jasmine Rice", "Wild Rice", "Arborio Rice", "Sushi Rice",
  "Wheat", "Wheat Berries", "Bulgur Wheat", "Semolina", "Couscous", "Farro", "Spelt", "Kamut",
  "Oats", "Steel-Cut Oats", "Rolled Oats", "Quick Oats", "Oat Bran", "Oat Flour",
  "Quinoa", "Red Quinoa", "Black Quinoa", "Quinoa Flakes",
  "Barley", "Pearl Barley", "Hulled Barley", "Barley Flakes",
  "Millet", "Sorghum", "Teff", "Amaranth", "Buckwheat", "Rye", "Triticale",
  "Corn", "Cornmeal", "Polenta", "Grits", "Corn Flour", "Popcorn",
  "Pasta", "Spaghetti", "Penne", "Fettuccine", "Linguine", "Lasagna", "Orzo", "Macaroni", "Fusilli",
  "Bread", "White Bread", "Whole Wheat Bread", "Sourdough Bread", "Rye Bread", "Pita Bread", "Naan", "Baguette",
  "Tortillas", "Corn Tortillas", "Flour Tortillas", "Whole Wheat Tortillas",
  "Crackers", "Breadcrumbs", "Panko",

  // Legumes and Pulses
  "Lentils", "Red Lentils", "Green Lentils", "Brown Lentils", "Black Lentils", "French Lentils",
  "Beans", "Black Beans", "Kidney Beans", "Pinto Beans", "Navy Beans", "Cannellini Beans", "Great Northern Beans",
  "Lima Beans", "Fava Beans", "Mung Beans", "Adzuki Beans", "Garbanzo Beans (Chickpeas)",
  "Soybeans", "Edamame", "Black-Eyed Peas", "Split Peas", "Green Split Peas", "Yellow Split Peas",
  "Peanuts", "Peanut Butter",

  // Vegetables
  "Tomatoes", "Cherry Tomatoes", "Roma Tomatoes", "Beefsteak Tomatoes", "Green Tomatoes", "Sun-Dried Tomatoes",
  "Lettuce", "Romaine Lettuce", "Iceberg Lettuce", "Butter Lettuce", "Arugula", "Radicchio",
  "Spinach", "Baby Spinach", "Kale", "Collard Greens", "Swiss Chard", "Mustard Greens", "Beet Greens",
  "Carrots", "Baby Carrots", "Parsnips", "Turnips", "Rutabaga",
  "Broccoli", "Broccolini", "Cauliflower", "Romanesco",
  "Onions", "Red Onions", "White Onions", "Yellow Onions", "Sweet Onions", "Green Onions", "Scallions", "Shallots", "Leeks", "Chives",
  "Garlic", "Garlic Cloves", "Garlic Powder", "Roasted Garlic",
  "Bell Peppers", "Red Bell Peppers", "Green Bell Peppers", "Yellow Bell Peppers", "Orange Bell Peppers",
  "Hot Peppers", "Jalapeños", "Habaneros", "Serranos", "Poblanos", "Anaheim Peppers", "Thai Chili Peppers",
  "Mushrooms", "Button Mushrooms", "Cremini Mushrooms", "Portobello Mushrooms", "Shiitake Mushrooms",
  "Oyster Mushrooms", "Enoki Mushrooms", "Porcini Mushrooms", "Chanterelle Mushrooms", "Morel Mushrooms",
  "Potatoes", "Russet Potatoes", "Red Potatoes", "Yukon Gold Potatoes", "Fingerling Potatoes", "New Potatoes",
  "Sweet Potatoes", "Yams", "Purple Sweet Potatoes",
  "Corn", "Sweet Corn", "Corn on the Cob", "Baby Corn",
  "Peas", "Green Peas", "Snow Peas", "Sugar Snap Peas",
  "Green Beans", "Wax Beans", "Asparagus", "Artichokes", "Brussels Sprouts",
  "Cabbage", "Green Cabbage", "Red Cabbage", "Napa Cabbage", "Savoy Cabbage",
  "Celery", "Celery Root (Celeriac)",
  "Cucumber", "English Cucumber", "Persian Cucumber", "Pickling Cucumber",
  "Zucchini", "Yellow Squash", "Pattypan Squash", "Acorn Squash", "Butternut Squash", "Spaghetti Squash", "Pumpkin",
  "Eggplant", "Japanese Eggplant", "Thai Eggplant",
  "Okra", "Jicama", "Kohlrabi", "Fennel", "Endive", "Chicory",
  "Radishes", "Daikon Radish", "Horseradish",
  "Beets", "Golden Beets", "Chioggia Beets",
  "Watercress", "Bok Choy", "Tatsoi", "Mizuna",
  "Bamboo Shoots", "Water Chestnuts", "Bean Sprouts",
  "Nopales (Cactus Paddles)", "Chayote",

  // Fruits
  "Apples", "Red Delicious Apples", "Granny Smith Apples", "Gala Apples", "Fuji Apples", "Honeycrisp Apples",
  "Bananas", "Plantains",
  "Oranges", "Mandarin Oranges", "Clementines", "Tangerines", "Blood Oranges",
  "Lemons", "Limes", "Key Limes", "Grapefruit",
  "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Boysenberries", "Mulberries",
  "Grapes", "Red Grapes", "Green Grapes", "Concord Grapes",
  "Pineapple", "Mango", "Papaya", "Guava", "Passion Fruit",
  "Peaches", "Nectarines", "Apricots", "Plums", "Cherries",
  "Pears", "Asian Pears", "Quince",
  "Kiwi", "Kiwiberries",
  "Watermelon", "Cantaloupe", "Honeydew Melon",
  "Figs", "Dates", "Prunes",
  "Pomegranate", "Persimmon", "Lychee", "Rambutan", "Longan",
  "Durian", "Jackfruit", "Soursop", "Cherimoya",
  "Coconut", "Young Coconut",
  "Avocado",
  "Olives", "Green Olives", "Kalamata Olives", "Black Olives",

  // Dried Fruits
  "Raisins", "Golden Raisins", "Currants", "Dried Cranberries", "Dried Blueberries",
  "Dried Apricots", "Dried Figs", "Dried Dates", "Dried Mango", "Dried Pineapple",
  "Goji Berries", "Dried Mulberries", "Dried Cherries",

  // Meats and Poultry
  "Chicken", "Chicken Breast", "Chicken Thighs", "Chicken Wings", "Chicken Drumsticks", "Ground Chicken",
  "Turkey", "Turkey Breast", "Ground Turkey", "Turkey Bacon",
  "Beef", "Ground Beef", "Beef Sirloin", "Beef Tenderloin", "Ribeye Steak", "Flank Steak", "Beef Brisket",
  "Pork", "Pork Chops", "Pork Tenderloin", "Pork Belly", "Ground Pork", "Pork Shoulder", "Ham",
  "Lamb", "Lamb Chops", "Lamb Shoulder", "Ground Lamb",
  "Veal", "Veal Cutlets", "Ground Veal",
  "Duck", "Duck Breast", "Duck Legs",
  "Goose", "Quail", "Pheasant", "Rabbit",
  "Venison", "Bison", "Elk",
  "Bacon", "Pancetta", "Prosciutto", "Salami", "Pepperoni",
  "Sausage", "Italian Sausage", "Bratwurst", "Chorizo",

  // Seafood and Fish
  "Salmon", "Atlantic Salmon", "Sockeye Salmon", "Smoked Salmon",
  "Tuna", "Yellowfin Tuna", "Albacore Tuna", "Canned Tuna",
  "Cod", "Halibut", "Tilapia", "Mahi Mahi", "Swordfish",
  "Trout", "Rainbow Trout", "Catfish", "Bass",
  "Sardines", "Anchovies", "Mackerel",
  "Herring", "Haddock", "Pollock", "Sole", "Flounder",
  "Shrimp", "Prawns", "Lobster", "Crab", "Crab Meat",
  "Scallops", "Clams", "Mussels", "Oysters",
  "Squid", "Calamari", "Octopus",
  "Caviar", "Roe",

  // Dairy Products and Alternatives
  "Milk", "Whole Milk", "2% Milk", "1% Milk", "Skim Milk", "Buttermilk",
  "Cream", "Heavy Cream", "Light Cream", "Half-and-Half", "Whipping Cream",
  "Butter", "Unsalted Butter", "Clarified Butter", "Ghee",
  "Cheese", "Cheddar Cheese", "Mozzarella Cheese", "Parmesan Cheese", "Swiss Cheese", "Gouda Cheese",
  "Brie Cheese", "Camembert Cheese", "Blue Cheese", "Feta Cheese", "Goat Cheese",
  "Cream Cheese", "Cottage Cheese", "Ricotta Cheese", "Mascarpone Cheese",
  "Yogurt", "Greek Yogurt", "Plain Yogurt", "Flavored Yogurt", "Kefir",
  "Sour Cream", "Crème Fraîche",
  "Eggs", "Egg Whites", "Egg Yolks",
  "Almond Milk", "Soy Milk", "Coconut Milk", "Oat Milk", "Cashew Milk", "Rice Milk", "Hemp Milk",
  "Coconut Cream", "Soy Yogurt", "Almond Yogurt", "Coconut Yogurt",
  "Vegan Cheese", "Nutritional Yeast",

  // Nuts and Seeds
  "Almonds", "Cashews", "Walnuts", "Pecans", "Pistachios", "Macadamia Nuts", "Brazil Nuts",
  "Hazelnuts", "Pine Nuts", "Chestnuts",
  "Peanuts", "Peanut Butter", "Almond Butter", "Cashew Butter",
  "Sunflower Seeds", "Pumpkin Seeds", "Sesame Seeds", "Flax Seeds", "Chia Seeds",
  "Hemp Seeds", "Poppy Seeds", "Fennel Seeds", "Caraway Seeds", "Mustard Seeds",

  // Herbs and Spices
  "Basil", "Oregano", "Thyme", "Rosemary", "Sage", "Parsley", "Cilantro", "Dill", "Mint", "Chives",
  "Tarragon", "Marjoram", "Bay Leaves", "Lemongrass", "Kaffir Lime Leaves",
  "Black Pepper", "White Pepper", "Pink Peppercorns", "Sichuan Peppercorns",
  "Salt", "Sea Salt", "Kosher Salt", "Himalayan Pink Salt",
  "Cumin", "Coriander", "Cardamom", "Cinnamon", "Nutmeg", "Allspice", "Cloves",
  "Paprika", "Smoked Paprika", "Cayenne Pepper", "Chili Powder", "Red Pepper Flakes",
  "Turmeric", "Ginger", "Garlic Powder", "Onion Powder",
  "Saffron", "Vanilla Bean", "Vanilla Extract",
  "Curry Powder", "Garam Masala", "Chinese Five Spice", "Herbes de Provence",
  "Wasabi Powder", "Mustard Powder", "Celery Salt", "Garlic Salt",
  "Zaatar", "Sumac", "Aleppo Pepper", "Ras el Hanout",
  "Fenugreek", "Asafoetida (Hing)", "Ajwain", "Amchur (Mango Powder)",

  // Oils and Fats
  "Olive Oil", "Extra Virgin Olive Oil", "Vegetable Oil", "Canola Oil", "Coconut Oil",
  "Avocado Oil", "Grapeseed Oil", "Sesame Oil", "Peanut Oil", "Walnut Oil",
  "Sunflower Oil", "Corn Oil", "Safflower Oil", "Flaxseed Oil", "Hemp Seed Oil",
  "Palm Oil", "Ghee", "Lard", "Beef Tallow", "Duck Fat",
  "Truffle Oil", "Chili Oil", "Garlic-Infused Oil",

  // Sweeteners and Sugars
  "Sugar", "White Sugar", "Brown Sugar", "Powdered Sugar", "Raw Sugar", "Demerara Sugar",
  "Honey", "Maple Syrup", "Agave Nectar", "Molasses", "Corn Syrup",
  "Stevia", "Monk Fruit Sweetener", "Erythritol", "Xylitol",
  "Date Syrup", "Coconut Sugar", "Palm Sugar",

  // Condiments and Sauces
  "Ketchup", "Mustard", "Yellow Mustard", "Dijon Mustard", "Whole Grain Mustard",
  "Mayonnaise", "Miracle Whip",
  "Hot Sauce", "Tabasco Sauce", "Sriracha Sauce", "Chili Garlic Sauce",
  "Soy Sauce", "Tamari", "Coconut Aminos",
  "Worcestershire Sauce", "Fish Sauce", "Oyster Sauce", "Hoisin Sauce",
  "BBQ Sauce", "Teriyaki Sauce", "Sweet and Sour Sauce",
  "Salsa", "Pico de Gallo", "Guacamole", "Hummus",
  "Pesto", "Chimichurri", "Tapenade",
  "Tahini", "Miso Paste", "Gochujang", "Harissa",
  "Vinegar", "Balsamic Vinegar", "Apple Cider Vinegar", "Rice Vinegar", "Red Wine Vinegar", "White Wine Vinegar",
  "Lemon Juice", "Lime Juice",
  "Tomato Paste", "Tomato Sauce", "Marinara Sauce",
  "Aioli", "Tartar Sauce", "Cocktail Sauce",
  "Chutney", "Relish", "Pickles", "Sauerkraut", "Kimchi",

  // Baking Ingredients
  "Flour", "All-Purpose Flour", "Whole Wheat Flour", "Bread Flour", "Cake Flour", "Self-Rising Flour",
  "Almond Flour", "Coconut Flour", "Rice Flour", "Tapioca Flour", "Chickpea Flour",
  "Cornstarch", "Arrowroot Powder", "Xanthan Gum",
  "Baking Powder", "Baking Soda", "Cream of Tartar",
  "Yeast", "Active Dry Yeast", "Instant Yeast",
  "Cocoa Powder", "Chocolate Chips", "White Chocolate Chips", "Chocolate Bars",
  "Vanilla Extract", "Almond Extract", "Peppermint Extract", "Lemon Extract",
  "Food Coloring", "Sprinkles", "Edible Glitter",

  // Beverages and Drink Ingredients
  "Coffee", "Coffee Beans", "Instant Coffee", "Espresso",
  "Tea", "Black Tea", "Green Tea", "Herbal Tea", "Chai Tea",
  "Cocoa", "Hot Chocolate Mix",
  "Juice", "Orange Juice", "Apple Juice", "Cranberry Juice", "Tomato Juice",
  "Soda", "Cola", "Lemon-Lime Soda", "Ginger Ale",
  "Tonic Water", "Club Soda", "Sparkling Water",
  "Sports Drinks", "Energy Drinks",
  "Coconut Water", "Aloe Vera Juice",

  // Alcoholic Beverages (for cooking)
  "White Wine", "Red Wine", "Cooking Wine",
  "Beer", "Ale", "Stout",
  "Vodka", "Rum", "Whiskey", "Bourbon", "Brandy",
  "Vermouth", "Sherry", "Port",
  "Sake", "Mirin",

  // Miscellaneous
  "Tofu", "Tempeh", "Seitan",
  "Nutritional Yeast",
  "Gelatin", "Agar Agar",
  "Broth", "Chicken Broth", "Beef Broth", "Vegetable Broth", "Bone Broth",
  "Bouillon Cubes", "Stock Cubes",
  "Marmite", "Vegemite",
  "Liquid Smoke",
  "Rose Water", "Orange Blossom Water",
  "Dried Seaweed", "Nori", "Wakame", "Kombu",
  "Capers", "Sun-Dried Tomatoes",
  "Dried Mushrooms", "Dried Chiles",
  "Textured Vegetable Protein (TVP)",
  "Vital Wheat Gluten",
  "Lecithin",
  "Carob Powder",
  "Matcha Powder",
  "Spirulina",
  "Protein Powder", "Whey Protein", "Pea Protein",
];

export default ingredientDatabase;