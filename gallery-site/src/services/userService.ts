import internalFetch from "@/lib/internalFetch"
import type { userErrObject } from "@/types/errors"
import type { formUserData, User } from "@/types/user"
import { ref, type Ref } from "vue"

export const isLoggedIn: Ref<boolean> = ref(false)
export const role: Ref<string> = ref('guest')
export const userId: Ref<string> = ref('')

export async function login(userData: formUserData) {
    try {
        const response: Response = await internalFetch('POST', 'users/login', userData)
        const data = await response.json()

        if(response.status === 400) {
            throw data.message
        }

        isLoggedIn.value = true
        role.value = data.role
        userId.value = data.userId
    } catch (error) {
        throw error;
    }
}

export async function register(userData: formUserData, repeatPassword: string) {
    try {
        const response: Response = await internalFetch('POST', 'users/register', {...userData, repeatPassword})
        const data = await response.json()

        if (response.status === 400) {
            throw data.message
        }

        isLoggedIn.value = true
        role.value = data.role
        userId.value = data.userId
    } catch (error) {
        throw error;
    }
}

export async function getUser() {
    try {
        const response: Response = await internalFetch('GET', 'users/getUser')
        const data: User = await response.json()

        isLoggedIn.value = true
        role.value = data.role
        userId.value = data.userId

        return data
    } catch (error) {
        console.log(error)
    }
}

export function logoutUser() {
    isLoggedIn.value = false
    role.value = 'guest'
    userId.value = ''

    return internalFetch('POST', 'users/logout', undefined)
}

export function validateData({ email, username, password }: formUserData, repeatPassword?: string): userErrObject {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const emailLength: number = 5
    const usernameLength: number = 4
    const passwordLength: number = 4

    const errObj: userErrObject = {}

    if (!email) {
        errObj.email = 'Email is required!'
    } else if (email.length < emailLength) {
        errObj.email = `Email should be at least ${passwordLength} characters long!`
    } else if (!regex.test(email)) {
        errObj.email = 'Please provide a correct email!'
    }

    if (!username) {
        errObj.username = 'Username is required!'
    } else if (username.length < usernameLength) {
        errObj.username = `Username should be at least ${usernameLength} characters long!`
    }

    if (!password) {
        errObj.password = 'Password is required!'
    } else if (password.length < passwordLength) {
        errObj.password = `Password should be at least ${passwordLength} characters long!`
    }
    
    if (repeatPassword && repeatPassword !== password) {
        errObj.password = 'Passwords do not match!'
    }

    if(!repeatPassword) {
        errObj.repeatPassword = 'Repeat password is required!'
    }

    return errObj
}