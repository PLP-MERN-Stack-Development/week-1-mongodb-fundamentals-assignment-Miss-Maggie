//Task 1.1: Find all books in a specific genre
db.books.find({genre: "Fiction" })

//Task 2.2: Find books published after a certain year
db.books.find({published_year: {$gt: 1951}})

// Task 2.3: Find books by a specific author
db.books.find({author: "George Orwell"})

//Task 2.4: Update the price of a specific book
db.books.updateOne(
  { title: "1954" },
  { $set: { price: 25.90 } }
)

// Task 2.5: Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" })

//Task 3.1: Write a query to find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Task 3.2: Use projection to return only the title, author, and price fields in your queries
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Task 3.3: Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }) // Ascending order
db.books.find().sort({ price: -1 }) // Descending order

// Task 3.4: Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5) // First page
db.books.find().skip(5).limit(5) // Second page

// Task 4.1: Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } } 
])

// Task 4.2: Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Task 4.3: Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $project:{
            decade:[
                { $subtract: ["$published_year",0,3]},
                "0s"
            ]
        }
    },
    { $group:{_id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
])

// Task 5.1: Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 })

// Task 5.2: Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: -1 })

// Task 5.3: Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Hobbit" }).explain("executionStats")



