import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import env from '@/config/env.config'
import { GlobalProvider } from '@/context/GlobalContext'
import { UserProvider } from '@/context/UserContext'
import { RecaptchaProvider } from '@/context/RecaptchaContext'
import { PayPalProvider } from '@/context/PayPalContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { init as initGA } from '@/common/ga4'
import ScrollToTop from '@/components/ScrollToTop'
import NProgressIndicator from '@/components/NProgressIndicator'

if (env.GOOGLE_ANALYTICS_ENABLED) {
  initGA()
}

// Add console logs to troubleshoot static file loading and environment issues
console.log('App initializing...');
console.log('Environment variables:', {
  API_HOST: import.meta.env.VITE_MI_API_HOST,
  isProduction: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
});

try {
  // Test if static files can be loaded
  const testImageLoad = () => {
    const img = new Image();
    img.onload = () => console.log('Static image loaded successfully');
    img.onerror = (e) => console.error('Failed to load static image:', e);
    img.src = `${import.meta.env.BASE_URL}cover.webp`;
  };
  testImageLoad();
} catch (e) {
  console.error('Error testing static assets:', e);
}

const Header = lazy(() => import('@/components/Header'))
const SignIn = lazy(() => import('@/pages/SignIn'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const Activate = lazy(() => import('@/pages/Activate'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Property = lazy(() => import('@/pages/Property'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const CheckoutSession = lazy(() => import('@/pages/CheckoutSession'))
const Bookings = lazy(() => import('@/pages/Bookings'))
const Booking = lazy(() => import('@/pages/Booking'))
const Settings = lazy(() => import('@/pages/Settings'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const ToS = lazy(() => import('@/pages/ToS'))
const About = lazy(() => import('@/pages/About'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))
const Contact = lazy(() => import('@/pages/Contact'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))
const Agencies = lazy(() => import('@/pages/Agencies'))
const Locations = lazy(() => import('@/pages/Locations'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'))

const App = () => (
  <BrowserRouter>
    <GlobalProvider>
      <UserProvider>
        <RecaptchaProvider>
          <PayPalProvider>
            <SettingsProvider>
              <ScrollToTop />

              <div className="app">
                <Suspense fallback={<NProgressIndicator />}>
                  <Header />

                  <Routes>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/activate" element={<Activate />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/property" element={<Property />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout-session/:sessionId" element={<CheckoutSession />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tos" element={<ToS />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/agencies" element={<Agencies />} />
                    <Route path="/destinations" element={<Locations />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />

                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </Suspense>
              </div>
            </SettingsProvider>
          </PayPalProvider>
        </RecaptchaProvider>
      </UserProvider>
    </GlobalProvider>
  </BrowserRouter>
)

export default App
