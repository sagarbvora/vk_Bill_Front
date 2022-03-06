export const CONSTANT_ROUTES = {
    common: "/",
    notFound: "",
    admin: {
        login: '/admin/login',
        createBill: '/admin/create_bill',
        billPrint: '/admin/final_print/:id',
        history: '/admin/history',
    },
    user:{
        contactUs: '/contact_us',
        aboutUs: '/about_us',
        services: '/services'
    }
};