# Peter Tech Services LLC - Professional Appliance Repair Website

A comprehensive React-based website for Peter Tech Services LLC, a professional appliance repair company. This multi-page website provides customers with easy access to services, contact information, and emergency repair options.

## 🔧 Features

- **Multi-page structure** with dedicated pages for each service area
- **Responsive design** that works on desktop, tablet, and mobile devices
- **Professional styling** focused on the appliance repair industry
- **Emergency service section** for urgent repair needs
- **Contact forms** for service requests
- **Service-specific pages** for different appliance types
- **Company information** and service area details

## 📋 Pages Included

- **Home** - Hero section, services overview, and call-to-action
- **About** - Company story, experience, and certifications
- **Services** - Complete list of appliance repair services
- **Contact** - Contact form, business hours, and location info
- **Emergency** - 24/7 emergency service information
- **Individual Service Pages** - Detailed info for specific appliances

## 🚀 Getting Started

> 📦 Make sure you are using at least Node.js version 18.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000`

## 🎨 Customization

### Styling
- Main styles are in `./src/index.css`
- Professional color scheme with blue, green, and red accents
- Responsive grid layouts for all sections

### Components
- `Navbar` - Navigation with company branding and emergency contact
- `Footer` - Company info, service links, and business hours
- All components are in `./src/components/`

### Pages
- All pages are in `./src/pages/`
- Routes are configured in `./src/routes.jsx`
- Each page follows a consistent structure with hero sections and content areas

## 📱 Contact Information

The website includes prominent contact information:
- Phone: (555) 123-4567
- Email: info@petertechservices.com
- Emergency service available 24/7

## 🛠 Services Covered

- Refrigerator & Freezer Repair
- Washer & Dryer Repair  
- Dishwasher Repair
- Oven, Range & Cooktop Repair
- Microwave Repair
- Emergency Appliance Repair
- And more appliance services

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏢 About Peter Tech Services LLC

Peter Tech Services LLC is a professional appliance repair company serving the greater metropolitan area since 2010. We specialize in same-day repairs for all major appliance brands with licensed, insured technicians.

### Centralized Store with useReducer

This template comes with a centralized & general state that's shared with all pages and compoentes, we call it "the store".   

The file `./src/store.js` has a default structure for the store, we encourage you to change it and adapt it to your data needs (for example, if you are doing a `Todo list` you will probably have a array of todos here).

+ Learn how the useReducer works.
+ Read more about implementing a global state with Context API
+ Read more about react hooks

The store `Provider` for this context is already set on `./src/main.jsx`. You can access the store from any component using the `useGlobalReducer` hook to get the `store` and `dispatcher`. Check `/views/demo.js` to see a demo. Here is a smaller sample:

```jsx
import useGlobalReducer from "./src/hooks/useGlobalReducer";

const MyComponentSuper = () => {
  //here you use the hook to get dispatcher and store
  import { dispatch, store } = useGlobalReducer();

  return <div>{/* you can use your actions or store inside the html */}</div>
}
```

## Publish your website!

1. **Vercel:** The FREE recomended hosting provider is [vercel.com](https://vercel.com/), you can deploy in 1 minutes by typing the following 2 commands:

Login (you need to have an account):
```sh
$ npm i vercel -g && vercel login
```
Deploy:
```sh
$ vercel --prod
```
✎ Note: If you don't have an account just go to vercel.com, create a account and come back here.

## Contributors

This template was built by AlphaDev and Gabriel Zavarse. This software is proprietary to AlphaDev and is intended for exclusive use by AlphaDev only.
