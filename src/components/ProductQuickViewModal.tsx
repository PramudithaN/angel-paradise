import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductQuickViewModalProps {
    product: Product;
    onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        const order = {
            product: product.name,
            price: product.price,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            total: (product.price * quantity).toFixed(2),
        };
        navigate('/payment', { state: { order } });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative animate-fadeIn">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
                <div className="flex flex-col md:flex-row gap-6">
                    <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-56 object-cover rounded-xl" />
                    <div className="flex-1 flex flex-col gap-3">
                        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                        <p className="text-lg text-orange-600 font-bold">${product.price}</p>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        {product.sizes && (
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Size</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {product.sizes.map((size: string) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${selectedSize === size ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {product.colors && (
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Color</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {product.colors
                                        .filter(
                                            (color: string | number | bigint | undefined): color is string | number | bigint =>
                                                typeof color === 'string' ||
                                                typeof color === 'number' ||
                                                typeof color === 'bigint'
                                        )
                                        .map((color: string | number | bigint) => (
                                            <button
                                                key={color.toString()}
                                                onClick={() => setSelectedColor(color.toString())}
                                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${selectedColor === color.toString() ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'}`}
                                            >
                                                {color.toString()}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-1">Quantity</h4>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-100 px-3 py-1 rounded-lg">-</button>
                                <span className="font-semibold text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-100 px-3 py-1 rounded-lg">+</button>
                            </div>
                        </div>
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-full font-semibold text-lg mt-4 transition-all duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickViewModal;
