try {
    // Save the user to the database
    await newUser.save();
    resp.json({ message: 'Login data received and saved successfully' });
} catch (error) {
    resp.status(500).json({ message: 'Error saving data to database', error });
}
});
