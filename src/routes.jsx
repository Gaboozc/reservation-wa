// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { Emergency } from "./pages/Emergency";
import { RefrigeratorService } from "./pages/RefrigeratorService";
import { WasherDryerService } from "./pages/WasherDryerService";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // Peter Tech Services routing structure
    // All routes include the Navbar and Footer via the Layout component

      // Root Route: All navigation starts from here
      <Route path="/" element={<Layout />} errorElement={<h1>Page Not Found - Peter Tech Services</h1>} >

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/emergency" element={<Emergency />} />
        
        {/* Individual Service Pages */}
        <Route path="/services/refrigerator" element={<RefrigeratorService />} />
        <Route path="/services/washer-dryer" element={<WasherDryerService />} />
        
        {/* Legacy routes - to be removed later */}
        <Route path="/single/:theId" element={<Home />} />
        <Route path="/demo" element={<Home />} />
      </Route>
    )
);