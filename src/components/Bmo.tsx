export const Bmo = () => {
    return (
        <svg width="400" height="450" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cuerpo principal */}
            <rect
                x="10"
                y="20"
                width="140"
                height="170"
                rx="18"
                ry="18"
                fill="#4ecdc4"
                stroke="#3ab5ac"
                strokeWidth="2"
            />

            {/* Pantalla */}
            <rect
                x="28"
                y="35"
                width="104"
                height="80"
                rx="8"
                ry="8"
                fill="#d4f5f0"
                stroke="#3ab5ac"
                strokeWidth="1.5"
            />

            {/* Ojo izquierdo */}
            <circle cx="57" cy="68" r="3" fill="#1a1a2e" />

            {/* Ojo derecho */}
            <circle cx="83" cy="68" r="3" fill="#1a1a2e" />

            {/* Sonrisa */}
            <path d="M 57 82 Q 70 92 83 82" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Ranura de discos */}
            <rect x="28" y="125" width="80" height="6" rx="3" fill="#1a1a2e" />

            {/* Jack 3.5mm — más pequeño */}
            <circle cx="120" cy="128" r="3.5" fill="#1a1a2e" />
            <circle cx="120" cy="128" r="1.8" fill="#0d0d1a" />

            {/* D-pad */}
            <rect x="38" y="138" width="10" height="28" rx="3" fill="#f5c842" />
            <rect x="29" y="147" width="28" height="10" rx="3" fill="#f5c842" />

            {/* Triángulo azul */}
            <polygon points="100,142 108,157 92,157" fill="#5b9fd4" />

            {/* Botón verde */}
            <circle cx="121" cy="149" r="6" fill="#22c55e" />

            {/* Botón rojo */}
            <circle cx="110" cy="172" r="9" fill="#ef4444" />

            {/* Puerto USB izquierdo */}
            <rect x="29" y="173" width="16" height="6" rx="2" fill="#1a1a2e" />

            {/* Puerto USB derecho */}
            <rect x="51" y="173" width="16" height="6" rx="2" fill="#1a1a2e" />
        </svg>
    );
};
