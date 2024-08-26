export const passwordValidation = (password: string) => {
    const minError = password.length < 4 ? 'Длина пароля от 4 до 20 символов' : null
    const maxError = password.length > 20 ? 'Длина пароля от 4 до 20 символов' : null

    return {
        minError,
        maxError
    }
}