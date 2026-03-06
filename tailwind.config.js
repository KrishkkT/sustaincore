export default {
    content: [
        "./index.html",
        "./about.html",
        "./services.html",
        "./cbam.html",
        "./insights.html",
        "./contact.html",
        "./src/**/*.{js,ts,jsx,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: "#0b5394",
                    green: "#2E8B57",
                    lightGreen: "#00FF9D", // More vibrant lime
                    charcoal: "#0F1115",   // Greenlyte style
                    softGray: "#F8FAFC",
                    offWhite: "#FCFCFC",
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(11, 83, 148, 0.1)',
                'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
            },
            borderRadius: {
                '3xl': '24px',
                '4xl': '32px',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(40px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
