import { format } from "date-fns";

const dateFormat = (date) => format(new Date(date), "MMM d, yyyy 'at' h:mm a");

export default dateFormat;
