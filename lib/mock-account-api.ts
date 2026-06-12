export interface Address {
    id: string;
    type: "Home" | "Office" | "Other";
    fullName: string;
    phone: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    items: OrderItem[];
    shippingAddress: Address;
    trackingNumber?: string;
    estimatedDelivery?: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
    type: "order" | "promo" | "system";
}

export interface RewardTransaction {
    id: string;
    date: string;
    description: string;
    points: number;
    type: "earned" | "redeemed";
}

export interface Review {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    rating: number;
    content: string;
    date: string;
    status: "published" | "pending";
}

// Initial Mock Data
const defaultAddresses: Address[] = [
    {
        id: "addr_1",
        type: "Home",
        fullName: "Sarah Johnson",
        phone: "+91 9876543210",
        streetAddress: "123 Palm Avenue, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        isDefault: true,
    }
];

const defaultOrders: Order[] = [
    {
        id: "ORD-9823-XYZ",
        date: "2026-05-28T10:30:00Z",
        total: 12500,
        status: "Delivered",
        items: [
            {
                id: "item_1",
                productId: "prod_1",
                name: "Banarasi Silk Saree",
                price: 12500,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=800&auto=format&fit=crop"
            }
        ],
        shippingAddress: defaultAddresses[0],
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2026-06-02T10:30:00Z"
    },
    {
        id: "ORD-9954-ABC",
        date: "2026-06-05T14:20:00Z",
        total: 4500,
        status: "Shipped",
        items: [
            {
                id: "item_2",
                productId: "prod_2",
                name: "Designer Kurti Set",
                price: 4500,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
            }
        ],
        shippingAddress: defaultAddresses[0],
        trackingNumber: "TRK987654321",
        estimatedDelivery: "2026-06-12T10:30:00Z"
    }
];

const defaultNotifications: Notification[] = [
    {
        id: "notif_1",
        title: "Order Shipped",
        message: "Your order ORD-9954-ABC has been shipped and is on its way.",
        date: "2026-06-07T09:15:00Z",
        isRead: false,
        type: "order"
    },
    {
        id: "notif_2",
        title: "10% Off on Sarees",
        message: "Exclusive offer! Get 10% off on all new arrivals in the Saree collection.",
        date: "2026-06-01T12:00:00Z",
        isRead: true,
        type: "promo"
    }
];

const defaultRewards: RewardTransaction[] = [
    {
        id: "rew_1",
        date: "2026-05-28T10:30:00Z",
        description: "Points earned for order ORD-9823-XYZ",
        points: 125,
        type: "earned"
    },
    {
        id: "rew_2",
        date: "2026-05-15T10:30:00Z",
        description: "Welcome bonus",
        points: 50,
        type: "earned"
    }
];

const defaultReviews: Review[] = [
    {
        id: "rev_1",
        productId: "prod_1",
        productName: "Banarasi Silk Saree",
        productImage: "https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=800&auto=format&fit=crop",
        rating: 5,
        content: "Absolutely love the quality and craftsmanship. The delivery was quick too!",
        date: "2026-06-03T10:30:00Z",
        status: "published"
    }
];

// Helper to get from local storage
const getStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    const stored = localStorage.getItem(`estore_${key}`);
    if (stored) {
        try {
            return JSON.parse(stored) as T;
        } catch {
            return defaultValue;
        }
    }
    // Set default if not found
    localStorage.setItem(`estore_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
};

// Helper to save to local storage
const setStorage = <T>(key: string, value: T) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(`estore_${key}`, JSON.stringify(value));
};

export const mockApi = {
    getAddresses: () => getStorage<Address[]>("addresses", defaultAddresses),
    saveAddresses: (addresses: Address[]) => setStorage("addresses", addresses),
    
    getOrders: () => getStorage<Order[]>("orders", defaultOrders),
    saveOrders: (orders: Order[]) => setStorage("orders", orders),
    
    getNotifications: () => getStorage<Notification[]>("notifications", defaultNotifications),
    saveNotifications: (notifications: Notification[]) => setStorage("notifications", notifications),
    
    getRewards: () => getStorage<RewardTransaction[]>("rewards", defaultRewards),
    saveRewards: (rewards: RewardTransaction[]) => setStorage("rewards", rewards),
    
    getReviews: () => getStorage<Review[]>("reviews", defaultReviews),
    saveReviews: (reviews: Review[]) => setStorage("reviews", reviews),
};

export const downloadInvoice = (order: Order) => {
    if (typeof window === "undefined") return;
    
    const invoiceHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice - ${order.id}</title>
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .brand { font-size: 24px; font-weight: bold; letter-spacing: 2px; }
            .invoice-details { text-align: right; }
            .address-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .address-box { width: 45%; }
            .address-box h3 { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            th { text-transform: uppercase; font-size: 12px; color: #888; }
            .totals { width: 50%; float: right; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .total-row.grand-total { font-size: 18px; font-weight: bold; border-top: 2px solid #333; padding-top: 12px; margin-top: 12px; }
            .footer { clear: both; margin-top: 60px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="brand">E-STORE</div>
            <div class="invoice-details">
                <h2>INVOICE</h2>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
            </div>
        </div>
        
        <div class="address-section">
            <div class="address-box">
                <h3>Billed To</h3>
                <p><strong>${order.shippingAddress.fullName}</strong><br>
                ${order.shippingAddress.streetAddress}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.pincode}<br>
                Phone: ${order.shippingAddress.phone}</p>
            </div>
            <div class="address-box">
                <h3>Shipped To</h3>
                <p><strong>${order.shippingAddress.fullName}</strong><br>
                ${order.shippingAddress.streetAddress}<br>
                ${order.shippingAddress.city}, ${order.shippingAddress.pincode}<br>
                Phone: ${order.shippingAddress.phone}</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${order.items.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toLocaleString()}</td>
                    <td style="text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="totals">
            <div class="total-row">
                <span>Subtotal</span>
                <span>₹${order.total.toLocaleString()}</span>
            </div>
            <div class="total-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="total-row grand-total">
                <span>Total</span>
                <span>₹${order.total.toLocaleString()}</span>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for shopping with E-Store!</p>
            <p>If you have any questions concerning this invoice, contact our support team.</p>
        </div>
        
        <script>
            window.onload = function() { window.print(); }
        </script>
    </body>
    </html>
    `;

    const blob = new Blob([invoiceHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    
    // Fallback if popup is blocked
    if (!newWindow) {
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice_${order.id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};
