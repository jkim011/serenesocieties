import CartList from '../../components/cart/CartList';
import Auth from '../../utils/auth';
import LocalCart from './LocalCart';

function Cart({updateCart}) {
    return (
      <div>
        <div className='mt-4 mb-4 text-center'>         
          <h2 className='page-title cart'>Cart</h2>
        </div>
        {Auth.loggedIn() ? (
          <CartList />
        ):(
          <LocalCart updateCart={updateCart}/>
        )}
        
      </div>
    )
  }

export default Cart