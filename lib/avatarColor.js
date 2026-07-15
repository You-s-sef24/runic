const COLORS = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-teal-500",
];

export function getAvatarColor(name) {
    const index = name
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return COLORS[index % COLORS.length];
}

export function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}