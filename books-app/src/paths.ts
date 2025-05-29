export const paths = {
    index: "/",
    account: {
        index: "/account"
    },
    auth: {
        signin: "/auth/signin",
        signup: "/auth/signup",
        verifyEmail: {
            index: "/auth/verify-email",
        },
    },
    books: {
        index: "/books",
        create: "/books/create",
        edit: "/books/edit/[id]",
        view: "/books/view/[id]",
    },
    profile: {
        index: "/profile",
    },
    401: "/401",
    404: "/404",
    500: "/500",
}