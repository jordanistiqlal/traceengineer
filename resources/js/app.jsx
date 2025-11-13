import './bootstrap';
import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import './main.css'
import 'leaflet/dist/leaflet.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import "react-datepicker/dist/react-datepicker.css";

createInertiaApp({
  resolve: async name => {
    const pages = import.meta.glob('./Pages/**/*.jsx')
    const page = await pages[`./Pages/${name}.jsx`]()
    page.default.layout ??= page => page
    return page
  },
  setup({ el, App, props }) {
    window.Ziggy = props.initialPage.props.ziggy;
    
    createRoot(el).render(<App {...props} />)
  },
})