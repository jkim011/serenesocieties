import CartList from '../../components/CartList';

function Cart() {
    return (
      <div>
        <div className='mt-4 mb-4 text-center'>         
          <h2 className='page-title'>Cart</h2>
        </div>
        <CartList />
      </div>
    )
  }

export default Cart