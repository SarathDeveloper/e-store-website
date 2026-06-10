export default function JsonLd() {
    const businessData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "E-Store",
        "image": "https://e-store.com/hero-tailor.png", // Hypothetical production URL
        "@id": "https://e-store.com",
        "url": "https://e-store.com",
        "telephone": "+91 98400 00000", // Placeholder
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Medavakkam Main Road",
            "addressLocality": "Medavakkam",
            "addressRegion": "Chennai",
            "postalCode": "600100",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 12.9234,
            "longitude": 80.1914
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "21:00"
        },
        "sameAs": [
            "https://www.facebook.com/estore",
            "https://www.instagram.com/estore"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
        />
    );
}
