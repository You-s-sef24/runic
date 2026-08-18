export const NAIL_PRICE = 15;

export function calculateOrderTotal(order) {
    const itemsTotal = (order.items || []).reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0,
    );
    const nailsTotal = (order.nails || 0) * NAIL_PRICE;
    const shipping = Number(order.shipping) || 0;
    return itemsTotal + nailsTotal + shipping;
}