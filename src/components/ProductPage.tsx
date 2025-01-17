import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
    id: number
    title: string
    description: string
    price: number;
    rating: number;
    images: string[];
}


const ProductPage = () => {

const {id} = useParams<{id: string}>();
const navigate = useNavigate()
const [product, setProduct] = useState<Product | null>(null)

useEffect(() => {
    if (id) {
        axios.get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
            setProduct(response.data);
        }).catch(error => {
            console.error(  `Error fetching product data: ${error}`)
        });



    }
}, [id])
if (!product) {
    return <h1>Loading...</h1>
}

  return (
    <div className="p-5 w-[-60%] bg-slate-100">
        <button onClick={() => navigate(-1)} className="mb-5 px-4 py-2 bg-black text-white rounded">Back</button>

        <img src={product.images[0]} alt={product.title} className="w-[30%] h-auto mb-5" />
        <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
        <p className="mn-4 text-gray-700 w-[70%]">{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>

    </div>
  )
}

export default ProductPage