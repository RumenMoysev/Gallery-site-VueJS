import type { errObject } from "@/types/errors"
import type { formUserData } from "@/types/user"

export function validateData({ email, username, password }: formUserData, repeatPassword?: string): errObject {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const emailLength: number = 5
    const usernameLength: number = 4
    const passwordLength: number = 4

    const errObj: errObject = {}

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
    } else if (repeatPassword !== password) {
        errObj.password = 'Passwords do not match!'
    }

    if(!repeatPassword) {
        errObj.repeatPassword = 'Repeat password is required!'
    }

    return errObj
}