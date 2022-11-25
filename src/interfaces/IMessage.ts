import { AlertColor } from "@mui/material";

export default interface IMessage {
    alert: boolean,
    message: string,
    type: AlertColor | undefined
}