import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ICounterState } from "./counterReducer";

export default function ContactPage() {
    const {data, title} = useSelector((state: ICounterState) => state);
    return (
        <Typography variant="h2">
            Contact Page
            {title} -- {data}
        </Typography>
    )
}
