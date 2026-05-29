module.exports = {

    users: [
        {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            joinDate: new Date.now,
            role: "admin", 
            favoriteGenre: "Mystery",
            favoriteAuthor: "Agatha Christie",
            favoriteBook: "Murder on the Orient Express",
            displayName: "JD1997",
            img_url: "images/users/jane_doe"
        }, 
        {
            firstName: "Alexis",
            lastName: "Smith",
            email: "alexsmith@example.com",
            joinDate: new Date.now,
            role: "user", 
            favoriteGenre: "Dystopian",
            favoriteAuthor: "George Orwell",
            favoriteBook: "1984",
            displayName: "Happy_Daisy_25",
            img_url: "images/users/alexis_smith"
        }
    ],
    books: [
        {
        title: "Pride & Prejudice",
        author: "Jane Austen",
        category: "fiction",
        genre: "Literary Fiction",
        status: "assigned"

        },
        {
        title: "Huckleberry Finn",
        author: "Mark Twain",
        category: "fiction",
        genre: "Literary Fiction",
        status: "unassigned"

    }
    ],
    meetings: [
        {
            date: new Date(2026, 6, 10),
            location: "1234 Birch Street, Anytown, USA",
            host: "",
            book: ""
        }
    ]
}