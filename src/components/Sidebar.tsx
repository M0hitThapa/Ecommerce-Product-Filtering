import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
interface Product {
    category: string;
}
interface FetchResponse {
    products: Product[]
}
const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
       keyword,
        setKeyword,
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes",
        "shirt",
    ])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products")
                const data: FetchResponse = await response.json()
              const uniqueCategories =   Array.from(new Set(data.products.map(product => product.category)))
             setCategories(uniqueCategories);
            } catch (error) {
                console.log("Error fetching product", error)
            }
        }
        fetchCategories();
    }, []);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined)
    }
    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined)

    }
    const handleRadioChangeCategories = (category:string) => {
        setSelectedCategory(category)
    };
    const handleKeywordClick = (keyword:string) => {
       setKeyword(keyword)
    }
    const handleResetFilters = () => {
        setSearchQuery('')
            setSelectedCategory('')
            setMinPrice(undefined)
            setMaxPrice(undefined)
            setKeyword("")
        
    }
  return (
    <div className="w-80 p-5 border-r-2 border-white bg-slate-200 rounded-md h-screen">
        <h1 className="text-3xl font-black text-black font-mono mb-3 mt-2">Fashion Palace</h1>
        <section>
            <input 
            type="text" 
            className=" rounded-lg  p-3 bg-white text-black focus:outline-none shadow-md shadow-black sm:mb-0"
             placeholder="Search Products"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} />
            <div className="flex justify-center items-center">
                <input type="text" 
                className=" mr-2 px-5 py-3 mt-2 mb-2 bg-white focus:outline-none text-black shadow-md shadow-black  rounded-lg w-full " 
                placeholder="Min" 
                value={minPrice ?? ''}
                onChange={handleMinPriceChange} />
                <input type="text" 
                className=" mr-2 px-5 py-3 mt-2 mb-2 bg-white focus:outline-none text-black rounded-lg w-full shadow-md shadow-black "
                 placeholder="Max"
                 value={maxPrice ?? ''}
                 onChange={handleMaxPriceChange} />
            </div>


            <div className="mb-5">
                <h2 className="text-2xl font-bold font-mono mb-3">Categories</h2>
            </div>

<section>


            {categories.map((category,index) => (
                <label key={index} className="block mb-2 font-medium font-mono border-b-2 border-slate-600 rounded-lg">
                    <input type="radio" name="category" value={category}
                    onChange={() => handleRadioChangeCategories(category)}
                    className="mr-2 w-[16px] h-[16px] "
                    checked={selectedCategory === category}
                    />
                    {category.toUpperCase()}
                </label>
            ))}
</section>


<div className="mb-3 mt-4">
    <h2 className="text-xl font-semibold ">Keywords</h2>
</div>
{keywords.map((keyword, index) => (
    <button key={index}
    onClick={() => handleKeywordClick(keyword)} className="block  px-2 py-1 w-full font-mono text-left border rounded-lg hover:bg-gray-300 ">
{keyword.toUpperCase()}
    </button>
    
))}

<button onClick={handleResetFilters} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-3">Reset Filters</button>
        </section>
    </div>
    
  )
}

export default Sidebar