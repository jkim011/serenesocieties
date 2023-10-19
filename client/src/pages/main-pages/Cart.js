import CartList from '../../components/cart/CartList';
import Auth from '../../utils/auth';
import LocalCart from '../../components/cart/LocalCart';

function Cart() {
    return (
      <div>
        <div className='mt-4 mb-4 text-center'>         
          <h2 className='page-title'>Cart</h2>
        </div>
        {Auth.loggedIn() ? (
          <CartList />
        ):(
          <LocalCart/>
        )}
        
      </div>
    )
  }

export default Cart