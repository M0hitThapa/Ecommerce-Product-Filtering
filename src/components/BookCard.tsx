import { Link } from "react-router-dom";
interface BookCardProps {
    id: string;
    title: string;
    image:string;
    price:number;
}

const BookCard: React.FC<BookCardProps> = ({id,title,image,price}) => {
  return <div className="border-2 border-black border-opacity-20 p-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 shadow-md">
    <Link to={`/product/${id}`}>
    <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
    <h2 className="font-bold font-mono">
        {title}
    </h2>
    <p>${price}</p>
    </Link>
  </div>
  
}

export default BookCard