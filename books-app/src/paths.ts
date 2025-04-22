export const paths = {
    index: "/",
    account: {
        index: "/account"
    },
    auth: {
        signIn: "/auth/sign-in",
        signUp: "/auth/sign-up",
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