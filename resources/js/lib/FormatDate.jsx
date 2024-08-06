import moment from "moment";

export const formatDate = (date) => {
    return moment(date).locale("id").format("DD MMMM YYYY");
};
