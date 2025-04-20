export default function GetCategoryColor(category: string) : string {
    const colors: Record<string, string> = {
        Groceries: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
        "Food and Household Items": "bg-green-500/20 text-green-500 hover:bg-green-500/30",
        "Dining Out": "bg-green-500/20 text-green-500 hover:bg-green-500/30",
        Utilities: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
        Extra: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
        Entertainment: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
        Travel: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
        Car: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
        Healthcare: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
        Health: "bg-red-500/20 text-red-500 hover:bg-red-500/30",
        Education: "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30",
        Services: "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30",
        Housing: "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",
        Home: "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",
        Hobby: "bg-pink-500/20 text-pink-500 hover:bg-pink-500/30",
    }

    return colors[category] || "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
}
