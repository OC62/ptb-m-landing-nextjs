// src/app/components/PermissionsPolicy.jsx
export default function PermissionsPolicy() {
  return (
    <>
      {/* Политика разрешений для iframe и датчиков */}
      <meta 
        httpEquiv="Permissions-Policy" 
        content="accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" 
      />
    </>
  );
}