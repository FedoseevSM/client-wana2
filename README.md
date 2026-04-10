# Wana2 Mobile 🚕📱

Клиентское мобильное приложение 3 в 1 для поиска водителей и бронирования поездок на **React + Vite + Supabase + Capacitor**. Полностью адаптивное для iOS/Android/PWA с картами, уведомлениями и защищенной авторизацией.

## ✨ Основные возможности

- **Поиск водителей**: FindDrivers + реальное время поездок (ActiveRide)
- **Карты**: Интерактивная карта Map.tsx компонента
- **Уведомления**: Toast-система + NotificationBanner
- **Авторизация**: Login/Register + AdminRoute/ProtectedRoute
- **State Management**: MobX stores (authStore, rideStore, themeStore)
- **Supabase**: БД с 2 миграциями (rides, users)
- **PWA + Capacitor**: Готово к нативной сборке

## 🏗️ Структура проекта

```
client-wana2/
├── src/
│   ├── components/
│   │   ├── auth/            # AdminRoute.tsx, ProtectedRoute.tsx
│   │   ├── layout/          # BottomNavigation, BurgerMenu, ClientBottomNavigation
│   │   ├── map/Map.tsx      # Интерактивная карта поездок
│   │   ├── ride/            # ActiveRide.tsx, RideCard.tsx
│   │   └── ui/              # Button.tsx, Input.tsx, Toast/Toaster
│   ├── pages/               # ClientHome, FindDrivers, Rides, Profile, Settings
│   ├── stores/              # authStore.ts, rideStore.ts, toastStore.ts
│   ├── lib/supabase.ts      # Supabase клиент
│   └── data/mockData.ts     # Тестовые данные поездок
├── supabase/migrations/     # 2 миграции
├── capacitor.config.ts      # Мобильная сборка
└── .bolt/                   # AI Bolt config (prompt engineering)
```

## 🚀 Быстрый старт

```bash
git clone https://github.com/FedoseevSM/client-wana2.git
cd client-wana2
pnpm install
cp .env.example .env  # SUPABASE_URL + SUPABASE_ANON_KEY
pnpm dev
```

**PWA**: `pnpm build && pnpm preview`  
**Android/iOS**: `npx cap sync`

## 🛠️ Технологический стек

```
├── Framework: React 18 + TypeScript + Vite
├── Mobile: Capacitor + PWA Manifest
├── State: MobX stores
├── Styling: Tailwind CSS + cn.ts utility
├── Backend: Supabase (Postgres + Auth)
├── UI: Custom Button/Input/Toast system
└── Package: pnpm + PostCSS
```

## 📱 Мобильные фичи

- **BottomNavigation** для клиентов/админов
- **Real-time rides** через Supabase subscriptions
- **Protected routes** + Unauthorized fallback
- **Theme switching** (themeStore)
- **RideDetails + Places** с картой

## 🌐 Демо
PWA: https://client.wana2.com

## 📄 Лицензия
MIT - используй для своих проектов!

***

**⭐ Добавь в избранное, если помогает!**  

Проект enterprise-уровня для агрегаторов такси и таксопарков! 
