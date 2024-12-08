import { ZodError } from "zod";

export function getZodMessage(err:ZodError):string{
    return  err.errors.map(error => {
        return error.message;
    }).join(', ');
}