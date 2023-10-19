import { Link } from "react-router-dom";

const Success = () => {
  return(
    <div className="text-center mt-5">
      <h1>Thank you for your purchase!</h1>
      <p className="fs-5">Check email for order confirmation</p>
      <h3><Link as={Link} to="/shop/all-products" className="text-decoration-none text-black">Browse more products</Link></h3>
    </div>
  )
}

export default Success;