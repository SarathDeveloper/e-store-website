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
