
app.get("/todos", async (req, res) => {
    try {
        const todos = await User.find();  // Fetch all data from the 'List' collection
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from database', error });
    }
});