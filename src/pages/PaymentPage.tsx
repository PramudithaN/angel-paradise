import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No order found</h2>
                    <button onClick={() => navigate('/shop')} className="text-orange-500 hover:text-orange-600">Return to Shop</button>
                </div>
            </div>
        );
    }

    // TODO: Integrate payment provider here (e.g., Stripe)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-50 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Product:</span>
                            <span>{order.product}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Size:</span>
                            <span>{order.size || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Color:</span>
                            <span>{order.color || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Quantity:</span>
                            <span>{order.quantity}</span>
                        </div>
                        <div className="flex justify-between text-gray-800 font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>${order.total}</span>
                        </div>
                    </div>
                </div>
                {/* Payment integration goes here */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200">Pay Now</button>
            </div>
        </div>
    );
};

export default PaymentPage;
