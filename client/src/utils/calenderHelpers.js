
export const getStartDate = () => {
    const today = moment();
    today.startOf("month");
    const dow = today.day();
    return today.subtract(dow, "days");
}

export const getEndDate = () => {
    const today = moment();
    today.endOf("month");
    const dow = today.day();
    return today.add(6 - dow, "days");
}