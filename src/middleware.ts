import { defineMiddleware } from "astro:middleware";

// Daftar halaman yang WAJIB login
const PROTECTED_ROUTES = ["/timeline"];

// Daftar halaman yang TIDAK BOLEH dibuka kalau sudah login (Login/Register)
const AUTH_ROUTES = ["/login", "/register"];

export const onRequest = defineMiddleware((context, next) => {
console.log('Running middleware check...');
  const token = context.cookies.get("auth_token")?.value;

  console.log('Middleware check, token:', token);
  const { pathname } = context.url;

  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  
  if (isProtected && !token) {
    // Tidak ada token? Tendang ke /login
    return context.redirect("/login");
  }

  // 2. Cek apakah user sudah login tapi mau ke halaman login lagi
  const isAuthPage = AUTH_ROUTES.some(route => pathname === route);

  if (isAuthPage && token) {
    
    return context.redirect("/timeline");
  }

  
  return next();
});