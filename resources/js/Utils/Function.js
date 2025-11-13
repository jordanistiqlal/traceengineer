export const formatPhone = (value) => {
    value = value.replace(/\D/g, "");
    let max = 12
    if (value.length > max) value = value.slice(0, max);
    return value.match(/.{1,4}/g)?.join("-") || "";
};