import { Link } from "react-router-dom";

const Cancel = () => {
    return(
      <div className="text-center mt-5">
        <h1>Your payment was cancelled</h1>
        <h3 className="mt-3"><Link as={Link} to="/cart" className="text-decoration-none text-black">Return to cart page</Link></h3>
      </div>
    )
  }
  
  export default Cancel;